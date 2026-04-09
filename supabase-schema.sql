-- ═══════════════════════════════════════════
-- ECV Platform — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── USERS ──────────────────────────────────
create table if not exists public.users (
  id               uuid primary key default uuid_generate_v4(),
  email            text unique not null,
  name             text,
  membership_tier  text not null default 'free' check (membership_tier in ('free','member','signature')),
  stripe_customer_id text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ── REQUESTS ───────────────────────────────
create table if not exists public.requests (
  id           uuid primary key default uuid_generate_v4(),
  chapter_id   text not null,
  user_id      uuid references public.users(id),
  user_name    text,
  user_email   text,
  months       text[],
  guests       text,
  hotel        text,
  dates        text,
  intention    text,
  notes        text,
  status       text not null default 'pending' check (status in ('pending','confirmed','completed','cancelled')),
  created_at   timestamptz not null default now()
);

-- ── MEMOIRS ────────────────────────────────
create table if not exists public.memoirs (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references public.users(id),
  chapter_id   text not null,
  title        text,
  before_text  text,
  after_text   text,
  with_whom    text,
  photo_url    text,
  visibility   text not null default 'private' check (visibility in ('private','shared','gifted')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── GIFTS ──────────────────────────────────
create table if not exists public.gifts (
  id               uuid primary key default uuid_generate_v4(),
  from_user_id     uuid references public.users(id),
  from_name        text,
  from_email       text,
  chapter_id       text not null,
  recipient_name   text not null,
  recipient_email  text not null,
  message          text,
  gift_code        text unique not null default upper(substr(md5(random()::text), 1, 10)),
  redeemed_at      timestamptz,
  created_at       timestamptz not null default now()
);

-- ── HOST APPLICATIONS ──────────────────────
create table if not exists public.host_applications (
  id           uuid primary key default uuid_generate_v4(),
  category     text,
  description  text,
  contact_name text,
  contact_email text,
  status       text not null default 'received' check (status in ('received','in_review','approved','declined')),
  created_at   timestamptz not null default now()
);

-- ── ROW LEVEL SECURITY ─────────────────────
alter table public.requests         enable row level security;
alter table public.memoirs          enable row level security;
alter table public.gifts            enable row level security;
alter table public.host_applications enable row level security;

-- Requests: anyone can insert (guest request), only owner can read own
create policy "Anyone can create request" on public.requests for insert with check (true);
create policy "Owner can read own requests" on public.requests for select using (user_id = auth.uid());

-- Memoirs: owner only
create policy "Owner can manage memoirs" on public.memoirs using (user_id = auth.uid());
create policy "Anyone can insert memoir" on public.memoirs for insert with check (true);

-- Gifts: anyone can insert
create policy "Anyone can send gift" on public.gifts for insert with check (true);

-- Host applications: anyone can insert
create policy "Anyone can apply as host" on public.host_applications for insert with check (true);

-- ── INDEXES ────────────────────────────────
create index if not exists idx_requests_chapter   on public.requests(chapter_id);
create index if not exists idx_requests_email     on public.requests(user_email);
create index if not exists idx_memoirs_user       on public.memoirs(user_id);
create index if not exists idx_gifts_code         on public.gifts(gift_code);
create index if not exists idx_gifts_recipient    on public.gifts(recipient_email);
