import type { Metadata } from "next";
import { MintView, type MintViewKind } from "@/components/web3/MintView";

// QA / verification page for every mint state (PRD §8 + DoD). Not indexed.
export const metadata: Metadata = {
  title: "Mint states (QA)",
  robots: { index: false, follow: false },
};

const future = new Date(Date.now() + (2 * 86400 + 3600 * 5) * 1000).toISOString();

const cases: { kind: MintViewKind; label: string; props?: Record<string, unknown> }[] = [
  { kind: "disconnected", label: "Wallet not connected", props: { price: "0.02 ETH" } },
  { kind: "wrong_network", label: "Wrong network" },
  { kind: "not_started", label: "Sale not started (countdown)", props: { mintDateUtc: future, price: "0.02 ETH" } },
  { kind: "allowlist", label: "Allowlist only", props: { account: "0x5Ac1000000000000000000000000000000009f3B", price: "0.015 ETH" } },
  { kind: "public", label: "Public live", props: { account: "0x5Ac1000000000000000000000000000000009f3B", price: "0.02 ETH" } },
  { kind: "max_minted", label: "Already minted max" },
  { kind: "sold_out", label: "Sold out" },
  { kind: "tx_pending", label: "Transaction pending" },
  { kind: "tx_success", label: "Transaction success", props: { txHash: "0xabc0000000000000000000000000000000000000000000000000000000000def" } },
  { kind: "tx_rejected", label: "Transaction rejected" },
  { kind: "tx_failed", label: "Transaction failed", props: { error: "Insufficient funds for gas + value." } },
];

export default function MintStatesPage() {
  return (
    <div className="mesh-bg min-h-screen px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[80rem]">
        <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight">
          Mint states — QA
        </h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Every mint state from PRD §8, rendered with demo fixtures. Values here
          are illustrative only; the live page shows real data (or TBA).
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div key={c.kind} className="flex flex-col items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                {c.label}
              </span>
              <MintView kind={c.kind} {...c.props} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
