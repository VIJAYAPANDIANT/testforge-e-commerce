import { describe, expect, it } from "vitest";
import { addLine, cartCount, cartSubtotal, clampQty, sanitizeCart, shippingFor } from "@/utils/cart";
import { checkCredentials, validateCheckout } from "@/utils/validation";
import { filterProducts, PRODUCTS } from "@/data/products";

describe("store rules", () => {
  it("accepts only the demo credentials", () => {
    expect(checkCredentials("user@test.com", "password123")).toBe(true);
    expect(checkCredentials("user@test.com", "wrong")).toBe(false);
  });

  it("computes subtotal from product prices", () => {
    const lines = addLine(addLine([], "wireless-headphones", 2), "denim-jacket", 1);
    expect(cartSubtotal(lines)).toBe(339.48);
    expect(cartCount(lines)).toBe(3);
  });

  it("clamps quantity between 1 and 10", () => {
    expect(clampQty(0)).toBe(1);
    expect(clampQty(25)).toBe(10);
  });

  it("drops invalid stored cart data", () => {
    expect(sanitizeCart("garbage")).toEqual([]);
    expect(sanitizeCart([{ productId: "nope", quantity: 1 }, { productId: "smart-watch", quantity: 2 }])).toEqual([
      { productId: "smart-watch", quantity: 2 },
    ]);
  });

  it("charges $5.99 shipping under $100, free at $100+", () => {
    expect(shippingFor(64)).toBe(5.99);
    expect(shippingFor(100)).toBe(0);
  });

  it("search and category filter", () => {
    expect(filterProducts(PRODUCTS, "watch", "All").map((p) => p.id)).toEqual(["smart-watch"]);
    expect(filterProducts(PRODUCTS, "", "Fashion")).toHaveLength(2);
  });

  it("checkout requires all fields", () => {
    const e = validateCheckout({ fullName: "", email: "", phone: "", address: "", city: "", postalCode: "" });
    expect(Object.keys(e)).toHaveLength(6);
  });
});
