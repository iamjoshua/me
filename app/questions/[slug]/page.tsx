import Nav from "@/app/nav";
import { ReadingTime } from "@/components/ReadingTime/ReadingTime";
import { SideContent } from "@/components/SideContent";
import { getAllQuestions, getQuestion } from "@/lib/getWritings";
import Link from "next/link";
import "./question.css";

export async function generateStaticParams() {
  const questions = await getAllQuestions();
  return questions.map((question) => ({
    slug: question.slug,
  }));
}

type QuestionPageProps = {
  params: { slug: string };
};

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { slug } = params;
  const {
    question,
    url,
    elaboration,
    position,
    content,
    createdAt,
    lastUpdatedAt,
  } = await getQuestion(
    slug,
  );

  return (
    <main
      key="questions"
      className="min-h-[100dvh] w-full flex justify-between"
    >
      <div className="h-full w-full flex flex-col md:flex-row justify-end">
        <SideContent className="bg-white">
          <p className="text-3xl md:text-xl lg:text-4xl font-thin lg:leading-relaxed text-neutral-500">
            {question}
          </p>
        </SideContent>
        <div className="h-full w-full md:w-7/12 min-h-[200px] flex justify-start ">
          <div className="pt-0 pb-0 w-full max-w-2xl">
            <div className="sticky top-0 bg-white/90 ">
              <div className="flex flex-row justify-between w-4/5 mt-5 mb-2 py-5 border- border-b border-neutral-200">
                <ReadingTime content={content} />
                <div className="ml-10 flex flex-col gap-0 text-xs">
                  <div className="font-bol hidden">updated:</div>
                  <div className="font-bol">{lastUpdatedAt}</div>
                </div>
              </div>
            </div>
            <div className="mt0 my-28">
              <div className="text-xs text-black font-thin mb-2">
                elaboration
              </div>
              <div className="text-xl text-neutral-700 leading-10 font-base italic">
                {elaboration}
              </div>
              <div className="mt-8 text-xs text-black font-thin mb-2">
                my position
              </div>
              <div className="">{position}</div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="question font-light"
            />
            <div className="h-10" />
            <div className="flex flex-row justify-between w-4/5 mb-12 py-5 border-t border-b border-neutral-200">
              <div className="ml-0 flex flex-col gap-0 text-xs">
                <div className="font-bold">created</div>
                <div className="font-bol">{createdAt}</div>
              </div>
              <div className="ml-0 flex flex-col gap-0 text-xs">
                <div className="font-bold">updated</div>
                <div className="font-bol">{lastUpdatedAt}</div>
              </div>
              <div className="ml-0 flex flex-col gap-0 text-xs">
                <div className="font-bold">source</div>
                <Link
                  href={url}
                  className="text-xs hover:text-sky-800 transition-all duration-300"
                >
                  Github
                </Link>
              </div>
            </div>
            <div className="h-36" />
          </div>
          {/* Nav cover */}
          <div className="fixed bottom-0 w-full h-[110px] bg-white/70 backdrop-blur-md border-t border-t-gray-300 md:border-0">
          </div>
        </div>
      </div>
      <Nav
        fixed={true}
        nameClassName=""
        className="md:bg-transparent"
      />
    </main>
  );
}
