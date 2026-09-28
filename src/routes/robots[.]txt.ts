import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = SITE_URL || new URL(request.url).origin;
        const body = `User-agent: *\nAllow: /\nDisallow: /cart\nDisallow: /checkout\n\nSitemap: ${origin}/sitemap.xml\n`;
        return new Response(body, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
