import { createHash } from "node:crypto";

/**
 * Salted client-IP hashing for one-reservation-per-network enforcement.
 *
 * The /api/whitelist route stores a salted SHA-256 of the reserver's IP
 * (never the raw IP) alongside each reservation, then refuses a *different*
 * wallet that arrives from the same IP hash. This closes the gap the device
 * cookie can't — cleared cookies, incognito, a different browser — for a
 * visitor on the same network. See src/lib/device.ts for the cookie layer;
 * the two run together as defence in depth.
 *
 * Trade-off: visitors who genuinely share a public IP (an office, a campus,
 * mobile carrier CGNAT) can be blocked from a second legitimate reservation.
 * That is accepted here as the cost of a cheap, raw-IP-free deterrent.
 *
 * The salt is derived from an existing server-only secret so no extra env var
 * is required, but can be overridden with WHITELIST_IP_SALT. Because the value
 * is salted and one-way, the stored hash is not reversible to an IP.
 */

function salt(): string {
  const explicit = process.env.WHITELIST_IP_SALT;
  if (explicit) return explicit;
  const base =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ADMIN_PASSWORD ||
    "shapeshifter-dev-fallback-secret";
  return createHash("sha256").update(`ip:${base}`).digest("hex");
}

/**
 * Best-effort client IP from proxy headers, or null when none is present.
 *
 * Hosting edges (Vercel, etc.) set x-forwarded-for with the real client as the
 * leftmost entry; x-real-ip is a common fallback. The value is spoofable by a
 * determined client, which is why this is a deterrent, not a hard gate.
 */
export function clientIp(request: Request): string | null {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip")?.trim();
  return real || null;
}

/** Salted, one-way hash of an IP for storage, or null when the IP is absent. */
export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return createHash("sha256").update(`${salt()}:${ip}`).digest("hex");
}
