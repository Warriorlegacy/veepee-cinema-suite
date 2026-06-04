import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects · VEEPEE Engineers — Industrial & Architectural Steel Works" },
      { name: "description", content: "Selected projects in laser cutting, CNC fabrication, architectural metalwork and industrial manufacturing across Eastern India." },
      { property: "og:title", content: "Projects · VEEPEE Engineers" },
      { property: "og:description", content: "Selected industrial and architectural steel projects by VEEPEE Engineers, Varanasi." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <SiteHeader />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-magenta text-lg tracking-wider">04</span>
            <span className="h-px w-10 bg-magenta" />
            <span className="font-sans-brand text-[11px] tracking-[0.4em] uppercase text-metallic">Projects</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white max-w-4xl leading-[0.95]">
            Work that <span className="text-magenta">defines</span> spaces.
          </h1>
          <p className="mt-5 max-w-2xl text-metallic font-body">
            A selection of architectural and industrial commissions delivered from our Maheshpur workshop.
          </p>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-card"
              >
                <img
                  src={p.cover}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-magenta/90 text-white text-[10px] font-sans-brand uppercase tracking-[0.25em]">
                  {p.category}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="font-sans-brand text-[10px] uppercase tracking-[0.3em] text-magenta">{p.location} · {p.year}</div>
                  <h2 className="mt-1 font-display text-2xl text-white tracking-wide">{p.title}</h2>
                  <div className="mt-2 flex items-center gap-2 text-magenta font-sans-brand text-xs uppercase tracking-[0.25em] opacity-80 group-hover:opacity-100">
                    View case <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
