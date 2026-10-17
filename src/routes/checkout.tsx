import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { Lock, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { detailLines, shippingFor } from "@/utils/cart";
import { validateCheckout, type CheckoutForm, type Errors } from "@/utils/validation";
import { buildOrder, nextOrderId, saveLastOrder } from "@/utils/orders";
import { Button, EmptyState, FormInput, btnBase, btnVariants } from "@/components/ui-kit";
import { OrderSummary } from "@/components/OrderSummary";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "VJ Store — Checkout" },
      { name: "description", content: "Enter delivery details to place a demo order in VJ Store." },
      { property: "og:title", content: "VJ Store — Checkout" },
      { property: "og:description", content: "Enter delivery details to place a demo order. No payment required." },
    ],
  }),
  component: CheckoutPage,
});

const EMPTY: CheckoutForm = { fullName: "", email: "", phone: "", address: "", city: "", postalCode: "" };
const FIELDS: { key: keyof CheckoutForm; label: string; type?: string; autoComplete: string; full?: boolean }[] = [
  { key: "fullName", label: "Full Name", autoComplete: "name", full: true },
  { key: "email", label: "Email", type: "email", autoComplete: "email" },
  { key: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
  { key: "address", label: "Address", autoComplete: "street-address", full: true },
  { key: "city", label: "City", autoComplete: "address-level2" },
  { key: "postalCode", label: "Postal Code", autoComplete: "postal-code" },
];
const testIdFor = (k: keyof CheckoutForm) => `checkout-${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}`;

function CheckoutPage() {
  const { lines, ready, subtotal, clear } = useCart();
  const { user, ready: authReady } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<CheckoutForm>(EMPTY);
  const [errors, setErrors] = useState<Errors<keyof CheckoutForm>>({});
  const [submitting, setSubmitting] = useState(false);
  const submitted = useRef(false);
  const detailed = detailLines(lines);

  if (!ready || !authReady) return <div className="py-20 text-center text-sm text-muted-foreground" data-testid="checkout-loading">Loading…</div>;

  if (!user) {
    return (
      <div className="px-4 py-20">
        <EmptyState
          testId="checkout-login-required"
          icon={<Lock className="h-6 w-6" />}
          title="Please log in to check out"
          description="Use the demo account to continue to checkout."
          action={<Link to="/login" className={cn(btnBase, btnVariants.primary)}>Go to login</Link>}
        />
      </div>
    );
  }

  if (!detailed.length) {
    return (
      <div className="px-4 py-20">
        <EmptyState
          testId="checkout-empty"
          icon={<ShoppingBag className="h-6 w-6" />}
          title="Your cart is empty"
          description="Add products to your cart before checking out."
          action={<Link to="/products" className={cn(btnBase, btnVariants.primary)} data-testid="continue-shopping">Continue Shopping</Link>}
        />
      </div>
    );
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (submitted.current) return; // guard against double submit
    const v = validateCheckout(form);
    setErrors(v);
    if (Object.keys(v).length) return;
    submitted.current = true;
    setSubmitting(true);
    const order = buildOrder(nextOrderId(), lines, form, new Date());
    saveLastOrder(order);
    clear();
    navigate({ to: "/success" });
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold">Checkout</h1>
      <p className="mt-1 text-sm text-muted-foreground">Demo checkout — no payment details are collected.</p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={onSubmit} noValidate aria-label="Checkout form" className="rounded-2xl border bg-card p-6" id="checkout-form">
          <h2 className="text-lg font-semibold">Delivery details</h2>
          {errorCount > 0 && (
            <div role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm font-medium text-destructive" data-testid="checkout-error">
              Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} before placing your order.
            </div>
          )}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <FormInput
                key={f.key}
                id={f.key}
                label={f.label}
                type={f.type ?? "text"}
                autoComplete={f.autoComplete}
                testId={testIdFor(f.key)}
                value={form[f.key]}
                error={errors[f.key]}
                onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                className={f.full ? "sm:col-span-2" : undefined}
              />
            ))}
          </div>
        </form>
        <OrderSummary items={detailed.map((l) => ({ productId: l.productId, name: l.product.name, quantity: l.quantity, lineTotal: l.lineTotal }))} subtotal={subtotal} shipping={shippingFor(subtotal)} testPrefix="checkout">
          <Button type="submit" form="checkout-form" className="w-full" disabled={submitting} data-testid="checkout-submit">
            {submitting ? "Placing order…" : "Place Order"}
          </Button>
        </OrderSummary>
      </div>
    </div>
  );
}
