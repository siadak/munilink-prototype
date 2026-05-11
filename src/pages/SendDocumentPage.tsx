import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { AgentCard } from "../components/AgentCard";
import { OCRCard } from "../components/OCRCard";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { SuccessModal } from "../components/SuccessModal";
import { agent } from "../data/mocks";

export function SendDocumentPage() {
  const [busyOpen, setBusyOpen] = useState(false);
  const [busyText, setBusyText] = useState("");
  const [sentOpen, setSentOpen] = useState(false);
  const busyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (busyTimerRef.current) window.clearTimeout(busyTimerRef.current);
    };
  }, []);

  const runBusy = (message: string, ms: number) => {
    if (busyTimerRef.current) window.clearTimeout(busyTimerRef.current);
    setBusyText(message);
    setBusyOpen(true);
    busyTimerRef.current = window.setTimeout(() => {
      setBusyOpen(false);
      busyTimerRef.current = null;
    }, ms);
  };

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-5">
        <h1 className="text-xl font-bold text-navy leading-snug">Wyślij dokument do swojego Agenta</h1>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <AgentCard agent={agent} roleBadge="Twój Agent" />
        </motion.div>

        <p className="text-sm text-muted leading-snug">
          Zrób zdjęcie lub dodaj plik i wyślij dokument do swojego Agenta.
        </p>

        <OCRCard
          label="SZYBKIE WYSYŁANIE Z OCR"
          tooltip="OCR pomaga uzupełnić dane ze zdjęcia dokumentu."
          headline="Dodaj dokument w kilka sekund"
          description="Dodaj dokument szybko i wygodnie."
          primaryLabel="Zrób zdjęcie dokumentu"
          secondaryLabel="Dodaj z galerii"
          onPrimary={() => runBusy("Skanujemy dokument…", 1400)}
          onSecondary={() => runBusy("Dodajemy plik z galerii…", 1000)}
        />

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.05 }}
          className="space-y-3"
        >
          <Input label="Typ dokumentu" name="docType" defaultValue="Umowa sprzedaży auta" />
          <Input label="Krótki opis" name="desc" placeholder="np. sprzedaż pojazdu po zbyciu" />
          <button
            type="button"
            className="w-full rounded-2xl border border-dashed border-brand-orange/30 bg-lavender/15 px-4 py-5 text-sm font-semibold text-navy"
          >
            Dodaj plik (opcjonalnie)
          </button>
          <div className="rounded-2xl bg-success-soft border border-success/25 px-4 py-3 text-sm font-medium text-navy">
            Dane mogą zostać uzupełnione automatycznie przez OCR
          </div>
          <Button fullWidth type="button" onClick={() => setSentOpen(true)}>
            Wyślij do Agenta
          </Button>
        </motion.section>
      </AnimatedPage>

      <Modal open={busyOpen} title="" onClose={() => setBusyOpen(false)}>
        <AnimatePresence mode="wait">
          {busyOpen ? (
            <motion.div
              key="busy"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-4 py-3 text-center"
            >
              <Loader2 className="h-11 w-11 animate-spin text-brand-orangeDeep" aria-hidden />
              <p className="font-semibold leading-snug text-navy">{busyText}</p>
              <p className="text-xs text-muted">To symulacja OCR w prototypie.</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Modal>

      <SuccessModal
        open={sentOpen}
        title=""
        onClose={() => setSentOpen(false)}
        onPrimary={() => setSentOpen(false)}
        primaryLabel="OK"
      >
        <p className="font-semibold text-navy leading-relaxed">
          Dokument został wysłany do Twojego Agenta.
        </p>
      </SuccessModal>
    </AppShell>
  );
}
