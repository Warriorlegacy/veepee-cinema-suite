# Session Context — VEEPEE Cinema Suite

## Objective
Execute the full MNC-grade redesign of VEEPEE Cinema Suite — premium visual upgrade, dark/light theme system, AI image replacement, and theme fixes.

## Stack
TanStack Start (SSR), React 19, Bun, Vite 7, Tailwind CSS v4, Three.js/R3F, Framer Motion

## Brand Colors
- Magenta: `#D4148E`
- Near-black background, metallic accents
- Dark mode default, light mode toggle available

## Completed Work

### Phase 1 — Prestige UI Components
- **CursorFollower** — magenta glow dot that expands on clickable elements
- **MagneticButton** — CTA buttons that track cursor position on hover
- **RevealText** — word-by-word staggered entrance animation
- **GlowCard** — card with magenta glow on hover
- **LogoWatermark** — large grayscale logo background overlay (Hero, Services, ContactCTA)

### Theme System
- `ThemeContext`/`ThemeProvider`/`useTheme` in `src/lib/theme-context.tsx`
- `ThemeToggle` in `src/components/ui/theme-toggle.tsx` (sun/moon icons)
- Dark mode **default** — SSR and client both start dark. No system auto-detect.
- Persisted to `localStorage("veepee-theme")`
- Light mode overrides in `src/styles.css` `.light` block — cream backgrounds, darkened metallic/steel, `.glass` override, `.text-gradient-magenta` override

### Logo Enhancement
- Header logo: `h-14` with magenta glow
- Footer logo: `h-20` with glow
- LogoWatermark applied to Hero (0.035, 500px), Services (0.05, 350px), ContactCTA (0.06, 400px)

### Cinematic Section Dividers
- `.section-divider` gradient line placed between all sections in `index.tsx`
- Magenta/metallic gradient, transparent at edges

### Image Replacement
All camera `.jpg` imports from `src/assets/` replaced with AI `.webp`/`.png`:
- `hero-sparks.jpg` → `laser-cutting-hero.webp`
- `workshop.jpg` → `industrial-manufacturing-hero.webp`
- `product-jaali.jpg` → catalogue AI `.webp`
- `product-gate.jpg` → `designer-gate-peacock.png`
- `product-railing.jpg` → `railing-1.webp`
- `product-industrial.jpg` → `cat-34.webp`
- `project-hero.jpg` → `facade-sample.png`
- `service-powder-coating.jpg` → `powder-coating-hero.webp`
- `service-plate-bending.jpg` → `plate-bending-hero.webp`
- `service-pipe-rolling.jpg` → `pipe-rolling-hero.webp`

Files updated: `home-sections.tsx`, `service-image.tsx`, `index.tsx`, `architects.tsx`, `procurement.tsx`, `export.tsx`, `projects.ts`

### Deployed to GitHub
3 commits on `main`:
| Commit | Description |
|--------|-------------|
| `e38a657` | theme system, AI images, system auto-detect, light default |
| `900d90e` | dark default, no auto-detect, light mode glass/gradient fixes |

## Key Files
| File | Purpose |
|------|---------|
| `src/lib/theme-context.tsx` | ThemeProvider, dark default, toggle |
| `src/components/ui/theme-toggle.tsx` | Sun/moon toggle button |
| `src/components/ui/cursor-follower.tsx` | Magenta glow cursor dot |
| `src/components/ui/magnetic-button.tsx` | Cursor-track CTA buttons |
| `src/components/ui/reveal-text.tsx` | Staggered word animation |
| `src/components/ui/logo-watermark.tsx` | Grayscale logo overlay |
| `src/styles.css` | CSS vars, `.light` overrides, `.glass` fix |
| `src/components/home-sections.tsx` | AI image refs + CatalogueCTA previews |
| `src/components/service-image.tsx` | AI banner refs for services |