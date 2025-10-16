import type { Loader } from "astro/loaders";
import { z } from "astro:content";
import { repositoryCache } from "@/lib/github/repositoryCache";
import { getFiles } from "@/lib/github/getFiles";
import { join } from "path";
import YAML from "yaml";

export const photoCollectionSchema = z.object({
  title: z.string(),
  cover_path: z.string(),
  photos: z
    .array(
      z.object({
        path: z.string(),
        caption: z.string().optional(),
        alt: z.string().optional(),
      }),
    )
    .optional(),
  // computed convenience field used by the route
  coverImageUrl: z.string().url().optional(),
});

export function photoCollectionsLoader(): Loader {
  return {
    name: "photo-collections-loader",
    async load({ store }) {
      try {
        // Clear cached entries to pick up repo changes between builds
        store.clear();
        const repoPath = await repositoryCache.getRepository({
          repo: "iamjoshua/photography",
          targetDir: "/tmp/photography-repo",
          branch: "main",
        });
        const baseDir = join(repoPath, "data/collections");
        const files = await getFiles(baseDir, "**/*.y?(a)ml");
        console.log(
          `[photo-collections] Found ${files.length} collection files in iamjoshua/photography:data/collections`,
        );

        for (const file of files) {
          const id = file.filename.replace(/\.[^/.]+$/, "");
          let title: string | null = null;
          let coverPath: string | undefined;
          let photos: Array<{ path: string; caption?: string; alt?: string }>| undefined;
          try {
            const parsed = (YAML.parse(file.content) ?? {}) as any;
            if (typeof parsed.title === "string" && parsed.title.trim()) {
              title = parsed.title.trim();
            }
            if (typeof parsed.cover_path === "string" && parsed.cover_path.trim()) {
              coverPath = parsed.cover_path.trim();
            }
            if (Array.isArray(parsed.photos)) {
              photos = parsed.photos
                .filter((it: any) => it && typeof it.path === "string" && it.path.trim())
                .map((it: any) => ({
                  path: it.path.trim(),
                  caption: typeof it.caption === "string" ? it.caption : undefined,
                  alt: typeof it.alt === "string" ? it.alt : undefined,
                }));
            }
          } catch (e) {
            console.warn(`Invalid YAML in collection file: ${file.path}`);
            continue;
          }
          if (!title) continue;
          if (!coverPath) continue;

          // Always resolve relative to `photos/` in the photography repo and URL-encode segments
          let path = coverPath.replace(/^\.+\//, "").replace(/^\/+/, "");
          if (!/^photos\//i.test(path)) {
            path = `photos/${path}`;
          }
          const encodePath = (p: string) => p.split('/').map(encodeURIComponent).join('/');
          const coverImageUrl = `https://raw.githubusercontent.com/iamjoshua/photography/main/${encodePath(path)}`;

          // Debug: show which image URL/path the page will attempt to render
          const imageForHtml = coverImageUrl;
          console.log(
            `[photo-collections] id="${id}" title="${title}" cover_path="${coverPath}" resolvedUrlForHtml="${imageForHtml}"`,
          );

          store.set({
            id,
            data: {
              title,
              cover_path: coverPath,
              photos,
              coverImageUrl,
            },
          });
        }
      } catch (error) {
        console.warn("Photo collections not found or not accessible:", (error as any)?.message || error);
        // Gracefully continue with an empty collection
      }
    },
  };
}
