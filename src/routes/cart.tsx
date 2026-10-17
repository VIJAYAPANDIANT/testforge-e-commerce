import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { detailLines, formatPrice, shippingFor, type DetailedLine } from "@/utils/cart";
import { Button, EmptyState, QuantitySelector, btnBase, btnVariants } from "@/components/ui-kit";
import { OrderSummary } from "@/components/OrderSummary";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "VJ Store — Shopping Cart" },
      { name: "description", content: "Review the items in your VJ Store cart." },
      { property: "og:title", content: "VJ Store — Shopping Cart" },
      { property: "og:description", content: "Review the items in your TestForge demo cart." },
    ],
  }),
  component: CartPage,
});

function CartItem({ line }: { line: DetailedLine }) {
  const { setQuantity, remove } = useCart();
  const { product } = line;
  return (
    <li className="flex gap-4 py-5" data-testid={`cart-item-${product.id}`}>
      <img src={product.image} alt="" width={96} height={96} loading="lazy" className="h-24 w-24 shrink-0 rounded-xl border bg-surface object-cover" />
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/products/$productId" params={{ productId: product.id }} className="font-semibold hover:text-primary" data-testid={`cart-item-name-${product.id}`}>
            {product.name}
          </Link>
          <p className="text-sm text-muted-foreground" data-testid={`cart-item-price-${product.id}`}>{formatPrice(product.price)} each</p>
        </div>
        <div className="flex items-center gap-4">
          <QuantitySelector value={line.quantity} onChange={(n) => setQuantity(product.id, n)} idPrefix={`cart-item-${product.id}`} label={product.name} />
          <span className="w-20 text-right font-semibold tabular-nums" data-testid={`cart-item-total-${product.id}`}>{formatPrice(line.lineTotal)}</span>
          <button
            onClick={() => remove(product.id)}
            aria-label={`Remove ${product.name} from cart`}
            className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            data-testid={`remove-${product.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

function CartPage() {
  const { lines, ready, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const detailed = detailLines(lines);

  if (!ready) return <div className="mx-auto max-w-6xl px-4 py-20 text-center text-sm text-muted-foreground" data-testid="cart-loading">Loading cart…</div>;

  if (!detailed.length) {
    return (
      <div className="px-4 py-20">
        <EmptyState
          testId="cart-empty"
          icon={<ShoppingBag className="h-6 w-6" />}
          title="Your cart is empty"
          description="Browse the catalog and add something you like."
          action={<Link to="/products" className={cn(btnBase, btnVariants.primary)} data-testid="continue-shopping">Continue Shopping</Link>}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-semibold">Shopping cart</h1>
        <Button variant="ghost" onClick={clear} className="text-destructive" data-testid="clear-cart">Clear cart</Button>
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y rounded-2xl border bg-card px-5" data-testid="cart-items">
          {detailed.map((l) => <CartItem key={l.productId} line={l} />)}
        </ul>
        <OrderSummary subtotal={subtotal} shipping={shippingFor(subtotal)} testPrefix="cart">
          <Button className="w-full" onClick={() => navigate({ to: "/checkout" })} data-testid="proceed-to-checkout">Proceed to Checkout</Button>
          <Link to="/products" className={cn(btnBase, btnVariants.outline, "w-full")} data-testid="continue-shopping">Continue Shopping</Link>
        </OrderSummary>
      </div>
    </div>
  );
}
