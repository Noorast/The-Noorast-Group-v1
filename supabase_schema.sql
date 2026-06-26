-- ─────────────────────────────────────────────────────────────────────────────
-- NOORAST — SUPABASE SCHEMA
-- Run this entire file in the Supabase SQL editor:
-- https://supabase.com/dashboard/project/wpquefptjpunodnrjymn/sql/new
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. PROFILES ──────────────────────────────────────────────────────────────
-- One row per user. Created automatically on sign-up via trigger below.

create table if not exists profiles (
  id                   uuid references auth.users primary key,
  email                text,
  full_name            text,
  project_description  text,
  is_admin             boolean not null default false,
  subscription_status  text not null default 'free'
                         check (subscription_status in ('free', 'active', 'cancelled', 'past_due')),
  stripe_customer_id   text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- RLS: users can only see and update their own row
alter table profiles enable row level security;

create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Admins can read ALL profiles (needed for admin tooling)
create policy "Admins can read all profiles"
  on profiles for select
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid() and p.is_admin = true
    )
  );


-- ── 2. AUTO-CREATE PROFILE ON SIGN-UP ────────────────────────────────────────

create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, email, created_at, updated_at)
  values (new.id, new.email, now(), now())
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();


-- ── 3. AI MEMORIES ───────────────────────────────────────────────────────────

create table if not exists ai_memories (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references auth.users not null,
  summary           text not null,
  keywords          text[] default '{}',
  message_count     int default 0,
  property_context  text,
  created_at        timestamptz default now()
);

create index if not exists ai_memories_user_id_idx
  on ai_memories (user_id, created_at desc);

alter table ai_memories enable row level security;

create policy "Users can read own memories"
  on ai_memories for select
  using (auth.uid() = user_id);

create policy "Users can insert own memories"
  on ai_memories for insert
  with check (auth.uid() = user_id);


-- ── 4. PASSPORTS ─────────────────────────────────────────────────────────────

create table if not exists passports (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users not null unique,
  section_data  jsonb default '{}',
  checklist_data jsonb default '{}',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table passports enable row level security;

create policy "Users can manage own passport"
  on passports for all
  using (auth.uid() = user_id);


-- ── 5. CONVERSATIONS ─────────────────────────────────────────────────────────

create table if not exists conversations (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users not null unique,
  messages    jsonb default '[]',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table conversations enable row level security;

create policy "Users can manage own conversations"
  on conversations for all
  using (auth.uid() = user_id);


-- ─────────────────────────────────────────────────────────────────────────────
-- PROMOTE AN EMAIL TO ADMIN
-- Run this AFTER the user has signed up (their row must exist in auth.users).
-- Replace the email address below with your own.
-- ─────────────────────────────────────────────────────────────────────────────

-- update profiles
--   set is_admin = true
-- where email = 'YOUR_EMAIL_HERE@example.com';


-- ─────────────────────────────────────────────────────────────────────────────
-- VERIFY
-- ─────────────────────────────────────────────────────────────────────────────

-- select id, email, is_admin, subscription_status, created_at
-- from profiles
-- order by created_at desc
-- limit 20;
