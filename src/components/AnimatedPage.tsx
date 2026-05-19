import type { ReactNode } from "react";

type AnimatedPageProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedPage({ children, className = "" }: AnimatedPageProps) {
  return (
    <section className={`min-h-0 min-w-0 max-w-full space-y-4 px-4 pt-3 ${className}`}>
      {children}
    </section>
  );
}
