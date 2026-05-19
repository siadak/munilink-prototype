import type { ReactNode } from "react";
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
    <div className={clsx("flex", isUser ? "justify-end" : "justify-start", className)}>
      <div
        className={clsx(
          "max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser ? "bg-white text-navy border border-line/60" : "bg-white text-navy border border-line/60",
        )}
      >
        {children}
      </div>
    </div>
  );
}
