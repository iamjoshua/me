interface GitHubFile {
  name: string;
  path: string;
  download_url: string;
  type: 'file';
}

export async function getRepoContents(repo: string, path: string = ''): Promise<GitHubFile[]> {
  const url = `https://api.github.com/repos/${repo}/contents${path ? `/${path}` : ''}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch repository contents: ${response.statusText}`);
  }
  
  const contents = await response.json();
  
  // Filter for image files only
  return contents.filter((item: any) => 
    item.type === 'file' && 
    /\.(jpg|jpeg|png|webp)$/i.test(item.name)
  );
}