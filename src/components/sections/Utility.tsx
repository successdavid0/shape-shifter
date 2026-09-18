import { utility } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/motion";

export function Utility() {
  return (
    <section
      id="utility"
      className="scroll-mt-[var(--header-h)] px-5 py-[var(--spacing-section)] sm:px-8"
    >
      <div className="mx-auto max-w-[80rem]">
        <Reveal className="max-w-2xl">
          <SectionHeading index="03" kicker="What you get" title="The pact" />
          <p className="mt-5 text-lg text-ink-muted">{utility.intro}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-2">
          {utility.items.map((item, i) => (
            <article
              key={item.title}
              className={`clip-corner-2 group relative flex flex-col gap-3 border border-line bg-surface-2 p-6 transition-colors duration-[var(--dur-base)] hover:border-accent/50 sm:p-8 ${
                i === 0 ? "md:row-span-2 md:justify-between" : ""
              }`}
            >
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="text-ink-muted">{item.body}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
