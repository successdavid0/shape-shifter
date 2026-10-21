import { rarityPower } from "@/lib/content";
import { GlitchText } from "@/components/ui/GlitchText";
import { Reveal } from "@/components/ui/motion";

export function RarityPower() {
  return (
    <section className="relative overflow-hidden border-t border-line px-5 py-[var(--spacing-section)] sm:px-8">
      <div className="mx-auto grid max-w-[80rem] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
            {rarityPower.kicker}
          </p>
          <GlitchText
            as="h2"
            className="mt-4 font-display text-3xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-display"
          >
            {rarityPower.heading}
          </GlitchText>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-4 border-l border-line-strong pl-6 sm:pl-8">
          {rarityPower.lines.map((line, i) => (
            <p
              key={i}
              className={
                i === 0 || i === 1
                  ? "font-display text-lg font-bold uppercase tracking-tight text-ink"
                  : "text-ink-muted"
              }
            >
              {line}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
