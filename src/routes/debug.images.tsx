import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { listServices, listServiceImages, type Service, type ServiceImageRow } from "@/lib/services.functions";

const RESPONSIVE_WIDTHS = [400, 800, 1600] as const;

const servicesQuery = queryOptions({
  queryKey: ["debug", "services"],
  queryFn: () => listServices(),
});

export const Route = createFileRoute("/debug/images")({
  loader: ({ context }) => context.queryClient.ensureQueryData(servicesQuery),
  head: () => ({
    meta: [
      { title: "Debug · Service image URLs" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DebugImages,
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Debug page error</h1>
      <pre className="text-red-400 text-sm">{String(error)}</pre>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-white/10 rounded">Retry</button>
    </div>
  ),
});

type UrlVariant = { width: number; url: string };

function buildVariants(url: string): UrlVariant[] {
  const m = url.match(/^(.+)-(\d+)\.jpg(\?.*)?$/);
  if (!m) return [{ width: 0, url }];
  const base = m[1];
  const qs = m[3] ?? "";
  return RESPONSIVE_WIDTHS.map((w) => ({ width: w, url: `${base}-${w}.jpg${qs}` }));
}

type ProbeStatus = "pending" | "ok" | "fail";
type ProbeResult = { status: ProbeStatus; httpStatus?: number; bytes?: number; error?: string };

function useProbe(urls: string[]) {
  const [results, setResults] = useState<Record<string, ProbeResult>>({});

  useEffect(() => {
    let cancelled = false;
    setResults(Object.fromEntries(urls.map((u) => [u, { status: "pending" as const }])));
    (async () => {
      for (const url of urls) {
        try {
          const res = await fetch(url, { method: "GET", cache: "no-store" });
          const blob = await res.blob();
          if (cancelled) return;
          setResults((prev) => ({
            ...prev,
            [url]: {
              status: res.ok ? "ok" : "fail",
              httpStatus: res.status,
              bytes: blob.size,
            },
          }));
        } catch (e) {
          if (cancelled) return;
          setResults((prev) => ({
            ...prev,
            [url]: { status: "fail", error: (e as Error).message },
          }));
        }
      }
    })();
    return () => { cancelled = true; };
  }, [urls.join("|")]);

  return results;
}

function ServiceBlock({ service }: { service: Service }) {
  const { data: images } = useSuspenseQuery(
    queryOptions({
      queryKey: ["debug", "service-images", service.id],
      queryFn: () => listServiceImages({ data: { serviceId: service.id } }),
    }),
  );

  const heroUrl = service.image_url ?? images[0]?.url ?? null;
  const allImages: { label: string; row: Pick<ServiceImageRow, "id" | "url" | "caption"> | null }[] = [
    { label: "services.image_url (hero)", row: heroUrl ? { id: "hero", url: heroUrl, caption: null } : null },
    ...images.map((img, i) => ({ label: `gallery[${i}]`, row: img })),
  ];

  const allVariants = allImages
    .filter((x) => x.row)
    .flatMap((x) => buildVariants(x.row!.url).map((v) => v.url));
  const probe = useProbe(allVariants);

  return (
    <section className="border border-white/10 rounded-lg p-5 bg-white/[0.02]">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-magenta">{service.name}</h2>
        <p className="text-xs text-white/50 font-mono">id: {service.id}</p>
      </header>

      {allImages.map(({ label, row }) => (
        <div key={label} className="mb-4">
          <p className="text-sm font-semibold mb-1">{label}</p>
          {!row ? (
            <p className="text-yellow-400 text-xs">— missing —</p>
          ) : (
            <>
              <p className="text-[11px] break-all text-white/60 font-mono mb-2">{row.url}</p>
              <table className="w-full text-xs border border-white/10">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-2">width</th>
                    <th className="text-left p-2">status</th>
                    <th className="text-left p-2">HTTP</th>
                    <th className="text-left p-2">size</th>
                    <th className="text-left p-2">URL</th>
                  </tr>
                </thead>
                <tbody>
                  {buildVariants(row.url).map((v) => {
                    const r = probe[v.url];
                    const color =
                      r?.status === "ok" ? "text-green-400"
                      : r?.status === "fail" ? "text-red-400"
                      : "text-white/50";
                    return (
                      <tr key={v.url} className="border-t border-white/5">
                        <td className="p-2 font-mono">{v.width || "?"}w</td>
                        <td className={`p-2 font-mono ${color}`}>{r?.status ?? "…"}</td>
                        <td className="p-2 font-mono">{r?.httpStatus ?? ""}</td>
                        <td className="p-2 font-mono">{r?.bytes != null ? `${(r.bytes/1024).toFixed(1)} KB` : ""}</td>
                        <td className="p-2 font-mono break-all">
                          <a href={v.url} target="_blank" rel="noreferrer" className="underline hover:text-magenta">
                            open
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      ))}
    </section>
  );
}

function DebugImages() {
  const { data: services } = useSuspenseQuery(servicesQuery);
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-10">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-2">Service image debug</h1>
        <p className="text-white/60 text-sm mb-8">
          Lists computed image URLs for every service and probes each responsive
          srcset variant (400w / 800w / 1600w) from your browser. Green = reachable.
        </p>
        <div className="grid gap-6">
          {services.map((s) => <ServiceBlock key={s.id} service={s} />)}
        </div>
      </div>
    </div>
  );
}
