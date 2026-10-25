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
 * Reservations POST to NEXT_PUBLIC_WHITELIST_ENDPOINT, which defaults to the
 * built-in /api/whitelist route (Supabase-backed — see src/lib/supabase.ts and
 * supabase/schema.sql). When Supabase isn't configured the route answers 503
 * and we fall back to localStorage-only, so the UI behaves the same with or
 * without a backend. Point the env var elsewhere to use a different service.
 */

const STORE_KEY = "skinwalker:whitelist";
const ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;
const ENS_RE = /^[a-z0-9-]+(\.[a-z0-9-]+)*\.eth$/i;

type Status =
  | "idle"
  | "submitting"
  | "success"
  | "duplicate"
  | "deviceLimit"
  | "invalid"
  | "error";

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

const ENDPOINT = process.env.NEXT_PUBLIC_WHITELIST_ENDPOINT || "/api/whitelist";

export function WhitelistForm() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [saved, setSaved] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the field on mount and whenever we return to the editable state.
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
    // One reservation per device. A wallet already saved here (and the new one
    // differs) means this device has used its spot — block before the request.
    // The server enforces the same rule via a signed cookie (defence in depth).
    if (existing.length > 0) {
      setStatus("deviceLimit");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: entry }),
      });

      // 409 = this device already reserved a different wallet (server guard).
      if (res.status === 409) {
        setStatus("deviceLimit");
        return;
      }

      // 503 = backend not configured yet → fall back to localStorage-only.
      // Any other non-2xx is a real failure.
      if (!res.ok && res.status !== 503) {
        if (res.status === 400) {
          setStatus("invalid");
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }

      const data: { duplicate?: boolean } = res.ok
        ? await res.json().catch(() => ({}))
        : {};

      localStorage.setItem(STORE_KEY, JSON.stringify([...existing, entry]));
      setSaved(entry);
      setStatus(data.duplicate ? "duplicate" : "success");
    } catch {
      setStatus("error");
    }
  }

  const done =
    status === "success" || status === "duplicate" || status === "deviceLimit";
  const display = ADDRESS_RE.test(saved) ? shortenAddress(saved) : saved;

  if (done) {
    const isSuccess = status === "success";
    const isLimit = status === "deviceLimit";
    return (
      <div
        className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-line-strong bg-surface-2/70 p-6 text-center"
        role="status"
        aria-live="polite"
      >
        <Pill tone={isSuccess ? "live" : "accent"}>
          {isSuccess ? "Spot reserved ✓" : isLimit ? "One per device" : "Already reserved"}
        </Pill>
        <p className="text-ink-muted">
          {isSuccess ? whitelist.success : isLimit ? whitelist.deviceLimit : whitelist.duplicate}
        </p>
        {display && !isLimit && (
          <code className="break-all font-mono text-sm text-ink">{display}</code>
        )}
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
