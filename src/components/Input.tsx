import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export function Input({ label, hint, id, className = "", ...rest }: InputProps) {
  const inputId = id ?? rest.name;
  return (
    <label className="block space-y-2">
      {label ? (
        <span className="text-sm font-medium text-navy/90">{label}</span>
      ) : null}
      <input
        id={inputId}
        className={`w-full rounded-2xl border border-line bg-card px-4 py-3.5 text-[15px] text-navy placeholder:text-muted/70 outline-none ring-0 transition focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/15 ${className}`}
        {...rest}
      />
      {hint ? <span className="text-xs text-muted block">{hint}</span> : null}
    </label>
  );
}
