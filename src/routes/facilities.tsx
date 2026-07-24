import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Factory, Phone, Cog,
  Zap, Layers, Ruler, Wrench, Flame, ShieldCheck, Sparkles, GitCommitHorizontal,
  Gauge, Beaker, CircleDot,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { LogoWatermark } from "@/components/ui/logo-watermark";
import { facilities } from "@/data/catalogue-data";

/* ─── Detailed per-machine specifications ────────────────────────────
   Rich technical data (process, capacity, tolerances, materials) for
   engineers evaluating VEEPEE as a supplier. Keyed by facility.id so
   the existing `facilities` array stays the single source of truth for
   name / short description. */
type MachineSpec = {
  id: string;
  Icon: typeof Zap;
  tagline: string;
  process: string;
  capacity: string[];
  tolerances: string[];
  materials: string[];
  applications: string[];
};

const machineSpecs: MachineSpec[] = [
  {
    id: "fiber-laser",
    Icon: Zap,
    tagline: "5 kW IPG-class fiber laser — contour cutting from delicate jaali work to 20 mm structural plate on a single bed.",
    process: "CNC fiber laser cutting with auto-focus head, assist-gas control (N₂ / O₂ / compressed air) and nested part programming from DXF / DWG / STEP.",
    capacity: [
      "Sheet size — 3000 × 1500 mm",
      "Rapid traverse — up to 100 m/min",
      "Nesting software — full-sheet material yield",
      "Assist gases — N₂, O₂, compressed air",
    ],
    tolerances: [
      "Positional accuracy ±0.05 mm",
      "Repeatability ±0.03 mm",
      "Kerf width 0.1 – 0.3 mm (material-dependent)",
      "Edge squareness within ISO 9013 range 3–4",
    ],
    materials: [
      "Mild Steel — up to 20 mm",
      "Stainless Steel (304 / 316) — up to 12 mm",
      "Aluminium — up to 8 mm",
      "Brass & Copper — up to 6 mm",
    ],
    applications: ["Architectural jaalis", "Gate & railing panels", "Loco brackets", "Fabricated flanges & gussets"],
  },
  {
    id: "cnc-press-brake",
    Icon: Layers,
    tagline: "Hydraulic CNC press brake — cold-formed bends without thermal deformation or sparks.",
    process: "Cold forming with CNC back-gauge, servo-controlled ram descent and programmable bend sequence. Punch/die tooling library for V-bend, U-bend, hemming and off-set forming.",
    capacity: [
      "Bending length — up to 3200 mm",
      "Press tonnage — heavy-plate class",
      "Ram stroke with programmable dwell",
      "Multi-axis CNC back-gauge",
    ],
    tolerances: [
      "Bend angle ±0.5°",
      "Bend length ±0.2 mm across the ram",
      "Springback compensation programmed per material",
      "Repeat accuracy across production runs",
    ],
    materials: [
      "Mild Steel plate up to 12 mm",
      "Stainless Steel plate up to 8 mm",
      "Aluminium plate up to 10 mm",
      "Pre-coated / galvanised sheet (protected tooling)",
    ],
    applications: ["Enclosures & panels", "Structural sections", "Pipeline covers & gusset plates", "Loco / railway trays"],
  },
  {
    id: "three-roll-bender",
    Icon: GitCommitHorizontal,
    tagline: "Pyramid three-roll bender — controlled radii on pipe, tube and structural section without kinking.",
    process: "Three-roll cold rolling with pyramid roll geometry. Progressive pinch of the top roll produces continuous, uniform curvature over long pieces. Suitable for arches, structural rings and pipeline segments.",
    capacity: [
      "Pipe & tube up to Ø 150 mm NB",
      "Angle, channel, flat and square section",
      "Rings, arches, spirals and large-radius curves",
      "Long-piece feed with roller supports",
    ],
    tolerances: [
      "Ovality < 3% on standard pipe",
      "Radius accuracy ±1% of set radius",
      "Uniform curvature end-to-end",
      "Minimal springback with pre-set overbend",
    ],
    materials: [
      "MS pipe / ERW / seamless",
      "Stainless Steel pipe (304 / 316)",
      "Structural sections — angle, channel, RHS",
      "Non-ferrous tube on request",
    ],
    applications: ["Pipeline segments", "Structural arches & rings", "Balustrade curves", "Roll-cage frames"],
  },
  {
    id: "cnc-machining",
    Icon: Wrench,
    tagline: "CNC turning, milling and boring — tight-tolerance machined parts is our core domain.",
    process: "CNC lathes and machining centres running from CAM-generated tool paths. First-article inspection, in-process gauging and CMM verification for tolerance-critical loco and pipeline hardware.",
    capacity: [
      "CNC turning — chuck size up to 315 mm",
      "CNC milling — 3-axis machining centre",
      "Boring, drilling, tapping, threading",
      "Batch production with tool-life management",
    ],
    tolerances: [
      "General machining IT7 – IT8",
      "Turned diameters ±0.02 mm",
      "Bored bores H7 / H8",
      "Surface finish Ra 1.6 – 3.2 μm",
    ],
    materials: [
      "MS, EN-series alloy steel",
      "Stainless Steel — 304 / 316 / 410",
      "Cast iron & SG iron",
      "Non-ferrous — brass, bronze, aluminium",
    ],
    applications: ["Pipeline flanges & fittings", "Loco brake gear pins & bushes", "Coupling components", "Fabricated hardware"],
  },
  {
    id: "welding-fab",
    Icon: Flame,
    tagline: "Multi-station MIG / TIG / SMAW welding — pipeline, structural and loco assemblies.",
    process: "Dedicated welding bays with jigs and fixtures for repeatable weldments. Qualified welders following ASME Sec IX / AWS D1.1 procedures on request. Root, hot-pass and cap sequencing on pipeline segments.",
    capacity: [
      "Multi-station bays (structural, pipeline, loco)",
      "MIG (GMAW) — production speed",
      "TIG (GTAW) — SS & thin-section precision",
      "SMAW (arc) — heavy-plate & site prep",
    ],
    tolerances: [
      "Fit-up gap 1.5 – 3 mm per WPS",
      "Weld reinforcement 1 – 3 mm cap",
      "Distortion controlled via jig & sequence",
      "Visual & DPT acceptance to ASME / AWS",
    ],
    materials: [
      "Carbon steel plate & pipe",
      "Stainless Steel 304 / 316",
      "Structural sections — RHS, ISMB, ISMC",
      "Dissimilar joints with qualified WPS",
    ],
    applications: ["Pipeline spool fabrication", "Loco underframes & brackets", "Fabricated skids & hoppers", "Railway coach hardware"],
  },
  {
    id: "powder-coating",
    Icon: Sparkles,
    tagline: "Seven-tank pre-treatment + oven-cured powder — architectural finishes at production scale.",
    process: "Pre-treatment (degrease → derust → phosphate → passivate → rinse → DM rinse) followed by electrostatic powder spray and gas-fired convection oven cure. Colour-consistent batches across gates, railings and industrial parts.",
    capacity: [
      "Batch oven — accommodates gate & railing panels",
      "Electrostatic spray booths",
      "Full pre-treatment line",
      "Colour library — RAL / architectural shades",
    ],
    tolerances: [
      "Coating thickness 60 – 120 μm (DFT)",
      "Adhesion — cross-cut Gt 0/1 (ISO 2409)",
      "Impact & bend resistance per ASTM D2794",
      "Gloss & colour matched to RAL reference",
    ],
    materials: [
      "MS & GI substrates",
      "Aluminium (Cr-free pre-treatment)",
      "Polyester & epoxy-polyester powders",
      "Architectural, industrial & textured finishes",
    ],
    applications: ["Gates & railings", "Facade panels & jaalis", "Industrial enclosures", "Loco hardware & brackets"],
  },
  {
    id: "hot-dip-galv",
    Icon: ShieldCheck,
    tagline: "Coordinated hot-dip galvanizing (partner line) — corrosion protection for pipeline & structural work.",
    process: "Batch hot-dip galvanizing per IS 4759 / ASTM A123: caustic degrease → acid pickle → flux → molten zinc immersion (~450 °C) → quench / passivate. Coordinated through our approved partner line with dispatch back to Maheshpur for inspection.",
    capacity: [
      "Kettle size accommodates pipeline & structural pieces",
      "Batch scheduling with pre-treatment control",
      "Passivation / chromate quench",
      "Full documentation & inspection reports",
    ],
    tolerances: [
      "Coating mass 610 g/m² (85 μm) typical",
      "Coating adhesion per IS 2629",
      "Uniform coverage — internal & external surfaces",
      "Compliance with IS 4759 / ASTM A123",
    ],
    materials: [
      "MS pipe & structural sections",
      "Fabricated pipeline segments",
      "Bolts, nuts and hardware",
      "Structural gratings & handrails",
    ],
    applications: ["Buried / outdoor pipelines", "Structural steelwork", "Handrails & walkways", "Long-life industrial hardware"],
  },
];

const specBucketMeta: {
  key: keyof Pick<MachineSpec, "capacity" | "tolerances" | "materials" | "applications">;
  label: string;
  Icon: typeof Zap;
}[] = [
  { key: "capacity", label: "Capacity", Icon: Gauge },
  { key: "tolerances", label: "Tolerances", Icon: Ruler },
  { key: "materials", label: "Materials", Icon: Beaker },
  { key: "applications", label: "Typical Applications", Icon: CircleDot },
];

export const Route = createFileRoute("/facilities")({
  head: () => {
    const title =
      "Plant & Machinery — 5kW Fiber Laser, CNC Press Brake, Pipe Bending | VEEPEE Engineers, Varanasi";
    const description =
      "Inside VEEPEE Engineers' Maheshpur (Varanasi) plant: 5 kW fiber laser (3000×1500 bed), CNC press brake, three-roll pipe bender, CNC turning & milling cell, powder coating line, galvanizing partner and multi-station MIG/TIG welding — process, capacity, tolerances and materials for every machine.";
    const url = "https://veepeeengr.com/facilities";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content:
            "fiber laser cutting, CNC press brake, pipe bending, CNC machining, powder coating, galvanizing, MIG TIG welding, sheet metal fabrication, Varanasi manufacturing",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "Plant & Machinery — VEEPEE Engineers",
            url,
            description,
            isPartOf: {
              "@type": "WebSite",
              name: "VEEPEE Engineers",
              url: "https://veepeeengr.com",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://veepeeengr.com" },
              { "@type": "ListItem", position: 2, name: "Facilities", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "VEEPEE Engineers Plant & Machinery",
            numberOfItems: machineSpecs.length,
            itemListElement: machineSpecs.map((m, i) => {
              const f = facilities.find((x) => x.id === m.id);
              return {
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Product",
                  "@id": `${url}#${m.id}`,
                  name: f?.name ?? m.id,
                  category: "Manufacturing Equipment",
                  description: m.tagline,
                  additionalProperty: [
                    { "@type": "PropertyValue", name: "Process", value: m.process },
                    { "@type": "PropertyValue", name: "Capacity", value: m.capacity.join("; ") },
                    { "@type": "PropertyValue", name: "Tolerances", value: m.tolerances.join("; ") },
                    { "@type": "PropertyValue", name: "Materials", value: m.materials.join("; ") },
                    { "@type": "PropertyValue", name: "Applications", value: m.applications.join("; ") },
                  ],
                  brand: { "@type": "Brand", name: "VEEPEE Engineers" },
                  manufacturer: {
                    "@type": "Organization",
                    name: "VEEPEE Engineers",
                    url: "https://veepeeengr.com",
                  },
                },
              };
            }),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "VEEPEE Engineers",
            url: "https://veepeeengr.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Maheshpur Industrial Estate",
              addressLocality: "Varanasi",
              addressRegion: "Uttar Pradesh",
              addressCountry: "IN",
            },
            makesOffer: machineSpecs.map((m) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: facilities.find((f) => f.id === m.id)?.name ?? m.id,
                description: m.tagline,
                serviceType: m.process,
                areaServed: "IN",
                provider: { "@type": "Organization", name: "VEEPEE Engineers" },
              },
            })),
          }),
        },
      ],
    };
  },
  component: FacilitiesPage,
});

function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <SiteHeader />

      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-near-black overflow-hidden">
        <LogoWatermark opacity={0.08} size={700} position="top-right" glow={true} className="z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,20,142,0.08),transparent_70%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 text-magenta font-sans-brand text-[11px] uppercase tracking-[0.35em] mb-6">
              <div className="w-8 h-px bg-magenta" />
              Plant &amp; Machinery
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] max-w-4xl">
              Our <span className="text-gradient-magenta">Capabilities</span>,<br />
              not our product list.
            </h1>
            <p className="mt-6 text-metallic font-body text-lg max-w-2xl leading-relaxed">
              Machines, processes and floor capacity at our Maheshpur Industrial Estate workshop — kept separate
              from the sellable catalogue so buyers see products, and engineers see the plant behind them.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1.5 border border-white/10 rounded text-[10px] font-sans-brand uppercase tracking-[0.2em] text-metallic">
                Maheshpur Industrial Estate · Varanasi
              </span>
              <span className="px-3 py-1.5 border border-white/10 rounded text-[10px] font-sans-brand uppercase tracking-[0.2em] text-metallic">
                Since 1976
              </span>
              <span className="px-3 py-1.5 border border-white/10 rounded text-[10px] font-sans-brand uppercase tracking-[0.2em] text-metallic">
                CNC-driven · Job Work Welcome
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MACHINE GRID */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide">
                Plant Overview
              </h2>
              <p className="mt-2 text-metallic font-body text-sm max-w-xl">
                Quick snapshot of every machine. Scroll down for detailed process, tolerance and material specs.
              </p>
            </div>
            <a
              href="#specifications"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-magenta/40 text-magenta hover:bg-magenta/10 text-[10px] font-sans-brand uppercase tracking-[0.22em] transition-all"
            >
              Jump to detailed specs <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f, i) => (
              <motion.a
                key={f.id}
                href={`#specifications`}
                aria-label={`Jump to detailed specifications for ${f.name}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative block rounded-xl p-6 bg-card border border-white/5 hover:border-magenta/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 grid place-items-center rounded-lg bg-magenta/10 border border-magenta/20 text-magenta shrink-0">
                    <Factory className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-sans-brand uppercase tracking-[0.25em] text-magenta">
                    {f.shortName}
                  </span>
                </div>
                <h3 className="font-display text-xl text-white tracking-wide leading-tight">
                  {f.name}
                </h3>
                <p className="mt-2 text-[11px] font-sans-brand uppercase tracking-[0.2em] text-white/70">
                  {f.spec}
                </p>
                <p className="mt-3 text-sm text-metallic font-body leading-relaxed">
                  {f.description}
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 text-xs font-body text-white/60">
                  <span className="text-white/40 uppercase tracking-[0.2em] text-[9px] font-sans-brand block mb-1">
                    Capacity
                  </span>
                  {f.capacity}
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-magenta font-sans-brand text-[10px] uppercase tracking-[0.22em] opacity-0 group-hover:opacity-100 transition-opacity">
                  View full spec <ArrowRight className="h-3 w-3" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>



      {/* DETAILED SPEC CARDS — per-machine process, capacity, tolerances, materials */}
      <section id="specifications" className="py-20 bg-near-black border-t border-white/5">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-12 max-w-3xl">
            <div className="flex items-center gap-3 text-magenta font-sans-brand text-[11px] uppercase tracking-[0.35em] mb-4">
              <div className="w-8 h-px bg-magenta" />
              Equipment Specifications
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-white">
              Every machine, <span className="text-gradient-magenta">on record</span>.
            </h2>
            <p className="mt-4 text-metallic font-body text-lg leading-relaxed">
              Process, working envelope, achievable tolerances and material range for every station on the shop floor —
              so engineers, architects and procurement teams can qualify VEEPEE without a site visit.
            </p>
          </div>

          <div className="space-y-6">
            {machineSpecs.map((m, i) => {
              const facility = facilities.find((f) => f.id === m.id);
              if (!facility) return null;
              const MachineIcon = m.Icon;
              return (
                <motion.article
                  key={m.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: Math.min(i, 3) * 0.05 }}
                  className="group relative rounded-2xl border border-white/5 bg-card/60 hover:border-magenta/30 transition-all overflow-hidden"
                  aria-labelledby={`spec-${m.id}-title`}
                >
                  {/* Header row */}
                  <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 items-start p-6 md:p-8 border-b border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                    <div className="h-14 w-14 grid place-items-center rounded-xl bg-magenta/10 border border-magenta/25 text-magenta shrink-0">
                      <MachineIcon className="h-7 w-7" strokeWidth={1.6} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-[10px] font-sans-brand uppercase tracking-[0.28em] text-magenta">
                          {facility.shortName}
                        </span>
                        <span className="hidden md:inline text-white/20">·</span>
                        <span className="text-[10px] font-sans-brand uppercase tracking-[0.2em] text-white/50">
                          {facility.spec}
                        </span>
                      </div>
                      <h3 id={`spec-${m.id}-title`} className="font-display text-2xl md:text-3xl text-white tracking-wide leading-tight">
                        {facility.name}
                      </h3>
                      <p className="mt-3 text-metallic font-body text-sm md:text-base leading-relaxed max-w-3xl">
                        {m.tagline}
                      </p>
                    </div>
                    <div className="md:text-right md:min-w-[180px]">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-sans-brand uppercase tracking-[0.22em] text-white/70">
                        <Factory className="h-3 w-3" /> Maheshpur Floor
                      </div>
                    </div>
                  </div>

                  {/* Process paragraph */}
                  <div className="px-6 md:px-8 py-6 border-b border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-magenta">
                      <Cog className="h-4 w-4" />
                      <span className="font-sans-brand text-[10px] uppercase tracking-[0.28em]">Process</span>
                    </div>
                    <p className="text-metallic font-body text-sm md:text-[15px] leading-relaxed">
                      {m.process}
                    </p>
                  </div>

                  {/* 4-bucket spec grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {specBucketMeta.map((b) => {
                      const BucketIcon = b.Icon;
                      const items = m[b.key];
                      return (
                        <div
                          key={b.key}
                          className="p-6 md:p-7 border-t border-white/5 md:border-t-0 md:border-l first:md:border-l-0 border-white/5 bg-white/[0.01]"
                        >
                          <div className="flex items-center gap-2 mb-3 text-white/70">
                            <BucketIcon className="h-4 w-4 text-magenta" />
                            <span className="font-sans-brand text-[10px] uppercase tracking-[0.28em]">
                              {b.label}
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {items.map((line) => (
                              <li
                                key={line}
                                className="flex gap-2 text-[13px] leading-snug text-white/85 font-body"
                              >
                                <span aria-hidden className="mt-1.5 h-1 w-1 rounded-full bg-magenta/70 shrink-0" />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Anchor CTA */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-5">
            <p className="text-metallic font-body text-sm max-w-xl">
              Need a machine-level capability statement or process qualification record for vendor registration?
              We can share PQR, WPS and calibration certificates on request.
            </p>
            <a
              href="https://wa.me/919125142400?text=Hi%2C%20please%20share%20your%20plant%20capability%20statement%20and%20PQR%2FWPS."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-magenta-gradient text-white font-sans-brand text-xs uppercase tracking-[0.2em] hover:shadow-magenta transition-all"
            >
              Request documentation <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* QUALITY / STANDARDS STRIP */}
      <section className="py-14 border-y border-white/5 bg-near-black">
        <div className="mx-auto max-w-[1400px] px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              t: "In-house quality control",
              d: "First-article inspection, dimensional checks and weld visual inspection on every batch. Radiography and DPT on request.",
            },
            {
              t: "Buy-to-drawing",
              d: "Send us DXF / STEP / PDF drawings — we quote, cut, form, machine, coat and ship as a single accountable line.",
            },
            {
              t: "Job-work welcome",
              d: "Spare laser bed, press-brake and machining hours are booked as job work for architects, fabricators and OEMs across Eastern India.",
            },
          ].map((b) => (
            <div key={b.t} className="rounded-xl border border-white/5 p-5 bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-2 text-magenta">
                <Cog className="h-4 w-4" />
                <span className="font-sans-brand text-[10px] uppercase tracking-[0.25em]">Standard</span>
              </div>
              <h3 className="font-display text-lg text-white">{b.t}</h3>
              <p className="mt-2 text-sm text-metallic font-body leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-near-black">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white">
            Have a drawing?{" "}
            <span className="text-gradient-magenta">We can make it.</span>
          </h2>
          <p className="mt-4 text-metallic font-body text-lg max-w-xl mx-auto">
            Share a DXF, STEP or PDF and we'll come back with a fabrication plan and quote.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919125142400?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20fabrication%20job."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-sans-brand text-sm uppercase tracking-[0.15em] rounded-lg hover:bg-[#1ebe5a] transition-all"
            >
              <Phone className="h-4 w-4" /> WhatsApp Us
            </a>
            <Link
              to="/catalogue"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-magenta-gradient text-white font-sans-brand text-sm uppercase tracking-[0.15em] rounded-lg hover:shadow-magenta transition-all"
            >
              Browse Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
