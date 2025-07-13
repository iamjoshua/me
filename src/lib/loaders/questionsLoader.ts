import type { Loader } from "astro/loaders";
import { z } from "astro:content";
import { getRepoFiles } from "@/lib/github/getRepoFiles";
import { parseFile } from "@/lib/parsers/parseFile";

export const questionSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  elaboration: z.string().optional(),
  position: z.string().optional(),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  editedAt: z.string().optional(),
  createdAt: z.string().optional(),
});

export function questionsLoader(): Loader {
  return {
    name: "questions-loader",
    async load({ renderMarkdown, store }) {
      try {
        const { files, repoPath } = await getRepoFiles({
          repo: "iamjoshua/writings",
          subPath: "questions",
          pattern: "**/*.md",
        });

        for (const file of files) {
          const parsed = await parseFile({
            file,
            repoPath,
            subPath: "questions",
            renderMarkdown,
          });

          if (!parsed.published) continue;

          parsed.title = parsed.title.replace("?", "") + "?";

          store.set({
            id: parsed.id,
            data: { ...parsed, ...parsed.frontmatter },
            rendered: parsed.rendered,
          });
        }
      } catch (error) {
        console.error("Error in questionsLoader:", error);
        throw error;
      }
    },
  };
}
