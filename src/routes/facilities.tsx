import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Factory, Phone, Cog } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { facilities } from "@/data/catalogue-data";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Plant & Machinery · VEEPEE Engineers — Maheshpur Industrial Estate, Varanasi" },
      {
        name: "description",
        content:
          "Our manufacturing capabilities: 5 kW fiber laser, CNC press brake, three-roll pipe bender, CNC machining cell, powder coating, galvanizing partner line and multi-station welding bays.",
      },
      { property: "og:title", content: "VEEPEE Engineers — Plant & Machinery" },
      {
        property: "og:description",
        content:
          "Inside the Maheshpur workshop: fiber laser cutting, press-brake forming, three-roll bending, CNC machining, powder coating and welding.",
      },
    ],
    links: [{ rel: "canonical", href: "/facilities" }],
  }),
  component: FacilitiesPage,
});

function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <SiteHeader />

      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-near-black overflow-hidden">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative rounded-xl p-6 bg-card border border-white/5 hover:border-magenta/40 transition-all"
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
              </motion.div>
            ))}
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
