"use client";

import { useState } from "react";

export function CopyButton({
  value,
  label = "Copy",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op, value is visible on screen */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-1.5 rounded-sm border border-line-strong px-2.5 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:border-accent hover:text-accent ${className}`}
      aria-live="polite"
    >
      {copied ? (
        <>
          <span className="text-success">✓</span> Copied
        </>
      ) : (
        <>{label}</>
      )}
    </button>
  );
}
