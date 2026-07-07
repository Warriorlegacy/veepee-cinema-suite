import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function CNC臂({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const armRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (armRef.current) {
      armRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group ref={armRef} position={position} rotation={rotation ?? [0, 0, 0]}>
      {/* Base */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[0.8, 0.15, 0.6]} />
        <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Column */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.5, 12]} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Arm */}
      <mesh position={[0.3, 0.4, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.06]} />
        <meshStandardMaterial
          color="#D4148E"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Head */}
      <mesh position={[0.55, 0.4, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial
          color="#D4148E"
          emissive="#D4148E"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function LaserCutter({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.2}>
      <group position={position}>
        {/* Bed */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[1.5, 0.08, 1.2]} />
          <meshStandardMaterial
            color="#333333"
            metalness={0.9}
            roughness={0.4}
          />
        </mesh>
        {/* Gantry */}
        <mesh position={[0, 0.15, -0.6]}>
          <boxGeometry args={[1.6, 0.04, 0.04]} />
          <meshStandardMaterial
            color="#777777"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Cutting head */}
        <mesh position={[0.2, 0.25, -0.6]}>
          <cylinderGeometry args={[0.03, 0.06, 0.15, 8]} />
          <meshStandardMaterial
            color="#D4148E"
            emissive="#D4148E"
            emissiveIntensity={0.3}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function WorkshopScene() {
  return (
    <group>
      <CNC臂 position={[-1.2, 0.2, 0.3]} rotation={[0, 0.3, 0]} />
      <CNC臂 position={[1.2, 0.2, -0.3]} rotation={[0, -0.5, 0]} />
      <LaserCutter position={[0, 0, 0.6]} />
      {/* Grid floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <planeGeometry args={[5, 4, 20, 20]} />
        <meshStandardMaterial
          color="#222222"
          metalness={0.5}
          roughness={0.8}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Ambient dust particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 4,
            Math.random() * 1.2,
            (Math.random() - 0.5) * 3,
          ]}
        >
          <sphereGeometry args={[0.01, 4, 4]} />
          <meshBasicMaterial
            color="#D4148E"
            transparent
            opacity={0.15 + Math.random() * 0.15}
          />
        </mesh>
      ))}
    </group>
  );
}
