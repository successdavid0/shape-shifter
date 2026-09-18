"use client";

import { Button } from "@/components/ui/Button";

/**
 * SWAP POINT (Phase E): replace this stub with the real wagmi/viem connect
 * flow (RainbowKit/ConnectKit styled to the design system). For now it is a
 * design-complete button that points the visitor at the mint section.
 */
export function ConnectButton({ full = false }: { full?: boolean }) {
  return (
    <Button
      variant="primary"
      size="sm"
      href="#mint"
      className={full ? "w-full" : ""}
    >
      Connect Wallet
    </Button>
  );
}
