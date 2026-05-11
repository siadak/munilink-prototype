import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarClock,
  MessageSquare,
  Phone,
  Send,
  Share2,
  UserRound,
  Users,
} from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { AgentCard } from "../components/AgentCard";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { agent } from "../data/mocks";
import { useDemoMode } from "../context/DemoContext";

const tileParent = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const tileChild = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

export function AgentPage() {
  const navigate = useNavigate();
  const { mode } = useDemoMode();
  const noAgent = mode === "NO_AGENT";
  const [referOpen, setReferOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const telHref = `tel:${agent.phone.replace(/-/g, "")}`;
  const mailHref = `mailto:${agent.email}`;

  return (
    <AppShell>
      <AnimatedPage className="space-y-5">
        <h1 className="text-2xl font-bold text-navy">Twój Agent</h1>

        {noAgent ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card padding="lg" className="border-lavender/80 bg-lavender/25 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-card ring-1 ring-line">
                <UserRound className="h-8 w-8 text-muted" />
              </div>
              <p className="mt-4 text-lg font-bold text-navy">Nie masz jeszcze przypisanego Agenta</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Możesz korzystać z aplikacji, a w razie potrzeby skontaktować się z Unilink albo wskazać swojego
                Agenta.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <Button type="button" fullWidth onClick={() => window.open("https://www.unilink.pl", "_blank", "noopener,noreferrer")}>
                  Skontaktuj się z Unilink
                </Button>
                <Button variant="secondary" type="button" fullWidth onClick={() => navigate("/change-agent")}>
                  Wskaż swojego Agenta
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
              <AgentCard agent={agent} roleBadge="Twój Agent" />
            </motion.div>

            <div className="grid grid-cols-2 gap-2">
              <motion.a
                href={telHref}
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -1 }}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-navy/15 bg-white px-5 text-[15px] font-semibold text-navy transition hover:border-brand-orange/40"
              >
                <Phone className="h-4 w-4 shrink-0" />
                Zadzwoń
              </motion.a>
              <motion.a
                href={mailHref}
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -1 }}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-navy/15 bg-white px-5 text-[15px] font-semibold text-navy transition hover:border-brand-orange/40"
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                Napisz
              </motion.a>
              <Button className="min-h-[52px]" type="button" onClick={() => navigate("/send-document")}>
                <Send className="h-4 w-4 shrink-0" />
                Wyślij dokument
              </Button>
              <Button variant="secondary" className="min-h-[52px]" type="button" onClick={() => setReferOpen(true)}>
                <Share2 className="h-4 w-4 shrink-0" />
                Poleć Agenta
              </Button>
            </div>

            <div>
              <h2 className="text-sm font-bold text-navy mb-3 px-0.5">Co możesz załatwić z Agentem?</h2>
              <motion.div
                className="grid grid-cols-2 gap-3"
                variants={tileParent}
                initial="hidden"
                animate="show"
              >
                {[
                  { label: "Wyślij dokument", icon: Send, to: "/send-document" },
                  { label: "Zmień Agenta", icon: Users, to: "/change-agent" },
                  { label: "Zapytaj o polisę", icon: MessageSquare, to: "/ai-assistant" },
                  { label: "Umów kontakt", icon: CalendarClock, onClick: () => setContactOpen(true) },
                ].map((item) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    variants={tileChild}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => ("to" in item ? navigate(item.to) : item.onClick?.())}
                    className="flex flex-col items-start gap-3 rounded-[1.5rem] border border-line/90 bg-card p-4 text-left shadow-card transition hover:border-brand-orange/25"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lavender/70 text-brand-orangeDeep ring-1 ring-line/60">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-navy leading-snug">{item.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </>
        )}
      </AnimatedPage>

      <Modal
        open={referOpen}
        title="Poleć Agenta"
        onClose={() => setReferOpen(false)}
        footer={
          <Button fullWidth onClick={() => setReferOpen(false)}>
            Zamknij
          </Button>
        }
      >
        <p className="text-sm text-muted leading-relaxed">
          To prototyp. W pełnej wersji wyślesz zaproszenie lub udostępnisz dane Agenta znajomym.
        </p>
      </Modal>

      <Modal
        open={contactOpen}
        title="Umów kontakt"
        onClose={() => setContactOpen(false)}
        footer={
          <Button fullWidth onClick={() => setContactOpen(false)}>
            Rozumiem
          </Button>
        }
      >
        <p className="text-sm text-muted leading-relaxed">
          To prototyp. W pełnej wersji wybierzesz termin, a Agent potwierdzi spotkanie lub oddzwoni.
        </p>
      </Modal>
    </AppShell>
  );
}
