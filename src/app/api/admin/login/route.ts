import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  ADMIN_MAX_AGE,
  isAdminConfigured,
  isValidPassword,
  sessionToken,
} from "@/lib/admin";

/**
 * POST /api/admin/login   — body { password } → sets the session cookie.
 * DELETE /api/admin/login — clears the session cookie (logout).
 *
 * The cookie is httpOnly + sameSite=lax + secure in production, so it can't be
 * read by client JS and isn't sent cross-site.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  if (!isAdminConfigured) {
    return Response.json(
      { ok: false, error: "Admin is not configured." },
      { status: 503 },
    );
  }

  let password: unknown;
  try {
    ({ password } = await request.json());
  } catch {
    return Response.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  if (typeof password !== "string" || !isValidPassword(password)) {
    return Response.json({ ok: false, error: "Wrong password." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_MAX_AGE,
  });

  return Response.json({ ok: true });
}

export async function DELETE(): Promise<Response> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  return Response.json({ ok: true });
}
