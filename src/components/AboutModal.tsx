import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  PackageCheck,
  Info,
} from "lucide-react";
import { DEMO_USER } from "@/utils/validation";

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const copyCredentials = () => {
    navigator.clipboard.writeText(`Email: ${DEMO_USER.email} | Password: ${DEMO_USER.password}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goTo = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-6 sm:p-8" data-testid="about-modal">
        <DialogHeader className="gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white shadow-md">
              <span className="font-display text-base font-black tracking-wider">VJ</span>
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                About VJ Store
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground sm:text-sm">
                Full-featured demo e-commerce platform & browser automation testbed
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Quick Intro Banner */}
          <div className="rounded-xl border bg-gradient-to-r from-primary/10 via-indigo-500/10 to-violet-500/10 p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">Welcome to VJ Store!</p>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  VJ Store is a deterministic, high-performance web storefront designed for pair-programming,
                  e-commerce user testing, and end-to-end browser automation suites. Everything runs with pure client-side
                  state and zero external backend latency.
                </p>
              </div>
            </div>
          </div>

          {/* Demo Credentials Card */}
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Demo Account</span>
              </div>
              <button
                type="button"
                onClick={copyCredentials}
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                title="Copy demo credentials"
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
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-muted/60 p-2.5">
                <span className="text-muted-foreground block text-[11px]">Email</span>
                <span className="font-mono font-medium text-foreground">{DEMO_USER.email}</span>
              </div>
              <div className="rounded-lg bg-muted/60 p-2.5">
                <span className="text-muted-foreground block text-[11px]">Password</span>
                <span className="font-mono font-medium text-foreground">{DEMO_USER.password}</span>
              </div>
            </div>
          </div>

          {/* Core Features & Rules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {/* Catalog */}
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 font-semibold text-foreground mb-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <span>Product Catalog</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                6 stable mock products across Electronics, Fashion, Home, and Accessories.
                Includes search, category filtering, and an explicit out-of-stock item (Leather Backpack) for edge-case testing.
              </p>
            </div>

            {/* Shipping Rules */}
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 font-semibold text-foreground mb-2">
                <Truck className="h-4 w-4 text-sky-500" />
                <span>Shipping & Orders</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>$5.99</strong> flat shipping on orders below $100.
                <strong> FREE shipping</strong> on orders $100+. Quantity clamps between 1 and 10 items.
                Sequential order tracking (<code className="font-mono text-primary text-[11px]">TF-100001</code>).
              </p>
            </div>

            {/* Two Modes */}
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 font-semibold text-foreground mb-2">
                <SunMoon className="h-4 w-4 text-amber-500" />
                <span>Two Themes (Modes)</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Seamless Light Mode ☀️ and Dark Mode 🌙 switching with automatic OS preference detection
                and localStorage persistence without layout shifts.
              </p>
            </div>

            {/* Architecture */}
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 font-semibold text-foreground mb-2">
                <Code2 className="h-4 w-4 text-violet-500" />
                <span>Tech Architecture</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Powered by <strong>React 19</strong>, <strong>TanStack Start & Router</strong>,
                <strong> Vite</strong>, and <strong>Tailwind CSS v4</strong>. Every interactive element
                contains permanent <code className="font-mono text-primary text-[11px]">data-testid</code> selectors.
              </p>
            </div>
          </div>

          {/* Quick Navigation Footer inside modal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5 text-primary" />
              <span>Click anywhere outside or the X to return</span>
            </div>
            <div className="flex w-full sm:w-auto items-center gap-2">
              <button
                type="button"
                onClick={() => goTo("/products")}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                data-testid="about-browse-products"
              >
                <PackageCheck className="h-4 w-4" /> Browse Store <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
