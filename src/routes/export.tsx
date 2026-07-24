import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { 
  Building2, Globe, FileText, CheckCircle2, 
  ArrowRight, Download, Upload, Loader2, Send 
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { LazyClientCanvas } from "@/components/three/lazy";
import { LazyWorkshopScene } from "@/components/three/lazy";
import { trackEvent } from "@/lib/analytics";

const workshopImg = "/assets/banners/industrial-manufacturing-hero.webp";
const productIndustrial = "/catalogue/industrial/cat-34.webp";
const projectHero = "/catalogue/self-designing-facades/facade-sample.png";

export const Route = createFileRoute("/export")({
  head: () => ({
    meta: [
      { title: "Export Custom Metal Fabrication · VEEPEE Engineers" },
      { name: "description", content: "Reliable B2B custom metal fabrication and laser cutting export services. Built for precision and international delivery standards." },
      { property: "og:title", content: "Export Custom Metal Fabrication · VEEPEE Engineers" },
      { property: "og:description", content: "Reliable B2B custom metal fabrication export services. Certified quality and packaging standards." },
      { property: "og:url", content: "/export" },
    ],
    links: [{ rel: "canonical", href: "/export" }],
  }),
  component: ExportLandingPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  company: z.string().trim().min(2, "Company name is required"),
  country: z.string().trim().min(2, "Country is required"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  description: z.string().trim().min(10, "Provide a brief description of specifications"),
  quantity: z.string().trim().min(1, "Please specify estimated quantity"),
  timeline: z.string().trim().min(2, "Please specify target delivery timeline"),
  contactMethod: z.enum(["whatsapp", "email"]),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function ExportLandingPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    // Build the WhatsApp message details
    const text =
      `*New Export B2B RFQ Enquiry*%0A%0A` +
      `*Name:* ${d.name}%0A` +
      `*Company:* ${d.company}%0A` +
      `*Country:* ${d.country}%0A` +
      `*Phone:* ${d.phone}%0A` +
      `*Specs:* ${encodeURIComponent(d.description)}%0A` +
      `*Quantity:* ${d.quantity}%0A` +
      `*Timeline:* ${d.timeline}%0A` +
      `*Preferred Reply:* ${d.contactMethod}%0A` +
      (selectedFile ? `*Attached Drawing:* ${encodeURIComponent(selectedFile.name)} (will upload in chat)%0A` : "");

    trackEvent("export_rfq_submit", { company: d.company, country: d.country });

    // Open WhatsApp
    window.open(`https://wa.me/919125142400?text=${text}`, "_blank", "noopener,noreferrer");
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden font-body">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 bg-black">
        <LazyClientCanvas
          className="absolute inset-0 z-0 opacity-30 pointer-events-none"
          cameraPosition={[0, 1.5, 4.5]}
          cameraFov={50}
        >
          <LazyWorkshopScene />
        </LazyClientCanvas>

        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="absolute inset-0 grid-overlay opacity-25 z-[1]" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-16 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-magenta" />
              <span className="font-sans-brand text-xs tracking-[0.4em] text-magenta uppercase">
                Global B2B Solutions
              </span>
            </div>
            <h1 className="font-display text-[9vw] md:text-[5vw] lg:text-[4.5rem] leading-[0.95] text-white">
              Precision-Engineered Fabrication & <span className="text-gradient-magenta">Export Reliability.</span>
            </h1>
            <p className="mt-6 max-w-xl font-sans-brand text-lg text-metallic">
              Share your technical specifications and drawings. VEEPEE Engineers delivers export-ready custom metal fabrication and laser cutting with strict QA controls.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 font-sans-brand">
              <a
                href="#rfq-form"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-magenta-gradient text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md shadow-magenta hover:shadow-glow transition-all"
              >
                Request Export Quotation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/VEEPEE_Engineers_Capability_Deck.pdf"
                download="VEEPEE_Engineers_Capability_Deck.pdf"
                className="inline-flex items-center gap-3 px-6 py-3.5 border border-white/20 text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md hover:bg-white/5 hover:border-magenta transition-all"
              >
                <Download className="h-4 w-4 text-magenta" />
                Download Capability Deck
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 border-t border-white/5 noise">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-magenta" />
            <span className="font-sans-brand text-[10px] tracking-[0.4em] text-magenta uppercase">Benefits</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white">Why international buyers choose VEEPEE</h2>
          
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle2,
                title: "Engineering-Led QA",
                desc: "Strict quality checks at every fabrication step to ensure compliance with drawings and standards."
              },
              {
                icon: Globe,
                title: "Drawing Interpretation",
                desc: "Expert engineer review of metric/imperial CAD files and detailed material specification guidance."
              },
              {
                icon: FileText,
                title: "Export-Ready Packaging",
                desc: "Structured packing, anti-rust coating application, and containerized handling for secure global transport."
              },
              {
                icon: Building2,
                title: "Efficient Coordination",
                desc: "Responsive communications, transparent tracking logs, and reliable project scheduling."
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

      {/* Gallery Section */}
      <section className="py-20 bg-near-black">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-magenta" />
            <span className="font-sans-brand text-[10px] tracking-[0.4em] text-magenta uppercase">Capability Proof</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-10">Maheshpur Plant & Logistics</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden relative aspect-video group">
              <img src={workshopImg} alt="Veepee workshop floor" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <p className="text-sm text-white font-sans-brand uppercase tracking-wider">Manufacturing Plant</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden relative aspect-video group">
              <img src={productIndustrial} alt="Industrial products" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <p className="text-sm text-white font-sans-brand uppercase tracking-wider">B2B Heavy Components</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden relative aspect-video group">
              <img src={projectHero} alt="Finished projects" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <p className="text-sm text-white font-sans-brand uppercase tracking-wider">Shipment Assembly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RFQ Form */}
      <section id="rfq-form" className="py-24 border-t border-white/5 noise">
        <div className="mx-auto max-w-[800px] px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-magenta" />
              <span className="font-sans-brand text-xs tracking-[0.4em] text-magenta uppercase">Submit specs</span>
              <span className="h-px w-10 bg-magenta" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white">Request Export Quote</h2>
            <p className="mt-3 text-metallic max-w-md mx-auto font-body">
              Provide your project requirements below. Our engineering department will evaluate and share quote terms.
            </p>
          </div>

          {submitted ? (
            <div className="glass rounded-lg p-10 text-center border border-magenta/40">
              <CheckCircle2 className="h-12 w-12 text-magenta mx-auto mb-4" />
              <h3 className="font-display text-3xl text-white tracking-wide">RFQ Submitted</h3>
              <p className="mt-3 text-metallic font-body max-w-lg mx-auto">
                We've compiled your enquiry and opened a WhatsApp session. Please send the message and attach your drawings directly in the chat to complete the RFQ request.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 text-xs font-sans-brand uppercase tracking-[0.25em] border border-white/20 rounded text-metallic hover:text-white hover:border-magenta transition-all"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="glass rounded-lg p-8 border border-white/10 grid gap-6 text-left">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Contact Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.name && <p className="mt-1 text-xs text-magenta">{errors.name}</p>}
                </div>
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Company Name *</label>
                  <input
                    name="company"
                    type="text"
                    required
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.company && <p className="mt-1 text-xs text-magenta">{errors.company}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Country *</label>
                  <input
                    name="country"
                    type="text"
                    required
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.country && <p className="mt-1 text-xs text-magenta">{errors.country}</p>}
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
                <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Product & Specifications *</label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  placeholder="Material grade, tolerances, finish requirements..."
                  className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                />
                {errors.description && <p className="mt-1 text-xs text-magenta">{errors.description}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Estimated Quantity *</label>
                  <input
                    name="quantity"
                    type="text"
                    required
                    placeholder="e.g. 500 units, 10 Metric Tons"
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.quantity && <p className="mt-1 text-xs text-magenta">{errors.quantity}</p>}
                </div>
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Target Delivery *</label>
                  <input
                    name="timeline"
                    type="text"
                    required
                    placeholder="e.g. Under 6 weeks, Oct 2026"
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.timeline && <p className="mt-1 text-xs text-magenta">{errors.timeline}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Preferred Reply Channel *</label>
                  <select
                    name="contactMethod"
                    defaultValue="whatsapp"
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  >
                    <option value="whatsapp">WhatsApp Business Chat</option>
                    <option value="email">Formal E-mail Reply</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Attach Drawing (Optional)</label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-metallic font-body text-sm flex items-center gap-2 hover:border-white/35 transition-colors">
                      <Upload className="h-4 w-4 text-magenta" />
                      <span className="truncate max-w-[200px]">
                        {selectedFile ? selectedFile.name : "Select CAD/PDF file..."}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-metallic-dark mt-1">Please upload the file in the chat after WhatsApp opens.</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-4 w-full inline-flex items-center justify-center gap-3 px-7 py-4 bg-magenta-gradient text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md shadow-magenta hover:shadow-glow transition-all"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit RFQ & Open WhatsApp
                  </>
                )}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-xs text-metallic-dark uppercase tracking-widest font-sans-brand">
            Trusted engineering and fabrication partner for architectural, industrial and custom metal requirements.
          </p>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
