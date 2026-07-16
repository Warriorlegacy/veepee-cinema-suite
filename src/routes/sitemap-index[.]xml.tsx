import { createFileRoute } from "@tanstack/react-router";

/**
 * Sitemap index — points crawlers at every child sitemap so they can be
 * fetched and updated independently.
 */
export const Route = createFileRoute("/sitemap-index.xml")({
  server: {
    handlers: {
      GET: async () => {
        const BASE = "https://veepeeengr.com";
        const today = new Date().toISOString().split("T")[0];
        const children = [
          "/sitemap.xml",
          "/sitemap-catalogue.xml",
          "/sitemap-services.xml",
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${children
  .map((p) => `  <sitemap><loc>${BASE}${p}</loc><lastmod>${today}</lastmod></sitemap>`)
  .join("\n")}
</sitemapindex>`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
