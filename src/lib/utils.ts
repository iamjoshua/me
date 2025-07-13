import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BlockProcessingConfig {
  [blockType: string]: "remove" | "wrap";
}

export function processBlocks(
  content: string,
  config: BlockProcessingConfig = { draft: "remove" },
): string {
  const blockRegex = /^:::([a-zA-Z]+).*$\n([\s\S]*?)^:::.*$/gm;

  return content
    .replace(blockRegex, (match, blockType, blockContent) => {
      const normalizedBlockType = blockType.toLowerCase();
      const action = config[normalizedBlockType] || "wrap";

      if (action === "remove") {
        return "";
      }

      const trimmedContent = blockContent.trim();
      return `<div class="${normalizedBlockType}">\n\n${trimmedContent}\n\n</div>`;
    })
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();
}
