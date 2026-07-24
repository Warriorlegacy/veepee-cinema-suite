# MNC Redesign, Logo Watermark Priority, Day/Night Fixes & AI Image Normalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform VEEPEE Cinema Suite into a high-end MNC-grade industrial experience with default dark mode, highly legible light mode contrast, priority logo watermark overlays across all main sections, and 100% AI-generated image normalization.

**Architecture:** Use CSS custom properties in `src/styles.css` with clean class overrides for light mode contrast (preserving button text contrast). Scale up and embed `LogoWatermark` in all homepage sections. Implement a deterministic AI image normalizer in `src/data/catalogue-data.ts` to swap all camera photos for WebP AI renders.

**Tech Stack:** React 19, TanStack Start, Tailwind CSS v4, Framer Motion, Bun, Vite 7.

---

### Task 1: Theme System & Light Mode CSS Overrides

**Files:**
- Modify: `src/styles.css:110-216`

- [ ] **Step 1: Inspect `src/styles.css` light mode rules**

View lines 110-216 of `src/styles.css` to verify light mode variable definitions and button overrides.

- [ ] **Step 2: Update `src/styles.css` with clean light mode variables and button protection**

Modify `src/styles.css` under `.light`:

```css
.light {
  color-scheme: light;
  --background: #F8FAFC;
  --foreground: #0F172A;
  --card: #FFFFFF;
  --card-foreground: #0F172A;
  --popover: #FFFFFF;
  --popover-foreground: #0F172A;
  --secondary: #F1F5F9;
  --secondary-foreground: #0F172A;
  --muted: #F1F5F9;
  --muted-foreground: #475569;
  --border: #E2E8F0;
  --input: #E2E8F0;
  --ring: #D4148E;
  --metallic: #475569;
  --metallic-dark: #64748B;
  --steel: #64748B;
  --near-black: #F8FAFC;
  --gradient-hero: linear-gradient(135deg, #FFFFFF 0%, #FDF2F8 50%, #F8FAFC 100%);
  --gradient-overlay: radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, rgba(248,250,252,0.95) 100%);
  --shadow-deep: 0 30px 80px -30px rgba(15, 23, 42, 0.12);
}

/* Light mode contrast overrides */
.light body {
  background-color: #F8FAFC !important;
  color: #0F172A !important;
}

.light .bg-black,
.light .bg-\[\#0A0A0A\],
.light .bg-\[\#0B0B0B\],
.light .bg-\[\#0B0B0F\],
.light .bg-\[\#121218\],
.light .bg-neutral-900,
.light .bg-slate-950 {
  background-color: #FFFFFF !important;
}

.light .bg-black\/30,
.light .bg-black\/40,
.light .bg-black\/50,
.light .bg-black\/60,
.light .bg-black\/80 {
  background-color: rgba(255, 255, 255, 0.88) !important;
}

/* Preserve text white on buttons, badges, and dark banner sections */
.light .text-white,
.light .text-slate-100,
.light .text-slate-200,
.light .text-slate-300 {
  color: #0F172A !important;
}

.light .bg-magenta-gradient,
.light .bg-magenta,
.light .btn-magenta,
.light .bg-whatsapp,
.light [class*="bg-magenta"],
.light [class*="bg-primary"] {
  color: #FFFFFF !important;
}

.light .bg-magenta-gradient *,
.light .bg-magenta *,
.light .btn-magenta *,
.light [class*="bg-magenta"] *,
.light [class*="bg-primary"] * {
  color: #FFFFFF !important;
}

.light .text-slate-400,
.light .text-white\/60,
.light .text-white\/70,
.light .text-metallic {
  color: #334155 !important;
}

.light .text-white\/40,
.light .text-white\/50,
.light .text-white\/30 {
  color: #64748B !important;
}

.light .border-white\/10,
.light .border-white\/15,
.light .border-white\/20,
.light .border-white\/5 {
  border-color: #E2E8F0 !important;
}

.light .glass {
  background: rgba(255, 255, 255, 0.88) !important;
  backdrop-filter: blur(16px) saturate(140%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(140%) !important;
  border: 1px solid #E2E8F0 !important;
  box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08) !important;
}

.light .logo-watermark-img {
  filter: grayscale(1) invert(0.9) opacity(0.06) !important;
}

/* Service detail page banner override */
.light section.bg-black {
  background-color: #000000 !important;
}
.light section.bg-black .text-white {
  color: #FFFFFF !important;
}
.light section.bg-black .text-metallic {
  color: #C9C9C9 !important;
}
```

- [ ] **Step 3: Test styles build**

Run: `bun run build`
Expected: Success with 0 errors.

---

### Task 2: Priority Watermark Logo Scaling & Placements

**Files:**
- Modify: `src/components/ui/logo-watermark.tsx:11-47`
- Modify: `src/components/home-sections.tsx`

- [ ] **Step 1: Increase default size and refine filter in `src/components/ui/logo-watermark.tsx`**

Set default `size` to `850` in `LogoWatermark` props:

```tsx
export function LogoWatermark({
  className = "",
  opacity = 0.08,
  size = 850,
  position = "center",
  glow = true,
}: LogoWatermarkProps) {
  const positionClasses = {
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-10 right-10",
    "bottom-right": "bottom-10 right-10",
    "top-left": "top-10 left-10",
    "bottom-left": "bottom-10 left-10",
  }[position];

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      aria-hidden
    >
      <img
        src={logo.url}
        alt=""
        width={size}
        height={size}
        className={`absolute logo-watermark-img object-contain transition-all duration-700 ${positionClasses}`}
        style={{
          opacity,
          width: `${size}px`,
          maxWidth: "85vw",
          filter: glow
            ? "grayscale(0.5) brightness(1.8) drop-shadow(0 0 50px rgba(212, 20, 142, 0.3))"
            : "grayscale(1) brightness(1.8)",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Add `LogoWatermark` to all home sections in `src/components/home-sections.tsx`**

Ensure `<LogoWatermark size={850} ... />` is present in:
- `Hero` (position="center")
- `Services` (position="top-left")
- `Products` (position="top-right")
- `Process` (position="center")
- `Workshop` (position="bottom-right")
- `TechnicalSpecs` (position="top-left")
- `Testimonials` (position="center")
- `FAQSection` (position="top-right")
- `ContactCTA` (position="center")

- [ ] **Step 3: Test build**

Run: `bun run build`
Expected: Success.

---

### Task 3: Dynamic AI Image Normalization

**Files:**
- Modify: `src/data/catalogue-data.ts:1690-1743`

- [ ] **Step 1: Implement AI Image Normalizer in `src/data/catalogue-data.ts`**

Add normalizer helpers at the end of `src/data/catalogue-data.ts`:

```typescript
function isAIImage(path: string): boolean {
  if (!path) return false;
  return (
    path.includes("/catalogue/generated/") ||
    path.includes("/metal-furniture/") ||
    path.includes("designer-gate-peacock") ||
    path.includes("facade-sample.png") ||
    (path.includes("/gates/gate-") && path.endsWith(".webp")) ||
    (path.includes("/railings/railing-") && path.endsWith(".webp")) ||
    (path.includes("/jaali-screens/jaali-") && path.endsWith(".webp")) ||
    (path.includes("/pooja-panels/pooja-") && path.endsWith(".webp")) ||
    (path.includes("/shadow-art/shadow-") && path.endsWith(".webp"))
  );
}

function getAISubstitute(cat: string, id: string): string {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  if (cat === "gates") return `/catalogue/gates/gate-${(hash % 9) + 1}.webp`;
  if (cat === "railings" || cat === "balustrades-staircases") return `/catalogue/railings/railing-${(hash % 5) + 1}.webp`;
  if (cat === "jaali-screens" || cat === "vent-grilles") return `/catalogue/jaali-screens/jaali-${(hash % 18) + 1}.webp`;
  if (cat === "self-designing-facades") return "/catalogue/self-designing-facades/facade-sample.png";
  if (cat === "pooja-panels") return `/catalogue/pooja-panels/pooja-${(hash % 10) + 1}.webp`;
  if (cat === "shadow-art" || cat === "gift-decor" || cat === "signage") return `/catalogue/shadow-art/shadow-${(hash % 9) + 1}.webp`;
  if (cat === "metal-furniture") return `/catalogue/metal-furniture/furniture-${(hash % 4) + 1}.png`;
  if (cat === "pipeline-products") return `/catalogue/generated/p_pl_${(hash % 6) + 1}.webp`;
  if (cat === "fabricated-products") return `/catalogue/generated/p_fb_${(hash % 6) + 1}.webp`;
  if (cat === "loco-products") return `/catalogue/generated/p_lc_${(hash % 6) + 1}.webp`;
  return `/catalogue/generated/p_fb_${(hash % 6) + 1}.webp`;
}

// Normalize products array in-place so no camera raw images are ever emitted
products.forEach((p) => {
  const cat = resolveCategoryId(p);
  if (!isAIImage(p.image)) {
    p.image = getAISubstitute(cat, p.id);
  }
  if (p.images) {
    p.images = p.images.map((img, i) => (isAIImage(img) ? img : getAISubstitute(cat, `${p.id}_${i}`)));
  }
});
```

- [ ] **Step 2: Test build**

Run: `bun run build`
Expected: Success.

---

### Task 4: Route Assets & Header Theme-Awareness

**Files:**
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/home-sections.tsx:11-17`
- Modify: `src/routes/architects.tsx:18-21`
- Modify: `src/routes/procurement.tsx:17-18`
- Modify: `src/routes/export.tsx:17-19`

- [ ] **Step 1: Update image references in route files to verified AI WebP assets**

In `src/components/home-sections.tsx`:
```typescript
const productJaali = "/catalogue/jaali-screens/jaali-1.webp";
const productIndustrial = "/catalogue/generated/p_fb_1.webp";
```

In `src/routes/architects.tsx`:
```typescript
const productJaali = "/catalogue/jaali-screens/jaali-1.webp";
```

In `src/routes/procurement.tsx`:
```typescript
const productIndustrial = "/catalogue/generated/p_fb_1.webp";
```

In `src/routes/export.tsx`:
```typescript
const productIndustrial = "/catalogue/generated/p_fb_1.webp";
```

- [ ] **Step 2: Add route awareness to `src/components/site-header.tsx`**

Use `useRouterState` to check for dark hero pages:

```tsx
import { useRouterState } from "@tanstack/react-router";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const isDarkHeroPage = routerState.location.pathname.startsWith("/services/") || routerState.location.pathname.startsWith("/projects/");

  // Apply conditional text contrast
```

- [ ] **Step 3: Test build**

Run: `bun run build`
Expected: Clean build without errors.

---

### Task 5: Final Validation & Verification

**Files:**
- Run build and inspect output.

- [ ] **Step 1: Execute full production build**

Run: `bun run build`
Expected: Success.

- [ ] **Step 2: Verify git status**

Run: `git status`
Expected: Clean list of modified files.
