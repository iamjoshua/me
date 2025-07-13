import { cloneRepository } from "./cloneRepository";
import { readFile } from "fs/promises";
import { join } from "path";

interface RepoFileOptions {
  repo: string;
  filePath: string;
}

interface RepoFileResult {
  content: string;
  repoPath: string;
}

export async function getRepoFile({
  repo,
  filePath
}: RepoFileOptions): Promise<RepoFileResult> {
  const repoPath = await cloneRepository({
    repo,
    targetDir: "/tmp/readings-repo",
    branch: "main",
  });
  const fullPath = join(repoPath, filePath);
  const content = await readFile(fullPath, "utf-8");
  
  return {
    content,
    repoPath
  };
}