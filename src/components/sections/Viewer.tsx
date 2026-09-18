import Image from "next/image";
import { art } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";

// The Legendary Walker Seal anchors the viewer.
const featured = art.find((p) => p.id === "79")!;

export function Viewer() {
  return (
    <section
      id="viewer"
      className="scroll-mt-[var(--header-h)] border-y border-line bg-surface-2/40 px-5 py-[var(--spacing-section)] sm:px-8"
    >
      <div className="mx-auto grid max-w-[80rem] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 flex flex-col items-start gap-6 lg:order-1">
          <SectionHeading
            index="02"
            kicker="Up close"
            title="Inspect the totem"
          />
          <p className="max-w-md text-ink-muted">
            Every SHAPESHIFTER rewards a closer look — layered linework, hidden
            sigils, and the moment of transformation frozen in the mask. The
            Legendary Walker Seal is the rarest face in the tribe.
          </p>
          <div className="flex flex-wrap gap-2">
            <Pill tone="accent">{featured.rarityLabel}</Pill>
            <Pill tone="neutral">1 of 1</Pill>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
            {/* SWAP POINT (Phase D): NftViewer canvas w/ damped OrbitControls */}
            Drag to rotate — interactive 3D loads with the viewer
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <div className="scanlines relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-xl border border-line-strong bg-surface">
            <div className="mesh-bg absolute inset-0" aria-hidden="true" />
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-contain p-8 drop-shadow-[0_0_50px_var(--color-accent-soft)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
