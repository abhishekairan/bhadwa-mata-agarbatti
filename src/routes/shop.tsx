import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageHeader } from "@/components/site/PageHeader";
import { ShopGrid } from "@/components/site/Shop";
import { pageHead, pageTitle } from "@/lib/seo";

export const Route = createFileRoute("/shop")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () =>
    pageHead({
      title: pageTitle("Shop"),
      description:
        "Shop Bhadwamata Shahi dhoop batti: Chandan, Gugal, Gulab, Kewda and Mogra. Bombless, charcoal-free sticks. Order on WhatsApp.",
      path: "/shop",
    }),
  component: ShopPage,
});

function ShopPage() {
  const { q } = Route.useSearch();
  return (
    <>
      <PageHeader
        title="Shop"
        subtitle="Browse our collection of Shahi dhoop batti, made for daily worship."
        crumbs={[{ label: "Home", to: "/" }, { label: "Shop" }]}
      />
      <section className="container-x py-12 md:py-16">
        <ShopGrid initialQuery={q ?? ""} />
      </section>
    </>
  );
}
