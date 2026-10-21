import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SkinwalkerStory } from "@/components/sections/SkinwalkerStory";
import { Tiers } from "@/components/sections/Tiers";
import { Gallery } from "@/components/sections/Gallery";
import { RarityPower } from "@/components/sections/RarityPower";
import { Viewer } from "@/components/sections/Viewer";
import { Marquee } from "@/components/ui/Marquee";
import { MintCta } from "@/components/sections/MintCta";

export const metadata: Metadata = {
  title: "The Tribe",
  description:
    "Sixteen 1/1 folk-horror totems — Common Tricksters, Rare Soul Stealers and the Legendary Spirit Master. Inspect every skin up close.",
  alternates: { canonical: "/tribe" },
};

const MARQUEE = [
  "Sixteen skins",
  "Every one a 1 / 1",
  "Common Trickster",
  "Rare Soul Stealer",
  "Legendary Spirit Master",
  "Full commercial rights",
];

export default function TribePage() {
  return (
    <>
      <PageHero
        index="01"
        kicker="The Tribe"
        title="Sixteen skins"
        intro="Folk-horror totems caught mid-transformation. Each one a 1/1 — Common Tricksters, Rare Soul Stealers, and the single Legendary Spirit Master."
      />
      <SkinwalkerStory />
      <Tiers />
      <Gallery />
      <Marquee items={MARQUEE} />
      <RarityPower />
      <Viewer />
      <MintCta />
    </>
  );
}
