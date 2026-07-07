import { createFileRoute } from "@tanstack/react-router";
import { listServices } from "@/lib/services.functions";

export const Route = createFileRoute("/sitemap-services.xml")({
  server: {
    handlers: {
      GET: async () => {
        const BASE = "https://veepeeengr.com";
        const services = await listServices();
        const urls = services.map(
          (s) =>
            `  <url><loc>${BASE}/services/${s.id}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
        );
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
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
