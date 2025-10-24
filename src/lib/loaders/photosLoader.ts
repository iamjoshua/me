import type { Loader } from "astro/loaders";
import { z } from "astro:content";
import { repositoryCache } from "@/lib/github/repositoryCache";
import { getFiles } from "@/lib/github/getFiles";
import { join } from "path";
import YAML from "yaml";

export const photoSchema = z.object({
  filename: z.string(),
  title: z.string(),
  path: z.string(),
});

export function photosLoader(): Loader {
  return {
    name: "photos-loader",
    async load({ store }) {
      try {
        // NOTE: Astro caches data between builds; clear if data is stale or not updating as expected
        store.clear();

        console.log("Loading photos from iamjoshua/photography (data only via sparse checkout)...");
        const repoPath = await repositoryCache.getRepository({
          repo: "iamjoshua/photography",
          targetDir: "/tmp/photography-repo",
          branch: "main",
          sparseCheckoutPaths: ["data"],
        });
        const baseDir = join(repoPath, "data/photos");
        const files = await getFiles(baseDir, "**/*.y?(a)ml");

        console.log(`Found ${files.length} photo metadata files`);

        for (const file of files) {
          try {
            const parsed = (YAML.parse(file.content) ?? {}) as any;

            if (!parsed.path || typeof parsed.path !== 'string') {
              console.warn(`Skipping metadata file ${file.path}: missing or invalid 'path' field`);
              continue;
            }

            const photoPath = parsed.path;
            const filename = photoPath.split('/').pop() || photoPath;
            const id = filename.replace(/\.[^/.]+$/, "");
            const title = id;

            store.set({
              id,
              data: {
                filename,
                title,
                path: photoPath,
              },
            });
          } catch (e) {
            console.warn(`Invalid YAML in photo metadata file: ${file.path}`);
            continue;
          }
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
