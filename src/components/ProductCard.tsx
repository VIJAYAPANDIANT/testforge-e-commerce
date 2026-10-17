import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/utils/cart";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui-kit";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg hover:shadow-foreground/5"
      data-testid={`product-card-${product.id}`}
      aria-labelledby={`product-name-${product.id}`}
    >
      <Link to="/products/$productId" params={{ productId: product.id }} className="block overflow-hidden bg-surface" tabIndex={-1} aria-hidden>
        <img
          src={product.image}
          alt=""
          loading="lazy"
          width={816}
          height={816}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium uppercase tracking-wide text-muted-foreground" data-testid={`product-category-${product.id}`}>
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-current text-primary" aria-hidden /> {product.rating}
          </span>
        </div>
        <h3 id={`product-name-${product.id}`} className="mt-2 text-base font-semibold">
          <Link to="/products/$productId" params={{ productId: product.id }} className="hover:text-primary" data-testid={`product-link-${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold" data-testid={`product-price-${product.id}`}>{formatPrice(product.price)}</span>
          <Button
            onClick={() => add(product.id, 1)}
            disabled={!product.inStock}
            aria-label={product.inStock ? `Add ${product.name} to Cart` : `${product.name} is out of stock`}
            data-testid={`add-to-cart-${product.id}`}
            className="px-3 py-2"
          >
            {product.inStock ? "Add to Cart" : "Out of stock"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
