import { glob } from "glob";
import { readFile } from "fs/promises";
import { join } from "path";

export interface File {
  path: string;
  filename: string;
  content: string;
}

export async function getFiles(directory: string, pattern: string): Promise<File[]> {
  const filePaths = await glob(pattern, { cwd: directory });
  
  const files: File[] = [];
  
  for (const relativePath of filePaths) {
    const fullPath = join(directory, relativePath);
    const content = await readFile(fullPath, "utf-8");
    const filename = relativePath.split('/').pop() || relativePath;
    
    files.push({
      path: relativePath,
      filename,
      content
    });
  }
  
  return files;
}