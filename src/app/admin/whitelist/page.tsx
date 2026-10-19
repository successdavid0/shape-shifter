import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminConfigured, isValidSession } from "@/lib/admin";
import {
  getSupabase,
  isSupabaseConfigured,
  WHITELIST_TABLE,
} from "@/lib/supabase";
import { shortenAddress } from "@/lib/contract";
import { AdminLogin, LogoutButton } from "./AdminLogin";

/**
 * /admin/whitelist — private list of Skinwalker Edition reservations.
 *
 * Server component: reads the session cookie, and only on a valid session
 * queries Supabase (service_role, server-side). Gated behind ADMIN_PASSWORD
 * and excluded from robots; always rendered dynamically so the list is fresh.
 */

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Admin — Reservations",
  robots: { index: false, follow: false },
};

type Reservation = { address: string; created_at: string };

export default async function AdminWhitelistPage() {
  const cookieStore = await cookies();
  const authed = isValidSession(cookieStore.get(ADMIN_COOKIE)?.value);

  if (!authed) return <AdminLogin configured={isAdminConfigured} />;

  const supabase = getSupabase();
  let rows: Reservation[] = [];
  let error: string | null = null;

  if (!isSupabaseConfigured || !supabase) {
    error =
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.";
  } else {
    const { data, error: dbError } = await supabase
      .from(WHITELIST_TABLE)
      .select("address, created_at")
      .order("created_at", { ascending: false });
    if (dbError) error = dbError.message;
    else rows = (data as Reservation[]) ?? [];
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-ink">
            Reservations
          </h1>
          <p className="mt-1 font-mono text-sm text-ink-muted">
            {error ? "—" : `${rows.length} wallet${rows.length === 1 ? "" : "s"} on the allowlist`}
          </p>
        </div>
        <LogoutButton />
      </header>

      {error ? (
        <p className="rounded-xl border border-danger/40 bg-surface-2/70 p-6 font-mono text-sm text-danger">
          {error}
        </p>
      ) : rows.length === 0 ? (
        <p className="rounded-xl border border-line-strong bg-surface-2/70 p-6 text-ink-muted">
          No reservations yet.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-line-strong">
          <table className="w-full border-collapse text-left font-mono text-sm">
            <thead>
              <tr className="border-b border-line-strong bg-surface-2/70 text-xs uppercase tracking-widest text-ink-muted">
                <th className="px-4 py-3 font-normal">#</th>
                <th className="px-4 py-3 font-normal">Address</th>
                <th className="px-4 py-3 font-normal">Reserved</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.address}
                  className="border-b border-line last:border-0 hover:bg-surface-2/40"
                >
                  <td className="px-4 py-3 text-ink-muted">{rows.length - i}</td>
                  <td className="px-4 py-3 text-ink" title={r.address}>
                    <span className="hidden sm:inline">{r.address}</span>
                    <span className="sm:hidden">{shortenAddress(r.address)}</span>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {new Date(r.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
