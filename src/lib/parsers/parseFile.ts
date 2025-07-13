import matter from "gray-matter";
import { processBlocks } from "../utils";
import { parseId } from "./parseId";
import { parseTitle } from "./parseTitle";
import { parseExcerpt } from "./parseExcerpt";
import { getFileTimestamps } from "../github/getFileTimestamps";
import { join } from "path";

interface FileParserOptions {
  file: {
    filename: string;
    content: string;
    path: string;
  };
  repoPath: string;
  subPath: string;
  renderMarkdown: (content: string) => Promise<any>;
}

interface ParsedFile {
  id: string;
  title: string;
  frontmatter: Record<string, any>;
  excerpt: string;
  processedContent: string;
  rendered: any;
  editedAt: string;
  createdAt: string;
  published: boolean;
  tags?: string[];
  category?: string;
}

export async function parseFile({
  file,
  repoPath,
  subPath,
  renderMarkdown,
}: FileParserOptions): Promise<ParsedFile> {
  const { data: frontmatter, content } = matter(file.content);
  const id = parseId(file.filename);
  const title = parseTitle(frontmatter.title, file.filename);
  const action = frontmatter.published ? "publishing" : "\tignoring";
  console.log(action, title);

  const published = frontmatter.published === true;
  const processedContent = processBlocks(content);
  const excerpt = parseExcerpt(frontmatter.excerpt, processedContent);
  const rendered = await renderMarkdown(processedContent);
  const timestamps = await getFileTimestamps(
    repoPath,
    join(subPath, file.path),
  );

  return {
    id,
    frontmatter,
    title,
    excerpt,
    processedContent,
    rendered,
    editedAt: timestamps.editedAt,
    createdAt: timestamps.createdAt,
    published,
    tags: frontmatter.tags,
    category: frontmatter.category,
  };
}

