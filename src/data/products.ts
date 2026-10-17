import headphones from "@/assets/products/headphones.jpg";
import smartwatch from "@/assets/products/smartwatch.jpg";
import jacket from "@/assets/products/jacket.jpg";
import lamp from "@/assets/products/lamp.jpg";
import sneakers from "@/assets/products/sneakers.jpg";
import backpack from "@/assets/products/backpack.jpg";

export type Category = "Electronics" | "Fashion" | "Home" | "Accessories";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  rating: number;
  inStock: boolean;
};

export const CATEGORIES: Category[] = ["Electronics", "Fashion", "Home", "Accessories"];

// Fixed, deterministic catalog — automated tests assert these exact names and prices.
export const PRODUCTS: Product[] = [
  {
    id: "wireless-headphones",
    name: "Wireless Headphones",
    description:
      "Over-ear wireless headphones with active noise cancellation, 30-hour battery life and plush memory-foam cushions.",
    price: 129.99,
    image: headphones,
    category: "Electronics",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "smart-watch",
    name: "Smart Watch",
    description:
      "Aluminium smart watch with heart-rate tracking, sleep insights, water resistance to 50m and a soft sport band.",
    price: 199.0,
    image: smartwatch,
    category: "Electronics",
    rating: 4.4,
    inStock: true,
  },
  {
    id: "denim-jacket",
    name: "Denim Jacket",
    description:
      "Classic dark-wash denim jacket cut from heavyweight cotton, with chest pockets and metal shank buttons.",
    price: 79.5,
    image: jacket,
    category: "Fashion",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "white-sneakers",
    name: "White Sneakers",
    description:
      "Minimal leather sneakers with a cushioned insole and durable rubber outsole. Goes with everything.",
    price: 89.0,
    image: sneakers,
    category: "Fashion",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "ceramic-lamp",
    name: "Ceramic Table Lamp",
    description:
      "Glazed ceramic table lamp with a natural linen shade and brass detail. Warm, diffused light for any room.",
    price: 64.0,
    image: lamp,
    category: "Home",
    rating: 4.3,
    inStock: true,
  },
  {
    id: "leather-backpack",
    name: "Leather Backpack",
    description:
      "Full-grain leather backpack with a padded 15-inch laptop sleeve and adjustable shoulder straps.",
    price: 149.0,
    image: backpack,
    category: "Accessories",
    rating: 4.8,
    inStock: false,
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function filterProducts(
  products: Product[],
  search: string,
  category: Category | "All",
): Product[] {
  const q = search.trim().toLowerCase();
  return products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (q === "" || p.name.toLowerCase().includes(q)),
  );
}
