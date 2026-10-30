-- Images attached to forum posts, replies and suggestions (projects). Public bucket, 2 MB per
-- file, images only, one folder per user. The browser resizes to 1600 px and encodes WebP before
-- upload, so most files land well under the limit; the bucket limit is the hard stop.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('images', 'images', true, 2097152, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "images public read" on storage.objects;
create policy "images public read" on storage.objects for select using (bucket_id = 'images');
drop policy if exists "images owner write" on storage.objects;
create policy "images owner write" on storage.objects for insert to authenticated
  with check (bucket_id = 'images' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "images owner delete" on storage.objects;
create policy "images owner delete" on storage.objects for delete to authenticated
  using (bucket_id = 'images' and (storage.foldername(name))[1] = auth.uid()::text);

-- Suggestions (projects, tools, datasets) may carry up to six image URLs from that bucket.
alter table public.submissions add column if not exists images text[] not null default '{}';
alter table public.submissions drop constraint if exists submissions_images_max;
alter table public.submissions add constraint submissions_images_max check (cardinality(images) <= 6);
