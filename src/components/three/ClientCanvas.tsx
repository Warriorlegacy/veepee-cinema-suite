import { useEffect, useState, type ReactNode } from "react";
import { SceneCanvas } from "./SceneCanvas";

interface ClientCanvasProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  performance?: "high" | "low";
}

export function ClientCanvas({
  children,
  className,
  cameraPosition,
  cameraFov,
  performance,
}: ClientCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`absolute inset-0 bg-black/20 ${className ?? ""}`} />
    );
  }

  return (
    <SceneCanvas
      className={className}
      cameraPosition={cameraPosition}
      cameraFov={cameraFov}
      performance={performance}
    >
      {children}
    </SceneCanvas>
  );
}
