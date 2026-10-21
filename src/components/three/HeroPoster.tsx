import Image from "next/image";

/**
 * Static poster that fills the hero's 3D slot. Reserves an exact square so
 * there is ZERO layout shift when the R3F Canvas mounts over it in Phase D.
 * Also reused as the dynamic-import loading fallback and the WebGL fallback.
 */
export function HeroPoster({ priority = false }: { priority?: boolean }) {
  return (
    <div className="scanlines relative aspect-square w-full overflow-hidden rounded-xl border border-line-strong bg-surface-2">
      {/* atmospheric wash behind the totem */}
      <div className="mesh-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 animate-float"
        aria-hidden="true"
        style={{ animationDuration: "9s" }}
      >
        <Image
          src="/art/SKINWALKER79.png"
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 768px) 90vw, 40vw"
          className="object-contain p-6 drop-shadow-[0_0_60px_var(--color-accent-soft)]"
        />
      </div>
      {/* duotone edge glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-accent/20"
        aria-hidden="true"
      />
      <div className="absolute bottom-3 left-3 z-[3] font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted/70">
        Spirit Master · 1/1
      </div>
    </div>
  );
}
