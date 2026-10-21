-- Portfolio profile fields. Run after schema.sql. Safe to re-run.

alter table public.profiles
  add column if not exists username   text unique,
  add column if not exists province   text,
  add column if not exists orcid      text,
  add column if not exists cv_url     text,
  add column if not exists education  jsonb not null default '[]',   -- [{institution, degree, program, start, end}]
  add column if not exists experience jsonb not null default '[]',   -- [{title, organization, start, end, current, description}]
  add column if not exists projects   jsonb not null default '[]';   -- [{title, description, url, repo, tags}]

-- Username becomes the public URL: https://site/<username>. Lowercase, 3 to 30 chars, cannot shadow a site page.
alter table public.profiles drop constraint if exists profiles_username_format;
alter table public.profiles add constraint profiles_username_format check (
  username is null or (
    username ~ '^[a-z0-9][a-z0-9-]{2,29}$'
    and username not in ('alumni','map','stories','roadmaps','software','datasets','opportunities','projects','society',
                         'events','contact','privacy','legal','search','mentorship','download','resources','admin','api',
                         'img','models','pagefind','join','login','settings','about','blog','forum','institutions','u')
  )
);

-- CVs. Public bucket, PDF only, 5 MB, one folder per user.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cv', 'cv', true, 5242880, array['application/pdf'])
on conflict (id) do nothing;

drop policy if exists "cv public read" on storage.objects;
create policy "cv public read" on storage.objects for select using (bucket_id = 'cv');
drop policy if exists "cv owner write" on storage.objects;
create policy "cv owner write" on storage.objects for insert to authenticated
  with check (bucket_id = 'cv' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "cv owner update" on storage.objects;
create policy "cv owner update" on storage.objects for update to authenticated
  using (bucket_id = 'cv' and (storage.foldername(name))[1] = auth.uid()::text);
