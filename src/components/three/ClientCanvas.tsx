import { useEffect, useState, useRef, type ReactNode } from "react";
import { SceneCanvas } from "./SceneCanvas";
import { useIsMobile } from "@/hooks/use-mobile";

interface ClientCanvasProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  performance?: "high" | "low";
  /** Disable R3F pointer events for decorative scenes (prevents null-eventSource crash). */
  interactive?: boolean;
  /**
   * When true, this canvas is skipped on mobile (a static gradient div is shown
   * instead). Reduces total WebGL context count on phones and prevents
   * "Context Lost" thrashing from context-limit exhaustion.
   */
  disableOnMobile?: boolean;
}

export function ClientCanvas({
  children,
  className,
  cameraPosition,
  cameraFov,
  performance,
  interactive = true,
  disableOnMobile = false,
}: ClientCanvasProps) {
  const isMobile = useIsMobile();
  const [everInView, setEverInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || everInView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // MOUNT-ONCE: as soon as the canvas enters the viewport (or gets within
        // 200px of it), mount and never unmount. Prevents WebGL contexts from
        // being repeatedly created/destroyed during scroll, which caused the
        // "Context Lost" flicker on first load.
        if (entry.isIntersecting) {
          setEverInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [everInView]);

  const shouldRender = everInView && !(disableOnMobile && isMobile);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className ?? ""}`}>
      {shouldRender ? (
        <SceneCanvas
          cameraPosition={cameraPosition}
          cameraFov={cameraFov}
          performance={performance}
          interactive={interactive}
        >
          {children}
        </SceneCanvas>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(212,20,142,0.18), transparent 60%), radial-gradient(circle at 70% 80%, rgba(212,20,142,0.10), transparent 65%), #0a0a0a",
          }}
        />
      )}
    </div>
  );
}
