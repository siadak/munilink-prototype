export type RegisterScenarioId = "1" | "2" | "3" | "4";

export const REGISTER_SCENARIOS: RegisterScenarioId[] = ["1", "2", "3", "4"];

export function parseRegisterScenario(raw: string | null): RegisterScenarioId {
  if (raw === "2" || raw === "3" || raw === "4") return raw;
  return "1";
}

export const SCENARIO_LABELS: Record<RegisterScenarioId, string> = {
  "1": "Obecny proces",
  "2": "PESEL opcjonalny — podany",
  "3": "PESEL opcjonalny — pominięty",
  "4": "Szybka rejestracja",
};

export const SCENARIO_SUBTITLES: Record<RegisterScenarioId, string> = {
  "1": "Podaj dane, aby utworzyć konto i pobrać polisy z Unilink.",
  "2": "Załóż konto i pobierz swoje polisy już podczas rejestracji.",
  "3": "Załóż konto teraz, a polisy pobierzesz później w aplikacji.",
  "4": "Załóż konto w kilka sekund. Dane uzupełnisz później.",
};

export const REGISTER_SCENARIO_TOOLTIPS: Record<RegisterScenarioId, string> = {
  "1":
    "Klient podaje pełny zestaw danych, w tym PESEL i numer telefonu. Dane pozwalają zweryfikować klienta w UniWersum, pobrać jego polisy oraz przypisać Agenta zgodnie z danymi w systemie.",
  "2":
    "Klient zakłada konto w uproszczonym procesie, ale decyduje się podać PESEL, aby od razu pobrać swoje polisy i przypisać Agenta z UniWersum.",
  "3":
    "Klient zakłada konto bez podawania PESEL-u. Może korzystać z aplikacji, a pobranie polis wykonać później z poziomu zakładki Polisy.",
  "4":
    "Najkrótszy wariant rejestracji. Klient podaje numer telefonu i hasło, a pozostałe dane oraz ewentualne powiązanie z polisami uzupełnia później w aplikacji.",
};

export type RegistrationOutcome = {
  message: string;
  demoMode: "VERIFIED" | "BEFORE_FETCH" | "NO_PESEL";
  redirectTo: "/policies" | "/menu";
};

export const REGISTRATION_OUTCOMES: Record<RegisterScenarioId, RegistrationOutcome> = {
  "1": {
    message: "Konto zostało utworzone. Dane klienta zostały zweryfikowane w UniWersum.",
    demoMode: "VERIFIED",
    redirectTo: "/policies",
  },
  "2": {
    message: "Konto zostało utworzone. Rozpoczynamy pobieranie polis z UniWersum.",
    demoMode: "VERIFIED",
    redirectTo: "/policies",
  },
  "3": {
    message: "Konto zostało utworzone. Polisy możesz pobrać później w aplikacji.",
    demoMode: "BEFORE_FETCH",
    redirectTo: "/policies",
  },
  "4": {
    message: "Konto zostało utworzone. Uzupełnij dane w aplikacji, aby skorzystać ze wszystkich funkcji.",
    demoMode: "NO_PESEL",
    redirectTo: "/menu",
  },
};
