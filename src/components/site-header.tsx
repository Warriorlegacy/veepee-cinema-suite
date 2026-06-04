import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex h-9 w-9 items-center justify-center">
            <div className="absolute inset-0 rounded-md bg-magenta-gradient shadow-magenta opacity-90 group-hover:opacity-100 transition" />
            <span className="relative font-display text-xl text-white">V</span>
          </div>
          <div className="leading-none">
            <div className="font-display text-lg tracking-[0.18em] text-white">VEEPEE</div>
            <div className="font-sans-brand text-[10px] tracking-[0.3em] text-metallic">ENGINEERS</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans-brand text-sm uppercase tracking-[0.2em] text-metallic hover:text-magenta transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
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
            href="#contact"
            onClick={() => setOpen(false)}
            className="font-sans-brand text-sm uppercase tracking-[0.2em] px-5 py-3 bg-magenta-gradient text-white rounded-md text-center"
          >
            Get Quote
          </a>
        </div>
      )}
    </header>
  );
}
