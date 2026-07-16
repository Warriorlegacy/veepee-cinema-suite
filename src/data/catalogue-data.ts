/**
 * VEEPEE Engineers — Product Catalogue Data
 * Structured catalogue with categories, products, and pricing.
 * Auto-generated from Google Maps analysis.
 *
 * NOTE: The import below ensures Vite tracks all catalogue images as
 * module dependencies so they are always included in the production build.
 * Without this, only images explicitly imported by components are bundled.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
const _catalogueImages = import.meta.glob("/public/catalogue/**/*.{jpeg,jpg,png}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
/* eslint-enable @typescript-eslint/no-unused-vars */

export interface CatalogueCategory {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  priceLabel: string;
  priceUnit: string;
  /** "product" for finished sellable goods, "facility" for machinery / workshop capacities. */
  type?: "product" | "facility";
  /** Group heading for filter bar organisation. */
  group?: "architectural" | "industrial" | "decor" | "services" | "facility";
}

export interface CatalogueProduct {
  id: string;
  categoryId: string;
  name: string;
  image: string;
  priceRange: string;
  material?: string;
  description?: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  shortName: string;
  spec: string;
  capacity: string;
  description: string;
  image?: string;
  icon: string;
}

export const categories: CatalogueCategory[] = [
  {
    id: "gates",
    name: "Designer Gates & Main Doors",
    shortName: "Gates",
    description: "CNC laser-cut main gates with nature, geometric & floral motifs in MS and SS with premium finishes.",
    icon: "door",
    priceLabel: "Starting ₹600",
    priceUnit: "/sq ft",
    type: "product",
    group: "architectural",
  },
  {
    id: "railings",
    name: "Staircase Railings",
    shortName: "Railings",
    description: "Artistic laser-cut railing panels with waves, branches & abstract patterns for indoor and outdoor staircases.",
    icon: "railing",
    priceLabel: "Starting ₹600",
    priceUnit: "/sq ft",
    type: "product",
    group: "architectural",
  },
  {
    id: "balustrades-staircases",
    name: "Balustrades & Staircases",
    shortName: "Balustrades",
    description: "Sculptural balustrade panels and staircase infills — op-art, geometric and floral patterns in mild and stainless steel.",
    icon: "railing",
    priceLabel: "Starting ₹850",
    priceUnit: "/sq ft",
    type: "product",
    group: "architectural",
  },
  {
    id: "self-designing-facades",
    name: "Facades & Grills",
    shortName: "Facades & Grills",
    description: "Parametric facade panels, lace mesh grills and ventilation screens engineered for scale.",
    icon: "facade",
    priceLabel: "Starting ₹650",
    priceUnit: "/sq ft",
    type: "product",
    group: "architectural",
  },
  {
    id: "jaali-screens",
    name: "Jaali & Privacy Screens",
    shortName: "Jaali Screens",
    description: "Geometric, floral, Islamic & nature-inspired decorative panels for partitions, window screens, and façade cladding.",
    icon: "grid",
    priceLabel: "Starting ₹200",
    priceUnit: "/sq ft",
    type: "product",
    group: "architectural",
  },
  {
    id: "industrial-art",
    name: "Custom Industrial Art",
    shortName: "Industrial Art",
    description: "Bespoke laser-cut installations, sculptural signage and large-format metal artwork for lobbies, hotels and public spaces.",
    icon: "art",
    priceLabel: "On Enquiry",
    priceUnit: "",
    type: "product",
    group: "architectural",
  },
  {
    id: "pipeline-products",
    name: "Pipeline Products",
    shortName: "Pipeline",
    description: "Large-diameter pipeline segments, flange adapters, dismantling joints and coated MS pipe sections for water and industrial infrastructure.",
    icon: "cog",
    priceLabel: "Starting ₹800",
    priceUnit: "/piece",
    type: "product",
    group: "industrial",
  },
  {
    id: "fabricated-products",
    name: "Fabricated Products",
    shortName: "Fabricated",
    description: "Precision-fabricated couplings, clamps, brackets and custom structural assemblies engineered to drawing.",
    icon: "cog",
    priceLabel: "Starting ₹4,000",
    priceUnit: "/piece",
    type: "product",
    group: "industrial",
  },
  {
    id: "loco-products",
    name: "Loco & Railway Products",
    shortName: "Loco",
    description: "Locomotive and railway components — bogie fittings, brake gear brackets, coach hardware and rolling-stock fabrications built to spec.",
    icon: "cog",
    priceLabel: "On Enquiry",
    priceUnit: "",
    type: "product",
    group: "industrial",
  },
  {
    id: "industrial",
    name: "Legacy Industrial Fittings",
    shortName: "Legacy Industrial",
    description: "Pipe couplings, dismantling joints and industrial fittings — see Pipeline / Fabricated / Loco for the current grouping.",
    icon: "cog",
    priceLabel: "Starting ₹4,000",
    priceUnit: "/piece",
    type: "product",
    group: "industrial",
  },
  {
    id: "pooja-panels",
    name: "Pooja Room & Temple Panels",
    shortName: "Pooja Panels",
    description: "CNC-cut religious motifs — temple arches, Ganesh, Om, diyas & kalash designs for pooja rooms and mandirs.",
    icon: "temple",
    priceLabel: "Starting ₹250",
    priceUnit: "/sq ft",
    type: "product",
    group: "decor",
  },
  {
    id: "shadow-art",
    name: "Shadow Art & Decorative Wall Art",
    shortName: "Shadow Art",
    description: "Metal shadow art panels creating stunning light-and-shadow effects — lions, deities, trees & custom designs.",
    icon: "art",
    priceLabel: "Starting ₹1,500",
    priceUnit: "/piece",
    type: "product",
    group: "decor",
  },
  {
    id: "mirror-frames",
    name: "Mirror & Clock Frames",
    shortName: "Mirror Frames",
    description: "Ornamental laser-cut circular and rectangular mirror/clock frames in mandala and geometric patterns.",
    icon: "mirror",
    priceLabel: "Starting ₹2,000",
    priceUnit: "/piece",
    type: "product",
    group: "decor",
  },
  {
    id: "vent-grilles",
    name: "Ventilation Grilles & AC Covers",
    shortName: "Vent Grilles",
    description: "Decorative air vent covers and HVAC grilles in Gothic, Renaissance, Victorian & modern pattern styles.",
    icon: "vent",
    priceLabel: "Starting ₹150",
    priceUnit: "/sq ft",
    type: "product",
    group: "decor",
  },
  {
    id: "gift-decor",
    name: "Gift Items & Home Décor",
    shortName: "Décor",
    description: "Heart-shaped stands, love signs, candle holders & ornamental pieces — perfect for gifts and home décor.",
    icon: "gift",
    priceLabel: "Starting ₹300",
    priceUnit: "/piece",
    type: "product",
    group: "decor",
  },
  {
    id: "laser-cutting-services",
    name: "CNC Laser Cutting & Job Work",
    shortName: "Job Work",
    description: "High-precision fiber laser cutting for MS, SS, brass and aluminium.",
    icon: "cog",
    priceLabel: "Starting ₹50",
    priceUnit: "/sq ft",
    type: "product",
    group: "services",
  },
];

/* ─── Infrastructure & Facilities ─────────────────────────────────
   Machinery and processing capacities — kept separate from sellable
   goods so the catalogue never mixes capabilities with products. */
export const facilities: FacilityItem[] = [
  {
    id: "fiber-laser",
    name: "5 kW Fiber Laser Cutting Line",
    shortName: "Fiber Laser",
    spec: "5 kW · 3000 × 1500 mm bed",
    capacity: "MS up to 20 mm · SS up to 12 mm · Aluminium up to 8 mm",
    description: "Our flagship high-power fiber laser handles heavy-plate contour cutting and fine-artistic work on the same machine — the backbone of every architectural and industrial job.",
    icon: "cog",
  },
  {
    id: "cnc-press-brake",
    name: "CNC Press Brake",
    shortName: "Press Brake",
    spec: "Hydraulic · CNC back-gauge",
    capacity: "Cold-forming heavy plate — no thermal deformation, no sparks.",
    description: "Precision cold-forming of steel plate for enclosures, structural sections and pipeline components. Tight-tolerance bends, repeat accuracy across production runs.",
    icon: "cog",
  },
  {
    id: "three-roll-bender",
    name: "Three-Roll Pipe & Section Bender",
    shortName: "Three-Roll Bender",
    spec: "Pyramid three-roll configuration",
    capacity: "Pipe, tube, angle, channel and flat section — controlled radii for pipeline & structural work.",
    description: "Precision three-roll bending machine processing pipes and structural sections into large-radius curves — the correct process for pipeline segments, arches and structural rings.",
    icon: "cog",
  },
  {
    id: "cnc-machining",
    name: "CNC Machining Cell",
    shortName: "CNC Machining",
    spec: "Turning · Milling · Boring",
    capacity: "Tight-tolerance machined parts — our core domain.",
    description: "Tight-tolerance machined parts is our core domain. Turned, milled and bored components for pipeline fittings, loco hardware and fabricated assemblies.",
    icon: "cog",
  },
  {
    id: "powder-coating",
    name: "Powder Coating Line",
    shortName: "Powder Coating",
    spec: "Pre-treatment · Oven-cured",
    capacity: "Architectural finishes across gates, railings, facades and industrial components.",
    description: "In-house pre-treatment and oven-cured powder coating gives a durable, colour-consistent finish across large architectural batches.",
    icon: "cog",
  },
  {
    id: "hot-dip-galv",
    name: "Hot-Dip Galvanizing (Partner Line)",
    shortName: "Galvanizing",
    spec: "Zinc immersion",
    capacity: "Pipeline segments and structural work for outdoor / buried applications.",
    description: "Coordinated hot-dip galvanizing for corrosion-critical pipeline and structural fabrications.",
    icon: "cog",
  },
  {
    id: "welding-fab",
    name: "Welding & Fabrication Bays",
    shortName: "Welding & Fab",
    spec: "MIG · TIG · Arc",
    capacity: "Multi-station bays for structural, pipeline and loco assemblies.",
    description: "Dedicated welding stations for heavy pipeline segments, fabricated components and locomotive / railway hardware.",
    icon: "cog",
  },
];


export const products: CatalogueProduct[] = [
  {
    "id": "p_1",
    "categoryId": "gift-decor",
    "name": "Romantic Rings Laser-Cut Heart Decor Stand",
    "image": "/catalogue/gift-decor/catalogue-15.jpeg",
    "priceRange": "\u20b9450 \u2013 \u20b9950",
    "material": "Mild Steel",
    "description": "A charming laser-cut metal heart, beautifully designed with intertwined wedding rings and a sparkling engagement diamond motif. Finished in a vibrant red powder coat, this freestanding piece makes a perfect romantic gift or elegant table decor for engagements and anniversaries."
  },
  {
    "id": "p_2",
    "categoryId": "gift-decor",
    "name": "Laser-Cut Floral Love Heart Wall Art",
    "image": "/catalogue/gift-decor/catalogue-11.jpeg",
    "priceRange": "\u20b9750 \u2013 \u20b92,500",
    "material": "Mild Steel",
    "description": "A beautifully laser-cut wall art piece featuring a heart shape adorned with intricate floral motifs, the word 'LOVE', and a charming cupid figure. Finished in a vibrant red, it serves as an ideal decorative accent or a thoughtful gift for special occasions."
  },
  {
    "id": "p_3",
    "categoryId": "jaali-screens",
    "name": "Intricate Geometric Star Jaali Panel",
    "image": "/catalogue/jaali-screens/catalogue-14.jpeg",
    "priceRange": "\u20b9280 \u2013 \u20b9550/sq ft",
    "material": "Mild Steel",
    "description": "Showcasing a mesmerizing geometric star pattern, these laser-cut metal panels are perfect for creating stunning architectural accents and semi-private partitions. Delivered in a raw metal finish, they are ready for custom painting, powder coating, or polishing to match any interior or exterior design scheme."
  },
  {
    "id": "p_4",
    "categoryId": "laser-cutting-services",
    "name": "Precision CNC Fiber Laser Cutting Service",
    "image": "/catalogue/laser-cutting-services/catalogue-16.jpeg",
    "priceRange": "\u20b9150 \u2013 \u20b9600/sq ft",
    "material": "Various Metals (Mild Steel, Stainless Steel, Aluminum, Brass, Copper)",
    "description": "Utilize our state-of-the-art CNC Fiber Laser for highly precise and intricate metal cutting projects. We guarantee fine artistic designs, exceptionally smooth finishing, and quick service turnaround for all industrial and decorative fabrication needs."
  },
  {
    "id": "p_5",
    "categoryId": "shadow-art",
    "name": "Lord Vishwakarma Divine Architect Laser-Cut Shadow Art",
    "image": "/catalogue/shadow-art/catalogue-17.jpeg",
    "priceRange": "\u20b9450 \u2013 \u20b9900/sq ft",
    "material": "Mild Steel",
    "description": "An exquisitely crafted laser-cut panel featuring Lord Vishwakarma, the divine architect, adorned with his iconic tools. This intricate silhouette design is ideal for devotional spaces, spiritual decor, or as a profound artistic gift, offering a blend of tradition and modern craftsmanship."
  },
  {
    "id": "p_6",
    "categoryId": "shadow-art",
    "name": "Divine Meditating Shiva Laser-Cut Silhouette",
    "image": "/catalogue/shadow-art/catalogue-12.jpeg",
    "priceRange": "\u20b94,500 \u2013 \u20b912,000",
    "material": "Mild Steel, Stainless Steel, Aluminum",
    "description": "A serene minimalist laser-cut art piece depicting Lord Shiva in a meditative pose, complete with his iconic trident and serpent. Ideal for enhancing spiritual ambiance in homes, pooja rooms, or as a sophisticated decorative accent."
  },
  {
    "id": "p_7",
    "categoryId": "pooja-panels",
    "name": "Vedic Ganesha Shubh Labh Decorative Panels Set",
    "image": "/catalogue/pooja-panels/catalogue-10.jpeg",
    "priceRange": "\u20b98,000 \u2013 \u20b914,000",
    "material": "Mild Steel",
    "description": "An intricately laser-cut three-panel set featuring Lord Ganesha flanked by auspicious 'Shubh' and 'Labh' Kalash designs, complete with traditional Om and Swastika motifs. Crafted from robust metal, these panels are perfect for adding spiritual elegance to puja rooms, home entrances, or office spaces, available in a raw finish ready for custom treatments."
  },
  {
    "id": "p_8",
    "categoryId": "gates",
    "name": "Divine Laser-Cut Designer Gates",
    "image": "/catalogue/gates/imgi_46_apnqkaglm_ngnkwuvwmshoofw7qgru9wbsthfckl4yr_x0cchu5hyiew0nagjzct85qo44etj8aaoo6v7bbjminrztmf5e4olsjvkrquru9qkzv7fbmpjlh7.png",
    "priceRange": "\u20b975,000 \u2013 \u20b92,50,000",
    "material": "Mild Steel with powder coating and acrylic inserts",
    "description": "Exquisite laser-cut designer gates featuring intricate Radha Krishna and vibrant peacock motifs, ideal for adding a luxurious and artistic statement to any residential or commercial entrance. Crafted with precision and finished with durable, multi-color coatings to ensure lasting beauty and elegance."
  },
  {
    "id": "p_9",
    "categoryId": "gates",
    "name": "Radiant Sunburst Laser-Cut Entrance Gate System",
    "image": "/catalogue/gates/imgi_32_unnamed.png",
    "priceRange": "\u20b985,000 \u2013 \u20b91,80,000",
    "material": "Mild Steel",
    "description": "This grand entrance gate system features a bold, laser-cut sunburst motif across its double doors, transom, and flanking decorative panels. Finished in a striking combination of golden and frosted silver with robust black frames, it offers a contemporary and opulent welcome to any property."
  },
  {
    "id": "p_10",
    "categoryId": "railings",
    "name": "Organic Branch Motif Stair Railing",
    "image": "/catalogue/railings/imgi_33_unnamed.png",
    "priceRange": "\u20b91,200 \u2013 \u20b92,800/linear ft",
    "material": "Mild Steel (Powder Coated)",
    "description": "Elevate your interiors with this exquisitely laser-cut stair railing featuring an intricate organic tree branch motif. Finished in a durable powder coat, it offers a blend of natural artistry and robust structural integrity."
  },
  {
    "id": "p_11",
    "categoryId": "gates",
    "name": "Botanical Leaf Laser-Cut Entrance Gate",
    "image": "/catalogue/gates/imgi_48_unnamed.png",
    "priceRange": "\u20b935,000 \u2013 \u20b975,000",
    "material": "Laser-Cut Mild Steel (or Weathering Steel) with Wooden Frame",
    "description": "This elegant entrance gate features a striking laser-cut botanical leaf pattern, combining modern design with functional privacy. Constructed from durable metal within a robust wooden frame, it offers a sophisticated aesthetic for residential and commercial entryways."
  },
  {
    "id": "p_12",
    "categoryId": "railings",
    "name": "Modern Geometric Floret Staircase Railing",
    "image": "/catalogue/railings/imgi_25_unnamed.png",
    "priceRange": "\u20b9850 \u2013 \u20b91,750/sq ft",
    "material": "Mild Steel",
    "description": "Elevate modern interiors with this laser-cut Mild Steel staircase railing, featuring a seamless geometric floret pattern. Its minimalist design and sleek finish provide both aesthetic appeal and robust safety for contemporary spaces."
  },
  {
    "id": "p_13",
    "categoryId": "gates",
    "name": "Palm Frond Laser-Cut Entry Gate",
    "image": "/catalogue/gates/imgi_49_unnamed.png",
    "priceRange": "\u20b920,000 \u2013 \u20b945,000",
    "material": "Mild Steel (Laser-Cut Panel) with Wood Frame",
    "description": "This bespoke entry gate features a captivating laser-cut metal panel showcasing an intricate tropical palm frond pattern, integrated into a robust wooden frame. It offers a blend of natural aesthetics and functional security, perfect for stylish residential or garden entrances."
  },
  {
    "id": "p_14",
    "categoryId": "jaali-screens",
    "name": "Interlocking Geometric Pattern Jaali Screen",
    "image": "/catalogue/jaali-screens/catalogue-18.jpeg",
    "priceRange": "\u20b9300 \u2013 \u20b9600/sq ft",
    "material": "Mild Steel",
    "description": "These robust laser-cut jaali screens feature a complex interlocking geometric pattern, finished in a durable reddish-brown coating. Ideal for enhancing aesthetics and providing ventilation or security for rooftop openings, partitions, or facade elements."
  },
  {
    "id": "p_15",
    "categoryId": "jaali-screens",
    "name": "Veepee Engineers Premium Laser-Cut Jaali Design Collection",
    "image": "/catalogue/jaali-screens/catalogue-13.jpeg",
    "priceRange": "\u20b9350 \u2013 \u20b9750/sq ft",
    "material": "Various (Mild Steel, Stainless Steel, Aluminum)",
    "description": "Discover an exquisite range of laser-cut jaali panels featuring intricate geometric, floral, and thematic patterns perfect for decorative partitions, railing infills, or architectural screens. Crafted with precision, these versatile panels are available in multiple materials and finishes to elevate any interior or exterior design."
  },
  {
    "id": "p_16",
    "categoryId": "industrial",
    "name": "Precision Fabricated Large-Diameter Pipeline Segments",
    "image": "/catalogue/industrial/catalogue-1.jpeg",
    "priceRange": "\u20b920,000 \u2013 \u20b960,000 per segment",
    "material": "Mild Steel",
    "description": "Heavy-duty fabricated metal sections, precisely curved with pre-drilled bolt holes for robust assembly into large diameter pipelines, culverts, or structural conduits. Designed for critical infrastructure and industrial projects requiring strong, custom-fit components."
  },
  {
    "id": "p_17",
    "categoryId": "jaali-screens",
    "name": "Nature-Inspired Laser-Cut Jaali Screens",
    "image": "/catalogue/jaali-screens/catalogue-19.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Mild Steel (Wood Finish)",
    "description": "These custom laser-cut decorative jaali panels feature an elegant nature-inspired, organic leaf pattern. Finished with a warm wood-look, they are perfect for creating sophisticated ceiling pergolas, accent walls, and privacy screens in both indoor and semi-outdoor spaces."
  },
  {
    "id": "p_18",
    "categoryId": "industrial",
    "name": "Coated Mild Steel Industrial Pipe Sections",
    "image": "/catalogue/industrial/catalogue-2.jpeg",
    "priceRange": "\u20b9800 \u2013 \u20b94,500/piece",
    "material": "Mild Steel",
    "description": "Robust Mild Steel pipe sections, finished with a durable black protective coating for enhanced corrosion resistance. These heavy-duty components are ideal for structural supports, fluid transfer systems, and various industrial machinery applications."
  },
  {
    "id": "p_19",
    "categoryId": "railings",
    "name": "Mandala Floral Laser-Cut Stair Railing",
    "image": "/catalogue/railings/catalogue-20.jpeg",
    "priceRange": "\u20b9450 \u2013 \u20b9850/sq ft",
    "material": "Mild Steel",
    "description": "Enhance your interior with our exquisite Mandala Floral Laser-Cut Stair Railings, featuring intricate patterns ideal for modern and traditional spaces. Crafted from durable mild steel with a sleek powder-coated finish, these railings offer both safety and sophisticated aesthetic appeal."
  },
  {
    "id": "p_20",
    "categoryId": "gates",
    "name": "Elegant Floral CNC Laser-Cut Entrance Gate",
    "image": "/catalogue/gates/catalogue-21.jpeg",
    "priceRange": "\u20b960,000 \u2013 \u20b91,80,000",
    "material": "Mild Steel with Wood Finish Accents",
    "description": "This sophisticated entrance gate combines a serene light-colored metal panel featuring intricate CNC laser-cut floral patterns with elegant wood-finish accents at the top and bottom. It offers a contemporary dual-tone design, perfect for enhancing the aesthetic appeal and security of modern residential or commercial properties."
  },
  {
    "id": "p_21",
    "categoryId": "pooja-panels",
    "name": "Vakratunda Om & Lotus Arch Pooja Panel Set",
    "image": "/catalogue/pooja-panels/catalogue-22.jpeg",
    "priceRange": "\u20b915,000 \u2013 \u20b940,000",
    "material": "Mild Steel / Stainless Steel / Aluminum",
    "description": "An exquisite CNC laser-cut pooja panel set featuring the sacred Om symbol, the auspicious Vakratunda Ganesh shloka, and delicate lotus arch detailing. This customizable design is perfect for creating a divine and serene ambiance in any pooja room or meditation space, available in various finishes."
  },
  {
    "id": "p_22",
    "categoryId": "pooja-panels",
    "name": "Divine Om Mandala Pooja Room CNC Panel",
    "image": "/catalogue/pooja-panels/catalogue-23.jpeg",
    "priceRange": "\u20b9350 \u2013 \u20b9600/sq ft",
    "material": "Mild Steel",
    "description": "A beautifully crafted CNC laser-cut panel featuring a central sacred 'Om' symbol enveloped in a mesmerizing radial mandala pattern. Ideal for home temples, pooja room partitions, and spiritual wall decor."
  },
  {
    "id": "p_23",
    "categoryId": "pooja-panels",
    "name": "Intricate Pooja Room Archway Designs",
    "image": "/catalogue/pooja-panels/catalogue-25.jpeg",
    "priceRange": "\u20b9350 \u2013 \u20b9650/sq ft",
    "material": "Various",
    "description": "A diverse catalog showcasing intricately laser-cut archway and panel designs for pooja rooms, featuring traditional motifs like Om, Swastika, floral patterns, and Shub-Labh inscriptions, offering a spiritual and aesthetic enhancement to sacred spaces. These designs are ideal for creating dedicated pooja areas and enhancing existing prayer rooms."
  },
  {
    "id": "p_24",
    "categoryId": "pooja-panels",
    "name": "Divine Ganesha Laser Cut Pooja Panels",
    "image": "/catalogue/pooja-panels/catalogue-26.jpeg",
    "priceRange": "\u20b9350 \u2013 \u20b9600/sq ft",
    "material": "Various",
    "description": "A collection of intricately designed Ganesha and Om motifs crafted with precision laser cutting techniques. These versatile panels are perfect for enhancing the spiritual ambiance of your pooja room or any decorative space."
  },
  {
    "id": "p_25",
    "categoryId": "pooja-panels",
    "name": "Intricate Om & Bell Pooja Panel",
    "image": "/catalogue/pooja-panels/catalogue-24.jpeg",
    "priceRange": "\u20b9450 \u2013 \u20b9850/sq ft",
    "material": "Mild Steel",
    "description": "A beautifully intricate laser-cut pooja panel featuring a central 'Om' symbol surrounded by abstract sun rays, complemented by hanging bell motifs and traditional diyas. The design incorporates elegant geometric patterns along the arch and sides, perfect for creating a sacred and serene ambiance in your prayer space."
  },
  {
    "id": "p_26",
    "categoryId": "pooja-panels",
    "name": "Divine Kalash & Diya Pooja Panel Set",
    "image": "/catalogue/pooja-panels/catalogue-28.jpeg",
    "priceRange": "\u20b9350 \u2013 \u20b9600/sq ft",
    "material": "Various",
    "description": "This exquisite laser-cut panel features traditional Hindu symbols - Om, Ganesha, Swastika, decorative diyas, and kalash, perfect for a serene pooja room. The intricate cutouts allow for beautiful backlighting effects, enhancing spiritual ambiance."
  },
  {
    "id": "p_27",
    "categoryId": "pooja-panels",
    "name": "Divine Krishna & Radha Laser-Cut Pooja Panels",
    "image": "/catalogue/pooja-panels/catalogue-27.jpeg",
    "priceRange": "\u20b9350 \u2013 \u20b9650/sq ft",
    "material": "Mild Steel",
    "description": "Exquisite laser-cut panels featuring intricate designs of Lord Krishna playing the flute and the divine Radha-Krishna duo. These aesthetically pleasing panels are ideal for enhancing the spiritual ambiance of pooja rooms and sacred spaces."
  },
  {
    "id": "p_28",
    "categoryId": "shadow-art",
    "name": "Roaring Lion Laser-Cut Shadow Art",
    "image": "/catalogue/shadow-art/catalogue-30.jpeg",
    "priceRange": "\u20b91,500 \u2013 \u20b95,000",
    "material": "Various",
    "description": "This captivating laser-cut art piece features the aggressive profile of a roaring lion, designed to cast a dramatic and inspiring shadow output. Crafted from a variety of potential materials for both indoor and outdoor applications, it serves as a powerful decorative element."
  },
  {
    "id": "p_29",
    "categoryId": "industrial",
    "name": "Industrial Dismantling Joint with Flanges",
    "image": "/catalogue/industrial/catalogue-3.jpeg",
    "priceRange": "\u20b94,000 - \u20b97,500",
    "material": "Mild Steel",
    "description": "A robust industrial dismantling joint with welded flanges for secure pipeline connections. This unpainted unit is ideal for quick installation and removal in various industrial applications, ensuring ease of maintenance and system flexibility."
  },
  {
    "id": "p_30",
    "categoryId": "jaali-screens",
    "name": "Modern Geometric Triangle Jaali Screen",
    "image": "/catalogue/jaali-screens/catalogue-29.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Mild Steel",
    "description": "This laser-cut jaali screen features a contemporary geometric design with repeating triangle patterns, perfect for modern architectural accents, partition walls, or decorative cladding. Crafted from mild steel, it offers durability and a sleek, industrial aesthetic."
  },
  {
    "id": "p_31",
    "categoryId": "jaali-screens",
    "name": "Intricate Floral Jaali Screen (Design 389)",
    "image": "/catalogue/jaali-screens/catalogue-31.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9550/sq ft",
    "material": "Various",
    "description": "Features an elaborate, symmetrical floral and vine pattern, perfect for creating partitions or decorative accents with a classic touch. Available in various finishes to suit modern or traditional interiors."
  },
  {
    "id": "p_32",
    "categoryId": "jaali-screens",
    "name": "Floral Vine Jaali Screen - Design 281",
    "image": "/catalogue/jaali-screens/catalogue-32.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Various",
    "description": "An elegant jaali screen featuring a delicate floral vine pattern, perfect for adding a touch of natural beauty and privacy to any space. The intricate laser-cut design offers a sophisticated aesthetic for both interior and exterior applications."
  },
  {
    "id": "p_33",
    "categoryId": "pooja-panels",
    "name": "Divine Aura Decorative Pooja Panels",
    "image": "/catalogue/pooja-panels/catalogue-35.jpeg",
    "priceRange": "\u20b9200 \u2013 \u20b9400/sq ft",
    "material": "Various",
    "description": "Exquisitely laser-cut decorative panels featuring a range of spiritual motifs such as 'Welcome' with a Namaste gesture, Ganesha, Om, Kalash, Buddha, Diya, and Swastik. These versatile designs are suitable for enhancing pooja rooms, main doors, or any area requiring a touch of divine elegance and cultural reverence."
  },
  {
    "id": "p_34",
    "categoryId": "jaali-screens",
    "name": "Floral Vine Jaali Screen 221",
    "image": "/catalogue/jaali-screens/catalogue-34.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Various",
    "description": "An elegant jaali screen featuring a flowing floral vine pattern, perfect for adding a natural and sophisticated touch to any interior or exterior space. The intricate laser-cut design allows for partial privacy while enhancing aesthetic appeal."
  },
  {
    "id": "p_35",
    "categoryId": "jaali-screens",
    "name": "Floral Cascade Jaali Screen Design (325)",
    "image": "/catalogue/jaali-screens/catalogue-33.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Various",
    "description": "An elegant jaali screen design featuring a delicate cascade of diverse floral patterns, perfect for creating partitions or decorative accents. Available in various materials and finishes to suit interior and exterior applications."
  },
  {
    "id": "p_36",
    "categoryId": "jaali-screens",
    "name": "Classic Custom Jaali Screen Collection",
    "image": "/catalogue/jaali-screens/catalogue-36.jpeg",
    "priceRange": "\u20b9250 - \u20b9450/sq ft",
    "material": "Various",
    "description": "Discover our collection of expertly crafted jaali screens, featuring intricate patterns ranging from floral motifs (Designs 150, 151) to elegant swirls (Design 149) and classic symmetrical designs (Design 152). These versatile CNC-cut panels can be custom-made in various materials to enhance any interior or exterior space with a touch of sophistication."
  },
  {
    "id": "p_37",
    "categoryId": "jaali-screens",
    "name": "Floral Butterfly Jaali Screen Design (Design No. 77)",
    "image": "/catalogue/jaali-screens/catalogue-37.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Various",
    "description": "An intricate laser-cut jaali design featuring delicate butterflies amidst blooming flowers and foliage, perfect for decorative partitions or wall accents. This versatile design offers elegance and can be customized to suit various aesthetic preferences and applications."
  },
  {
    "id": "p_38",
    "categoryId": "jaali-screens",
    "name": "Geometric Bloom Jaali Screen Panel 185",
    "image": "/catalogue/jaali-screens/catalogue-38.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Various",
    "description": "Features an intricate geometric bloom pattern, ideal for contemporary interiors and architectural accents. This laser-cut design offers both aesthetic appeal and functional airflow."
  },
  {
    "id": "p_39",
    "categoryId": "jaali-screens",
    "name": "Floral & Ornamental Laser-Cut Jaali Screens",
    "image": "/catalogue/jaali-screens/catalogue-39.jpeg",
    "priceRange": "\u20b9250 - \u20b9450/sq ft",
    "material": "Various",
    "description": "A diverse collection of CNC laser-cut jaali screens featuring intricate floral patterns and elegant ornamental designs. These versatile panels are ideal for partitions, room dividers, railings, and decorative wall applications, offering both aesthetic appeal and semi-privacy."
  },
  {
    "id": "p_40",
    "categoryId": "shadow-art",
    "name": "Urban Skyline Silhouette Shadow Art",
    "image": "/catalogue/shadow-art/catalogue-4.jpeg",
    "priceRange": "\u20b9200 \u2013 \u20b9400/sq ft",
    "material": "Mild Steel",
    "description": "This laser-cut decorative panel features an abstract urban skyline silhouette, perfect for modern interior accents or unique wall art. Crafted from mild steel, it offers a contemporary aesthetic for both residential and commercial spaces."
  },
  {
    "id": "p_41",
    "categoryId": "jaali-screens",
    "name": "Floral Scroll Jaali Screen Designs",
    "image": "/catalogue/jaali-screens/catalogue-40.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Various",
    "description": "A collection of intricate CNC laser-cut jaali screens featuring diverse floral and scroll patterns for elegant partitions, railings, or decorative applications. These designs offer a sophisticated aesthetic for both interior and exterior spaces."
  },
  {
    "id": "p_42",
    "categoryId": "railings",
    "name": "Nautical Compass Laser-Cut Balustrade Panel",
    "image": "/catalogue/railings/catalogue-41.jpeg",
    "priceRange": "\u20b9450 \u2013 \u20b9850/sq ft",
    "material": "Mild Steel",
    "description": "This intricately laser-cut balustrade panel features a detailed nautical compass and anchor design, perfect for enhancing stairways or landings with a unique maritime theme. The finished product, likely in a matte black, offers both aesthetic appeal and structural support."
  },
  {
    "id": "p_43",
    "categoryId": "jaali-screens",
    "name": "Intricate Geometric Jaali Screen",
    "image": "/catalogue/jaali-screens/catalogue-42.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Mild Steel",
    "description": "This image showcases a finely detailed geometric jaali screen, ideal for architectural accents or space division. Its precision laser-cut design provides a sophisticated aesthetic for both interior and exterior applications."
  },
  {
    "id": "p_44",
    "categoryId": "shadow-art",
    "name": "Nataraja Cosmic Dance Shadow Art",
    "image": "/catalogue/shadow-art/catalogue-44.jpeg",
    "priceRange": "\u20b92,500 \u2013 \u20b95,000",
    "material": "Mild Steel",
    "description": "Exquisitely laser-cut Nataraja silhouette depicting the cosmic dance, presented in a sleek black finish. This spiritual art piece is perfect for enhancing the ambiance of any room or pooja space."
  },
  {
    "id": "p_45",
    "categoryId": "railings",
    "name": "Intricate Leafy Motif Stair Railing Panels",
    "image": "/catalogue/railings/catalogue-46.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Mild Steel",
    "description": "These laser-cut railing panels feature an intricate leafy motif, providing an elegant and natural aesthetic to any staircase. The design offers both safety and decorative appeal, enhancing interior spaces with a sophisticated touch."
  },
  {
    "id": "p_46",
    "categoryId": "gift-decor",
    "name": "Customized Decorative Nameplate",
    "image": "/catalogue/gift-decor/catalogue-43.jpeg",
    "priceRange": "\u20b91,500 \u2013 \u20b94,000",
    "material": "Mild Steel",
    "description": "A custom laser-cut nameplate featuring personalized text in Devanagari script, rendered in a contrasting finish for high readability and elegant appeal. This decorative item is perfect for personalizing home entrances or office spaces."
  },
  {
    "id": "p_47",
    "categoryId": "gates",
    "name": "Urban Canopy Laser-Cut Gate",
    "image": "/catalogue/gates/catalogue-45.jpeg",
    "priceRange": "\u20b91,500 \u2013 \u20b92,500/sq ft",
    "material": "Mild Steel",
    "description": "This modern laser-cut gate features an intricate tree branch design, offering both privacy and an artistic aesthetic for contemporary homes. Crafted from durable mild steel, it provides a secure and stylish entrance."
  },
  {
    "id": "p_48",
    "categoryId": "railings",
    "name": "Ornate Wrought Iron Stair Railing",
    "image": "/catalogue/railings/catalogue-47.jpeg",
    "priceRange": "\u20b9450 \u2013 \u20b9900/sq ft",
    "material": "Mild Steel",
    "description": "This exquisite wrought iron railing features an intricate scrollwork design, offering a classic and luxurious touch to any staircase. Finished in a rich dark tone, it provides both safety and sophisticated aesthetic appeal."
  },
  {
    "id": "p_49",
    "categoryId": "gates",
    "name": "Radha Krishna Laser-Cut Entry Gate",
    "image": "/catalogue/gates/catalogue-48.jpeg",
    "priceRange": "\u20b9750 \u2013 \u20b91,200/sq ft",
    "material": "Mild Steel",
    "description": "A beautifully laser-cut gate featuring Radha and Krishna on a swing under a tree, flanked by panels with intricate floral patterns. This gate combines both aesthetic appeal with robust construction, ideal for entrance points requiring spiritual and elegant design."
  },
  {
    "id": "p_50",
    "categoryId": "gates",
    "name": "Modern Abstract Laser-Cut Entrance Gate with Jaali Panel",
    "image": "/catalogue/gates/catalogue-49.jpeg",
    "priceRange": "\u20b928,000 \u2013 \u20b955,000",
    "material": "Mild Steel",
    "description": "This modern entrance gate features a solid panel section combined with an artistic, abstract laser-cut jaali panel, offering both security and contemporary design. Its intricate design allows for light and air while maintaining a sophisticated aesthetic suitable for various architectural styles."
  },
  {
    "id": "p_51",
    "categoryId": "pooja-panels",
    "name": "Mahalakshmi Yantra Mirror Panel",
    "image": "/catalogue/pooja-panels/catalogue-5.jpeg",
    "priceRange": "\u20b95,000 \u2013 \u20b912,000",
    "material": "Various",
    "description": "An intricately laser-cut Mahalakshmi Yantra with sacred mantras and Bija numbers, featuring vibrant red detailing on a mirrored panel. This spiritually significant piece is perfect for enhancing the ambiance of a pooja room or sacred space."
  },
  {
    "id": "p_52",
    "categoryId": "gates",
    "name": "Elegant Floral Laser-Cut Main Gate",
    "image": "/catalogue/gates/catalogue-51.jpeg",
    "priceRange": "\u20b920,000 \u2013 \u20b960,000",
    "material": "Mild Steel",
    "description": "A sophisticated main gate featuring symmetrical laser-cut floral and vine patterns for a welcoming and secure entrance. The design is finished in a light, neutral color, suitable for various architectural styles."
  },
  {
    "id": "p_53",
    "categoryId": "gates",
    "name": "Classic Opulence Laser-Cut Gates",
    "image": "/catalogue/gates/catalogue-50.jpeg",
    "priceRange": "\u20b9450 \u2013 \u20b9900/sq ft",
    "material": "Mild Steel",
    "description": "These robust laser-cut gates feature an elegant, classic floral design, offering a blend of security and aesthetic appeal. Crafted from durable Mild Steel with a rustic finish, they provide a sophisticated entry point for any property."
  },
  {
    "id": "p_54",
    "categoryId": "gates",
    "name": "Elegant Leaf Motif CNC-Cut Gate",
    "image": "/catalogue/gates/catalogue-52.jpeg",
    "priceRange": "\u20b918,000 \u2013 \u20b935,000",
    "material": "Mild Steel",
    "description": "This stunning double-door gate features intricate CNC laser-cut leaf and vine patterns, offering a blend of security and aesthetic appeal. The design is perfect for residential entrances, adding a touch of natural elegance to any home."
  },
  {
    "id": "p_55",
    "categoryId": "gates",
    "name": "Custom CNC Laser-Cut MS Door with Greek Key Pattern",
    "image": "/catalogue/gates/catalogue-53.jpeg",
    "priceRange": "\u20b94,000 \u2013 \u20b98,000",
    "material": "Mild Steel",
    "description": "This is a robust mild steel door featuring custom CNC laser-cut designs, including a Greek key border and abstract central patterns. It is ideal for security and aesthetic enhancement in residential or commercial settings."
  },
  {
    "id": "p_56",
    "categoryId": "railings",
    "name": "Art Deco CNC-Cut Steel Railing Balusters",
    "image": "/catalogue/railings/catalogue-54.jpeg",
    "priceRange": "\u20b9350 \u2013 \u20b9650/piece",
    "material": "Mild Steel",
    "description": "These elegant railing balusters feature a distinctive Art Deco-inspired design, precision CNC-cut from mild steel for a sophisticated and modern staircase. Ideal for enhancing interior and exterior staircases with a blend of classic style and contemporary craftsmanship."
  },
  {
    "id": "p_57",
    "categoryId": "balustrades-staircases",
    "name": "Op-Art Geometric Staircase Railing",
    "image": "/catalogue/gates/catalogue-55.jpeg",
    "priceRange": "\u20b915,000 \u2013 \u20b935,000",
    "material": "Mild Steel",
    "description": "A striking laser-cut metal staircase railing/balustrade featuring a dynamic optical-art geometric pattern. Finished in matte black, it provides a sophisticated, modern balustrade for residential and commercial staircases."
  },
  {
    "id": "p_58",
    "categoryId": "pooja-panels",
    "name": "Mirror-Polished Om Symbol Art",
    "image": "/catalogue/pooja-panels/catalogue-6.jpeg",
    "priceRange": "\u20b9500 \u2013 \u20b92,500",
    "material": "Brass",
    "description": "This is an intricately laser-cut Om symbol, likely in brass, featuring a highly polished, reflective background. Ideal for creating a sacred ambiance in pooja rooms or as a decorative accent."
  },
  {
    "id": "p_59",
    "categoryId": "industrial",
    "name": "Industrial Galvanized Pipe Clamps",
    "image": "/catalogue/industrial/catalogue-7.jpeg",
    "priceRange": "\u20b950 - \u20b9150/piece",
    "material": "Mild Steel",
    "description": "Durable industrial pipe clamps with a galvanized finish, designed for secure and long-lasting pipe installations in various industrial applications. These components ensure robust fastening and corrosion resistance."
  },
  {
    "id": "p_60",
    "categoryId": "jaali-screens",
    "name": "Geometric Triangle Pattern Jaali Screen",
    "image": "/catalogue/jaali-screens/catalogue-8.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Mild Steel",
    "description": "A contemporary laser-cut jaali screen featuring a repetitive pattern of triangles and geometric shapes. This versatile design offers semi-privacy and decorative appeal for various architectural and interior applications."
  },
  {
    "id": "p_61",
    "categoryId": "mirror-frames",
    "name": "Intricate Floral Laser-Cut Mirror Frame",
    "image": "/catalogue/mirror-frames/catalogue-9.jpeg",
    "priceRange": "\u20b92,500 \u2013 \u20b96,000",
    "material": "High-Density Fiberboard (HDF)",
    "description": "This exquisite mirror frame features an intricate floral and scrollwork design, precision laser-cut for a delicate finish. The black matte finish enhances the contrast with the reflective mirror, creating a sophisticated decorative piece for any interior."
  },
  {
    "id": "p_62",
    "categoryId": "jaali-screens",
    "name": "Intricate Floral Dome Pergola",
    "image": "/catalogue/jaali-screens/catalogue.jpeg",
    "priceRange": "Price on Request",
    "material": "Mild Steel",
    "description": "Custom-fabricated decorative metal dome featuring intricate floral and arabesque laser-cut patterns. Ideal for enhancing pergolas, gazebos, or other outdoor architectural structures with a touch of elegance."
  },
  {
    "id": "p_63",
    "categoryId": "industrial",
    "name": "Precision CNC Fiber Laser Cutting Service",
    "image": "/catalogue/industrial/imgi_11_07f30c5e-2c8f-44e9-8252-4933a2a0bc42.jpeg",
    "priceRange": "Contact for Quote",
    "material": "Various",
    "description": "Veepee Engineers offers high-precision CNC Fiber Laser cutting services for fine artistic designs and industrial applications with smooth finishing and quick service. Our advanced machinery ensures intricate detailing and efficient production for a wide range of materials."
  },
  {
    "id": "p_64",
    "categoryId": "industrial",
    "name": "Hypertherm CNC Plasma Cutting Service (50mm, 3000x6000mm Capacity)",
    "image": "/catalogue/industrial/imgi_12_f59bb2cb-0ed8-440a-aab0-84707c11b47e.jpeg",
    "priceRange": "Price on Request",
    "material": "Various",
    "description": "Veepee Engineers offers heavy-duty, thick sheet cutting services utilizing a Hypertherm CNC Plasma machine with a 50mm capacity and a large work area of 3000 x 6000 mm. This service is ideal for precision cutting of various industrial materials."
  },
  {
    "id": "p_65",
    "categoryId": "industrial",
    "name": "Industrial Brake Press Metal Bending Service (8MM x 3MTR)",
    "image": "/catalogue/industrial/imgi_14_0f92dad2-51d3-4af2-80fe-3198dae7f5bc.jpeg",
    "priceRange": "Contact for Quote",
    "material": "Various",
    "description": "Veepee Engineers offers precision metal bending and forming services using our robust 8MM x 3MTR Brake Press. We handle various material types and thicknesses to meet diverse industrial fabrication needs with high accuracy and efficiency."
  },
  {
    "id": "p_66",
    "categoryId": "industrial",
    "name": "Industrial Hydraulic Plate Shear Machine (8mm x 3m)",
    "image": "/catalogue/industrial/imgi_15_7e53235a-afd9-4251-8d42-57c26a5405e9.jpeg",
    "priceRange": "Price on Request",
    "material": "Various",
    "description": "This powerful 8mm x 3m hydraulic shear machine is essential for precision cutting of sheet metal in various industrial applications. It ensures clean, accurate cuts for fabrications across multiple material types, facilitating high-volume production."
  },
  {
    "id": "p_67",
    "categoryId": "industrial",
    "name": "Industrial Plate Rolling Services (25 x 2500MM)",
    "image": "/catalogue/industrial/imgi_13_a2c88c21-843f-4660-97c0-94d4958dd9a4.jpeg",
    "priceRange": "Price on Request",
    "material": "Various",
    "description": "Veepee Engineers offers precision industrial plate rolling services using a robust 25 x 2500mm rolling machine, capable of forming various metal sheets into cylindrical or conical shapes. This service is ideal for manufacturing ducts, tanks, silos, and other curved metal components for diverse industrial applications."
  },
  {
    "id": "p_68",
    "categoryId": "industrial",
    "name": "500-Ton Industrial Hydraulic Press",
    "image": "/catalogue/industrial/imgi_16_cc7c5b25-bb16-4f12-badc-387a937a0dee.jpeg",
    "priceRange": "Price on Request",
    "material": "Mild Steel",
    "description": "This is a robust 500-ton hydraulic press with a 2x2 meter opening, ideal for heavy-duty industrial forming and pressing applications. It is designed for high-force operations in manufacturing settings."
  },
  {
    "id": "p_69",
    "categoryId": "industrial",
    "name": "Advanced MIG/TIG/Spot Welding Services",
    "image": "/catalogue/industrial/imgi_17_785571d4-b9a4-4e39-8e51-74afd3aa8def.jpeg",
    "priceRange": "Price on Request",
    "material": "Various",
    "description": "Veepee Engineers offers comprehensive MIG, TIG, and Spot Welding services, utilizing modern machinery such as the Esab Mig 400 and Ador Welding 50 mm Spot Welder. Our skilled team provides precision welding for a wide range of industrial applications and materials."
  },
  {
    "id": "p_70",
    "categoryId": "industrial",
    "name": "Custom Structural Fabrication - Large Industrial Module",
    "image": "/catalogue/industrial/imgi_18_d1dc306b-82eb-4215-ae47-071d70b3058f.jpeg",
    "priceRange": "Price on Request",
    "material": "Mild Steel",
    "description": "Veepee Engineers specializes in the fabrication of large-scale industrial structures, such as this 3x5x7 meter module. We provide custom solutions for robust and functional structural components designed for diverse industrial applications."
  },
  {
    "id": "p_71",
    "categoryId": "jaali-screens",
    "name": "Ethereal Butterfly & Vine Jaali Screen",
    "image": "/catalogue/jaali-screens/latest-work-2-1.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Mild Steel",
    "description": "This exquisite laser-cut jaali screen features a delicate design of butterflies and flowing vines, creating a serene and elegant aesthetic for any space. Crafted with precision, it offers both decorative appeal and functional light diffusion."
  },
  {
    "id": "p_72",
    "categoryId": "industrial",
    "name": "Industrial Power Press Services (85/50 Ton)",
    "image": "/catalogue/industrial/imgi_20_2a2fb55b-a688-46de-a5e4-c55490823b61.jpeg",
    "priceRange": "Price on Request",
    "material": "Various",
    "description": "Veepee Engineers offers precision power press services using 85/50 ton machines, capable of handling various forming and punching operations for industrial components. Our workshop is equipped to produce custom drawn items and other press-formed parts for diverse manufacturing needs."
  },
  {
    "id": "p_73",
    "categoryId": "industrial",
    "name": "Junior Coupling Connectors",
    "image": "/catalogue/industrial/imgi_20_unnamed.jpg",
    "priceRange": "\u20b9150 \u2013 \u20b9500",
    "material": "Cast Iron",
    "description": "These are red-painted Junior Coupling Connectors, essential components for various plumbing and industrial piping applications. They are designed for reliable and secure pipe connections in diverse systems."
  },
  {
    "id": "p_74",
    "categoryId": "industrial",
    "name": "5 Ton Overhead Traveling Crane",
    "image": "/catalogue/industrial/imgi_19_c7bda3aa-e5ca-42cc-a476-1ee25492e718.jpeg",
    "priceRange": "Price on request",
    "material": "Various",
    "description": "This image showcases a robust 5-ton overhead traveling crane, perfect for heavy-duty lifting and material handling in industrial workshops. It is designed for efficient and safe operation, essential for manufacturing and fabrication processes."
  },
  {
    "id": "p_75",
    "categoryId": "jaali-screens",
    "name": "Circular Maze Pattern Jaali",
    "image": "/catalogue/jaali-screens/latest-work-2.jpeg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Mild Steel",
    "description": "This laser-cut circular jaali screen features an intricate maze pattern, perfect for decorative partitioning or wall art. Its metallic finish adds a touch of modern sophistication, suitable for both indoor and outdoor applications."
  },
  {
    "id": "p_76",
    "categoryId": "shadow-art",
    "name": "Devotional Ganesha Shadow Art",
    "image": "/catalogue/shadow-art/imgi_23_unnamed.jpg",
    "priceRange": "\u20b92,500 \u2013 \u20b95,000",
    "material": "Mild Steel",
    "description": "This exquisite laser-cut Ganesha shadow art piece features intricate details on a mild steel surface, mounted on a solid wooden base. It is perfect for adding a touch of devotion and artistic elegance to any home or office space."
  },
  {
    "id": "p_77",
    "categoryId": "gift-decor",
    "name": "Romantic Proposal Silhouette Desk Decor",
    "image": "/catalogue/gift-decor/imgi_26_unnamed.jpg",
    "priceRange": "\u20b9450 \u2013 \u20b9850",
    "material": "Mild Steel",
    "description": "This elegant laser-cut silhouette depicts a romantic proposal scene, perfect for adding a touch of sentiment to any desk or shelf. Crafted from durable mild steel, it makes a thoughtful gift or charming decorative piece."
  },
  {
    "id": "p_78",
    "categoryId": "shadow-art",
    "name": "Lord Shiva & Ganesha Laser-Cut Shadow Art Frames",
    "image": "/catalogue/shadow-art/imgi_28_unnamed.jpg",
    "priceRange": "\u20b9750 \u2013 \u20b92,500",
    "material": "Various",
    "description": "Exquisite laser-cut shadow art depicting Lord Shiva and Lord Ganesha, framed for elegant display. These pieces offer a blend of intricate design and spiritual reverence, perfect for home decor or gifting."
  },
  {
    "id": "p_79",
    "categoryId": "shadow-art",
    "name": "Romantic Proposal Silhouette Art",
    "image": "/catalogue/shadow-art/imgi_27_unnamed.jpg",
    "priceRange": "\u20b91,500 \u2013 \u20b93,000",
    "material": "Mild Steel",
    "description": "This exquisite laser-cut silhouette art piece captures a romantic proposal scene, offering a timeless and elegant decorative accent. Crafted from durable mild steel with a matte black finish, it serves as a perfect gift or a charming addition to any interior space."
  },
  {
    "id": "p_80",
    "categoryId": "jaali-screens",
    "name": "Elegant Swirls Metal Screen",
    "image": "/catalogue/jaali-screens/imgi_35_unnamed.jpg",
    "priceRange": "\u20b9250 \u2013 \u20b9450/sq ft",
    "material": "Mild Steel",
    "description": "This laser-cut metal screen features an elegant and flowing swirl design, perfect for decorative room dividers, fa\u00e7ade cladding, or railing inserts. The raw mild steel finish offers a versatile base for various coating options."
  },
  {
      "id": "p_81",
      "categoryId": "railings",
      "name": "Modern Flowing Wave Staircase Railing Panel",
      "image": "/catalogue/railings/cat-main.jpeg",
      "priceRange": "₹800 – ₹1,800/sq ft",
      "material": "Mild Steel",
      "description": "Exquisitely designed staircase railing featuring organic, sweeping wave-like geometric panels. Ideal for premium residential interiors, offering safety with modern sculptural aesthetics."
  },
  {
      "id": "p_82",
      "categoryId": "gift-decor",
      "name": "Custom Metal Nameplate with Ornamental Frame (Singh)",
      "image": "/catalogue/gift-decor/cat-1.jpeg",
      "priceRange": "₹1,500 – ₹3,500",
      "material": "Mild Steel (Powder Coated)",
      "description": "Bespoke metal nameplate featuring the family name in elegant cursive calligraphy, enclosed within a highly detailed classical baroque border frame. Freestanding on a wooden backplate."
  },
  {
      "id": "p_83",
      "categoryId": "gift-decor",
      "name": "Classic Custom Script Nameplate Collection",
      "image": "/catalogue/gift-decor/cat-2.jpeg",
      "priceRange": "₹1,200 – ₹3,000",
      "material": "Mild Steel / Brass",
      "description": "Customized metal script signs showcasing names like 'JAINS' with scrollwork scroll bases, or oval-framed names. Clean CNC profiles finished in weather-resistant paints."
  },
  {
      "id": "p_84",
      "categoryId": "gift-decor",
      "name": "Premium Multi-Design Metal House Nameplates",
      "image": "/catalogue/gift-decor/cat-3.jpeg",
      "priceRange": "₹1,800 – ₹4,500",
      "material": "Stainless Steel / Brass Finish",
      "description": "Elegant collection of customized house plates combining high-precision laser-cut lettering, intricate borders, and traditional motifs like peacocks or flutes."
  },
  {
      "id": "p_85",
      "categoryId": "gift-decor",
      "name": "Negative Cut Silhouette Nameplate (Singh)",
      "image": "/catalogue/gift-decor/cat-4.jpeg",
      "priceRange": "₹1,400 – ₹3,200",
      "material": "Mild Steel (Matte Black Finish)",
      "description": "Solid metal rectangular plate featuring the name 'Singh' in negative space cutout with ornamental corner trims. Perfect for mounting with warm backlighting on stone or wood walls."
  },
  {
      "id": "p_86",
      "categoryId": "industrial",
      "name": "Fabricated Heavy-Duty Steel Cylinders",
      "image": "/catalogue/industrial/cat-7.jpeg",
      "priceRange": "₹3,000 – ₹8,000/segment",
      "material": "Mild Steel",
      "description": "Precisely curved and welded thick-walled steel cylinders, designed as heavy-duty casing segments for tubewells and municipal water supply pipe networks."
  },
  {
      "id": "p_87",
      "categoryId": "industrial",
      "name": "Welded Steel Cage Frameworks",
      "image": "/catalogue/industrial/cat-8.jpeg",
      "priceRange": "₹2,500 – ₹6,000/piece",
      "material": "Mild Steel Rods",
      "description": "Industrial-grade vertical circular cage frameworks fabricated for water well screening, concrete column reinforcement, or heavy industrial filtration."
  },
  {
      "id": "p_88",
      "categoryId": "industrial",
      "name": "Industrial Flanged Fittings and Connectors",
      "image": "/catalogue/industrial/cat-9.jpeg",
      "priceRange": "₹800 – ₹3,500/piece",
      "material": "Cast Steel (Epoxy Coated)",
      "description": "Epoxy-painted flanged pipe bends, couplers, and adaptors for municipal water systems, ensuring long-term resistance to corrosion and high pressure."
  },
  {
      "id": "p_89",
      "categoryId": "industrial",
      "name": "CNC Rolled Steel Flat Rings",
      "image": "/catalogue/industrial/cat-10.jpeg",
      "priceRange": "₹400 – ₹1,200/piece",
      "material": "Mild Steel",
      "description": "Flat rings rolled and welded with high precision for use as industrial pipe flanges, tank gaskets, or structural spacers."
  },
  {
      "id": "p_90",
      "categoryId": "industrial",
      "name": "Welded Shuttering Formwork Panels",
      "image": "/catalogue/industrial/cat-11.jpeg",
      "priceRange": "₹3,000 – ₹7,500/piece",
      "material": "Mild Steel Channels & Sheets",
      "description": "Heavy-duty steel concrete formwork panels reinforced with welded angle frames. Finished in industrial blue paint for long-lasting reuse on civil sites."
  },
  {
      "id": "p_91",
      "categoryId": "industrial",
      "name": "Overhead Tank Shuttering Molds",
      "image": "/catalogue/industrial/cat-12.jpeg",
      "priceRange": "₹2,500 – ₹8,000/segment",
      "material": "Mild Steel",
      "description": "Circular modular shuttering channel molds designed specifically for casting concrete columns and shells of overhead water tanks (OHT)."
  },
  {
      "id": "p_92",
      "categoryId": "industrial",
      "name": "Custom Steel Trough Plate Rolling",
      "image": "/catalogue/industrial/cat-13.jpeg",
      "priceRange": "₹5,000 – ₹15,000/segment",
      "material": "Mild Steel (Thick Plate)",
      "description": "Heavy plate sheets rolled into semi-cylindrical troughs or conduits, customized for industrial material transport or large-diameter pipe shielding."
  },
  {
      "id": "p_93",
      "categoryId": "industrial",
      "name": "Welded Flange Pipeline Connectors",
      "image": "/catalogue/industrial/cat-14.jpeg",
      "priceRange": "₹1,500 – ₹4,500/piece",
      "material": "Mild Steel",
      "description": "Fabricated short pipe connectors welded with dual pre-drilled flanges on each end for fast and secure pipeline integration."
  },
  {
      "id": "p_94",
      "categoryId": "gates",
      "name": "MS Flat-Bar Main Gate (Fabrication Phase)",
      "image": "/catalogue/gates/cat-16.jpeg",
      "priceRange": "₹40,000 – ₹1,10,000",
      "material": "Mild Steel",
      "description": "Modern sliding or double-open main gate constructed with flat-bar horizontal grill inserts and reinforced border columns, shown under welding in our shop."
  },
  {
      "id": "p_95",
      "categoryId": "gift-decor",
      "name": "Laser-Cut Water Drop Tap Logo Sign",
      "image": "/catalogue/gift-decor/cat-17.jpeg",
      "priceRange": "₹800 – ₹2,200",
      "material": "Mild Steel (Gray Finish)",
      "description": "Sleek and creative logo plaque depicting a water droplet silhouette with an integrated tap. Perfect as office decor or branding for plumbing and water solution companies."
  },
  {
      "id": "p_96",
      "categoryId": "industrial",
      "name": "Overhead Water Tank (OHT) Shuttering Assembly",
      "image": "/catalogue/industrial/cat-18.jpeg",
      "priceRange": "₹12,000 – ₹35,000/module",
      "material": "Mild Steel (Stiffened)",
      "description": "Modular circular formwork module reinforced with circular rib rings and flange bolt holes for precise concrete overhead tank fabrication."
  },
  {
      "id": "p_97",
      "categoryId": "industrial",
      "name": "Heavy Flanged OHT Shuttering Segments",
      "image": "/catalogue/industrial/cat-21.jpeg",
      "priceRange": "₹4,000 – ₹9,000/segment",
      "material": "Mild Steel",
      "description": "Heavy-duty semi-circular steel shuttering molds with bolted connection flanges, loaded for shipping to infrastructure sites."
  },
  {
      "id": "p_98",
      "categoryId": "gift-decor",
      "name": "Artistic Laser-Cut Metal Logo Plates",
      "image": "/catalogue/gift-decor/cat-23.jpeg",
      "priceRange": "₹1,500 – ₹3,800",
      "material": "Mild Steel / Stainless Steel",
      "description": "Custom wall logo medallions and script nameplates, including round floral frames, text cutouts, and custom geometric logos."
  },
  {
      "id": "p_99",
      "categoryId": "gift-decor",
      "name": "Oval Gold Cursive Script Nameplate (Singh)",
      "image": "/catalogue/gift-decor/cat-24.jpeg",
      "priceRange": "₹1,800 – ₹4,000",
      "material": "Brass / Polished Steel",
      "description": "A premium polished gold-finish nameplate featuring elegant script lettering inside a sleek oval matching border, ideal for entryways."
  },
  {
      "id": "p_100",
      "categoryId": "gift-decor",
      "name": "Backlit Dual-Tone Wooden Nameplates",
      "image": "/catalogue/gift-decor/cat-25.jpeg",
      "priceRange": "₹2,500 – ₹5,500",
      "material": "Mild Steel & Teak Wood Backing",
      "description": "Sophisticated nameplates combining precision laser-cut metal name text with solid premium wood backings and integrated warm LED backlighting."
  },
  {
      "id": "p_101",
      "categoryId": "industrial",
      "name": "Precision Welding of Piping Flanges",
      "image": "/catalogue/industrial/cat-26.jpeg",
      "priceRange": "₹500 – ₹1,800/weld",
      "material": "Mild Steel",
      "description": "Professional high-durability welding and assembly service for heavy steel pipe flanges and municipal distribution joints."
  },
  {
      "id": "p_102",
      "categoryId": "shadow-art",
      "name": "St. Bernard Dog Silhouette Shadow Art",
      "image": "/catalogue/shadow-art/cat-27.jpeg",
      "priceRange": "₹1,800 – ₹4,500",
      "material": "Mild Steel",
      "description": "High-fidelity laser-cut profile of a St. Bernard dog. When backlit or front-lit against a wall, it casts a beautiful, life-like shadow portrait."
  },
  {
      "id": "p_103",
      "categoryId": "industrial",
      "name": "Finished Industrial Pipeline Parts Delivery",
      "image": "/catalogue/industrial/cat-28.jpeg",
      "priceRange": "₹25,000 – ₹75,000/batch",
      "material": "Mild Steel (Epoxy Finished)",
      "description": "Complete batch of fabricated water supply infrastructure parts, including pipe reducers, couplings, and screen cages, loaded for delivery."
  },
  {
      "id": "p_104",
      "categoryId": "jaali-screens",
      "name": "VEEPEE CNC Jaali Design Book Panels",
      "image": "/catalogue/jaali-screens/cat-29.jpeg",
      "priceRange": "₹200 – ₹450/sq ft",
      "material": "Mild Steel / MDF",
      "description": "Catalog collection of four elegant CNC cutting designs: floral patterns, botanical leaves, radial grids, and traditional paisley shapes."
  },
  {
      "id": "p_105",
      "categoryId": "gift-decor",
      "name": "Gable-Roof Silhouette Nameplate (Matri Chhaya)",
      "image": "/catalogue/gift-decor/cat-30.jpeg",
      "priceRange": "₹1,500 – ₹3,200",
      "material": "Mild Steel",
      "description": "Custom metal plaque featuring a house gable-roof silhouette, with 'MATRI CHHAYA' name beautifully cut out."
  },
  {
      "id": "p_106",
      "categoryId": "laser-cutting-services",
      "name": "Precision Fiber Laser Marking Service",
      "image": "/catalogue/laser-cutting-services/cat-31.jpeg",
      "priceRange": "₹100 – ₹500/job",
      "material": "Stainless Steel / Brass / Copper",
      "description": "High-detail fiber laser surface marking and engraving on metallic sheets for logo panels, labels, or devotional symbols."
  },
  {
      "id": "p_108",
      "categoryId": "industrial",
      "name": "OHT Shuttering Panel System (Modular)",
      "image": "/catalogue/industrial/cat-34.jpeg",
      "priceRange": "₹120/kg",
      "material": "Mild Steel",
      "description": "Modular Overhead Tank (OHT) steel shuttering panel set, designed for heavy construction use. Extremely durable and load-resistant."
  },
  {
      "id": "p_109",
      "categoryId": "gift-decor",
      "name": "Custom Hindi Script Outdoor Nameplate (Indrajeet Singh)",
      "image": "/catalogue/gift-decor/cat-35.jpeg",
      "priceRange": "₹1,600 – ₹3,800",
      "material": "Mild Steel (Powder Coated)",
      "description": "Weather-proof outdoor house nameplate in Devanagari script (इन्द्रजीत सिंह), featuring lanes and address details in clean cutouts."
  },
  {
      "id": "p_110",
      "categoryId": "shadow-art",
      "name": "Roaring Lion Silhouette Shadow Art Panel",
      "image": "/catalogue/shadow-art/cat-36.jpeg",
      "priceRange": "₹2,000 – ₹5,500",
      "material": "Mild Steel",
      "description": "Bespoke laser-cut wall panel featuring the intense profile of a roaring lion, casting a strong shadow when backlit."
  },
  {
      "id": "p_111",
      "categoryId": "industrial",
      "name": "All types of shuttering panels - raw parts",
      "image": "/catalogue/industrial/cat-37.jpeg",
      "priceRange": "₹80 – ₹110/kg",
      "material": "Mild Steel",
      "description": "Custom channel segments, flat bar reinforcements, and templates cut and rolled for standard concrete formwork shuttering."
  },
  {
      "id": "p_112",
      "categoryId": "railings",
      "name": "Illusionist Geometric Railing Panel (Design 3)",
      "image": "/catalogue/railings/cat-38.jpeg",
      "priceRange": "₹850 – ₹1,800/sq ft",
      "material": "Mild Steel",
      "description": "Modern staircase railing panel utilizing concentric geometric rectangular lines, creating a clean optical art style."
  },
  {
      "id": "p_113",
      "categoryId": "industrial",
      "name": "Red-Painted Steel Couplings Batch",
      "image": "/catalogue/industrial/cat-40.jpeg",
      "priceRange": "₹2,000 – ₹5,000/piece",
      "material": "Mild Steel",
      "description": "High-durability painted steel couplings and sleeves stacked for transport to municipal water projects."
  },
  {
      "id": "p_114",
      "categoryId": "industrial",
      "name": "Black-Painted Reducer Couplings",
      "image": "/catalogue/industrial/cat-41.jpeg",
      "priceRange": "₹1,800 – ₹4,500/piece",
      "material": "Mild Steel",
      "description": "Welded reducer sleeves finished in black protective coating, designed for transition connections in large diameter pipes."
  },
  {
      "id": "p_115",
      "categoryId": "industrial",
      "name": "Welded Heavy Structural Support Frames",
      "image": "/catalogue/industrial/cat-42.jpeg",
      "priceRange": "₹8,000 – ₹24,000/frame",
      "material": "Mild Steel Channels",
      "description": "Heavy-duty channel frames and brackets welded to serve as machinery support bases or structural wall frameworks."
  },
  {
      "id": "p_116",
      "categoryId": "industrial",
      "name": "Boundary Wall Formwork System",
      "image": "/catalogue/industrial/cat-43.jpeg",
      "priceRange": "₹15,000 – ₹45,000/set",
      "material": "Mild Steel Plates & Channels",
      "description": "Heavy concrete formwork shuttering panel system with manual adjustment jacks, designed for casting precast concrete boundary walls."
  },
  {
      "id": "p_117",
      "categoryId": "pooja-panels",
      "name": "Sacred Om Laser-Marked Metal Plate",
      "image": "/catalogue/pooja-panels/cat-44.jpeg",
      "priceRange": "₹800 – ₹2,500",
      "material": "Brass / Stainless Steel",
      "description": "Sacred Om design etched with high-precision fiber laser on mirror-finish steel or brass plate. Perfect for temple and puja entrances."
  },
  {
      "id": "p_118",
      "categoryId": "pooja-panels",
      "name": "Auspicious Hindu Iconography Border Strip",
      "image": "/catalogue/pooja-panels/cat-45.jpeg",
      "priceRange": "₹1,200 – ₹3,000/linear ft",
      "material": "Stainless Steel (Gold Finish)",
      "description": "Gold-finish border strip detailing auspicious motifs including the Kalash, Sudarshana Chakra, Tilak, and Shankh. Perfect for pooja room doors."
  },
  {
      "id": "p_119",
      "categoryId": "gift-decor",
      "name": "Decorative Welded Steel Sphere Frame",
      "image": "/catalogue/gift-decor/cat-46.jpeg",
      "priceRange": "₹1,500 – ₹4,000",
      "material": "Mild Steel",
      "description": "Artistic spherical cage hand-welded from curved metal flat bars. Ideal as a modern garden ornament or decorative table accent."
  },
  {
      "id": "p_120",
      "categoryId": "industrial",
      "name": "Welded Steel Support Jig Structure",
      "image": "/catalogue/industrial/cat-48.jpeg",
      "priceRange": "₹6,000 – ₹18,000",
      "material": "Mild Steel Channel & Hollow Sections",
      "description": "Heavy structural metal support frame welded from square tubes and channel beams, customized for workshop use."
  },
  {
      "id": "p_121",
      "categoryId": "shadow-art",
      "name": "Lord Vishwakarma Divine Silhouette Art",
      "image": "/catalogue/shadow-art/cat-50.jpeg",
      "priceRange": "₹3,500 – ₹9,000",
      "material": "Mild Steel (Matte Finish)",
      "description": "Sacred wall panel depicting Lord Vishwakarma, the divine architect, surrounded by tools. Designed for offices, workshops, and devotional spaces."
  },
  {
      "id": "p_122",
      "categoryId": "gift-decor",
      "name": "Warli & Madhubani Art Custom Nameplates",
      "image": "/catalogue/gift-decor/cat-61.jpeg",
      "priceRange": "₹2,000 – ₹4,800",
      "material": "Mild Steel (Textured Background)",
      "description": "Exquisite nameplates combining modern laser cutting with traditional Indian art profiles like dancing Warli figures and Madhubani fish motifs."
  },
  {
      "id": "p_123",
      "categoryId": "self-designing-facades",
      "name": "Parametric Laser-Cut Facade Screen",
      "image": "/catalogue/self-designing-facades/facade-sample.png",
      "priceRange": "₹900 – ₹2,500/sq ft",
      "material": "Aluminum / Stainless Steel",
      "description": "Bespoke architectural facade panel featuring parametric computational patterns. Precision laser-cut to optimize natural light diffusion, solar shading, and building aesthetics."
  },
  {
      "id": "p_124",
      "categoryId": "self-designing-facades",
      "name": "Artistic Lace Pattern Fencing",
      "image": "/catalogue/self-designing-facades/facade-1.jpg",
      "priceRange": "₹650 – ₹1,200/sq ft",
      "material": "Galvanized Mild Steel with Nylon/Steel Lace Inserts",
      "description": "A unique fusion of security fencing and artistic lace design. Features intricate animal and floral patterns woven directly into heavy-duty chain-link panels for public spaces, schools, and parks."
  },
  {
      "id": "p_125",
      "categoryId": "self-designing-facades",
      "name": "Bespoke Lace Mesh Privacy Partition",
      "image": "/catalogue/self-designing-facades/facade-2.jpg",
      "priceRange": "₹800 – ₹1,500/sq ft",
      "material": "Stainless Steel Wire & Chain-Link Mesh",
      "description": "High-end decorative partition screen woven with custom lace patterns. Designed for interior dividers, restaurant partitions, and balcony railings, offering privacy without blocking airflow."
  },
  {
      "id": "p_126",
      "categoryId": "self-designing-facades",
      "name": "Lace-Woven Security Gate Panel",
      "image": "/catalogue/self-designing-facades/facade-3.jpg",
      "priceRange": "₹1,200 – ₹2,800/sq ft",
      "material": "Powder-Coated Steel Frame & Woven Mesh",
      "description": "Architectural gateway featuring heavy-duty steel framing combined with exquisite hand-woven lace mesh infill. Ideal for contemporary residential entrances and luxury estates."
  }
];

/**
 * Sentinel used to mark products that are actually workshop machinery /
 * services (Fiber Laser Cutting Service, 500-Ton Hydraulic Press, Overhead
 * Traveling Crane, MIG/TIG Welding Services, etc.). Those belong on the
 * `/facilities` page as capabilities — not in the sellable catalogue. Filtering
 * by this constant keeps them out of every product grid.
 */
export const HIDDEN_FROM_CATALOGUE = "__facility_capability__" as const;

const MACHINERY_NAME_RE =
  /\b(cutting service|welding service|welding services|plasma cutting|bending service|plate shear|plate rolling|hydraulic press|power press|overhead traveling crane|overhead crane|brake press metal bending|precision welding of|structural fabrication - large industrial module)\b/i;

const LOCO_RE = /\b(loco|locomotive|rail(?:way)?|bogie|coach|wagon|brake gear|buffer housing|traction motor|underframe|draft gear|cbc)\b/i;
const PIPELINE_RE =
  /\b(pipeline|pipe segment|large[- ]diameter|culvert|conduit|dismantling|flange adapter|pipe section|penstock|puddle flange|bell mouth|rising main|tapping saddle|expansion bellows|manifold header|tubewell|steel cylinder|casing)\b/i;
const FABRICATED_RE =
  /\b(coupling|clamp|bracket|fitting|adapter|fabricated|assembly|structural|cable tray|tank saddle|skid|hopper|ladder & platform|shuttering|formwork|cage framework|trough|flat ring|base plate|gusset)\b/i;

/**
 * Resolve a product's effective category. Legacy "industrial" products get
 * reclassified into Pipeline / Fabricated / Loco. Items that describe
 * machinery or workshop services are hidden from the catalogue entirely.
 */
export function resolveCategoryId(p: CatalogueProduct): string {
  const haystack = `${p.name} ${p.description ?? ""}`;
  if (MACHINERY_NAME_RE.test(haystack)) return HIDDEN_FROM_CATALOGUE;
  if (p.categoryId === "industrial") {
    if (LOCO_RE.test(haystack)) return "loco-products";
    if (PIPELINE_RE.test(haystack)) return "pipeline-products";
    if (FABRICATED_RE.test(haystack)) return "fabricated-products";
    return "fabricated-products";
  }
  return p.categoryId;
}

/** Sellable products only — machinery / services are filtered out. */
export function getVisibleProducts(): CatalogueProduct[] {
  return products.filter((p) => resolveCategoryId(p) !== HIDDEN_FROM_CATALOGUE);
}

/** Get all products in a category (respects virtual reclassification). */
export function getProductsByCategory(categoryId: string): CatalogueProduct[] {
  return products.filter((p) => resolveCategoryId(p) === categoryId);
}

/** Get a category by its ID */
export function getCategoryById(id: string): CatalogueCategory | undefined {
  return categories.find((c) => c.id === id);
}


