import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

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
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-[15px] min-h-[48px] px-6 transition disabled:opacity-50 disabled:pointer-events-none";
  const variants: Record<Variant, string> = {
    primary: "bg-brand-orange text-white shadow-sm hover:bg-[#e97d00]",
    secondary: "bg-white text-navy border border-line hover:border-navy/25",
    outline: "bg-white text-navy border-2 border-navy hover:bg-white/90",
    ghost: "bg-transparent text-navy hover:bg-black/5",
  };
  const w = fullWidth ? "w-full" : "";
  return (
    <button type={type} className={`${base} ${variants[variant]} ${w} ${className}`} {...rest}>
      {children}
    </button>
  );
}
