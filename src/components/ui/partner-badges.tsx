import { Shield, CheckCircle2, Sparkles, Award, Building2, Star } from "lucide-react";

const badges = [
  { icon: Shield, label: "GST Registered", sub: "09ABTPJ5945P1ZK" },
  { icon: CheckCircle2, label: "UDYAM Certified", sub: "UP-75-0001103" },
  { icon: Award, label: "ISO 9001:2015", sub: "Quality Management" },
  { icon: Sparkles, label: "Made in India", sub: "Proudly Indian" },
  { icon: Building2, label: "MSME Registered", sub: "Govt. of India" },
  { icon: Star, label: "IndiaMART Verified", sub: "TrustSEAL" },
];

export function PartnerBadges() {
  return (
    <section className="py-16 bg-near-black border-y border-white/5">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="text-center mb-10">
          <span className="font-sans-brand text-[10px] tracking-[0.4em] text-metallic uppercase">
            Registrations & Certifications
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-3 px-5 py-3 rounded-lg border border-white/10 bg-card hover:border-magenta/40 transition-all"
            >
              <b.icon className="h-5 w-5 text-magenta shrink-0" />
              <div>
                <div className="font-sans-brand text-xs uppercase tracking-[0.15em] text-white">
                  {b.label}
                </div>
                <div className="text-[10px] text-metallic font-body">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}