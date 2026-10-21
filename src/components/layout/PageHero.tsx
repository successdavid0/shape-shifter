import { Wordmark } from "@/components/ui/Wordmark";
import { GlitchText } from "@/components/ui/GlitchText";

/**
 * Shared sub-page intro band. Each routed page opens with this glitch header
 * so a navigation feels like arriving at a destination, not a scroll jump.
 */
export function PageHero({
  index,
  kicker,
  title,
  intro,
}: {
  index: string;
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="mesh-bg vhs-bg scanlines relative overflow-hidden border-b border-line px-5 pb-10 pt-[calc(var(--header-h)+2rem)] sm:px-8">
      {/* faint oversized ghost wordmark bleeding behind the title */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-6 opacity-[0.04]"
      >
        <Wordmark text="SHAPESHIFTER" />
      </div>

      <div className="relative mx-auto max-w-[80rem]">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
          <span>{index}</span>
          <span className="h-px w-10 bg-line-strong" />
          <span>{kicker}</span>
        </div>

        <h1 className="mt-5 animate-glitch-in font-display text-3xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-display">
          <GlitchText as="span" className="glitch-hover">{title}</GlitchText>
        </h1>

        {intro && (
          <p className="mt-6 max-w-xl text-lg text-ink-muted">{intro}</p>
        )}
      </div>
    </section>
  );
}
