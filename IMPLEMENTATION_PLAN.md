# Veepee Cinema Suite — Professional MNC-Style Redesign
## Implementation Guide & Detailed Plan

> **Version:** 1.0  
> **Date:** 2026-07-24  
> **Project:** Veepee Cinema Suite (TanStack Start + React 19 + Tailwind CSS v4 + Three.js)  
> **Goal:** Elevate the site to big-MNC-level professionalism across design, UX, performance, and conversion.

---

## 1. Current State Assessment

### What Exists Today
| Layer | Status | Details |
|-------|--------|---------|
| **Stack** | Modern | TanStack Start (SSR), React 19, Bun, Vite 7, Tailwind CSS v4 |
| **Design System** | Partial | Brand tokens defined (magenta, near-black, metallic), fonts loaded (Bebas Neue, Rajdhani, Inter) |
| **Hero Section** | 3D-enabled | HeroScene with laser beam, sparks, drag-to-orbit, scroll-linked parallax |
| **Process Section** | 3D-enabled | ProcessPipeline with scroll-triggered nodes |
| **Workshop Section** | 3D-enabled | WorkshopScene with low-poly industrial model |
| **Products Section** | Lazy-loaded | ProductModel with OrbitControls, floating icons |
| **Contact CTAs** | Interactive | ContactGear rotating on hover |
| **Animations** | Framer Motion | fadeUp variants, scroll-triggered, stagger |
| **SEO** | Basic | JSON-LD structured data, meta tags, sitemap, robots.txt |
| **Responsive** | Partial | Mobile menu exists, but breakpoint coverage inconsistent |
| **Performance** | Unmeasured | No Core Web Vitals optimization, no bundle analysis |

### Gaps to MNC-Level
- No skeleton loading / shimmer states
- No error boundaries for async failures
- No image optimization pipeline (srcset, WebP, priority hints)
- No cookie consent / GDPR banner
- No analytics/observability integration
- No accessibility audit (focus traps, ARIA completeness)
- No blog/content section
- No partner/certification badge wall
- No case study detail pages
- No performance budget enforcement
- No A/B testing infrastructure
- No dark-mode toggle (brand is dark, but MNC sites often offer light mode)
- No micro-interaction polish on secondary controls
- No scroll-progress indicator
- No smooth scroll behavior on anchor links
- No prefetching strategy for linked pages
- No offline/PWA capabilities

---

## 2. Agency-Agent Assignments

The following agency-agents (skills) are assigned to specific workstreams:

| Agent / Skill | Workstream | Role |
|---------------|-----------|------|
| **firecrawl-search** | Competitive Intelligence | Search for MNC site design patterns, benchmark competitors |
| **firecrawl-crawl** | Competitive Intelligence | Crawl top MNC manufacturing sites for design patterns |
| **firecrawl-scrape** | Design Inspiration | Extract CSS/design tokens from reference MNC sites |
| **browser-use** | QA & Cross-Browser Testing | Automated cross-browser, cross-device testing |
| **remotion-best-practices** | Video Content | Hero video/background video production best practices |
| **video-generation** | AI Video | Generate cinematic AI video backgrounds for hero sections |
| **here-now** | Hosting & Deployment | Publishing, CDN, global edge deployment |
| **website-design-clone** | Design System Extraction | Extract design systems from MNC reference sites |
| **firecrawl-seo-audit** | SEO Audit | Current-state SEO analysis before/after changes |
| **firecrawl-demo-walkthrough** | UX Auditing | User-flow walkthrough for conversion path optimization |

---

## 3. MNC-Level Professionalism Checklist

### 3.1 Visual Design
- [ ] Consistent 8px spacing grid across all components
- [ ] Typography scale: H1–H6 with defined sizes, weights, and line-heights
- [ ] Button system: primary, secondary, ghost, icon-only variants
- [ ] Card system: elevated, outlined, filled variants
- [ ] Consistent border-radius usage (4px / 8px / 16px / 24px)
- [ ] Shadow system: sm / md / lg / xl with consistent opacity
- [ ] Transition timing: 150ms (micro) / 300ms (standard) / 500ms (cinematic)
- [ ] Easing curves consistent across animations (ease-out, cubic-bezier)

### 3.2 Interaction Design
- [ ] All interactive elements have hover, focus, active states
- [ ] Focus-visible rings for keyboard navigation (magenta glow)
- [ ] Skeleton loaders for all async content
- [ ] Smooth scroll-to-section on anchor clicks
- [ ] Scroll-progress indicator in header
- [ ] Back-to-top floating button
- [ ] Toast notifications (sonner already installed — use consistently)
- [ ] Modal/overlay for product 3D viewers
- [ ] Image lightbox for project photos

### 3.3 Content & Copy
- [ ] Consistent voice (confident, precision-focused, industrial)
- [ ] All CTAs use action-oriented language
- [ ] Case study pages with before/after metrics
- [ ] Partner logos section (trust bar)
- [ ] Certifications & affiliations display
- [ ] Press mentions / media logos

### 3.4 Performance
- [ ] LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] All images: WebP/AVIF, srcset, lazy loading, priority hints
- [ ] Critical CSS inlined
- [ ] Code splitting by route
- [ ] Prefetch on link hover
- [ ] Bundle size budget: < 200KB JS gzipped (non-3D)
- [ ] 3D canvas: frameloop="demand", disposed on unmount
- [ ] Service worker for offline caching

### 3.5 SEO & Marketing
- [ ] All pages: unique title, description, OG tags
- [ ] Canonical URLs on every page
- [ ] Structured data: LocalBusiness, FAQ, BreadcrumbList, Product
- [ ] XML sitemap auto-generated
- [ ] robots.txt updated
- [ ] Internal linking strategy
- [ ] Blog with keyword-optimized articles

### 3.6 Accessibility (WCAG AA)
- [ ] All images have alt text (decorative: alt="")
- [ ] Contrast ratio >= 4.5:1 for text, >= 3:1 for large text
- [ ] Focus order logical and visible
- [ ] Skip-to-content link
- [ ] ARIA labels on all icon-only buttons
- [ ] ARIA live regions for dynamic content
- [ ] Reduced motion media query respected

---

## 4. Phased Implementation Plan

### Phase 0: Competitive Intelligence & Design Research (Week 1)
**Agents:** `firecrawl-search`, `firecrawl-crawl`, `firecrawl-scrape`, `browser-use`

**Tasks:**
1. **firecrawl-search** — Query: "best manufacturing company websites 2026", "MNC industrial site design trends", "cinema website UI design 2026"
2. **firecrawl-crawl** — Crawl 3–5 reference MNC manufacturing sites (Siemens, GE, ABB) for design patterns
3. **firecrawl-scrape** — Extract CSS variables, spacing scales, typography from reference sites
4. **browser-use** — Open each reference site; screenshot key pages for visual reference
5. **firecrawl-seo-audit** — Run SEO audit on current veepeeengr.com (if live) to establish baseline
6. Compile findings into a `DESIGN_RESEARCH.md` reference document

**Deliverables:**
- `DESIGN_RESEARCH.md` — benchmark report with screenshots, tokens, and patterns
- `Competitor_Analysis.xlsx` — feature comparison matrix

---

### Phase 1: Design System Foundation (Week 2)
**Agents:** `website-design-clone`, `browser-use`

**Tasks:**
1. **website-design-clone** — Extract design tokens from reference MNC sites (colors, spacing, typography, shadows)
2. Extend `src/styles.css` with MNC-grade design tokens:
   - Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
   - Typography scale: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px), 4xl (36px), 5xl (48px), 6xl (60px), 7xl (72px), 8xl (96px)
   - Shadow system: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`
   - Border radius: `radius-sm` (4px), `radius-md` (8px), `radius-lg` (12px), `radius-xl` (16px), `radius-2xl` (24px)
   - Transition tokens: `transition-fast` (150ms), `transition-base` (300ms), `transition-slow` (500ms)
3. Add `focus-visible` styles with magenta glow ring
4. Add `prefers-reduced-motion` media query that disables all animations
5. Create `Button` component with allvariants (primary, secondary, ghost, icon)
6. Create `Card` component with elevated/outlined/filled variants
7. Create `Skeleton` component for loading states
8. Create `ScrollProgress` indicator component
9. Create `BackToTop` floating button component
10. Run **browser-use** smoke tests on key pages across Chrome, Firefox, Safari

**Deliverables:**
- Updated `src/styles.css` with full design token system
- New shared UI components in `src/components/ui/`
- `DESIGN_SYSTEM.md` documenting tokens and usage

---

### Phase 2: 3D Immersive Layer (Weeks 3–4)
**Agents:** `remotion-best-practices`, `video-generation`

**Tasks (from prompt.md — already planned, but refined):**
1. Install Three.js, R3F, Drei, postprocessing packages
2. Build `SceneCanvas.tsx` shared canvas wrapper with bloom, environment, shadows
3. Build `HeroScene.tsx` — laser cutting hero 3D (already has a solid base)
4. Build `Sparks.tsx` — reusable particle system
5. Build `FloatingIcon.tsx` — geometric shapes for service cards
6. Build `ProductModel.tsx` — interactive rotating product models
7. Build `ProcessPipeline.tsx` — timeline tube with glowing nodes
8. Build `WorkshopScene.tsx` — low-poly industrial scene
9. Build `QuotePanel.tsx` — floating testimonial card
10. Build `ContactGear.tsx` — interactive gear/cog for CTA
11. Dynamic import all 3D scenes with `{ ssr: false }`
12. Mobile performance tuning (particle budget, disable postprocessing)
13. **video-generation** — Generate 10–15s cinematic AI video loop for hero background (optional enhancement)
14. **remotion-best-practices** — If adding motion graphics, follow Remotion best practices for rendering

**Deliverables:**
- All `src/components/three/*.tsx` files complete and tested
- 3D scenes work on desktop and degrade gracefully on mobile
- Performance budget met for 3D canvas rendering

---

### Phase 3: Content & Conversion Optimization (Week 5)
**Agents:** `firecrawl-demo-walkthrough`, `browser-use`

**Tasks:**
1. **firecrawl-demo-walkthrough** — Run UX walkthrough on current conversion path (Contact → Submit → Confirmation)
2. Add skeleton loading states to all async sections
3. Create dedicated case study pages (`/case-studies/[slug]`)
4. Add partner/certification badge wall to home page
5. Add trust signals: GST number, UDYAM, ISO certifications, insurance badges
6. Create "Projects" detail pages with before/after imagery
7. Add cookie consent banner (minimal, non-intrusive)
8. Add scroll-progress indicator in header
9. Improve FAQ section with expand/collapse accordion
10. Add "Share this project" social buttons
11. Create blog section infrastructure (5 placeholder posts)
12. **browser-use** — Test full conversion funnel on all devices

**Deliverables:**
- Case study pages (3–5)
- Partner badge section
- Cookie consent component
- Blog section scaffold
- Conversion funnel tested end-to-end

---

### Phase 4: Performance & SEO Hardening (Week 6)
**Agents:** `firecrawl-seo-audit`, `browser-use`

**Tasks:**
1. **firecrawl-seo-audit** — Run pre-launch SEO audit
2. Image optimization pipeline:
   - All images converted to WebP/AVIF with `<source>` fallbacks
   - `srcset` for responsive images
   - `loading="lazy"` on below-fold images
   - `fetchpriority="high"` on hero images
   - Width/height attributes on all images
3. Critical CSS inlining for above-the-fold content
4. Route-based code splitting
5. Prefetch on link hover (add `@tanstack/react-router` prefetch config)
6. Add `Loading` component with skeleton UI for route transitions
7. Service worker setup for offline caching
8. Add viewport meta tag optimizations
9. Add `rel="preconnect"` and `rel="preload"` for font files
10. Bundle analysis with `npm run build -- --analyze`
11. Fix any Lighthouse performance score below 90
12. **browser-use** — Cross-browser testing: Chrome, Firefox, Safari, Edge on desktop + mobile viewports
13. **firecrawl-seo-audit** — Run post-optimization SEO audit

**Deliverables:**
- Lighthouse score ≥ 90 (Performance, Accessibility, Best Practices, SEO)
- LCP < 2.5s on 4G connection
- Bundle analysis report
- Cross-browser test report

---

### Phase 5: Analytics, Monitoring & Launch (Week 7)
**Agents:** `here-now`

**Tasks:**
1. Integrate analytics (Plausible, PostHog, or Google Analytics 4)
2. Set up error tracking (Sentry or LogRocket)
3. Configure UTM parameters for all marketing links
4. Set up conversion tracking (form submissions, WhatsApp clicks)
5. Add `meta` tags for theme-color (magenta `#D4148E`)
6. Add `apple-touch-icon` and PWA manifest icons
7. **here-now** — Deploy to edge/CDN for global performance
8. Run final accessibility audit (axe DevTools)
9. Final cross-device QA pass (browser-use)
10. Deploy to production
11. Set up uptime monitoring and alerting

**Deliverables:**
- Analytics dashboard configured
- Error tracking active
- Production deployment live
- Monitoring alerts configured
- Launch checklist signed off

---

## 5. File Structure Changes

### New Files to Create
```
src/components/
  ui/
    skeleton.tsx          # Loading skeleton component
    scroll-progress.tsx   # Scroll progress indicator
    back-to-top.tsx       # Floating back-to-top button
    cookie-consent.tsx    # GDPR cookie consent banner
    case-study-card.tsx   # Case study card component
    partner-badges.tsx    # Trust badge wall
    lightbox.tsx          # Image lightbox overlay
  blog/
    blog-post.tsx         # Blog post component
    blog-layout.tsx       # Blog listing layout
  case-studies/
    case-study-layout.tsx # Case study page layout
three/
  (existing files refined per prompt.md)
routes/
  case-studies/
    $slug.tsx            # Dynamic case study page
  blog/
    index.tsx            # Blog listing
    $slug.tsx            # Individual blog post
  projects/
    index.tsx            # Projects listing (if not existing)
    $slug.tsx            # Project detail page
```

### Modified Files
```
src/styles.css           # Extended design tokens, focus-visible, reduced-motion
src/components/site-header.tsx  # Scroll progress, back-to-top trigger
src/components/site-footer.tsx  # Updated with trust badges, expanded links
src/components/home-sections.tsx # Skeleton loaders, improved CTAs
src/components/contact-form.tsx  # Enhanced with validation states, success message
src/routes/index.tsx          # Structured data update, breadcrumb nav
```

---

## 6. Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|-----------------|
| 0: Research | Week 1 | DESIGN_RESEARCH.md, competitor matrix |
| 1: Design System | Week 2 | Design tokens, UI components, CSS extensions |
| 2: 3D Immersive | Weeks 3–4 | All Three.js scenes, video background |
| 3: Content & Conversion | Week 5 | Case studies, blog, cookie consent, UX polished |
| 4: Performance & SEO | Week 6 | Lighthouse ≥ 90, cross-browser tested |
| 5: Launch | Week 7 | Analytics deployed, production live, monitoring |

**Total: 7 weeks** (14 engineering days, 2 weeks buffer for iterations)

---

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | ≥ 90 | lighthouse CI |
| Lighthouse Accessibility | ≥ 95 | axe DevTools |
| Lighthouse SEO | ≥ 95 | lighthouse CI |
| LCP | < 2.5s | Web Vitals / CrUX |
| CLS | < 0.1 | Web Vitals |
| FID | < 100ms | Web Vitals |
| Bundle size (non-3D) | < 200KB gzipped | `npm run build` analyze |
| 3D FPS (desktop) | ≥ 55fps | browser-use QA |
| 3D FPS (mobile) | ≥ 30fps | browser-use QA |
| Time to Interactive | < 3.5s | Web Vitals |
| Conversion rate uplift | ≥ 20% | Analytics comparison |

---

## 8. Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| 3D scene causes jank on low-end devices | `disableOnMobile` prop, `detectGPU()` from Drei, particle count budget |
| Large bundle size from Three.js | Dynamic imports, `frameloop="demand"`, tree-shaking |
| SSR incompatibility with 3D canvases | `ssr: false` on all dynamic imports, `ClientCanvas` wrapper |
| Color contrast failures | Run contrast checker in Phase 4, adjust opacity values |
| Cross-browser rendering differences | browser-use QA in every phase, `@supports` fallbacks |
| Lighthouse regression from 3D | Performance budget enforced in CI, 3D scenes opt-out with `performance="low"` |

---

## 9. Agency-Agent Execution Guide

### How to Use Each Agent

#### firecrawl-search
```bash
# Competitive design research
firecrawl search "best industrial manufacturing company website design 2026" --limit 10 -o .firecrawl/competitor-research.json --json

# MNC cinema/entertainment site inspiration
firecrawl search "premium cinema website UI design trends 2026" --limit 10 -o .firecrawl/cinema-design.json --json
```

#### firecrawl-crawl
```bash
# Crawl competitor sites for design patterns
firecrawl crawl "https://www.siemens.com" --include-paths /company /products --max-depth 2 --limit 30 -o .firecrawl/siemens-design.json --json
```

#### browser-use
```bash
# Cross-browser QA testing
bu open https://your-site.vercel.app
bu state                          # Get element indices
bu screenshot full-page.png       # Visual regression capture
bu eval "window.__LIGHTHOUSE__"   # Check performance metrics
```

#### video-generation
```bash
# Generate hero background video
# Use skill instructions for generating cinematic loop videos matching the magenta/industrial aesthetic
```

#### here-now
```bash
# Deploy to global edge
# Use skill instructions for CDN deployment and edge configuration
```

#### firecrawl-seo-audit
```bash
# Pre and post launch SEO comparison
firecrawl search "site:veepeeengr.com" -o .firecrawl/seo-baseline.json --json
```

---

*Plan created 2026-07-24. Review weekly with stakeholders. Adjust timelines based on Phase 0 competitive research findings.*
