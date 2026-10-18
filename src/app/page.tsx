import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Marquee } from "@/components/ui/Marquee";
import { Gallery } from "@/components/sections/Gallery";
import { Viewer } from "@/components/sections/Viewer";
import { Whitelist } from "@/components/sections/Whitelist";
import { Utility } from "@/components/sections/Utility";
import { Roadmap } from "@/components/sections/Roadmap";
import { Team } from "@/components/sections/Team";
import { Faq } from "@/components/sections/Faq";
import { MintCta } from "@/components/sections/MintCta";

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
      <Gallery />
      <Viewer />
      <Whitelist />
      <Utility />
      <Roadmap />
      <Team />
      <Faq />
      <MintCta />
    </>
  );
}
