import { lazy, Suspense, type ComponentType, type ReactNode } from "react";

/**
 * Lazy DOM wrapper (outside Canvas). Fallback is a subtle pulsing gradient div.
 */
function DomFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black pointer-events-none animate-pulse" />
  );
}

function wrapDom<P extends Record<string, unknown>>(
  importFn: () => Promise<{ [k: string]: ComponentType<P> }>,
  exportName: string,
) {
  const Lazy = lazy(async () => {
    const mod = await importFn();
    return { default: mod[exportName] };
  });
  return (props: P) => (
    <Suspense fallback={<DomFallback />}>
      <Lazy {...(props as P)} />
    </Suspense>
  );
}

/**
 * Lazy scene child (inside Canvas). Fallback MUST be null — a DOM node inside
 * an R3F Canvas will crash the reconciler.
 */
function wrapScene<P extends Record<string, unknown>>(
  importFn: () => Promise<{ [k: string]: ComponentType<P> }>,
  exportName: string,
) {
  const Lazy = lazy(async () => {
    const mod = await importFn();
    return { default: mod[exportName] };
  });
  return (props: P) => (
    <Suspense fallback={null}>
      <Lazy {...(props as P)} />
    </Suspense>
  );
}

/* DOM wrappers — pull in @react-three/fiber only when needed */
export const LazyClientCanvas = wrapDom<{
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  performance?: "high" | "low";
  interactive?: boolean;
}>(() => import("./ClientCanvas"), "ClientCanvas");

/* Scene children — must live inside a Canvas */
export const LazyHeroScene = wrapScene(() => import("./HeroScene"), "HeroScene");
export const LazyWorkshopScene = wrapScene(() => import("./WorkshopScene"), "WorkshopScene");
export const LazyProcessPipeline = wrapScene(() => import("./ProcessPipeline"), "ProcessPipeline");
export const LazyProductModel = wrapScene<{ type?: string; color?: string; scale?: number }>(
  () => import("./ProductModel"),
  "ProductModel",
);
export const LazyContactGear = wrapScene(() => import("./ContactGear"), "ContactGear");
export const LazyFloatingIcon = wrapScene<{
  position?: [number, number, number];
  color?: string;
  shape?: "torus" | "octahedron" | "box" | "sphere";
  scale?: number;
}>(() => import("./FloatingIcon"), "FloatingIcon");
