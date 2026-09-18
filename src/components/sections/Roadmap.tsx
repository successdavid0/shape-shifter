import { roadmap } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";

export function Roadmap() {
  return (
    <section
      id="roadmap"
      className="scroll-mt-[var(--header-h)] border-t border-line bg-surface-2/40 px-5 py-[var(--spacing-section)] sm:px-8"
    >
      <div className="mx-auto max-w-[80rem]">
        <SectionHeading
          index="04"
          kicker="The path"
          title="Honest phases, no dates we can't hit"
        />

        <ol className="mt-12 border-l border-line-strong">
          {roadmap.map((r) => (
            <li key={r.phase} className="relative pl-8 pb-10 last:pb-0 sm:pl-12">
              <span
                className={`absolute left-0 top-1 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border font-mono text-xs font-bold ${
                  r.status === "next"
                    ? "border-accent bg-accent text-surface"
                    : "border-line-strong bg-surface text-ink-muted"
                }`}
              >
                {r.phase}
              </span>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                    {r.title}
                  </h3>
                  {r.status === "next" && <Pill tone="live" pulse>Now</Pill>}
                </div>
                <p className="max-w-xl text-ink-muted">{r.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
