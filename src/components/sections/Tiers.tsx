import Image from "next/image";
import { tiers } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlitchText } from "@/components/ui/GlitchText";
import { Reveal } from "@/components/ui/motion";

// A representative face per tier, drawn from the collection art.
const tierArt = [
  "/art/SKINWALKER314.png", // Trickster
  "/art/SKINWALKER386.png", // Soul Stealer
  "/art/SKINWALKER79.png", // Spirit Master
];

export function Tiers() {
  return (
    <section className="border-t border-line bg-surface-2/40 px-5 py-[var(--spacing-section)] sm:px-8">
      <div className="mx-auto max-w-[80rem]">
        <Reveal>
          <SectionHeading
            index="◆"
            kicker="Three levels of power"
            title="One collection"
          />
        </Reveal>

        <div className="mt-10 grid gap-3 sm:gap-4 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.08}
              className="glitch-hover clip-corner-2 group flex flex-col overflow-hidden border border-line bg-surface-2 transition-[border-color,transform] duration-[var(--dur-base)] hover:-translate-y-1 hover:border-line-strong"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={tierArt[i]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover [filter:grayscale(1)_contrast(1.1)_brightness(0.9)] transition-[transform,filter] duration-[var(--dur-slow)] group-hover:scale-[1.05] group-hover:[filter:none]"
                />
                <span
                  aria-hidden="true"
                  className="scanlines pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-[var(--dur-base)] group-hover:opacity-0"
                />
                <span className="absolute left-3 top-3 border border-line-strong bg-surface/80 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-ink backdrop-blur-sm">
                  {t.level}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <GlitchText
                  as="h3"
                  className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink"
                >
                  {t.name}
                </GlitchText>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  {t.punch}
                </p>
                <p className="text-ink-muted">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
