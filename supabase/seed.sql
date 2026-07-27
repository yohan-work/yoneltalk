-- Run after creating pilot users in Supabase Auth. Replace the UUID below with an authenticated pilot user.
-- This seed intentionally contains fictional, non-sensitive data only.
insert into public.workspaces (id, name) values ('11111111-1111-1111-1111-111111111111', 'RelayDesk Pilot') on conflict do nothing;
