import type { Metadata } from "next";
import Image from "next/image";
import { collection } from "@/lib/content";
import { Wordmark } from "@/components/ui/Wordmark";

// Source layout for the static OG image (1200x630). Screenshotted to
// /public/og.png at build time. Not indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function OgPreview() {
  return (
    <div
      className="mesh-bg scanlines fixed left-0 top-0 z-[999] overflow-hidden"
      style={{ width: 1200, height: 630 }}
    >
      <div className="absolute inset-0 flex items-center justify-between gap-10 p-20">
        <div className="flex max-w-[620px] flex-col gap-6">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
            NFT Collection
          </span>
          <div className="w-[560px]">
            <Wordmark text={collection.name} />
          </div>
          <p className="text-2xl leading-snug text-ink-muted">{collection.pitch}</p>
          <div className="mt-2 flex gap-3 font-mono text-sm uppercase tracking-widest text-ink-muted">
            <span className="rounded-full border border-line-strong px-4 py-2">Common</span>
            <span className="rounded-full border border-accent/50 px-4 py-2 text-accent">Rare</span>
            <span className="rounded-full border border-accent-warm/60 px-4 py-2 text-accent-warm">Legendary</span>
          </div>
        </div>
        <div className="relative h-[440px] w-[440px] shrink-0 overflow-hidden rounded-3xl border border-line-strong">
          <div className="mesh-bg absolute inset-0" />
          <Image src="/art/SKINWALKER79.png" alt="" fill className="object-contain p-4" priority />
        </div>
      </div>
    </div>
  );
}
