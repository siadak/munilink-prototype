import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  ChevronDown,
  FileText,
  Headphones,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PremiumAppShell } from "../components/PremiumAppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { ChatBubble } from "../components/ChatBubble";
import { InfoBanner } from "../components/InfoBanner";
import { Button } from "../../components/Button";

type Msg = { id: string; role: "user" | "ai"; text: string };

const INITIAL_MESSAGES: Msg[] = [
  {
    id: "m1",
    role: "user",
    text: "Czy w ramach tej polisy przysługuje holowanie pojazdu?",
  },
  {
    id: "m2",
    role: "ai",
    text:
      "Na podstawie danych tej polisy i OWU: w razie zdarzenia objętego ochroną przysługuje holowanie pojazdu do 150 km od miejsca zdarzenia. Szczegółowe warunki i limity zależą od zapisów umowy. Sprawdź OWU lub skontaktuj się z Agentem.",
  },
];

const AI_PROTOTYPE =
  "To prototyp odpowiedzi AI. W prawdziwej wersji odpowiedź byłaby przygotowana na podstawie OWU, polisy i warunków umowy.";

function TypingIndicator() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4, transition: { duration: 0.18 } }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-start"
    >
      <div className="flex items-center gap-1.5 rounded-3xl rounded-bl-md border border-line/90 bg-gradient-to-br from-card to-lavender/30 px-4 py-3.5 shadow-card">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-brand-orange/70"
            animate={{ y: [0, -6, 0], opacity: [0.35, 1, 0.35], scale: [1, 1.15, 1] }}
            transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function PremiumAiAssistantPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userId = `u-${Date.now()}`;
    setMessages((m) => [...m, { id: userId, role: "user", text }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: "ai", text: AI_PROTOTYPE }]);
    }, 1400);
  };

  return (
    <PremiumAppShell>
      <AnimatedPage className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-orangeDeep">Asystent AI</h1>
          <p className="mt-1 text-sm font-medium text-navy">Zapytaj o swoją polisę</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-[2rem] border border-lavender/80 bg-gradient-to-br from-lavender/40 via-card to-lavender-soft/30 p-6 shadow-card"
        >
          <motion.div
            className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-brand-orange/10 blur-2xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative flex items-center gap-4">
            <motion.div
              className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy text-white shadow-soft"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bot className="h-9 w-9" />
              <motion.span
                className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-card shadow-md ring-2 ring-lavender"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-3.5 w-3.5 text-brand-orangeDeep" />
              </motion.span>
            </motion.div>
            <div className="flex flex-1 flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-[11px] font-semibold text-navy ring-1 ring-line/80 shadow-sm">
                <FileText className="h-3.5 w-3.5 text-brand-orangeDeep" />
                Chat
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-[11px] font-semibold text-navy ring-1 ring-line/80 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                Polisa
              </span>
            </div>
          </div>
        </motion.div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Wybierz polisę</p>
          <motion.button
            type="button"
            whileTap={{ scale: 0.99 }}
            className="flex w-full items-center justify-between gap-3 rounded-[1.5rem] border border-line/90 bg-card px-4 py-4 text-left shadow-card ring-1 ring-transparent transition hover:ring-brand-orange/20"
          >
            <div className="min-w-0">
              <p className="text-sm font-bold text-navy">OC samochodu • nr OC/4582/2026</p>
              <p className="mt-2 inline-flex rounded-full bg-lavender/70 px-3 py-1 text-xs font-semibold text-navy ring-1 ring-line/60">
                Honda Civic IX • nr rej. WOT86568
              </p>
            </div>
            <ChevronDown className="h-5 w-5 shrink-0 text-muted" />
          </motion.button>
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-lavender/80 bg-lavender/40 px-3 py-1.5 text-xs font-semibold text-navy">
              <Sparkles className="h-3.5 w-3.5 text-brand-orangeDeep" />
              Analiza: OWU + polisa + warunki umowy
            </span>
          </div>
        </div>

        <div className="space-y-3 rounded-[1.75rem] border border-line/80 bg-surface-light/80 p-4 ring-1 ring-line/40">
          {messages.map((m) => (
            <ChatBubble key={m.id} from={m.role}>
              {m.text}
            </ChatBubble>
          ))}
          <AnimatePresence>{typing ? <TypingIndicator /> : null}</AnimatePresence>
          <div ref={bottomRef} />
        </div>

        <InfoBanner tone="warning">
          <p className="text-sm leading-relaxed text-navy/90">
            Odpowiedzi AI mają charakter pomocniczy. Nie gwarantujemy ich poprawności ani kompletności. W razie
            wątpliwości sprawdź OWU, dokumenty polisy lub skontaktuj się z Agentem.
          </p>
        </InfoBanner>

        <Button variant="secondary" fullWidth className="gap-2" type="button" onClick={() => navigate("/agent")}>
          <Headphones className="h-4 w-4" />
          Skontaktuj się z Agentem
        </Button>
      </AnimatedPage>

      <div className="fixed bottom-[calc(120px+env(safe-area-inset-bottom))] left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-4">
        <div className="flex gap-2 rounded-[1.25rem] border border-line/90 bg-card/95 p-2 shadow-2xl backdrop-blur-md">
          <input
            className="min-h-[48px] flex-1 rounded-xl border-0 bg-transparent px-3 text-sm text-navy outline-none placeholder:text-muted/80"
            placeholder="Wpisz pytanie o polisę"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (!typing) send();
              }
            }}
          />
          <motion.button
            type="button"
            disabled={typing}
            whileTap={{ scale: 0.94 }}
            onClick={send}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange to-brand-orangeDeep text-white shadow-soft disabled:opacity-50"
            aria-label="Wyślij"
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </PremiumAppShell>
  );
}
