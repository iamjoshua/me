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

  const lines = content.split("\n").filter((line) => line.trim());

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    // Simple CSV parsing - assumes no commas in quoted fields
    const columns = line.split(",").map((col) => col.trim());

    if (columns.length < 9) continue; // Skip incomplete rows

    const [
      title,
      author,
      type,
      category,
      status,
      startedAt,
      completedAt,
      rating,
      notes,
    ] = columns;

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

  return readings;
}