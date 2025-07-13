import { repositoryCache } from "./repositoryCache";
import { getFiles } from "./getFiles";
import { join } from "path";

interface RepoFilesOptions {
  repo: string;
  subPath: string;
  pattern: string;
}

interface RepoFilesResult {
  files: Array<{
    path: string;
    filename: string;
    content: string;
  }>;
  repoPath: string;
}

export async function getRepoFiles({
  repo,
  subPath,
  pattern
}: RepoFilesOptions): Promise<RepoFilesResult> {
  const repoPath = await repositoryCache.getRepository({
    repo,
    targetDir: "/tmp/writings-repo",
  });
  const fullPath = join(repoPath, subPath);
  const files = await getFiles(fullPath, pattern);
  console.log(`Found ${files.length} ${subPath} files`);
  
  return {
    files,
    repoPath
  };
}