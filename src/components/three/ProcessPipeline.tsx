import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const steps = [
  { label: "Design", color: "#D4148E" },
  { label: "Engineering", color: "#D4148E" },
  { label: "Laser Cutting", color: "#ff8844" },
  { label: "Fabrication", color: "#D4148E" },
  { label: "Finishing", color: "#D4148E" },
  { label: "Delivery", color: "#D4148E" },
];

export function ProcessPipeline() {
  const groupRef = useRef<THREE.Group>(null);
  const sparkRef = useRef(0);

  const { nodes, curvePoints } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const spacing = 2.2;
    const offset = -((steps.length - 1) * spacing) / 2;
    for (let i = 0; i < steps.length; i++) {
      pts.push(new THREE.Vector3(offset + i * spacing, 0, 0));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const curvePts = curve.getPoints(60);
    return { nodes: pts, curvePoints: curvePts };
  }, []);

  const tubeRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    sparkRef.current += delta * 0.3;
    if (sparkRef.current >= 1) sparkRef.current = 0;
  });

  return (
    <group ref={groupRef}>
      {/* Connecting tube */}
      <mesh ref={tubeRef}>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(curvePoints), 60, 0.03, 8, false]} />
        <meshBasicMaterial
          color="#D4148E"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Node rings */}
      {nodes.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh>
            <ringGeometry args={[0.2, 0.25, 24]} />
            <meshBasicMaterial
              color={steps[i].color}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshBasicMaterial
              color={steps[i].color}
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {/* Small orbiting particle */}
          <SparkParticle color={steps[i].color} />
        </group>
      ))}
    </group>
  );
}

function SparkParticle({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = useRef(Math.random() * Math.PI * 2);
  const radius = 0.35;

  useFrame((_, delta) => {
    angle.current += delta * 0.8;
    if (ref.current) {
      ref.current.position.x = Math.cos(angle.current) * radius;
      ref.current.position.z = Math.sin(angle.current) * radius;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}
