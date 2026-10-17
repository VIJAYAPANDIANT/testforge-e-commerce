import { getProductById, type Product } from "@/data/products";

export type CartLine = { productId: string; quantity: number };
export type DetailedLine = CartLine & { product: Product; lineTotal: number };

export const MIN_QTY = 1;
export const MAX_QTY = 10;

export function clampQty(n: number): number {
  if (!Number.isFinite(n)) return MIN_QTY;
  return Math.min(MAX_QTY, Math.max(MIN_QTY, Math.floor(n)));
}

/** Round to cents to avoid floating point drift. */
export function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}

/** Drops unknown products and invalid quantities from untrusted (e.g. stored) data. */
export function sanitizeCart(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const out: CartLine[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const { productId, quantity } = item as Record<string, unknown>;
    if (typeof productId !== "string" || !getProductById(productId)) continue;
    if (typeof quantity !== "number" || quantity < MIN_QTY) continue;
    if (out.some((l) => l.productId === productId)) continue;
    out.push({ productId, quantity: clampQty(quantity) });
  }
  return out;
}

export function addLine(lines: CartLine[], productId: string, qty: number): CartLine[] {
  const existing = lines.find((l) => l.productId === productId);
  if (existing) {
    return lines.map((l) =>
      l.productId === productId ? { ...l, quantity: clampQty(l.quantity + qty) } : l,
    );
  }
  return [...lines, { productId, quantity: clampQty(qty) }];
}

export function detailLines(lines: CartLine[]): DetailedLine[] {
  return lines.flatMap((l) => {
    const product = getProductById(l.productId);
    return product
      ? [{ ...l, product, lineTotal: roundMoney(product.price * l.quantity) }]
      : [];
  });
}

export function cartSubtotal(lines: CartLine[]): number {
  return roundMoney(detailLines(lines).reduce((s, l) => s + l.lineTotal, 0));
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((s, l) => s + l.quantity, 0);
}

export const SHIPPING_FREE_THRESHOLD = 100;
export const SHIPPING_FEE = 5.99;

export function shippingFor(subtotal: number): number {
  return subtotal === 0 || subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_FEE;
}
