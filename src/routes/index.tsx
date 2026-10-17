import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/about" });
  },
  head: () => ({
    meta: [
      { title: "VJ Store" },
      { name: "description", content: "A predictable demo e-commerce store for browser test automation." },
      { property: "og:title", content: "VJ Store" },
      { property: "og:description", content: "A predictable demo e-commerce store for browser test automation." },
    ],
  }),
});
