-- SHAPESHIFTERS — Skinwalker Edition allowlist storage.
--
-- Run this once in your Supabase project: Dashboard → SQL Editor → paste → Run.
-- Then set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
-- (Project Settings → API). The /api/whitelist route writes here.

create table if not exists public.whitelist_reservations (
  id          uuid primary key default gen_random_uuid(),
  address     text not null,
  created_at  timestamptz not null default now()
);

-- Case-insensitive uniqueness: the route lowercases before insert, so a plain
-- unique constraint on the stored (already-lowercased) value is enough. A
-- duplicate insert raises SQLSTATE 23505, which the route maps to "already
-- reserved" rather than an error.
create unique index if not exists whitelist_reservations_address_key
  on public.whitelist_reservations (address);

-- Row Level Security: lock the table down. The app writes only through the
-- server route using the service_role key, which bypasses RLS. With RLS on and
-- no permissive policies, the public/anon key cannot read or write directly.
alter table public.whitelist_reservations enable row level security;
