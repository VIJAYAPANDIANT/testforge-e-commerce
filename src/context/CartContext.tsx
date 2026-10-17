import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { readJSON, writeJSON, STORAGE_KEYS } from "@/utils/storage";
import { addLine, cartCount, cartSubtotal, clampQty, sanitizeCart, type CartLine } from "@/utils/cart";

type CartValue = {
  lines: CartLine[];
  ready: boolean;
  count: number;
  subtotal: number;
  add: (productId: string, qty?: number) => void;
  setQuantity: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(sanitizeCart(readJSON(STORAGE_KEYS.cart)));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writeJSON(STORAGE_KEYS.cart, lines);
  }, [lines, ready]);

  const add = useCallback((id: string, qty = 1) => setLines((l) => addLine(l, id, qty)), []);
  const setQuantity = useCallback(
    (id: string, qty: number) =>
      setLines((l) => l.map((x) => (x.productId === id ? { ...x, quantity: clampQty(qty) } : x))),
    [],
  );
  const remove = useCallback((id: string) => setLines((l) => l.filter((x) => x.productId !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, ready, count: cartCount(lines), subtotal: cartSubtotal(lines), add, setQuantity, remove, clear }),
    [lines, ready, add, setQuantity, remove, clear],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
