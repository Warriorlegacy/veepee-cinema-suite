# Design Research — MNC-Grade Industrial Website Benchmark

> Compiled: 2026-07-24 | Sources: firecrawl-search, firecrawl-scrape

## 1. Competitive Landscape

### Top Manufacturing Websites of 2026 (from Valmax)
- **B2B buyers evaluate capability before conversation** — product clarity and technical credibility are primary
- **Key pattern**: Clear product/capability pages organized around how buyers think, not internal departments
- **Fast comprehension** in the hero section — what you do must be obvious in one glance
- **ISO, AS9100, IATF 16949** certifications prominently displayed as trust signals
- **Structured content** that serves both engineers (specs) and procurement (compliance/timelines)

### Enterprise Design Trends 2026 (from Vezadigital)
- **Design tokens** for typography, spacing, colours, motion values, and dark mode variants
- **Governance frameworks** defining approvals, ownership
- **Consistent 8px spacing grid** across all components
- **Typography scale** with defined sizes, weights, and line-heights

### Web Design Trends 2026 (from Sayenko Design)
- **3D and immersive elements** as the #1 trend
- **Experimental navigation** — scroll-linked, cursor-reactive
- **Raw aesthetics**: monospaced fonts, visible grids, wireframe-like layouts
- **Motion that explains** — purposeful animation, not decorative

### Industrial Website Best Practices (from Fireart)
- **Consistent spacing** around headings and copy
- **High-quality product imagery** with zoom/viewer capabilities
- **Machine specs and capabilities** prominently listed
- **Case studies with before/after** metrics
- **Trust badges**: certifications, GST, UDYAM, ISO

## 2. Design Pattern Recommendations

### Color System
- Dark industrial base (near-black) currently correct
- Magenta accent (#D4148E) differentiates well in industrial space
- **Add**: Dark-mode toggle (many MNC sites offer light mode for readability)
- **Add**: Hover/focus state color tokens

### Typography
- Current: Bebas Neue (display), Rajdhani (sans), Inter (body) — good combo
- **Add**: Typographic scale utility classes (xs through 8xl)
- **Add**: Consistent tracking (letter-spacing) values per size

### Component Patterns from MNC Sites
| Pattern | Usage |
|---------|-------|
| Glassmorphism cards | Current glass utility is aligned with trends |
| Skeleton loaders | Missing — critical for perceived performance |
| Scroll progress bar | Standard on MNC documentation sites |
| Back-to-top FAB | Expected on long-scroll industrial sites |
| Cookie consent | GDPR requirement (serves EU clients) |
| Image lightbox | For project/case study galleries |

### Spacing
- Current site uses inconsistent spacing
- **Standardize on**: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px

## 3. Performance Targets from Research
- LCP < 1.5s is now the competitive baseline (not 2.5s)
- Bundle splitting by route is table stakes
- WebP/AVIF image formats are expected
- Critical CSS inlining for above-fold content
- 3D scenes: demand rendering, dispose on unmount

## 4. Trust Signals to Add
- GSTIN badge (already have text, need visual)
- UDYAM certification badge
- ISO 9001:2015 certification
- IndiaMART TrustSEAL
- Google Reviews aggregate (4.7★, 93 reviews)
- "Made in India" mark
- Partner/client logos section