import Image from "next/image";
import type { ArtPiece } from "@/lib/content";

// 1x1 near-black blur while the real image streams in.
const BLUR =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><rect width='8' height='8' fill='%230a0a0c'/></svg>`
  ).toString("base64");

export function ArtCard({
  piece,
  sizes,
  priority = false,
  className = "",
}: {
  piece: ArtPiece;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`glitch-hover clip-corner-2 group relative overflow-hidden border border-line bg-surface-2 transition-[transform,border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-glow)] ${className}`}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={piece.src}
          alt={piece.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={BLUR}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          /* Monochrome at rest; the real colour floods back on hover/focus —
             the art literally comes to life when you reach for it. */
          className="object-cover [filter:grayscale(1)_contrast(1.1)_brightness(0.95)] transition-[transform,filter] duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.06] group-hover:[filter:none]"
        />
        {/* scanline veil, lifts on hover */}
        <span
          aria-hidden="true"
          className="scanlines pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-[var(--dur-base)] group-hover:opacity-0"
        />
      </div>
      {/* title slides up on hover/focus */}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-surface via-surface/90 to-transparent p-3 pt-8 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)] group-hover:translate-y-0">
        <span className="font-display text-sm font-bold uppercase tracking-tight text-ink">
          {piece.title}
        </span>
      </figcaption>
    </figure>
  );
}
