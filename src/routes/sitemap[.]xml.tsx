import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { listServices } from "@/lib/services.functions";
import { categories, HIDDEN_FROM_CATALOGUE } from "@/data/catalogue-data";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const BASE = "https://veepeeengr.com";
        const services = await listServices();
        const today = new Date().toISOString().split("T")[0];

        const visibleCategories = categories.filter(
          (c) => c.id !== HIDDEN_FROM_CATALOGUE && c.type !== "facility",
        );

        const urls = [
          { loc: `${BASE}/`, priority: "1.0", changefreq: "weekly" },
          { loc: `${BASE}/projects`, priority: "0.9", changefreq: "weekly" },
          { loc: `${BASE}/catalogue`, priority: "0.9", changefreq: "weekly" },
          { loc: `${BASE}/facilities`, priority: "0.9", changefreq: "monthly" },
          { loc: `${BASE}/architects`, priority: "0.8", changefreq: "monthly" },
          { loc: `${BASE}/procurement`, priority: "0.8", changefreq: "monthly" },
          // Category-scoped catalogue deep links — one URL per sub-catalogue
          // so search engines can index each product bucket independently.
          ...visibleCategories.map((c) => ({
            loc: `${BASE}/catalogue?cat=${encodeURIComponent(c.id)}`,
            priority: "0.7",
            changefreq: "monthly",
          })),
          ...projects.map((p) => ({
            loc: `${BASE}/projects/${p.slug}`,
            priority: "0.8",
            changefreq: "monthly",
          })),
          ...services.map((s) => ({
            loc: `${BASE}/services/${s.id}`,
            priority: "0.9",
            changefreq: "monthly",
          })),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
  )
  .join("\n")}
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
