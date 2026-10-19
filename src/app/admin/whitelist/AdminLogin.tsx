"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/** Clears the admin session cookie and reloads to the gate. */
export function LogoutButton() {
  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.reload();
  }
  return (
    <Button size="sm" variant="ghost" onClick={logout}>
      Log out
    </Button>
  );
}

/**
 * Password gate for the admin whitelist view. On success the server sets an
 * httpOnly cookie and we reload so the server component re-renders the list.
 */
export function AdminLogin({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const data: { error?: string } = await res.json().catch(() => ({}));
      setError(data.error ?? "Login failed.");
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <h1 className="mb-2 font-display text-2xl font-bold uppercase tracking-wide text-ink">
        Admin
      </h1>
      {!configured ? (
        <p className="text-sm text-ink-muted">
          Admin is not configured. Set{" "}
          <code className="font-mono text-ink">ADMIN_PASSWORD</code> in your
          environment and redeploy.
        </p>
      ) : (
        <form
          onSubmit={submit}
          className="flex flex-col gap-3 rounded-xl border border-line-strong bg-surface-2/70 p-6"
        >
          <label
            htmlFor="admin-password"
            className="font-mono text-xs uppercase tracking-widest text-ink-muted"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(error)}
            className="w-full rounded-sm border border-line-strong bg-surface px-4 py-3 font-mono text-sm text-ink focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-[invalid=true]:border-danger"
          />
          {error && (
            <p className="font-mono text-xs text-danger" role="alert">
              {error}
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading || password.length === 0}
          >
            {loading ? "Checking…" : "Enter"}
          </Button>
        </form>
      )}
    </main>
  );
}
