"use client";
import { motion } from "framer-motion";
import { Reading } from "./Reading";

const variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
};

export function Readings({ readings }: { readings: any[] }) {
  return (
    <motion.ol
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-10 relative border-l border-gray-200 dark:border-gray-700"
    >
      {readings.map((reading, key) => (
        <motion.li key={key} variants={variants} className="mb-10 pl-5">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
          <Reading {...reading} />
        </motion.li>
      ))}
    </motion.ol>
  );
}
