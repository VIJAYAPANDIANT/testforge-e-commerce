import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button, FormInput } from "@/components/ui-kit";
import { DEMO_USER, MESSAGES, validateLogin } from "@/utils/validation";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "VJ Store — Log in" },
      { name: "description", content: "Sign in to VJ Store with the demo account." },
      { property: "og:title", content: "VJ Store — Log in" },
      { property: "og:description", content: "Sign in to the TestForge demo store with the demo account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [authError, setAuthError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const v = validateLogin(email, password);
    setErrors(v);
    if (Object.keys(v).length) return;
    if (login(email, password)) navigate({ to: "/products" });
    else setAuthError(MESSAGES.invalidCredentials);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
      <div className="hidden flex-col justify-center md:flex">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Demo storefront</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight">Everyday goods, built to be tested.</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          A predictable shop with stable products, prices and selectors — the target site for TestForge browser automation.
        </p>
      </div>

      <div className="mx-auto w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        <h2 className="text-2xl font-semibold md:hidden">Welcome back</h2>
        <h2 className="hidden text-2xl font-semibold md:block">Log in</h2>
        <p className="mt-1 text-sm text-muted-foreground">Use the demo account below to continue.</p>

        <div className="mt-5 flex gap-2 rounded-lg bg-accent p-3 text-sm text-accent-foreground" data-testid="demo-credentials">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            Email <strong>{DEMO_USER.email}</strong> · Password <strong>{DEMO_USER.password}</strong>
          </span>
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4" aria-label="Login form">
          {authError && (
            <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm font-medium text-destructive" data-testid="login-error">
              {authError}
            </div>
          )}
          <FormInput id="email" label="Email" type="email" autoComplete="email" testId="login-email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="you@example.com" />
          <FormInput
            id="password"
            label="Password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            testId="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            trailing={
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
                aria-pressed={show}
                className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-muted"
                data-testid="toggle-password"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
          <Button type="submit" className="w-full" data-testid="login-submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
