import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { 
  Hammer, Compass, Eye, CheckCircle2, 
  ArrowRight, Download, Upload, Loader2, Send, Sparkles 
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ClientCanvas } from "@/components/three/ClientCanvas";
import { ProductModel } from "@/components/three/ProductModel";
import { OrbitControls } from "@react-three/drei";
import { trackEvent } from "@/lib/analytics";

import productJaali from "@/assets/product-jaali.jpg";
import productGate from "@/assets/product-gate.jpg";
import productRailing from "@/assets/product-railing.jpg";
import projectHero from "@/assets/project-hero.jpg";

export const Route = createFileRoute("/architects")({
  head: () => ({
    meta: [
      { title: "Architectural Metalwork & CNC Jaali · VEEPEE Engineers" },
      { name: "description", content: "Premium custom laser-cut railings, gates, CNC jaali facades, and interior metallic partitions. Translating architectural concepts into steel." },
      { property: "og:title", content: "Architectural Metalwork & CNC Jaali · VEEPEE Engineers" },
      { property: "og:description", content: "High-finish custom railings, gates, and facades. Perfect design translation for premium projects." },
      { property: "og:url", content: "/architects" },
    ],
    links: [{ rel: "canonical", href: "/architects" }],
  }),
  component: ArchitectsLandingPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  projectType: z.enum(["residential", "commercial"]),
  city: z.string().trim().min(2, "City is required"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  description: z.string().trim().min(10, "Tell us about your design context"),
  timeline: z.string().trim().min(2, "Provide a target timeline"),
  contactMethod: z.enum(["whatsapp", "email"]),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function ArchitectsLandingPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeModel, setActiveModel] = useState<"jaali" | "gate" | "railing">("jaali");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Errors;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setSubmitting(true);
    const d = parsed.data;

    const text =
      `*New Architect / Builder Enquiry*%0A%0A` +
      `*Name:* ${d.name}%0A` +
      `*Type:* ${d.projectType}%0A` +
      `*City:* ${d.city}%0A` +
      `*Phone:* ${d.phone}%0A` +
      `*Details:* ${encodeURIComponent(d.description)}%0A` +
      `*Timeline:* ${d.timeline}%0A` +
      `*Preferred Reply:* ${d.contactMethod}%0A` +
      (selectedFile ? `*Drawing Reference:* ${encodeURIComponent(selectedFile.name)} (will upload in chat)%0A` : "");

    trackEvent("architect_consultation_submit", { projectType: d.projectType, city: d.city });

    window.open(`https://wa.me/919125142400?text=${text}`, "_blank", "noopener,noreferrer");
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden font-body">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 bg-black">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-auto">
          <ClientCanvas
            className="w-full h-full"
            cameraPosition={[0, 0, 3.5]}
            cameraFov={45}
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} />
            <pointLight position={[-5, -5, -5]} intensity={1.5} />
            <ProductModel type={activeModel} position={[0, 0, 0]} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </ClientCanvas>
        </div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="absolute inset-0 grid-overlay opacity-25 z-[1]" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-16 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 bg-black/60 backdrop-blur-md p-8 rounded-lg border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-magenta" />
              <span className="font-sans-brand text-xs tracking-[0.4em] text-magenta uppercase">
                Premium Metal Finishes
              </span>
            </div>
            <h1 className="font-display text-[9vw] md:text-[5vw] lg:text-[4.5rem] leading-[0.95] text-white">
              Custom Railings, Gates & <span className="text-gradient-magenta">CNC Jaali Systems.</span>
            </h1>
            <p className="mt-6 max-w-xl font-sans-brand text-lg text-metallic">
              Translating complex architectural concepts into precise, installable structural and decorative metal solutions. Made with precision cutting and premium finishes.
            </p>
            
            {/* Interactive Model Toggles */}
            <div className="mt-6 flex gap-2 font-sans-brand">
              <span className="text-xs uppercase tracking-wider text-metallic self-center mr-2">Interactive 3D Preview:</span>
              {(["jaali", "gate", "railing"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveModel(m)}
                  className={`px-3 py-1 text-xs uppercase tracking-wider rounded border transition-all ${
                    activeModel === m
                      ? "bg-magenta border-magenta text-white"
                      : "border-white/20 text-metallic hover:text-white hover:border-white/40"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 font-sans-brand">
              <a
                href="#consultation-form"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-magenta-gradient text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md shadow-magenta hover:shadow-glow transition-all"
              >
                Share Your Drawing
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/VEEPEE_Engineers_Architect_Lookbook.pdf"
                download="VEEPEE_Engineers_Architect_Lookbook.pdf"
                className="inline-flex items-center gap-3 px-6 py-3.5 border border-white/20 text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md hover:bg-white/5 hover:border-magenta transition-all"
              >
                <Download className="h-4 w-4 text-magenta" />
                Download Lookbook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services and Delivery Value */}
      <section className="py-24 border-t border-white/5 noise">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-magenta" />
            <span className="font-sans-brand text-[10px] tracking-[0.4em] text-magenta uppercase">Execution</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white">Precise execution of design intent</h2>
          
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Design-to-Fab Translation",
                desc: "Every custom curve, pattern, and profile translated perfectly using computer-aided fabrication tools."
              },
              {
                icon: Compass,
                title: "Pattern Development",
                desc: "Collaborate to optimize geometric, traditional jaali, or bespoke patterns for optimal strength and visibility."
              },
              {
                icon: Hammer,
                title: "Site-Ready Coordination",
                desc: "Delivered in modular units with standard anchor points, optimized for local site-ready installation."
              },
              {
                icon: Eye,
                title: "Finish & Durability",
                desc: "High-grade finishing, hot-dip galvanizing options, and curing ovens to ensure lifetime resistance."
              }
            ].map((card, i) => (
              <div key={i} className="glass p-8 rounded-lg border border-white/10 hover:border-magenta/50 transition-colors">
                <card.icon className="h-8 w-8 text-magenta mb-5" strokeWidth={1.5} />
                <h3 className="font-display text-xl text-white tracking-wide mb-2">{card.title}</h3>
                <p className="text-sm text-metallic leading-relaxed font-body">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After Case Proof */}
      <section className="py-20 bg-near-black">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-magenta" />
            <span className="font-sans-brand text-[10px] tracking-[0.4em] text-magenta uppercase">Visual Proof</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-10">Commission Gallery</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { img: productJaali, label: "CNC Laser-Cut Jaali Facade" },
              { img: productGate, label: "Premium Wrought-Iron Main Gate" },
              { img: productRailing, label: "Custom Curved Atrium Railing" },
              { img: projectHero, label: "Blackened Steel Facade Panel" }
            ].map((p, i) => (
              <div key={i} className="rounded-lg overflow-hidden relative aspect-[4/5] group">
                <img src={p.img} alt={p.label} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-4">
                  <p className="text-sm text-white font-sans-brand uppercase tracking-wider">{p.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation-form" className="py-24 border-t border-white/5 noise">
        <div className="mx-auto max-w-[800px] px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-magenta" />
              <span className="font-sans-brand text-xs tracking-[0.4em] text-magenta uppercase">Consultation</span>
              <span className="h-px w-10 bg-magenta" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white">Book Design Consultation</h2>
            <p className="mt-3 text-metallic max-w-md mx-auto font-body">
              Upload your elevation drawing or design references. Our engineering architects will schedule a review session.
            </p>
          </div>

          {submitted ? (
            <div className="glass rounded-lg p-10 text-center border border-magenta/40">
              <CheckCircle2 className="h-12 w-12 text-magenta mx-auto mb-4" />
              <h3 className="font-display text-3xl text-white tracking-wide">Consultation Booked</h3>
              <p className="mt-3 text-metallic font-body max-w-lg mx-auto">
                We've compiled your consultation request and opened a WhatsApp session. Please send the message and attach your design reference drawing in the chat window.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 text-xs font-sans-brand uppercase tracking-[0.25em] border border-white/20 rounded text-metallic hover:text-white hover:border-magenta transition-all"
              >
                Submit Another Consultation Request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="glass rounded-lg p-8 border border-white/10 grid gap-6 text-left">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Architect Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.name && <p className="mt-1 text-xs text-magenta">{errors.name}</p>}
                </div>
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Project Type *</label>
                  <select
                    name="projectType"
                    defaultValue="residential"
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  >
                    <option value="residential">Residential Elevation</option>
                    <option value="commercial">Commercial / Retail Spaces</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">City *</label>
                  <input
                    name="city"
                    type="text"
                    required
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.city && <p className="mt-1 text-xs text-magenta">{errors.city}</p>}
                </div>
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-magenta">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Design Context / Description *</label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  placeholder="Dimensions, style ideas, metal finish preferences, staircase layout..."
                  className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                />
                {errors.description && <p className="mt-1 text-xs text-magenta">{errors.description}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Target Completion *</label>
                  <input
                    name="timeline"
                    type="text"
                    required
                    placeholder="e.g. Under 4 weeks, urgent site-ready"
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.timeline && <p className="mt-1 text-xs text-magenta">{errors.timeline}</p>}
                </div>
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Upload Drawing / Reference (Optional)</label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-metallic font-body text-sm flex items-center gap-2 hover:border-white/35 transition-colors">
                      <Upload className="h-4 w-4 text-magenta" />
                      <span className="truncate max-w-[200px]">
                        {selectedFile ? selectedFile.name : "Select JPG/PDF/DWG..."}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-metallic-dark mt-1 font-sans-brand">Files should be sent inside WhatsApp chat when it opens.</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Preferred Communication *</label>
                <select
                  name="contactMethod"
                  defaultValue="whatsapp"
                  className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                >
                  <option value="whatsapp">WhatsApp Consultation</option>
                  <option value="email">Formal E-mail Lookbook & Quote</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-3 px-7 py-4 bg-magenta-gradient text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md shadow-magenta hover:shadow-glow transition-all"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Request Consultation via WhatsApp
                  </>
                )}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-xs text-metallic-dark uppercase tracking-widest font-sans-brand">
            Preferred fabrication partner for architects, interior designers and builders seeking premium execution.
          </p>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
