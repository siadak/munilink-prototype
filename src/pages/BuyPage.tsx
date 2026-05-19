import { useState } from "react";
import {
  Bike,
  Car,
  GraduationCap,
  MessageCircleHeart,
  Plane,
  Stethoscope,
} from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { ProductCategoryCard } from "../components/ProductCategoryCard";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";

const products = [
  {
    key: "nnw",
    title: "NNW szkolne",
    description: "Ochrona ucznia w szkole, na wycieczkach i w czasie wolnym.",
    icon: GraduationCap,
  },
  {
    key: "travel",
    title: "Travel",
    description: "Ubezpieczenie podróży z assistanceem i ochroną bagażu.",
    icon: Plane,
  },
  {
    key: "bike",
    title: "Ubezpieczenie roweru / hulajnogi",
    description: "Ochrona jednośladu w ruchu miejskim i poza miastem.",
    icon: Bike,
  },
  {
    key: "homedoc",
    title: "HomeDoctor",
    description: "Teleporady i wizyty lekarza w domu.",
    icon: Stethoscope,
  },
  {
    key: "second",
    title: "Druga opinia medyczna",
    description: "Konsultacja z innym specjalistą.",
    icon: MessageCircleHeart,
  },
  {
    key: "moto",
    title: "Moto Assistance",
    description: "Pomoc na drodze i holowanie pojazdu.",
    icon: Car,
  },
] as const;

export function BuyPage() {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-3">
        <h1 className="text-lg font-bold text-brand-orange">Kup online</h1>
        <p className="text-sm text-muted">Wybierz produkt i przejdź do zakupu w aplikacji.</p>

        <div className="space-y-3 pt-1">
          {products.map((p) => (
            <ProductCategoryCard
              key={p.key}
              icon={p.icon}
              title={p.title}
              description={p.description}
              onBuy={() => setOpen(true)}
              onReadMore={() => setInfoOpen(true)}
            />
          ))}
        </div>
      </AnimatedPage>

      <Modal
        open={open}
        title="Informacja"
        onClose={() => setOpen(false)}
        footer={
          <Button fullWidth onClick={() => setOpen(false)}>
            Rozumiem
          </Button>
        }
      >
        To prototyp. W produkcyjnej wersji klient przejdzie do procesu zakupu w aplikacji.
      </Modal>

      <Modal
        open={infoOpen}
        title="Szczegóły produktu"
        onClose={() => setInfoOpen(false)}
        footer={
          <Button fullWidth onClick={() => setInfoOpen(false)}>
            Zamknij
          </Button>
        }
      >
        <p className="text-sm text-muted leading-relaxed">
          Opis produktu i warunki ubezpieczenia — jak w obecnej aplikacji mUnilink po kliknięciu „Czytaj więcej”.
        </p>
      </Modal>
    </AppShell>
  );
}
