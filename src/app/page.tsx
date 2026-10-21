import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Marquee } from "@/components/ui/Marquee";
import { Portals } from "@/components/sections/Portals";
import { MintCta } from "@/components/sections/MintCta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const MARQUEE = [
  "Skinwalker Edition",
  "Mints Oct 25, 2026",
  "1 / 1 folk-horror totems",
  "Common Trickster",
  "Rare Skin Stalker",
  "Legendary Walker Seal",
  "Full commercial rights",
  "The tribe grows inward first",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Marquee items={MARQUEE} />
      <Portals />
      <MintCta />
    </>
  );
}
