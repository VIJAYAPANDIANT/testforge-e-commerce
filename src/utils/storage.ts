export const STORAGE_KEYS = {
  auth: "tf_auth",
  cart: "tf_cart",
  lastOrder: "tf_last_order",
  orderSeq: "tf_order_seq",
} as const;

export function readJSON(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeJSON(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — keep in-memory state only */
  }
}

export function resetDemoData() {
  Object.values(STORAGE_KEYS).forEach((k) => {
    try {
      window.localStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  });
}
