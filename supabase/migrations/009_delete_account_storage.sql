-- Supabase no longer allows SQL deletes on storage.objects ("Use the Storage API instead").
-- The browser now removes the member's files through the Storage API (owner delete policies
-- from 004 and 007 cover avatars, cv and images), then calls this to drop the auth user.
-- Profile, posts, replies and submissions cascade from auth.users.
create or replace function public.delete_my_account() returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Not signed in.'; end if;
  delete from auth.users where id = auth.uid();
end $$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
