create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  learn_date date not null,
  category text not null,
  topic text not null,
  note text not null default '',
  completed jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.memories enable row level security;

create policy "Users can read their own memories"
on public.memories for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own memories"
on public.memories for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own memories"
on public.memories for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own memories"
on public.memories for delete
to authenticated
using (auth.uid() = user_id);

create index if not exists memories_user_learn_date_idx on public.memories (user_id, learn_date);
create index if not exists memories_user_created_at_idx on public.memories (user_id, created_at desc);
