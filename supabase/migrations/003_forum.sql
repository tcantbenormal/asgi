-- Community forum: questions, data requests, discussions. Run after 002. Safe to re-run.

create table if not exists public.posts (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  kind       text not null check (kind in ('question','data_request','discussion')),
  title      text not null check (length(title) between 5 and 160),
  body       text not null check (length(body) between 10 and 10000),
  tags       text[] not null default '{}' check (cardinality(tags) <= 5),
  hidden     boolean not null default false,          -- moderation, dashboard only
  created_at timestamptz not null default now()
);
create table if not exists public.replies (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references public.posts(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  body       text not null check (length(body) between 2 and 10000),
  accepted   boolean not null default false,          -- set by the post author
  hidden     boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists posts_created_idx on public.posts (created_at desc);
create index if not exists replies_post_idx  on public.replies (post_id, created_at);

alter table public.posts   enable row level security;
alter table public.replies enable row level security;
grant select on public.posts, public.replies to anon, authenticated;
grant insert, update, delete on public.posts, public.replies to authenticated;

drop policy if exists "posts read"   on public.posts;
drop policy if exists "posts insert" on public.posts;
drop policy if exists "posts update" on public.posts;
drop policy if exists "posts delete" on public.posts;
create policy "posts read"   on public.posts for select using (not hidden or auth.uid() = user_id);
create policy "posts insert" on public.posts for insert to authenticated with check (auth.uid() = user_id);
create policy "posts update" on public.posts for update to authenticated using (auth.uid() = user_id);
create policy "posts delete" on public.posts for delete to authenticated using (auth.uid() = user_id);

drop policy if exists "replies read"   on public.replies;
drop policy if exists "replies insert" on public.replies;
drop policy if exists "replies update" on public.replies;
drop policy if exists "replies delete" on public.replies;
create policy "replies read"   on public.replies for select using (not hidden or auth.uid() = user_id);
create policy "replies insert" on public.replies for insert to authenticated
  with check (auth.uid() = user_id and exists (select 1 from public.posts p where p.id = post_id and not p.hidden));
-- The reply author edits their text; the post author may only toggle "accepted" (enforced in the trigger below).
create policy "replies update" on public.replies for update to authenticated
  using (auth.uid() = user_id or auth.uid() = (select user_id from public.posts p where p.id = post_id));
create policy "replies delete" on public.replies for delete to authenticated using (auth.uid() = user_id);

-- API callers can never set moderation columns, change ownership, or post faster than a human.
create or replace function public.protect_forum_columns() returns trigger language plpgsql as $$
declare post_owner uuid;
begin
  if current_user not in ('anon', 'authenticated') then return new; end if;
  if tg_op = 'INSERT' then
    new.hidden := false;
    if tg_table_name = 'replies' then new.accepted := false; end if;
    if (tg_table_name = 'posts'   and exists (select 1 from public.posts   where user_id = new.user_id and created_at > now() - interval '2 minutes'))
    or (tg_table_name = 'replies' and exists (select 1 from public.replies where user_id = new.user_id and created_at > now() - interval '20 seconds'))
    then raise exception 'Slow down a little before posting again.'; end if;
  else
    new.hidden := old.hidden; new.user_id := old.user_id; new.created_at := old.created_at;
    if tg_table_name = 'replies' then
      new.post_id := old.post_id;
      select user_id into post_owner from public.posts where id = old.post_id;
      if auth.uid() <> old.user_id then new.body := old.body; end if;          -- post author: accepted only
      if auth.uid() <> post_owner  then new.accepted := old.accepted; end if;  -- reply author: body only
    end if;
  end if;
  return new;
end $$;
drop trigger if exists posts_protect   on public.posts;
drop trigger if exists replies_protect on public.replies;
create trigger posts_protect   before insert or update on public.posts   for each row execute function public.protect_forum_columns();
create trigger replies_protect before insert or update on public.replies for each row execute function public.protect_forum_columns();
