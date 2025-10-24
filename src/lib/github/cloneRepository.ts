import { exec } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";
import path from "path";

const execAsync = promisify(exec);

export interface CloneOptions {
  repo: string;
  targetDir: string;
  branch?: string;
  sparseCheckoutPaths?: string[];
}

export async function cloneRepository({ repo, targetDir, branch = "master", sparseCheckoutPaths }: CloneOptions): Promise<string> {
  const absolutePath = path.resolve(targetDir);

  // Check if directory already exists
  if (existsSync(absolutePath)) {
    console.log(`Repository already exists at ${absolutePath}, cleaning and pulling latest changes...`);
    await execAsync(`cd ${absolutePath} && git clean -fd && git pull origin ${branch}`);
  } else {
    if (sparseCheckoutPaths && sparseCheckoutPaths.length > 0) {
      console.log(`Cloning repository ${repo} with sparse checkout (${sparseCheckoutPaths.join(', ')}) to ${absolutePath}...`);
      await execAsync(`git clone --filter=blob:none --no-checkout --branch ${branch} https://github.com/${repo}.git ${absolutePath}`);
      await execAsync(`cd ${absolutePath} && git sparse-checkout init --cone`);
      await execAsync(`cd ${absolutePath} && git sparse-checkout set ${sparseCheckoutPaths.join(' ')}`);
      await execAsync(`cd ${absolutePath} && git checkout ${branch}`);
    } else {
      console.log(`Cloning repository ${repo} to ${absolutePath}...`);
      await execAsync(`git clone --branch ${branch} https://github.com/${repo}.git ${absolutePath}`);
    }
  }

  return absolutePath;
}