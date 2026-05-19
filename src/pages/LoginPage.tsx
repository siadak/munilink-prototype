import { Link, useNavigate } from "react-router-dom";
import { PhoneFrame } from "../components/PhoneFrame";
import { Logo } from "../components/Logo";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";

export function LoginPage() {
  const navigate = useNavigate();
  return (
    <PhoneFrame>
      <div className="flex h-full min-h-0 flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 pb-10 pt-[max(2rem,env(safe-area-inset-top))]">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <Logo className="justify-center text-3xl" />
              <h1 className="text-xl font-bold text-navy">Logowanie</h1>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/menu");
              }}
            >
              <Input label="Email" name="email" type="email" autoComplete="email" placeholder="twoj@email.pl" />
              <Input label="Hasło" name="password" type="password" autoComplete="current-password" placeholder="••••••••" />
              <div className="flex items-center justify-between gap-3 pt-1">
                <Checkbox label="Zapamiętaj mnie" name="remember" defaultChecked />
                <button type="button" className="shrink-0 text-sm font-semibold text-brand-orange">
                  Przypomnij hasło
                </button>
              </div>
              <Button type="submit" fullWidth>
                Zaloguj się
              </Button>
            </form>
            <p className="text-center text-sm text-muted">
              Jeśli nie masz jeszcze konta,{" "}
              <Link to="/register" className="font-semibold text-brand-orange">
                Zarejestruj się
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
