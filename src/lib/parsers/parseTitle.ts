import { titleCase } from "title-case";

export function parseTitle(
  frontmatterTitle: string | undefined,
  filename: string,
): string {
  if (frontmatterTitle) {
    return titleCase(frontmatterTitle);
  }

  const cleanedFilename = filename
    .replace(".md", "")
    .replace(/_/g, " ")
    .replace(/-/g, " ");

  return titleCase(cleanedFilename);
}

