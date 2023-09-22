import { Entry } from "@/lib/mdTools";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type ReadingProps = Entry;

export function Reading({ title, author, content, meta }: ReadingProps) {
  return (
    <li className="mb-10 ml-4">
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <div className="flex items-center gap-10">
        <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {meta.startedAt}
        </time>
        <StatusTag status={meta.status} />
      </div>
      <h3 className="mt-1 mb-1 text-lg font-semibold text-gray-900 ">
        {title}
      </h3>
      <h2 className="mb-4 text-sm text-gray-800 ">{author}</h2>
      {content && (
        <ReactMarkdown className="prose mb-4 text-sm font-normal text-gray-500">
          {content}
        </ReactMarkdown>
      )}
    </li>
  );
}

export function StatusTag({ status }: { status?: string }) {
  return status === "reading" ? (
    <span className="py-1 px-2 bg-sky-900 text-white text-[8px] rounded uppercase">
      {status}
    </span>
  ) : null;
}
