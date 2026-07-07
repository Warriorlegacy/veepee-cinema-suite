import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text3D } from "@react-three/drei";
import * as THREE from "three";

const FONT_URL = "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json";

export function QuotePanel({
  quote,
  name,
  role,
  position = [0, 0, 0],
  index = 0,
}: {
  quote: string;
  name: string;
  role: string;
  position?: [number, number, number];
  index?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current || !hovered) return;
    groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <Float
      speed={0.5 + index * 0.2}
      rotationIntensity={0.05}
      floatIntensity={0.3}
    >
      <group
        ref={groupRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Quote card panel */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.4, 1.2]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.3}
            roughness={0.7}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Border glow */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.42, 1.22]} />
          <meshBasicMaterial
            color="#D4148E"
            transparent
            opacity={hovered ? 0.4 : 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Quote mark */}
        <Text3D
          font={FONT_URL}
          position={[-0.95, 0.3, 0.02]}
          size={0.15}
          height={0.01}
        >
          "
          <meshBasicMaterial color="#D4148E" />
        </Text3D>
      </group>
    </Float>
  );
}
