import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function ProductCategoryCard({
  icon: Icon,
  title,
  description,
  onBuy,
  showReadMore = true,
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
    <div className="rounded-2xl border border-line/70 bg-white p-4 shadow-[0_2px_10px_rgba(23,26,74,0.06)]">
      <div className="flex items-start gap-3">
        <ProductIconWrap>
          <Icon className="h-6 w-6 text-brand-orange" strokeWidth={1.5} />
        </ProductIconWrap>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-navy">{title}</p>
          {description ? <p className="mt-1 text-sm text-muted leading-snug">{description}</p> : null}
        </div>
      </div>
      {showReadMore ? (
        <button
          type="button"
          onClick={onReadMore}
          className="mt-3 text-sm font-semibold text-brand-orange"
        >
          Czytaj więcej
        </button>
      ) : null}
      <button
        type="button"
        onClick={onBuy}
        className="mt-4 w-full rounded-full bg-brand-orange py-3 text-[15px] font-semibold text-white shadow-sm"
      >
        Kup teraz
      </button>
    </div>
  );
}

function ProductIconWrap({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line/80 bg-[#f8f8fa]">
      {children}
    </div>
  );
}
