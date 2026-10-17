# 🛍️ VJ Store

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.2-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.170-FF4154?logo=react&logoColor=white)](https://tanstack.com/router)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-729B1B?logo=vitest&logoColor=white)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**VJ Store** is a modern, responsive, deterministic e-commerce storefront designed for end-to-end browser automation suites (**TestForge**, Playwright, Cypress, Selenium) and full-flow shopping simulation.

Engineered with **React 19**, **TanStack Start & Router**, and **Tailwind CSS v4**, the store features client-side deterministic state, two theme modes (Light & Dark), full keyboard accessibility, stable test selectors, and zero external backend latency.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **pnpm** (recommended), **npm**, or **bun**

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/VIJAYAPANDIANT/testforge-e-commerce.git
cd testforge-e-commerce

# Install dependencies
pnpm install
# or: npm install
```

### 2. Run Locally
```bash
# Start development server (http://localhost:8080)
pnpm run dev
# or: npm run dev
```

### 3. Build & Test
```bash
# Run unit & business-rule tests
pnpm test
# or: npm test

# Type-check
pnpm exec tsc --noEmit

# Production build
pnpm run build
```

---

## 🔑 Demo Account Credentials

Use the following mock account to log in and test checkout workflows:

| Field | Value | Notes |
| :--- | :--- | :--- |
| **Email** | `user@test.com` | Stored in `tf_auth` |
| **Password** | `password123` | Deterministic verification |

> [!NOTE]
> Demo authentication only — client-side validation for automated test consistency. Never use real personal passwords.

---

## ✨ Features

- 🌓 **Two Theme Modes**: Instant Light Mode ☀️ and Dark Mode 🌙 switching with system OS preference detection, zero-flicker SSR head script, and persistent storage (`tf_theme`).
- ℹ️ **Dedicated In-Page About Hub**: Full-width landing view showcasing credentials, catalog rules, architecture, and 1-click credential copying.
- 🛍️ **Predictable Product Catalog**: 6 fixed products across 4 categories (Electronics, Fashion, Home, Accessories), with live search and category filtering.
- 📦 **Edge-Case Inventory Simulation**: Deliberate out-of-stock product (*Leather Backpack*) with disabled buttons and visual stock tags.
- 🛒 **Full Cart Engine**: LocalStorage persistence (`tf_cart`), item quantity clamp (1–10), item removal, and subtotal calculation.
- 🚚 **Dynamic Shipping Rules**:
  - Orders under **$100.00**: Flat **$5.99** shipping fee.
  - Orders **$100.00+**: **FREE** shipping.
- 📋 **Validated Checkout**: Complete delivery address form with instant field-level validation and error alerts.
- 🧾 **Sequential Receipt IDs**: Generates predictable, sequential confirmation numbers per browser session (`TF-100001`, `TF-100002`, ...).
- 🔄 **One-Click Demo Reset**: A dedicated `Reset demo data` action in the footer resets all cart, auth, and order sequence state back to clean baseline.

---

## 🗺️ Application Routes

| Route | View Purpose | Details |
| :--- | :--- | :--- |
| **`/`** | Root Entry | Redirects to `/about` on first load |
| **`/about`** | About VJ Store | Full overview, catalog summary, rules & demo credentials |
| **`/login`** | Demo Authentication | Login form with credential helpers (redirects to `/products`) |
| **`/products`** | Product Catalog | Grid with live keyword search and category filter pills |
| **`/products/:productId`** | Product Details | Detailed specs, stock indicator, quantity selector, add to cart |
| **`/cart`** | Shopping Cart | Line items, quantity increments/decrements, removal & subtotal |
| **`/checkout`** | Delivery Form | 6-field address validation & order summary (requires login & cart) |
| **`/success`** | Confirmation | Receipt display with sequential order ID (`TF-100001`) |

---

## 📦 Fixed Product Catalog

The catalog is purposefully deterministic to keep automated regression tests stable:

| Product ID | Name | Category | Price | In Stock |
| :--- | :--- | :--- | :---: | :---: |
| `wireless-headphones` | Wireless Headphones | Electronics | **$129.99** | ✅ Yes |
| `smart-watch` | Smart Watch | Electronics | **$199.00** | ✅ Yes |
| `denim-jacket` | Denim Jacket | Fashion | **$79.50** | ✅ Yes |
| `white-sneakers` | White Sneakers | Fashion | **$89.00** | ✅ Yes |
| `ceramic-lamp` | Ceramic Table Lamp | Home | **$64.00** | ✅ Yes |
| `leather-backpack` | Leather Backpack | Accessories | **$149.00** | ❌ **No (Out of Stock)** |

---

## 🛠️ Tech Stack & Architecture

- **UI Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [TanStack Start](https://tanstack.com/start) & [TanStack Router](https://tanstack.com/router) (file-based routing in `src/routes`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with OKLCH CSS variables & theme tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (`src/context/` — isolated `AuthContext`, `CartContext`, and `ThemeContext`)
- **Persistence**: Browser `localStorage` (`tf_auth`, `tf_cart`, `tf_last_order`, `tf_order_seq`, `tf_theme`)
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

---

## 🧪 Test Automation Guide

VJ Store is engineered from the ground up for reliable, non-flaky test automation.

### Stable Selectors (`data-testid`)
Every interactive and assertable element maintains a fixed `data-testid` attribute:

```text
Authentication:
  login-email, login-password, login-submit, login-error, toggle-password, demo-credentials

Navigation & Shell:
  navbar, nav-logo, nav-about, nav-products, nav-cart, nav-cart-text, nav-checkout,
  nav-user, logout-button, theme-toggle, mobile-menu-toggle, mobile-menu, footer, reset-demo

Catalog & Products:
  product-search, category-all, category-electronics, category-fashion, category-home,
  category-accessories, product-count, product-card-{id}, add-to-cart-{id}, no-results,
  product-not-found

Cart:
  cart-count, cart-item-{id}, cart-item-{id}-increase, cart-item-{id}-decrease,
  cart-item-{id}-quantity, remove-{id}, clear-cart, cart-subtotal, cart-total,
  cart-empty, proceed-to-checkout, continue-shopping

Checkout:
  checkout-full-name, checkout-email, checkout-phone, checkout-address,
  checkout-city, checkout-postal-code, checkout-submit, checkout-error,
  checkout-{field}-error

Success:
  order-success, order-id, order-total
```

### Automation Scenarios
1. **Valid Login**: `user@test.com` + `password123` → navigates to `/products`.
2. **Invalid Login**: Wrong credentials → displays `login-error` alert.
3. **Product Search**: Searching `"watch"` filters down strictly to `product-card-smart-watch`.
4. **Category Filtering**: Selecting `"Fashion"` displays exactly 2 products (*Denim Jacket* & *White Sneakers*).
5. **Add to Cart**: Clicking add-to-cart updates `cart-count` badge in the header.
6. **Price Math**: 2× Headphones ($259.98) + 1× Denim Jacket ($79.50) = Subtotal `$339.48` with Free Shipping ($0.00).
7. **Empty Cart**: Removing all items displays `cart-empty` empty state.
8. **Checkout Validation**: Submitting an empty delivery form highlights all 6 field errors and `checkout-error`.
9. **Order Completion**: Valid checkout submission displays `order-success` with sequential ID matching `TF-\d{6}`.
10. **State Persistence**: Cart items survive page reload via `localStorage`.

---

## 📁 Project Structure

```text
c:/Testforge E-Commerce/
├── public/
│   ├── favicon.ico         # Multi-size brand favicon
│   ├── favicon.svg         # Bold high-resolution vector icon
│   └── robots.txt
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Radix UI primitives (Dialog, etc.)
│   │   ├── Footer.tsx      # Global footer with demo reset trigger
│   │   ├── Navbar.tsx      # Navigation, logo, cart counter & theme toggle
│   │   ├── OrderSummary.tsx# Cart & checkout pricing calculations
│   │   ├── ProductCard.tsx # Catalog grid card with stock indicators
│   │   └── ui-kit.tsx      # FormInput, Button, QuantitySelector
│   ├── context/            # Shared state providers
│   │   ├── AuthContext.tsx # Demo authentication state
│   │   ├── CartContext.tsx # Shopping cart line items & actions
│   │   └── ThemeContext.tsx# Light/Dark mode provider with persistence
│   ├── data/
│   │   └── products.ts     # Fixed 6-product catalog & category types
│   ├── routes/             # TanStack Start file-based routes
│   │   ├── __root.tsx      # Root layout, meta head tags & HTML shell
│   │   ├── index.tsx       # Root entry redirect to /about
│   │   ├── about.tsx       # In-page About VJ Store hub
│   │   ├── login.tsx       # Authentication view
│   │   ├── products.index.tsx # Catalog browsing & search
│   │   ├── products.$productId.tsx # Product details
│   │   ├── cart.tsx        # Shopping cart view
│   │   ├── checkout.tsx    # Delivery address form
│   │   └── success.tsx     # Order confirmation screen
│   ├── test/               # Vitest suite
│   │   ├── app-routing.test.tsx # Route validation tests
│   │   └── store-rules.test.ts  # Pricing, shipping & validation rule tests
│   ├── utils/              # Pure business logic helpers
│   │   ├── cart.ts         # Math: totals, shipping tiers, quantity clamps
│   │   ├── orders.ts       # Sequential order ID generator
│   │   ├── storage.ts      # Safe typed localStorage helpers
│   │   └── validation.ts   # Form & credential validators
│   └── styles.css          # Tailwind CSS v4 setup & dark mode OKLCH variables
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Built for testing and automated evaluation.
