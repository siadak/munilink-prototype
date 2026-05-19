import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, ChevronRight, Heart, Home, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Button } from "../components/Button";

const heroSlides = [
  {
    title: "Potrzebujesz nowej ochrony?",
    subtitle: "Wybierz ubezpieczenie z naszej szerokiej oferty",
    cta: "Kup ubezpieczenie",
  },
];

const categories: { label: string; count: number; icon: LucideIcon; to: string }[] = [
  { label: "Komunikacyjne", count: 3, icon: Car, to: "/buy" },
  { label: "Majątkowe", count: 14, icon: Home, to: "/buy" },
  { label: "Turystyczne", count: 2, icon: Plane, to: "/buy" },
  { label: "Życie i zdrowie", count: 1, icon: Heart, to: "/life-survey" },
];

export function MenuPage() {
  const navigate = useNavigate();
  const [slide] = useState(0);
  const current = heroSlides[slide];

  return (
    <AppShell showBack={false}>
      <AnimatedPage className="space-y-4">
        <HeroCard>
          <p className="text-base font-bold text-brand-orange">{current.title}</p>
          <p className="mt-2 text-sm text-navy leading-snug">{current.subtitle}</p>
          <Button fullWidth className="mt-4" type="button" onClick={() => navigate("/buy")}>
            {current.cta}
          </Button>
          <div className="mt-4 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${i === slide ? "bg-brand-orange" : "bg-line"}`}
              />
            ))}
          </div>
        </HeroCard>

        <ul className="space-y-2.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <li key={cat.label}>
                <button
                  type="button"
                  onClick={() => navigate(cat.to)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-line/60 bg-white p-3.5 text-left shadow-[0_2px_8px_rgba(23,26,74,0.05)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line/50 bg-[#fafafa]">
                    <Icon className="h-7 w-7 text-brand-orange" strokeWidth={1.35} />
                  </span>
                  <span className="flex-1 text-base font-medium text-navy">{cat.label}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8e9ef] text-sm font-semibold text-navy">
                    {cat.count}
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-navy/40" />
                </button>
              </li>
            );
          })}
        </ul>
      </AnimatedPage>
    </AppShell>
  );
}

function HeroCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-brand-orange bg-white px-4 py-5 text-center shadow-sm">
      {children}
    </div>
  );
}
