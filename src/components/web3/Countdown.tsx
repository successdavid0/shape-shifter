"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    done: ms === 0,
  };
}

export function Countdown({ iso }: { iso: string }) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cell = (v: number, label: string) => (
    <div className="flex flex-col items-center">
      <span className="tnum font-mono text-2xl font-bold text-ink">
        {String(v).padStart(2, "0")}
      </span>
      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center gap-4" role="timer" aria-label="Time until mint">
      {cell(t.d, "days")}
      <span className="text-accent">:</span>
      {cell(t.h, "hrs")}
      <span className="text-accent">:</span>
      {cell(t.m, "min")}
      <span className="text-accent">:</span>
      {cell(t.s, "sec")}
    </div>
  );
}
