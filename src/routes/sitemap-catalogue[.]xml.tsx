import { createFileRoute } from "@tanstack/react-router";
import { products, categories, HIDDEN_FROM_CATALOGUE } from "@/data/catalogue-data";

/**
 * Google Image sitemap for the product catalogue.
 * Emits one <url> per product with an embedded <image:image> so image search
 * can index every SKU cover shot alongside the catalogue page.
 */
export const Route = createFileRoute("/sitemap-catalogue.xml")({
  server: {
    handlers: {
      GET: async () => {
        const BASE = "https://veepeeengr.com";
        const today = new Date().toISOString().split("T")[0];
        const visible = products.filter((p) => p.categoryId !== HIDDEN_FROM_CATALOGUE);

        const escape = (s: string) =>
          s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

        const absImg = (img: string) =>
          img.startsWith("http") ? img : `${BASE}${img.startsWith("/") ? "" : "/"}${img}`;

        const urls = visible.map((p) => {
          const cat = categories.find((c) => c.id === p.categoryId);
          const catLoc = `${BASE}/catalogue?cat=${encodeURIComponent(p.categoryId)}`;
          const caption = escape(
            `${p.name}${cat ? ` — ${cat.shortName}` : ""}${p.material ? `, ${p.material}` : ""}`,
          );
          return `  <url>
    <loc>${catLoc}</loc>
    <lastmod>${today}</lastmod>
    <image:image>
      <image:loc>${absImg(p.image)}</image:loc>
      <image:title>${escape(p.name)}</image:title>
      <image:caption>${caption}</image:caption>
    </image:image>
  </url>`;
        });

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemaps-image/1.1">
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
