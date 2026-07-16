import { useRef, useState } from "react";
import { PackageSearch, Check, Loader2, AlertCircle } from "lucide-react";

/**
 * Accessible brochure download button.
 *
 * - Descriptive label + `aria-label` including file type and product scope.
 * - Fetches the PDF, tracks a loading state, and streams via a Blob URL so we
 *   can trigger a proper download-with-filename and read HTTP status/errors.
 * - Live-region status text announces "preparing", "ready", and error states
 *   to assistive tech.
 * - Focus is deliberately returned to the button after the download starts so
 *   keyboard users don't lose their place.
 */
export function BrochureDownloadButton({
  className,
  label = "Download Full Brochure (PDF)",
}: {
  className?: string;
  label?: string;
}) {
  type Status = "idle" | "loading" | "done" | "error";
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const btnRef = useRef<HTMLButtonElement>(null);

  const download = async () => {
    if (status === "loading") return;
    setStatus("loading");
    setMessage("Preparing your brochure…");
    try {
      const res = await fetch("/api/brochure.pdf", { credentials: "same-origin" });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "VEEPEE-Engineers-Brochure.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setStatus("done");
      setMessage("Brochure ready — check your downloads folder.");
      // Return focus so keyboard users don't get lost after the click.
      btnRef.current?.focus();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? `Couldn't download brochure — ${err.message}. Please try again.`
          : "Couldn't download brochure. Please try again.",
      );
      btnRef.current?.focus();
    }
  };

  const busy = status === "loading";

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <button
        ref={btnRef}
        type="button"
        onClick={download}
        aria-busy={busy}
        aria-live="off"
        aria-label={
          busy
            ? "Preparing VEEPEE Engineers brochure PDF"
            : "Download the VEEPEE Engineers catalogue and capability brochure as a PDF"
        }
        className={
          className ??
          "inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-magenta/50 bg-magenta/5 hover:bg-magenta/15 text-white font-sans-brand text-xs uppercase tracking-[0.22em] transition-all disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
        }
        disabled={busy}
      >
        {status === "loading" && <Loader2 className="h-4 w-4 text-magenta animate-spin" aria-hidden />}
        {status === "done" && <Check className="h-4 w-4 text-magenta" aria-hidden />}
        {status === "error" && <AlertCircle className="h-4 w-4 text-magenta" aria-hidden />}
        {status === "idle" && <PackageSearch className="h-4 w-4 text-magenta" aria-hidden />}
        <span>
          {status === "loading"
            ? "Preparing PDF…"
            : status === "done"
              ? "Downloaded — get another"
              : status === "error"
                ? "Retry download"
                : label}
        </span>
      </button>
      {/* SR-only live region for status announcements */}
      <span role="status" aria-live="polite" className="sr-only">
        {message}
      </span>
      {status === "error" && (
        <span className="text-[11px] text-magenta font-body" aria-hidden>
          {message}
        </span>
      )}
    </div>
  );
}
