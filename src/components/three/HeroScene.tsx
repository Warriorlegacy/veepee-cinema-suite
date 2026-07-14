import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Sparks } from "./Sparks";

export function HeroScene() {
  const beamRef = useRef<THREE.Mesh>(null);
  const plateRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { pointer, camera, size, gl } = useThree();

  // Drag-to-orbit state — feels consistent across mouse + touch. Velocity is
  // integrated with damping for inertial coast-out after release.
  const drag = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    velX: 0,
    velY: 0,
    yaw: 0,
    pitch: 0,
  });

  // Attach pointer/touch listeners to the WebGL canvas element. Using
  // pointer events unifies mouse + finger + pen; touchAction: none prevents
  // the page from scroll-hijacking a horizontal drag on mobile.
  useEffect(() => {
    const el = gl.domElement;
    // Ensure the canvas can capture touches and has an adequate hit area.
    // The canvas already fills the hero (100svh) so touch-target size is met.
    el.style.touchAction = "none";
    el.style.cursor = "grab";

    const onDown = (e: PointerEvent) => {
      drag.current.active = true;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      drag.current.velX = 0;
      drag.current.velY = 0;
      el.style.cursor = "grabbing";
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.lastX;
      const dy = e.clientY - drag.current.lastY;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      // Normalize by viewport so drag feels the same on any screen size.
      // Touch pointers are ~1.5x less sensitive on small screens so the
      // scene doesn't spin from a small thumb swipe.
      const isTouch = e.pointerType === "touch";
      const scale = isTouch ? 0.006 : 0.008;
      drag.current.velX = dy * scale;
      drag.current.velY = dx * scale;
    };

    const onUp = (e: PointerEvent) => {
      drag.current.active = false;
      el.style.cursor = "grab";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onUp);
    };
  }, [gl]);

  // Keep the desktop composition on mobile: portrait viewports crop the
  // plate/head/beam horizontally at FOV 60, so we pull the camera back and
  // widen FOV proportionally to the aspect ratio. Also nudge the whole group
  // down slightly so it stays vertically centered under the hero headline.
  useFrame((_, delta) => {
    const aspect = size.width / Math.max(1, size.height);
    const persp = camera as THREE.PerspectiveCamera;
    const targetFov = aspect < 1.2 ? Math.min(80, 60 + (1.2 - aspect) * 22) : 60;
    const targetZ = aspect < 1.2 ? 5 + (1.2 - aspect) * 1.8 : 5;
    if (Math.abs(persp.fov - targetFov) > 0.05) {
      persp.fov = targetFov;
      persp.updateProjectionMatrix();
    }
    persp.position.z += (targetZ - persp.position.z) * 0.15;

    if (groupRef.current) {
      const targetY = aspect < 1 ? -0.35 : aspect < 1.2 ? -0.15 : 0;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.15;

      // Integrate drag velocity → yaw/pitch with clamps + inertial damping.
      // When not actively dragging, velocity decays exponentially (~60fps
      // damping factor 0.92 → coast for ~0.8s). While dragging, velocity is
      // the delta from onMove, so rotation matches finger movement 1:1.
      drag.current.yaw += drag.current.velY;
      drag.current.pitch += drag.current.velX;
      // Clamp pitch so the plate doesn't flip past horizontal.
      drag.current.pitch = Math.max(-0.5, Math.min(0.5, drag.current.pitch));

      groupRef.current.rotation.y +=
        (drag.current.yaw - groupRef.current.rotation.y) * Math.min(1, delta * 12);
      groupRef.current.rotation.x +=
        (drag.current.pitch - groupRef.current.rotation.x) * Math.min(1, delta * 12);

      if (!drag.current.active) {
        drag.current.velX *= 0.92;
        drag.current.velY *= 0.92;
        // Gentle recentring so idle state returns to hero composition.
        drag.current.yaw *= 0.985;
        drag.current.pitch *= 0.985;
      }
    }
  });


  return (
    <group ref={groupRef}>
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
