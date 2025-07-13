import type { Loader } from "astro/loaders";
import { z } from "astro:content";
import { getRepoFiles } from "@/lib/github/getRepoFiles";
import { parseFile } from "@/lib/parsers/parseFile";

export const essaySchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  category: z.string().optional(),
  editedAt: z.string().optional(),
  createdAt: z.string().optional(),
});

export function essaysLoader(): Loader {
  return {
    name: "essays-loader",
    async load({ renderMarkdown, store }) {
      try {
        const { files, repoPath } = await getRepoFiles({
          repo: "iamjoshua/writings",
          subPath: "essays",
          pattern: "**/*.md",
        });

        for (const file of files) {
          const parsed = await parseFile({
            file,
            repoPath,
            subPath: "essays",
            renderMarkdown,
          });

          if (!parsed.published) continue;

          store.set({
            id: parsed.id,
            data: { ...parsed },
            rendered: parsed.rendered,
          });
        }
      } catch (error) {
        console.error("Error in essaysLoader:", error);
        throw error;
      }
    },
  };
}
