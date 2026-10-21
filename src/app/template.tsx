"use client";

import { useReducedMotion } from "motion/react";

/**
 * Route transition. `template.tsx` re-mounts on every navigation, so the
 * glitch-in animation (and the one-shot tear overlay) replays each time the
 * user moves between pages — the "comes to life" routing moment.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <div className="route-glitch">
      <div aria-hidden="true" className="route-glitch-sweep" />
      {children}
    </div>
  );
}
