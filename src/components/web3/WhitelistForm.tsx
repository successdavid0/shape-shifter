"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { whitelist } from "@/lib/content";
import { shortenAddress } from "@/lib/contract";

/**
 * Wallet-address capture for the Skinwalker Edition allowlist.
 *
 * Validates an EVM address (0x + 40 hex) or an ENS-style name, then records
 * the reservation. Today it persists to localStorage so the "already on the
 * list" state is real on return visits — nothing is charged and no wallet is
 * connected, matching the honest-placeholder ethos of the rest of the site.
 *
 * SWAP POINT: to persist reservations for real, POST the address to your
 * allowlist backend / form service. Set NEXT_PUBLIC_WHITELIST_ENDPOINT and the
 * submit() below will fire-and-forward there; the UI states don't change.
 */

const STORE_KEY = "skinwalker:whitelist";
const ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;
const ENS_RE = /^[a-z0-9-]+(\.[a-z0-9-]+)*\.eth$/i;

type Status = "idle" | "submitting" | "success" | "duplicate" | "invalid" | "error";

function normalize(raw: string): string {
  return raw.trim().toLowerCase();
}

function isValid(value: string): boolean {
  return ADDRESS_RE.test(value) || ENS_RE.test(value);
}

function readStore(): string[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

const ENDPOINT = process.env.NEXT_PUBLIC_WHITELIST_ENDPOINT;

export function WhitelistForm() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [saved, setSaved] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Re-focus the field when returning to the form after a success.
  useEffect(() => {
    if (status === "idle") inputRef.current?.focus();
  }, [status]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const entry = normalize(value);

    if (!isValid(entry)) {
      setStatus("invalid");
      return;
    }

    const existing = readStore();
    if (existing.includes(entry)) {
      setSaved(entry);
      setStatus("duplicate");
      return;
    }

    setStatus("submitting");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: entry }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      }
      localStorage.setItem(STORE_KEY, JSON.stringify([...existing, entry]));
      setSaved(entry);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValue("");
    setSaved("");
    setStatus("idle");
  }

  const done = status === "success" || status === "duplicate";
  const display = ADDRESS_RE.test(saved) ? shortenAddress(saved) : saved;

  if (done) {
    return (
      <div
        className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-line-strong bg-surface-2/70 p-6 text-center"
        role="status"
        aria-live="polite"
      >
        <Pill tone={status === "success" ? "live" : "accent"}>
          {status === "success" ? "Spot reserved ✓" : "Already reserved"}
        </Pill>
        <p className="text-ink-muted">
          {status === "success" ? whitelist.success : whitelist.duplicate}
        </p>
        {display && (
          <code className="break-all font-mono text-sm text-ink">{display}</code>
        )}
        <Button size="sm" variant="ghost" onClick={reset}>
          {whitelist.again}
        </Button>
      </div>
    );
  }

  const invalid = status === "invalid";

  return (
    <form
      onSubmit={submit}
      noValidate
      className="flex w-full max-w-md flex-col gap-3 rounded-xl border border-line-strong bg-surface-2/70 p-6"
    >
      <label
        htmlFor="whitelist-address"
        className="font-mono text-xs uppercase tracking-widest text-ink-muted"
      >
        Wallet address
      </label>
      <input
        ref={inputRef}
        id="whitelist-address"
        name="address"
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        placeholder={whitelist.placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (status !== "idle") setStatus("idle");
        }}
        aria-invalid={invalid || status === "error"}
        aria-describedby={invalid || status === "error" ? "whitelist-error" : "whitelist-note"}
        className="w-full rounded-sm border border-line-strong bg-surface px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-muted/60 focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-[invalid=true]:border-danger"
      />

      {(invalid || status === "error") && (
        <p id="whitelist-error" className="font-mono text-xs text-danger" role="alert">
          {invalid ? whitelist.invalid : whitelist.error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "submitting" || value.trim().length === 0}
      >
        {status === "submitting" ? whitelist.loading : whitelist.cta}
      </Button>

      <p id="whitelist-note" className="text-[0.7rem] leading-relaxed text-ink-muted/80">
        {whitelist.note}
      </p>
    </form>
  );
}
