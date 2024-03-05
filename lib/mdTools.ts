import yaml from "yaml";
import matter from "gray-matter";

type Meta = {
  type: string;
  category: string;
  status: string;
  startedAt: string;
  completedAt: string;
};

export type Entry = {
  title: string;
  author: string;
  content: string;
  meta: Meta;
};

export function parseMarkdown(data: string): Entry[] {
  const entries: Entry[] = [];
  const sections = data.split(/\n(?=# )/);

  for (const section of sections) {
    const lines = section.split("\n");
    const title = getByPattern(lines, "# ");
    const author = getByPattern(lines, "## ");
    const { meta, content } = getMetaDataAndContent(lines);

    entries.push({ title, author, content, meta });
  }

  return entries;
}

function getByPattern(lines: string[], pattern: string): string {
  const match = lines
    .find((line) => line.startsWith(pattern))
    ?.slice(pattern.length)
    ?.trim();
  return match || "";
}

function getMetaDataAndContent(lines: string[]): {
  meta: Meta;
  content: string;
} {
  const metadataStart = lines.findIndex((line) => line.startsWith("```yaml")) +
    1;
  const metadataEnd = lines.findIndex(
    (line) => line.endsWith("```"),
    metadataStart,
  );
  const metadataString = lines.slice(metadataStart, metadataEnd).join("\n");
  const meta = yaml.parse(metadataString);
  const content = lines
    .slice(metadataEnd + 1)
    .join("\n")
    .trim();

  return { meta, content };
}
