import type { Loader } from "astro/loaders";
import { z } from "astro:content";
import { getRepoContents } from "@/lib/github/getRepoContents";

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

        console.log("Loading photos from iamjoshua/photography...");
        const files = await getRepoContents("iamjoshua/photography", "photos");

        console.log(`Found ${files.length} photo files`);

        for (const file of files) {
          console.log(`Adding photo: ${file.name} -> ${file.download_url}`);
          
          store.set({
            id: file.name.replace(/\.[^/.]+$/, ""), // Remove extension for ID
            data: {
              filename: file.name,
              title: file.name.replace(/\.[^/.]+$/, ""), // Use filename as title for now
              imageUrl: file.download_url,
              path: file.path,
            },
          });
        }
      } catch (error) {
        console.warn("Photography repository not found or not accessible:", error.message);
        // Don't throw - just log and continue with empty collection
      }
    },
  };
}