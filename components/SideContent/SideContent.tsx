"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type SideContentProps = PropsWithChildren & {
  className?: string;
};

export function SideContent({ children, className }: SideContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={twMerge(
        `static md:fixed md:top-0 md:left-0 md:h-screen w-full md:w-5/12 md:-ml-10 bg-sky-700 flex align-center items-center justify-center`,
        className,
      )}
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
        {children}
      </motion.div>
    </motion.div>
  );
}
