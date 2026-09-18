import { stats, isFill } from "@/lib/content";
import { Fill } from "@/components/ui/Fill";

export function Stats() {
  return (
    <section aria-label="Collection stats" className="border-y border-line bg-surface-2/40">
      <div className="mx-auto grid max-w-[80rem] grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
        {stats.map((s) => (
          <div
            key={s.key}
            className="flex flex-col gap-2 border-b border-line px-5 py-7 md:border-b-0 sm:px-8"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
              {s.label}
            </span>
            {/* fixed-height value row → no CLS when live data resolves */}
            <span className="flex h-9 items-center font-display text-2xl font-bold leading-none">
              {isFill(s.value) ? (
                s.live ? (
                  <span
                    className="inline-block h-6 w-20 animate-pulse rounded-sm bg-surface-3"
                    role="status"
                    aria-label={`${s.label} loading`}
                  />
                ) : (
                  <Fill value={s.value} />
                )
              ) : (
                <span className={s.mono ? "tnum font-mono" : ""}>{s.value}</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
