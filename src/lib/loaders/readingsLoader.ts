import { getRepoFile } from "@/lib/github/getRepoFile";
import { parseReadings } from "@/lib/parsers/parseReadings";
import type { Loader } from "astro/loaders";
import { z } from "astro:content";

export const readingSchema = z.object({
  title: z.string(),
  author: z.string(),
  type: z.string(),
  category: z.string(),
  status: z.string(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  rating: z.string().optional(),
  notes: z.string().optional(),
});

export function readingsLoader(): Loader {
  return {
    name: "readings-loader",
    async load({ store }) {
      const { content } = await getRepoFile({
        repo: "iamjoshua/readings",
        filePath: "readings.csv",
      });

      const parsedReadings = parseReadings(content);

      for (const reading of parsedReadings) {
        store.set({
          id: reading.id,
          data: reading,
        });
      }
    },
  };
}
