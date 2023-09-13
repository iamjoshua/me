"use client"
import Link from "next/link"
import Nav from "../nav"
import Event from "./event"
import { motion } from "framer-motion"
import PageWrapper from "../pagewrapper"
import CurrentReading from "../current_reading"
import { readings } from '../readings'

function Philosophy() {
  return (
    // <PageWrapper>
    <motion.main
      key="philosophy2"
      // initial={{ opacity: 0, y: 30 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: 30 }}
      // transition={{ duration: 2 }}
      className="min-h-[100dvh] w-full flex justify-between"
    >
      <div className="h-full w-full flex flex-col md:flex-row justify-end">
        <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1 }}
          className="static md:fixed md:top-0 md:left-0 md:h-screen w-full md:w-5/12 md:-ml-10 bg-sky-700 flex align-center items-center justify-center"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              y: { duration: 2 },
              opacity: { delay: 0.3, duration: 0.3 },
            }}
            className="max-w-screen-md text-center flex flex-col justify-end p-10 pb-5 md:p-20"
          >
            <div className="text-2xl md:text-xl lg:text-2xl font-thin lg:leading-relaxed text-white">
              America is thus as a nation rapidly drifting towards a state of
              things in which no man of science or letters will be accounted
              respectable unless some kind of badge or diploma is stamped upon
              him.
            </div>
            <div className="text-sky-300 p-5 md:p-10">
              — William James, <span className="italic">The Ph.D. Octopus</span>
            </div>
          </motion.div>
        </motion.div>
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
                <Event key={key} {...reading} />
              ))}
            </ol>
          </div>
          {/* Nav cover */}
          <div className="fixed bottom-0 w-full h-[calc(6rem+1px)] bg-white/90 border-t border-t-gray-100 md:border-0"></div>
        </div>
      </div>
      <Nav
        fixed={true}
        nameClassName="md:text-white"
        // linksClassName="first:ml-10"
      />
    </motion.main>
    // </PageWrapper>
  )
}

export default Philosophy
