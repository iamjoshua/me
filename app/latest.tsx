import { motion } from "framer-motion"
import { FiChevronDown } from "react-icons/fi"

function Latest() {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ delay: 1, duration: 0.5 }}
      initial="hidden"
      animate="visible"
      className="absolute -mt-[40px] flex items-center gap-2"
    >
      <div className="absolute -left-[192px] flex w-[198px] text-right justify-end items-center">
        <FiChevronDown size="25" className="pr-1" />
        <span className="font-bold uppercase text-xs">
          December 4th, 2022:
        </span>{" "}
        <span className="relative ml-3 left-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </div>
      <span className="text-sm text-sky-800 opacity-70 ml-4">
        A new version of Mental.events just launched!
      </span>
    </motion.div>
  )
}

export default Latest
