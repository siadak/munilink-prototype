import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { moreQuickActions } from "../data/moreMenu";

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.035, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" } },
};

export function MoreBottomSheet({
  isOpen,
  onClose,
  onNavigate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Zamknij menu"
            className="pointer-events-auto absolute inset-0 bg-navy-deep/[0.35]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="more-sheet-title"
            className="pointer-events-auto absolute bottom-0 left-0 right-0 flex max-h-[360px] flex-col overflow-hidden rounded-t-[24px] border border-b-0 border-line/60 bg-white shadow-[0_-4px_20px_rgba(23,26,74,0.1)]"
            style={{ padding: "14px 16px 16px" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="mx-auto mb-2 h-1 w-8 shrink-0 rounded-full bg-line"
              aria-hidden
            />

            <div className="mb-2.5 flex shrink-0 items-start justify-between gap-2">
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 id="more-sheet-title" className="text-[15px] font-bold leading-tight text-navy">
                  Więcej
                </h2>
                <p className="mt-0.5 text-[11px] text-muted">Szybkie akcje</p>
              </motion.div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted hover:bg-[#f4f4f6] hover:text-navy"
                aria-label="Zamknij"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <motion.div
              variants={gridVariants}
              initial="hidden"
              animate="show"
              className="grid shrink-0 grid-cols-2 gap-2"
            >
              {moreQuickActions.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.path} variants={cardVariants}>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onNavigate(item.path)}
                      className="flex h-[76px] w-full items-center gap-2.5 rounded-xl border border-line/70 bg-white p-2.5 text-left shadow-[0_1px_4px_rgba(23,26,74,0.05)] transition-colors hover:border-brand-orange/25 hover:bg-[#fafafa]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line/50 bg-[#fafafa]">
                        <Icon className="h-4 w-4 text-brand-orange" strokeWidth={1.65} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-semibold leading-tight text-navy">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[10px] leading-tight text-muted">
                          {item.description}
                        </span>
                      </span>
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              className="mt-2.5 shrink-0"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.18 }}
            >
              <button
                type="button"
                onClick={() => onNavigate("/more")}
                className="flex h-11 w-full items-center justify-center rounded-full border border-line bg-white text-sm font-semibold text-navy transition hover:border-navy/20 hover:bg-[#fafafa]"
              >
                Pokaż wszystkie opcje
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
