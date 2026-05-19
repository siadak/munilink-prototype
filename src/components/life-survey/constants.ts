import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Calendar,
  Clock,
  FileText,
  Heart,
  HeartPulse,
  Home,
  MessageCircle,
  Shield,
  Sun,
  User,
  Users,
} from "lucide-react";

export const SURVEY_STEPS = ["Start", "Zdrowie", "Ochrona", "Kontakt", "Oferta"] as const;
export const TOTAL_STEPS = 5;

export const WHO_OPTIONS: { label: string; icon: LucideIcon }[] = [
  { label: "Tylko siebie", icon: User },
  { label: "Siebie i partnera", icon: Heart },
  { label: "Siebie i dzieci", icon: Users },
  { label: "Całą rodzinę", icon: Shield },
];

export const HEALTH_OPTIONS = [
  { label: "Bardzo dobry", icon: HeartPulse },
  { label: "Dobry", icon: Activity },
  { label: "Średni", icon: Heart },
  { label: "Wolę omówić z Agentem", icon: MessageCircle },
] as const;

export const PROTECTION_OPTIONS = [
  { label: "Zabezpieczenie bliskich", icon: Heart },
  { label: "Ochrona życia i zdrowia", icon: Shield },
  { label: "Zabezpieczenie kredytu", icon: Home },
  { label: "Szeroka ochrona rodziny", icon: Users },
] as const;

export const TIMING_OPTIONS = [
  { label: "Dzisiaj", icon: Sun },
  { label: "Jutro", icon: Calendar },
  { label: "W tym tygodniu", icon: Clock },
  { label: "Tylko proszę o propozycję", icon: FileText },
] as const;
