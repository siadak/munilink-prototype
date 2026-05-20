import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "./Badge";

export function ProductCategoryCard({
  icon: Icon,
  title,
  description,
  onBuy,
  showReadMore = false,
  onReadMore,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  onBuy: () => void;
  showReadMore?: boolean;
  onReadMore?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="rounded-[1.75rem] border border-line/90 bg-card p-5 shadow-card flex flex-col gap-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lavender/70 text-navy border border-lavender">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-navy text-[15px] leading-snug">{title}</p>
            <Badge tone="orange" className="!px-2.5 !py-0.5 text-[10px] uppercase tracking-wide">
              Online
            </Badge>
          </div>
          {description ? <p className="text-sm text-muted leading-relaxed">{description}</p> : null}
          {showReadMore && onReadMore ? (
            <button type="button" onClick={onReadMore} className="text-sm font-semibold text-brand-orangeDeep">
              Czytaj więcej
            </button>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        onClick={onBuy}
        className="w-full rounded-2xl min-h-[48px] font-semibold text-white bg-gradient-to-r from-brand-orange to-brand-orangeDeep shadow-soft"
      >
        Kup teraz
      </button>
    </motion.div>
  );
}
