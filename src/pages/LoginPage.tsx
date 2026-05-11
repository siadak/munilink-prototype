import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PhoneFrame } from "../components/PhoneFrame";
import { Logo } from "../components/Logo";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function LoginPage() {
  const navigate = useNavigate();
  return (
    <PhoneFrame>
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-x-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 pb-10 pt-[max(2rem,env(safe-area-inset-top))]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-md space-y-8"
          >
            <div className="space-y-3 text-center">
              <Logo className="justify-center text-3xl" />
              <h1 className="text-2xl font-bold text-navy">Logowanie</h1>
              <p className="text-sm leading-relaxed text-muted">
                Zaloguj się, aby przejść do prototypu aplikacji mUnilink.
              </p>
            </div>

            <Card padding="lg" className="border-lavender/60 bg-gradient-to-b from-card to-lavender/20 shadow-soft">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate("/menu");
                }}
              >
                <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
                  <Input label="Email" name="email" type="email" autoComplete="email" placeholder="twoj@email.pl" />
                </motion.div>
                <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
                  <Input label="Hasło" name="password" type="password" autoComplete="current-password" placeholder="••••••••" />
                </motion.div>
                <motion.div
                  custom={2}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="flex items-center justify-between gap-3 pt-1"
                >
                  <Checkbox label="Zapamiętaj mnie" name="remember" defaultChecked />
                  <button type="button" className="shrink-0 text-sm font-semibold text-brand-orangeDeep hover:text-brand-orange">
                    Przypomnij hasło
                  </button>
                </motion.div>
                <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="pt-2">
                  <Button type="submit" fullWidth>
                    Zaloguj się
                  </Button>
                </motion.div>
              </form>
            </Card>

            <p className="text-center text-sm text-muted">
              Jeśli nie masz jeszcze konta,{" "}
              <Link to="/register" className="font-semibold text-brand-orangeDeep hover:text-brand-orange">
                Zarejestruj się
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
