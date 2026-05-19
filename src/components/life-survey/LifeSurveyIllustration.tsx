import { motion } from "framer-motion";

export type SurveyIllustrationVariant = "start" | "health" | "protection" | "contact" | "offer";

const float = {
  y: [0, -6, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

const sparkle = (delay: number) => ({
  opacity: [0.35, 0.9, 0.35],
  scale: [0.85, 1.1, 0.85],
  transition: { duration: 2.4, repeat: Infinity, delay, ease: "easeInOut" },
});

function Particles() {
  const dots = [
    { x: "12%", y: "18%", d: 0 },
    { x: "82%", y: "22%", d: 0.4 },
    { x: "78%", y: "72%", d: 0.8 },
    { x: "18%", y: "68%", d: 1.1 },
  ];
  return (
    <>
      {dots.map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-brand-orange/50"
          style={{ left: p.x, top: p.y }}
          animate={sparkle(p.d)}
        />
      ))}
    </>
  );
}

export function LifeSurveyIllustration({ variant }: { variant: SurveyIllustrationVariant }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-lavender/70 bg-gradient-to-br from-lavender/80 via-lavender-soft to-warning-bg/25 px-4 py-5"
      aria-hidden
    >
      <div className="pointer-events-none absolute -right-6 top-0 h-28 w-28 rounded-full bg-brand-orange/12 blur-2xl" />
      <motion.div className="pointer-events-none absolute -left-4 bottom-2 h-24 w-24 rounded-full bg-white/60 blur-xl" animate={float} />
      <Particles />

      <motion.div animate={float} className="relative mx-auto max-w-[280px]">
        {variant === "start" && <StartArt />}
        {variant === "health" && <HealthArt />}
        {variant === "protection" && <ProtectionArt />}
        {variant === "contact" && <ContactArt />}
        {variant === "offer" && <OfferArt />}
      </motion.div>
    </div>
  );
}

function StartArt() {
  return (
    <svg viewBox="0 0 280 150" className="mx-auto h-[140px] w-full">
      <ellipse cx="140" cy="138" rx="95" ry="7" fill="#E7E8F1" opacity="0.85" />
      <g stroke="#171A4A" strokeWidth="2" fill="#EFEDFF">
        <circle cx="78" cy="62" r="20" />
        <path d="M78 82 Q78 108 52 118 L104 118 Q78 108 78 82" />
        <circle cx="132" cy="54" r="22" fill="#FFF4E8" stroke="#FF8A00" />
        <path d="M132 76 Q132 112 100 122 L164 122 Q132 112 132 76" fill="#FFF4E8" stroke="#FF8A00" />
        <circle cx="188" cy="60" r="17" />
        <path d="M188 77 Q188 110 170 118 L206 118 Q188 110 188 77" />
        <circle cx="112" cy="100" r="11" fill="#FFF4E8" stroke="#FF8A00" strokeWidth="1.5" />
        <path d="M112 111 Q112 124 98 128 L126 128 Q112 124 112 111" fill="#FFF4E8" stroke="#FF8A00" strokeWidth="1.5" />
      </g>
      <path d="M132 48 Q142 40 152 48" fill="none" stroke="#FF8A00" strokeWidth="2" strokeLinecap="round" />
      <g transform="translate(198, 28)">
        <path d="M0 20 L20 0 L40 20 L20 50 Z" fill="white" stroke="#171A4A" strokeWidth="2" />
        <path d="M12 28 L20 36 L28 22" fill="none" stroke="#FF8A00" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 36 L20 44" stroke="#FF8A00" strokeWidth="2" />
        <circle cx="20" cy="18" r="6" fill="#FF8A00" opacity="0.9" />
      </g>
      <path
        d="M48 36 C56 28 64 32 68 40"
        fill="none"
        stroke="#C4B5FD"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

function HealthArt() {
  return (
    <svg viewBox="0 0 280 150" className="mx-auto h-[140px] w-full">
      <ellipse cx="140" cy="138" rx="90" ry="7" fill="#E7E8F1" opacity="0.85" />
      <circle cx="140" cy="78" r="48" fill="white" stroke="#E7E8F1" strokeWidth="2" />
      <path
        d="M140 52 C128 52 120 62 120 74 C120 88 140 108 140 108 C140 108 160 88 160 74 C160 62 152 52 140 52 Z"
        fill="#FF8A00"
        opacity="0.92"
      />
      <path
        d="M95 95 Q75 75 88 58"
        fill="none"
        stroke="#171A4A"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="88" cy="56" r="10" fill="#EFEDFF" stroke="#171A4A" strokeWidth="2" />
      <ellipse cx="200" cy="88" rx="28" ry="14" fill="#EFEDFF" stroke="#171A4A" strokeWidth="2" />
      <path d="M172 88 L228 88" stroke="#171A4A" strokeWidth="2" />
    </svg>
  );
}

function ProtectionArt() {
  return (
    <svg viewBox="0 0 280 150" className="mx-auto h-[140px] w-full">
      <ellipse cx="140" cy="138" rx="95" ry="7" fill="#E7E8F1" opacity="0.85" />
      <path d="M60 95 Q140 35 220 95 L220 110 Q140 70 60 110 Z" fill="#EFEDFF" stroke="#171A4A" strokeWidth="2" opacity="0.5" />
      <path d="M90 100 Q140 50 190 100 L190 118 Q140 78 90 118 Z" fill="white" stroke="#171A4A" strokeWidth="2" />
      <path d="M140 58 L140 108" stroke="#FF8A00" strokeWidth="3" strokeLinecap="round" />
      <path d="M118 80 L140 58 L162 80" fill="none" stroke="#FF8A00" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="108" y="108" width="64" height="28" rx="6" fill="#FFF4E8" stroke="#FF8A00" strokeWidth="2" />
      <path d="M124 122 h32 M124 128 h20" stroke="#171A4A" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function ContactArt() {
  return (
    <svg viewBox="0 0 280 150" className="mx-auto h-[140px] w-full">
      <ellipse cx="140" cy="138" rx="90" ry="7" fill="#E7E8F1" opacity="0.85" />
      <rect x="88" y="42" width="104" height="72" rx="14" fill="white" stroke="#171A4A" strokeWidth="2" />
      <rect x="100" y="54" width="80" height="12" rx="6" fill="#EFEDFF" />
      <circle cx="140" cy="92" r="18" fill="#FF8A00" opacity="0.15" />
      <path
        d="M128 92 L136 100 L152 84"
        fill="none"
        stroke="#FF8A00"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="196" y="48" width="44" height="52" rx="8" fill="#FFF4E8" stroke="#FF8A00" strokeWidth="2" />
      <path d="M208 62 h20 M208 72 h16 M208 82 h12" stroke="#171A4A" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <circle cx="52" cy="72" r="22" fill="#EFEDFF" stroke="#171A4A" strokeWidth="2" />
      <path d="M44 72 h16 M52 64 v16" stroke="#FF8A00" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function OfferArt() {
  return (
    <svg viewBox="0 0 280 150" className="mx-auto h-[140px] w-full">
      <ellipse cx="140" cy="138" rx="90" ry="7" fill="#E7E8F1" opacity="0.85" />
      <rect x="78" y="40" width="124" height="88" rx="12" fill="white" stroke="#171A4A" strokeWidth="2" />
      <path d="M94 58 h92 M94 72 h72 M94 86 h52" stroke="#E7E8F1" strokeWidth="4" strokeLinecap="round" />
      <circle cx="200" cy="52" r="22" fill="#EAF8F0" stroke="#2EB85C" strokeWidth="2" />
      <path d="M192 52 L198 58 L210 46" fill="none" stroke="#2EB85C" strokeWidth="3" strokeLinecap="round" />
      <circle cx="72" cy="100" r="20" fill="#FFF4E8" stroke="#FF8A00" strokeWidth="2" />
      <circle cx="72" cy="94" r="8" fill="#EFEDFF" stroke="#171A4A" strokeWidth="1.5" />
      <path d="M64 108 Q72 118 80 108" fill="#FFF4E8" stroke="#FF8A00" strokeWidth="1.5" />
    </svg>
  );
}
