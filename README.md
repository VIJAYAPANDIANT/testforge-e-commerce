# TestForge E-Commerce

A demo store built as a predictable target for **TestForge** (no-code Playwright test automation). Frontend-only: mock catalog, demo login and localStorage persistence. No real payments or backend.

## Run locally
```bash
bun install
bun run dev      # http://localhost:8080
bun run build
bunx vitest run  # business-rule tests
```

## Demo credentials
- Email: `user@test.com`
- Password: `password123`

Demo authentication only — not secure, never use real passwords.

## Routes
| Route | Purpose |
| --- | --- |
| `/` | Redirects to `/login` |
| `/login` | Demo login (redirects to `/products`) |
| `/products` | Catalog with search + category filter |
| `/products/:productId` | Product details, quantity, add to cart; unknown IDs show `product-not-found` |
| `/cart` | Cart with quantity, remove, clear, subtotal |
| `/checkout` | Delivery form + summary (requires login and a non-empty cart) |
| `/success` | Confirmation for the last order; shows `no-order` if none |

## Stack
TanStack Start (React 19 + Vite, file-based routing in `src/routes`), TypeScript, Tailwind CSS v4, React Context (`src/context`), localStorage, lucide-react.

> Note: the Lovable platform requires TanStack Router instead of React Router; behavior and routes match the spec.

## Catalog (fixed)
| ID | Name | Category | Price | Stock |
| --- | --- | --- | --- | --- |
| wireless-headphones | Wireless Headphones | Electronics | $129.99 | yes |
| smart-watch | Smart Watch | Electronics | $199.00 | yes |
| denim-jacket | Denim Jacket | Fashion | $79.50 | yes |
| white-sneakers | White Sneakers | Fashion | $89.00 | yes |
| ceramic-lamp | Ceramic Table Lamp | Home | $64.00 | yes |
| leather-backpack | Leather Backpack | Accessories | $149.00 | **no** |

Shipping: $5.99 below a $100 subtotal, free at $100+. Quantity range 1–10. Order IDs are sequential per browser: `TF-100001`, `TF-100002`, …

## Stable selectors
`login-email`, `login-password`, `login-submit`, `login-error`, `toggle-password`, `product-search`, `category-{all|electronics|fashion|home|accessories}`, `product-card-{id}`, `add-to-cart-{id}`, `product-count`, `no-results`, `cart-count`, `nav-cart`, `cart-item-{id}`, `cart-item-{id}-increase|decrease|quantity`, `remove-{id}`, `clear-cart`, `cart-subtotal`, `cart-total`, `cart-empty`, `proceed-to-checkout`, `continue-shopping`, `checkout-full-name|email|phone|address|city|postal-code`, `checkout-{field}-error`, `checkout-error`, `checkout-submit`, `order-success`, `order-id`, `order-total`, `product-not-found`, `reset-demo`.

Accessible names: textboxes "Email", "Password", "Search products"; buttons "Login", "Add to Cart" (detail page) / "Add {Product} to Cart" (grid), "Proceed to Checkout", "Place Order"; link "Shopping Cart, N items"; link "Continue Shopping".

## Resetting state between tests
Click **Reset demo data** in the footer (`reset-demo`), or run `localStorage.clear()`, or use a fresh Playwright browser context. Keys: `tf_auth`, `tf_cart`, `tf_last_order`, `tf_order_seq`.

## Automation scenarios
1. Valid login → `/products`. 2. Invalid login → `login-error` "Invalid email or password". 3. Search "watch" → only `product-card-smart-watch`. 4. Category Fashion → 2 products. 5–6. Add to cart → `cart-count` increments. 7–8. Increase Headphones to 2 + Denim Jacket ×1 → `cart-subtotal` = `$339.48`. 9–10. Remove all → `cart-empty`. 11. Submit empty checkout → `checkout-error` + 6 field errors. 12. Valid checkout → `order-success`, `order-id` matches `TF-\d{6}`. 13. `/products/does-not-exist` → `product-not-found`. 14. Reload `/cart` → items persist. 15. Controlled regression (below).

## Controlled failure demo
Safe method: on a throwaway branch, edit `src/routes/success.tsx` and change `Thank you for your order!` to `Thanks!` (or change the `Place Order` button text in `src/routes/checkout.tsx`). Run the TestForge suite — the assertion fails and a screenshot is captured. Revert by discarding the branch (`git checkout main`). Never merge it.

## Deployment
Publish from Lovable (Publish button) for a public URL that remote Playwright workers can reach. The app is server-rendered, so deep links like `/cart` work without SPA fallback config. Vercel is not the default target of this stack; use the Lovable-hosted URL or a custom domain.
