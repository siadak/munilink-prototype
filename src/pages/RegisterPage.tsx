import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PhoneFrame } from "../components/PhoneFrame";
import { Logo } from "../components/Logo";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 + i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function RegisterPage() {
  const navigate = useNavigate();
  return (
    <PhoneFrame>
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-x-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 pb-10 pt-[max(1.5rem,env(safe-area-inset-top))]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-md space-y-6"
          >
            <div className="text-center">
              <Logo className="justify-center text-2xl" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-navy">Załóż konto</h1>
              <p className="text-sm leading-relaxed text-muted">
                Utwórz konto i korzystaj z aplikacji. Polisy możesz pobrać później, po potwierdzeniu danych.
              </p>
            </div>

            <Card padding="lg" className="border-lavender/60 bg-gradient-to-b from-card to-lavender/20 shadow-soft">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate("/policies-empty");
                }}
              >
                {[
                  <Input key="fn" label="Imię" name="firstName" placeholder="np. Karol" />,
                  <Input key="em" label="E-mail" name="email" type="email" placeholder="twoj@email.pl" />,
                  <Input key="ph" label="Numer telefonu" name="phone" type="tel" placeholder="503 000 000" />,
                  <Input key="pw" label="Hasło" name="password" type="password" placeholder="Minimum 8 znaków" />,
                ].map((field, idx) => (
                  <motion.div key={idx} custom={idx} variants={fadeUp} initial="hidden" animate="show">
                    {field}
                  </motion.div>
                ))}
                <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="space-y-3 pt-1">
                  <Checkbox label="Akceptuję Regulamin i Politykę prywatności" name="terms" required />
                  <Checkbox label="Chcę otrzymywać informacje o produktach i benefitach" name="marketing" />
                </motion.div>
                <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show" className="pt-2">
                  <Button type="submit" fullWidth>
                    Załóż konto
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
