import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, MapPin, Calendar, Tag } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getProjectBySlug, projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project not found · VEEPEE Engineers" }] };
    const title = `${p.title} · VEEPEE Engineers`;
    return {
      meta: [
        { title },
        { name: "description", content: p.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
        { property: "og:image", content: p.cover },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: p.cover },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p.title,
            description: p.summary,
            image: p.cover,
            dateCreated: p.year,
            locationCreated: { "@type": "Place", name: p.location },
            creator: { "@type": "Organization", name: "VEEPEE Engineers" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0A0A0A] text-white grid place-items-center px-6">
      <div className="text-center">
        <h1 className="font-display text-6xl text-magenta">404</h1>
        <p className="mt-3 text-metallic">That project doesn't exist.</p>
        <Link to="/projects" className="mt-6 inline-block px-5 py-2 border border-white/20 rounded font-sans-brand text-xs uppercase tracking-[0.25em] hover:border-magenta">
          All projects
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="min-h-screen bg-[#0A0A0A] text-white grid place-items-center px-6">
      <div className="text-center">
        <h1 className="font-display text-4xl text-white">Something went wrong</h1>
        <Link to="/" className="mt-6 inline-block px-5 py-2 border border-white/20 rounded font-sans-brand text-xs uppercase tracking-[0.25em] hover:border-magenta">
          Home
        </Link>
      </div>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  const others = projects.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <SiteHeader />
      <main>
        <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
          <img src={p.cover} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black" />
          <div className="relative h-full flex items-end">
            <div className="mx-auto max-w-[1400px] w-full px-6 pb-14">
              <Link to="/projects" className="inline-flex items-center gap-2 text-magenta font-sans-brand text-xs uppercase tracking-[0.3em] hover:text-white">
                <ArrowLeft className="h-3 w-3" /> All Projects
              </Link>
              <div className="mt-4 flex flex-wrap gap-4 text-[11px] font-sans-brand uppercase tracking-[0.3em] text-metallic">
                <span className="flex items-center gap-2"><Tag className="h-3 w-3 text-magenta" /> {p.category}</span>
                <span className="flex items-center gap-2"><MapPin className="h-3 w-3 text-magenta" /> {p.location}</span>
                <span className="flex items-center gap-2"><Calendar className="h-3 w-3 text-magenta" /> {p.year}</span>
              </div>
              <h1 className="mt-4 font-display text-5xl md:text-7xl text-white leading-[0.95] max-w-5xl">{p.title}</h1>
              <p className="mt-5 max-w-2xl text-metallic font-body text-lg">{p.summary}</p>
            </div>
          </div>
        </section>

        <section className="relative py-24">
          <div className="mx-auto max-w-[1400px] px-6 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide">Brief & Delivery</h2>
              <p className="mt-5 text-metallic font-body leading-relaxed">{p.body}</p>

              <h3 className="mt-12 font-display text-2xl text-white tracking-wide">Scope of work</h3>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {p.scope.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-metallic font-body">
                    <span className="h-1.5 w-1.5 rotate-45 bg-magenta" /> {s}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="grid grid-cols-2 gap-3 h-fit">
              {p.stats.map((s) => (
                <div key={s.label} className="border border-white/10 rounded-md p-5">
                  <div className="font-display text-3xl text-white">{s.value}</div>
                  <div className="mt-1 font-sans-brand text-[10px] uppercase tracking-[0.3em] text-metallic">{s.label}</div>
                </div>
              ))}
              <a
                href={`https://wa.me/919000000000?text=${encodeURIComponent(`Hello, I'd like a similar project to ${p.title}.`)}`}
                target="_blank" rel="noreferrer"
                className="col-span-2 inline-flex items-center justify-center gap-3 px-5 py-4 text-white font-sans-brand uppercase tracking-[0.2em] text-xs rounded-md"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
              >
                <MessageCircle className="h-4 w-4" /> Enquire about this project
              </a>
            </aside>
          </div>
        </section>

        <section className="relative pb-24">
          <div className="mx-auto max-w-[1400px] px-6">
            <h3 className="font-display text-3xl text-white tracking-wide">Gallery</h3>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {p.gallery.map((g, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img src={g} alt={`${p.title} ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 bg-near-black border-t border-white/5">
          <div className="mx-auto max-w-[1400px] px-6">
            <h3 className="font-display text-3xl text-white tracking-wide">More projects</h3>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((o) => (
                <Link key={o.slug} to="/projects/$slug" params={{ slug: o.slug }} className="group relative aspect-[4/5] overflow-hidden rounded-lg">
                  <img src={o.cover} alt={o.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="font-sans-brand text-[10px] uppercase tracking-[0.3em] text-magenta">{o.category}</div>
                    <div className="mt-1 font-display text-xl text-white">{o.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
