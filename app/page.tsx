import Nav from "./nav";
import HomeV1 from "./homev1";
import TheGrid from "./thegrid";
import { getCurrentReading } from "@/lib/getCurrentReading";
import HomeV2 from "./homev2";
import { fetchGitMdFile, getAllQuestions } from "@/lib/getWritings";
import { parseMarkdown } from "@/lib/mdTools";

export default async function Home() {
  const reading = await getCurrentReading();
  const wow = (await fetchGitMdFile(
    "readings",
    "readings.md",
    "readings",
  )) as string;
  const readings = parseMarkdown(wow);
  const questions = await getAllQuestions();

  return (
    <main className="w-[100dvw] h-full w-full flex flex-col justify-between overflow-hidden">
      <TheGrid />
      <HomeV2 readings={readings} questions={questions} />
      <div className="mb-20" />
      <Nav fixed={true} className="bg-transparent" />
    </main>
  );
}
