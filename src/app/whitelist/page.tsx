import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Whitelist } from "@/components/sections/Whitelist";

export const metadata: Metadata = {
  title: "Whitelist",
  description:
    "Reserve a guaranteed allowlist spot for the SHAPESHIFTER Skinwalker Edition before the public walk. No cost, no wallet connection.",
  alternates: { canonical: "/whitelist" },
};

export default function WhitelistPage() {
  return (
    <>
      <PageHero
        index="02"
        kicker="Skinwalker Edition · Allowlist"
        title="Reserve your spot"
        intro="Drop your wallet to lock a guaranteed allowlist spot before the public walk. No cost, no connection — just your place in the tribe."
      />
      <Whitelist />
    </>
  );
}
