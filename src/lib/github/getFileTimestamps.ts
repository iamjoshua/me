import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface FileTimestamp {
  editedAt: string;
  createdAt: string;
}

export async function getFileTimestamps(
  repoPath: string,
  filePath: string,
): Promise<FileTimestamp> {
  const { stdout: editedAt } = await execAsync(
    `cd ${repoPath} && git log -1 --format="%aI" -- "${filePath}"`,
  );

  const { stdout: createdAt } = await execAsync(
    `cd ${repoPath} && git log --reverse --format="%aI" -- "${filePath}" | head -1`,
  );

  return {
    editedAt: editedAt.trim(),
    createdAt: createdAt.trim(),
  };
}

