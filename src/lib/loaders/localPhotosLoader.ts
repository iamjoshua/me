import type { Loader } from "astro/loaders";
import { join } from "path";
import { getFiles } from "@/lib/github/getFiles";

export function localPhotosLoader(): Loader {
  return {
    name: "local-photos-loader",
    async load({ store }) {
      try {
        store.clear();

        const rootDir = "/Users/joshuaheiland/Projects/photography";
        const baseDir = join(rootDir, "photos");

        const files = await getFiles(baseDir, "**/*.{jpg,jpeg,png,webp}");
        console.log(`[local-photos] Found ${files.length} photo files in ${baseDir}`);

        for (const file of files) {
          const id = file.filename.replace(/\.[^/.]+$/, "");
          const title = id;
          const path = file.path;

          store.set({
            id,
            data: {
              filename: file.filename,
              title,
              path,
            },
          });
        }
      } catch (error) {
        console.warn(
          "Local photography directory not found or not accessible:",
          (error as any)?.message || error,
        );
      }
    },
  };
}
