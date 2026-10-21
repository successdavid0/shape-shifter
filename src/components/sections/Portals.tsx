import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlitchText } from "@/components/ui/GlitchText";
import { Reveal } from "@/components/ui/motion";

/** Home gateway grid — each card is a glitch portal into a routed page. */
const portals = [
  {
    no: "01",
    href: "/tribe",
    title: "The Tribe",
    body: "Sixteen 1/1 totems. Inspect every skin up close and rotate the Legendary Spirit Master.",
  },
  {
    no: "02",
    href: "/whitelist",
    title: "Whitelist",
    body: "Reserve a guaranteed allowlist spot before the public walk. Free, no connection.",
  },
  {
    no: "03",
    href: "/lore",
    title: "Lore",
    body: "The pact behind the mask — utility, the honest roadmap, and the keepers of the tribe.",
  },
  {
    no: "04",
    href: "/faq",
    title: "FAQ",
    body: "Chain, wallet, gas, holder rights — the straight answers to read before you mint.",
  },
];

export function Portals() {
  return (
    <section className="border-t border-line px-5 py-[var(--spacing-section)] sm:px-8">
      <div className="mx-auto max-w-[80rem]">
        <Reveal>
          <SectionHeading
            index="00"
            kicker="Enter the signal"
            title="Four ways in"
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-10 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portals.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="glitch-hover clip-corner-2 group relative flex min-h-56 flex-col justify-between overflow-hidden border border-line bg-surface-2 p-6 transition-[border-color,background-color,transform] duration-[var(--dur-base)] hover:-translate-y-1 hover:border-line-strong hover:bg-surface-3"
            >
              {/* scanline wash on hover */}
              <span
                aria-hidden="true"
                className="scanlines pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100"
              />
              <span className="font-mono text-xs tracking-widest text-ink-muted">
                {p.no}
              </span>
              <div className="relative flex flex-col gap-2">
                <GlitchText
                  as="h3"
                  className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink"
                >
                  {p.title}
                </GlitchText>
                <p className="text-sm text-ink-muted">{p.body}</p>
                <span className="mt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink">
                  Enter
                  <span aria-hidden="true" className="transition-transform duration-[var(--dur-base)] group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
