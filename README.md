# mUnilink — prototyp (React + Vite)

Interaktywny prototyp aplikacji mobilnej w ramce telefonu (ok. 390–430 px). Stack: **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **react-router-dom**, **framer-motion**, **lucide-react**.

## Uruchomienie lokalne

Wymagany **Node.js 18+**.

```bash
npm install
npm run dev
```

Domyślnie Vite nasłuchuje na `http://localhost:5173`. Punkt wejścia: `/` przekierowuje na `/login`.

## Build produkcyjny

```bash
npm run build
npm run preview
```

Katalog wyjściowy: `dist/`.

## Wdrożenie na Vercel

1. Utwórz projekt w [Vercel](https://vercel.com) i połącz repozytorium **albo** zainstaluj CLI: `npm i -g vercel`.
2. Framework preset: **Vite**. Katalog główny: root repozytorium.
3. Plik `vercel.json` zawiera przepisanie ścieżek na `index.html`, aby **SPA** (react-router) działało po odświeżeniu pod adresami takimi jak `/policies` czy `/policy/1`.

```bash
vercel
```

Po pierwszym wdrożeniu produkcja: `vercel --prod`.

## Tryby użytkownika (demo)

W nagłówku aplikacji kliknij **ikonę profilu** — otwiera się panel **trybu demo** (stan zapisywany w `localStorage` pod kluczem `munilink-demo-mode`).

| Tryb             | Skrócony opis |
|------------------|----------------|
| **Nowy użytkownik bez PESEL** | Konto techniczne, brak polis z UniWersum, pusty stan polis; zakupy, benefity i polisa z zewnątrz dostępne. |
| **Klient przed pobraniem polis** | Konto z e-mailem/telefonem; ekran polis z CTA „Pobierz swoje polisy”. |
| **Klient po weryfikacji** | Polisy, agent, AI, wysyłka dokumentów (scenariusz „pełna” aplikacja). |
| **Klient bez agenta** | Polisy w aplikacji; zakładka Agent w pustym stanie z CTA do Unilink / wskazania agenta. |
| **Klient historyczny** | Brak aktywnych polis w UI; komunikat historyczny i CTA (kup / dodaj z zewnątrz / agent). |

Tryb wpływa m.in. na `/menu`, `/policies`, `/policies-empty` i `/agent`.

## Główne flow demo (sugerowana kolejność)

1. **Rejestracja** → `/register` → `/policies-empty` (onboarding polis).
2. **Logowanie** → `/login` → `/menu`.
3. **Pobranie polis** → `/fetch-policies` (symulacja).
4. **Lista i szczegóły** → `/policies`, `/policy/1`.
5. **Zakupy i benefity** → `/buy`, `/cashback`, `/benefits`, `/benefit-checkout/beactive`.
6. **Polisa z zewnątrz** → `/add-external-policy`.
7. **Agent i dokumenty** → `/agent`, `/send-document`, `/change-agent`.
8. **Ankieta życiowa** → `/life-survey`.
9. **Asystent AI** → `/ai-assistant`.
10. **Pomoc** → `/help`.

## Referencje wizualne

Pliki referencyjne (mockupy / zrzuty) umieszczaj w katalogu:

`public/design-references/`

Część ekranów ładuje obrazy z tej ścieżki (np. onboarding polis). Po sklonowaniu repozytorium upewnij się, że wymagane pliki graficzne są obecne lokalnie.

## Struktura (`src/`)

- `components/` — UI powtarzalny (`AppShell`, `PhoneFrame`, `Header`, `BottomNav`, `Modal`, `Button`, …).
- `pages/` — widoki tras.
- `context/DemoContext.tsx` — tryby demo.
- `data/mocks.ts` — dane statyczne (polisy, benefity, agent).

## Licencja

Prototyp wewnętrzny / warsztatowy — dopasuj licencję do polityki organizacji.
