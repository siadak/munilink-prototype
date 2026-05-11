import { useId, useState, type ReactNode } from "react";
import { Info } from "lucide-react";

export function TooltipIcon({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-line bg-white text-muted hover:text-navy transition"
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
      >
        <Info className="h-4 w-4" strokeWidth={2} />
      </button>
      {open ? (
        <span
          id={id}
          role="tooltip"
          className="absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-2xl border border-line bg-white px-3 py-2 text-xs text-navy shadow-soft"
        >
          {text}
        </span>
      ) : null}
    </span>
  );
}

export function TooltipInline({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center gap-2">
      {children}
      <button
        type="button"
        className="text-muted hover:text-navy"
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
      >
        <Info className="h-4 w-4" />
      </button>
      {open ? (
        <span className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-line bg-white px-3 py-2 text-xs text-navy shadow-soft">
          {label}
        </span>
      ) : null}
    </span>
  );
}
