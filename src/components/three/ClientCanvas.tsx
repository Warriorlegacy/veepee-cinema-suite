import { useEffect, useState, useRef, type ReactNode } from "react";
import { SceneCanvas } from "./SceneCanvas";

interface ClientCanvasProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  performance?: "high" | "low";
  /** Disable R3F pointer events for decorative scenes (prevents null-eventSource crash). */
  interactive?: boolean;
}

export function ClientCanvas({
  children,
  className,
  cameraPosition,
  cameraFov,
  performance,
  interactive = true,
}: ClientCanvasProps) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className ?? ""}`}>
      {inView ? (
        <SceneCanvas
          cameraPosition={cameraPosition}
          cameraFov={cameraFov}
          performance={performance}
          interactive={interactive}
        >
          {children}
        </SceneCanvas>
      ) : (
        <div className="absolute inset-0 bg-black/20" />
      )}
    </div>
  );
}

