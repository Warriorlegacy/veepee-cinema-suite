import { Environment, ContactShadows } from "@react-three/drei";

export function EnvironmentSetup() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.5}
        color="#D4148E"
      />
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.6}
        color="#ffffff"
      />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={0.8}
        intensity={0.8}
        color="#D4148E"
      />
      <Environment
        preset="studio"
        resolution={256}
      />
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.5}
        scale={20}
        blur={2}
        far={4}
      />
    </>
  );
}
