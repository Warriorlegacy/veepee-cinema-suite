import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown, Zap, Cog, Hammer, Shield, Building2, Factory,
  Wrench, Droplets, ArrowRight, MessageCircle, Phone, Mail,
  Star, MapPin, CheckCircle2, Sparkles,
} from "lucide-react";

import hero from "@/assets/hero-sparks.jpg";
import workshop from "@/assets/workshop.jpg";
import productJaali from "@/assets/product-jaali.jpg";
import productGate from "@/assets/product-gate.jpg";
import productRailing from "@/assets/product-railing.jpg";
import productIndustrial from "@/assets/product-industrial.jpg";
import projectHero from "@/assets/project-hero.jpg";
import { ContactForm } from "@/components/contact-form";
import { ServiceImage } from "@/components/service-image";
import { listServices } from "@/lib/services.functions";
import { getServiceIcon } from "@/lib/service-icons";
import { LazyClientCanvas } from "@/components/three/lazy";
import { LazyHeroScene } from "@/components/three/lazy";
import { LazyFloatingIcon } from "@/components/three/lazy";
import { LazyProductModel } from "@/components/three/lazy";
import { LazyProcessPipeline } from "@/components/three/lazy";
import { LazyWorkshopScene } from "@/components/three/lazy";
import { LazyContactGear } from "@/components/three/lazy";
import { categories as catalogueCategories, products as catalogueProducts, resolveCategoryId } from "@/data/catalogue-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

/* ─────────── HERO ─────────── */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] md:min-h-[700px] md:h-screen w-full overflow-hidden bg-black"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      {/* 3D Laser Scene */}
      <LazyClientCanvas
        className="absolute inset-0 z-0"
        cameraPosition={[0, 0, 5]}
        cameraFov={60}
        interactive={true}
      >
        <LazyHeroScene />
      </LazyClientCanvas>



      {/* Cinematic background (fallback / overlay) */}
      <motion.div style={{ y }} className="absolute inset-0 z-[1]">
        <img
          src={hero}
          alt="Fiber laser cutting steel with sparks flying"
          className="h-full w-full object-cover scale-110 opacity-40"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30 z-[1]" />

      {/* Side rule */}
      <div className="absolute left-6 top-0 bottom-0 hidden md:flex flex-col justify-between py-32 pointer-events-none">
        <span className="font-sans-brand text-[10px] tracking-[0.4em] text-metallic [writing-mode:vertical-rl] rotate-180">EST · 1976 · VARANASI</span>
        <span className="font-sans-brand text-[10px] tracking-[0.4em] text-magenta [writing-mode:vertical-rl] rotate-180">SCENE 01 / LASER</span>
      </div>
      <div className="absolute right-6 top-0 bottom-0 hidden md:flex flex-col justify-between py-32 pointer-events-none">
        <span className="font-sans-brand text-[10px] tracking-[0.4em] text-metallic [writing-mode:vertical-rl]">N 25.3°  ·  E 82.9°</span>
        <span className="font-sans-brand text-[10px] tracking-[0.4em] text-metallic [writing-mode:vertical-rl]">REC ● 00:00:42</span>
      </div>

      {/* Content — pointer-events pass through empty areas so drag reaches the canvas;
          interactive children re-enable events. */}
      <motion.div style={{ opacity }} className="relative z-10 flex h-full items-center pointer-events-none">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-16 [&_a]:pointer-events-auto">

          <div className="max-w-4xl">
            <div className="hero-fade hero-fade-1 flex items-center gap-3 mb-5 sm:mb-8 mt-16 sm:mt-0">
              <span className="h-px w-6 sm:w-12 bg-magenta shrink-0" />
              <span className="font-sans-brand text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.4em] text-magenta uppercase whitespace-nowrap">
                <span className="sm:hidden">Since 1976 · Varanasi</span>
                <span className="hidden sm:inline">Precision Engineering · Since 1976</span>
              </span>
            </div>

            {/* Visually-hidden semantic H1 for SEO — the display heading below is decorative */}
            <h1 className="sr-only">
              Metal Fabricator &amp; Laser Cutting Services in Varanasi, Uttar Pradesh | VEEPEE Engineers
            </h1>
            <p
              aria-hidden="true"
              className="hero-fade hero-fade-2 font-display text-[clamp(2.25rem,12vw,8.5rem)] md:text-[8.5vw] lg:text-[7.5rem] leading-[0.9] text-white break-words"
            >
              ENGINEERING
              <br />
              <span className="text-gradient-magenta">PRECISION.</span>
            </p>
            <p
              aria-hidden="true"
              className="hero-fade hero-fade-3 font-display text-[clamp(1.5rem,8vw,6rem)] md:text-[6vw] lg:text-[5.5rem] leading-[0.95] text-metallic/80 mt-1"
            >
              DELIVERING EXCELLENCE.
            </p>

            <p
              className="hero-fade hero-fade-4 mt-6 sm:mt-8 max-w-2xl font-sans-brand text-sm sm:text-base md:text-lg tracking-wide text-metallic"
            >
              Laser Cutting · CNC Fabrication · Pipeline · Fabricated & Loco Products · Architectural Metal.
              Built on precision. Rooted in Varanasi.
            </p>

            {/* Facility & machine spec strip */}
            <div className="hero-fade hero-fade-4 mt-5 sm:mt-6 max-w-2xl">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] sm:text-xs font-sans-brand uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white/80">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-magenta shadow-[0_0_10px_2px_rgba(212,20,142,0.7)]" />
                  Maheshpur Industrial Estate
                </span>
                <span className="hidden sm:inline text-white/30">/</span>
                <span className="text-metallic">5&nbsp;kW Fiber Laser</span>
                <span className="hidden sm:inline text-white/30">/</span>
                <span className="text-metallic">3000&nbsp;×&nbsp;1500 Bed</span>
                <span className="hidden sm:inline text-white/30">/</span>
                <span className="text-metallic">CNC Press Brake</span>
              </div>
            </div>

            <div className="hero-fade hero-fade-5 mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 bg-magenta-gradient text-white font-sans-brand uppercase tracking-[0.2em] text-xs sm:text-sm rounded-md shadow-magenta hover:shadow-glow transition-all"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 border border-white/30 text-white font-sans-brand uppercase tracking-[0.2em] text-xs sm:text-sm rounded-md hover:bg-white/5 hover:border-magenta transition-all"
              >
                View Our Work
              </a>
              <a
                href="https://wa.me/919125142400"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 text-white font-sans-brand uppercase tracking-[0.2em] text-xs sm:text-sm rounded-md transition-all"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-chevron">
        <span className="font-sans-brand text-[10px] tracking-[0.4em] text-magenta uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5 text-magenta" />
      </div>
    </section>
  );
}

/* ─────────── TRUST BAR ─────────── */
const trustItems = [
  { icon: Shield, text: "GST Registered" },
  { icon: CheckCircle2, text: "UDYAM Registered" },
  { icon: Sparkles, text: "Made in India" },
  { icon: Factory, text: "Industrial Manufacturing" },
  { icon: Wrench, text: "Custom Engineering" },
];

export function TrustBar() {
  return (
    <section className="relative bg-near-black border-y border-white/5 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 py-6 flex items-center gap-10 overflow-x-auto no-scrollbar md:justify-between">
        {trustItems.map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 whitespace-nowrap"
          >
            <Icon className="h-4 w-4 text-magenta" />
            <span className="font-sans-brand text-xs uppercase tracking-[0.25em] text-metallic">{text}</span>
            {i < trustItems.length - 1 && <span className="hidden md:block h-4 w-px bg-white/10 ml-10" />}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────── SERVICES ─────────── */
export function Services() {
  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: () => listServices(),
  });

  return (
    <section id="services" className="relative py-20 md:py-28 noise overflow-hidden">
      <LazyClientCanvas
        className="absolute inset-0 z-0 pointer-events-none"
        cameraPosition={[0, 0, 8]}
        cameraFov={60}
        performance="low"
        disableOnMobile
      >
        <LazyFloatingIcon position={[-3, 2, -2]} shape="torus" speed={0.6} scale={0.8} />
        <LazyFloatingIcon position={[3, -1, -3]} shape="icosahedron" speed={0.8} scale={0.6} />
        <LazyFloatingIcon position={[-2, -2, -4]} shape="box" speed={0.4} scale={0.7} />
        <LazyFloatingIcon position={[4, 1.5, -5]} shape="sphere" speed={0.9} scale={0.5} />
        <LazyFloatingIcon position={[0, 3, -6]} shape="octahedron" speed={0.7} scale={0.6} />
      </LazyClientCanvas>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <SectionLabel number="01" label="Services" />
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl md:text-7xl text-white max-w-4xl leading-[0.95]"
        >
          We shape <span className="text-magenta">steel</span> into possibilities.
        </motion.h2>

        {/* CNC core-domain banner — the tight-tolerance tagline as a first-class statement */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 relative overflow-hidden rounded-2xl border border-magenta/40 bg-gradient-to-r from-magenta/10 via-magenta/5 to-transparent p-5 sm:p-6 max-w-4xl"
        >
          <div className="absolute inset-y-0 left-0 w-1 bg-magenta-gradient" aria-hidden />
          <div className="flex items-center gap-2 text-magenta font-sans-brand text-[10px] uppercase tracking-[0.3em] mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-magenta animate-pulse" />
            CNC Fabrication · Core Domain
          </div>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
            "Tight-tolerance machined parts is{" "}
            <span className="text-gradient-magenta">our core domain.</span>"
          </p>
          <p className="mt-3 text-metallic font-body text-sm sm:text-base max-w-3xl">
            Turned, milled and bored components for pipeline fittings, fabricated assemblies and loco hardware —
            first-article inspected, CMM-verified, delivered to drawing.
          </p>
        </motion.div>

        <p className="mt-6 max-w-2xl text-metallic font-body text-sm sm:text-base">
          Integrated capabilities under one roof — from a single laser-cut sheet to full architectural installations,
          backed by our CNC Fabrication line for Pipeline, Fabricated and Loco products.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = getServiceIcon(s.icon);
            return (
              <motion.div
                key={s.id}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
              >
                <Link
                  to="/services/$id"
                  params={{ id: s.id }}
                  className="group relative rounded-lg bg-card border border-white/5 hover:border-magenta/50 transition-all cursor-pointer overflow-hidden block h-full"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                    <ServiceImage
                      src={s.image_url}
                      alt={s.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  </div>
                  <div className="relative p-6">
                    <Icon className="h-8 w-8 text-magenta mb-4" strokeWidth={1.5} />
                    <h3 className="font-display text-xl text-white tracking-wide">{s.name}</h3>
                    <p className="mt-2 text-sm text-metallic font-body line-clamp-3">{s.description}</p>
                    <div className="mt-5 flex items-center gap-2 text-magenta font-sans-brand text-xs uppercase tracking-[0.25em] opacity-70 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────── FEATURED PRODUCTS ─────────── */
export function Products() {
  const [filter, setFilter] = useState("all");
  
  // Get 1-2 representative products per resolved category for featured display
  const featuredProducts = catalogueProducts.filter((p) => {
    const cid = resolveCategoryId(p);
    const indexInCat = catalogueProducts.filter((x) => resolveCategoryId(x) === cid).indexOf(p);
    return indexInCat < 2;
  }).slice(0, 12);

  const visible = filter === "all"
    ? featuredProducts
    : featuredProducts.filter((p) => resolveCategoryId(p) === filter);

  return (
    <section id="products" className="relative py-20 md:py-28 bg-near-black">
      <LazyClientCanvas
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        cameraPosition={[0, 0, 5]}
        cameraFov={50}
        performance="low"
        disableOnMobile
      >
        <LazyProductModel type="jaali" position={[-0.5, 1, -3]} />
        <LazyProductModel type="gate" position={[2, -0.5, -4]} />
        <LazyProductModel type="industrial" position={[-2, -0.8, -5]} />
      </LazyClientCanvas>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <SectionLabel number="02" label="Featured Products" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-white max-w-3xl leading-[0.95]">
            Premium products. <br /><span className="text-gradient-magenta">Precision crafted.</span>
          </h2>
          <div className="-mx-5 sm:mx-0 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 px-5 sm:px-0 min-w-max md:flex-wrap md:min-w-0">
              <button
                onClick={() => setFilter("all")}
                className={`shrink-0 px-4 py-2 text-xs font-sans-brand uppercase tracking-[0.2em] rounded-full border transition-all ${
                  filter === "all"
                    ? "bg-magenta-gradient text-white border-transparent shadow-magenta"
                    : "border-white/15 text-metallic hover:border-magenta hover:text-white"
                }`}
              >
                All
              </button>
              {catalogueCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  className={`shrink-0 px-4 py-2 text-xs font-sans-brand uppercase tracking-[0.2em] rounded-full border transition-all ${
                    filter === c.id
                      ? "bg-magenta-gradient text-white border-transparent shadow-magenta"
                      : "border-white/15 text-metallic hover:border-magenta hover:text-white"
                  }`}
                >
                  {c.shortName}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((p, i) => {
            const cat = catalogueCategories.find((c) => c.id === p.categoryId);
            return (
              <motion.a
                key={p.id}
                href="/catalogue"
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-card block"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                {cat && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-magenta/90 text-white text-[10px] font-sans-brand uppercase tracking-[0.25em]">
                    {cat.shortName}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-2xl text-white tracking-wide leading-tight">{p.name}</h3>
                  {p.material && (
                    <p className="text-[11px] text-metallic font-body mt-1">{p.material}</p>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-magenta font-sans-brand text-xs uppercase tracking-[0.25em] opacity-80 group-hover:opacity-100">
                    Explore Catalogue <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────── PROCESS TIMELINE ─────────── */
const steps = [
  { n: "01", title: "Design", text: "Brief → CAD/DXF → approval" },
  { n: "02", title: "Engineering", text: "Material selection & production plan" },
  { n: "03", title: "Laser Cutting", text: "CNC precision · edge QA" },
  { n: "04", title: "Fabrication", text: "Welding · shaping · assembly" },
  { n: "05", title: "Finishing", text: "Powder coat / galvanize / polish" },
  { n: "06", title: "Delivery", text: "Pack · dispatch · install support" },
];

export function Process() {
  return (
    <section id="process" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-20 z-0" />
      <LazyClientCanvas
        className="absolute inset-0 z-[1] pointer-events-none opacity-40"
        cameraPosition={[0, 0, 8]}
        cameraFov={50}
        performance="low"
        disableOnMobile
      >
        <LazyProcessPipeline />
      </LazyClientCanvas>
      <div className="relative mx-auto max-w-[1400px] px-6 z-[2]">
        <SectionLabel number="03" label="Process" />
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-white max-w-3xl leading-[0.95]">
          From <span className="text-magenta">concept</span> to creation.
        </h2>

        <div className="mt-16 relative">
          <div className="hidden md:block absolute top-9 left-[8%] right-[8%] h-px border-t border-dashed border-magenta/40" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative text-center"
              >
                <div className="relative mx-auto h-[72px] w-[72px] rounded-full bg-near-black border border-magenta/40 flex items-center justify-center mb-4 shadow-[0_0_0_6px_rgba(212,20,142,0.05)]">
                  <span className="font-display text-2xl text-magenta">{s.n}</span>
                </div>
                <h3 className="font-display text-xl text-white tracking-wide">{s.title}</h3>
                <p className="mt-2 text-xs text-metallic font-body leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── FEATURED PROJECT ─────────── */
export function FeaturedProject() {
  return (
    <section id="projects" className="relative py-28 bg-near-black">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <SectionLabel number="04" label="Projects" />
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-white max-w-4xl leading-[0.95]">
          Projects that <span className="text-magenta">define</span> spaces.
        </h2>

        <div className="mt-14 grid lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-2 relative aspect-[16/10] overflow-hidden rounded-lg group"
          >
            <img src={projectHero} alt="Commercial facade project" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="font-sans-brand text-xs uppercase tracking-[0.3em] text-magenta">Commercial · Varanasi</span>
              <h3 className="mt-2 font-display text-4xl md:text-5xl text-white">RM Plaza · Facade & Glazing System</h3>
              <p className="mt-3 text-metallic max-w-xl font-body">
                A 1200 sq.m. blackened-steel facade with custom laser-cut signage panels — delivered in 11 weeks.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-rows-2 gap-5">
            {[
              { img: productGate, cat: "Residential", name: "Heritage Villa Gate" },
              { img: productRailing, cat: "Architectural", name: "Atrium Spiral Railing" },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.1 }}
                className="relative overflow-hidden rounded-lg group"
              >
                <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="font-sans-brand text-[10px] uppercase tracking-[0.3em] text-magenta">{p.cat}</span>
                  <h3 className="mt-1 font-display text-2xl text-white">{p.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── WORKSHOP / ABOUT ─────────── */
export function Workshop() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <LazyClientCanvas
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        cameraPosition={[0, 1, 4]}
        cameraFov={50}
        performance="low"
        interactive={false}
        disableOnMobile
      >
        <LazyWorkshopScene />
      </LazyClientCanvas>

      <div className="relative z-[1] mx-auto max-w-[1400px] px-6 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-[5/4] rounded-lg overflow-hidden shadow-deep"
        >
          <img src={workshop} alt="Veepee workshop floor" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-magenta/30 via-transparent to-transparent mix-blend-overlay" />
          <div className="absolute bottom-6 left-6 right-6 glass rounded-md p-4">
            <div className="font-sans-brand text-[10px] tracking-[0.3em] text-magenta uppercase">Live · Workshop</div>
            <div className="font-display text-xl text-white tracking-wide">Maheshpur Industrial Estate</div>
            <div className="text-xs text-metallic font-body">5kW Fiber Laser · 3000×1500 bed · CNC Press Brake</div>
          </div>
        </motion.div>

        <div>
          <SectionLabel number="05" label="Inside Veepee" />
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[0.95]">
            Built on precision. <br /><span className="text-magenta">Rooted in Varanasi.</span>
          </h2>
          <p className="mt-6 text-metallic font-body leading-relaxed">
            For nearly five decades the Veepee workshop has shaped steel for Eastern India's most
            ambitious buildings and infrastructure. Today, a fiber-laser, CNC press-brake, and
            galvanizing line work alongside master craftsmen who learned the trade on the river-side
            of the Ganga.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-6">
            {[
              { v: "50+", l: "Years" },
              { v: "1000+", l: "Projects" },
              { v: "20+", l: "Categories" },
              { v: "100%", l: "Custom" },
              { v: "Pan-UP", l: "Coverage" },
              { v: "24h", l: "Quote" },
            ].map((s, i) => (
              <CountStat key={i} value={s.v} label={s.l} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CountStat({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [shown, setShown] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) { setShown(value); return; }
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(target * eased) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="border-l border-magenta/40 pl-3" style={{ transitionDelay: `${index * 60}ms` }}>
      <div className="font-display text-3xl md:text-4xl text-white tracking-wide">{shown}</div>
      <div className="font-sans-brand text-[10px] tracking-[0.3em] text-metallic uppercase mt-1">{label}</div>
    </div>
  );
}

/* ─────────── INDUSTRIES TICKER ─────────── */
const industries = [
  "Construction", "Infrastructure", "Industrial", "Architectural",
  "Residential", "Commercial", "Agriculture", "Government",
];

export function IndustriesTicker() {
  return (
    <section className="relative py-16 bg-near-black border-y border-white/5 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...industries, ...industries, ...industries].map((ind, i) => (
          <div key={i} className="flex items-center gap-10 mx-8">
            <span className="font-display text-4xl sm:text-5xl md:text-7xl text-white/10 hover:text-magenta transition-colors tracking-wide">
              {ind}
            </span>
            <span className="h-3 w-3 rotate-45 bg-magenta/60" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────── TESTIMONIALS ─────────── */
const testimonials = [
  {
    quote: "Veepee delivered our entire facade — laser-cut, galvanized, installed — three weeks ahead of schedule. The finish is what convinced our client.",
    name: "Ar. Anika Rao",
    role: "Principal Architect · Studio Rao",
  },
  {
    quote: "We've sourced industrial railings from Veepee for 12 projects. Tolerance, finish, on-time delivery — every single time.",
    name: "Vikram Singh",
    role: "Procurement Head · NCR Infra",
  },
  {
    quote: "The jaali panels for our temple complex look like they were carved by hand. Magnificent precision.",
    name: "R. Mishra",
    role: "Trust Chairman · Kashi Heritage",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % testimonials.length), 5500);
    return () => clearInterval(id);
  }, []);
  const t = testimonials[i];

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-6 text-center">
        <SectionLabel number="06" label="Testimonials" center />
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, k) => (
            <Star key={k} className="h-5 w-5 fill-magenta text-magenta" />
          ))}
        </div>
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-5xl text-white leading-tight tracking-wide"
        >
          “{t.quote}”
        </motion.blockquote>
        <div className="mt-8">
          <div className="font-sans-brand uppercase tracking-[0.25em] text-magenta text-sm">{t.name}</div>
          <div className="font-body text-sm text-metallic mt-1">{t.role}</div>
        </div>
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-magenta" : "w-2 bg-white/20"}`}
              aria-label={`Testimonial ${k + 1}`}
            />
          ))}
        </div>
        <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 font-sans-brand text-xs uppercase tracking-[0.25em] text-metallic">
          <Star className="h-3.5 w-3.5 fill-magenta text-magenta" /> 4.8 on Google · 120+ reviews
        </div>
      </div>
    </section>
  );
}

/* ─────────── CONTACT CTA ─────────── */
export function ContactCTA() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={workshop} alt="" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>
      <LazyClientCanvas
        className="absolute inset-0 z-[1] pointer-events-none opacity-30"
        cameraPosition={[0, 0, 3]}
        cameraFov={45}
        performance="low"
        disableOnMobile
      >
        <LazyContactGear />
      </LazyClientCanvas>
      <div className="relative z-[2] mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="text-center">
          <SectionLabel number="07" label="Get In Touch" center />
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-white leading-[0.95]">
            Get your quote <br /><span className="text-gradient-magenta">within 24 hours.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-metallic font-body">
            Share your drawing, sample, or sketch — our team will respond on WhatsApp with materials,
            timeline, and price.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2 grid gap-4">
            <a
              href="https://wa.me/919125142400"
              target="_blank" rel="noreferrer"
              className="flex items-center gap-3 px-5 py-4 text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md"
              style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
            <a href="tel:+919125142400" className="flex items-center gap-3 px-5 py-4 bg-magenta-gradient text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md shadow-magenta">
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a href="mailto:veepeeengr@gmail.com" className="flex items-center gap-3 px-5 py-4 border border-white/30 text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md hover:bg-white/5 hover:border-magenta">
              <Mail className="h-4 w-4" /> Email
            </a>

            {[
              { icon: MapPin, label: "Workshop", value: "225/1 Maheshpur Industrial Estate, Varanasi 221106, Uttar Pradesh, India" },
              { icon: Shield, label: "GSTIN", value: "09ABTPJ5945P1ZK" },
              { icon: CheckCircle2, label: "UDYAM", value: "UDYAM-UP-75-0001103" },
            ].map((c) => (
              <div key={c.label} className="glass rounded-md p-5">
                <c.icon className="h-4 w-4 text-magenta" />
                <div className="mt-3 font-sans-brand text-[10px] tracking-[0.3em] uppercase text-metallic">{c.label}</div>
                <div className="mt-1 text-white text-sm font-body">{c.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-lg overflow-hidden border border-white/10 shadow-lg">
          <iframe
            title="VEEPEE Engineers Location"
            src="https://maps.google.com/maps?q=225%2F1%2C+Maheshpur+Industrial+Estate%2C+Varanasi%2C+Uttar+Pradesh+221106%2C+India&output=embed"
            width="100%"
            height="360"
            style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-4 text-center">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=225%2F1%2C+Maheshpur+Industrial+Estate%2C+Varanasi%2C+Uttar+Pradesh+221106%2C+India"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-sans-brand uppercase tracking-[0.2em] text-magenta hover:text-white transition-colors"
          >
            <MapPin className="h-4 w-4" /> Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Helpers ─────────── */
function SectionLabel({ number, label, center }: { number: string; label: string; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${center ? "justify-center" : ""}`}>
      <span className="font-display text-magenta text-lg tracking-wider">{number}</span>
      <span className="h-px w-10 bg-magenta" />
      <span className="font-sans-brand text-[11px] tracking-[0.4em] uppercase text-metallic">{label}</span>
    </div>
  );
}

/* ─────────── CATALOGUE CTA ─────────── */
export function CatalogueCTA() {
  const previewImages = [
    "/catalogue/jaali-screens/jaali-1.jpeg",
    "/catalogue/gates/gate-1.jpeg",
    "/catalogue/shadow-art/shadow-3.jpeg",
    "/catalogue/pooja-panels/pooja-1.jpeg",
    "/catalogue/railings/railing-1.jpeg",
    "/catalogue/mirror-frames/mirror-1.jpeg",
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-near-black via-[#0D0D0D] to-near-black overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,20,142,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center"
        >
          <SectionLabel number="✦" label="Product Catalogue" center />
          <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.95]">
            Explore <span className="text-gradient-magenta">65+ Designs</span>
          </h2>
          <p className="mt-4 text-metallic font-body text-base max-w-xl mx-auto">
            From laser-cut jaali screens to designer gates, pooja panels, and shadow art — browse our
            full product catalogue with pricing.
          </p>
        </motion.div>

        {/* Thumbnail preview strip */}
        <div className="mt-12 flex justify-center gap-3 overflow-hidden">
          {previewImages.map((img, i) => (
            <motion.div
              key={img}
              custom={i + 1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative w-32 h-40 sm:w-40 sm:h-48 rounded-lg overflow-hidden border border-white/10 shrink-0 group"
            >
              <img
                src={img}
                alt={`Preview ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={3}
          className="mt-10 text-center"
        >
          <a
            href="/catalogue"
            className="inline-flex items-center gap-3 px-8 py-4 bg-magenta-gradient text-white font-sans-brand text-sm uppercase tracking-[0.2em] rounded-lg hover:shadow-magenta transition-all group"
          >
            Explore Full Catalogue
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── FAQ SECTION ─────────── */
const faqs = [
  {
    q: "What metal fabrication services does VEEPEE Engineers offer?",
    a: "We offer fiber laser cutting, CNC fabrication, custom steel gates & grilles, jaali screens, decorative railings, architectural metalwork, hot-dip galvanizing, industrial manufacturing, pipe repair clamps, dismantling joints, and tubewell fittings — serving residential, commercial, and industrial clients across Varanasi, Uttar Pradesh, and Eastern India.",
  },
  {
    q: "Where is VEEPEE Engineers located in Varanasi?",
    a: "Our workshop is at 225/1 Maheshpur Industrial Estate, Varanasi, Uttar Pradesh 221106. Call us at +91-9125142400 or +91-7985759501, or reach us on WhatsApp 24×7.",
  },
  {
    q: "How do I get a quote for laser cutting or fabrication?",
    a: "Share your drawings, DXF/CAD files, required quantity, and material via WhatsApp (+91-9125142400) or the contact form on this page. We respond within one working day with a detailed quote.",
  },
  {
    q: "Does VEEPEE Engineers supply across India or only in Varanasi?",
    a: "Our workshop is in Varanasi, but we supply across Uttar Pradesh, Bihar, Jharkhand, and Eastern India — including Prayagraj, Mirzapur, Jaunpur, Ghazipur, Chandauli, Bhadohi, and Lucknow.",
  },
  {
    q: "Is VEEPEE Engineers GST registered and UDYAM certified?",
    a: "Yes. GSTIN: 09ABTPJ5945P1ZK. UDYAM: UDYAM-UP-75-0001103. We are a certified MSME unit in Uttar Pradesh, also listed on IndiaMART and JustDial.",
  },
  {
    q: "What materials and thicknesses do you cut?",
    a: "We work with mild steel (MS), stainless steel (SS), aluminium, galvanised iron (GI), and corten steel. Our fiber laser cuts up to 25 mm on mild steel. Finishing options include powder coating, hot-dip galvanizing, and polishing.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section
      id="faq"
      className="relative py-24 bg-near-black border-t border-white/5"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="mx-auto max-w-[900px] px-5 sm:px-6">
        <SectionLabel number="✦" label="FAQ" />
        <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.95] mb-12">
          Common <span className="text-gradient-magenta">Questions</span>
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/8 bg-card overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                aria-expanded={open === i}
              >
                <span
                  className="font-sans-brand text-sm md:text-base tracking-wide text-white group-hover:text-magenta transition-colors"
                  itemProp="name"
                >
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-magenta shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-[500px]" : "max-h-0"
                }`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p
                  className="px-6 pb-5 text-sm text-metallic font-body leading-relaxed"
                  itemProp="text"
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-metallic font-body text-sm mb-4">
            Still have questions? We're happy to help.
          </p>
          <a
            href="https://wa.me/919125142400"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md"
            style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// Hammer is imported but unused in this version; keep for future use
export { Hammer };
