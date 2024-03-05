"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="w-screen min-h-[100dvh]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageWrapper;
