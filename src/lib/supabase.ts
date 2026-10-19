import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client for whitelist persistence.
 *
 * Reads credentials from the environment and is created lazily so the app
 * still builds and runs with the feature switched off (no Supabase project
 * yet). When unconfigured, getSupabase() returns null and callers fall back
 * to their no-backend behaviour — matching the honest-placeholder ethos.
 *
 * Uses the SERVICE ROLE key, so this module must never be imported into a
 * client component. It is only used from the /api/whitelist route handler,
 * which runs on the server. The service key bypasses Row Level Security, so
 * all writes go through that validated route — never straight from the browser.
 *
 * Required env (set in .env.local, see .env.example):
 *   SUPABASE_URL              — project URL, e.g. https://xxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY — service_role secret (server-only, never NEXT_PUBLIC_)
 */

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True when both Supabase env vars are present. */
export const isSupabaseConfigured = Boolean(url && serviceKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(url!, serviceKey!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

/** Table that stores reserved allowlist entries. See supabase/schema.sql. */
export const WHITELIST_TABLE = "whitelist_reservations";
