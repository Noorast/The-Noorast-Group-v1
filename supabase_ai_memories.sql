-- ─────────────────────────────────────────────────────────────────────────────
-- NOORAST AI MEMORY — Supabase SQL
-- Run this in the Supabase SQL editor at:
-- https://supabase.com/dashboard/project/wpquefptjpunodnrjymn/sql/new
-- ─────────────────────────────────────────────────────────────────────────────

-- AI conversation memories table
-- Stores summaries of past sessions so the AI has cross-session context
create table if not exists ai_memories (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references auth.users not null,
  summary           text not null,
  keywords          text[] default '{}',
  message_count     int default 0,
  property_context  text,
  created_at        timestamptz default now()
);

-- Index for fast user lookup (most common query pattern)
create index if not exists ai_memories_user_id_idx
  on ai_memories (user_id, created_at desc);

-- Row level security — users can only see their own memories
alter table ai_memories enable row level security;

create policy "Users can read own memories"
  on ai_memories for select
  using (auth.uid() = user_id);

create policy "Users can insert own memories"
  on ai_memories for insert
  with check (auth.uid() = user_id);

-- Auto-cleanup: keep only the 20 most recent memories per user
-- Run this as a scheduled function or manually if memories grow large
-- (Optional — uncomment to enable)
-- create or replace function cleanup_old_memories()
-- returns void language plpgsql as $$
-- begin
--   delete from ai_memories
--   where id not in (
--     select id from ai_memories
--     where user_id = ai_memories.user_id
--     order by created_at desc
--     limit 20
--   );
-- end;
-- $$;

-- ─────────────────────────────────────────────────────────────────────────────
-- VERIFY: Check the table was created
-- ─────────────────────────────────────────────────────────────────────────────
-- select * from ai_memories limit 5;
