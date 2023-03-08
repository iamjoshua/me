import { motion } from "framer-motion"
import Link from "next/link"
import { FaTwitter } from "react-icons/fa"

interface NavProps {
  fixed?: boolean
  className?: string
  nameClassName?: string
  linksClassName?: string
}

export default function Nav({ fixed, className, nameClassName, linksClassName }: NavProps) {
  const pages = [
    ["philosophy", "/philosophy"],
    ["projects", "/projects"],
    // ["writings", "./"],
    // ["reading list", "./"],
  ]
  return (
    <motion.nav
      className={`${
        fixed ? "fixed" : "sticky"
      } bottom-0 z-10 w-full h-[6rem] min-h-[50px] flex border-b-4 border-b-sky-600 text-neutral-600 bg-transparent ${className}`}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ ease: "easeInOut", duration: 0.5, delay: 2 }}
      initial="hidden"
      animate="visible"
    >
      <Link
        href="/"
        className={`w-2/3 md:w-5/12 flex items-center pl-10 uppercase text-sm tracking-wider text-neutral-900 hover:pl-11 transition-all duration-500 ${nameClassName}`}
      >
        Joshua Heiland
      </Link>
      <div className="w-7/12 flex display">
        <div className={`w-full flex items-center space-x-10 pl-0 -ml-5 tracking-wide text-md `}>
          {pages.map(([name, url]) => (
            <Link
              key={name}
              href={url}
              className={`p-5 text-sm hover:-translate-y-0.5 transition-all duration-300 hidden md:block ${linksClassName}`}
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="mr-10 flex items-center">
          <Link
            target="__blank"
            href="http://twitter.com/iamjoshua"
            className=""
          >
            <FaTwitter
              size={25}
              className="text-neutral-500 hover:text-sky-500 transition duration-300"
            />
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
