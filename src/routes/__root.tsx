import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Layout } from "@/components/site/Layout";
import heroImg from "@/assets/hero.jpg";
import {
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  BRAND_NAME,
  DEVELOPER_NAME,
  DEVELOPER_URL,
  EMAIL,
  INSTAGRAM_URL,
  PHONE_E164,
} from "@/lib/brand";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

const SITE_DESCRIPTION =
  "Bhadwamata Agarbatti: bombless, charcoal-free dhoop batti in Shahi Chandan, Gugal, Gulab, Kewda and Mogra for daily worship and peaceful living. Made in Neemuch, Madhya Pradesh.";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  url: SITE_URL || undefined,
  logo: absoluteUrl("/icon-512.png"),
  email: EMAIL,
  telephone: PHONE_E164,
  sameAs: [INSTAGRAM_URL],
  address: {
    "@type": "PostalAddress",
    addressLocality: ADDRESS_LOCALITY,
    addressRegion: ADDRESS_REGION,
    addressCountry: "IN",
  },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND_NAME,
  url: SITE_URL || undefined,
  inLanguage: "en-IN",
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bhadwamata Agarbatti — Bombless, Charcoal-Free Dhoop Batti" },
      { name: "description", content: SITE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "dhoop batti, agarbatti, bombless dhoop, charcoal free dhoop, shahi chandan, shahi gugal, shahi gulab, shahi kewda, shahi mogra, Bhadwamata, Neemuch",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#fbf5e8" },
      { name: "author", content: BRAND_NAME },
      { name: "developer", content: `${DEVELOPER_NAME} (${DEVELOPER_URL})` },
      { name: "geo.region", content: "IN-MP" },
      { name: "geo.placename", content: ADDRESS_LOCALITY },
      { property: "og:site_name", content: BRAND_NAME },
      { property: "og:locale", content: "en_IN" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Bhadwamata Agarbatti — Bombless, Charcoal-Free Dhoop Batti" },
      { property: "og:description", content: SITE_DESCRIPTION },
      { name: "twitter:card", content: absoluteUrl(heroImg) ? "summary_large_image" : "summary" },
      ...(absoluteUrl(heroImg)
        ? [
            { property: "og:image", content: absoluteUrl(heroImg)! },
            { name: "twitter:image", content: absoluteUrl(heroImg)! },
          ]
        : []),
      { "script:ld+json": organizationLd },
      { "script:ld+json": websiteLd },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", type: "image/png", href: "/favicon-32.png", sizes: "32x32" },
      { rel: "icon", type: "image/png", href: "/icon-192.png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Outlet />
      </Layout>
    </QueryClientProvider>
  );
}
