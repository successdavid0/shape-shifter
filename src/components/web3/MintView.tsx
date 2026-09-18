"use client";

import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Countdown } from "./Countdown";
import { explorerUrl, shortenAddress } from "@/lib/contract";

export type MintViewKind =
  | "disconnected"
  | "wrong_network"
  | "not_started"
  | "allowlist"
  | "public"
  | "max_minted"
  | "sold_out"
  | "tx_pending"
  | "tx_success"
  | "tx_rejected"
  | "tx_failed";

export interface MintViewProps {
  kind: MintViewKind;
  account?: string;
  price?: string; // display string or undefined (TBA)
  mintDateUtc?: string; // ISO for the countdown
  txHash?: string;
  error?: string;
  onConnect?: () => void;
  onSwitch?: () => void;
  onMint?: () => void;
  onReset?: () => void;
  onDisconnect?: () => void;
}

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-line-strong bg-surface-2/70 p-6 text-center">
    {children}
  </div>
);

const PriceLine = ({ price }: { price?: string }) => (
  <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
    Price {price ? <span className="text-ink">{price}</span> : <span className="text-accent-warm">TBA</span>}
  </p>
);

export function MintView(p: MintViewProps) {
  switch (p.kind) {
    case "disconnected":
      return (
        <Frame>
          <Pill tone="neutral">Wallet not connected</Pill>
          <p className="text-ink-muted">Connect a wallet to check your allowlist spot and mint.</p>
          <Button size="lg" className="w-full" onClick={p.onConnect}>Connect Wallet</Button>
          <PriceLine price={p.price} />
        </Frame>
      );

    case "wrong_network":
      return (
        <Frame>
          <Pill tone="soon">Wrong network</Pill>
          <p className="text-ink-muted">
            Your wallet is on a different network. Switch to continue.
          </p>
          <Button size="lg" variant="outline" className="w-full" onClick={p.onSwitch}>
            Switch network
          </Button>
        </Frame>
      );

    case "not_started":
      return (
        <Frame>
          <Pill tone="soon" pulse>Sale not started</Pill>
          {p.mintDateUtc ? (
            <Countdown iso={p.mintDateUtc} />
          ) : (
            <p className="text-ink-muted">
              Mint date <span className="text-accent-warm">TBA</span> — connect to be ready.
            </p>
          )}
          <Button size="lg" className="w-full" disabled>Mint opens soon</Button>
          <PriceLine price={p.price} />
        </Frame>
      );

    case "allowlist":
      return (
        <Frame>
          <Pill tone="accent" pulse>Allowlist live</Pill>
          <p className="text-ink-muted">
            You&apos;re on the list. {p.account && <span className="font-mono text-ink">{shortenAddress(p.account)}</span>}
          </p>
          <Button size="lg" className="w-full" onClick={p.onMint}>Mint (allowlist)</Button>
          <PriceLine price={p.price} />
        </Frame>
      );

    case "public":
      return (
        <Frame>
          <Pill tone="live" pulse>Public mint live</Pill>
          <p className="text-ink-muted">
            {p.account && <span className="font-mono text-ink">{shortenAddress(p.account)}</span>} — mint is open to everyone.
          </p>
          <Button size="lg" className="w-full" onClick={p.onMint}>Mint now</Button>
          <PriceLine price={p.price} />
        </Frame>
      );

    case "max_minted":
      return (
        <Frame>
          <Pill tone="accent">You&apos;re maxed out</Pill>
          <p className="text-ink-muted">
            You&apos;ve minted the maximum per wallet. Thank you for joining the tribe.
          </p>
          <Button size="lg" variant="outline" className="w-full" href="#art">See the collection</Button>
        </Frame>
      );

    case "sold_out":
      return (
        <Frame>
          <Pill tone="soon">Sold out</Pill>
          <p className="text-ink-muted">Every Shapeshifter has walked. Find one on the secondary market.</p>
          <Button size="lg" variant="outline" className="w-full" href="#mint">View on marketplace</Button>
        </Frame>
      );

    case "tx_pending":
      return (
        <Frame>
          <Pill tone="soon" pulse>Transaction pending</Pill>
          <div className="flex items-center gap-3">
            <span className="h-6 w-6 animate-[spin-slow_1s_linear_infinite] rounded-full border-2 border-line-strong border-t-accent" />
            <span className="font-mono text-sm text-ink-muted">Confirm in your wallet…</span>
          </div>
          <Button size="lg" className="w-full" disabled>Minting…</Button>
        </Frame>
      );

    case "tx_success": {
      const url = p.txHash ? explorerUrl("tx", p.txHash) : null;
      return (
        <Frame>
          <Pill tone="live">Minted ✓</Pill>
          <p className="text-ink-muted">Welcome to the tribe. Your Shapeshifter is on-chain.</p>
          <div className="flex w-full flex-col gap-2">
            {url ? (
              <Button size="lg" variant="outline" className="w-full" href={url}>View transaction</Button>
            ) : (
              <p className="font-mono text-xs text-ink-muted">
                Tx <span className="text-ink">{p.txHash ?? "confirmed"}</span>
              </p>
            )}
            <Button size="sm" variant="ghost" onClick={p.onReset}>Mint another</Button>
          </div>
        </Frame>
      );
    }

    case "tx_rejected":
      return (
        <Frame>
          <Pill tone="soon">Transaction rejected</Pill>
          <p className="text-ink-muted">You declined the request in your wallet. No funds were spent.</p>
          <Button size="lg" className="w-full" onClick={p.onMint}>Try again</Button>
        </Frame>
      );

    case "tx_failed":
      return (
        <Frame>
          <Pill tone="neutral" className="!text-danger !border-danger/40 !bg-danger/10">
            Transaction failed
          </Pill>
          <p className="text-ink-muted">
            {p.error ?? "Something went wrong and the mint didn't go through. You were only charged network gas, never the mint price."}
          </p>
          <Button size="lg" className="w-full" onClick={p.onMint}>Try again</Button>
        </Frame>
      );
  }
}
