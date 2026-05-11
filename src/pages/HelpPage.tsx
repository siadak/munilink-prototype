import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Building2, ChevronUp, FileWarning, HelpCircle, Plus } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { insurersHelp } from "../data/mocks";

const quick = [
  { label: "Zgłoś szkodę", icon: FileWarning, action: "insurers" as const },
  { label: "Kontakt do ubezpieczyciela", icon: Building2, action: "insurers" as const },
  { label: "Najczęstsze pytania", icon: HelpCircle, action: "faq" as const },
  { label: "Asystent AI", icon: Bot, action: "ai" as const },
];

const tileParent = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const tileChild = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

export function HelpPage() {
  const navigate = useNavigate();
  const [openInsurer, setOpenInsurer] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState(false);

  const scrollToInsurers = () => {
    document.getElementById("help-insurers")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-6">
        <h1 className="text-2xl font-bold text-navy">Pomoc</h1>

        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={tileParent}
          initial="hidden"
          animate="show"
        >
          {quick.map((item) => (
            <motion.button
              key={item.label}
              type="button"
              variants={tileChild}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (item.action === "insurers") scrollToInsurers();
                if (item.action === "faq") setFaqOpen(true);
                if (item.action === "ai") navigate("/ai-assistant");
              }}
              className="flex flex-col items-start gap-3 rounded-[1.5rem] border border-line/90 bg-card p-4 text-left shadow-card transition hover:border-brand-orange/25"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lavender/70 text-brand-orangeDeep ring-1 ring-line/60">
                <item.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-navy leading-snug">{item.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <section id="help-insurers" className="scroll-mt-4 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted px-0.5">Ubezpieczyciele</h2>
          <div className="space-y-2">
            {insurersHelp.map((name) => {
              const expanded = openInsurer === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setOpenInsurer(expanded ? null : name)}
                  className="w-full rounded-[1.5rem] border border-line/90 bg-card px-4 py-4 text-left shadow-card transition hover:border-brand-orange/20"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold uppercase tracking-wide text-navy">{name}</span>
                    {expanded ? (
                      <ChevronUp className="h-5 w-5 shrink-0 text-muted" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-navy" aria-hidden />
                    )}
                  </div>
                  {expanded ? (
                    <div className="mt-4 space-y-2 border-t border-line/80 pt-4 text-sm text-navy/90">
                      {name === "ALLIANZ" ? (
                        <>
                          <p>
                            W razie problemów zadzwoń pod: <span className="font-semibold">22 422 42 24</span>
                          </p>
                          <p>
                            Assistance: <span className="font-semibold">22 422 42 24</span>
                          </p>
                          <p>
                            Zgłoś szkodę online:{" "}
                            <a
                              className="font-semibold text-brand-orangeDeep break-all underline underline-offset-2"
                              href="https://www.allianz.pl/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              https://www.allianz.pl/...
                            </a>
                          </p>
                        </>
                      ) : (
                        <p className="text-muted">
                          Dane kontaktowe dla tego ubezpieczyciela pojawią się w pełnej wersji aplikacji.
                        </p>
                      )}
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </section>
      </AnimatedPage>

      <Modal
        open={faqOpen}
        title="Najczęstsze pytania"
        onClose={() => setFaqOpen(false)}
        footer={
          <Button fullWidth onClick={() => setFaqOpen(false)}>
            Zamknij
          </Button>
        }
      >
        <p className="text-sm text-muted leading-relaxed">
          To prototyp. Tutaj pojawi się lista FAQ i wyszukiwarka odpowiedzi.
        </p>
      </Modal>
    </AppShell>
  );
}
