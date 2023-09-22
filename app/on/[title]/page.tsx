import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { fetchMdFile, getEssayTitles, parseMdFile } from "@/lib/getWritings";

export async function generateStaticParams() {
  const titles = await getEssayTitles("essays/", "essays");
  console.log("generate?", titles);

  return titles.map((title: string) => ({
    title: title.replaceAll(" ", "-"),
  }));
}

export default async function Essay({
  params,
}: {
  params: { title: string; content: string; magic: string };
}) {
  const path = `essays/${params.title.replaceAll(" ", "-")}.md`;
  const content = await fetchMdFile(path, "essays");
  const file = await parseMdFile(content);

  return (
    <div className="p-10 pb-[120px] w-full flex justify-start lg:justify-center w-fit">
      <ReactMarkdown className="prose prose-base max-w-[900px] prose-headings:font-thin prose-h1:text-3xl">
        {file.content}
      </ReactMarkdown>
    </div>
  );
}
