import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { getServiceDetail } from "@/lib/services.functions";
import { getServiceIcon } from "@/lib/service-icons";
import { ServiceImage } from "@/components/service-image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const serviceQuery = (id: string) =>
  queryOptions({
    queryKey: ["service", id],
    queryFn: () => getServiceDetail({ data: { id } }),
  });

export const Route = createFileRoute("/services/$id")({
  loader: async ({ context, params }) => {
    const res = await context.queryClient.ensureQueryData(serviceQuery(params.id));
    if (!res) throw notFound();
    return res;
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    const title = s ? `${s.name} · VEEPEE Engineers` : "Service · VEEPEE Engineers";
    const desc = s?.description ?? "Precision engineering services by VEEPEE Engineers.";
    const image = s?.image_url;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        ...(image ? [
          { property: "og:image", content: image },
          { name: "twitter:image", content: image },
        ] : []),
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-5xl">Service not found</h1>
        <Link to="/" className="mt-6 inline-block text-magenta uppercase tracking-[0.25em] text-sm">
          ← Back home
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl">Couldn't load this service</h1>
        <button
          onClick={reset}
          className="mt-6 px-5 py-3 bg-magenta-gradient rounded-md text-white text-sm uppercase tracking-[0.2em]"
        >
          Try again
        </button>
      </div>
    </div>
  ),
});

function ServiceDetail() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(serviceQuery(id));
  if (!data) return null;
  const { service, images } = data;
  const Icon = getServiceIcon(service.icon);
  const hero = service.image_url ?? images[0]?.url ?? null;
  const rest = images.filter((img) => img.url !== hero);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SiteHeader />

      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-black">
        <ServiceImage
          src={hero}
          alt={service.name}
          eager
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 h-full flex flex-col justify-end pb-16">
          <Link
            to="/"
            hash="services"
            className="inline-flex items-center gap-2 text-metallic text-xs uppercase tracking-[0.25em] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-3 w-3" /> All services
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-magenta" />
            <span className="font-sans-brand text-[10px] tracking-[0.4em] text-magenta uppercase">
              Service
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Icon className="h-10 w-10 text-magenta" strokeWidth={1.5} />
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95]">{service.name}</h1>
          </div>
          <p className="mt-5 max-w-2xl text-metallic font-body text-lg">{service.description}</p>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="py-20 noise">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-magenta" />
              <span className="font-sans-brand text-[10px] tracking-[0.4em] text-magenta uppercase">
                Gallery
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-white max-w-3xl">
              In context, in production.
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((img) => (
                <figure
                  key={img.id}
                  className="group relative rounded-lg overflow-hidden border border-white/5 bg-card"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <ServiceImage
                      src={img.url}
                      alt={img.caption ?? service.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    />
                  </div>
                  {img.caption && (
                    <figcaption className="p-4 text-sm text-metallic font-body">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-near-black border-t border-white/5">
        <div className="mx-auto max-w-[1000px] px-6 text-center">
          <h2 className="font-display text-3xl md:text-5xl">
            Have a project in <span className="text-magenta">{service.name}</span>?
          </h2>
          <p className="mt-4 text-metallic max-w-xl mx-auto">
            Share your specs — drawings, quantity, timeline — and get a quote within one working day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-magenta-gradient text-white uppercase tracking-[0.2em] text-sm rounded-md shadow-magenta"
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/919125142400"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-white uppercase tracking-[0.2em] text-sm rounded-md"
              style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
