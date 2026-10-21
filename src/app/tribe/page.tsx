import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Gallery } from "@/components/sections/Gallery";
import { Viewer } from "@/components/sections/Viewer";
import { Marquee } from "@/components/ui/Marquee";
import { MintCta } from "@/components/sections/MintCta";

export const metadata: Metadata = {
  title: "The Tribe",
  description:
    "Sixteen 1/1 folk-horror totems — Common Tricksters, Rare Skin Stalkers and the Legendary Walker Seal. Inspect every skin up close.",
  alternates: { canonical: "/tribe" },
};

const MARQUEE = [
  "Sixteen skins",
  "Every one a 1 / 1",
  "Common Trickster",
  "Rare Skin Stalker",
  "Legendary Walker Seal",
  "Full commercial rights",
];

export default function TribePage() {
  return (
    <>
      <PageHero
        index="01"
        kicker="The Tribe"
        title="Sixteen skins"
        intro="Folk-horror totems caught mid-transformation. Each one a 1/1 — Common Tricksters, Rare Skin Stalkers, and the single Legendary Walker Seal."
      />
      <Gallery />
      <Marquee items={MARQUEE} />
      <Viewer />
      <MintCta />
    </>
  );
}
