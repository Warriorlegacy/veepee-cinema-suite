# Design Spec — MNC-Grade Redesign, Watermark Logo Priority, Day/Night Legibility & AI Image Normalization

**Date:** 2026-07-25  
**Project:** VEEPEE Cinema Suite (`Warriorlegacy/veepee-cinema-suite`)  
**Status:** Approved by User  

---

## 1. Executive Summary & Objective

The objective of this task is to transform VEEPEE Cinema Suite into a bold, cinematic, premium, and dopamine-inducing MNC-grade industrial experience.

### Key Goals
1. **MNC Design Aesthetics & Day/Night Themes:** Establish a dark mode by default (`#050505` near-black base with Veepee Magenta `#D4148E` accents and metallic glows). Fix bright/light mode so it looks like a modern, genuine corporate website (`#F8FAFC` background, `#0F172A` high-contrast slate text, `#E2E8F0` borders) with crisp readability across all pages without awkward contrast glitches.
2. **Priority Logo Watermarking:** Scale up and embed the company logo watermark (`LogoWatermark`) across all key sections of the site (Hero, Services, Products, Process, Testimonials, FAQ, Contact) so it stands out as an atmospheric brand watermark in both dark and light modes.
3. **100% AI-Generated Imagery:** Eliminate all raw camera-captured images across every section (home, services, pipeline, fabricated, loco, catalogues). Implement a dynamic AI image normalizer in `catalogue-data.ts` to substitute raw photo URLs with high-quality, clean AI-generated WebP renders (`p_pl_X`, `p_fb_X`, `p_lc_X`, `jaali-X`, `gate-X`, `railing-X`, etc.).

---

## 2. Architectural & System Changes

### 2.1 CSS Theme System (`src/styles.css`)
- **Variables & Tokens:**
  - `:root` (Dark Default): `--background: oklch(0.13 0.005 280)`, `--foreground: oklch(0.97 0.005 280)`, `--card: oklch(0.16 0.008 280)`, `--border: oklch(0.25 0.01 280 / 0.7)`.
  - `.light` (Bright Mode): `--background: #F8FAFC`, `--foreground: #0F172A`, `--card: #FFFFFF`, `--card-foreground: #0F172A`, `--border: #E2E8F0`, `--metallic: #475569`, `--near-black: #F8FAFC`.
- **Targeted Overrides:**
  - Prevent global `.text-white` overrides from affecting buttons with `bg-magenta-gradient`, `bg-magenta`, `bg-primary`, or `bg-whatsapp`. Buttons maintain white `#FFFFFF` text in all themes.
  - Retain dark hero banner backgrounds on service detail pages so text overlay remains high-contrast white.
  - Update `.light .logo-watermark-img` to use an inverted, low-opacity emboss filter (`filter: grayscale(1) opacity(0.05)`).

### 2.2 Watermark Logo Priority (`src/components/ui/logo-watermark.tsx` & `home-sections.tsx`)
- Default `size` increased from `600px` to `850px`.
- Embedded into every major home section: Hero, Services, Products, Process, Workshop, Testimonials, FAQSection, and ContactCTA.
- Theme-aware opacity and glow settings so the logo acts as an eye-catching brand background watermark throughout the entire site.

### 2.3 AI Image Normalizer (`src/data/catalogue-data.ts`)
- Implement `isAIImage(path: string): boolean` and `getAISubstitute(category: string, id: string): string` to detect any legacy camera-captured `.jpeg`/`.jpg` paths (e.g., `/catalogue/industrial/catalogue-1.jpeg`) and deterministically replace them with verified AI WebP assets.
- Clean up fallback refs in `src/components/home-sections.tsx`, `src/routes/architects.tsx`, `src/routes/procurement.tsx`, and `src/routes/export.tsx`.

### 2.4 Navigation & Header Contrast (`src/components/site-header.tsx`)
- Connect `useRouterState()` to identify dark hero pages (e.g. `/services/$id`).
- When `scrolled` is false on a dark hero page, header links and logo text remain white; when `scrolled` is true or on a light page, header links adapt to high-contrast dark slate (`#0F172A`).

---

## 3. Section-by-Section Visual Enhancements

| Section | Dark Mode Aesthetic | Light Mode Aesthetic | Watermark Status |
|---------|---------------------|----------------------|------------------|
| **Hero** | 3D Laser scene, magenta beam, sparks, `#050505` base, fade to black | 3D Laser scene, high-contrast dark title, fade to `#F8FAFC` | 850px Center Watermark |
| **Trust Bar** | Near-black, metallic text, magenta icons | `#F8FAFC` background, `#475569` text, `#E2E8F0` border | N/A |
| **Services** | Deep card containers, hover glow, floating 3D icons | `#FFFFFF` cards, `#0F172A` text, `#E2E8F0` border | 850px Left Watermark |
| **Products** | 3D Jaali model, magenta CTA, shimmer skeleton | `#FFFFFF` cards, high-contrast text | 850px Right Watermark |
| **Process** | 3D Pipeline nodes, glowing connectors | Clean light path, dark slate node titles | 850px Center Watermark |
| **Workshop** | 3D Machine model, technical specs | `#FFFFFF` card container, `#0F172A` title | 850px Center Watermark |
| **Catalogue** | Dark grid, WebP AI images | Light grid (`#F8FAFC`), `#FFFFFF` product cards | 850px Top-Right Watermark |
| **Contact** | 3D Spinning gear, dark form glass | Light glass form (`rgba(255,255,255,0.9)`), dark text | 850px Center Watermark |

---

## 4. Verification & Testing Criteria

1. **Build Integrity:** `bun run build` must complete cleanly with 0 TypeScript or bundling errors.
2. **Dark Mode Default:** On fresh load (or after clearing `localStorage`), the site starts in dark mode.
3. **Light Mode Legibility:** Switching to bright mode renders dark slate text on white/light-gray cards. Buttons with magenta gradient keep white text.
4. **Watermark Presence:** Logo watermark is visibly present behind sections as a background watermark.
5. **No Camera Raw Images:** All catalogue and section images load as clean WebP/PNG AI assets.
