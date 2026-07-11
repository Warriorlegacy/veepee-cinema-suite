import { useRef, useState, type ReactElement } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function GearTeeth({
  radius,
  count,
  toothHeight,
  toothWidth,
}: {
  radius: number;
  count: number;
  toothHeight: number;
  toothWidth: number;
}) {
  const teeth: ReactElement[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    teeth.push(
      <mesh
        key={i}
        position={[x, z, 0]}
        rotation={[0, 0, angle]}
      >
        <boxGeometry args={[toothWidth, toothHeight, 0.06]} />
        <meshStandardMaterial
          color="#888888"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    );
  }
  return <>{teeth}</>;
}

export function ContactGear() {
  const gearRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const speedRef = useRef(0.2);

  useFrame((_, delta) => {
    if (!gearRef.current) return;
    const targetSpeed = hovered ? 1.2 : 0.2;
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, delta * 3);
    gearRef.current.rotation.z += delta * speedRef.current;
    const targetScale = hovered ? 1.15 : 1;
    gearRef.current.scale.setScalar(
      THREE.MathUtils.lerp(gearRef.current.scale.x, targetScale, delta * 4)
    );
  });

  return (
    <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.2}>
      <group
        ref={gearRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Gear body */}
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 0.08, 32]} />
          <meshStandardMaterial
            color="#666666"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Teeth */}
        <GearTeeth
          radius={0.65}
          count={12}
          toothHeight={0.15}
          toothWidth={0.08}
        />
        {/* Center hole */}
        <mesh position={[0, 0, 0.05]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
          <meshStandardMaterial
            color="#D4148E"
            emissive="#D4148E"
            emissiveIntensity={0.3}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
        {/* Glow ring */}
        <mesh position={[0, 0, -0.05]}>
          <ringGeometry args={[0.15, 0.55, 32]} />
          <meshBasicMaterial
            color="#D4148E"
            transparent
            opacity={hovered ? 0.2 : 0.05}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </Float>
  );
}
