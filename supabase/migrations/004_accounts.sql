-- Account management. Run after 003. Safe to re-run.

-- New top-level pages must not be shadowed by a username.
alter table public.profiles drop constraint if exists profiles_username_format;
alter table public.profiles add constraint profiles_username_format check (
  username is null or (
    username ~ '^[a-z0-9][a-z0-9-]{2,29}$'
    and username not in ('alumni','map','stories','roadmaps','software','datasets','opportunities','projects','society',
                         'events','contact','privacy','legal','search','mentorship','download','resources','admin','api',
                         'img','models','pagefind','join','login','settings','about','blog','forum','institutions','u',
                         'account','profile','signin','signout','auth','members','student','students','sw')
  )
);

-- Members may remove their own uploads (needed for account deletion and for replacing files).
drop policy if exists "avatars owner delete" on storage.objects;
create policy "avatars owner delete" on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "cv owner delete" on storage.objects;
create policy "cv owner delete" on storage.objects for delete to authenticated
  using (bucket_id = 'cv' and (storage.foldername(name))[1] = auth.uid()::text);

-- Self-service deletion. Removes uploads, then the auth user; profile, posts and replies cascade.
create or replace function public.delete_my_account() returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Not signed in.'; end if;
  -- superseded by 009: storage rows are removed by the browser now
  -- delete from storage.objects where bucket_id in ('avatars', 'cv') and (storage.foldername(name))[1] = auth.uid()::text;
  delete from auth.users where id = auth.uid();
end $$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
