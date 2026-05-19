import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { AgentCard } from "../components/AgentCard";
import { OCRCard } from "../components/OCRCard";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
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
      <AnimatedPage className="space-y-4">
        <h1 className="text-lg font-bold text-brand-orange">Wyślij dokument</h1>

        <AgentCard agent={agent} roleBadge="Twój Agent" />

        <Card padding="md" className="space-y-3">
          <Input label="Typ dokumentu" name="docType" defaultValue="Umowa sprzedaży auta" />
          <Input label="Krótki opis" name="desc" placeholder="np. sprzedaż pojazdu" />
          <button
            type="button"
            className="w-full rounded-2xl border border-dashed border-line bg-[#fafafa] px-4 py-5 text-sm font-semibold text-navy"
          >
            Dodaj plik (opcjonalnie)
          </button>
          <Button fullWidth type="button" onClick={() => setSentOpen(true)}>
            Wyślij do Agenta
          </Button>
        </Card>

        <OCRCard
          compact
          label="OCR"
          tooltip="Zrób zdjęcie dokumentu — uzupełnimy pola formularza."
          primaryLabel="Zrób zdjęcie"
          secondaryLabel="Dodaj z galerii"
          onPrimary={() => runBusy("Skanujemy dokument…", 1400)}
          onSecondary={() => runBusy("Dodajemy plik…", 1000)}
        />
      </AnimatedPage>

      <Modal open={busyOpen} title="" onClose={() => setBusyOpen(false)}>
        <div className="flex flex-col items-center gap-3 py-2 text-center">
          <Loader2 className="h-9 w-9 animate-spin text-brand-orange" aria-hidden />
          <p className="text-sm font-semibold text-navy">{busyText}</p>
        </div>
      </Modal>

      <SuccessModal
        open={sentOpen}
        title="Wysłano"
        onClose={() => setSentOpen(false)}
        onPrimary={() => setSentOpen(false)}
        primaryLabel="OK"
        withConfetti={false}
      >
        <p className="text-sm font-semibold text-navy">Dokument został wysłany do Twojego Agenta.</p>
      </SuccessModal>
    </AppShell>
  );
}
