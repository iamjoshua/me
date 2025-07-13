import type { Loader } from "astro/loaders";

export function readingsLoader(): Loader {
  return {
    name: "readings-loader",
    async load({ store }) {
      // 1. Fetch from GitHub API
      const response = await fetch(
        "https://api.github.com/repos/iamjoshua/readings/contents/readings.csv",
      );
      
      if (!response.ok) {
        console.error("Failed to fetch readings:", response.status, response.statusText);
        return;
      }
      
      const data = await response.json();
      
      if (!data.content) {
        console.error("GitHub API error for readings:", data);
        return;
      }
      
      const content = Buffer.from(data.content, "base64").toString("utf-8");

      // 2. Parse CSV into individual readings
      const parsedReadings = parseReadingsCSV(content);

      // 3. Store each reading
      for (const reading of parsedReadings) {
        store.set({
          id: reading.id,
          data: {
            title: reading.title,
            author: reading.author,
            type: reading.type,
            category: reading.category,
            status: reading.status,
            startedAt: reading.startedAt,
            completedAt: reading.completedAt,
            rating: reading.rating,
            notes: reading.notes,
          },
        });
      }
    },
  };
}

function parseReadingsCSV(content: string) {
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

  const lines = content.split('\n').filter(line => line.trim());
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Simple CSV parsing - assumes no commas in quoted fields
    const columns = line.split(',').map(col => col.trim());
    
    if (columns.length < 9) continue; // Skip incomplete rows
    
    const [title, author, type, category, status, startedAt, completedAt, rating, notes] = columns;
    
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