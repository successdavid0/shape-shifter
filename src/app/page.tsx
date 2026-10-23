import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { EnterGame } from "@/components/sections/EnterGame";
import { BuiltOnXrpl } from "@/components/sections/BuiltOnXrpl";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const MARQUEE = [
  "Skinwalker Edition",
  "Mints Oct 25, 2026",
  "1 / 1 folk-horror totems",
  "Common Trickster",
  "Rare Soul Stealer",
  "Legendary Spirit Master",
  "Full commercial rights",
  "The tribe grows inward first",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE} />
      <EnterGame />
      <BuiltOnXrpl />
    </>
  );
}
