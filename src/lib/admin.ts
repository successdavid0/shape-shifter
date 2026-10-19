import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Minimal server-side gate for the /admin area.
 *
 * One shared password, set as ADMIN_PASSWORD (server-only, never NEXT_PUBLIC_).
 * On login we store a session cookie whose value is sha256(password) — so the
 * raw secret never lives in the browser — and every admin request re-derives
 * and timing-safe-compares that hash. No DB, no user table; enough to keep the
 * reservation list private for a solo operator.
 *
 * When ADMIN_PASSWORD is unset, isAdminConfigured is false and the admin page
 * shows a "not configured" notice instead of leaking an open door.
 */

const PASSWORD = process.env.ADMIN_PASSWORD;

export const isAdminConfigured = Boolean(PASSWORD);
export const ADMIN_COOKIE = "sw_admin";
/** Cookie lifetime: one week. */
export const ADMIN_MAX_AGE = 60 * 60 * 24 * 7;

/** The cookie value we set on login and expect back on each request. */
export function sessionToken(): string {
  return createHash("sha256").update(PASSWORD ?? "").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** True when the submitted password matches ADMIN_PASSWORD. */
export function isValidPassword(input: string): boolean {
  if (!isAdminConfigured) return false;
  return safeEqual(input, PASSWORD!);
}

/** True when a request's session cookie is the expected token. */
export function isValidSession(cookieValue: string | undefined): boolean {
  if (!isAdminConfigured || !cookieValue) return false;
  return safeEqual(cookieValue, sessionToken());
}
