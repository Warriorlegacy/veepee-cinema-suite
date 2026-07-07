import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Sparks } from "./Sparks";

export function HeroScene() {
  const beamRef = useRef<THREE.Mesh>(null);
  const plateRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const beamPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      pts.push(new THREE.Vector3(0, -2 + t * 4, 0));
    }
    return pts;
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(beamPoints), [beamPoints]);

  useFrame((_, delta) => {
    if (headRef.current) {
      headRef.current.position.x +=
        (pointer.x * 0.15 - headRef.current.position.x) * delta * 0.5;
      headRef.current.position.y +=
        (-pointer.y * 0.1 - headRef.current.position.y) * delta * 0.5;
    }
  });

  return (
    <group>
      <Sparks count={1200} spread={6} speed={0.2} size={0.05} />

      {/* Steel Plate */}
      <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.1}>
        <mesh
          ref={plateRef}
          position={[0, -0.5, 0]}
          rotation={[-Math.PI / 2.5, 0, 0]}
        >
          <boxGeometry args={[4, 0.08, 3]} />
          <MeshDistortMaterial
            color="#2A2A3A"
            metalness={0.9}
            roughness={0.4}
            distort={0.02}
            speed={0.5}
          />
        </mesh>
      </Float>

      {/* Laser Cutting Head */}
      <group ref={headRef} position={[0, 1.8, 0.5]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.08, 0.15, 0.4, 12]} />
          <meshStandardMaterial
            color="#555555"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <coneGeometry args={[0.12, 0.15, 12]} />
          <meshStandardMaterial
            color="#D4148E"
            emissive="#D4148E"
            emissiveIntensity={1.5}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* Laser Beam */}
      <mesh ref={beamRef}>
        <tubeGeometry args={[curve, 20, 0.015, 8, false]} />
        <meshBasicMaterial
          color="#D4148E"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Laser glow point on plate */}
      <mesh position={[0, -0.3, 0.5]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial
          color="#ff8844"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Floating steel particles near the cut */}
      <Sparks
        count={200}
        color="#ff8844"
        spread={1.5}
        speed={0.3}
        size={0.03}
      />
    </group>
  );
}
