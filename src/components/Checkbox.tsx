import type { InputHTMLAttributes, ReactNode } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  compact?: boolean;
};

export function Checkbox({ label, id, compact, className = "", ...rest }: CheckboxProps) {
  return (
    <label className={`flex cursor-pointer select-none items-start ${compact ? "gap-2" : "gap-3"} ${className}`}>
      <input
        type="checkbox"
        id={id}
        className={
          compact
            ? "mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand-orange focus:ring-brand-orange/25"
            : "mt-1 h-5 w-5 shrink-0 rounded-md border-line text-brand-orange focus:ring-brand-orange/30"
        }
        {...rest}
      />
      <span className={compact ? "text-[11px] leading-[1.35] text-navy/80" : "text-sm leading-snug text-navy/85"}>
        {label}
      </span>
    </label>
  );
}
