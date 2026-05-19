import { useNavigate } from "react-router-dom";
import type { Benefit } from "../data/mocks";
import { BenefitCover } from "./BenefitCover";
import { Button } from "./Button";

export function BenefitCard({ benefit }: { benefit: Benefit }) {
  const navigate = useNavigate();

  const goToDetail = () => navigate(`/benefit/${benefit.id}`);

  return (
    <article className="overflow-hidden rounded-2xl border border-line/60 bg-white shadow-[0_2px_10px_rgba(23,26,74,0.07)]">
      <button type="button" onClick={goToDetail} className="block w-full text-left">
        <BenefitCover
          src={benefit.imageUrl}
          alt={benefit.name}
          aspect="list"
          className="rounded-t-2xl"
          fallbackKey={benefit.visual === "bike" ? "bike" : undefined}
        />
        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-base font-bold text-navy">{benefit.name}</h2>
              <p className="mt-0.5 text-sm text-muted">{benefit.type}</p>
            </div>
            <p className="shrink-0 text-base font-bold text-brand-orange">{benefit.price} zł</p>
          </div>
          <p className="text-sm leading-relaxed text-navy/85">{benefit.listDescription}</p>
        </div>
      </button>
      <div className="px-4 pb-4 pt-0">
        <Button fullWidth type="button" onClick={goToDetail}>
          Zobacz szczegóły
        </Button>
      </div>
    </article>
  );
}
