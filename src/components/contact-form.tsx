import { useState } from "react";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Digits, +, -, () only"),
  email: z.string().trim().email("Enter a valid email").max(160).optional().or(z.literal("")),
  service: z.string().min(1, "Pick a service"),
  message: z.string().trim().min(10, "Tell us a little about your project").max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const SERVICES = [
  "Laser Cutting",
  "CNC Fabrication",
  "Gates & Railings",
  "Architectural Metal / Jaali",
  "Industrial Manufacturing",
  "Hot Dip Galvanizing",
  "Tubewell Fittings",
  "Other",
];

const WHATSAPP_NUMBER = "919000000000";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      `New enquiry from ${d.name}%0A` +
      `Phone: ${d.phone}%0A` +
      (d.email ? `Email: ${d.email}%0A` : "") +
      `Service: ${d.service}%0A%0A` +
      encodeURIComponent(d.message);

    trackEvent("contact_submit", { service: d.service });

    // Open WhatsApp pre-filled with the enquiry.
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");

    setSubmitting(false);
    setSubmitted(true);
    (e.currentTarget as HTMLFormElement).reset();
  }

  if (submitted) {
    return (
      <div className="glass rounded-lg p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-magenta mx-auto" />
        <h3 className="mt-4 font-display text-3xl text-white tracking-wide">Enquiry sent</h3>
        <p className="mt-3 text-metallic font-body">
          We've opened WhatsApp with your details. Our team responds within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 px-5 py-2 text-xs font-sans-brand uppercase tracking-[0.25em] border border-white/20 rounded text-metallic hover:text-white hover:border-magenta"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-lg p-6 md:p-8 text-left grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Name" name="name" error={errors.name} required />
        <Field label="Phone" name="phone" type="tel" error={errors.phone} required />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Email (optional)" name="email" type="email" error={errors.email} />
        <div>
          <Label>Service *</Label>
          <select
            name="service"
            defaultValue=""
            className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
          >
            <option value="" disabled>Select a service…</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.service && <p className="mt-1 text-xs text-magenta">{errors.service}</p>}
        </div>
      </div>
      <div>
        <Label>Tell us about your project *</Label>
        <textarea
          name="message"
          rows={5}
          maxLength={1000}
          placeholder="Drawings, sizes, quantities, timeline…"
          className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
        />
        {errors.message && <p className="mt-1 text-xs text-magenta">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex items-center justify-center gap-3 px-7 py-4 bg-magenta-gradient text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md shadow-magenta hover:shadow-glow transition-all disabled:opacity-60"
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Send Enquiry via WhatsApp
      </button>
      <p className="text-[11px] font-sans-brand tracking-[0.2em] uppercase text-metallic-dark text-center">
        We respond within 24 hours · No spam · Your details stay private
      </p>
    </form>
  );
}

function Field({
  label, name, type = "text", error, required,
}: { label: string; name: string; type?: string; error?: string; required?: boolean }) {
  return (
    <div>
      <Label>{label}{required && " *"}</Label>
      <input
        name={name}
        type={type}
        maxLength={type === "email" ? 160 : 80}
        className="w-full bg-near-black border border-white/15 rounded-md px-3 py-3 text-white font-body text-sm focus:border-magenta focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-magenta">{error}</p>}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block mb-1.5 font-sans-brand text-[11px] tracking-[0.25em] uppercase text-metallic">
      {children}
    </label>
  );
}
