import { getSupabase, isSupabaseConfigured, WHITELIST_TABLE } from "@/lib/supabase";

/**
 * POST /api/whitelist — record a Skinwalker Edition allowlist reservation.
 *
 * Body: { "address": "0x…" | "name.eth" }
 * The WhitelistForm POSTs here by default (NEXT_PUBLIC_WHITELIST_ENDPOINT).
 *
 * Returns:
 *   201 { ok: true, duplicate: false } — reserved
 *   200 { ok: true, duplicate: true }  — already on the list
 *   400 { ok: false, error }           — bad / invalid address
 *   503 { ok: false, error }           — Supabase not configured yet
 *   500 { ok: false, error }           — write failed
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

  const supabase = getSupabase()!;
  const { error } = await supabase
    .from(WHITELIST_TABLE)
    .insert({ address: entry });

  if (error) {
    // 23505 = unique_violation → already reserved, treat as success.
    if (error.code === "23505") {
      return json({ ok: true, duplicate: true }, 200);
    }
    console.error("[whitelist] insert failed:", error.message);
    return json({ ok: false, error: "Could not save reservation." }, 500);
  }

  return json({ ok: true, duplicate: false }, 201);
}
