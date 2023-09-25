import { fetchGitMdFile } from "./getWritings";
import { parseMarkdown } from "./mdTools";

export async function getCurrentReading() {
  const file = (await fetchGitMdFile(
    "readings",
    "readings.md",
    "readings",
  )) as string;
  const readings = parseMarkdown(file);

  return readings[0];
}
