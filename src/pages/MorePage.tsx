import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { moreMenuItems } from "../data/moreMenu";

export function MorePage() {
  const navigate = useNavigate();

  return (
    <AppShell showBack={false}>
      <AnimatedPage className="space-y-3">
        <h1 className="text-lg font-bold text-brand-orange">Więcej</h1>

        <ul className="space-y-2.5">
          {moreMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-line/60 bg-white p-3.5 text-left shadow-[0_2px_8px_rgba(23,26,74,0.05)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line/50 bg-[#fafafa]">
                    <Icon className="h-6 w-6 text-brand-orange" strokeWidth={1.35} />
                  </span>
                  <span className="min-w-0 flex-1 pr-1">
                    <span className="block text-[15px] font-semibold leading-snug text-navy">{item.title}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted">{item.description}</span>
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-navy/35" strokeWidth={2} />
                </button>
              </li>
            );
          })}
        </ul>
      </AnimatedPage>
    </AppShell>
  );
}
