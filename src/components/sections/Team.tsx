import { team, isFill } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Fill } from "@/components/ui/Fill";

export function Team() {
  return (
    <section
      id="team"
      className="scroll-mt-[var(--header-h)] px-5 py-[var(--spacing-section)] sm:px-8"
    >
      <div className="mx-auto max-w-[80rem]">
        <div className="max-w-2xl">
          <SectionHeading index="05" kicker="Behind the masks" title="The keepers" />
          <p className="mt-5 text-ink-muted">
            Pseudonymous, on-chain, reachable. Real people carry this tribe.
          </p>
        </div>

        <ul className="mt-10 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <li
              key={i}
              className="flex items-center gap-4 border border-line bg-surface-2 p-5"
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface-3 font-display text-lg font-bold text-accent"
                aria-hidden="true"
              >
                {isFill(m.name) ? "?" : m.name.charAt(0)}
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-base font-bold uppercase tracking-tight">
                  <Fill value={m.name} placeholder="TBA" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  {m.role}
                </span>
                <span className="font-mono text-xs text-accent">
                  {isFill(m.handle) ? <Fill value={m.handle} placeholder="@tba" /> : m.handle}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
