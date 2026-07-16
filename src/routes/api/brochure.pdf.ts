import { createFileRoute } from "@tanstack/react-router";
import { PDFDocument, StandardFonts, rgb, PageSizes } from "pdf-lib";
import { categories, products, facilities, HIDDEN_FROM_CATALOGUE } from "@/data/catalogue-data";

/**
 * Live server-side brochure PDF.
 *
 * GET /api/brochure.pdf
 *
 * Rebuilt from the current catalogue on every request — no static asset to
 * stale. Includes Pipeline, Fabricated, Loco product summaries and the
 * Plant & Machinery capability sheet.
 */
export const Route = createFileRoute("/api/brochure/pdf")({
  server: {
    handlers: {
      GET: async () => {
        const pdf = await buildBrochure();
        const bytes = await pdf.save();
        // pdf-lib returns Uint8Array; wrap in a fresh ArrayBuffer for Response.
        const body = new Uint8Array(bytes);
        return new Response(body, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'inline; filename="VEEPEE-Engineers-Brochure.pdf"',
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
});

/* ─── Palette ─── */
const MAGENTA = rgb(212 / 255, 20 / 255, 142 / 255);
const NEAR_BLACK = rgb(0.055, 0.055, 0.055);
const WHITE = rgb(1, 1, 1);
const MUTED = rgb(0.65, 0.65, 0.72);
const HAIRLINE = rgb(0.25, 0.25, 0.28);

/* ─── Page constants ─── */
const [PAGE_W, PAGE_H] = PageSizes.A4;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

async function buildBrochure(): Promise<PDFDocument> {
  const doc = await PDFDocument.create();
  doc.setTitle("VEEPEE Engineers — Product & Capability Brochure");
  doc.setAuthor("VEEPEE Engineers");
  doc.setSubject("Pipeline, Fabricated & Loco Products · Plant & Machinery");
  doc.setKeywords([
    "pipeline products", "fabricated products", "loco products",
    "CNC laser cutting", "fabrication", "Varanasi",
  ]);
  doc.setCreator("veepeeengr.com");

  const displayFont = await doc.embedFont(StandardFonts.HelveticaBold);
  const bodyFont = await doc.embedFont(StandardFonts.Helvetica);
  const italicFont = await doc.embedFont(StandardFonts.HelveticaOblique);

  const fonts = { display: displayFont, body: bodyFont, italic: italicFont };

  // Cover
  drawCover(doc, fonts);

  // Capability sheet
  drawCapabilities(doc, fonts);

  // Product sections
  const groups: { title: string; subtitle: string; categoryIds: string[] }[] = [
    {
      title: "Pipeline Products",
      subtitle: "Water & industrial-fluid infrastructure — coated MS pipe, penstocks, dismantling joints, tapping tees.",
      categoryIds: ["pipeline-products"],
    },
    {
      title: "Fabricated Products",
      subtitle: "Custom structural fabrication — skids, hoppers, cable trays, tank saddles, access platforms.",
      categoryIds: ["fabricated-products"],
    },
    {
      title: "Loco & Railway Products",
      subtitle: "Bogie hardware, brake gear, coach hardware, buffer housings and railway underframe sub-assemblies.",
      categoryIds: ["loco-products"],
    },
    {
      title: "Architectural & Laser-Cut",
      subtitle: "CNC laser-cut gates, railings, balustrades, façades, jaalis, signage and industrial art.",
      categoryIds: ["gates", "railings", "balustrades-staircases", "self-designing-facades", "jaali-screens", "industrial-art"],
    },
  ];

  for (const g of groups) {
    drawProductGroup(doc, fonts, g);
  }

  // Contact / CTA
  drawContact(doc, fonts);

  return doc;
}

/* ────────────────────────── Cover ────────────────────────── */
function drawCover(
  doc: PDFDocument,
  fonts: { display: any; body: any; italic: any },
) {
  const page = doc.addPage([PAGE_W, PAGE_H]);
  // Solid dark background
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: NEAR_BLACK });

  // Magenta accent bar (left edge)
  page.drawRectangle({ x: 0, y: 0, width: 6, height: PAGE_H, color: MAGENTA });

  // Small eyebrow
  page.drawText(sanitize("PRODUCT & CAPABILITY BROCHURE"), {
    x: MARGIN, y: PAGE_H - MARGIN - 24,
    size: 9, font: fonts.body, color: MAGENTA,
  });

  // Big title
  const t1 = "VEEPEE";
  const t2 = "ENGINEERS";
  page.drawText(sanitize(t1), {
    x: MARGIN, y: PAGE_H - MARGIN - 90,
    size: 64, font: fonts.display, color: WHITE,
  });
  page.drawText(sanitize(t2), {
    x: MARGIN, y: PAGE_H - MARGIN - 160,
    size: 64, font: fonts.display, color: MAGENTA,
  });

  // Tagline
  page.drawText(sanitize("Built on precision. Rooted in Varanasi."), {
    x: MARGIN, y: PAGE_H - MARGIN - 200,
    size: 14, font: fonts.italic, color: MUTED,
  });

  // Divider
  page.drawLine({
    start: { x: MARGIN, y: PAGE_H / 2 + 60 },
    end: { x: PAGE_W - MARGIN, y: PAGE_H / 2 + 60 },
    thickness: 1, color: HAIRLINE,
  });

  // What's inside
  const items = [
    "Pipeline Products — flanges, penstocks, dismantling joints, coated MS pipe",
    "Fabricated Products — skids, hoppers, tank saddles, cable trays, access platforms",
    "Loco & Railway — bogie hardware, brake gear, coach fittings, underframe sub-assemblies",
    "Architectural & Laser-Cut — gates, railings, jaalis, façades, signage",
    "Plant & Machinery — 5 kW fiber laser, CNC press brake, three-roll bender, CNC machining",
  ];
  let y = PAGE_H / 2 + 30;
  page.drawText(sanitize("Inside this brochure"), {
    x: MARGIN, y, size: 12, font: fonts.display, color: WHITE,
  });
  y -= 22;
  for (const line of items) {
    page.drawText(sanitize("•"), { x: MARGIN, y, size: 11, font: fonts.body, color: MAGENTA });
    page.drawText(sanitize(line), { x: MARGIN + 14, y, size: 10.5, font: fonts.body, color: MUTED });
    y -= 18;
  }

  // Bottom contact block
  const footerY = MARGIN + 30;
  page.drawLine({
    start: { x: MARGIN, y: footerY + 60 },
    end: { x: PAGE_W - MARGIN, y: footerY + 60 },
    thickness: 1, color: HAIRLINE,
  });
  page.drawText(sanitize("225/1 Maheshpur Industrial Estate, Varanasi 221106"), {
    x: MARGIN, y: footerY + 40, size: 10, font: fonts.body, color: WHITE,
  });
  page.drawText(sanitize("+91 91251 42400  ·  +91 79857 59501  ·  veepeeengr.com"), {
    x: MARGIN, y: footerY + 22, size: 10, font: fonts.body, color: MUTED,
  });
  page.drawText(sanitize("Since 1976 · CNC-driven · Job work welcome"), {
    x: MARGIN, y: footerY + 4, size: 9, font: fonts.italic, color: MAGENTA,
  });
}

/* ────────────────────────── Capabilities ────────────────────────── */
function drawCapabilities(
  doc: PDFDocument,
  fonts: { display: any; body: any; italic: any },
) {
  let page = doc.addPage([PAGE_W, PAGE_H]);
  let y = drawPageHeader(page, fonts, "Plant & Machinery", "Capabilities on the Maheshpur floor.");

  for (const f of facilities) {
    // Estimate card height
    const descLines = wrapText(f.description, fonts.body, 10, CONTENT_W - 24);
    const capLines = wrapText(f.capacity, fonts.body, 9.5, CONTENT_W - 24);
    const cardH = 26 + 18 + descLines.length * 13 + 10 + capLines.length * 12 + 18;

    if (y - cardH < MARGIN + 30) {
      page = doc.addPage([PAGE_W, PAGE_H]);
      y = drawPageHeader(page, fonts, "Plant & Machinery (cont.)", "");
    }

    // Card frame
    const cardTop = y;
    page.drawRectangle({
      x: MARGIN, y: cardTop - cardH,
      width: CONTENT_W, height: cardH,
      color: rgb(0.09, 0.09, 0.10),
      borderColor: HAIRLINE, borderWidth: 0.5,
    });
    // Magenta strip
    page.drawRectangle({
      x: MARGIN, y: cardTop - cardH,
      width: 3, height: cardH, color: MAGENTA,
    });

    let cy = cardTop - 20;
    page.drawText(sanitize(f.name), { x: MARGIN + 16, y: cy, size: 13, font: fonts.display, color: WHITE });
    cy -= 16;
    page.drawText(sanitize(f.spec.toUpperCase()), { x: MARGIN + 16, y: cy, size: 8, font: fonts.body, color: MAGENTA });
    cy -= 14;
    for (const line of descLines) {
      page.drawText(sanitize(line), { x: MARGIN + 16, y: cy, size: 10, font: fonts.body, color: rgb(0.85, 0.85, 0.88) });
      cy -= 13;
    }
    cy -= 4;
    page.drawText(sanitize("CAPACITY"), { x: MARGIN + 16, y: cy, size: 7.5, font: fonts.display, color: MUTED });
    cy -= 11;
    for (const line of capLines) {
      page.drawText(sanitize(line), { x: MARGIN + 16, y: cy, size: 9.5, font: fonts.body, color: rgb(0.75, 0.75, 0.80) });
      cy -= 12;
    }

    y = cardTop - cardH - 12;
  }

  drawPageFooter(page, fonts);
}

/* ────────────────────────── Product groups ────────────────────────── */
function drawProductGroup(
  doc: PDFDocument,
  fonts: { display: any; body: any; italic: any },
  group: { title: string; subtitle: string; categoryIds: string[] },
) {
  let page = doc.addPage([PAGE_W, PAGE_H]);
  let y = drawPageHeader(page, fonts, group.title, group.subtitle);

  const rows = products.filter(
    (p) => group.categoryIds.includes(p.categoryId) && p.categoryId !== HIDDEN_FROM_CATALOGUE,
  );

  if (rows.length === 0) {
    page.drawText(sanitize("Catalogue in progress — contact us for current SKUs and drawings."), {
      x: MARGIN, y, size: 10, font: fonts.italic, color: MUTED,
    });
    drawPageFooter(page, fonts);
    return;
  }

  for (const p of rows) {
    const cat = categories.find((c) => c.id === p.categoryId);
    const descLines = wrapText(p.description ?? "", fonts.body, 9.5, CONTENT_W - 24);
    const cardH = 20 + 14 + 14 + descLines.length * 12 + 18;

    if (y - cardH < MARGIN + 30) {
      drawPageFooter(page, fonts);
      page = doc.addPage([PAGE_W, PAGE_H]);
      y = drawPageHeader(page, fonts, group.title + " (cont.)", "");
    }

    const cardTop = y;
    page.drawRectangle({
      x: MARGIN, y: cardTop - cardH,
      width: CONTENT_W, height: cardH,
      color: rgb(0.09, 0.09, 0.10),
      borderColor: HAIRLINE, borderWidth: 0.5,
    });
    page.drawRectangle({
      x: MARGIN, y: cardTop - cardH,
      width: 3, height: cardH, color: MAGENTA,
    });

    let cy = cardTop - 18;
    page.drawText(sanitize(p.name), { x: MARGIN + 16, y: cy, size: 12, font: fonts.display, color: WHITE });
    cy -= 14;

    // Category · Material
    const meta = [cat?.shortName, p.material].filter(Boolean).join("  ·  ");
    if (meta) {
      page.drawText(sanitize(meta.toUpperCase()), { x: MARGIN + 16, y: cy, size: 7.5, font: fonts.body, color: MAGENTA });
    }
    // Price on the right
    if (p.priceRange) {
      const priceW = fonts.display.widthOfTextAtSize(p.priceRange, 10);
      page.drawText(p.priceRange, {
        x: MARGIN + CONTENT_W - 16 - priceW,
        y: cy, size: 10, font: fonts.display, color: WHITE,
      });
    }
    cy -= 12;

    for (const line of descLines) {
      page.drawText(sanitize(line), { x: MARGIN + 16, y: cy, size: 9.5, font: fonts.body, color: rgb(0.82, 0.82, 0.86) });
      cy -= 12;
    }

    y = cardTop - cardH - 10;
  }

  drawPageFooter(page, fonts);
}

/* ────────────────────────── Contact ────────────────────────── */
function drawContact(
  doc: PDFDocument,
  fonts: { display: any; body: any; italic: any },
) {
  const page = doc.addPage([PAGE_W, PAGE_H]);
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: NEAR_BLACK });
  page.drawRectangle({ x: 0, y: 0, width: 6, height: PAGE_H, color: MAGENTA });

  page.drawText("BUILD WITH US", {
    x: MARGIN, y: PAGE_H - MARGIN - 24,
    size: 10, font: fonts.body, color: MAGENTA,
  });
  page.drawText(sanitize("Have a drawing?"), {
    x: MARGIN, y: PAGE_H - MARGIN - 78,
    size: 44, font: fonts.display, color: WHITE,
  });
  page.drawText(sanitize("We can make it."), {
    x: MARGIN, y: PAGE_H - MARGIN - 132,
    size: 44, font: fonts.display, color: MAGENTA,
  });

  const bodyLines = wrapText(
    "Send us a DXF, STEP or PDF and we will come back with a fabrication plan and quote. From single-piece prototypes to production batches — quoted, engineered, cut, formed, machined, coated and shipped as a single accountable line.",
    fonts.body, 12, CONTENT_W,
  );
  let y = PAGE_H - MARGIN - 180;
  for (const line of bodyLines) {
    page.drawText(sanitize(line), { x: MARGIN, y, size: 12, font: fonts.body, color: MUTED });
    y -= 18;
  }

  y -= 30;
  const rows: [string, string][] = [
    ["PHONE", "+91 91251 42400  ·  +91 79857 59501"],
    ["WHATSAPP", "wa.me/919125142400"],
    ["EMAIL", "veepeeengineers@gmail.com"],
    ["WEB", "veepeeengr.com"],
    ["WORKSHOP", "225/1 Maheshpur Industrial Estate, Varanasi 221106"],
  ];
  for (const [label, value] of rows) {
    page.drawText(sanitize(label), { x: MARGIN, y, size: 8.5, font: fonts.display, color: MAGENTA });
    page.drawText(sanitize(value), { x: MARGIN + 90, y, size: 11, font: fonts.body, color: WHITE });
    y -= 22;
  }

  // Footer stamp
  page.drawLine({
    start: { x: MARGIN, y: MARGIN + 40 },
    end: { x: PAGE_W - MARGIN, y: MARGIN + 40 },
    thickness: 1, color: HAIRLINE,
  });
  page.drawText(sanitize("VEEPEE Engineers · Since 1976 · CNC-driven · Job work welcome"), {
    x: MARGIN, y: MARGIN + 22,
    size: 9, font: fonts.italic, color: MUTED,
  });
}

/* ────────────────────────── Helpers ────────────────────────── */
function drawPageHeader(
  page: ReturnType<PDFDocument["addPage"]>,
  fonts: { display: any; body: any; italic: any },
  title: string,
  subtitle: string,
): number {
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: NEAR_BLACK });
  page.drawRectangle({ x: 0, y: 0, width: 6, height: PAGE_H, color: MAGENTA });

  page.drawText(sanitize("VEEPEE ENGINEERS"), {
    x: MARGIN, y: PAGE_H - MARGIN,
    size: 8, font: fonts.display, color: MAGENTA,
  });
  page.drawText(sanitize(title.toUpperCase()), {
    x: MARGIN, y: PAGE_H - MARGIN - 32,
    size: 22, font: fonts.display, color: WHITE,
  });
  let y = PAGE_H - MARGIN - 50;
  if (subtitle) {
    const lines = wrapText(subtitle, fonts.body, 10.5, CONTENT_W);
    for (const line of lines) {
      page.drawText(sanitize(line), { x: MARGIN, y, size: 10.5, font: fonts.body, color: MUTED });
      y -= 14;
    }
  }
  y -= 8;
  page.drawLine({
    start: { x: MARGIN, y: y },
    end: { x: PAGE_W - MARGIN, y: y },
    thickness: 0.75, color: HAIRLINE,
  });
  return y - 18;
}

function drawPageFooter(
  page: ReturnType<PDFDocument["addPage"]>,
  fonts: { display: any; body: any; italic: any },
) {
  const y = MARGIN - 10;
  page.drawText(sanitize("veepeeengr.com  ·  +91 91251 42400  ·  Maheshpur Industrial Estate, Varanasi"), {
    x: MARGIN, y, size: 8, font: fonts.body, color: MUTED,
  });
}

/** Simple word-wrap for pdf-lib text drawing. */
function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const words = clean.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    const w = font.widthOfTextAtSize(sanitize(candidate), size);
    if (w <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(sanitize(current));
      current = word;
    }
  }
  if (current) lines.push(sanitize(current));
  return lines;
}

/**
 * pdf-lib's WinAnsi encoding used by StandardFonts.Helvetica cannot render
 * arbitrary Unicode (₹, — , ·, etc.). Replace with printable ASCII fallbacks
 * so the PDF renders text correctly instead of throwing at encode time.
 */
function sanitize(s: string): string {
  return s
    .replace(/₹/g, "Rs ")
    .replace(/[–—]/g, "-")
    .replace(/·/g, "-")
    .replace(/…/g, "...")
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    // strip anything still outside printable ASCII to avoid encoding errors
    .replace(/[^\x20-\x7E]/g, "");
}
