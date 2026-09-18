"use client";

import { Html, useProgress } from "@react-three/drei";

/** Branded in-canvas loader (Check #1, HIGH): Suspense + useProgress. */
export function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-[spin-slow_1.2s_linear_infinite] rounded-full border-2 border-[color:var(--color-line-strong)] border-t-[color:var(--color-accent)]" />
        <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-ink-muted)]">
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}
