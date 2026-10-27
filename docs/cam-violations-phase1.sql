-- =============================================================================
-- CAM Violations Module — Phase 1 schema
-- Target: external Supabase project (the one wired via SUPABASE_URL secret).
-- Deliverable for manual application in the Supabase dashboard / migration CLI.
-- NOT for the platform-managed Cloud backend.
--
-- Applies the data model in docs/cam-violations-spec.md §2 with:
--   - default-deny RLS on every table
--   - a private storage bucket with signed expiring URLs only
--   - an atomic, gapless violation-number counter
--   - append-only protection on comments / events / internal notes
--
-- PREREQ: the existing public.communities, public.users, public.role_assignments
-- tables already exist in this project. This migration only ADDS violations
-- tables. Adjust the community prefix / id below to match the live community.
-- =============================================================================

-- Country Close community id (matches COUNTRY_CLOSE_COMMUNITY_ID in app code).
-- :community_id = '1bf4b1af-9b2f-42e7-a027-fd0ab59dee65'

-- -----------------------------------------------------------------------------
-- 1. Tables
-- -----------------------------------------------------------------------------

create table if not exists public.violation_rules (
  id              uuid primary key default gen_random_uuid(),
  community_id    uuid not null references public.communities(id) on delete cascade,
  citation        text not null,
  rule_text       text not null,
  category        text not null default 'General',
  cure_days       integer not null default 14,
  fine_schedule   jsonb not null default '{}'::jsonb,
  fineable        boolean not null default true,
  statutory_block boolean not null default false,
  statutory_note  text,
  version         integer not null default 1,
  effective_date  date not null default current_date,
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);

create table if not exists public.violations (
  id                uuid primary key default gen_random_uuid(),
  community_id      uuid not null references public.communities(id) on delete cascade,
  violation_number  text unique,                       -- null until submit
  draft_id          text not null,                      -- DRAFT-xxxx
  status            text not null default 'Draft',
  property_id       uuid,                               -- optional link to properties
  owner_name        text,
  owner_address     text,
  owner_phone      text,
  owner_email      text,
  rule_id           uuid references public.violation_rules(id),
  rule_text_snapshot text not null,
  citation          text,
  narrative         text not null default '',
  lat               double precision,
  lng               double precision,
  gps_accuracy_m    double precision,
  issued_by_user_id uuid references public.users(id),
  issued_by_name    text not null,
  cam_license_no    text,
  created_at        timestamptz not null default now(),
  submitted_at      timestamptz,
  delivered_at      timestamptz,
  cure_deadline     timestamptz,
  cure_days         integer not null default 14,
  paused            boolean not null default false,
  pause_reason      text,
  closed_at         timestamptz,
  close_reason      text
);

create table if not exists public.violation_photos (
  id            uuid primary key default gen_random_uuid(),
  violation_id  uuid not null references public.violations(id) on delete cascade,
  storage_path  text not null,
  sha256_hash   text,
  exif_json     jsonb,
  lat           double precision,
  lng           double precision,
  captured_at   timestamptz,
  uploaded_by    uuid references public.users(id),
  phase         text not null default 'initial'  -- initial / reinspection / owner_proof
);

create table if not exists public.violation_comments (
  id             uuid primary key default gen_random_uuid(),
  violation_id   uuid not null references public.violations(id) on delete cascade,
  author_user_id uuid references public.users(id),
  author_name    text not null,
  author_role    text not null,
  body           text not null,
  created_at      timestamptz not null default now()
);

create table if not exists public.violation_internal_notes (
  id             uuid primary key default gen_random_uuid(),
  violation_id   uuid not null references public.violations(id) on delete cascade,
  author_user_id uuid references public.users(id),
  author_name    text not null,
  body           text not null,
  created_at      timestamptz not null default now()
);

create table if not exists public.violation_events (
  id           uuid primary key default gen_random_uuid(),
  violation_id uuid not null references public.violations(id) on delete cascade,
  event_type   text not null,            -- created, autosave, submitted, notice_sent,
                                         -- delivered, bounced, email_opened, portal_viewed,
                                         -- status_change, amended, voided, hearing_scheduled,
                                         -- fine_decision
  actor        uuid references public.users(id),
  metadata     jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now()
);

create table if not exists public.violation_routing (
  id           uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities(id) on delete cascade,
  recipient    text not null,            -- role label or user id
  channel      text not null,            -- email / sms / mail
  copy_type    text not null default 'to' -- to / cc
);

create table if not exists public.violation_counters (
  community_id uuid not null references public.communities(id) on delete cascade,
  year         integer not null,
  last_number  integer not null default 0,
  primary key (community_id, year)
);

create table if not exists public.violation_hearings (
  id               uuid primary key default gen_random_uuid(),
  violation_id     uuid not null references public.violations(id) on delete cascade,
  notice_sent_at   timestamptz,
  hearing_date     timestamptz,
  committee_members jsonb not null default '[]'::jsonb,
  decision         text,
  findings_sent_at timestamptz,
  fine_amount      numeric(10,2),
  fine_due_date    date
);

create table if not exists public.owner_notice_consent (
  id              uuid primary key default gen_random_uuid(),
  owner_user_id    uuid references public.users(id),
  email_consent   boolean not null default false,
  consent_date    timestamptz,
  mailing_address  text
);

-- -----------------------------------------------------------------------------
-- 2. Grants (the Data API grants no default privileges on public)
-- -----------------------------------------------------------------------------

-- violation_rules: board/admin manage, authenticated read.
grant select on public.violation_rules to authenticated;
grant insert, update, delete on public.violation_rules to authenticated;
grant all on public.violation_rules to service_role;

grant select on public.violations to authenticated;
grant insert, update on public.violations to authenticated;
grant all on public.violations to service_role;

grant select on public.violation_photos to authenticated;
grant insert, update, delete on public.violation_photos to authenticated;
grant all on public.violation_photos to service_role;

grant select, insert on public.violation_comments to authenticated;
grant all on public.violation_comments to service_role;

grant select, insert on public.violation_internal_notes to authenticated;
grant all on public.violation_internal_notes to service_role;

grant select, insert on public.violation_events to authenticated;
grant all on public.violation_events to service_role;

grant select, insert, update, delete on public.violation_routing to authenticated;
grant all on public.violation_routing to service_role;

grant all on public.violation_counters to service_role;
-- counters are mutated only by the security-definer function below; do NOT
-- grant authenticated direct write access to the counters table.

grant select, insert, update on public.violation_hearings to authenticated;
grant all on public.violation_hearings to service_role;

grant select, insert, update on public.owner_notice_consent to authenticated;
grant all on public.owner_notice_consent to service_role;

-- -----------------------------------------------------------------------------
-- 3. Row Level Security — default deny, then per-role allow rules
-- -----------------------------------------------------------------------------

alter table public.violation_rules          enable row level security;
alter table public.violations              enable row level security;
alter table public.violation_photos        enable row level security;
alter table public.violation_comments      enable row level security;
alter table public.violation_internal_notes enable row level security;
alter table public.violation_events        enable row level security;
alter table public.violation_routing       enable row level security;
alter table public.violation_counters      enable row level security;
alter table public.violation_hearings      enable row level security;
alter table public.owner_notice_consent    enable row level security;

-- Helper: is the signed-in user a board/admin for a given community?
-- Assumes a public.has_role(_user_id uuid, _role app_role) function exists
-- (per the project's role model). If it does not, create it first.
create policy "community members read rules"
  on public.violation_rules for select to authenticated
  using (true);

create policy "board manages rules"
  on public.violation_rules for all to authenticated
  using (public.has_role(auth.uid(), 'boardMember') or public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'boardMember') or public.has_role(auth.uid(), 'admin'));

-- Violations: residents see their own (by owner_email match or issued_to);
-- CAM/board/admin see all in their community.
create policy "board cam admin read all violations"
  on public.violations for select to authenticated
  using (
    public.has_role(auth.uid(), 'boardMember')
    or public.has_role(auth.uid(), 'admin')
    or public.has_role(auth.uid(), 'blockCaptain')
  );

create policy "owner reads own violations"
  on public.violations for select to authenticated
  using (
    owner_email in (
      select email from public.users where auth_user_id = auth.uid()
    )
  );

create policy "cam board create violations"
  on public.violations for insert to authenticated
  with check (
    public.has_role(auth.uid(), 'boardMember')
    or public.has_role(auth.uid(), 'admin')
    or public.has_role(auth.uid(), 'blockCaptain')
  );

create policy "cam board update violations"
  on public.violations for update to authenticated
  using (
    public.has_role(auth.uid(), 'boardMember')
    or public.has_role(auth.uid(), 'admin')
    or public.has_role(auth.uid(), 'blockCaptain')
  );

create policy "photos follow violation"
  on public.violation_photos for select to authenticated
  using (
    exists (
      select 1 from public.violations v
      where v.id = violation_id
      and (
        public.has_role(auth.uid(), 'boardMember')
        or public.has_role(auth.uid(), 'admin')
        or public.has_role(auth.uid(), 'blockCaptain')
        or v.owner_email in (select email from public.users where auth_user_id = auth.uid())
      )
    )
  );

create policy "cam board manage photos"
  on public.violation_photos for all to authenticated
  using (
    public.has_role(auth.uid(), 'boardMember')
    or public.has_role(auth.uid(), 'admin')
    or public.has_role(auth.uid(), 'blockCaptain')
  )
  with check (
    public.has_role(auth.uid(), 'boardMember')
    or public.has_role(auth.uid(), 'admin')
    or public.has_role(auth.uid(), 'blockCaptain')
  );

create policy "comments visible to parties"
  on public.violation_comments for select to authenticated
  using (
    exists (
      select 1 from public.violations v
      where v.id = violation_id
      and (
        public.has_role(auth.uid(), 'boardMember')
        or public.has_role(auth.uid(), 'admin')
        or public.has_role(auth.uid(), 'blockCaptain')
        or v.owner_email in (select email from public.users where auth_user_id = auth.uid())
      )
    )
  );

create policy "parties add comments"
  on public.violation_comments for insert to authenticated
  with check (auth.uid() is not null);

create policy "internal notes board cam only"
  on public.violation_internal_notes for select to authenticated
  using (
    public.has_role(auth.uid(), 'boardMember')
    or public.has_role(auth.uid(), 'admin')
    or public.has_role(auth.uid(), 'blockCaptain')
  );

create policy "internal notes board cam insert"
  on public.violation_internal_notes for insert to authenticated
  with check (
    public.has_role(auth.uid(), 'boardMember')
    or public.has_role(auth.uid(), 'admin')
    or public.has_role(auth.uid(), 'blockCaptain')
  );

create policy "events visible to board cam"
  on public.violation_events for select to authenticated
  using (
    public.has_role(auth.uid(), 'boardMember')
    or public.has_role(auth.uid(), 'admin')
    or public.has_role(auth.uid(), 'blockCaptain')
  );

create policy "events insert by authenticated"
  on public.violation_events for insert to authenticated
  with check (auth.uid() is not null);

create policy "routing board admin"
  on public.violation_routing for all to authenticated
  using (
    public.has_role(auth.uid(), 'boardMember') or public.has_role(auth.uid(), 'admin')
  )
  with check (
    public.has_role(auth.uid(), 'boardMember') or public.has_role(auth.uid(), 'admin')
  );

-- counters: no direct authenticated access; only the function below mutates it.
create policy "no direct counter access"
  on public.violation_counters for select to authenticated
  using (false);

create policy "hearings board cam"
  on public.violation_hearings for all to authenticated
  using (
    public.has_role(auth.uid(), 'boardMember')
    or public.has_role(auth.uid(), 'admin')
    or public.has_role(auth.uid(), 'blockCaptain')
  )
  with check (
    public.has_role(auth.uid(), 'boardMember')
    or public.has_role(auth.uid(), 'admin')
    or public.has_role(auth.uid(), 'blockCaptain')
  );

create policy "owner manages own consent"
  on public.owner_notice_consent for all to authenticated
  using (
    owner_user_id = auth.uid()
    or public.has_role(auth.uid(), 'boardMember')
    or public.has_role(auth.uid(), 'admin')
  )
  with check (owner_user_id = auth.uid());

-- -----------------------------------------------------------------------------
-- 4. Atomic gapless violation-number counter
-- -----------------------------------------------------------------------------
-- A single UPDATE ... RETURNING under the (community_id, year) unique key takes
-- a row lock, so concurrent submits cannot skip or duplicate a number. The
-- function is SECURITY DEFINER so it can touch violation_counters despite the
-- no-direct-access policy above.

create or replace function public.next_violation_number(p_community_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_year  integer := extract(year from now());
  v_last  integer;
  v_prefix text;
begin
  insert into public.violation_counters (community_id, year, last_number)
  values (p_community_id, v_year, 0)
  on conflict (community_id, year) do nothing;

  update public.violation_counters
     set last_number = last_number + 1
   where community_id = p_community_id and year = v_year
  returning last_number into v_last;

  select coalesce(nullif(prefix, ''), 'CC') into v_prefix
  from public.communities where id = p_community_id;

  return v_prefix || '-' || v_year || '-' || lpad(v_last::text, 4, '0');
end;
$$;

-- -----------------------------------------------------------------------------
-- 5. Append-only protection (block UPDATE and DELETE on audit/comment tables)
-- -----------------------------------------------------------------------------

create or replace function public.block_update_delete()
returns trigger
language plpgsql
as $$
begin
  raise exception 'Table % is append-only: updates and deletes are not allowed.', TG_TABLE_NAME;
end;
$$;

drop trigger if exists tr_no_update_comments on public.violation_comments;
create trigger tr_no_update_comments
  before update or delete on public.violation_comments
  for each row execute function public.block_update_delete();

drop trigger if exists tr_no_update_events on public.violation_events;
create trigger tr_no_update_events
  before update or delete on public.violation_events
  for each row execute function public.block_update_delete();

drop trigger if exists tr_no_update_internal_notes on public.violation_internal_notes;
create trigger tr_no_update_internal_notes
  before update or delete on public.violation_internal_notes
  for each row execute function public.block_update_delete();

-- -----------------------------------------------------------------------------
-- 6. Private storage bucket for violation photos (signed expiring URLs only)
-- -----------------------------------------------------------------------------
-- Public = false so objects are never served without a signed URL. Add RLS
-- policies below to grant upload/read to the CAM/board/admin role and read to
-- the owner of the linked violation.

insert into storage.buckets (id, name, public)
values ('violation-photos', 'violation-photos', false)
on conflict (id) do nothing;

-- CAM/board/admin can upload and create signed URLs.
create policy "cam board upload violation photos"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'violation-photos'
    and (
      public.has_role(auth.uid(), 'boardMember')
      or public.has_role(auth.uid(), 'admin')
      or public.has_role(auth.uid(), 'blockCaptain')
    )
  );

create policy "cam board read violation photos"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'violation-photos'
    and (
      public.has_role(auth.uid(), 'boardMember')
      or public.has_role(auth.uid(), 'admin')
      or public.has_role(auth.uid(), 'blockCaptain')
    )
  );

create policy "cam board delete violation photos"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'violation-photos'
    and (
      public.has_role(auth.uid(), 'boardMember')
      or public.has_role(auth.uid(), 'admin')
      or public.has_role(auth.uid(), 'blockCaptain')
    )
  );

-- -----------------------------------------------------------------------------
-- 7. Seed: Country Close rule library (Phase 2 starter)
-- -----------------------------------------------------------------------------

insert into public.violation_rules
  (community_id, citation, rule_text, category, cure_days, fineable, statutory_block, statutory_note, active)
values
  ('1bf4b1af-9b2f-42e7-a027-fd0ab59dee65', 'CC&R 6.1',  'Lawns and landscaping must be maintained; grass may not exceed 6 inches.', 'Property Maintenance', 14, true, false, null, true),
  ('1bf4b1af-9b2f-42e7-a027-fd0ab59dee65', 'CC&R 6.3',  'Trash receptacles must be stored out of view except on collection day.', 'Trash/Recycling', 7, true, false, null, true),
  ('1bf4b1af-9b2f-42e7-a027-fd0ab59dee65', 'FL 720.305', 'Holiday decorations must be removed within one week after written notice.', 'Aesthetics', 7, true, true, 'No-fine window per HB 1203; review with counsel.', true),
  ('1bf4b1af-9b2f-42e7-a027-fd0ab59dee65', 'CC&R 7.2',  'Vehicles must be parked in designated areas; no on-street overnight parking.', 'Parking', 7, true, false, null, true),
  ('1bf4b1af-9b2f-42e7-a027-fd0ab59dee65', 'CC&R 8.1',  'Pets must be leashed in common areas; owners must remove pet waste.', 'Pets', 7, true, false, null, true),
  ('1bf4b1af-9b2f-42e7-a027-fd0ab59dee65', 'CC&R 5.4',  'Exterior modifications require ARC approval before construction.', 'Architectural', 30, true, false, null, true)
on conflict do nothing;

-- =============================================================================
-- End Phase 1. After applying, add a SUPABASE_SERVICE_ROLE_KEY secret in the
-- builder so the app's server functions can call next_violation_number() and
-- read/write through the service role. Then wire src/lib/violations.functions.ts
-- to replace the mock data layer.
-- =============================================================================
