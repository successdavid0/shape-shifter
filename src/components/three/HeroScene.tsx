"use client";

import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { CanvasLoader } from "./Loader";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

/**
 * Procedural "shapeshifting" totem — a distorted icosahedron whose surface
 * morphs continuously. Autonomous motion + subtle pointer/scroll parallax on
 * the camera. Never interactive, never captures scroll.
 *
 * SWAP POINT: replace <ShiftingTotem/> with a compressed GLB via useGLTF
 * (add Draco decoder in /public/draco and useGLTF.preload) when a hero model
 * exists. Keep the poly budget <100K tris and file <5MB.
 */
function ShiftingTotem() {
  const mesh = useRef<THREE.Mesh>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => (scrollY.current = window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    m.rotation.y += delta * 0.18;
    m.rotation.x += delta * 0.05;
    // gentle scroll parallax — reading scrollY never blocks the page
    const t = Math.min(scrollY.current / 800, 1);
    m.position.y = THREE.MathUtils.lerp(m.position.y, -t * 0.6, 0.06);
    m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, 1 - t * 0.12, 0.06));
  });

  return (
    <Icosahedron ref={mesh} args={[1.35, 12]}>
      <MeshDistortMaterial
        color="#23e5ff"
        emissive="#3a0a5c"
        emissiveIntensity={0.4}
        roughness={0.18}
        metalness={0.55}
        distort={0.45}
        speed={1.8}
      />
    </Icosahedron>
  );
}

function ParallaxRig() {
  useFrame((state) => {
    // subtle pointer parallax on the camera
    const x = state.pointer.x * 0.4;
    const y = state.pointer.y * 0.25;
    state.camera.position.x += (x - state.camera.position.x) * 0.04;
    state.camera.position.y += (y - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const isMobile = useIsMobile();
  const [inView, setInView] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  // Pause the render loop when the hero scrolls out of view (perf §7.5).
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className="scanlines relative aspect-square w-full overflow-hidden rounded-xl border border-line-strong bg-surface-2"
      aria-hidden="true"
    >
      <div className="mesh-bg absolute inset-0" />
      <Canvas
        className="!absolute inset-0"
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={isMobile ? 1 : [1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
        frameloop={inView ? "always" : "never"}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.3} color="#d8f7ff" />
        <pointLight position={[-4, -2, 2]} intensity={22} color="#ff36c4" />
        <pointLight position={[4, 2, 3]} intensity={42} color="#23e5ff" />
        <Suspense fallback={<CanvasLoader />}>
          <ShiftingTotem />
        </Suspense>
        <ParallaxRig />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 z-[3] font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted/70">
        Shapeshifting · live
      </div>
    </div>
  );
}
