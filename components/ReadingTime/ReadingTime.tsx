"use client";

import { twMerge } from "tailwind-merge";
import useReadingTime from "use-reading-duration";

type ReadingTimeProps = {
  content: string;
  wordsPerMinute?: number;
  className?: string;
};

export function ReadingTime(
  { content, wordsPerMinute, className }: ReadingTimeProps,
) {
  wordsPerMinute = wordsPerMinute ?? 240;
  const readingTime = useReadingTime(content, wordsPerMinute);

  return (
    <div className={twMerge("text-xs text-neutral-950", className)}>
      About a <span className="font-bold">{readingTime} minute</span> read
    </div>
  );
}
