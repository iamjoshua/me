import Image from "next/image";
import Link from "next/link";
import { CurrentReading } from "./current_reading";
import { Animated } from "./motion";
import Latest from "./latest";
import Philosophy from "./philosophy/page";
import { Readings } from "./philosophy/Readings";

type HomeProps = {
  readings: any;
  questions: any;
};

export default function HomeV2({ readings, questions }: HomeProps) {
  return (
    <div className="flex flex-col w-full min-h-[100dvh]">
      <div className="flex flex-col md:flex-row h-full w-full">
        <div className="h-[100dvh] w-full md:w-3/5 flex items-center justify-center">
          <div className="relative md:fixed z-50 px-10 md:px-0 text-left md:text-right">
            <Animated
              as="h1"
              className="text-3xl leading-normal md:text-4xl md:leading-normal font-thin"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ ease: "easeInOut", duration: 1 }}
              initial="hidden"
              animate="visible"
            >
              <span className="">
                I engage with
                <br className="md:hidden" /> problems in{" "}
                <Link
                  href="/philosophy"
                  className="text-sky-600 hover:text-sky-500 transition-color duration-300"
                >
                  philosophy
                </Link>
                ,<br />
              </span>
              <span className="">
                create digital <span className="">tools</span>, and shoot
                <span className=""> video</span>.
              </span>
            </Animated>
          </div>
        </div>
        <div className="mt-0 md:mt-[250px] px-10">
          <h2 className="relative z-50 -mb-5 text-xs text-neutral-500 uppercase font-bold">
            What I&apos;ve been reading
          </h2>
          <Readings readings={readings} />
        </div>
      </div>
    </div>
  );
}

function Cell({ children, bg }: any) {
  return (
    <div
      className={`relative ${bg} flex justify-center items-center text-xs pt-5 hover:pt-0 text-transparent hover:text-white transition-all duration-300 overflow-hidden`}
    >
      {/* <div
        className={`absolute top-0 left-0 z-10 w-full h-full ${bg} opacity-50 hover:opacity-0 transition duration-300`}
      ></div> */}

      {/* <div className="flex flex-col"> */}
      {/* <div className="text-white text-center">Latest App update</div> */}
      {/* <div className="">Coming soon...</div> */}
      {/* </div> */}

      {children}
    </div>
  );
}
