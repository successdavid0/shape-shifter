import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Utility } from "@/components/sections/Utility";
import { Roadmap } from "@/components/sections/Roadmap";
import { Team } from "@/components/sections/Team";
import { MintCta } from "@/components/sections/MintCta";

export const metadata: Metadata = {
  title: "Lore",
  description:
    "The pact behind holding a SHAPESHIFTER — utility, the honest roadmap, and the keepers of the tribe.",
  alternates: { canonical: "/lore" },
};

export default function LorePage() {
  return (
    <>
      <PageHero
        index="03"
        kicker="The Pact"
        title="Wear the skin"
        intro="Holding a SHAPESHIFTER isn't a receipt. It's a pact. Here's what carrying one gets you — and where the tribe walks next."
      />
      <Utility />
      <Roadmap />
      <Team />
      <MintCta />
    </>
  );
}
