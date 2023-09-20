const cache: Record<string, any> = {};

export async function getEssayTitles(path: string) {
  const essays = await fetchMdFiles(path);
  const fileNames = extractFileNames(essays);
  const titles = extractTitles(fileNames);
  return titles;
}

export async function getWritings(path: string) {
  if (cache?.titles) return cache;
  console.log("no cache");
  const mdFiles = await fetchMdFiles(path);
  const titles = extractFileNames(mdFiles);
  const contents: string[] = []; /// await fetchFileContents(mdFiles);
  cache.titles = titles;
  cache.contents = contents;
  return { titles, contents };
}

const BASE_URL = "https://api.github.com";

async function fetchMdFiles(path: string): Promise<any[]> {
  try {
    const response = await fetchRepo(path);
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Expected an array of files but received something else.");
      return [];
    }

    return data.filter(
      (file) => file.type === "file" && file.name.endsWith(".md"),
    );
  } catch (error: any) {
    console.error(`Failed to fetch .md files: ${error.message}`);
    return [];
  }
}

function extractFileNames(files: any[]): string[] {
  return files.map((file) => file.name);
}

function extractTitles(fileNames: string[]): string[] {
  return fileNames.map((name) => name.replaceAll("-", " ").replace(".md", ""));
}

async function fetchFileContents(files: any[]): Promise<Map<string, string>> {
  const contentMap = new Map<string, string>();

  for (const file of files) {
    const content = await fetchFileContent(file);
    contentMap.set(file.name, content);
  }

  return contentMap;
}

export async function fetchFileContent(url: string): Promise<string> {
  const response = await fetch(url);
  if (response.ok) {
    const content = await response.text();
    return content;
  } else {
    throw new Error("Fetch failed");
  }
}

async function fetchRepo(path: string): Promise<any> {
  const url = `${BASE_URL}/repos/iamjoshua/writings/contents/${path}`;
  const response = await fetch(url, { cache: "force-cache" });
  return response;
}

export async function fetchMdFile(path: string) {
  const response = await fetchRepo(path);
  const data = await response.json();
  console.log(data);
  return data;
}

export async function parseMdFile(file: Record<any, any>) {
  const content = Buffer.from(file.content, "base64").toString("utf-8");
  return { url: file?.download_url, content };
}
