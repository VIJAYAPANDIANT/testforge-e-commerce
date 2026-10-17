import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingBag, X, LogOut, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const linkCls = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";
const activeCls = { className: "text-sm font-semibold text-foreground" };

export function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur" data-testid="navbar">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/products" className="flex items-center gap-2" data-testid="nav-logo" aria-label="TestForge Store home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary font-display text-sm font-bold text-secondary-foreground">TF</span>
          <span className="font-display text-lg font-semibold">TestForge<span className="text-primary">.</span>store</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/products" className={linkCls} activeProps={activeCls} data-testid="nav-products">Products</Link>
          <Link to="/cart" className={linkCls} activeProps={activeCls} data-testid="nav-cart-text">Cart</Link>
          <Link to="/checkout" className={linkCls} activeProps={activeCls} data-testid="nav-checkout">Checkout</Link>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden items-center gap-3 md:flex">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground" data-testid="nav-user">
                <User className="h-4 w-4" aria-hidden /> {user.email}
              </span>
              <button onClick={handleLogout} className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted" data-testid="logout-button">
                <LogOut className="h-4 w-4" aria-hidden /> Log out
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden rounded-md px-3 py-1.5 text-sm font-medium hover:bg-muted md:inline-block" data-testid="nav-login">Log in</Link>
          )}
          <Link
            to="/cart"
            aria-label={`Shopping Cart, ${count} items`}
            className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
            data-testid="nav-cart"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            <span
              className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground"
              data-testid="cart-count"
            >
              {count}
            </span>
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-md hover:bg-muted md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            data-testid="mobile-menu-toggle"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t bg-card px-4 py-3 md:hidden" data-testid="mobile-menu">
          <div className="flex flex-col gap-1">
            {(["/products", "/cart", "/checkout"] as const).map((to) => (
              <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium capitalize hover:bg-muted">
                {to.slice(1)}
              </Link>
            ))}
            {user ? (
              <button onClick={handleLogout} className="rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted">Log out</button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">Log in</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
