import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export function getFrontMatter(fileContents: string) {
  return matter(fileContents);
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
