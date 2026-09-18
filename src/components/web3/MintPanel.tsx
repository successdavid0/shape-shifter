"use client";

import { collection, isFill } from "@/lib/content";
import { useMint } from "./MintProvider";
import { MintView, type MintViewKind } from "./MintView";

/**
 * Live mint interface. Derives the visible state from useMintState() (mocked
 * while the contract is TBA). Numbers/price stay TBA on the live page — we
 * never invent facts; only the interaction states are real.
 */
export function MintPanel() {
  const s = useMint();

  const price = isFill(collection.mintPrice) ? undefined : collection.mintPrice;
  const mintDateUtc = isFill(collection.mintDateUtc) ? undefined : collection.mintDateUtc;

  let kind: MintViewKind;
  if (s.tx.status === "pending") kind = "tx_pending";
  else if (s.tx.status === "success") kind = "tx_success";
  else if (s.tx.status === "rejected") kind = "tx_rejected";
  else if (s.tx.status === "failed") kind = "tx_failed";
  else if (s.connection === "disconnected") kind = "disconnected";
  else if (s.connection === "wrong_network") kind = "wrong_network";
  else if (s.userMinted >= s.maxPerWallet) kind = "max_minted";
  else if (s.phase === "sold_out") kind = "sold_out";
  else if (s.phase === "not_started") kind = "not_started";
  else if (s.phase === "allowlist") kind = "allowlist";
  else kind = "public";

  return (
    <MintView
      kind={kind}
      account={s.account}
      price={price}
      mintDateUtc={mintDateUtc}
      txHash={s.tx.hash}
      error={s.tx.error}
      onConnect={s.connect}
      onSwitch={s.switchNetwork}
      onMint={s.mint}
      onReset={s.reset}
      onDisconnect={s.disconnect}
    />
  );
}
