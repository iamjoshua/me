"use client"
import Nav from "./nav"
import HomeV1 from "./homev1"
import TheGrid from "./thegrid"
import { AnimatePresence, motion } from "framer-motion"

export default function Home() {
  return (
    <motion.main
      key={'home'}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="h-[100dvh] w-[100dvw] flex flex-col justify-between"
    >
      <TheGrid />
      <div className="h-full w-full flex flex-col justify-between">
        <HomeV1 />
      </div>
       {/* Nav cover */}
       <div className="sticky bottom-0 w-full h-[calc(110px+1px)] bg-white/90 border-t border-t-gray-100 md:border-0"></div>
       
      <Nav fixed={true} />
    </motion.main>
  )
}
