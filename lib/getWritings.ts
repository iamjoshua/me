const BASE_URL = "https://api.github.com";
const BASE_FILE_URL = "https://raw.githubusercontent.com/iamjoshua";

export async function fetchGitMdFile(repo: string, path: string, tag: string) {
  const file = await fetchGitFile(repo, path, tag);
  return await file.text()
}

export async function fetchGitFile(repo: string, path: string, tag: string) {
  const url = `${BASE_FILE_URL}/${repo}/main/${path}`;
  console.log('url:', url)
  const response = await fetch(url, {
    cache: "force-cache",
    next: { tags: [tag] },
  });

  return response;
}

export async function getEssayTitles(path: string, tag: string) {
  const essays = await fetchMdFiles(path, tag);
  const fileNames = extractFileNames(essays);
  const titles = extractTitles(fileNames);
  return titles;
}

async function fetchMdFiles(path: string, tag: string): Promise<any[]> {
  try {
    const response = await fetchRepo(path, tag);
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

async function fetchFileContents(
  files: any[],
  tag: string,
): Promise<Map<string, string>> {
  const contentMap = new Map<string, string>();

  for (const file of files) {
    const content = await fetchFileContent(file, tag);
    contentMap.set(file.name, content);
  }

  return contentMap;
}

export async function fetchFileContent(
  url: string,
  tag: string,
): Promise<string> {
  const response = await fetch(url, {
    cache: "force-cache",
    next: { tags: [tag] },
  });

  if (response.ok) {
    const content = await response.text();
    return content;
  } else {
    throw new Error("Fetch failed");
  }
}

async function fetchRepo(path: string, tag: string): Promise<any> {
  const url = `${BASE_URL}/repos/iamjoshua/writings/contents/${path}`;
  const response = await fetch(url, {
    cache: "force-cache",
    next: { tags: [tag] },
  });

  return response;
}

export async function fetchMdFile(path: string, tag: string) {
  const response = await fetchRepo(path, tag);
  const data = await response.json();
  return data;
}

export async function parseMdFile(file: Record<any, any>) {
  const content = Buffer.from(file.content, "base64").toString("utf-8");
  return { url: file?.download_url, content };
}
