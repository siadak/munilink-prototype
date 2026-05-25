import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Info } from "lucide-react";

type Placement = "top" | "bottom" | "left" | "right";

const TOOLTIP_MAX_W = 300;

export function ScenarioTooltip({
  content,
  ariaLabel = "Opis scenariusza",
  placement = "top",
}: {
  content: string;
  ariaLabel?: string;
  placement?: Placement;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const [pos, setPos] = useState({ top: 0, left: 0, arrowLeft: 0 });

  useLayoutEffect(() => {
    if (!open || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const width = Math.min(TOOLTIP_MAX_W, window.innerWidth - 24);
    let left = rect.left + rect.width / 2 - width / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - width - 12));
    const arrowLeft = rect.left + rect.width / 2 - left;

    if (placement === "bottom") {
      setPos({ top: rect.bottom + 8, left, arrowLeft });
    } else if (placement === "top") {
      setPos({ top: rect.top - 8, left, arrowLeft });
    } else {
      setPos({ top: rect.top - 8, left, arrowLeft });
    }
  }, [open, placement, content]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (buttonRef.current?.contains(t)) return;
      if (document.getElementById(id)?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, id]);

  const tooltip =
    open && typeof document !== "undefined" ? (
      <motion.div
        id={id}
        role="tooltip"
        initial={{ opacity: 0, y: placement === "top" ? 4 : -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: placement === "top" ? 4 : -4 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          position: "fixed",
          left: pos.left,
          top: pos.top,
          width: Math.min(TOOLTIP_MAX_W, window.innerWidth - 24),
          transform: placement === "top" ? "translateY(-100%)" : "none",
          zIndex: 200,
        }}
        className="pointer-events-none"
      >
        <div className="relative rounded-lg bg-navy px-3 py-2.5 text-[11px] leading-[1.35] text-white shadow-[0_6px_20px_rgba(23,26,74,0.28)]">
          {content}
          <span
            className={clsx(
              "absolute h-0 w-0 border-[5px] border-solid",
              placement === "top"
                ? "top-full border-t-navy border-x-transparent border-b-transparent"
                : "bottom-full border-b-navy border-x-transparent border-t-transparent",
            )}
            style={{ left: pos.arrowLeft - 5 }}
            aria-hidden
          />
        </div>
      </motion.div>
    ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e8e9ef] text-navy/55 transition hover:bg-[#dfe0e8] hover:text-navy/75"
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <Info className="h-3 w-3" strokeWidth={2.25} />
      </button>
      {typeof document !== "undefined" ? createPortal(<AnimatePresence>{tooltip}</AnimatePresence>, document.body) : null}
    </>
  );
}

export function AgentScenarioHeading({
  title,
  tooltip,
}: {
  title: string;
  tooltip: string;
}) {
  return (
    <h1 className="flex items-center gap-1.5 text-lg font-bold text-brand-orange">
      <span>{title}</span>
      <ScenarioTooltip content={tooltip} placement="top" />
    </h1>
  );
}
