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
}

export function SceneCanvas({
  children,
  className = "",
  cameraPosition = [0, 0, 5],
  cameraFov = 75,
  performance = "high",
}: SceneCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.pointerEvents = "auto";
        } else {
          el.style.pointerEvents = "none";
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dpr = performance === "high" ? [1, 1.5] : [0.5, 0.75];

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov, near: 0.1, far: 100 }}
        dpr={dpr}
        frameloop="demand"
        gl={{ antialias: performance === "high", alpha: true }}
        style={{ background: "transparent" }}
      >
        <EnvironmentSetup />
        {children}
      </Canvas>
    </div>
  );
}
