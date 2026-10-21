import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Faq } from "@/components/sections/Faq";
import { MintCta } from "@/components/sections/MintCta";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Everything to read before you mint a SHAPESHIFTER — chain, wallet, gas, whitelist, holder utility and contract verification.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        index="04"
        kicker="Questions"
        title="Read before you mint"
        intro="No hype, no promises — the straight answers on chain, wallet, gas, the allowlist and what you actually get as a holder."
      />
      <Faq />
      <MintCta />
    </>
  );
}
