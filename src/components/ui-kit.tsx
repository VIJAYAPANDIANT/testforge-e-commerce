import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAX_QTY, MIN_QTY } from "@/utils/cart";

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "dark" | "outline" | "ghost" };

export const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
export const btnVariants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  dark: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  outline: "border bg-card hover:bg-muted",
  ghost: "hover:bg-muted",
};

export function Button({ variant = "primary", className, ...props }: BtnProps) {
  return <button className={cn(btnBase, btnVariants[variant], className)} {...props} />;
}

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string | undefined;
  testId: string;
  trailing?: ReactNode;
};

export function FormInput({ id, label, error, testId, trailing, className, ...props }: FormInputProps) {
  const errId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          id={id}
          name={id}
          data-testid={testId}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className={cn(
            "w-full rounded-lg border bg-card px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20",
            error && "border-destructive",
            trailing && "pr-11",
          )}
          {...props}
        />
        {trailing && <div className="absolute inset-y-0 right-1 flex items-center">{trailing}</div>}
      </div>
      {error && (
        <p id={errId} role="alert" className="mt-1.5 text-xs font-medium text-destructive" data-testid={`${testId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function QuantitySelector({
  value,
  onChange,
  idPrefix,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  idPrefix: string;
  label: string;
}) {
  return (
    <div className="inline-flex items-center rounded-lg border bg-card" role="group" aria-label={`Quantity for ${label}`}>
      <button
        type="button"
        aria-label={`Decrease quantity of ${label}`}
        onClick={() => onChange(value - 1)}
        disabled={value <= MIN_QTY}
        className="grid h-9 w-9 place-items-center rounded-l-lg hover:bg-muted disabled:opacity-40"
        data-testid={`${idPrefix}-decrease`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-9 text-center text-sm font-semibold tabular-nums" aria-live="polite" data-testid={`${idPrefix}-quantity`}>
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase quantity of ${label}`}
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        className="grid h-9 w-9 place-items-center rounded-r-lg hover:bg-muted disabled:opacity-40"
        data-testid={`${idPrefix}-increase`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  testId,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  testId: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed bg-card px-6 py-14 text-center" data-testid={testId}>
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
