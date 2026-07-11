import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { LazyClientCanvas } from "@/components/three/LazyClientCanvas";
import { LazyHeroScene } from "@/components/three/LazyHeroScene";

export const Route = createFileRoute("/debug/canvas")({
  head: () => ({
    meta: [
      { title: "Canvas regression | Debug" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DebugCanvas,
});

type Result = {
  width: number;
  status: "pending" | "ok" | "error";
  message?: string;
  eventSource?: string;
};

const WIDTHS = [320, 375, 414, 480, 640];

function Frame({
  width,
  onResult,
}: {
  width: number;
  onResult: (r: Result) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const captured = useRef(false);

  useEffect(() => {
    if (captured.current) return;
    const origError = console.error;
    const origInfo = console.info;
    const timer = window.setTimeout(() => {
      if (!captured.current) {
        captured.current = true;
        onResult({ width, status: "ok", message: "mounted (no error within 2s)" });
      }
    }, 2000);

    console.error = (...args: unknown[]) => {
      const msg = args.map((a) => (a instanceof Error ? a.stack ?? a.message : String(a))).join(" ");
      if (/R3F|Canvas|three|eventSource|addEventListener/i.test(msg) && !captured.current) {
        captured.current = true;
        setError(msg);
        onResult({ width, status: "error", message: msg.slice(0, 500) });
      }
      origError(...(args as []));
    };
    console.info = (...args: unknown[]) => {
      const first = args[0];
      if (typeof first === "string" && first.includes("[R3F] Canvas mounted") && !captured.current) {
        captured.current = true;
        const meta = (args[1] as { eventSource?: unknown }) ?? {};
        onResult({
          width,
          status: "ok",
          message: "mounted",
          eventSource: meta.eventSource ? "connected" : "null",
        });
      }
      origInfo(...(args as []));
    };
    return () => {
      window.clearTimeout(timer);
      console.error = origError;
      console.info = origInfo;
    };
  }, [width, onResult]);

  return (
    <div
      style={{ width, height: 240 }}
      className="relative shrink-0 border border-white/20 rounded overflow-hidden bg-black"
    >
      <LazyClientCanvas cameraPosition={[0, 0, 5]} cameraFov={60} interactive={false}>
        <LazyHeroScene />
      </LazyClientCanvas>
      {error && (
        <div className="absolute inset-0 z-10 p-2 text-xs text-red-300 bg-black/80 overflow-auto">
          {error}
        </div>
      )}
    </div>
  );
}

function DebugCanvas() {
  const [results, setResults] = useState<Record<number, Result>>(() =>
    Object.fromEntries(WIDTHS.map((w) => [w, { width: w, status: "pending" as const }]))
  );

  const record = (r: Result) =>
    setResults((prev) => ({ ...prev, [r.width]: r }));

  const summary = WIDTHS.map((w) => results[w]);
  const anyError = summary.some((r) => r.status === "error");
  const allDone = summary.every((r) => r.status !== "pending");

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">R3F Canvas regression</h1>
        <p className="text-sm text-neutral-400">
          Mounts the Hero scene at multiple narrow widths and reports whether the
          R3F Canvas mounts without throwing. Watches <code>console.error</code>
          for R3F / three / eventSource failures.
        </p>
        <p className={`mt-2 text-sm font-medium ${anyError ? "text-red-400" : allDone ? "text-emerald-400" : "text-yellow-400"}`}>
          {anyError ? "FAIL — see failing width below" : allDone ? "PASS — all widths mounted" : "Running..."}
        </p>
      </header>

      <table className="w-full max-w-xl text-sm border border-white/10">
        <thead className="bg-white/5">
          <tr>
            <th className="text-left p-2">Width</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Event source</th>
            <th className="text-left p-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((r) => (
            <tr key={r.width} className="border-t border-white/10">
              <td className="p-2 font-mono">{r.width}px</td>
              <td className={`p-2 ${r.status === "ok" ? "text-emerald-400" : r.status === "error" ? "text-red-400" : "text-yellow-400"}`}>
                {r.status}
              </td>
              <td className="p-2 font-mono">{r.eventSource ?? "—"}</td>
              <td className="p-2 text-neutral-300 truncate max-w-[24rem]">{r.message ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-wrap gap-4">
        {WIDTHS.map((w) => (
          <div key={w} className="space-y-1">
            <div className="text-xs text-neutral-400 font-mono">{w}px</div>
            <Frame width={w} onResult={record} />
          </div>
        ))}
      </div>
    </div>
  );
}
