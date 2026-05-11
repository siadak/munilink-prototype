import type { InputHTMLAttributes, ReactNode } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
};

export function Checkbox({ label, id, className = "", ...rest }: CheckboxProps) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer select-none ${className}`}>
      <input
        type="checkbox"
        id={id}
        className="mt-1 h-5 w-5 shrink-0 rounded-md border-line text-brand-orange focus:ring-brand-orange/30"
        {...rest}
      />
      <span className="text-sm leading-snug text-navy/85">{label}</span>
    </label>
  );
}
