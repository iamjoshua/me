import type { Loader } from "astro/loaders";
import matter from "gray-matter";
import { processBlocks } from "../lib/utils";
import { getLastEditedTimestamps } from "../lib/github/getLastEditedTimestamps";

interface GitHubFile {
  name: string;
  type: "file" | "dir";
  download_url?: string;
  url: string;
}

async function fetchDirectoryContents(apiUrl: string): Promise<GitHubFile[]> {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

async function getAllMarkdownFiles(basePath: string): Promise<GitHubFile[]> {
  const files: GitHubFile[] = [];
  const contents = await fetchDirectoryContents(basePath);

  for (const item of contents) {
    if (item.type === "file" && item.name.endsWith(".md")) {
      files.push(item);
    } else if (item.type === "dir") {
      const subFiles = await getAllMarkdownFiles(item.url);
      files.push(...subFiles);
    }
  }

  return files;
}

export function essaysLoader(): Loader {
  return {
    name: "essays-loader",
    async load({ renderMarkdown, store }) {
      const baseUrl = "https://api.github.com/repos/iamjoshua/writings/contents/essays";
      const files = await getAllMarkdownFiles(baseUrl);
      const timestamps = await getLastEditedTimestamps("iamjoshua/writings", "essays");

      for (const file of files) {
        if (!file.download_url) continue;

        const fileResponse = await fetch(file.download_url);
        const contents = await fileResponse.text();

        const { data: frontmatter, content } = matter(contents);
        
        const publishedContent = processBlocks(content);
        
        const id = file.name
          .replace(".md", "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-");
        console.log("id", id);

        const title = frontmatter.title || 
          file.name
            .replace(".md", "")
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char: string) => char.toUpperCase());

        if (frontmatter.published !== true) {
          continue;
        }

        const excerpt = frontmatter.excerpt || 
          publishedContent.split('\n')
            .find(line => line.trim() && !line.startsWith('#'))
            ?.trim() || "";

        const fileTimestamp = timestamps[file.name];

        store.set({
          id,
          data: {
            title,
            excerpt,
            date: frontmatter.date,
            tags: frontmatter.tags,
            published: frontmatter.published,
            category: frontmatter.category,
            lastEdited: fileTimestamp?.lastEdited,
            createdAt: fileTimestamp?.createdAt,
          },
          rendered: await renderMarkdown(publishedContent),
        });
      }
    },
  };
}