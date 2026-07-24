import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Linkedin, ExternalLink } from "lucide-react";
import logo from "@/assets/veepee-logo.png.asset.json";
import { PartnerBadges } from "@/components/ui/partner-badges";

export function SiteFooter() {
  return (
    <>
      <PartnerBadges />
      <footer className="relative bg-near-black border-t border-white/5 pt-20 pb-10">
      <div className="mx-auto max-w-[1400px] px-6 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <img src={logo.url} alt="VEEPEE Engineers" width={48} height={48} className="h-12 w-12 object-contain" />
            <div>
              <div className="font-display text-xl tracking-[0.18em] text-white">VEEPEE ENGINEERS</div>
              <div className="font-sans-brand text-[11px] tracking-[0.3em] text-metallic">PRECISION · PERFORMANCE · PROGRESS</div>
            </div>
          </div>
          <p className="text-metallic max-w-md leading-relaxed font-body text-sm">
            A premium engineering and manufacturing brand rooted in Varanasi — delivering laser cutting,
            CNC fabrication, and architectural metal works across Eastern India since 1976.
          </p>
          <div className="flex gap-3 mt-6 text-[11px] font-sans-brand uppercase tracking-[0.2em] text-metallic">
            <span className="px-3 py-1.5 border border-white/10 rounded">GST Registered</span>
            <span className="px-3 py-1.5 border border-white/10 rounded">UDYAM Certified</span>
            <span className="px-3 py-1.5 border border-white/10 rounded">Made in India</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 mt-6">
            <a
              href="https://www.facebook.com/profile.php?id=61591677786014"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2.5 rounded-lg border border-white/10 text-metallic hover:text-white hover:border-magenta hover:bg-magenta/10 transition-all"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/veepeeengrs/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-lg border border-white/10 text-metallic hover:text-white hover:border-magenta hover:bg-magenta/10 transition-all"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/veepee-engineers/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-lg border border-white/10 text-metallic hover:text-white hover:border-magenta hover:bg-magenta/10 transition-all"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg tracking-[0.15em] text-white mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm text-metallic font-body">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-magenta shrink-0" /> 225/1 Maheshpur Industrial Estate, Varanasi 221106, Uttar Pradesh, India</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-magenta shrink-0" /> +91 9125142400 · +91 7985759501</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-magenta shrink-0" /> veepeeengr@gmail.com</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-magenta shrink-0" /> engrveepee@gmail.com</li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-magenta shrink-0" /> WhatsApp 24×7</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg tracking-[0.15em] text-white mb-4">Capabilities</h4>
          <ul className="space-y-2 text-sm text-metallic font-body">
            <li>Fiber Laser Cutting</li>
            <li>CNC Fabrication</li>
            <li>Architectural Metalwork</li>
            <li>Industrial Manufacturing</li>
            <li>Hot Dip Galvanizing</li>
            <li>Tubewell Fittings</li>
          </ul>
        </div>
      </div>

      {/* Company footer line */}
      <div className="mt-16 pt-6 border-t border-white/5 mx-auto max-w-[1400px] px-6 flex flex-col md:flex-row gap-3 justify-between text-xs font-sans-brand tracking-[0.2em] text-metallic-dark uppercase">
        <div>© {new Date().getFullYear()} Veepee Engineers · GSTIN 09ABTPJ5945P1ZK · UDYAM-UP-75-0001103</div>
        <div>Engineering Precision · Delivering Excellence</div>
      </div>

      {/* Developer Watermark — Signhify Studio */}
      <div className="mt-6 pt-4 border-t border-white/[0.03] mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[10px] text-metallic-dark/60 font-body">
          <span className="flex items-center gap-1.5">
            Designed & Developed by{" "}
            <a
              href="https://signhify.dpdns.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-metallic hover:text-magenta transition-colors font-sans-brand uppercase tracking-[0.15em] inline-flex items-center gap-1"
            >
              Signhify Studio <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </span>
          <span className="hidden sm:inline text-white/10">·</span>
          <span className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/signhify.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-magenta transition-colors inline-flex items-center gap-1"
            >
              <Instagram className="h-2.5 w-2.5" /> @signhify.studio
            </a>
            <span className="text-white/10">·</span>
            <a
              href="https://www.instagram.com/piyushrajsingh.golu/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-magenta transition-colors inline-flex items-center gap-1"
            >
              <Instagram className="h-2.5 w-2.5" /> @piyushrajsingh.golu
            </a>
            <span className="text-white/10">·</span>
            <a
              href="mailto:piyushrajsingh092@gmail.com"
              className="hover:text-magenta transition-colors"
            >
              piyushrajsingh092@gmail.com
            </a>
            <span className="text-white/10">·</span>
            <a
              href="tel:+916202442690"
              className="hover:text-magenta transition-colors"
            >
              +91 6202442690
            </a>
          </span>
        </div>
      </div>
    </footer>
    </>
  );
}
