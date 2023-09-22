"use client";
import { motion } from "framer-motion";

export function Quote() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
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
          America is thus as a nation rapidly drifting towards a state of things
          in which no man of science or letters will be accounted respectable
          unless some kind of badge or diploma is stamped upon him.
        </div>
        <div className="text-sky-300 p-5 md:p-10">
          — William James, <span className="italic">The Ph.D. Octopus</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
