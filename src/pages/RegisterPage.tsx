import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneFrame } from "../components/PhoneFrame";
import { Logo } from "../components/Logo";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";

export function RegisterPage() {
  const navigate = useNavigate();
  return (
    <PhoneFrame>
      <div className="flex h-full min-h-0 flex-col overflow-hidden">
        <AuthScroll>
          <div className="mx-auto max-w-md space-y-5">
            <div className="text-center">
              <Logo className="justify-center text-2xl" />
            </div>
            <h1 className="text-xl font-bold text-navy">Załóż konto</h1>
            <p className="text-sm text-muted leading-relaxed">
              Utwórz konto i korzystaj z aplikacji. Polisy możesz pobrać później, po potwierdzeniu danych.
            </p>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/policies-empty");
              }}
            >
              <Input label="Imię" name="firstName" placeholder="np. Karol" />
              <Input label="E-mail" name="email" type="email" placeholder="twoj@email.pl" />
              <Input label="Numer telefonu" name="phone" type="tel" placeholder="503 000 000" />
              <Input label="Hasło" name="password" type="password" placeholder="Minimum 8 znaków" />
              <Checkbox label="Akceptuję Regulamin i Politykę prywatności" name="terms" required />
              <Checkbox label="Chcę otrzymywać informacje o produktach i benefitach" name="marketing" />
              <Button type="submit" fullWidth>
                Załóż konto
              </Button>
            </form>
          </div>
        </AuthScroll>
      </div>
    </PhoneFrame>
  );
}

function AuthScroll({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 pb-10 pt-[max(1.5rem,env(safe-area-inset-top))]">
      {children}
    </div>
  );
}
