import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/debug/responsiveness")({
  head: () => ({
    meta: [
      { title: "Responsiveness audit | Debug" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DebugResponsiveness,
});

const BREAKPOINTS = [320, 375, 414, 640, 768, 1024, 1280] as const;
const ROUTES = ["/", "/catalogue", "/projects", "/architects", "/procurement", "/export"] as const;

const EXPECTED_HEADER_LINKS = [
  "/#services",
  "/catalogue",
  "/projects",
  "/export",
  "/architects",
  "/procurement",
  "/#about",
  "/#contact",
];

type Issue = { kind: "overflow" | "clipped" | "header" | "error"; detail: string };
type CellResult = { status: "pending" | "ok" | "warn" | "error"; issues: Issue[] };
type Key = string; // `${route}@${width}`

const key = (route: string, width: number): Key => `${route}@${width}`;

function AuditFrame({
  route,
  width,
  onResult,
}: {
  route: string;
  width: number;
  onResult: (k: Key, r: CellResult) => void;
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const url = `${route}?resp-audit=1`;

  useEffect(() => {
    let cancelled = false;
    const iframe = ref.current;
    if (!iframe) return;

    const audit = () => {
      if (cancelled) return;
      try {
        const doc = iframe.contentDocument;
        const win = iframe.contentWindow;
        if (!doc || !win) throw new Error("no contentDocument");

        const issues: Issue[] = [];

        // 1. Horizontal overflow
        const docEl = doc.documentElement;
        if (docEl.scrollWidth - docEl.clientWidth > 2) {
          issues.push({
            kind: "overflow",
            detail: `body scrollWidth ${docEl.scrollWidth}px > viewport ${docEl.clientWidth}px`,
          });
        }

        // Any element wider than viewport
        const wide = Array.from(doc.querySelectorAll<HTMLElement>("body *")).filter(
          (el) => el.getBoundingClientRect().right > docEl.clientWidth + 2,
        );
        if (wide.length > 0) {
          const first = wide[0];
          issues.push({
            kind: "overflow",
            detail: `${wide.length} el(s) overflow; first: <${first.tagName.toLowerCase()}${
              first.className && typeof first.className === "string"
                ? "." + first.className.split(" ").slice(0, 2).join(".")
                : ""
            }>`,
          });
        }

        // 2. Clipped headings (text truncated by overflow:hidden / ellipsis)
        const headings = Array.from(doc.querySelectorAll<HTMLElement>("h1, h2, h3"));
        for (const h of headings) {
          if (h.scrollWidth - h.clientWidth > 2 && h.clientWidth > 0) {
            const cs = win.getComputedStyle(h);
            if (cs.overflow !== "visible" || cs.textOverflow === "ellipsis") {
              issues.push({
                kind: "clipped",
                detail: `<${h.tagName.toLowerCase()}> "${h.textContent?.slice(0, 40) ?? ""}" clipped`,
              });
              break;
            }
          }
        }

        // 3. Header link correctness (only on home)
        if (route === "/") {
          const header = doc.querySelector("header");
          if (!header) {
            issues.push({ kind: "header", detail: "no <header> found" });
          } else {
            const hrefs = Array.from(header.querySelectorAll("a")).map(
              (a) => (a as HTMLAnchorElement).getAttribute("href") ?? "",
            );
            const missing = EXPECTED_HEADER_LINKS.filter((l) => !hrefs.includes(l));
            if (missing.length > 0) {
              issues.push({
                kind: "header",
                detail: `missing links: ${missing.join(", ")}`,
              });
            }
          }
        }

        onResult(key(route, width), {
          status: issues.length === 0 ? "ok" : issues.some((i) => i.kind === "overflow") ? "error" : "warn",
          issues,
        });
      } catch (e) {
        onResult(key(route, width), {
          status: "error",
          issues: [{ kind: "error", detail: String(e) }],
        });
      }
    };

    const onLoad = () => {
      // give layout a beat to settle (fonts, images, framer-motion)
      setTimeout(audit, 1200);
    };
    iframe.addEventListener("load", onLoad);
    return () => {
      cancelled = true;
      iframe.removeEventListener("load", onLoad);
    };
  }, [route, width, onResult]);

  return (
    <iframe
      ref={ref}
      src={url}
      title={`${route} @ ${width}px`}
      style={{ width, height: 480 }}
      className="shrink-0 rounded border border-white/15 bg-white"
    />
  );
}

function DebugResponsiveness() {
  const [results, setResults] = useState<Record<Key, CellResult>>({});
  const [openFrame, setOpenFrame] = useState<Key | null>(null);

  const record = (k: Key, r: CellResult) =>
    setResults((prev) => ({ ...prev, [k]: r }));

  const total = ROUTES.length * BREAKPOINTS.length;
  const done = Object.keys(results).length;
  const errors = Object.values(results).filter((r) => r.status === "error").length;
  const warns = Object.values(results).filter((r) => r.status === "warn").length;
  const oks = Object.values(results).filter((r) => r.status === "ok").length;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Responsiveness audit</h1>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Iframes each content route at key breakpoints and inspects the DOM for
          horizontal overflow, elements wider than the viewport, clipped
          headings (overflow-hidden or text-ellipsis truncation), and — on the
          home page — that the header exposes every expected navigation link.
        </p>
        <p className="mt-2 text-sm font-medium">
          <span className="text-neutral-400">{done}/{total} checked · </span>
          <span className="text-emerald-400">{oks} ok</span>
          {" · "}
          <span className="text-yellow-400">{warns} warn</span>
          {" · "}
          <span className="text-red-400">{errors} error</span>
        </p>
      </header>

      <div className="overflow-auto border border-white/10 rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-2 sticky left-0 bg-white/5">Route</th>
              {BREAKPOINTS.map((w) => (
                <th key={w} className="text-left p-2 font-mono">{w}px</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROUTES.map((route) => (
              <tr key={route} className="border-t border-white/10">
                <td className="p-2 font-mono sticky left-0 bg-neutral-950">{route}</td>
                {BREAKPOINTS.map((w) => {
                  const k = key(route, w);
                  const r = results[k];
                  const color =
                    !r ? "text-yellow-400"
                    : r.status === "ok" ? "text-emerald-400"
                    : r.status === "warn" ? "text-yellow-400"
                    : "text-red-400";
                  return (
                    <td key={w} className={`p-2 ${color} align-top`}>
                      <button
                        type="button"
                        onClick={() => setOpenFrame(openFrame === k ? null : k)}
                        className="underline decoration-dotted hover:decoration-solid"
                      >
                        {r?.status ?? "…"}
                      </button>
                      {r && r.issues.length > 0 && (
                        <ul className="mt-1 space-y-0.5 text-xs text-neutral-300">
                          {r.issues.slice(0, 3).map((iss, i) => (
                            <li key={i} className="max-w-[18rem] truncate" title={iss.detail}>
                              [{iss.kind}] {iss.detail}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-6">
        {ROUTES.map((route) =>
          BREAKPOINTS.map((w) => {
            const k = key(route, w);
            const isOpen = openFrame === k;
            return (
              <div key={k} className={isOpen ? "block" : "hidden"}>
                <div className="text-xs text-neutral-400 font-mono mb-1">{route} @ {w}px</div>
                <AuditFrame route={route} width={w} onResult={record} />
              </div>
            );
          }),
        )}
        {/* Also silently mount every frame for auditing, hidden off-screen */}
        <div className="fixed left-[-99999px] top-0 pointer-events-none opacity-0" aria-hidden>
          {ROUTES.map((route) =>
            BREAKPOINTS.map((w) => (
              <AuditFrame key={`bg-${key(route, w)}`} route={route} width={w} onResult={record} />
            )),
          )}
        </div>
      </div>
    </div>
  );
}
