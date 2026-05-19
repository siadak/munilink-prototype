import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { OCRCard } from "../components/OCRCard";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";

const OCR = {
  category: "kom",
  insurer: "Allianz",
  start: "01-05-2025",
  end: "01-05-2026",
  number: "EZ986273849",
  premium: "879 zł",
} as const;

function OcrBadge({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="mb-0.5 flex justify-end">
      <Badge tone="success" className="!px-2 !py-0.5 !text-[10px] font-semibold">
        uzupełniono z OCR
      </Badge>
    </div>
  );
}

export function AddExternalPolicyPage() {
  const [ocrFilled, setOcrFilled] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const [scanPhase, setScanPhase] = useState<"scan" | "done">("scan");
  const [saveOpen, setSaveOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  const [category, setCategory] = useState("");
  const [insurer, setInsurer] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [number, setNumber] = useState("");
  const [premium, setPremium] = useState("");

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const beginScan = () => {
    setScanPhase("scan");
    setScanOpen(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setScanPhase("done"), 1600);
  };

  const applyOcrData = () => {
    setCategory(OCR.category);
    setInsurer(OCR.insurer);
    setStart(OCR.start);
    setEnd(OCR.end);
    setNumber(OCR.number);
    setPremium(OCR.premium);
    setOcrFilled(true);
    setScanOpen(false);
    setScanPhase("scan");
  };

  const clearForManual = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setScanOpen(false);
    setOcrFilled(false);
    setCategory("");
    setInsurer("");
    setStart("");
    setEnd("");
    setNumber("");
    setPremium("");
  };

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-4">
        <h1 className="text-lg font-bold text-brand-orange">Dodaj polisę spoza Unilink</h1>

        <OCRCard
          label="Skan OCR"
          tooltip="Zrób zdjęcie polisy — uzupełnimy pola formularza automatycznie."
          primaryLabel="Zrób zdjęcie polisy"
          secondaryLabel="Dodaj ręcznie"
          onPrimary={beginScan}
          onSecondary={clearForManual}
        />

        <Card padding="md" className="space-y-3">
          <p className="text-sm font-bold text-navy">Szczegóły polisy</p>

          <div>
            <OcrBadge show={ocrFilled} />
            <Select label="Kategoria" name="cat" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Wybierz</option>
              <option value="kom">Komunikacyjne</option>
              <option value="maj">Majątkowe</option>
              <option value="tur">Turystyczne</option>
            </Select>
          </div>

          <div>
            <OcrBadge show={ocrFilled} />
            <Input
              label="Towarzystwo Ubezpieczeniowe"
              name="insurer"
              value={insurer}
              onChange={(e) => setInsurer(e.target.value)}
              placeholder="np. Allianz"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <OcrBadge show={ocrFilled} />
              <Input
                label="Początek"
                name="start"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                placeholder="dd-mm-rrrr"
              />
            </div>
            <div>
              <OcrBadge show={ocrFilled} />
              <Input
                label="Koniec"
                name="end"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                placeholder="dd-mm-rrrr"
              />
            </div>
          </div>

          <div>
            <OcrBadge show={ocrFilled} />
            <Input
              label="Nr polisy"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Numer polisy"
            />
          </div>

          <div>
            <OcrBadge show={ocrFilled} />
            <Input
              label="Składka"
              name="premium"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
              placeholder="np. 879 zł"
            />
          </div>

          <button type="button" className="text-sm font-semibold text-brand-orange">
            Harmonogram rat
          </button>

          <button
            type="button"
            className="w-full rounded-2xl border border-dashed border-line bg-[#fafafa] px-4 py-5 text-sm font-semibold text-navy"
          >
            Dodaj plik (opcjonalnie)
          </button>

          <Button fullWidth type="button" onClick={() => setSaveOpen(true)}>
            Zapisz
          </Button>
        </Card>
      </AnimatedPage>

      <Modal
        open={scanOpen}
        onClose={() => {
          if (scanPhase === "done") applyOcrData();
          else {
            setScanOpen(false);
            if (timerRef.current) window.clearTimeout(timerRef.current);
          }
        }}
        title="Skan OCR"
        footer={
          scanPhase === "done" ? (
            <Button fullWidth type="button" onClick={applyOcrData}>
              OK
            </Button>
          ) : undefined
        }
      >
        {scanPhase === "scan" ? (
          <div className="flex flex-col items-center gap-3 py-2 text-center">
            <Loader2 className="h-9 w-9 animate-spin text-brand-orange" aria-hidden />
            <p className="text-sm font-semibold text-navy">Skanujemy dokument…</p>
          </div>
        ) : (
          <p className="text-center text-sm font-semibold text-navy">Dane zostały uzupełnione.</p>
        )}
      </Modal>

      <Modal
        open={saveOpen}
        title="Zapisano"
        onClose={() => setSaveOpen(false)}
        footer={
          <Button fullWidth type="button" onClick={() => setSaveOpen(false)}>
            OK
          </Button>
        }
      >
        <p className="text-center text-sm text-navy">Polisa została dodana do portfela.</p>
      </Modal>
    </AppShell>
  );
}
