import Nav from "../nav";
import Event from "./event";
// import { readings } from "../readings";
import { fetchGitMdFile } from "@/lib/getWritings";
import { Quote } from "./Quote";
import { parseMarkdown } from "@/lib/mdTools";
import { Reading } from "./Reading";

async function Philosophy() {
  const wow = (await fetchGitMdFile(
    "readings",
    "readings.md",
    "readings",
  )) as string;
  const readings = parseMarkdown(wow);
  // console.log("readings:", wow);
  return (
    // <PageWrapper>
    <main
      key="philosophy2"
      // initial={{ opacity: 0, y: 30 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: 30 }}
      // transition={{ duration: 2 }}
      className="min-h-[100dvh] w-full flex justify-between"
    >
      <div className="h-full w-full flex flex-col md:flex-row justify-end">
        <Quote />
        <div className="h-full w-full md:w-7/12 min-h-[200px] flex justify-start">
          <div className="max-w-screen-lg p-10 md:pl-0 mb-10 ">
            <h1 className="mb-5 text-3xl leading-normal md:text-4xl md:leading-normal font-thin">
              Philosophy
            </h1>
            <p className="text-md leading-relaxed text-gray-500">
              I&apos;ve had a life-long love of philosophy, but it wasn&apos;t
              until my mid 30&apos;s that I learned that modern analytic
              philosophy was alive and thriving. Ever since, I&apos;ve been
              committed to getting up to date on the academic literature with
              the hope of one day contributing. I study broadly, but with an
              emphasis on the philosophy of mind.{" "}
            </p>

            <ol className="mt-10 relative border-l border-gray-200 dark:border-gray-700">
              {readings.map((reading, key) => (
                <Reading key={key} {...reading} />
              ))}
            </ol>
          </div>
          {/* Nav cover */}
          <div className="fixed bottom-0 w-full h-[110px] bg-white/30 border-t border-t-gray-300 md:border-0"></div>
        </div>
      </div>
      <Nav
        fixed={true}
        nameClassName="md:text-white "
        className="md:bg-transparent"
        // linksClassName="first:ml-10"
      />
    </main>
    // </PageWrapper>
  );
}

export default Philosophy;
