import type { Loader } from "astro/loaders";
import { join } from "path";
import YAML from "yaml";
import { getFiles } from "@/lib/github/getFiles";

// Re-use the same schema as the remote Git-backed loader
export { photoCollectionSchema } from "@/lib/loaders/photoCollectionsLoader";

/**
 * Local filesystem-backed loader for photo collections (no Git).
 * Reads YAML files from `/Users/joshuaheiland/Projects/photography/data/collections`.
 */
export function localPhotoCollectionsLoader(): Loader {
  return {
    name: "local-photo-collections-loader",
    async load({ store }) {
      try {
        // Clear cached entries to ensure fresh reads between builds/dev runs
        store.clear();

        const rootDir = "/Users/joshuaheiland/Projects/photography";
        const baseDir = join(rootDir, "data/collections");

        const files = await getFiles(baseDir, "**/*.y?(a)ml");
        console.log(
          `[local-photo-collections] Found ${files.length} collection files in ${baseDir}`,
        );

        for (const file of files) {
          const id = file.filename.replace(/\.[^/.]+$/, "");

          let title: string | null = null;
          let coverPath: string | undefined;
          let photos:
            | Array<{ path: string; caption?: string; alt?: string }>
            | undefined;

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

          const clean = coverPath.replace(/^\/+/, "").replace(/^\.+\//, "");
          const withoutPhotosPrefix = clean.startsWith("photos/") ? clean.substring(7) : clean;
          const coverImageUrl = `/local-photos/${withoutPhotosPrefix}`;

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
        console.warn(
          "Local photo collections not found or not accessible:",
          (error as any)?.message || error,
        );
        // Gracefully continue with an empty collection
      }
    },
  };
}

