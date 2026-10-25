import { cookies } from "next/headers";
import { getSupabase, isSupabaseConfigured, WHITELIST_TABLE } from "@/lib/supabase";
import {
  DEVICE_COOKIE,
  DEVICE_COOKIE_MAX_AGE,
  readDevice,
  signDevice,
} from "@/lib/device";

/**
 * POST /api/whitelist — record a Skinwalker Edition allowlist reservation.
 *
 * Body: { "address": "0x…" | "name.eth" }
 * The WhitelistForm POSTs here by default (NEXT_PUBLIC_WHITELIST_ENDPOINT).
 *
 * One reservation per device: on success we set a signed, httpOnly cookie that
 * remembers the reserved wallet (see src/lib/device.ts). A later attempt to
 * reserve a *different* wallet from the same device is refused (409); the same
 * wallet is still recognised as a friendly duplicate.
 *
 * Returns:
 *   201 { ok: true, duplicate: false }          — reserved
 *   200 { ok: true, duplicate: true }           — already on the list
 *   400 { ok: false, error }                    — bad / invalid address
 *   409 { ok: false, code: "device_limit", … }  — this device already reserved
 *   503 { ok: false, error }                    — Supabase not configured yet
 *   500 { ok: false, error }                    — write failed
 *
 * Validation is re-run server-side: never trust the client. Addresses are
 * normalised to lowercase so the uniqueness check is case-insensitive.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;
const ENS_RE = /^[a-z0-9-]+(\.[a-z0-9-]+)*\.eth$/i;

function isValid(value: string): boolean {
  return ADDRESS_RE.test(value) || ENS_RE.test(value);
}

function json(body: unknown, status: number): Response {
  return Response.json(body, { status });
}

export async function POST(request: Request): Promise<Response> {
  if (!isSupabaseConfigured) {
    return json(
      { ok: false, error: "Allowlist backend is not configured." },
      503,
    );
  }

  let address: unknown;
  try {
    ({ address } = await request.json());
  } catch {
    return json({ ok: false, error: "Invalid JSON body." }, 400);
  }

  if (typeof address !== "string") {
    return json({ ok: false, error: "Missing address." }, 400);
  }

  const entry = address.trim().toLowerCase();
  if (!isValid(entry)) {
    return json({ ok: false, error: "Not a valid wallet address or ENS name." }, 400);
  }

  // One reservation per device: refuse a different wallet from the same device.
  const cookieStore = await cookies();
  const reservedHere = readDevice(cookieStore.get(DEVICE_COOKIE)?.value);
  if (reservedHere && reservedHere !== entry) {
    return json(
      {
        ok: false,
        code: "device_limit",
        error: "This device has already reserved a spot. Only one wallet per device.",
      },
      409,
    );
  }

  const supabase = getSupabase()!;
  const { error } = await supabase
    .from(WHITELIST_TABLE)
    .insert({ address: entry });

  const duplicate = error?.code === "23505"; // unique_violation → already on list
  if (error && !duplicate) {
    console.error("[whitelist] insert failed:", error.message);
    return json({ ok: false, error: "Could not save reservation." }, 500);
  }

  // Remember this device so it can't reserve another wallet. Set on both a
  // fresh reservation and a same-wallet duplicate (e.g. a device with no cookie
  // yet re-submitting a wallet that's already on the list).
  cookieStore.set(DEVICE_COOKIE, signDevice(entry), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: DEVICE_COOKIE_MAX_AGE,
  });

  return json({ ok: true, duplicate }, duplicate ? 200 : 201);
}
