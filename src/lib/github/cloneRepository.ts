import { exec } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";
import path from "path";

const execAsync = promisify(exec);

export interface CloneOptions {
  repo: string;
  targetDir: string;
  branch?: string;
}

export async function cloneRepository({ repo, targetDir, branch = "master" }: CloneOptions): Promise<string> {
  const absolutePath = path.resolve(targetDir);
  
  // Check if directory already exists
  if (existsSync(absolutePath)) {
    console.log(`Repository already exists at ${absolutePath}, pulling latest changes...`);
    await execAsync(`cd ${absolutePath} && git pull origin ${branch}`);
  } else {
    console.log(`Cloning repository ${repo} to ${absolutePath}...`);
    await execAsync(`git clone --branch ${branch} https://github.com/${repo}.git ${absolutePath}`);
  }
  
  return absolutePath;
}

export interface FileTimestamp {
  lastEdited: string;
  createdAt: string;
}

export async function getGitFileTimestamps(
  repoPath: string,
  filePath: string
): Promise<FileTimestamp> {
  // Get last edited date
  const { stdout: lastEdited } = await execAsync(
    `cd ${repoPath} && git log -1 --format="%aI" -- "${filePath}"`
  );
  
  // Get creation date
  const { stdout: createdAt } = await execAsync(
    `cd ${repoPath} && git log --reverse --format="%aI" -- "${filePath}" | head -1`
  );
  
  return {
    lastEdited: lastEdited.trim(),
    createdAt: createdAt.trim()
  };
}