import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export function Select({ label, id, className = "", children, ...rest }: SelectProps) {
  const sid = id ?? rest.name;
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-navy/90">{label}</span> : null}
      <div className="relative">
        <select
          id={sid}
          className={`w-full appearance-none rounded-2xl border border-line bg-card px-4 py-3.5 text-[15px] text-navy outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/15 ${className}`}
          {...rest}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted text-xs">
          ▼
        </span>
      </div>
    </label>
  );
}
