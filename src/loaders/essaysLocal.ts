import type { Loader } from "astro/loaders";
import matter from "gray-matter";
import { processBlocks } from "../lib/utils";
import { cloneRepository, getGitFileTimestamps } from "../lib/github/cloneRepository";
import { readFile } from "fs/promises";
import { join } from "path";
import { glob } from "glob";

export function essaysLocalLoader(): Loader {
  return {
    name: "essays-local-loader",
    async load({ renderMarkdown, store }) {
      try {
        // Clone the repository to a temporary directory
        const repoPath = await cloneRepository({
          repo: "iamjoshua/writings",
          targetDir: "/tmp/writings-repo"
        });
        
        const essaysPath = join(repoPath, "essays");
        
        // Find all markdown files in essays directory and subdirectories
        const files = await glob("**/*.md", { cwd: essaysPath });
        
        console.log(`Found ${files.length} essay files`);
      
      for (const relativePath of files) {
        const fullPath = join(essaysPath, relativePath);
        const contents = await readFile(fullPath, "utf-8");
        
        const { data: frontmatter, content } = matter(contents);
        
        const publishedContent = processBlocks(content);
        
        // Generate ID from filename
        const filename = relativePath.split('/').pop() || relativePath;
        const id = filename
          .replace(".md", "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-");
        
        console.log("id", id);
        
        const title = frontmatter.title || 
          filename
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
        
        // Get git timestamps
        const timestamps = await getGitFileTimestamps(repoPath, join("essays", relativePath));
        
        store.set({
          id,
          data: {
            title,
            excerpt,
            date: frontmatter.date,
            tags: frontmatter.tags,
            published: frontmatter.published,
            category: frontmatter.category,
            lastEdited: timestamps.lastEdited,
            createdAt: timestamps.createdAt,
          },
          rendered: await renderMarkdown(publishedContent),
        });
      }
      } catch (error) {
        console.error("Error in essaysLocalLoader:", error);
        throw error;
      }
    },
  };
}