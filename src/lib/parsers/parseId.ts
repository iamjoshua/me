export function parseId(filename: string): string {
  return filename
    .replace(".md", "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}