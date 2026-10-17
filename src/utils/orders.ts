import { readJSON, writeJSON, STORAGE_KEYS } from "./storage";
import { cartSubtotal, detailLines, shippingFor, roundMoney, type CartLine } from "./cart";
import type { CheckoutForm } from "./validation";

export type OrderItem = { productId: string; name: string; price: number; quantity: number; lineTotal: number };
export type Order = {
  id: string;
  createdAt: string;
  customer: CheckoutForm;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

export function buildOrder(id: string, lines: CartLine[], customer: CheckoutForm, now: Date): Order {
  const items = detailLines(lines).map((l) => ({
    productId: l.productId,
    name: l.product.name,
    price: l.product.price,
    quantity: l.quantity,
    lineTotal: l.lineTotal,
  }));
  const subtotal = cartSubtotal(lines);
  const shipping = shippingFor(subtotal);
  return { id, createdAt: now.toISOString(), customer, items, subtotal, shipping, total: roundMoney(subtotal + shipping) };
}

/** Sequential, unique per browser: TF-100001, TF-100002, ... */
export function nextOrderId(): string {
  const prev = readJSON(STORAGE_KEYS.orderSeq);
  const seq = typeof prev === "number" && prev >= 100000 ? prev + 1 : 100001;
  writeJSON(STORAGE_KEYS.orderSeq, seq);
  return `TF-${seq}`;
}

export function saveLastOrder(o: Order) {
  writeJSON(STORAGE_KEYS.lastOrder, o);
}

export function readLastOrder(): Order | null {
  const o = readJSON(STORAGE_KEYS.lastOrder) as Order | null;
  return o && typeof o.id === "string" && Array.isArray(o.items) && o.items.length > 0 ? o : null;
}
