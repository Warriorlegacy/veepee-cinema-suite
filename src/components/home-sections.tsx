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
import { ClientCanvas } from "@/components/three/ClientCanvas";
import { HeroScene } from "@/components/three/HeroScene";
import { FloatingIcon } from "@/components/three/FloatingIcon";
import { ProductModel } from "@/components/three/ProductModel";
import { ProcessPipeline } from "@/components/three/ProcessPipeline";
import { WorkshopScene } from "@/components/three/WorkshopScene";
import { ContactGear } from "@/components/three/ContactGear";

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
    <section ref={ref} className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black">
      {/* 3D Laser Scene */}
      <ClientCanvas
        className="absolute inset-0 z-0"
        cameraPosition={[0, 0, 5]}
        cameraFov={60}
      >
        <HeroScene />
      </ClientCanvas>

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

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16">
          <div className="max-w-4xl">
            <div className="hero-fade hero-fade-1 flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-magenta" />
              <span className="font-sans-brand text-xs tracking-[0.4em] text-magenta uppercase">
                Precision Engineering · Since 1976
              </span>
            </div>

            <h1
              className="hero-fade hero-fade-2 font-display text-[14vw] md:text-[8.5vw] lg:text-[7.5rem] leading-[0.85] text-white"
            >
              ENGINEERING
              <br />
              <span className="text-gradient-magenta">PRECISION.</span>
            </h1>
            <h2
              className="hero-fade hero-fade-3 font-display text-[10vw] md:text-[6vw] lg:text-[5.5rem] leading-[0.9] text-metallic/80 mt-1"
            >
              DELIVERING EXCELLENCE.
            </h2>

            <p
              className="hero-fade hero-fade-4 mt-8 max-w-2xl font-sans-brand text-base md:text-lg tracking-wide text-metallic"
            >
              Laser Cutting · CNC Fabrication · Industrial Manufacturing · Architectural Metal Works.
              Rooted in the steel heritage of Varanasi, built for India's most demanding projects.
            </p>

            <div className="hero-fade hero-fade-5 mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-magenta-gradient text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md shadow-magenta hover:shadow-glow transition-all"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-3 px-7 py-4 border border-white/30 text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md hover:bg-white/5 hover:border-magenta transition-all"
              >
                View Our Work
              </a>
              <a
                href="https://wa.me/919125142400"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-7 py-4 text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md transition-all"
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
    <section id="services" className="relative py-28 noise overflow-hidden">
      <ClientCanvas
        className="absolute inset-0 z-0 pointer-events-none"
        cameraPosition={[0, 0, 8]}
        cameraFov={60}
        performance="low"
      >
        <FloatingIcon position={[-3, 2, -2]} shape="torus" speed={0.6} scale={0.8} />
        <FloatingIcon position={[3, -1, -3]} shape="icosahedron" speed={0.8} scale={0.6} />
        <FloatingIcon position={[-2, -2, -4]} shape="box" speed={0.4} scale={0.7} />
        <FloatingIcon position={[4, 1.5, -5]} shape="sphere" speed={0.9} scale={0.5} />
        <FloatingIcon position={[0, 3, -6]} shape="octahedron" speed={0.7} scale={0.6} />
      </ClientCanvas>
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionLabel number="01" label="Services" />
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl text-white max-w-4xl leading-[0.95]"
        >
          We shape <span className="text-magenta">steel</span> into possibilities.
        </motion.h2>
        <p className="mt-5 max-w-2xl text-metallic font-body">
          Integrated capabilities under one roof — from a single laser-cut sheet to full
          architectural installations.
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
const products = [
  { img: productGate, category: "Gates", name: "Heritage Wrought Gate" },
  { img: productJaali, category: "Jaali", name: "Mandala Laser Panel" },
  { img: productRailing, category: "Railings", name: "Stainless Spiral Railing" },
  { img: productIndustrial, category: "Industrial", name: "Structural Steel Frame" },
];

export function Products() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Gates", "Railings", "Jaali", "Industrial"];
  const visible = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <section id="products" className="relative py-28 bg-near-black">
      <ClientCanvas
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        cameraPosition={[0, 0, 5]}
        cameraFov={50}
        performance="low"
      >
        <ProductModel type="jaali" position={[-0.5, 1, -3]} />
        <ProductModel type="gate" position={[2, -0.5, -4]} />
        <ProductModel type="industrial" position={[-2, -0.8, -5]} />
      </ClientCanvas>
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionLabel number="02" label="Featured Products" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display text-5xl md:text-7xl text-white max-w-3xl leading-[0.95]">
            Premium products. <br /><span className="text-gradient-magenta">Precision crafted.</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-sans-brand uppercase tracking-[0.2em] rounded-full border transition-all ${
                  filter === f
                    ? "bg-magenta-gradient text-white border-transparent shadow-magenta"
                    : "border-white/15 text-metallic hover:border-magenta hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((p, i) => (
            <motion.a
              key={p.name}
              href="#contact"
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-card"
            >
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-magenta/90 text-white text-[10px] font-sans-brand uppercase tracking-[0.25em]">
                {p.category}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-2xl text-white tracking-wide">{p.name}</h3>
                <div className="mt-2 flex items-center gap-2 text-magenta font-sans-brand text-xs uppercase tracking-[0.25em] opacity-80 group-hover:opacity-100">
                  Enquire <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
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
      <ClientCanvas
        className="absolute inset-0 z-[1] pointer-events-none opacity-40"
        cameraPosition={[0, 0, 8]}
        cameraFov={50}
        performance="low"
      >
        <ProcessPipeline />
      </ClientCanvas>
      <div className="relative mx-auto max-w-[1400px] px-6 z-[2]">
        <SectionLabel number="03" label="Process" />
        <h2 className="font-display text-5xl md:text-7xl text-white max-w-3xl leading-[0.95]">
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
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionLabel number="04" label="Projects" />
        <h2 className="font-display text-5xl md:text-7xl text-white max-w-4xl leading-[0.95]">
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
      <ClientCanvas
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        cameraPosition={[0, 1, 4]}
        cameraFov={50}
        performance="low"
      >
        <WorkshopScene />
      </ClientCanvas>
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
          <h2 className="font-display text-5xl md:text-6xl text-white leading-[0.95]">
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
            <span className="font-display text-5xl md:text-7xl text-white/10 hover:text-magenta transition-colors tracking-wide">
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
    <section className="relative py-28">
      <div className="mx-auto max-w-[1100px] px-6 text-center">
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
      <ClientCanvas
        className="absolute inset-0 z-[1] pointer-events-none opacity-30"
        cameraPosition={[0, 0, 3]}
        cameraFov={45}
        performance="low"
      >
        <ContactGear />
      </ClientCanvas>
      <div className="relative z-[2] mx-auto max-w-[1200px] px-6">
        <div className="text-center">
          <SectionLabel number="07" label="Get In Touch" center />
          <h2 className="font-display text-5xl md:text-7xl text-white leading-[0.95]">
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

// Hammer is imported but unused in this version; keep for future use
export { Hammer };
