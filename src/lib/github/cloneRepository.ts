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