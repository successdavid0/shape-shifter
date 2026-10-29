import { art, skinwalker, nftsLede, collection } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/motion";
import { ArtCard } from "./ArtCard";

// Two totems break the grid at 2×2; the rest hold a square rhythm.
const FEATURED = new Set(["79", "386"]);
const SIZES_1 = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";
const SIZES_2 = "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw";

/**
 * Section 2 — About the NFTs. The one place on the page that explains what
 * the collection is, shows every skin, and sends collectors to XRP Cafe.
 */
export function AboutNfts() {
  return (
    <section
      id="about"
      className="scroll-mt-[var(--header-h)] border-t border-line px-5 py-[var(--spacing-section)] sm:px-8"
    >
      <div className="mx-auto max-w-[80rem]">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading index="01" kicker={skinwalker.kicker} title="The NFTs" />
          <p className="max-w-sm text-sm text-ink-muted">{nftsLede}</p>
        </Reveal>

        {/* Every skin — sixteen 1/1s. */}
        <Reveal
          delay={0.1}
          className="mt-10 grid grid-flow-dense grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
        >
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
        </Reveal>

        {/* The one link out — collect on XRP Cafe. */}
        <Reveal delay={0.08} className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-md text-ink-muted">
            Browse and collect the Skinwalker Edition on XRP Cafe — the XRP Ledger marketplace.
          </p>
          <Button href={collection.xrpCafeUrl} size="lg">
            View on XRP Cafe
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
