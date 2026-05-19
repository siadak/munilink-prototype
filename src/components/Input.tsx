import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export function Input({ label, hint, id, className = "", ...rest }: InputProps) {
  const inputId = id ?? rest.name;
  return (
    <label className="block space-y-1.5">
      {label ? <span className="text-sm font-medium text-navy">{label}</span> : null}
      <input
        id={inputId}
        className={`w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-navy placeholder:text-muted/60 outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 ${className}`}
        {...rest}
      />
      {hint ? <span className="block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}
