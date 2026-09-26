/** Canonical site URL — env-driven, safe default until the domain is set. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://shapeshifters.example"
).replace(/\/$/, "");
