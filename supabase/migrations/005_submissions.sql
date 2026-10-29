-- Suggestions from the public: a tool, a dataset, an opportunity, a project. Run after 004. Safe to re-run.
-- Insert-only from the site; read and triage in the Supabase dashboard (Table editor > submissions).

-- /submit is a page now; keep it out of the username space.
alter table public.profiles drop constraint if exists profiles_username_format;
alter table public.profiles add constraint profiles_username_format check (
  username is null or (
    username ~ '^[a-z0-9][a-z0-9-]{2,29}$'
    and username not in ('alumni','map','stories','roadmaps','software','datasets','opportunities','projects','society',
                         'events','contact','privacy','legal','search','mentorship','download','resources','admin','api',
                         'img','models','pagefind','join','login','settings','about','blog','forum','institutions','u',
                         'account','profile','signin','signout','auth','members','student','students','sw','submit')
  )
);

create table if not exists public.submissions (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null check (kind in ('tool','dataset','opportunity','project','other')),
  title       text not null check (length(title) between 3 and 160),
  url         text check (url is null or url ~ '^https?://'),
  body        text not null check (length(body) between 10 and 5000),
  name        text check (length(name) <= 120),
  email       text check (length(email) <= 200),
  user_id     uuid references auth.users(id) on delete set null,
  status      text not null default 'new' check (status in ('new','accepted','rejected')),
  created_at  timestamptz not null default now()
);
create index if not exists submissions_created_idx on public.submissions (created_at desc);

alter table public.submissions enable row level security;
grant insert on public.submissions to anon, authenticated;   -- no select: nobody reads these through the API

drop policy if exists "submissions insert" on public.submissions;
create policy "submissions insert" on public.submissions for insert to anon, authenticated
  with check (user_id is null or user_id = auth.uid());

-- Site callers cannot set status, and one email or account may submit at most once a minute.
create or replace function public.protect_submissions() returns trigger language plpgsql security definer as $$
begin
  if current_user not in ('anon', 'authenticated') then return new; end if;
  new.status := 'new';
  if exists (select 1 from public.submissions
             where created_at > now() - interval '1 minute'
               and ((new.user_id is not null and user_id = new.user_id) or (new.email is not null and email = new.email)))
  then raise exception 'Please wait a minute before submitting again.'; end if;
  return new;
end $$;
drop trigger if exists protect_submissions on public.submissions;
create trigger protect_submissions before insert on public.submissions for each row execute function public.protect_submissions();
