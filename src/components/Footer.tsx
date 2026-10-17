import { Link } from "@tanstack/react-router";
import { resetDemoData } from "@/utils/storage";

export function Footer() {
  const handleReset = () => {
    resetDemoData();
    window.location.assign("/login");
  };
  return (
    <footer className="mt-16 border-t bg-card" data-testid="footer">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© 2026 VJ Store — a demo shop for browser test automation. No real payments.</p>
        <div className="flex items-center gap-5">
          <Link to="/products" className="hover:text-foreground">Shop</Link>
          <Link to="/cart" className="hover:text-foreground">Cart</Link>
          <button onClick={handleReset} className="font-medium text-primary hover:underline" data-testid="reset-demo">
            Reset demo data
          </button>
        </div>
      </div>
    </footer>
  );
}
