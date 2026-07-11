import { lazy, Suspense, type ComponentProps, type ComponentType, type ReactElement, type ReactNode } from "react";

function DomFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black pointer-events-none animate-pulse" />
  );
}

function wrap<T extends ComponentType<any>>(
  loader: () => Promise<T>,
  domFallback: boolean,
): (props: ComponentProps<T>) => ReactElement {
  const Lazy = lazy(async () => ({ default: await loader() }));
  return (props: ComponentProps<T>) => (
    <Suspense fallback={domFallback ? <DomFallback /> : null}>
      <Lazy {...(props as ComponentProps<typeof Lazy>)} />
    </Suspense>
  );
}

/* DOM wrappers */
export const LazyClientCanvas = wrap(
  async () => (await import("./ClientCanvas")).ClientCanvas as ComponentType<{
    children: ReactNode;
    className?: string;
    cameraPosition?: [number, number, number];
    cameraFov?: number;
    performance?: "high" | "low";
    interactive?: boolean;
  }>,
  true,
);

/* Scene children — fallback MUST be null (DOM nodes crash inside Canvas) */
export const LazyHeroScene = wrap(async () => (await import("./HeroScene")).HeroScene, false);
export const LazyWorkshopScene = wrap(async () => (await import("./WorkshopScene")).WorkshopScene, false);
export const LazyProcessPipeline = wrap(async () => (await import("./ProcessPipeline")).ProcessPipeline, false);
export const LazyProductModel = wrap(async () => (await import("./ProductModel")).ProductModel, false);
export const LazyContactGear = wrap(async () => (await import("./ContactGear")).ContactGear, false);
export const LazyFloatingIcon = wrap(async () => (await import("./FloatingIcon")).FloatingIcon, false);
