import Link from "next/link";
import { Entry } from "@/lib/mdTools";

export function CurrentReading(props: Entry) {
  const reading = props;

  return (
    <Link href="/philosophy">
      <div className="px-10 max-h-[300px] overflow-hidden">
        {reading.meta.type && (
          <div className="absolute top-5 right-5 xmb-3 flex justify-end">
            <span className="py-1 px-2 mb-3 bg-sky-900 text-white text-[8px] rounded uppercase">
              {reading.meta.type}
            </span>
          </div>
        )}
        <div className="mb-2 flex items-center gap-10">
          <time className="text-xs font-normal leading-none text-gray-700">
            {reading.meta.startedAt}
          </time>
        </div>
        <h3 className="mb-1 text-lg md:text-sm font-semibold text-gray-900 ">
          {reading.title}
        </h3>
        {reading.content && false && (
          <p className="mb-4 text-sm font-normal text-gray-700">
            {reading.content}
          </p>
        )}
      </div>
    </Link>
  );
}
