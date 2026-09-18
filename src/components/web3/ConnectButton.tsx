"use client";

import { Button } from "@/components/ui/Button";
import { useMint } from "./MintProvider";
import { shortenAddress } from "@/lib/contract";

/**
 * Styled connect control — reflects shared mint state. Backed by the mocked
 * provider today; swaps to wagmi's useAccount/useConnect at the swap point
 * without changing this component's markup.
 */
export function ConnectButton({ full = false }: { full?: boolean }) {
  const { connection, account, connect, disconnect } = useMint();
  const width = full ? "w-full" : "";

  if (connection === "connected" && account) {
    return (
      <Button variant="outline" size="sm" className={width} onClick={disconnect}>
        {shortenAddress(account)}
      </Button>
    );
  }

  if (connection === "wrong_network") {
    return (
      <Button variant="outline" size="sm" className={`${width} !border-warn/60 !text-warn`} onClick={connect}>
        Wrong network
      </Button>
    );
  }

  return (
    <Button variant="primary" size="sm" className={width} onClick={connect}>
      Connect Wallet
    </Button>
  );
}
