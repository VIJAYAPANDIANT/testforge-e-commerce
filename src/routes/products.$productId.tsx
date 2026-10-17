import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, PackageX, Star } from "lucide-react";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/utils/cart";
import { useCart } from "@/context/CartContext";
import { Button, EmptyState, QuantitySelector, btnBase, btnVariants } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const p = getProductById(params.productId);
    const title = p ? `${p.name} — VJ Store` : "Product not found — VJ Store";
    const description = p ? p.description : "This product does not exist.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(p ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const product = getProductById(productId);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="px-4 py-20">
        <EmptyState
          testId="product-not-found"
          icon={<PackageX className="h-6 w-6" />}
          title="Product not found"
          description={`We couldn't find a product with ID "${productId}".`}
          action={<Link to="/products" className={cn(btnBase, btnVariants.primary)}>Back to products</Link>}
        />
      </div>
    );
  }

  const handleAdd = () => {
    add(product.id, qty);
    setAdded(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6" data-testid={`product-detail-${product.id}`}>
      <Link to="/products" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground" data-testid="back-to-products">
        <ArrowLeft className="h-4 w-4" /> All products
      </Link>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-surface">
          <img src={product.image} alt={product.name} width={816} height={816} className="aspect-square w-full object-cover" data-testid="product-image" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">{product.category}</span>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl" data-testid="product-name">{product.name}</h1>
          <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-current text-primary" aria-hidden /> {product.rating} rating
          </div>
          <p className="mt-5 text-2xl font-bold" data-testid="product-price">{formatPrice(product.price)}</p>
          <p className="mt-5 leading-relaxed text-muted-foreground" data-testid="product-description">{product.description}</p>
          <p
            className={cn("mt-5 text-sm font-semibold", product.inStock ? "text-success" : "text-destructive")}
            data-testid="product-availability"
          >
            {product.inStock ? "In stock" : "Out of stock"}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t pt-8">
            <QuantitySelector value={qty} onChange={(n) => setQty(Math.max(1, Math.min(10, n)))} idPrefix="detail" label={product.name} />
            <Button onClick={handleAdd} disabled={!product.inStock} className="flex-1 sm:flex-none sm:px-8" data-testid={`add-to-cart-${product.id}`}>
              Add to Cart
            </Button>
          </div>
          {added && (
            <div role="status" className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm" data-testid="add-to-cart-success">
              <span className="flex items-center gap-2 font-medium text-success"><Check className="h-4 w-4" /> Added to your cart</span>
              <Link to="/cart" className="font-semibold text-primary hover:underline" data-testid="view-cart">View cart</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
