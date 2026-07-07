import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { listServices } from "@/lib/services.functions";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const BASE = "https://veepeeengr.com";
        const services = await listServices();
        const urls = [
          { loc: `${BASE}/`, priority: "1.0" },
          { loc: `${BASE}/projects`, priority: "0.9" },
          ...projects.map((p) => ({ loc: `${BASE}/projects/${p.slug}`, priority: "0.8" })),
          ...services.map((s) => ({ loc: `${BASE}/services/${s.id}`, priority: "0.8" })),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join("\n")}
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
