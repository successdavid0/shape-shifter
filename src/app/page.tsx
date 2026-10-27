import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { AboutNfts } from "@/components/sections/AboutNfts";
import { Whitelist } from "@/components/sections/Whitelist";
import { BuiltOnXrpl } from "@/components/sections/BuiltOnXrpl";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * One page, four sections (no sub-routes):
 *   1. Brand        — <Hero />
 *   2. The NFTs     — <AboutNfts /> (collection + link to XRP Cafe)
 *   3. Whitelist    — <Whitelist /> (reserve with your wallet)
 *   4. Built on XRPL — <BuiltOnXrpl />
 */
export default function Home() {
  return (
    <>
      <Hero />
      <AboutNfts />
      <Whitelist />
      <BuiltOnXrpl />
    </>
  );
}
