import { art } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArtCard } from "./ArtCard";

// Two totems break the grid at 2×2; the rest hold a square rhythm.
const FEATURED = new Set(["79", "386"]);
const SIZES_1 = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";
const SIZES_2 = "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw";

export function Gallery() {
  return (
    <section id="art" className="scroll-mt-[var(--header-h)] px-5 py-[var(--spacing-section)] sm:px-8">
      <div className="mx-auto max-w-[80rem]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            index="01"
            kicker="The Tribe"
            title="Sixteen skins. Every one a 1/1."
          />
          <p className="max-w-sm text-sm text-ink-muted">
            Common Tricksters, Rare Skin Stalkers, and the Legendary Walker Seal.
            Hover a totem to read its name.
          </p>
        </div>

        <div className="mt-10 grid grid-flow-dense grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {art.map((piece, i) => {
            const big = FEATURED.has(piece.id);
            return (
              <ArtCard
                key={piece.id}
                piece={piece}
                priority={i < 2}
                sizes={big ? SIZES_2 : SIZES_1}
                className={big ? "col-span-2 row-span-2" : ""}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
