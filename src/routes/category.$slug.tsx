import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { ShopGrid } from "@/components/site/Shop";

const map: Record<string, { name: "Dhoop"; copy: string }> = {
  dhoop: {
    name: "Dhoop",
    copy: "Bombless, charcoal-free dhoop batti for your pooja rituals. Choose from Shahi Chandan, Gugal, Gulab, Kewda and Mogra.",
  },
};

export const Route = createFileRoute("/category/$slug")({
  beforeLoad: ({ params }) => {
    if (!map[params.slug]) throw notFound();
  },
  head: ({ params }) => {
    const c = map[params.slug];
    return {
      meta: c
        ? [
            { title: `${c.name} — Bhadwamata Agarbatti` },
            { name: "description", content: c.copy },
          ]
        : [],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => <div className="container-x py-20 text-center">Category not found</div>,
  errorComponent: ({ error }) => (
    <div className="container-x py-20 text-center">{error.message}</div>
  ),
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const c = map[slug];
  return (
    <>
      <PageHeader
        title={c.name}
        subtitle={c.copy}
        crumbs={[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: c.name }]}
      />
      <section className="container-x py-12 md:py-16">
        <ShopGrid initialCategory={c.name} title={c.name.toLowerCase()} />
      </section>
      <section className="bg-muted/40 py-16">
        <div className="container-x max-w-3xl">
          <h2 className="mb-3 break-words font-serif text-2xl">About {c.name}</h2>
          <p className="text-muted-foreground leading-relaxed">{c.copy}</p>
        </div>
      </section>
    </>
  );
}
