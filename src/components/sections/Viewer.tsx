import { art } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/motion";
import { NftViewerLoader } from "@/components/three/NftViewerLoader";

// The Legendary Walker Seal anchors the viewer.
const featured = art.find((p) => p.id === "79")!;

export function Viewer() {
  return (
    <section
      id="viewer"
      className="scroll-mt-[var(--header-h)] border-y border-line bg-surface-2/40 px-5 py-[var(--spacing-section)] sm:px-8"
    >
      <div className="mx-auto grid max-w-[80rem] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 flex flex-col items-start gap-6 lg:order-1">
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
            Drag to rotate — falls back to a still frame without WebGL
          </p>
        </Reveal>

        <div className="order-1 lg:order-2">
          <div className="mx-auto w-full max-w-lg">
            {/* SWAP POINT: pass a GLB-backed viewer here when a model exists */}
            <NftViewerLoader src={featured.src} alt={featured.alt} />
          </div>
        </div>
      </div>
    </section>
  );
}
