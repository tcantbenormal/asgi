-- Rebuild the site when an approved profile is saved, so edits appear within a few minutes
-- instead of at the next weekly build. The database calls GitHub's repository_dispatch, which
-- runs .github/workflows/weekly-rebuild.yml (it also listens for this event).
--
-- BEFORE RUNNING: replace GITHUB_TOKEN_HERE with a fine-grained personal access token for the
-- tcantbenormal/asgi repository with "Contents: Read and write" permission (GitHub, Settings,
-- Developer settings, Fine-grained tokens). Paste it in the SQL editor only; never commit it.
create extension if not exists pg_net;

create or replace function public.request_site_rebuild() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  -- Only approved rows are on the site, and only a real change needs a build.
  if new.approved and (tg_op = 'INSERT' or old is distinct from new) then
    perform net.http_post(
      url     := 'https://api.github.com/repos/tcantbenormal/asgi/dispatches',
      headers := jsonb_build_object(
        'Accept', 'application/vnd.github+json',
        'Authorization', 'Bearer GITHUB_TOKEN_HERE',
        'User-Agent', 'asgi-supabase',
        'Content-Type', 'application/json'),
      body    := jsonb_build_object('event_type', 'rebuild', 'client_payload', jsonb_build_object('profile', coalesce(new.username, new.slug)))
    );
  end if;
  return new;
end $$;

drop trigger if exists profiles_rebuild on public.profiles;
create trigger profiles_rebuild after insert or update on public.profiles
  for each row execute function public.request_site_rebuild();
