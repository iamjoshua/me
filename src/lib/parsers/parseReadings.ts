import { parse } from "csv-parse/sync";

export function parseReadings(content: string) {
  const readings: Array<{
    id: string;
    title: string;
    author: string;
    type: string;
    category: string;
    status: string;
    startedAt?: string;
    completedAt?: string;
    rating?: string;
    notes?: string;
  }> = [];

  try {
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      quote: '"',
      escape: '"',
      delimiter: ",",
      relax_quotes: true,
    });

    for (const record of records) {
      const {
        title,
        author,
        type,
        category,
        status,
        startedAt,
        completedAt,
        rating,
        notes,
      } = record;

      if (!title || !author) continue; // Skip rows without required fields

      // Generate unique ID from title
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      readings.push({
        id,
        title,
        author,
        type,
        category,
        status,
        startedAt: startedAt || undefined,
        completedAt: completedAt || undefined,
        rating: rating || undefined,
        notes: notes || undefined,
      });
    }
  } catch (error) {
    console.error("Error parsing CSV:", error);
    return [];
  }

  return readings;
}
