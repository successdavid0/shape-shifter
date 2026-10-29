import { collection, whitelist, isFill } from "@/lib/content";
import { formatMintDate } from "@/lib/datetime";
import { WhitelistForm } from "@/components/web3/WhitelistForm";
import { Countdown } from "@/components/web3/Countdown";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/motion";

export function Whitelist() {
  const dateKnown = !isFill(collection.mintDateUtc);
  return (
    <section
      id="whitelist"
      className="mesh-bg scanlines scroll-mt-[var(--header-h)] relative overflow-hidden border-t border-line px-5 py-[var(--spacing-section)] sm:px-8"
    >
      <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <Pill tone="accent" pulse>{whitelist.kicker}</Pill>

        <h2 className="font-display text-3xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-display">
          <span className="chroma">{whitelist.heading}</span>
        </h2>

        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            Mints {dateKnown ? formatMintDate(collection.mintDateUtc) : "TBA"}
          </p>
          {dateKnown && <Countdown iso={collection.mintDateUtc} />}
        </div>

        <p className="max-w-md text-lg text-ink-muted">{whitelist.intro}</p>

        <WhitelistForm />
      </Reveal>
    </section>
  );
}
