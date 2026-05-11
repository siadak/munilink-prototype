import type { ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export function ChatBubble({
  from,
  children,
  className = "",
}: {
  from: "user" | "ai";
  children: ReactNode;
  className?: string;
}) {
  const isUser = from === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={clsx("flex", isUser ? "justify-end" : "justify-start", className)}
    >
      <div
        className={clsx(
          "max-w-[92%] rounded-3xl px-4 py-3 text-[14px] leading-relaxed shadow-sm",
          isUser
            ? "rounded-br-md bg-lavender text-navy ring-1 ring-lavender/80"
            : "rounded-bl-md border border-line/90 bg-card text-navy",
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
