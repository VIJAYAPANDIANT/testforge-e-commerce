import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
  head: () => ({
    meta: [
      { title: "TestForge Store — Demo shop for test automation" },
      { name: "description", content: "A predictable demo e-commerce store for TestForge Playwright tests." },
      { property: "og:title", content: "TestForge Store — Demo shop for test automation" },
      { property: "og:description", content: "A predictable demo e-commerce store for TestForge Playwright tests." },
    ],
  }),
});
