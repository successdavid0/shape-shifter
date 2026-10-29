import Image from "next/image";
import { brand, collection, isFill } from "@/lib/content";
import { formatMintDateShort } from "@/lib/datetime";
import { Pill } from "@/components/ui/Pill";
import { LoadStagger, LoadItem, Tilt } from "@/components/ui/motion";

export function Hero() {
  const dateKnown = !isFill(collection.mintDateUtc);
  return (
    <section
      id="top"
      className="mesh-bg vhs-bg scanlines relative overflow-hidden px-5 pb-10 pt-[calc(var(--header-h)+1rem)] sm:px-8"
    >
      {/* ghost creature bleeding through the back of the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-0 hidden h-full w-[55%] opacity-[0.12] lg:block"
      >
        <Image
          src="/brand/duality.png"
          alt=""
          fill
          priority
          sizes="55vw"
          className="mono-img-hi object-contain object-right"
        />
      </div>

      <LoadStagger className="relative mx-auto max-w-[80rem]">
        <LoadItem>
          <Pill tone={dateKnown ? "live" : "soon"} pulse className="mb-6">
            {dateKnown
              ? `${collection.edition} · Mints ${formatMintDateShort(collection.mintDateUtc)}`
              : `${collection.edition} · Mints TBA`}
          </Pill>
        </LoadItem>

        {/* Full-width glitchmark banner — the real logo art */}
        <LoadItem y={30}>
          <h1 className="animate-flicker">
            <span className="sr-only">{collection.name} on XRPL</span>
            <Image
              src="/brand/wordmark-dark.png"
              alt=""
              width={2170}
              height={725}
              priority
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="mx-auto block h-auto w-full max-w-5xl"
            />
          </h1>
        </LoadItem>

        <div className="mt-6 grid items-end gap-8 lg:mt-8 lg:grid-cols-2 lg:gap-12">
          {/* Copy — the brand statement */}
          <div className="order-1 flex flex-col items-start gap-5">
            <LoadItem>
              <p className="font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-3xl">
                {brand.tagline}
              </p>
            </LoadItem>

            <LoadItem>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                {brand.punch}
              </p>
            </LoadItem>

            <LoadItem>
              <p className="max-w-md text-lg text-ink-muted">{brand.intro}</p>
            </LoadItem>
          </div>

          {/* The creature duality — monochrome, glitch-framed */}
          <LoadItem className="order-2 w-full" y={30}>
            <div className="mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
              <Tilt>
                <figure className="scanlines group relative aspect-square w-full overflow-hidden border border-line-strong bg-surface-2">
                  <Image
                    src="/brand/duality.png"
                    alt="Two halves of one shapeshifter — a horned green trickster beast and a snarling violet wolf-spirit, split down the middle."
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="mono-img object-cover transition-[filter,transform] duration-[var(--dur-slow)] group-hover:scale-[1.03] group-hover:[filter:grayscale(1)_contrast(1.3)_brightness(1.05)]"
                  />
                  {/* chromatic edge split on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-[var(--dur-base)] group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(90deg, color-mix(in oklab, var(--glitch-cyan) 18%, transparent), transparent 18%, transparent 82%, color-mix(in oklab, var(--glitch-red) 18%, transparent))",
                    }}
                  />
                  <figcaption className="absolute bottom-3 left-3 z-[3] font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
                    One spirit · two skins
                  </figcaption>
                </figure>
              </Tilt>
            </div>
          </LoadItem>
        </div>
      </LoadStagger>
    </section>
  );
}
