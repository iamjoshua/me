import Image from "next/image";
import Link from "next/link";
import { CurrentReading } from "./current_reading";
import { Animated } from "./motion";

type HomeProps = {
  reading: any;
};

export default function HomeV1({ reading }: HomeProps) {
  return (
    <>
      <div className="h-3/6 min-h-[130px] flex justify-center">
        <div className="p-10 lg:p-0 lg:w-2/3 flex items-center justify-center border-l-[0px]">
          <div className="relative z-50 w-full md:text-center lg:text-center">
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
                create digital <span className="">tools</span>, and dabble in{" "}
                <span className="">photo-videography.</span>
              </span>
            </Animated>
          </div>
        </div>
      </div>
      <Animated
        as="header"
        className="w-screen h-3/6 min-h-[200px] flex justify-center bg-sky-600"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ ease: "easeInOut", duration: 1.5, delay: 1 }}
        initial="hidden"
        animate="visible"
      >
        <div className="flex-1 flex xl:max-w-[1800px] bg-red-400 ">
          <div className="relative w-full md:w-5/12 flex-none p-5 bg-blue-500">
            <div className="absolute top-0 left-0 z-10 w-full h-full bg-blue-400 opacity-50 hover:opacity-0 transition duration-300"></div>
            <Image
              src="/joshua_heiland.jpg"
              alt="Joshua Heiland"
              className="object-cover"
              fill={true}
            />
          </div>
          <div className="relative w-full hidden md:grid grid-cols-3 grid-rows-2 place-content-stretch  border-t">
            <Cell bg="bg-sky-200">
              {reading && <CurrentReading {...reading} />}
            </Cell>
            <Cell bg="bg-sky-300" />
            <Cell bg="bg-sky-400" />
            <Cell bg="bg-sky-400" />
            <Cell bg="bg-sky-200" />
            <Cell bg="bg-sky-300" />

            {/* <Latest /> */}
            {/* <Cell bg="bg-sky-100">
            <Image
              alt="Background Company"
              src="/bc.jpg"
              // width="280"
              // height="140"
              fill={true}
              className="object-cover"
            />
          </Cell>
          <Cell bg="bg-sky-200">
            <Image
              alt="Background Company"
              src="/mentalevents.png"
              fill={true}
              className="object-cover"
            />
          </Cell>
          <Cell bg="bg-sky-300">
            <Image
              alt="Background Company"
              src="/inquisidev.jpeg"
              fill={true}
              className="object-cover"
            />
          </Cell> */}
            {/* <Cell bg="bg-sky-400">Mental.events</Cell>
          <Cell bg="bg-sky-500">Background Company</Cell> */}
            {/* <Cell bg="bg-sky-400">
            <div className="flex flex-col">
              <div className="text-white text-center">Currently Reading</div>
              <div className="">Representation in CogSci</div>
            </div>
          </Cell>

          <Cell bg="bg-sky-500">
            <div className="flex flex-col">
              <div className="text-white text-center">Latest writing</div>
              <div className="">My positions</div>
            </div>
          </Cell>

          <Cell bg="bg-sky-600">
            <div className="flex flex-col">
              <div className="text-white text-center">
                Latest Background Company
              </div>
              <div className="">Banff or something</div>
            </div>
            <Image
              alt="Background Company"
              src="/latestBC.jpeg"
              fill={true}
              className="object-cover"
            />
          </Cell> */}

            {/* <Cell bg="bg-sky-600">
            <Image
              alt="Background Company"
              src="/inquisidev.jpeg"
              fill={true}
              className="object-cover"
            />
          </Cell> */}
            {/* 
          <Cell bg="bg-sky-400">
            <Image
              alt="Background Company"
              src="/banff.jpg"
              fill={true}
              className="object-cover"
            />
          </Cell> */}

            {/* <Cell bg="bg-sky-500">
            <div className="flex flex-col">
              <div className="text-white text-center">Latest App update</div>
              <div className="">Representation in CogSci</div>
            </div>
          </Cell> */}
          </div>
        </div>
      </Animated>
    </>
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
