-- Mentorship requests and membership applications use the same submissions table as
-- resource suggestions (reviewed in the dashboard, never readable through the API).
alter table public.submissions drop constraint if exists submissions_kind_check;
alter table public.submissions add constraint submissions_kind_check
  check (kind in ('tool','dataset','opportunity','project','employer','mentorship','membership','other'));
