import projectHero from "@/assets/project-hero.jpg";
import productGate from "@/assets/product-gate.jpg";
import productJaali from "@/assets/product-jaali.jpg";
import productRailing from "@/assets/product-railing.jpg";
import productIndustrial from "@/assets/product-industrial.jpg";
import workshop from "@/assets/workshop.jpg";

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  cover: string;
  gallery: string[];
  summary: string;
  scope: string[];
  stats: { label: string; value: string }[];
  body: string;
};

export const projects: Project[] = [
  {
    slug: "rm-plaza-facade",
    title: "RM Plaza — Blackened-Steel Facade & Glazing",
    category: "Commercial",
    location: "Varanasi, UP",
    year: "2025",
    cover: projectHero,
    gallery: [projectHero, productIndustrial, workshop],
    summary:
      "A 1,200 sq.m. blackened-steel facade with custom laser-cut signage panels — delivered in 11 weeks.",
    scope: ["Fiber laser cutting", "Powder coating", "On-site installation", "Glazing integration"],
    stats: [
      { label: "Area", value: "1,200 m²" },
      { label: "Lead time", value: "11 weeks" },
      { label: "Material", value: "MS + GI" },
      { label: "Panels", value: "186" },
    ],
    body:
      "Designed in close collaboration with the architect's studio, the RM Plaza facade combines hot-rolled blackened steel with custom laser-perforated signage. Every panel was cut, finished, and pre-fitted in our Maheshpur workshop before being shipped to site in numbered crates for a 4-week installation window.",
  },
  {
    slug: "heritage-villa-gate",
    title: "Heritage Villa Gate — Hand-Finished Wrought Detail",
    category: "Residential",
    location: "Sarnath, Varanasi",
    year: "2024",
    cover: productGate,
    gallery: [productGate, productRailing, workshop],
    summary:
      "A 14-foot wrought entrance gate with custom motif, hand-forged finials, and concealed automation.",
    scope: ["Custom CAD & motif", "Forging", "Hot-dip galvanize", "Automation prep"],
    stats: [
      { label: "Span", value: "14 ft" },
      { label: "Weight", value: "780 kg" },
      { label: "Finish", value: "HDG + PU" },
      { label: "Lead time", value: "6 weeks" },
    ],
    body:
      "The brief called for a gate that read as heritage but moved like a modern installation. We engineered a hidden tube-and-bearing system inside traditional forged elements, then galvanized and powder-coated the assembly for a 25-year corrosion-free life on the Ganga floodplain.",
  },
  {
    slug: "kashi-mandala-jaali",
    title: "Kashi Mandala Jaali — Temple Complex Panels",
    category: "Architectural",
    location: "Kashi, Varanasi",
    year: "2024",
    cover: productJaali,
    gallery: [productJaali, projectHero, productIndustrial],
    summary:
      "84 fiber-laser-cut mandala jaali panels for a temple complex — each panel CNC-aligned to within 0.2 mm.",
    scope: ["Fiber laser cutting", "Edge finishing", "Brass plating", "On-site fitment"],
    stats: [
      { label: "Panels", value: "84" },
      { label: "Material", value: "3 mm SS" },
      { label: "Tolerance", value: "0.2 mm" },
      { label: "Finish", value: "Antique brass" },
    ],
    body:
      "The trust requested a contemporary jaali that respected the temple's classical proportions. We translated a hand drawing into vectorised mandala geometry and cut all 84 panels in a single nesting run for perfect repetition, then antique-brass plated each piece in-house.",
  },
  {
    slug: "atrium-spiral-railing",
    title: "Atrium Spiral Railing — Stainless Helix",
    category: "Architectural",
    location: "Lucknow, UP",
    year: "2025",
    cover: productRailing,
    gallery: [productRailing, productIndustrial, projectHero],
    summary:
      "A 3-storey stainless spiral railing fabricated, polished, and crated in 7 sections for fast install.",
    scope: ["CNC rolling", "TIG welding", "Mirror polish", "Modular crate-out"],
    stats: [
      { label: "Storeys", value: "3" },
      { label: "Sections", value: "7" },
      { label: "Material", value: "SS 304" },
      { label: "Finish", value: "Mirror" },
    ],
    body:
      "Engineered as a single helical curve and broken into 7 site-bolted sections, this railing tested every part of the workshop — from precision rolling on the CNC bender to the final mirror polish that took 240 craftsman-hours.",
  },
  {
    slug: "ncr-infra-structural",
    title: "NCR Infra Structural Frame — Industrial Shed",
    category: "Industrial",
    location: "Greater Noida, UP",
    year: "2024",
    cover: productIndustrial,
    gallery: [productIndustrial, workshop, projectHero],
    summary:
      "Pre-engineered structural steel frame for a 4,000 sq.m. industrial shed — fabricated, galvanized, dispatched in 9 weeks.",
    scope: ["Structural fabrication", "Hot dip galvanize", "Logistics", "On-site supervision"],
    stats: [
      { label: "Area", value: "4,000 m²" },
      { label: "Tonnage", value: "62 T" },
      { label: "Lead time", value: "9 weeks" },
      { label: "Finish", value: "HDG" },
    ],
    body:
      "A repeat client across 12 projects, NCR Infra brought us a tight 9-week window for a 62-tonne pre-engineered shed. Members were nested, cut, drilled and galvanized in batches and dispatched in 14 trailer loads with our QA supervisor on site through erection.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
