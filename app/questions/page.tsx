import Nav from "../nav";
import { SideContent } from "@/components/SideContent";
import Link from "next/link";
import { getAllQuestions } from "@/lib/getWritings";

export default async function QuestionsPage() {
  const questions = await getAllQuestions();

  return (
    <main
      key="questions"
      className="min-h-[100dvh] w-full flex justify-between"
    >
      <div className="h-full w-full flex flex-col md:flex-row justify-end">
        <SideContent>
          <h1 className="mb-5 text-3xl leading-normal md:text-4xl md:leading-normal font-thin text-sky-400">
            Questions
          </h1>
          <p className="text-2xl md:text-xl lg:text-2xl font-thin lg:leading-relaxed text-white">
            I've never enjoyed writing essays, but I love engaging with
            questions.
          </p>
        </SideContent>
        <div className="h-full w-full md:w-7/12 min-h-[200px] mr-10 flex justify-start">
          <div className="flex flex-row flex-wrap w-full h-full">
            {questions.map(({ slug, question }, index) => (
              <QuestionBox
                key={index}
                slug={slug}
                question={question}
              />
            ))}
          </div>
          {/* Nav cover */}
          <div className="fixed bottom-0 w-full h-[110px] bg-white/30 border-t border-t-gray-300 md:border-0">
          </div>
        </div>
      </div>
      <Nav
        fixed={true}
        nameClassName="md:text-white "
        className="md:bg-transparent"
      />
    </main>
  );
}

type QuestionBoxProps = {
  slug: string;
  question: string;
};

export function QuestionBox({ slug, question }: QuestionBoxProps) {
  return (
    <div className="group bg-white hover:bg-sky-600 transition-all duration-300 flex justify-center content-center">
      <Link
        href={`/questions/${slug}`}
        className="group-hover:text-white transition-all duration-300 p-20"
      >
        {question}
      </Link>
    </div>
  );
}
