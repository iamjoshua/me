import type { Loader } from "astro/loaders";
import matter from "gray-matter";

export function questionsLoader(): Loader {
  return {
    name: "cms-loader",
    async load({ renderMarkdown, store }) {
      const response = await fetch(
        "https://api.github.com/repos/iamjoshua/writings/contents/questions/",
      );
      const data = await response.json();

      // 2. Fetch each question file
      for (const file of data) {
        if (file.type === "file" && file.name.endsWith(".md")) {
          const fileResponse = await fetch(file.download_url);
          const contents = await fileResponse.text();

          // 3. Parse the markdown content
          const { data: frontmatter, content } = matter(contents);
          const id = file.name
            .replace(".md", "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-");
          console.log("id", id);

          const title =
            frontmatter.title ||
            file.name
              .replace(".md", "")
              .replace(/-/g, " ")
              .replace(/^./, (str: String) => str.toUpperCase());

          // Only import questions that are published
          if (frontmatter.published !== true) {
            continue;
          }

          const excerpt = frontmatter.elaboration || frontmatter.excerpt || 
            content.split('\n')
              .find(line => line.trim() && !line.startsWith('#'))
              ?.trim() || "";

          store.set({
            id,
            data: {
              title,
              excerpt,
              elaboration: frontmatter.elaboration,
              position: frontmatter.position,
              date: frontmatter.date,
              tags: frontmatter.tags,
              published: frontmatter.published,
            },
            rendered: await renderMarkdown(content),
          });
        }
      }
    },
  };
}
