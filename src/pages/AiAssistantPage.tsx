import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Headphones, Send } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { ChatBubble } from "../components/ChatBubble";
import { InfoBanner } from "../components/InfoBanner";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

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
      "Na podstawie danych tej polisy i OWU: w razie zdarzenia objętego ochroną przysługuje holowanie pojazdu do 150 km od miejsca zdarzenia. Sprawdź OWU lub skontaktuj się z Agentem.",
  },
];

const AI_PROTOTYPE =
  "To prototyp odpowiedzi AI. W pełnej wersji odpowiedź byłaby na podstawie OWU, polisy i warunków umowy.";

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl border border-line/60 bg-white px-4 py-3 text-sm text-muted">
        Pisze…
      </div>
    </div>
  );
}

export function AiAssistantPage() {
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
    if (!text || typing) return;
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", text }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: "ai", text: AI_PROTOTYPE }]);
    }, 900);
  };

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-4 pb-2">
        <div>
          <h1 className="text-lg font-bold text-brand-orange">Asystent AI</h1>
          <p className="mt-1 text-sm text-muted">Zapytaj o swoją polisę</p>
        </div>

        <Card padding="md" className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Wybierz polisę</p>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-line/60 bg-[#fafafa] px-3 py-3 text-left"
          >
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-navy">OC samochodu • nr OC/4582/2026</span>
              <span className="mt-1 block text-xs text-muted">Honda Civic IX • WOT86568</span>
            </span>
            <ChevronDown className="h-5 w-5 shrink-0 text-muted" />
          </button>
        </Card>

        <Card padding="md" className="space-y-3">
          {messages.map((m) => (
            <ChatBubble key={m.id} from={m.role}>
              {m.text}
            </ChatBubble>
          ))}
          {typing ? <TypingIndicator /> : null}
          <div ref={bottomRef} />
        </Card>

        <InfoBanner tone="warning">
          Odpowiedzi AI mają charakter pomocniczy. W razie wątpliwości sprawdź OWU lub skontaktuj się z Agentem.
        </InfoBanner>

        <Card padding="md" className="flex gap-2 !py-2">
          <input
            className="min-h-[44px] flex-1 rounded-xl border-0 bg-transparent px-2 text-sm text-navy outline-none placeholder:text-muted"
            placeholder="Wpisz pytanie o polisę"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                send();
              }
            }}
          />
          <button
            type="button"
            disabled={typing}
            onClick={send}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white disabled:opacity-50"
            aria-label="Wyślij"
          >
            <Send className="h-5 w-5" />
          </button>
        </Card>

        <Button variant="secondary" fullWidth type="button" className="gap-2" onClick={() => navigate("/agent")}>
          <Headphones className="h-4 w-4" />
          Skontaktuj się z Agentem
        </Button>
      </AnimatedPage>
    </AppShell>
  );
}
