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
  keywords: z.array(z.string()).optional(),
  location: z.object({
    sublocation: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  rating: z.number().optional(),
  date: z.string().optional(),
  camera_make: z.string().optional(),
  camera_model: z.string().optional(),
  lens_model: z.string().optional(),
  focal_length: z.number().optional(),
  aperture: z.number().optional(),
  shutter_speed: z.string().optional(),
  iso: z.number().optional(),
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
                keywords: Array.isArray(parsed.keywords) ? parsed.keywords : undefined,
                location: parsed.location && typeof parsed.location === 'object' ? {
                  sublocation: parsed.location.sublocation,
                  city: parsed.location.city,
                  state: parsed.location.state,
                  country: parsed.location.country,
                } : undefined,
                rating: typeof parsed.rating === 'number' ? parsed.rating : undefined,
                date: typeof parsed.date === 'string' ? parsed.date : undefined,
                camera_make: typeof parsed.camera_make === 'string' ? parsed.camera_make : undefined,
                camera_model: typeof parsed.camera_model === 'string' ? parsed.camera_model : undefined,
                lens_model: typeof parsed.lens_model === 'string' ? parsed.lens_model : undefined,
                focal_length: typeof parsed.focal_length === 'number' ? parsed.focal_length : undefined,
                aperture: typeof parsed.aperture === 'number' ? parsed.aperture : undefined,
                shutter_speed: typeof parsed.shutter_speed === 'string' || typeof parsed.shutter_speed === 'number' ? String(parsed.shutter_speed) : undefined,
                iso: typeof parsed.iso === 'number' ? parsed.iso : undefined,
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
