-- Profiles: what a member is open to besides mentoring. Forum: more post kinds and a cabinet-only pin.
-- Submissions: stories can be pitched through the form. Run after 010. Safe to re-run.

alter table public.profiles add column if not exists open_to text[] not null default '{}';
alter table public.profiles drop constraint if exists profiles_open_to_values;
alter table public.profiles add constraint profiles_open_to_values
  check (open_to <@ array['referrals','collaboration','talks','hiring']::text[]);

alter table public.posts drop constraint if exists posts_kind_check;
alter table public.posts add constraint posts_kind_check
  check (kind in ('question','data_request','discussion','job','academic','software'));
alter table public.posts add column if not exists pinned boolean not null default false; -- dashboard only
create index if not exists posts_pinned_idx on public.posts (pinned desc, created_at desc);

-- API callers cannot set pinned; the trigger from 003 already resets hidden, extend it for pinned.
create or replace function public.protect_forum_columns() returns trigger language plpgsql as $$
declare post_owner uuid;
begin
  if current_user not in ('anon', 'authenticated') then return new; end if;
  if tg_op = 'INSERT' then
    new.hidden := false;
    if tg_table_name = 'posts' then new.pinned := false; end if;
    if tg_table_name = 'replies' then new.accepted := false; end if;
    if (tg_table_name = 'posts'   and exists (select 1 from public.posts   where user_id = new.user_id and created_at > now() - interval '2 minutes'))
    or (tg_table_name = 'replies' and exists (select 1 from public.replies where user_id = new.user_id and created_at > now() - interval '20 seconds'))
    then raise exception 'Slow down a little before posting again.'; end if;
  else
    new.hidden := old.hidden; new.user_id := old.user_id; new.created_at := old.created_at;
    if tg_table_name = 'posts' then new.pinned := old.pinned; end if;
    if tg_table_name = 'replies' then
      new.post_id := old.post_id;
      select user_id into post_owner from public.posts where id = old.post_id;
      if auth.uid() <> old.user_id then new.body := old.body; end if;
      if auth.uid() <> post_owner  then new.accepted := old.accepted; end if;
    end if;
  end if;
  return new;
end $$;

alter table public.submissions drop constraint if exists submissions_kind_check;
alter table public.submissions add constraint submissions_kind_check
  check (kind in ('tool','dataset','opportunity','project','employer','mentorship','membership','story','other'));
