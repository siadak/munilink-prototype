import type { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
};

export function Button({
  children,
  variant = "primary",
  fullWidth,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold text-[15px] min-h-[52px] px-5 transition disabled:opacity-50 disabled:pointer-events-none";
  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-to-r from-brand-orange to-brand-orangeDeep text-white shadow-soft shadow-brand-orange/25",
    secondary:
      "bg-white text-navy border-2 border-navy/15 hover:border-brand-orange/40",
    ghost: "bg-transparent text-navy hover:bg-white/60",
  };
  const w = fullWidth ? "w-full" : "";
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      className={`${base} ${variants[variant]} ${w} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
