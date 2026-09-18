"use client";

import { useCallback, useRef, useState } from "react";

/**
 * MOCKED mint state machine (PRD §8, contract TBA path). Returns the same
 * shape a wagmi/viem implementation would, so the UI never changes at the
 * swap point — only this file's internals do.
 *
 * SWAP POINT: replace the mock transitions with:
 *   - useAccount()/useConnect()/useSwitchChain() for connection + network
 *   - useReadContract() for phase / minted / supply / price
 *   - useWriteContract()+useWaitForTransactionReceipt() for mint() → tx status
 */

export type Connection = "disconnected" | "wrong_network" | "connected";
export type SalePhase = "not_started" | "allowlist" | "public" | "sold_out";
export type TxStatus = "idle" | "pending" | "success" | "rejected" | "failed";

export interface MintState {
  connection: Connection;
  account?: string;
  phase: SalePhase;
  userMinted: number;
  maxPerWallet: number;
  tx: { status: TxStatus; hash?: string; error?: string };
  connect: () => void;
  disconnect: () => void;
  switchNetwork: () => void;
  mint: () => void;
  reset: () => void;
}

const MOCK_ACCOUNT = "0x5Ac1…mockedWallet…9f3B";

export function useMintState(): MintState {
  const [connection, setConnection] = useState<Connection>("disconnected");
  const [account, setAccount] = useState<string | undefined>();
  const [phase] = useState<SalePhase>("not_started"); // real hook reads chain
  const [userMinted, setUserMinted] = useState(0);
  const [tx, setTx] = useState<MintState["tx"]>({ status: "idle" });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connect = useCallback(() => {
    setConnection("connected");
    setAccount(MOCK_ACCOUNT);
  }, []);

  const disconnect = useCallback(() => {
    setConnection("disconnected");
    setAccount(undefined);
    setTx({ status: "idle" });
  }, []);

  const switchNetwork = useCallback(() => setConnection("connected"), []);

  const reset = useCallback(() => setTx({ status: "idle" }), []);

  const mint = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setTx({ status: "pending" });
    // simulate wallet signature + confirmation
    timer.current = setTimeout(() => {
      setTx({ status: "success", hash: "0xabc…mockTx…def" });
      setUserMinted((n) => n + 1);
    }, 1800);
  }, []);

  return {
    connection,
    account,
    phase,
    userMinted,
    maxPerWallet: 2,
    tx,
    connect,
    disconnect,
    switchNetwork,
    mint,
    reset,
  };
}
