import { xrpl } from "@/lib/content";
import { GlitchText } from "@/components/ui/GlitchText";
import { Reveal } from "@/components/ui/motion";

export function BuiltOnXrpl() {
  return (
    <section
      id="xrpl"
      className="scroll-mt-[var(--header-h)] border-t border-line bg-surface-2/40 px-5 py-[var(--spacing-section)] sm:px-8"
    >
      <Reveal className="mx-auto flex max-w-[80rem] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
            {xrpl.kicker}
          </p>
          <GlitchText
            as="h2"
            className="font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-3xl"
          >
            {xrpl.heading}
          </GlitchText>
          <p className="font-mono text-xs uppercase tracking-widest text-ink">{xrpl.tagline}</p>
        </div>
        <p className="max-w-md text-ink-muted">{xrpl.body}</p>
      </Reveal>
    </section>
  );
}
