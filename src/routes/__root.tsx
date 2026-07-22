import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import logo from "../assets/veepee-logo.png.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { trackPageView } from "../lib/analytics";

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
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

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
      { name: "theme-color", content: "#0A0A0A" },
      { title: "Metal Fabrication & Laser Cutting in Varanasi | VEEPEE Engineers" },
      {
        name: "description",
        content:
          "VEEPEE Engineers — #1 metal fabricator in Varanasi since 1976. Fiber laser cutting, CNC fabrication, custom steel gates, jaali screens, railings & architectural metalwork. Get a free quote: +91-9125142400.",
      },
      { name: "author", content: "VEEPEE Engineers" },
      {
        name: "keywords",
        content: [
          "metal fabricator Varanasi",
          "laser cutting Varanasi",
          "CNC fabrication Varanasi",
          "steel fabrication Varanasi",
          "metal fabrication Varanasi",
          "fiber laser cutting UP",
          "jaali screen manufacturer Varanasi",
          "custom steel gate Varanasi",
          "steel railing manufacturer Varanasi",
          "architectural metalwork Varanasi",
          "hot dip galvanizing Varanasi",
          "industrial manufacturing Varanasi",
          "metal fabrication near me Varanasi",
          "laser cutting near me Varanasi",
          "CNC cutting Varanasi",
          "metal works Varanasi",
          "sheet metal fabrication Varanasi",
          "steel structure fabrication Varanasi",
          "pipe repair clamp manufacturer Varanasi",
          "dismantling joint manufacturer Varanasi",
          "coupling manufacturer Varanasi",
          "tubewell fitting manufacturer Varanasi",
          "pooja mandir panel Varanasi",
          "shadow art laser cut Varanasi",
          "decorative metal panel Varanasi",
          "mirror frame steel Varanasi",
          "metal fabrication Uttar Pradesh",
          "laser cutting UP",
          "fabrication Maheshpur industrial estate Varanasi",
          "VEEPEE Engineers Varanasi",
          "veepeeengr.com",
          "best metal fabricator Varanasi",
          "top steel fabricator Varanasi",
          "precision engineering Varanasi",
          "CNC fabrication Uttar Pradesh",
          "metal works Eastern India",
          "steel gate manufacturer UP",
          "jaali manufacturer UP",
          "laser cut metal panels India",
          "UDYAM registered metal fabricator",
          "GST registered fabrication Varanasi",
          "architectural metal works India",
          "fabrication workshop Varanasi",
          "industrial fabrication Varanasi",
          "laser cutting Prayagraj",
          "laser cutting Mirzapur",
          "laser cutting Jaunpur",
          "steel fabrication Banaras",
          "metal fabrication Ghazipur",
        ].join(", "),
      },
      // Open Graph
      { property: "og:site_name", content: "VEEPEE Engineers" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      {
        property: "og:title",
        content: "Metal Fabrication & Laser Cutting in Varanasi | VEEPEE Engineers",
      },
      {
        property: "og:description",
        content:
          "VEEPEE Engineers — #1 metal fabricator in Varanasi since 1976. Fiber laser cutting, CNC fabrication, custom steel gates, jaali screens, railings & architectural metalwork. Get a free quote: +91-9125142400.",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/z9pHpNWd9MUTo6M3fEIu8Itwhu83/social-images/social-1780585178191-ChatGPT_Image_Jun_4,_2026,_05_07_05_PM.webp",
      },
      { property: "og:url", content: "https://veepeeengr.com" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Metal Fabrication & Laser Cutting in Varanasi | VEEPEE Engineers",
      },
      {
        name: "twitter:description",
        content:
          "VEEPEE Engineers — #1 metal fabricator in Varanasi since 1976. Fiber laser cutting, CNC fabrication, custom steel gates, jaali screens, railings & architectural metalwork. Get a free quote: +91-9125142400.",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/z9pHpNWd9MUTo6M3fEIu8Itwhu83/social-images/social-1780585178191-ChatGPT_Image_Jun_4,_2026,_05_07_05_PM.webp",
      },
      // Robots
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      // Geographic meta tags
      { name: "geo.region", content: "IN-UP" },
      { name: "geo.placename", content: "Varanasi, Uttar Pradesh, India" },
      { name: "geo.position", content: "25.3560;82.9739" },
      { name: "ICBM", content: "25.3560, 82.9739" },
      // Dublin Core
      { name: "DC.title", content: "VEEPEE Engineers — Metal Fabrication & Laser Cutting, Varanasi" },
      {
        name: "DC.description",
        content:
          "Metal fabrication, fiber laser cutting, CNC fabrication, architectural metalwork in Varanasi, Uttar Pradesh, India since 1976.",
      },
      { name: "DC.subject", content: "Metal Fabrication, Laser Cutting, CNC, Varanasi, India" },
      { name: "DC.language", content: "en" },
      // Misc
      { name: "format-detection", content: "telephone=yes" },
      { name: "rating", content: "general" },
      { name: "google-site-verification", content: "e3FLQs9U1GLu_HhiFvzBJNB-zZLy3fF95icx3guCMBM" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/__l5e/assets-v1/904ec24b-fad7-4552-b9f2-2e9f5305cd50/veepee-logo.png" },
      { rel: "apple-touch-icon", href: logo.url },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "ManufacturingBusiness"],
          "@id": "https://veepeeengr.com/#business",
          name: "VEEPEE Engineers",
          alternateName: ["Veepee Engineers", "VEEPEE Engr", "veepeeengr"],
          url: "https://veepeeengr.com",
          logo: {
            "@type": "ImageObject",
            url: logo.url,
          },
          image:
            "https://storage.googleapis.com/gpt-engineer-file-uploads/z9pHpNWd9MUTo6M3fEIu8Itwhu83/social-images/social-1780585178191-ChatGPT_Image_Jun_4,_2026,_05_07_05_PM.webp",
          description:
            "VEEPEE Engineers is a trusted metal fabrication and laser cutting company in Varanasi, Uttar Pradesh, India. Established in 1976, we offer fiber laser cutting, CNC fabrication, custom steel gates, jaali screens, railings, hot-dip galvanizing, and architectural metalwork across Eastern India.",
          foundingDate: "1976",
          slogan: "Precision · Performance · Progress",
          address: {
            "@type": "PostalAddress",
            streetAddress: "225/1 Maheshpur Industrial Estate",
            addressLocality: "Varanasi",
            addressRegion: "Uttar Pradesh",
            postalCode: "221106",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 25.3560,
            longitude: 82.9739,
          },
          hasMap: "https://www.google.com/maps/place/VEEPEE+Engineers",
          telephone: "+91-9125142400",
          email: "veepeeengr@gmail.com",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "09:00",
              closes: "19:00",
            },
          ],
          priceRange: "₹₹",
          currenciesAccepted: "INR",
          paymentAccepted: "Cash, Bank Transfer, UPI",
          areaServed: [
            { "@type": "City", name: "Varanasi" },
            { "@type": "City", name: "Prayagraj" },
            { "@type": "City", name: "Mirzapur" },
            { "@type": "City", name: "Jaunpur" },
            { "@type": "City", name: "Ghazipur" },
            { "@type": "City", name: "Chandauli" },
            { "@type": "City", name: "Bhadohi" },
            { "@type": "City", name: "Lucknow" },
            { "@type": "State", name: "Uttar Pradesh" },
            { "@type": "Country", name: "India" },
          ],
          knowsAbout: [
            "Fiber Laser Cutting",
            "CNC Fabrication",
            "Metal Fabrication",
            "Steel Fabrication",
            "Architectural Metalwork",
            "Hot Dip Galvanizing",
            "Jaali Screens",
            "Steel Gates",
            "Steel Railings",
            "Industrial Manufacturing",
            "Pipe Repair Clamp",
            "Dismantling Joints",
            "Tubewell Fittings",
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.7",
            reviewCount: "93",
            bestRating: "5",
            worstRating: "1",
          },
          sameAs: [
            "https://www.indiamart.com/veepee-engineers",
            "https://www.justdial.com/Varanasi/Veepee-Engineers-In-Maheshpur/0542PX542-X542-180710114836-N9F8_BZDET",
            "https://www.google.com/maps/place/Veepee+Engineers",
            "https://www.facebook.com/profile.php?id=61591677786014",
            "https://www.instagram.com/veepeeengrs/",
            "https://www.linkedin.com/company/veepee-engineers/",
          ],
          identifier: [
            { "@type": "PropertyValue", name: "GSTIN", value: "09ABTPJ5945P1ZK" },
            { "@type": "PropertyValue", name: "UDYAM", value: "UDYAM-UP-75-0001103" },
          ],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+91-9125142400",
              contactType: "sales",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"],
            },
            {
              "@type": "ContactPoint",
              telephone: "+91-7985759501",
              contactType: "customer service",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
  const router = useRouter();

  useEffect(() => {
    trackPageView();
    const unsub = router.subscribe("onResolved", () => trackPageView());
    return () => unsub();
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
