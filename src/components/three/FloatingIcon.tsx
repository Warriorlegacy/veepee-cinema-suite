import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const shapes = ["box", "sphere", "torus", "icosahedron", "octahedron"] as const;

function ShapeGeometry({ type }: { type: (typeof shapes)[number] }) {
  switch (type) {
    case "box":
      return <boxGeometry args={[0.6, 0.6, 0.6]} />;
    case "sphere":
      return <sphereGeometry args={[0.35, 24, 24]} />;
    case "torus":
      return <torusGeometry args={[0.3, 0.12, 16, 32]} />;
    case "icosahedron":
      return <icosahedronGeometry args={[0.4, 0]} />;
    case "octahedron":
      return <octahedronGeometry args={[0.4, 0]} />;
  }
}

export function FloatingIcon({
  position = [0, 0, 0],
  shape = "torus",
  color = "#D4148E",
  speed = 1,
  scale = 1,
  hovered = false,
}: {
  position?: [number, number, number];
  shape?: (typeof shapes)[number];
  color?: string;
  speed?: number;
  scale?: number;
  hovered?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRot = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    targetRot.current += delta * 0.5 * speed;
    meshRef.current.rotation.x = Math.sin(targetRot.current * 0.7) * 0.2;
    meshRef.current.rotation.y = targetRot.current;
    meshRef.current.rotation.z = Math.sin(targetRot.current * 0.5) * 0.1;
    if (hovered) {
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, 1.3, delta * 4)
      );
    } else {
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, 1, delta * 4)
      );
    }
  });

  return (
    <Float speed={speed * 0.3} rotationIntensity={0.1} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        scale={[scale, scale, scale]}
      >
        <ShapeGeometry type={shape} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}
