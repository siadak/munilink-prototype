import type { InputHTMLAttributes } from "react";
import { registerInputClass } from "./registerStyles";

type RegisterInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hint?: string;
};

export function RegisterInput({ hint, id, className = "", ...rest }: RegisterInputProps) {
  const inputId = id ?? rest.name;
  return (
    <label className="block">
      <input id={inputId} className={`${registerInputClass} ${className}`} {...rest} />
      {hint ? <span className="mt-0.5 block text-[10px] leading-[1.25] text-muted/80">{hint}</span> : null}
    </label>
  );
}
