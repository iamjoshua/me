import type { Loader } from "astro/loaders";
import { z } from "astro:content";
import { repositoryCache } from "@/lib/github/repositoryCache";
import { getFiles } from "@/lib/github/getFiles";
import { join } from "path";

export const photoSchema = z.object({
  filename: z.string(),
  title: z.string(),
  imageUrl: z.string().url(),
  path: z.string(),
});

export function photosLoader(): Loader {
  return {
    name: "photos-loader",
    async load({ store }) {
      try {
        // NOTE: Astro caches data between builds; clear if data is stale or not updating as expected
        store.clear();

        console.log("Loading photos from iamjoshua/photography (recursive)...");
        const repoPath = await repositoryCache.getRepository({
          repo: "iamjoshua/photography",
          targetDir: "/tmp/photography-repo",
          branch: "main",
        });
        const baseDir = join(repoPath, "photos");
        const files = await getFiles(baseDir, "**/*.{jpg,jpeg,png,webp}");

        console.log(`Found ${files.length} photo files`);

        for (const file of files) {
          const id = file.filename.replace(/\.[^/.]+$/, "");
          const title = id;
          const pathRel = `photos/${file.path}`.replace(/^\/+/, "");
          const imageUrl = `https://raw.githubusercontent.com/iamjoshua/photography/main/${pathRel}`;

          store.set({
            id,
            data: {
              filename: file.filename,
              title,
              imageUrl,
              path: pathRel,
            },
          });
        }
      } catch (error) {
        console.warn(
          "Photography repository not found or not accessible:",
          (error as any)?.message || error,
        );
        // Don't throw - just log and continue with empty collection
      }
    },
  };
}
