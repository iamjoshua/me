"use client"
import { motion } from "framer-motion"
import Nav from "./nav"
import HomeV1 from "./homev1"
import TheGrid from "./thegrid"

export default function Home() {
  return (
    <motion.main
      // variants={{
      //   hidden: { opacity: 0 },
      //   visible: { opacity: 1 },
      // }}
      // transition={{ ease: "easeInOut", duration: 0.5 }}
      // initial="hidden"
      // animate="visible"
      className="h-[calc(100vh-6rem)] w-screen flex flex-col justify-between"
    >
      <HomeV1 />
      <Nav />
      <TheGrid />
    </motion.main>
  )
}
