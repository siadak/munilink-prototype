import {
  Bot,
  ClipboardList,
  FilePlus2,
  Gift,
  ShoppingBag,
  Upload,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MoreMenuItem = {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
};

/** 4 szybkie akcje w bottom sheet (reszta na /more). */
export const moreQuickActions: MoreMenuItem[] = [
  {
    title: "Benefity",
    description: "Oferty partnerów",
    path: "/benefits",
    icon: Gift,
  },
  {
    title: "Kup",
    description: "Produkty online",
    path: "/buy",
    icon: ShoppingBag,
  },
  {
    title: "Dodaj polisę",
    description: "Spoza Unilink",
    path: "/add-external-policy",
    icon: FilePlus2,
  },
  {
    title: "Dokument",
    description: "Wyślij Agentowi",
    path: "/send-document",
    icon: Upload,
  },
];

export const moreMenuItems: MoreMenuItem[] = [
  {
    title: "Benefity",
    description: "Oferty partnerów dostępne w aplikacji",
    path: "/benefits",
    icon: Gift,
  },
  {
    title: "Kup ubezpieczenie",
    description: "Wybierz produkt i kup online",
    path: "/buy",
    icon: ShoppingBag,
  },
  {
    title: "Cashback",
    description: "Sprawdź punkty za zakupy w aplikacji",
    path: "/cashback",
    icon: Wallet,
  },
  {
    title: "Ankieta życiowa",
    description: "Odpowiedz na kilka pytań i otrzymaj kontakt od Agenta",
    path: "/life-survey",
    icon: ClipboardList,
  },
  {
    title: "Asystent AI",
    description: "Zadaj pytanie o swoją polisę",
    path: "/ai-assistant",
    icon: Bot,
  },
  {
    title: "Dodaj polisę spoza Unilink",
    description: "Dodaj polisę kupioną poza Unilink",
    path: "/add-external-policy",
    icon: FilePlus2,
  },
  {
    title: "Wyślij dokument do Agenta",
    description: "Prześlij zdjęcie lub plik do swojego Agenta",
    path: "/send-document",
    icon: Upload,
  },
];

/** Ścieżki aktywujące zakładkę „Więcej” (bez /more, Polisy, Agent). */
export const moreTabActivePaths = [
  "/benefits",
  "/benefit-checkout",
  "/benefit",
  "/buy",
  "/cashback",
  "/life-survey",
  "/ai-assistant",
] as const;
