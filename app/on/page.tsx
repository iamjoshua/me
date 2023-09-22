import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getEssayTitles } from "@/lib/getWritings";

export default async function On() {
  const titles = await getEssayTitles("essays/", "essays");

  return (
    <div className="p-5">
      <div className="h-full w-full md:w-7/12 min-h-[200px] flex justify-start">
        <div className="max-w-screen-lg p-10 pt-0 md:pl-0 mb-10 ">
          <h1 className="mb-5 text-3xl leading-normal md:text-4xl md:leading-normal font-thin">
            Philosophy
          </h1>

          {titles.map((title, index) => (
            <div key={index}>
              <Link href={`/on/${title.replaceAll(" ", "-")}`}>{title}</Link>
            </div>
          ))}

          <p className="text-md leading-relaxed text-gray-500">
            I&apos;ve had a life-long love of philosophy, but it wasn&apos;t
            until my mid 30&apos;s that I learned that modern analytic
            philosophy was alive and thriving. Ever since, I&apos;ve been
            committed to getting up to date on the academic literature with the
            hope of one day contributing. I study broadly, but with an emphasis
            on the philosophy of mind.{" "}
          </p>
          <ReactMarkdown>hello</ReactMarkdown>
        </div>
        {/* Nav cover */}
        <div className="fixed bottom-0 w-full h-[calc(6rem+1px)] bg-white/90 border-t border-t-gray-100 md:border-0"></div>
      </div>
    </div>
  );
}
