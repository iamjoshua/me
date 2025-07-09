import { defineCollection, z } from "astro:content";
import matter from "gray-matter";
import { questionsLoader } from "./loaders/questions";

const questions = defineCollection({
  loader: questionsLoader(),
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const readings = defineCollection({
  loader: async () => {
    // 1. Fetch from GitHub API
    const response = await fetch(
      "https://api.github.com/repos/iamjoshua/readings/contents/readings.md",
    );
    const data = await response.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");

    // 2. Parse custom format into individual readings
    const parsedReadings = parseReadingsMarkdown(content);

    // 3. Return array of entries
    return parsedReadings;
  },
  schema: z.object({
    title: z.string(),
    author: z.string(),
    type: z.string(),
    category: z.string(),
    status: z.string(),
    startedAt: z.string().optional(),
    completedAt: z.string().optional(),
    notes: z.string().optional(),
  }),
});

function parseReadingsMarkdown(content: string) {
  const readings: Array<{
    id: string;
    title: string;
    author: string;
    type: string;
    category: string;
    status: string;
    startedAt?: string;
    completedAt?: string;
    notes?: string;
  }> = [];

  // Split by H1 headers to get individual entries
  const sections = content
    .split(/\n(?=# )/)
    .filter((section) => section.trim());

  for (const section of sections) {
    const lines = section.split("\n");

    // Extract title from H1
    const title = lines[0]?.replace(/^# /, "").trim();
    if (!title) continue;

    // Extract author from H2
    const authorLine = lines.find((line) => line.startsWith("##"));
    const author = authorLine?.replace(/^## /, "").trim();
    if (!author) continue;

    // Extract YAML frontmatter
    const yamlStart = lines.findIndex((line) => line.trim() === "```yaml");
    const yamlEnd = lines.findIndex(
      (line, index) => index > yamlStart && line.trim() === "```",
    );

    let meta = {
      type: "",
      category: "",
      status: "",
      startedAt: "",
      completedAt: "",
    };

    if (yamlStart !== -1 && yamlEnd !== -1) {
      const yamlLines = lines.slice(yamlStart + 1, yamlEnd);
      for (const yamlLine of yamlLines) {
        const colonIndex = yamlLine.indexOf(":");
        if (colonIndex !== -1) {
          const key = yamlLine.slice(0, colonIndex).trim();
          const value = yamlLine.slice(colonIndex + 1).trim();
          if (key && value && key in meta) {
            (meta as any)[key] = value;
          }
        }
      }
    }

    // Extract notes after YAML block
    const notesStart = yamlEnd !== -1 ? yamlEnd + 1 : 0;
    const notes = lines
      .slice(notesStart)
      .filter((line) => !line.startsWith("```"))
      .join("\n")
      .trim();

    // Generate unique ID from title
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    readings.push({
      id,
      title,
      author,
      type: meta.type,
      category: meta.category,
      status: meta.status,
      startedAt: meta.startedAt || undefined,
      completedAt: meta.completedAt || undefined,
      notes: notes || undefined,
    });
  }

  return readings;
}

export const collections = { questions, readings };
