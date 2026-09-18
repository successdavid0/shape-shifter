import { collection, isFill } from "@/lib/content";

/**
 * Chain / contract config. Everything is env-driven and degrades gracefully
 * while the collection is TBA (PRD §8). No secrets here — RPC URL and any
 * WalletConnect project id live in .env.local as NEXT_PUBLIC_* and are read
 * at the swap point, never committed.
 *
 * SWAP POINT (wire real reads): replace the mocked useMintState() with wagmi
 * v2 + viem (EVM) or @solana/wallet-adapter (Solana):
 *   1. Pick the connector(s) and chain from NEXT_PUBLIC_CHAIN_ID.
 *   2. useReadContract for totalMinted / maxSupply / price / phase.
 *   3. useWriteContract for mint(); surface the same MintState shape below.
 * The UI does not change — only the data source does.
 */
export const contract = {
  address: collection.contractAddress, // FILL / "TBA" until deployed
  chainName: collection.chain, // FILL until chosen
  hasAddress:
    !isFill(collection.contractAddress) &&
    (collection.contractAddress as string) !== "TBA",
} as const;

/** Minimal ERC-721A-style mint ABI (extend at the swap point). */
export const MINT_ABI = [
  { type: "function", name: "totalSupply", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
  { type: "function", name: "maxSupply", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
  { type: "function", name: "price", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
  {
    type: "function",
    name: "mint",
    stateMutability: "payable",
    inputs: [{ name: "quantity", type: "uint256" }],
    outputs: [],
  },
] as const;

/** Block-explorer link for an address or tx, when we know the base. */
export function explorerUrl(kind: "address" | "tx", value: string): string | null {
  if (isFill(collection.explorerBase)) return null;
  const base = collection.explorerBase.replace(/\/$/, "");
  return `${base}/${kind}/${value}`;
}

export function shortenAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
