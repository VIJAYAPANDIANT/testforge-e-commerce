import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { CATEGORIES, PRODUCTS, filterProducts, type Category } from "@/data/products";
import { ProductGrid } from "@/components/ProductCard";
import { Button, EmptyState } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "VJ Store — Products" },
      { name: "description", content: "Browse electronics, fashion, home and accessories in VJ Store." },
      { property: "og:title", content: "VJ Store — Products" },
      { property: "og:description", content: "Browse electronics, fashion, home and accessories in the TestForge demo store." },
    ],
  }),
  component: ProductsPage,
});

type Filter = Category | "All";

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <label htmlFor="product-search" className="sr-only">Search products</label>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <input
        id="product-search"
        type="search"
        placeholder="Search products"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        data-testid="product-search"
      />
    </div>
  );
}

function CategoryFilter({ value, onChange }: { value: Filter; onChange: (v: Filter) => void }) {
  const options: Filter[] = ["All", ...CATEGORIES];
  return (
    <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2" data-testid="category-filter">
      {options.map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={value === c}
          onClick={() => onChange(c)}
          data-testid={`category-${c.toLowerCase()}`}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            value === c ? "border-secondary bg-secondary text-secondary-foreground" : "bg-card hover:bg-muted",
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Filter>("All");
  const results = useMemo(() => filterProducts(PRODUCTS, search, category), [search, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-6 border-b pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Shop all products</h1>
            <p className="mt-1 text-sm text-muted-foreground" data-testid="product-count" aria-live="polite">
              {results.length} {results.length === 1 ? "product" : "products"}
            </p>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      {results.length ? (
        <ProductGrid products={results} />
      ) : (
        <EmptyState
          testId="no-results"
          icon={<SearchX className="h-6 w-6" />}
          title="No products found"
          description={`Nothing matches "${search}"${category !== "All" ? ` in ${category}` : ""}. Try a different search.`}
          action={
            <Button variant="outline" onClick={() => { setSearch(""); setCategory("All"); }} data-testid="clear-filters">
              Clear filters
            </Button>
          }
        />
      )}
    </div>
  );
}
