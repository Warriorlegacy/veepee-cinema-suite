import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { 
  Shield, CheckCircle2, ArrowRight, Download, 
  Upload, Loader2, Send, FileText, Factory, Clock 
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { LogoWatermark } from "@/components/ui/logo-watermark";
import { LazyClientCanvas } from "@/components/three/lazy";
import { LazyProcessPipeline } from "@/components/three/lazy";
import { trackEvent } from "@/lib/analytics";

const productIndustrial = "/catalogue/generated/p_fb_1.webp";
const workshopImg = "/assets/banners/industrial-manufacturing-hero.webp";

export const Route = createFileRoute("/procurement")({
  head: () => ({
    meta: [
      { title: "Industrial Procurement & CNC Fabrication · VEEPEE Engineers" },
      { name: "description", content: "Reliable engineering and metal fabrication vendor for industrial, public sector, and institutional procurement requirements in Varanasi." },
      { property: "og:title", content: "Industrial Procurement & CNC Fabrication · VEEPEE Engineers" },
      { property: "og:description", content: "High-capacity metal fabrication, CNC laser cutting, and hot-dip galvanizing for procurement teams." },
      { property: "og:url", content: "/procurement" },
    ],
    links: [{ rel: "canonical", href: "/procurement" }],
  }),
  component: ProcurementLandingPage,
});

const schema = z.object({
  organizationName: z.string().trim().min(2, "Organization name must be at least 2 characters"),
  departmentProject: z.string().trim().min(2, "Department/Project details are required"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  description: z.string().trim().min(10, "Please describe the scope of BOQ/Specs"),
  quantity: z.string().trim().min(1, "Please specify estimated quantity"),
  requiredDate: z.string().trim().min(2, "Please specify required delivery date"),
  contactDesignation: z.string().trim().min(2, "Your contact designation is required"),
  contactMethod: z.enum(["whatsapp", "email"]),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function ProcurementLandingPage() {
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

    const text =
      `*New Industrial / Govt Procurement Enquiry*%0A%0A` +
      `*Org Name:* ${d.organizationName}%0A` +
      `*Dept/Proj:* ${d.departmentProject}%0A` +
      `*Designation:* ${d.contactDesignation}%0A` +
      `*Phone:* ${d.phone}%0A` +
      `*Details:* ${encodeURIComponent(d.description)}%0A` +
      `*Quantity:* ${d.quantity}%0A` +
      `*Delivery By:* ${d.requiredDate}%0A` +
      `*Preferred Reply:* ${d.contactMethod}%0A` +
      (selectedFile ? `*BOQ File:* ${encodeURIComponent(selectedFile.name)} (will upload in chat)%0A` : "");

    trackEvent("procurement_enquiry_submit", { org: d.organizationName, designation: d.contactDesignation });

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
          className="absolute inset-0 z-0 opacity-45 pointer-events-none"
          cameraPosition={[0, 0, 5.5]}
          cameraFov={45}
        >
          <LazyProcessPipeline />
        </LazyClientCanvas>

        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="absolute inset-0 grid-overlay opacity-25 z-[1]" />
        <LogoWatermark opacity={0.08} size={700} position="top-right" glow={true} className="z-[1]" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-16 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 bg-black/60 backdrop-blur-md p-8 rounded-lg border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-magenta" />
              <span className="font-sans-brand text-xs tracking-[0.4em] text-magenta uppercase">
                Institutional Partnerships
              </span>
            </div>
            <h1 className="font-display text-[9vw] md:text-[5vw] lg:text-[4.5rem] leading-[0.95] text-white">
              Reliable Partner for <span className="text-gradient-magenta">Industrial Supply.</span>
            </h1>
            <p className="mt-6 max-w-xl font-sans-brand text-lg text-metallic">
              Request our technical capability statement or submit your formal BOQ/tender requirements. VEEPEE Engineers guarantees documentation-ready compliance and timeline discipline.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 font-sans-brand">
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-magenta-gradient text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md shadow-magenta hover:shadow-glow transition-all"
              >
                Submit Requirement for Quotation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/VEEPEE_Engineers_Capability_Statement.pdf"
                download="VEEPEE_Engineers_Capability_Statement.pdf"
                className="inline-flex items-center gap-3 px-6 py-3.5 border border-white/20 text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md hover:bg-white/5 hover:border-magenta transition-all"
              >
                <Download className="h-4 w-4 text-magenta" />
                Request Capability Statement
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Trust Cards */}
      <section className="py-24 border-t border-white/5 noise">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-magenta" />
            <span className="font-sans-brand text-[10px] tracking-[0.4em] text-magenta uppercase">Compliance</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white">Structured process & high capacity</h2>
          
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Quality Repeatability",
                desc: "Repeatable fabrication standards utilizing modern CNC machinery, minimizing geometric tolerance errors."
              },
              {
                icon: Factory,
                title: "Volume Capacity",
                desc: "Equipped to handle high tonnage project orders, bulk structural elements, and municipal fitting requirements."
              },
              {
                icon: FileText,
                title: "Doc-Ready Workflow",
                desc: "Ready compliance documentation: Mill test certificates, hot-dip galvanizing test logs, and formal invoice setups."
              },
              {
                icon: Clock,
                title: "Timeline Discipline",
                desc: "Strict adherence to agreed manufacturing schedules, backed by our large material inventory."
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

      {/* Plant Capability Showcase */}
      <section className="py-20 bg-near-black">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-magenta" />
            <span className="font-sans-brand text-[10px] tracking-[0.4em] text-magenta uppercase">Plant Assets</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-10">Production Capacity</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden relative aspect-[16/9] group">
              <img src={workshopImg} alt="Laser Cutting bed" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="font-display text-2xl text-white tracking-wide">CNC Laser & Press Brake Center</h3>
                <p className="text-sm text-metallic font-body mt-2">Precision sheet cutting up to 20mm thickness, with 3-meter press bending tolerance management.</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden relative aspect-[16/9] group">
              <img src={productIndustrial} alt="Tubes and fittings" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="font-display text-2xl text-white tracking-wide">Industrial Fitting Assembly</h3>
                <p className="text-sm text-metallic font-body mt-2">High-volume production of municipal tubewell fittings, columns, beams, and customized structural brackets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formal Request Form */}
      <section id="enquiry-form" className="py-24 border-t border-white/5 noise">
        <div className="mx-auto max-w-[800px] px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-magenta" />
              <span className="font-sans-brand text-xs tracking-[0.4em] text-magenta uppercase">Formal RFQ</span>
              <span className="h-px w-10 bg-magenta" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white">Submit Procurement RFQ</h2>
            <p className="mt-3 text-metallic max-w-md mx-auto font-body">
              Upload your technical BOQ spreadsheet or specification sheet. Our sales estimators will respond within one working day.
            </p>
          </div>

          {submitted ? (
            <div className="glass rounded-lg p-10 text-center border border-magenta/40">
              <CheckCircle2 className="h-12 w-12 text-magenta mx-auto mb-4" />
              <h3 className="font-display text-3xl text-white tracking-wide">RFQ Submitted</h3>
              <p className="mt-3 text-metallic font-body max-w-lg mx-auto">
                We've compiled your procurement details and opened a WhatsApp session. Please send the message and attach your BOQ/drawing files in the chat window.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 text-xs font-sans-brand uppercase tracking-[0.25em] border border-white/20 rounded text-metallic hover:text-white hover:border-magenta transition-all"
              >
                Submit Another Procurement Request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="glass rounded-lg p-8 border border-white/10 grid gap-6 text-left">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Organization Name *</label>
                  <input
                    name="organizationName"
                    type="text"
                    required
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.organizationName && <p className="mt-1 text-xs text-magenta">{errors.organizationName}</p>}
                </div>
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Department / Project *</label>
                  <input
                    name="departmentProject"
                    type="text"
                    required
                    placeholder="e.g. Water Works division, NHAI Highway Project"
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.departmentProject && <p className="mt-1 text-xs text-magenta">{errors.departmentProject}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Designation *</label>
                  <input
                    name="contactDesignation"
                    type="text"
                    required
                    placeholder="e.g. Project Manager, Purchasing Officer"
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.contactDesignation && <p className="mt-1 text-xs text-magenta">{errors.contactDesignation}</p>}
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
                <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Specifications Scope *</label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  placeholder="Material specs, IS code standards required, galvanizing micron levels..."
                  className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                />
                {errors.description && <p className="mt-1 text-xs text-magenta">{errors.description}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Quantity *</label>
                  <input
                    name="quantity"
                    type="text"
                    required
                    placeholder="e.g. 2000 units, 15 Metric Tons"
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.quantity && <p className="mt-1 text-xs text-magenta">{errors.quantity}</p>}
                </div>
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Required Delivery Date *</label>
                  <input
                    name="requiredDate"
                    type="text"
                    required
                    placeholder="e.g. 15 September 2026"
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  />
                  {errors.requiredDate && <p className="mt-1 text-xs text-magenta">{errors.requiredDate}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Preferred Communication *</label>
                  <select
                    name="contactMethod"
                    defaultValue="whatsapp"
                    className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
                  >
                    <option value="whatsapp">WhatsApp Enquiry Session</option>
                    <option value="email">Formal E-mail Quotation</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1.5 font-sans-brand text-xs uppercase tracking-wider text-metallic">Upload BOQ / Specification Sheet</label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-metallic font-body text-sm flex items-center gap-2 hover:border-white/35 transition-colors">
                      <Upload className="h-4 w-4 text-magenta" />
                      <span className="truncate max-w-[200px]">
                        {selectedFile ? selectedFile.name : "Select XLSX/PDF/DWG..."}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-metallic-dark mt-1 font-sans-brand">Please upload this document in WhatsApp chat when it opens.</p>
                </div>
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
                    Submit BOQ & Open WhatsApp
                  </>
                )}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-xs text-metallic-dark uppercase tracking-widest font-sans-brand">
            Engineering and fabrication vendor ready to support tender, institutional and industrial supply requirements.
          </p>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
