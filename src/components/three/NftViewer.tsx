"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { CanvasLoader } from "./Loader";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

/** A rotatable 3D totem card carrying the NFT texture on its face. */
function TotemCard({ src, spin }: { src: string; spin: boolean }) {
  const tex = useTexture(src);
  tex.colorSpace = THREE.SRGBColorSpace;
  const group = useRef<THREE.Group>(null);

  // Gentle idle spin until the user grabs it (rotation hint).
  useFrame((_, delta) => {
    if (spin && group.current) group.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={group}>
      <RoundedBox args={[2.4, 2.4, 0.16]} radius={0.06} smoothness={4}>
        <meshStandardMaterial color="#0a0a0c" roughness={0.7} metalness={0.3} />
      </RoundedBox>
      {/* front face art */}
      <mesh position={[0, 0, 0.081]}>
        <planeGeometry args={[2.24, 2.24]} />
        <meshStandardMaterial map={tex} roughness={0.5} metalness={0.1} />
      </mesh>
      {/* back glitch glow — faint chromatic fringe */}
      <mesh position={[0, 0, -0.081]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.24, 2.24]} />
        <meshStandardMaterial color="#141418" emissive="#00e5ff" emissiveIntensity={0.18} roughness={0.5} />
      </mesh>
    </group>
  );
}

export default function NftViewer({ src }: { src: string }) {
  const isMobile = useIsMobile();
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className="scanlines relative aspect-square w-full overflow-hidden rounded-xl border border-line-strong bg-surface"
    >
      <div className="mesh-bg absolute inset-0" aria-hidden="true" />
      <Canvas
        className="!absolute inset-0"
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={isMobile ? 1 : [1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
        frameloop={inView ? "always" : "never"}
        onPointerDown={() => setSpin(false)}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 4]} intensity={1.4} />
        <pointLight position={[-3, -2, 2]} intensity={18} color="#f4f4f6" />
        <Suspense fallback={<CanvasLoader />}>
          <TotemCard src={src} spin={spin} />
        </Suspense>
        {/* Damped, zoom/pan disabled so the page scrolls normally (Check #4). */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.6}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
        />
      </Canvas>
      <div
        className={`pointer-events-none absolute bottom-3 left-1/2 z-[3] -translate-x-1/2 font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted/70 transition-opacity ${
          spin ? "opacity-100" : "opacity-0"
        }`}
      >
        ⟲ Drag to rotate
      </div>
    </div>
  );
}
