import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * One-reservation-per-device enforcement.
 *
 * When a wallet is reserved we set an httpOnly, HMAC-signed cookie that records
 * which wallet this device already reserved. The /api/whitelist route reads it
 * back and refuses a *different* wallet from the same device, while still
 * recognising the *same* wallet as a friendly "already reserved".
 *
 * The cookie is signed so a visitor can't hand-edit it to impersonate another
 * reservation; it's httpOnly so page scripts can't read or tamper with it. This
 * stops casual multi-entry (refresh, new tab, same browser). It does not stop a
 * determined user who clears cookies / uses incognito / switches browsers —
 * that needs IP-hashing or fingerprinting (see route notes).
 *
 * The signing secret is derived from an existing server-only secret so no extra
 * env var is required, but can be overridden with WHITELIST_COOKIE_SECRET.
 */

export const DEVICE_COOKIE = "sw_wl_device";
/** One year — the device is remembered for the whole pre-mint window. */
export const DEVICE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function secret(): string {
  const explicit = process.env.WHITELIST_COOKIE_SECRET;
  if (explicit) return explicit;
  // Derive a stable, server-only secret from credentials that already exist.
  const base =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ADMIN_PASSWORD ||
    "shapeshifter-dev-fallback-secret";
  return createHash("sha256").update(base).digest("hex");
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Build the cookie value that records the wallet reserved on this device. */
export function signDevice(address: string): string {
  const payload = Buffer.from(address, "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** Return the wallet recorded in a device cookie, or null if absent/tampered. */
export function readDevice(cookieValue: string | undefined): string | null {
  if (!cookieValue) return null;
  const dot = cookieValue.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = cookieValue.slice(0, dot);
  const sig = cookieValue.slice(dot + 1);
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return Buffer.from(payload, "base64url").toString("utf8");
  } catch {
    return null;
  }
}
