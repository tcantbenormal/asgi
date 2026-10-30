-- October 2026: Industry page. Adds the "employer" suggestion kind and reserves the
-- /industry username. Only needed if 005 was run before this date; a fresh 005 includes both.
alter table public.submissions drop constraint if exists submissions_kind_check;
alter table public.submissions add constraint submissions_kind_check
  check (kind in ('tool','dataset','opportunity','project','employer','other'));

alter table public.profiles drop constraint if exists profiles_username_format;
alter table public.profiles add constraint profiles_username_format check (
  username is null or (
    username ~ '^[a-z0-9][a-z0-9-]{2,29}$'
    and username not in ('alumni','map','stories','roadmaps','software','datasets','opportunities','projects','society',
                         'events','contact','privacy','legal','search','mentorship','download','resources','admin','api',
                         'img','models','pagefind','join','login','settings','about','blog','forum','institutions','u',
                         'account','profile','signin','signout','auth','members','student','students','sw','submit','industry')
  )
);
