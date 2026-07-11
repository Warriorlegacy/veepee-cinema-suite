import { Environment, ContactShadows } from "@react-three/drei";

export function EnvironmentSetup() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 3]} intensity={1.8} color="#D4148E" />
      <directionalLight position={[-3, 4, -2]} intensity={0.7} color="#ffffff" />
      <pointLight position={[0, -2, 3]} intensity={0.6} color="#0ABFBC" distance={12} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={0.85}
        intensity={1}
        color="#D4148E"
      />
      <Environment preset="studio" resolution={256} />
      <ContactShadows position={[0, -2, 0]} opacity={0.55} scale={20} blur={2.4} far={4} />
    </>
  );
}

