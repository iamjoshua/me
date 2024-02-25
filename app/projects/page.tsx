"use client";
import Nav from "../nav";
import { motion } from "framer-motion";
import PageWrapper from "../pagewrapper";
import Link from "next/link";

function Projects() {
  return (
    <motion.main
      key="projects"
      className="min-h-[100dvh] w-screen flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 2 }}
        className="flex flex-col justify-stretch items-start w-full h-full text-center text-4xl font-thin"
      >
        <Link
          href="https://www.relaxation.video"
          className="p-10 text-base bg-neutral-200 hover:bg-sky-800 transition-all duration-300 hover:text-white"
        >
          Relaxation.video: A curated collection of relaxing YouTube videos
        </Link>
      </motion.div>
      <Nav
        fixed={true}
        // nameClassName="text-white"
        // linksClassName="first:text-white"
      />
    </motion.main>
  );
}

export default Projects;
