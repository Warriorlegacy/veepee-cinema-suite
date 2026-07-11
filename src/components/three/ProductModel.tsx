import { useRef, useState, type ReactElement } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

interface ProductModelProps {
  type?: "jaali" | "gate" | "railing" | "industrial";
  position?: [number, number, number];
  color?: string;
}

function JaaliPattern() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.2;
  });
  const parts: ReactElement[] = [];
  for (let i = -4; i <= 4; i++) {
    for (let j = -4; j <= 4; j++) {
      if ((i + j) % 2 === 0) {
        parts.push(
          <mesh
            key={`${i}-${j}`}
            position={[i * 0.22, j * 0.22, 0]}
          >
            <boxGeometry args={[0.15, 0.15, 0.04]} />
            <meshStandardMaterial
              color="#D4148E"
              metalness={0.7}
              roughness={0.3}
              emissive="#D4148E"
              emissiveIntensity={0.1}
            />
          </mesh>
        );
      }
    }
  }
  return <group ref={ref}>{parts}</group>;
}

function GateElement() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.08]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.08]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.55, 0, 0]}>
        <boxGeometry args={[0.08, 1.2, 0.08]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.55, 0, 0]}>
        <boxGeometry args={[0.08, 1.2, 0.08]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
      {[-0.3, 0, 0.3].map((x, i) =>
        [-0.3, 0, 0.3].map((y, j) => (
          <mesh key={`${i}-${j}`} position={[x, y, 0]}>
            <torusGeometry args={[0.08, 0.02, 8, 16]} />
            <meshStandardMaterial
              color="#D4148E"
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

function RailingElement() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.18;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.6, 8]} />
        <meshStandardMaterial
          color="#D4148E"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-0.3, 0.1, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.3, 0.1, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[0.8, 0.04, 0.04]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function IndustrialElement() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
        <meshStandardMaterial
          color="#555555"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>
      {[-0.45, 0.45].map((x, i) => (
        <mesh key={i} position={[x, -0.3, 0]}>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
          <meshStandardMaterial
            color="#666666"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.6, 0.06, 0.04]} />
        <meshStandardMaterial
          color="#D4148E"
          emissive="#D4148E"
          emissiveIntensity={0.15}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

export function ProductModel({
  type = "jaali",
  position = [0, 0, 0],
  color = "#D4148E",
}: ProductModelProps) {
  const [hovered, setHovered] = useState(false);

  const renderModel = () => {
    switch (type) {
      case "jaali":
        return <JaaliPattern />;
      case "gate":
        return <GateElement />;
      case "railing":
        return <RailingElement />;
      case "industrial":
        return <IndustrialElement />;
    }
  };

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.05}
      floatIntensity={hovered ? 0.8 : 0.3}
    >
      <group
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.15 : 1}
      >
        {renderModel()}
      </group>
    </Float>
  );
}
