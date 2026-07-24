import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/veepee-logo.png.asset.json";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const primaryLinks = [
  { label: "Services", href: "/#services" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Facilities", href: "/facilities" },
  { label: "Projects", href: "/projects" },
  { label: "Export", href: "/export" },
  { label: "Contact", href: "/#contact" },
];

const extraLinks = [
  { label: "Pipeline", href: "/catalogue?cat=pipeline-products" },
  { label: "Fabricated", href: "/catalogue?cat=fabricated-products" },
  { label: "Loco", href: "/catalogue?cat=loco-products" },
];


const links = [...primaryLinks, ...extraLinks];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
      >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink-0">
          <img
            src={logo.url}
            alt="VEEPEE Engineers"
            width={56}
            height={56}
            className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 object-contain drop-shadow-[0_0_24px_rgba(212,20,142,0.55)]"
          />
          <div className="leading-none min-w-0">
            <div className="font-display text-base sm:text-lg tracking-[0.16em] sm:tracking-[0.18em] text-white">VEEPEE</div>
            <div className="font-sans-brand text-[9px] sm:text-[10px] tracking-[0.28em] sm:tracking-[0.3em] text-metallic">ENGINEERS</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 min-w-0">
          {primaryLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans-brand text-[12px] xl:text-sm uppercase tracking-[0.18em] xl:tracking-[0.2em] text-metallic hover:text-magenta transition-colors whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
          {extraLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden xl:inline font-sans-brand text-sm uppercase tracking-[0.2em] text-metallic hover:text-magenta transition-colors whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/#contact"
            className="font-sans-brand text-sm uppercase tracking-[0.2em] px-5 py-2.5 bg-magenta-gradient text-white rounded-md hover:shadow-magenta transition-all"
          >
            Get Quote
          </a>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden text-white"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass mt-3 mx-4 rounded-lg p-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-sans-brand text-sm uppercase tracking-[0.2em] text-metallic hover:text-magenta"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="font-sans-brand text-sm uppercase tracking-[0.2em] px-5 py-3 bg-magenta-gradient text-white rounded-md text-center"
          >
            Get Quote
          </a>
        </div>
      )}
    </header>
    </>
  );
}
