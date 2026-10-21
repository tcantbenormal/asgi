-- ASGI alumni profiles. Run once in the Supabase SQL editor.
-- Alumni sign in, write their own row, and the cabinet flips `approved` in the Table editor.

create table if not exists public.profiles (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null unique references auth.users (id) on delete cascade,
  slug          text generated always as (
                  lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || left(replace(user_id::text, '-', ''), 4)
                ) stored,
  name          text not null check (length(name) between 2 and 80),
  batch         text not null,                       -- "2021-25"
  degree        text not null,                       -- "BS Geoinformatics"
  role          text not null,
  organization  text not null,
  sector        text not null check (sector in ('Government','Private','NGO / UN','Academia','Freelance','Student')),
  city          text not null,
  country       text not null,
  lat           double precision not null check (lat between -90 and 90),
  lng           double precision not null check (lng between -180 and 180),
  linkedin      text,
  github        text,
  portfolio     text,
  email_public  text,
  photo_url     text,
  mentor        boolean not null default false,
  featured      boolean not null default false,      -- cabinet only
  skills        text[] not null default '{}',
  advice        text,
  bio           text,                                -- Markdown
  publications  jsonb not null default '[]',         -- [{title, venue, year, url}]
  approved      boolean not null default false,      -- cabinet only
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();

-- Row level security: public reads approved rows, owners read and write their own, nobody self-approves.
alter table public.profiles enable row level security;

drop policy if exists "public read approved" on public.profiles;
create policy "public read approved" on public.profiles for select using (approved or auth.uid() = user_id);

drop policy if exists "owner insert" on public.profiles;
create policy "owner insert" on public.profiles for insert with check (auth.uid() = user_id);

drop policy if exists "owner update" on public.profiles;
create policy "owner update" on public.profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant insert, update on public.profiles to authenticated;

-- Alumni cannot approve or feature themselves. Requests through the API run as `authenticated`;
-- the dashboard Table Editor runs as `postgres`, so cabinet edits pass through untouched.
create or replace function public.protect_admin_columns() returns trigger language plpgsql as $$
begin
  if current_user in ('anon', 'authenticated') then
    if tg_op = 'INSERT' then
      new.approved := false; new.featured := false;
    else
      new.approved := old.approved; new.featured := old.featured; new.user_id := old.user_id;
    end if;
  end if;
  return new;
end $$;
drop trigger if exists profiles_protect on public.profiles;
create trigger profiles_protect before insert or update on public.profiles for each row execute function public.protect_admin_columns();

-- Photos. Public bucket, each user writes only inside a folder named after their user id.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

drop policy if exists "avatars public read" on storage.objects;
create policy "avatars public read" on storage.objects for select using (bucket_id = 'avatars');

drop policy if exists "avatars owner write" on storage.objects;
create policy "avatars owner write" on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars owner update" on storage.objects;
create policy "avatars owner update" on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- Notify the cabinet when a profile is submitted: Database > Webhooks in the dashboard, or just watch the table.
