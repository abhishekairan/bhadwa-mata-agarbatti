import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { SITE_URL } from "@/lib/seo";

const staticPaths = ["/", "/shop", "/category/dhoop", "/about", "/contact", "/faq", "/scent-finder"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = SITE_URL || new URL(request.url).origin;
        const paths = [...staticPaths, ...products.map((p) => `/product/${p.slug}`)];
        const urls = paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
