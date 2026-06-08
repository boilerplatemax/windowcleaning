-- Wise Guys Windows — Supabase schema for quote leads (CRM).
-- Run this in the Supabase SQL editor.

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- contact (CRM)
  name text not null,
  phone text not null,
  email text,
  notes text,

  -- property
  address text,
  property_type text,
  floors text,
  home_size text,
  large_windows text,
  cleaning text,

  -- add-ons
  addon_screens boolean default false,
  addon_tracks boolean default false,
  addon_skylights boolean default false,
  window_count integer,
  photo_count integer default 0,

  -- pricing
  price_low integer,
  price_high integer,
  price_mid integer,
  confidence text,

  -- full snapshot of the wizard input
  raw_input jsonb
);

-- Helpful index for the CRM view (newest first).
create index if not exists quotes_created_at_idx on public.quotes (created_at desc);

-- Row level security: lock the table down. The server inserts using the
-- service-role key, which bypasses RLS, so no public policies are needed.
alter table public.quotes enable row level security;
