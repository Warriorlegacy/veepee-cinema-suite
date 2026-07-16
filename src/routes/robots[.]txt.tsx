import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = `User-agent: *\nAllow: /\n\nSitemap: https://veepeeengr.com/sitemap-index.xml\nSitemap: https://veepeeengr.com/sitemap.xml\nSitemap: https://veepeeengr.com/sitemap-catalogue.xml\nSitemap: https://veepeeengr.com/sitemap-services.xml\n`;
        return new Response(body, { headers: { "Content-Type": "text/plain" } });
      },
    },
  },
});
