import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Modal } from "./Modal";
import { Button } from "./Button";

export function SuccessModal({
  open,
  title = "Gotowe!",
  children,
  primaryLabel = "OK",
  onPrimary,
  onClose,
  footer,
}: {
  open: boolean;
  title?: string;
  children: ReactNode;
  primaryLabel?: string;
  onPrimary?: () => void;
  onClose: () => void;
  /** Gdy podane, zastępuje domyślny pojedynczy przycisk (np. kilka CTA). */
  footer?: ReactNode;
}) {
  const hasConfettiFiredRef = useRef(false);

  useEffect(() => {
    if (!open) {
      hasConfettiFiredRef.current = false;
      return;
    }
    if (hasConfettiFiredRef.current) return;

    // Subtelny confetti tylko raz na otwarcie (pomijamy przy reduced-motion).
    const reduced =
      typeof window !== "undefined" &&
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      confetti({
        particleCount: 70,
        spread: 58,
        startVelocity: 14,
        scalar: 0.8,
        ticks: 220,
        origin: { y: 0.62 },
        colors: ["#FF8A00", "#FFB15C", "#2EB85C", "#EFEDFF", "#171A4A"],
      });
    }

    hasConfettiFiredRef.current = true;
  }, [open]);

  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={
        footer ?? (
          <Button fullWidth onClick={onPrimary ?? onClose}>
            {primaryLabel}
          </Button>
        )
      }
    >
      <div className="flex items-start gap-3">
        <motion.div
          aria-hidden="true"
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
          className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-success/20 bg-success-soft text-success"
        >
          <CheckCircle2 className="h-5 w-5" />
        </motion.div>
        <div className="min-w-0 flex-1 space-y-2">{children}</div>
      </div>
    </Modal>
  );
}

