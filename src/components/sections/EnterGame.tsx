import Image from "next/image";
import { game } from "@/lib/content";
import { GlitchText } from "@/components/ui/GlitchText";
import { Reveal } from "@/components/ui/motion";

export function EnterGame() {
  return (
    <section className="mesh-bg scanlines relative overflow-hidden border-t border-line px-5 py-[var(--spacing-section)] sm:px-8">
      {/* coming-soon glitch figure, faint, behind the CTA */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src="/brand/coming-soon.png"
          alt=""
          fill
          sizes="100vw"
          className="mono-img object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/70 to-surface" />
      </div>

      <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
          {game.kicker}
        </p>
        <GlitchText
          as="h2"
          className="font-display text-3xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-display"
        >
          {game.heading}
        </GlitchText>

        <div className="flex flex-col gap-3">
          {game.body.map((p) => (
            <p key={p} className="text-lg text-ink-muted">
              {p}
            </p>
          ))}
        </div>

        {/* the staccato steps */}
        <ol className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {game.steps.map((s, i) => (
            <li
              key={s}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink"
            >
              <span className="text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </li>
          ))}
        </ol>

        {/* coming-soon CTA — intentionally not yet live */}
        <div className="mt-2 flex flex-col items-center gap-2">
          <span
            className="clip-corner inline-flex cursor-not-allowed items-center gap-3 border border-line-strong bg-surface-2 px-7 py-4 font-display text-base font-bold uppercase tracking-wide text-ink-muted"
            role="button"
            aria-disabled="true"
          >
            {game.cta}
            <span className="animate-flicker text-ink">▸</span>
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink-muted">
            {game.ctaNote}
          </span>
        </div>
      </Reveal>
    </section>
  );
}
