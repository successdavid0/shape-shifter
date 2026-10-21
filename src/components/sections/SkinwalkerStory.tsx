import { skinwalker } from "@/lib/content";
import { GlitchText } from "@/components/ui/GlitchText";
import { Reveal } from "@/components/ui/motion";

export function SkinwalkerStory() {
  return (
    <section className="relative overflow-hidden px-5 py-[var(--spacing-section)] sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
            {skinwalker.kicker}
          </p>
          <GlitchText
            as="h2"
            className="mt-4 font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-3xl"
          >
            {skinwalker.heading}
          </GlitchText>
        </Reveal>

        {/* staccato opening — one beat per line */}
        <Reveal delay={0.06} className="mt-8 flex flex-col gap-1">
          {skinwalker.lede.map((line, i) => (
            <p
              key={line}
              className={`font-display text-xl font-bold uppercase tracking-tight sm:text-2xl ${
                i === 0 ? "text-ink" : "text-ink-muted"
              }`}
            >
              {line}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-ink-muted">{skinwalker.body}</p>
        </Reveal>

        <Reveal delay={0.16} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {skinwalker.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-xs uppercase tracking-widest text-ink"
            >
              {t}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
