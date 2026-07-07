import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SparksProps {
  count?: number;
  color?: string;
  spread?: number;
  speed?: number;
  size?: number;
}

export function Sparks({
  count = 800,
  color = "#D4148E",
  spread = 8,
  speed = 0.15,
  size = 0.06,
}: SparksProps) {
  const ref = useRef<THREE.Points>(null);

  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    const cols = new Float32Array(count * 3);
    const c = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * spread;
      pos[i3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      pos[i3 + 2] = (Math.random() - 0.5) * spread;
      vel[i] = 0.2 + Math.random() * speed;
      const brightness = 0.4 + Math.random() * 0.6;
      cols[i3] = c.r * brightness;
      cols[i3 + 1] = c.g * brightness;
      cols[i3 + 2] = c.b * brightness;
    }
    return [pos, vel, cols];
  }, [count, spread, speed, color]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += velocities[i] * delta * 2;
      pos[i3] += Math.sin(pos[i3 + 1] * 0.5) * delta * 0.3;
      if (pos[i3 + 1] > spread * 0.4) {
        pos[i3 + 1] = -spread * 0.4;
        pos[i3] = (Math.random() - 0.5) * spread;
        pos[i3 + 2] = (Math.random() - 0.5) * spread;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
