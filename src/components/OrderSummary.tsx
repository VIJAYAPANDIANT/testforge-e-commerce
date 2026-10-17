import type { ReactNode } from "react";
import { formatPrice } from "@/utils/cart";

export function OrderSummary({
  items,
  subtotal,
  shipping,
  children,
  testPrefix,
}: {
  items?: { productId: string; name: string; quantity: number; lineTotal: number }[];
  subtotal: number;
  shipping: number;
  children?: ReactNode;
  testPrefix: "cart" | "checkout";
}) {
  return (
    <aside className="rounded-2xl border bg-card p-6" aria-label="Order summary" data-testid={`${testPrefix}-summary`}>
      <h2 className="text-lg font-semibold">Order summary</h2>
      {items && (
        <ul className="mt-4 space-y-2 border-b pb-4 text-sm">
          {items.map((i) => (
            <li key={i.productId} className="flex justify-between gap-3" data-testid={`${testPrefix}-summary-item-${i.productId}`}>
              <span className="text-muted-foreground">{i.name} × {i.quantity}</span>
              <span className="font-medium tabular-nums">{formatPrice(i.lineTotal)}</span>
            </li>
          ))}
        </ul>
      )}
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium tabular-nums" data-testid={`${testPrefix}-subtotal`}>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="font-medium tabular-nums" data-testid={`${testPrefix}-shipping`}>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t pt-3 text-base">
          <dt className="font-semibold">Total</dt>
          <dd className="font-bold tabular-nums" data-testid={`${testPrefix}-total`}>{formatPrice(subtotal + shipping)}</dd>
        </div>
      </dl>
      {shipping > 0 && <p className="mt-2 text-xs text-muted-foreground">Free shipping on orders of $100 or more.</p>}
      {children && <div className="mt-6 space-y-3">{children}</div>}
    </aside>
  );
}
