import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, type ReactNode } from "react";
import { EnvironmentSetup } from "./EnvironmentSetup";

interface SceneCanvasProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  effects?: boolean;
  performance?: "high" | "low";
  /** When false, disables R3F pointer event wiring entirely (avoids null-eventSource crash on scenes that don't need input). */
  interactive?: boolean;
}

export function SceneCanvas({
  children,
  className = "",
  cameraPosition = [0, 0, 5],
  cameraFov = 75,
  performance = "high",
  interactive = true,
}: SceneCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const el = wrapperRef.current;
    if (!el || !interactive) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.pointerEvents = entry.isIntersecting ? "auto" : "none";
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [interactive]);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const dpr: [number, number] =
    performance === "high"
      ? isMobile
        ? [1, 1.25]
        : [1, 1.75]
      : isMobile
        ? [0.5, 0.75]
        : [0.75, 1];

  return (
    <div
      ref={wrapperRef}
      className={`absolute inset-0 ${className}`}
      style={interactive ? undefined : { pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov, near: 0.1, far: 100 }}
        dpr={dpr}
        frameloop="demand"
        gl={{ antialias: performance === "high", alpha: true }}
        style={{ background: "transparent" }}
        // Pin eventSource to our wrapper so R3F's connect() never resolves to a null parent
        // (this was the root cause of the "addEventListener of null" crash in the minified
        // build on narrow viewports where the Canvas's absolute-positioned parent hadn't
        // finished mounting when R3F called connect on it).
        eventSource={interactive ? (wrapperRef as unknown as React.MutableRefObject<HTMLElement>) : undefined}
        eventPrefix="client"
        // For non-interactive scenes (hero/workshop) disable event wiring entirely.
        events={interactive ? undefined : () => ({ enabled: false, priority: 0 })}
        onCreated={(state) => {
          if (typeof window !== "undefined") {
            // Runtime instrumentation for the "eventSource null" crash.
            // Exposes the resolved event source and gl info; safe to leave in — logs once per mount.
            // eslint-disable-next-line no-console
            console.info("[R3F] Canvas mounted", {
              eventSource: state.events?.connected ?? null,
              hasWrapper: !!wrapperRef.current,
              size: state.size,
              dpr: state.viewport.dpr,
            });
          }
        }}
        onError={(err) => {
          // eslint-disable-next-line no-console
          console.error("[R3F] Canvas error", {
            error: err,
            eventSourceRef: wrapperRef.current,
            interactive,
          });
        }}
      >
        <EnvironmentSetup />
        {children}
      </Canvas>
    </div>
  );
}
