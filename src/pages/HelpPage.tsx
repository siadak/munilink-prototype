import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { insurersHelp } from "../data/mocks";

export function HelpPage() {
  const [openInsurer, setOpenInsurer] = useState<string | null>(null);

  return (
    <AppShell>
      <AnimatedPage className="space-y-3">
        <h1 className="text-lg font-bold text-brand-orange">Ubezpieczyciele</h1>

        <ul className="space-y-2">
          {insurersHelp.map((name) => {
            const expanded = openInsurer === name;
            return (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => setOpenInsurer(expanded ? null : name)}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border border-line/70 bg-white px-4 py-3.5 text-left shadow-[0_2px_8px_rgba(23,26,74,0.05)]"
                >
                  <span className="text-sm font-bold uppercase tracking-wide text-navy">{name}</span>
                  {expanded ? (
                    <Minus className="h-5 w-5 shrink-0 text-navy" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-navy" />
                  )}
                </button>
                {expanded ? (
                  <div className="mt-1 rounded-2xl border border-line/60 bg-white px-4 py-3 text-sm text-navy/90 shadow-sm">
                    {name === "ALLIANZ" ? (
                      <div className="space-y-2">
                        <p>
                          W razie problemów zadzwoń pod: <span className="font-semibold">22 422 42 24</span>
                        </p>
                        <p>
                          Assistance: <span className="font-semibold">22 422 42 24</span>
                        </p>
                        <p>
                          Zgłoś szkodę online:{" "}
                          <a
                            className="font-semibold text-brand-orange underline"
                            href="https://www.allianz.pl/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            www.allianz.pl
                          </a>
                        </p>
                      </div>
                    ) : (
                      <p className="text-muted">
                        Dane kontaktowe dla tego ubezpieczyciela pojawią się w pełnej wersji aplikacji.
                      </p>
                    )}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </AnimatedPage>
    </AppShell>
  );
}
