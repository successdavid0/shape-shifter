import { collection, isFill } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Fill } from "@/components/ui/Fill";
import { HeroPoster } from "@/components/three/HeroPoster";
import { Wordmark } from "@/components/ui/Wordmark";
import { LoadStagger, LoadItem, Tilt } from "@/components/ui/motion";

export function Hero() {
  const dateKnown = !isFill(collection.mintDateUtc);
  return (
    <section
      id="top"
      className="mesh-bg relative overflow-hidden px-5 pb-16 pt-[calc(var(--header-h)+1.5rem)] sm:px-8"
    >
      <LoadStagger className="mx-auto max-w-[80rem]">
        <LoadItem>
          <Pill tone={dateKnown ? "live" : "soon"} pulse className="mb-6">
            {dateKnown ? "Mint scheduled" : "Mint date incoming"}
          </Pill>
        </LoadItem>

        {/* Full-width wordmark banner — SVG stretch-fit, always one line */}
        <LoadItem y={30}>
          <h1 className="animate-flicker">
            <Wordmark text={collection.name} />
          </h1>
        </LoadItem>

        <div className="mt-8 grid items-end gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-12">
          {/* Copy — first in DOM so the mint CTA is above the fold on mobile */}
          <div className="order-1 flex flex-col items-start gap-6">
            <LoadItem>
              <p className="max-w-md text-lg text-ink-muted">{collection.pitch}</p>
            </LoadItem>

            <LoadItem>
              <dl className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
                <div className="flex flex-col">
                  <dt className="text-xs uppercase tracking-widest text-ink-muted">Supply</dt>
                  <dd className="tnum text-ink"><Fill value={collection.supply} /></dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-xs uppercase tracking-widest text-ink-muted">Chain</dt>
                  <dd className="text-ink"><Fill value={collection.chain} /></dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-xs uppercase tracking-widest text-ink-muted">Price</dt>
                  <dd className="tnum text-ink"><Fill value={collection.mintPrice} /></dd>
                </div>
              </dl>
            </LoadItem>

            <LoadItem>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button href="#mint" size="lg">Mint a Shapeshifter</Button>
                <Button href="#art" size="lg" variant="outline">See the tribe</Button>
              </div>
            </LoadItem>
          </div>

          {/* Visual slot — static poster now; R3F Canvas mounts here in Phase D */}
          <LoadItem className="order-2 w-full" y={30}>
            <div className="mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
              {/* SWAP POINT: <HeroSceneLoader /> replaces <HeroPoster /> in Phase D */}
              <Tilt>
                <HeroPoster priority />
              </Tilt>
            </div>
          </LoadItem>
        </div>
      </LoadStagger>
    </section>
  );
}
