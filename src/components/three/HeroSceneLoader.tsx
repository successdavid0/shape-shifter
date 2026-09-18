"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { HeroPoster } from "./HeroPoster";
import { isWebGLAvailable } from "@/lib/webgl";

// Client-only, dynamically imported. The poster reserves the exact square so
// there is zero layout shift when the Canvas mounts (PRD §7.2).
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <HeroPoster priority />,
});

export function HeroSceneLoader() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  // Initial render + SSR: static poster (no CLS).
  if (webgl === null) return <HeroPoster priority />;
  // Check #2 (WebGL fallback) + reduced-motion → static frame, no blank box.
  if (!webgl || reduced) return <HeroPoster priority />;
  return <HeroScene />;
}
