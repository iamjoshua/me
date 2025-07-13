export function parseExcerpt(
  frontmatterExcerpt: string | undefined, 
  content: string
): string {
  if (frontmatterExcerpt) {
    return frontmatterExcerpt;
  }
  
  return content
    .split('\n')
    .find(line => line.trim() && !line.startsWith('#'))
    ?.trim() || "";
}