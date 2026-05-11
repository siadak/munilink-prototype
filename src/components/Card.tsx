import type { ReactNode } from "react";
import { motion } from "framer-motion";

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: "md" | "lg";
  interactive?: boolean;
};

export function Card({
  children,
  className = "",
  padding = "md",
  interactive,
}: CardProps) {
  const p = padding === "lg" ? "p-6" : "p-5";
  const Comp = interactive ? motion.div : "div";

  const props = interactive
    ? {
        whileHover: { y: -2 },
        whileTap: { scale: 0.98 },
      }
    : {};

  return (
    <Comp
      className={`rounded-[1.75rem] bg-card shadow-card border border-line/80 ${p} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
