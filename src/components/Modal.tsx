import type { ReactNode } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Modal({
  open,
  title,
  children,
  onClose,
  footer,
}: {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm"
            aria-label="Zamknij"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative flex max-h-[min(90dvh,680px)] w-full max-w-sm flex-col overflow-hidden rounded-[1.75rem] border border-line/70 bg-card p-6 shadow-2xl"
            initial={{ y: 72, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 56, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            <div
              className={`flex shrink-0 items-start gap-3 ${
                title ? "justify-between" : "justify-end"
              }`}
            >
              {title ? (
                <h3 className="text-lg font-bold text-navy pr-2 flex-1">{title}</h3>
              ) : null}
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-light text-navy hover:bg-surface-alt"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 max-h-[min(56vh,440px)] overflow-y-auto overscroll-y-contain text-[15px] leading-relaxed text-navy/85">
              {children}
            </div>
            {footer ? <div className="mt-5 shrink-0 space-y-3">{footer}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
