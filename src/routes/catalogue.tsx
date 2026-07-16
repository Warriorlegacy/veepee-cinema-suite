import { createFileRoute, useSearch, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  X, ArrowRight, Grid3X3, DoorOpen, Fence,
  Church, Paintbrush, CircleDot, Wind, Cog, Gift,
  ChevronLeft, ChevronRight, IndianRupee, Phone, Building,
  Search, PackageSearch, Factory,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import {
  categories,
  products,
  resolveCategoryId,
  getProductsByCategory,
  getVisibleProducts,
  HIDDEN_FROM_CATALOGUE,
  type CatalogueProduct,
  type CatalogueCategory,
} from "@/data/catalogue-data";


type CatalogueSearch = { cat?: string; q?: string };


const validCategoryIds = new Set(categories.map((c) => c.id));

export const Route = createFileRoute("/catalogue")({
  validateSearch: (s: Record<string, unknown>): CatalogueSearch => {
    const rawCat = typeof s.cat === "string" ? s.cat : undefined;
    const cat = rawCat && (rawCat === "all" || validCategoryIds.has(rawCat)) ? rawCat : undefined;
    return {
      cat,
      q: typeof s.q === "string" ? s.q.slice(0, 80) : undefined,
    };

  },
  head: () => {
    const title =
      "Product Catalogue — Pipeline, Fabricated, Loco & Architectural Metalwork | VEEPEE Engineers";
    const description =
      "Browse VEEPEE Engineers' full catalogue: Pipeline Products (elbows, flanges, tees, reducers), Fabricated Products (skids, hoppers, tanks), Loco & Railway components, and CNC laser-cut architectural gates, railings, jaalis, facades and grilles. Manufactured in Varanasi to tight tolerances.";
    const url = "https://veepeeengr.com/catalogue";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content:
            "pipeline products, fabricated products, locomotive components, railway components, CNC laser cutting, architectural metalwork, laser cut gates, laser cut jaali, MS pipe fittings, industrial fabrication Varanasi",
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
            "@type": "CollectionPage",
            name: "VEEPEE Engineers — Product Catalogue",
            url,
            description,
            about: [
              "Pipeline Products",
              "Fabricated Products",
              "Loco & Railway Components",
              "CNC Laser-Cut Architectural Metalwork",
            ],
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
              { "@type": "ListItem", position: 2, name: "Catalogue", item: url },
            ],
          }),
        },
      ],
    };
  },
  component: CataloguePage,
});


/* ─── icon map ─── */
const iconMap: Record<string, React.ReactNode> = {
  grid: <Grid3X3 className="h-4 w-4" />,
  door: <DoorOpen className="h-4 w-4" />,
  railing: <Fence className="h-4 w-4" />,
  temple: <Church className="h-4 w-4" />,
  art: <Paintbrush className="h-4 w-4" />,
  mirror: <CircleDot className="h-4 w-4" />,
  vent: <Wind className="h-4 w-4" />,
  cog: <Cog className="h-4 w-4" />,
  gift: <Gift className="h-4 w-4" />,
  facade: <Building className="h-4 w-4" />,
};

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.3 } },
};

/* ─── Empty state ─── */
function EmptyState({
  title,
  message,
  onReset,
  resetLabel = "Clear search",
}: {
  title: string;
  message: string;
  onReset?: () => void;
  resetLabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-lg text-center py-16 px-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]"
    >
      <div className="mx-auto mb-4 h-14 w-14 grid place-items-center rounded-full bg-magenta/10 border border-magenta/20 text-magenta">
        <PackageSearch className="h-6 w-6" />
      </div>
      <h3 className="font-display text-xl text-white tracking-wide">{title}</h3>
      <p className="mt-2 text-metallic font-body text-sm leading-relaxed">{message}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-[11px] font-sans-brand uppercase tracking-[0.22em] rounded-full bg-magenta-gradient text-white hover:shadow-magenta transition-all"
        >
          {resetLabel} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </motion.div>
  );
}

/* ─── Product card (with image loading skeleton) ─── */
function ProductCard({
  product,
  category,
  idx,
  onOpen,
}: {
  product: CatalogueProduct;
  category?: CatalogueCategory;
  idx: number;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.div
      layout
      custom={idx}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
      className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-card cursor-pointer border border-white/5 hover:border-magenta/30 transition-all duration-500"
      onClick={onOpen}
    >
      {/* Shimmer skeleton while image loads */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-white/[0.08] to-white/[0.02] animate-pulse" />
      )}
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1.2s] group-hover:scale-110 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
      {category && (
        <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-magenta/90 text-white text-[9px] font-sans-brand uppercase tracking-[0.25em]">
          {iconMap[category.icon]}
          {category.shortName}
        </span>
      )}
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white/90 text-[10px] font-sans-brand tracking-wider border border-white/10">
        {product.priceRange.split("–")[0]}
      </span>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-display text-lg text-white tracking-wide leading-tight">
          {product.name}
        </h3>
        {product.material && (
          <p className="text-[11px] text-metallic font-body mt-1">{product.material}</p>
        )}
        <div className="mt-2 flex items-center gap-2 text-magenta font-sans-brand text-[10px] uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          View Details <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 group-hover:ring-magenta/20 transition-all duration-500" />
    </motion.div>
  );
}


function Lightbox({
  product,
  category,
  onClose,
  onPrev,
  onNext,
}: {
  product: CatalogueProduct;
  category?: CatalogueCategory;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-5xl w-full grid grid-cols-1 lg:grid-cols-[1fr_380px] bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        variants={scaleIn}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-square lg:aspect-auto bg-black flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain max-h-[70vh]"
          />
          {/* Nav arrows */}
          <button onClick={onPrev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-magenta/80 text-white transition-all">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={onNext} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-magenta/80 text-white transition-all">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Detail panel */}
        <div className="p-8 flex flex-col gap-5">
          {category && (
            <span className="inline-flex items-center gap-2 text-magenta font-sans-brand text-[10px] uppercase tracking-[0.3em]">
              {iconMap[category.icon]} {category.shortName}
            </span>
          )}
          <h3 className="font-display text-3xl text-white tracking-wide">{product.name}</h3>

          {product.material && (
            <div className="text-metallic text-sm font-body">
              <span className="text-white/50">Material:</span> {product.material}
            </div>
          )}

          <div className="flex items-center gap-2 mt-1">
            <IndianRupee className="h-4 w-4 text-magenta" />
            <span className="font-display text-xl text-white">{product.priceRange}</span>
          </div>

          <p className="text-metallic text-sm leading-relaxed font-body mt-2">
            Pricing varies based on design complexity, sheet thickness, and material grade.
            Contact us for an exact quote tailored to your project requirements.
          </p>

          <div className="mt-auto flex flex-col gap-3 pt-4">
            <a
              href="https://wa.me/919125142400?text=Hi%2C%20I%27m%20interested%20in%20your%20product%3A%20"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white font-sans-brand text-sm uppercase tracking-[0.15em] rounded-lg hover:bg-[#1ebe5a] transition-all"
            >
              <Phone className="h-4 w-4" /> WhatsApp Enquiry
            </a>
            <a
              href="/#contact"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-magenta-gradient text-white font-sans-brand text-sm uppercase tracking-[0.15em] rounded-lg hover:shadow-magenta transition-all"
            >
              Get Detailed Quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-magenta text-white transition-all z-10"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
function CataloguePage() {
  const search = useSearch({ from: "/catalogue" });
  const [activeCategory, setActiveCategory] = useState<string>(search.cat ?? "all");
  const [activeGroup, setActiveGroup] = useState<"all" | "architectural" | "industrial" | "decor" | "services">("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [query, setQuery] = useState<string>(search.q ?? "");
  const filterRef = useRef<HTMLDivElement>(null);

  // React to nav-driven ?cat= changes.
  useEffect(() => {
    if (search.cat) {
      setActiveCategory(search.cat);
      const cat = categories.find((c) => c.id === search.cat);
      if (cat?.group) setActiveGroup(cat.group as typeof activeGroup);
    }
  }, [search.cat]);

  // Product-only categories, filtered by the active group.
  const productCategories = categories.filter((c) => (c.type ?? "product") === "product");
  const visibleCategories = activeGroup === "all"
    ? productCategories
    : productCategories.filter((c) => c.group === activeGroup);

  const q = query.trim().toLowerCase();

  const visibleAll = useMemo(() => getVisibleProducts(), []);

  const baseProducts = useMemo(
    () =>
      activeCategory === "all"
        ? (activeGroup === "all"
            ? visibleAll
            : visibleAll.filter((p) => {
                const cid = resolveCategoryId(p);
                if (cid === HIDDEN_FROM_CATALOGUE) return false;
                const cat = categories.find((c) => c.id === cid);
                return cat?.group === activeGroup;
              }))
        : getProductsByCategory(activeCategory),
    [activeCategory, activeGroup, visibleAll],
  );

  // Landing-tile mode: architectural group has many sub-categories with
  // very different aesthetics — show category tiles instead of one giant
  // wall of mixed products. Prevents the "laser-cut mashup" chaos.
  const showLandingTiles =
    activeCategory === "all" && (activeGroup === "architectural" || activeGroup === "decor");

  const filteredProducts = useMemo(() => {
    if (!q) return baseProducts;
    return baseProducts.filter((p) => {
      const cid = resolveCategoryId(p);
      const cat = categories.find((c) => c.id === cid);
      return (
        p.name.toLowerCase().includes(q) ||
        (p.material?.toLowerCase().includes(q) ?? false) ||
        (cat?.name.toLowerCase().includes(q) ?? false) ||
        (cat?.shortName.toLowerCase().includes(q) ?? false)
      );
    });
  }, [baseProducts, q]);

  // Category tile counts (only among visible / non-hidden products).
  const categoryCounts = useMemo(() => {
    const map = new Map<string, { count: number; cover?: string }>();
    for (const p of visibleAll) {
      const cid = resolveCategoryId(p);
      const entry = map.get(cid) ?? { count: 0, cover: undefined };
      entry.count += 1;
      if (!entry.cover) entry.cover = p.image;
      map.set(cid, entry);
    }
    return map;
  }, [visibleAll]);


  const openLightbox = useCallback((idx: number) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const navigateLightbox = useCallback(
    (dir: 1 | -1) => {
      if (lightboxIdx === null) return;
      const len = filteredProducts.length;
      if (len === 0) return;
      setLightboxIdx((lightboxIdx + dir + len) % len);
    },
    [lightboxIdx, filteredProducts.length]
  );

  const activeCat = categories.find((c) => c.id === activeCategory);

  const groups: { id: typeof activeGroup; label: string }[] = [
    { id: "all", label: "All" },
    { id: "architectural", label: "Architectural & Laser-Cut" },
    { id: "industrial", label: "Pipeline · Fabricated · Loco" },
    { id: "decor", label: "Décor & Art" },
    { id: "services", label: "Services" },
  ];




  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <SiteHeader />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 bg-near-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,20,142,0.08),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative mx-auto max-w-[1400px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 text-magenta font-sans-brand text-[11px] uppercase tracking-[0.35em] mb-6">
              <div className="w-8 h-px bg-magenta" />
              Product Catalogue
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.92] max-w-4xl">
              Precision Crafted{" "}
              <span className="text-gradient-magenta">Metal Art</span>
            </h1>
            <p className="mt-6 text-metallic font-body text-lg max-w-2xl leading-relaxed">
              Explore our collection of {products.length}+ CNC laser-cut products — from architectural
              jaali screens and designer gates to temple panels and bespoke shadow art.
              Every piece is precision-crafted at our Varanasi facility.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1.5 border border-white/10 rounded text-[10px] font-sans-brand uppercase tracking-[0.2em] text-metallic">
                {categories.length} Categories
              </span>
              <span className="px-3 py-1.5 border border-white/10 rounded text-[10px] font-sans-brand uppercase tracking-[0.2em] text-metallic">
                {products.length}+ Products
              </span>
              <span className="px-3 py-1.5 border border-white/10 rounded text-[10px] font-sans-brand uppercase tracking-[0.2em] text-metallic">
                Custom Orders Welcome
              </span>
            </div>
            <div className="mt-6">
              <a
                href="/api/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="VEEPEE-Engineers-Brochure.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-magenta/50 bg-magenta/5 hover:bg-magenta/15 text-white font-sans-brand text-xs uppercase tracking-[0.22em] transition-all"
              >
                <PackageSearch className="h-4 w-4 text-magenta" />
                Download Full Brochure (PDF)
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="sticky top-[64px] z-40 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-white/5">
        <div className="mx-auto max-w-[1400px] px-6 py-3 flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-sans-brand uppercase tracking-[0.22em] rounded-full border border-magenta/40 text-magenta hover:bg-magenta/10 transition-all"
            >
              <Factory className="h-3.5 w-3.5" /> View Our Plant & Machinery
            </Link>


            {/* Live search */}
            <div className="relative flex-1 min-w-[200px] max-w-md ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-metallic/60 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, materials, categories…"
                aria-label="Search catalogue"
                className="w-full pl-9 pr-9 py-2 rounded-full bg-white/[0.04] border border-white/10 focus:border-magenta/60 focus:ring-2 focus:ring-magenta/20 outline-none text-sm text-white placeholder:text-metallic/50 font-body transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-metallic hover:text-white hover:bg-white/10"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Group tabs */}
          <div role="tablist" aria-label="Product group" className="flex gap-2 overflow-x-auto scrollbar-hide">
            {groups.map((g) => {
              const active = activeGroup === g.id;
              return (
                <button
                  key={g.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => { setActiveGroup(g.id); setActiveCategory("all"); }}
                  className={`relative shrink-0 px-3.5 py-1.5 text-[10px] font-sans-brand uppercase tracking-[0.22em] rounded-md border transition-all whitespace-nowrap ${
                    active
                      ? "border-magenta text-white bg-magenta/15 shadow-[0_0_0_1px_rgba(212,20,142,0.4)]"
                      : "border-white/10 text-metallic/70 hover:text-white hover:border-white/25 hover:bg-white/[0.03]"
                  }`}
                >
                  {g.label}
                  {active && (
                    <span className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 h-[2px] w-6 bg-magenta rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sub-category chips */}
          <div ref={filterRef} className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              aria-pressed={activeCategory === "all"}
              className={`shrink-0 px-4 py-2.5 text-[11px] font-sans-brand uppercase tracking-[0.2em] rounded-full border transition-all whitespace-nowrap ${
                activeCategory === "all"
                  ? "bg-magenta-gradient text-white border-transparent shadow-magenta ring-1 ring-magenta/40"
                  : "border-white/15 text-metallic hover:border-magenta hover:text-white"
              }`}
            >
              All in Group
            </button>
            {visibleCategories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={active}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 text-[11px] font-sans-brand uppercase tracking-[0.2em] rounded-full border transition-all whitespace-nowrap ${
                    active
                      ? "bg-magenta-gradient text-white border-transparent shadow-magenta ring-1 ring-magenta/40"
                      : "border-white/15 text-metallic hover:border-magenta hover:text-white"
                  }`}
                >
                  {iconMap[cat.icon]}
                  {cat.shortName}
                </button>
              );
            })}
          </div>

        </div>
      </section>



      {/* ── Category Description ── */}
      <AnimatePresence mode="wait">
        {activeCat && (
          <motion.section
            key={activeCat.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#0F0F0F] border-b border-white/5 overflow-hidden"
          >
            <div className="mx-auto max-w-[1400px] px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-white tracking-wide">
                  {activeCat.name}
                </h2>
                <p className="text-metallic font-body text-sm mt-1 max-w-xl">
                  {activeCat.description}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-4 py-2 rounded-lg bg-magenta/10 border border-magenta/20 font-display text-lg text-magenta">
                  {activeCat.priceLabel}
                  <span className="text-sm text-magenta/70">{activeCat.priceUnit}</span>
                </span>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── LANDING TILES: shown for Architectural / Décor groups when no
             specific sub-category is picked. Prevents laser-cut chaos. ── */}
      {showLandingTiles && !q && (
        <section className="py-12 bg-[#0A0A0A]">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="mb-8">
              <h2 className="font-display text-3xl md:text-4xl text-white">
                {activeGroup === "architectural" ? "Laser-Cut Designs" : "Décor & Art"}
                <span className="text-gradient-magenta"> · Segregated by Item</span>
              </h2>
              <p className="mt-2 text-metallic font-body text-sm max-w-2xl">
                Each item type has its own gallery — no mashup. Tap a tile to see the full sub-category.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleCategories.map((cat, i) => {
                const info = categoryCounts.get(cat.id);
                if (!info || info.count === 0) return null;
                return (
                  <motion.button
                    key={cat.id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                    onClick={() => setActiveCategory(cat.id)}
                    className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-card border border-white/5 hover:border-magenta/40 text-left"
                  >
                    <img
                      src={info.cover}
                      alt={cat.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-magenta/90 text-white text-[9px] font-sans-brand uppercase tracking-[0.25em]">
                      {iconMap[cat.icon]} {info.count} items
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display text-lg text-white tracking-wide leading-tight">
                        {cat.shortName}
                      </h3>
                      <p className="mt-1 text-[10px] font-sans-brand uppercase tracking-[0.22em] text-magenta">
                        {cat.priceLabel}{cat.priceUnit}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-magenta font-sans-brand text-[10px] uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity">
                        Open gallery <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── PRODUCT GRID ── */}
      {!showLandingTiles && (
      <section className="py-12 bg-[#0A0A0A]">

        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-6 text-metallic font-body text-sm flex items-center gap-2 flex-wrap">
            <span>Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</span>
            {q && (
              <span className="text-metallic/70">
                for “<span className="text-white">{query}</span>”
              </span>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => {
                  const cat = categories.find((c) => c.id === product.categoryId);
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      category={cat}
                      idx={idx}
                      onOpen={() => openLightbox(idx)}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState
              title={q ? "No products match your search" : "No products in this category yet"}
              message={
                q
                  ? `We couldn't find any product matching "${query}". Try a different keyword or clear filters.`
                  : "This category is being catalogued. Check back soon or reach out for custom work — we build to spec."
              }
              onReset={q ? () => setQuery("") : () => { setActiveCategory("all"); setActiveGroup("all"); }}
              resetLabel={q ? "Clear search" : "View all products"}
            />
          )}
        </div>
      </section>
      )}



      {/* ── CTA BANNER ── */}

      <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-near-black">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-6xl text-white">
              Don't see your design?{" "}
              <span className="text-gradient-magenta">We create custom.</span>
            </h2>
            <p className="mt-4 text-metallic font-body text-lg max-w-xl mx-auto">
              Share your vision or CAD file and we'll laser-cut it to perfection.
              Custom orders start from just ₹50/sq ft for job work.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919125142400?text=Hi%2C%20I%20want%20a%20custom%20laser-cut%20design."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-sans-brand text-sm uppercase tracking-[0.15em] rounded-lg hover:bg-[#1ebe5a] transition-all"
              >
                <Phone className="h-4 w-4" /> WhatsApp Us
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-magenta-gradient text-white font-sans-brand text-sm uppercase tracking-[0.15em] rounded-lg hover:shadow-magenta transition-all"
              >
                Get Custom Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIdx !== null && filteredProducts[lightboxIdx] && (
          <Lightbox
            product={filteredProducts[lightboxIdx]}
            category={categories.find(
              (c) => c.id === filteredProducts[lightboxIdx].categoryId
            )}
            onClose={closeLightbox}
            onPrev={() => navigateLightbox(-1)}
            onNext={() => navigateLightbox(1)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
