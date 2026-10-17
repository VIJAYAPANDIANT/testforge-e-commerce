import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Receipt } from "lucide-react";
import { readLastOrder, type Order } from "@/utils/orders";
import { formatPrice } from "@/utils/cart";
import { EmptyState, btnBase, btnVariants } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/success")({
  head: () => ({
    meta: [
      { title: "Order confirmed — TestForge Store" },
      { name: "description", content: "Your TestForge demo order confirmation." },
      { property: "og:title", content: "Order confirmed — TestForge Store" },
      { property: "og:description", content: "Your TestForge demo order confirmation." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrder(readLastOrder());
    setReady(true);
  }, []);

  if (!ready) return <div className="py-20 text-center text-sm text-muted-foreground">Loading…</div>;

  if (!order) {
    return (
      <div className="px-4 py-20">
        <EmptyState
          testId="no-order"
          icon={<Receipt className="h-6 w-6" />}
          title="No recent order"
          description="There's no order to show yet. Place an order to see its confirmation here."
          action={<Link to="/products" className={cn(btnBase, btnVariants.primary)} data-testid="continue-shopping">Continue Shopping</Link>}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16" data-testid="order-success">
      <div className="rounded-2xl border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-success" aria-hidden />
        <h1 className="mt-4 text-2xl font-semibold">Thank you for your order!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A confirmation for order <strong className="text-foreground" data-testid="order-id">{order.id}</strong> has been recorded for {order.customer.email}.
        </p>

        <ul className="mt-8 divide-y border-y text-left text-sm" data-testid="order-items">
          {order.items.map((i) => (
            <li key={i.productId} className="flex justify-between py-3" data-testid={`order-item-${i.productId}`}>
              <span>{i.name} × {i.quantity}</span>
              <span className="font-medium tabular-nums">{formatPrice(i.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1 text-left text-sm">
          <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">{formatPrice(order.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="tabular-nums">{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</dd></div>
          <div className="flex justify-between pt-2 text-base font-semibold"><dt>Total</dt><dd className="tabular-nums" data-testid="order-total">{formatPrice(order.total)}</dd></div>
        </dl>
        <Link to="/products" className={cn(btnBase, btnVariants.primary, "mt-8 w-full")} data-testid="continue-shopping">Continue Shopping</Link>
      </div>
    </div>
  );
}
