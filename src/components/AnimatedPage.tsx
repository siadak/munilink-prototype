import type { ReactNode } from "react";
import { motion } from "framer-motion";

type AnimatedPageProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedPage({ children, className = "" }: AnimatedPageProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={`min-h-0 min-w-0 max-w-full space-y-4 px-4 pb-6 pt-4 ${className}`}
    >
      {children}
    </motion.section>
  );
}

