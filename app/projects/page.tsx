"use client"
import Nav from "../nav"
import { motion } from "framer-motion"
import PageWrapper from "../pagewrapper"

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
        className="h-full text-center text-4xl font-thin"
      >
        Coming Soon...
      </motion.div>
      <Nav
        fixed={true}
        // nameClassName="text-white"
        // linksClassName="first:text-white"
      />
    </motion.main>
  )
}

export default Projects
