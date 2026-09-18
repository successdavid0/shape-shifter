"use client";

import { createContext, useContext } from "react";
import { useMintState, type MintState } from "@/lib/hooks/useMintState";

/**
 * Shares one mint state across the header connect button and the mint panel.
 *
 * SWAP POINT: this is where the real wallet stack mounts. Replace the mock with:
 *   <WagmiProvider config={config}><QueryClientProvider>
 *     <RainbowKitProvider>{children}</RainbowKitProvider>
 *   </QueryClientProvider></WagmiProvider>
 * and back useMint() with wagmi hooks. The consumers below don't change.
 */
const MintContext = createContext<MintState | null>(null);

export function MintProvider({ children }: { children: React.ReactNode }) {
  const state = useMintState();
  return <MintContext.Provider value={state}>{children}</MintContext.Provider>;
}

export function useMint(): MintState {
  const ctx = useContext(MintContext);
  if (!ctx) throw new Error("useMint must be used within <MintProvider>");
  return ctx;
}
