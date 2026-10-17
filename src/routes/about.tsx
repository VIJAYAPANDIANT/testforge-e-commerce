import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Truck,
  SunMoon,
  Code2,
  Copy,
  Check,
  ArrowRight,
  Package,
  Layers,
  RotateCcw,
} from "lucide-react";
import { DEMO_USER } from "@/utils/validation";
import { PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VJ Store" },
      { name: "description", content: "Everything about VJ Store — demo credentials, product catalog, shipping rules, and testing guide." },
      { property: "og:title", content: "About — VJ Store" },
      { property: "og:description", content: "Everything about VJ Store — demo credentials, product catalog, shipping rules, and testing guide." },
    ],
  }),
  component: AboutPage,
});

export function AboutPage() {
  const [copied, setCopied] = useState(false);

  const copyCredentials = () => {
    navigator.clipboard.writeText(`Email: ${DEMO_USER.email} | Password: ${DEMO_USER.password}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6" data-testid="about-page">
      {/* Header section matching products page layout */}
      <div className="mb-8 flex flex-col gap-6 border-b pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Welcome to VJ Store
              </span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              About VJ Store
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything about this website — credentials, shopping rules, catalog & features
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              data-testid="about-shop-now"
            >
              <ShoppingBag className="h-4 w-4" /> Shop products <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full border bg-secondary text-secondary-foreground px-3.5 py-1.5">
            Overview
          </span>
          <span className="rounded-full border bg-card px-3.5 py-1.5 text-muted-foreground">
            Demo Account
          </span>
          <span className="rounded-full border bg-card px-3.5 py-1.5 text-muted-foreground">
            6 Products
          </span>
          <span className="rounded-full border bg-card px-3.5 py-1.5 text-muted-foreground">
            Free Shipping @ $100
          </span>
          <span className="rounded-full border bg-card px-3.5 py-1.5 text-muted-foreground">
            Two Theme Modes
          </span>
          <span className="rounded-full border bg-card px-3.5 py-1.5 text-muted-foreground">
            Pure Frontend
          </span>
        </div>
      </div>

      {/* Grid of Section Cards matching the product card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Demo Account */}
        <div className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <button
                type="button"
                onClick={copyCredentials}
                className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                title="Copy demo credentials"
                data-testid="copy-credentials-btn"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy Login
                  </>
                )}
              </button>
            </div>
            <h2 className="text-lg font-semibold text-foreground">Demo Credentials</h2>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Sign in with this demo user to experience full checkout and account features.
            </p>
            <div className="mt-4 space-y-2 text-xs">
              <div className="rounded-lg bg-muted/60 p-2.5">
                <span className="text-[11px] text-muted-foreground block">Email</span>
                <span className="font-mono font-medium text-foreground">{DEMO_USER.email}</span>
              </div>
              <div className="rounded-lg bg-muted/60 p-2.5">
                <span className="text-[11px] text-muted-foreground block">Password</span>
                <span className="font-mono font-medium text-foreground">{DEMO_USER.password}</span>
              </div>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              Go to Login page <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Card 2: Fixed Catalog */}
        <div className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
              <Package className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Product Catalog</h2>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              6 fixed products across Electronics, Fashion, Home, and Accessories.
            </p>
            <div className="mt-4 space-y-1.5">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="flex items-center justify-between text-xs py-1 border-b border-border/50 last:border-0">
                  <span className="text-foreground truncate max-w-[170px]">{p.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">${p.price.toFixed(2)}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${p.inStock ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-destructive/10 text-destructive"}`}>
                      {p.inStock ? "In stock" : "Out"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 pt-4 border-t">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              Explore all products <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Shipping & Ordering Rules */}
        <div className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 mb-4">
              <Truck className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Shipping & Orders</h2>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Built-in business logic for deterministic cart totals and delivery verification.
            </p>
            <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">•</span>
                <span><strong>$5.99</strong> flat shipping on orders below $100 subtotal.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-500">•</span>
                <span><strong>FREE shipping</strong> on all orders of $100 or higher.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">•</span>
                <span>Quantity clamped strictly between <strong>1 and 10</strong> items.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">•</span>
                <span>Sequential receipt IDs: <code className="font-mono text-foreground font-semibold">TF-100001</code>, <code className="font-mono text-foreground font-semibold">TF-100002</code>...</span>
              </li>
            </ul>
          </div>
          <div className="mt-5 pt-4 border-t">
            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              View your Cart <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Card 4: Two Theme Modes */}
        <div className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
              <SunMoon className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Two Theme Modes</h2>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Effortlessly switch between Light and Dark mode using the Sun / Moon button in the header.
            </p>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <p>• <strong>Automatic Detection</strong>: Respects your operating system's color scheme by default.</p>
              <p>• <strong>Persistence</strong>: Stores your preferred theme in <code className="font-mono text-foreground">localStorage</code>.</p>
              <p>• <strong>Zero Flicker</strong>: Pre-renders with instantaneous head CSS scripts.</p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t">
            <span className="text-xs text-muted-foreground">Click the Sun/Moon icon in the navbar to toggle</span>
          </div>
        </div>

        {/* Card 5: Architecture */}
        <div className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-4">
              <Code2 className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Tech Architecture</h2>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Modern frontend stack engineered for deterministic performance.
            </p>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <p>• <strong>React 19 & TypeScript</strong> for state and type safety.</p>
              <p>• <strong>TanStack Start & Router</strong> for file-based SSR & client routing.</p>
              <p>• <strong>Tailwind CSS v4</strong> for design tokens and dark mode.</p>
              <p>• <strong>Vitest</strong> for business rules & routing regression testing.</p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t">
            <span className="text-xs text-muted-foreground">Frontend-only: 0 external API dependencies</span>
          </div>
        </div>

        {/* Card 6: Automation & Selectors */}
        <div className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 mb-4">
              <Layers className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Automation Ready</h2>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Target application for TestForge no-code Playwright automation suites.
            </p>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <p>• <strong>Stable Selectors</strong>: Permanent <code className="font-mono text-primary text-[11px]">data-testid</code> attributes on every button, input, and card.</p>
              <p>• <strong>Deterministic State</strong>: Mock catalog in memory, clean isolated contexts.</p>
              <p>• <strong>Demo Reset</strong>: One-click "Reset demo data" in the footer resets all state back to baseline.</p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t">
            <span className="text-xs text-muted-foreground">Compatible with all Playwright / Cypress / Selenium suites</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-10 rounded-2xl border bg-gradient-to-r from-primary/10 via-indigo-500/10 to-violet-500/10 p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Ready to test or shop?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore the product catalog, test adding items to cart, and verify checkout flows.
          </p>
        </div>
        <div className="mt-5 sm:mt-0 flex flex-wrap justify-center sm:justify-start gap-3">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag className="h-4 w-4" /> Browse Catalog
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 rounded-lg border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Log in to Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
