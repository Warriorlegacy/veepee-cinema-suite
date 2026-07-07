# VEEPEE Engineers — 3D Immersive Website Transformation

## Project Overview

Transform the existing **VEEPEE Engineers** website (TanStack Start + React 19 + Tailwind CSS v4 + Framer Motion) into a **stunning 3D immersive experience** using Three.js and React Three Fiber (R3F). The site represents a precision laser cutting, CNC fabrication, and industrial manufacturing company based in Varanasi, India (est. 1976).

**Existing Stack:** TanStack Start (React 19, Vite 7, SSR), Tailwind CSS v4, Framer Motion, Supabase, Bun

## Brand Identity

- **Primary Color:** Magenta (`#D4148E`)
- **Dark Base:** Near-black (`#0A0A0A`, `#121212`)
- **Accents:** Metallic silver (`#C9C9C9`), Steel (`#2A2A3A`)
- **Typography:** `Bebas Neue` (display headings), `Rajdhani` (UI/nav), `Inter` (body)
- **Vibe:** Cinematic, industrial, premium, precision engineering
- **Mood:** Dark, sparks/fire, steel, machinery, craftsmanship

## Tech Requirements

### Core 3D Stack
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — R3F utilities (OrbitControls, Environment, ContactShadows, Float, Text3D, etc.)
- **@react-three/postprocessing** — Bloom, chromatic aberration, noise for cinematic effect
- **three** — Core Three.js
- Use `<Suspense>` with `fallback` for all 3D components (loading states)

### Integration with Existing Codebase
- 3D components live in `src/components/three/`
- Each section (Hero, Services, Products, etc.) gets its own canvas or inline `<Canvas>` wrapper
- Pages remain SSR-compatible — defer 3D canvas mounting to client via `useEffect` / dynamic import with `ssr: false`
- Use `@react-three/drei`'s `ScrollControls` and `Scroll` for scroll-linked 3D scenes
- Use framer-motion for 2D overlay animations as before — 3D and 2D coexist

## Sections to Enhance with 3D

### 1. Hero Section (SCENE 01 / LASER)
- **Background:** Replace static hero image with a real-time 3D scene:
  - A fiber laser cutting head traversing a steel plate with **particle-system sparks** (instanced mesh or custom points)
  - Glowing magenta laser beam (`<mesh>` with emissive material + bloom postprocessing)
  - Steel plate with subtle displacement/bump mapping
  - Slow orbit or parallax on mouse move
- **Overlays:** Existing `<h1>`/CTA remain as DOM overlay on top of canvas
- **Scroll:** Link scroll progress to camera position/dolly (camera pulls up as user scrolls down)

### 2. Services Section
- **3D Floating Icons:** Each service card gets a subtle 3D object floating beside it (geometric shapes — torus, icosahedron, box) with magenta emissive glow
- **Hover:** On card hover, the 3D object rotates/tilts toward cursor
- **Background:** Subtle 3D grid / wireframe plane extending behind the section

### 3. Products Section
- **3D Product Viewer:** Replace static product images with interactive 3D models:
  - Laser-cut jaali panel (thin extruded geometry with cutout patterns)
  - Wrought iron gate element
  - Industrial steel beam
  - Use `<Float>` for gentle idle animation
  - On click/tap: orbit reveal with `<OrbitControls>` (modal overlay)
- **Text3D:** Product category labels rendered as 3D text floating above each tile

### 4. Process Timeline
- **3D Pipeline Visualization:** The 6-step process (Design → Engineering → Laser Cutting → Fabrication → Finishing → Delivery) rendered as:
  - A connected 3D path/tube with glowing nodes
  - Each node pulses when in view (use scroll-triggered visibility)
  - Sparks traveling along the tube connecting nodes (particle stream)
- **Scroll-Triggered Animations:** Each step lights up as it enters viewport

### 5. Workshop / About Section
- **3D Workshop Scene:**
  - Low-poly stylized CNC machine / press brake / laser cutter models
  - Rotating slowly on a pedestal
  - Steel material with env map reflection
  - Background: subtle industrial grid floor with reflections

### 6. Testimonials
- **3D Floating Quote Cards:** Each quote appears on a floating 3D panel/plane with subtle rotation
- Background: particles (steel dust / sparks) drifting slowly

### 7. Contact CTA
- **3D Interactive Element:** A glowing 3D steel gear or cog that spins when hovered
- Background curtain: metallic particle field

## Atmospheric & Visual Effects (Global)

| Effect | Implementation |
|--------|---------------|
| **Bloom** | `@react-three/postprocessing` `<EffectComposer>` + `<Bloom>` (magenta threshold) |
| **Particle System** | `THREE.Points` with custom shader or Drei `<Cloud>` / custom Points |
| **Environment** | Drei `<Environment>` with industrial HDR (steel workshop) |
| **Contact Shadows** | Drei `<ContactShadows>` for grounding 3D objects on page |
| **Noise/Scanlines** | Postprocessing `<Noise>` or custom overlay div (as existing) |
| **Mouse Parallax** | Track mouse position → update camera or group rotation lerp |
| **Loading State** | Drei `<Html>` wrapper showing a magenta spinner until 3D assets ready |

## Performance Considerations

- Use `performance: true` on `@react-three/drei` `<Environment>`
- Limit canvas to 1–2 active `<Canvas>` instances at any time (use `visibility: hidden` + `pointer-events: none` on offscreen canvases)
- Prefer `<instancedMesh>` for repeated geometry (particles, bolts, screws)
- Use `useFrame` sparingly; prefer `lerp` for smooth animations
- Set `frameloop="demand"` on canvases outside the viewport
- Mobile: reduce particle count, disable bloom, lower shadow map resolution via `detectGPU()` from Drei
- Lazy-load 3D components: `const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })`

## File Structure (Additions)

```
src/components/three/
  HeroScene.tsx           # Laser cutting hero 3D (particles, beam, steel plate)
  Sparks.tsx              # Reusable particle system (sparks / steel dust)
  FloatingIcon.tsx        # 3D service icon wrapper
  ProductModel.tsx        # 3D product viewer with orbit controls
  ProcessPipeline.tsx     # 3D timeline tube with nodes
  WorkshopScene.tsx       # Low-poly CNC / workshop models
  QuotePanel.tsx          # Floating 3D testimonial card
  ContactGear.tsx         # Interactive 3D gear/cog for CTA
  SceneCanvas.tsx         # Shared canvas wrapper with postprocessing presets
  EnvironmentSetup.tsx    # Shared lighting, env map, shadows setup
```

## Dependencies to Add

```json
{
  "@react-three/fiber": "^8.17.0",
  "@react-three/drei": "^9.114.0",
  "@react-three/postprocessing": "^2.16.0",
  "three": "^0.169.0",
  "@types/three": "^0.169.0"
}
```

## Design Rules

- All 3D elements must respect the existing brand palette (magenta, near-black, metallic, steel)
- Emissive materials use `#D4148E` for glow where applicable
- Steel materials: `MeshStandardMaterial` with `metalness: 0.8`, `roughness: 0.3`
- Keep the overall feel dark, dramatic, and cinematic — the 3D should enhance, not distract
- Every 3D section must gracefully degrade on low-end devices (detect via `navigator.hardwareConcurrency` or `detectGPU()`)

## Checklist

- [ ] Install Three.js, R3F, Drei, postprocessing packages
- [ ] Create `SceneCanvas.tsx` with shared lighting, env, bloom
- [ ] Build `HeroScene.tsx` — laser cutter + sparks + beam
- [ ] Wire scroll progress (`useScroll` from Drei) to hero camera
- [ ] Build `Sparks.tsx` — reusable particle point system
- [ ] Build `FloatingIcon.tsx` — geometric shapes for service cards
- [ ] Build `ProductModel.tsx` — interactive rotating product models
- [ ] Build `ProcessPipeline.tsx` — timeline tube with glowing nodes
- [ ] Build `WorkshopScene.tsx` — low-poly industrial scene
- [ ] Build `QuotePanel.tsx` — floating testimonial card
- [ ] Build `ContactGear.tsx` — interactive gear/cog
- [ ] Dynamic import all 3D scenes with `{ ssr: false }`
- [ ] Mobile performance tuning (particle budget, disable postprocessing)
- [ ] Test all sections in viewport — canvas should only render when visible
