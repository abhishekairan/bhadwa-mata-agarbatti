import { BRAND_NAME } from "./brand";

// Public origin of the deployed site, e.g. https://www.example.com. Set VITE_SITE_URL at build time.
// Canonical, og:url and og:image need an absolute URL, so they are left out while it is unset.
export const SITE_URL = String(import.meta.env.VITE_SITE_URL ?? "")
  .trim()
  .replace(/\/+$/, "");

export const absoluteUrl = (path: string) => (SITE_URL ? `${SITE_URL}${path}` : undefined);

interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}

export const pageTitle = (name: string) => `${name} — ${BRAND_NAME}`;

export function pageHead({ title, description, path, image, noindex }: PageSeo) {
  const url = absoluteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : undefined;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(url ? [{ property: "og:url", content: url }] : []),
      ...(imageUrl
        ? [
            { property: "og:image", content: imageUrl },
            { name: "twitter:image", content: imageUrl },
          ]
        : []),
      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: url ? [{ rel: "canonical", href: url }] : [],
  };
}
