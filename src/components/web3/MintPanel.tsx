"use client";

import { collection, isFill } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

/**
 * SWAP POINT (Phase E): this stub is replaced by the full mint state machine
 * driven by useMintState() — disconnected / wrong-network / countdown /
 * allowlist / live / max / sold-out / pending / success / rejected / failed.
 */
export function MintPanel() {
  const dateKnown = !isFill(collection.mintDateUtc);
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-line-strong bg-surface-2/70 p-6">
      <Pill tone={dateKnown ? "live" : "soon"} pulse>
        {dateKnown ? "Sale scheduled" : "Sale date TBA"}
      </Pill>
      <Button size="lg" className="w-full" href="#top">
        Connect Wallet
      </Button>
      <p className="font-mono text-xs text-ink-muted">
        Wallet connect &amp; mint flow wire up in Phase E
      </p>
    </div>
  );
}
