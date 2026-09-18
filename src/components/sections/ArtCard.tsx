import Image from "next/image";
import type { ArtPiece, Rarity } from "@/lib/content";

const rarityTone: Record<Rarity, string> = {
  Common: "text-ink-muted border-line-strong",
  Rare: "text-accent border-accent/50",
  Legendary: "text-accent-warm border-accent-warm/60",
};

// 1x1 near-surface blur while the real image streams in.
const BLUR =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><rect width='8' height='8' fill='%23100826'/></svg>`
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
      className={`group relative overflow-hidden rounded-lg border border-line bg-surface-2 transition-[transform,border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-accent/50 hover:shadow-[var(--shadow-glow)] ${className}`}
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
          className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
        {/* rarity badge */}
        <span
          className={`absolute left-2 top-2 rounded-sm border bg-surface/70 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest backdrop-blur-sm ${rarityTone[piece.rarity]}`}
        >
          {piece.rarityLabel}
        </span>
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
