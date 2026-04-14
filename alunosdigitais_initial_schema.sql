
-- Alunos Digitais - initial schema
-- SQL-first base for Supabase/Postgres
-- Focus: institutional site + CMS + curriculum structure + forms/leads + governance

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('super_admin', 'admin', 'editor', 'reviewer', 'analyst');
  end if;

  if not exists (select 1 from pg_type where typname = 'content_type') then
    create type public.content_type as enum (
      'page',
      'landing_page',
      'article',
      'resource',
      'case_study',
      'faq',
      'legal_page',
      'curriculum_unit'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'content_status') then
    create type public.content_status as enum ('draft', 'in_review', 'scheduled', 'published', 'archived');
  end if;

  if not exists (select 1 from pg_type where typname = 'lead_status') then
    create type public.lead_status as enum ('new', 'qualified', 'contacted', 'won', 'lost', 'spam');
  end if;

  if not exists (select 1 from pg_type where typname = 'asset_visibility') then
    create type public.asset_visibility as enum ('public', 'private', 'signed');
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email))
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  job_title text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.role_assignments (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null check (bucket in ('site-public', 'documents', 'og-images', 'cms-private')),
  path text not null unique,
  file_name text not null,
  title text,
  alt_text text,
  mime_type text,
  size_bytes bigint,
  width integer,
  height integer,
  duration_seconds numeric(10,2),
  visibility public.asset_visibility not null default 'public',
  metadata jsonb not null default '{}'::jsonb,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.taxonomies (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.terms (
  id uuid primary key default gen_random_uuid(),
  taxonomy_id uuid not null references public.taxonomies(id) on delete cascade,
  slug text not null,
  name text not null,
  description text,
  sort_order integer not null default 0,
  unique (taxonomy_id, slug),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audience_segments (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  type public.content_type not null,
  locale text not null default 'pt-BR',
  slug text not null,
  path text not null,
  title text not null,
  subtitle text,
  excerpt text,
  status public.content_status not null default 'draft',
  template_key text not null default 'default',
  hero_media_id uuid references public.media_assets(id) on delete set null,
  author_user_id uuid references auth.users(id) on delete set null,
  owner_user_id uuid references auth.users(id) on delete set null,
  seo_title text,
  seo_description text,
  canonical_url text,
  og_media_id uuid references public.media_assets(id) on delete set null,
  noindex boolean not null default false,
  nofollow boolean not null default false,
  schema_json jsonb not null default '{}'::jsonb,
  settings_json jsonb not null default '{}'::jsonb,
  search_text text,
  current_version_number integer not null default 1,
  published_version_number integer,
  published_at timestamptz,
  first_published_at timestamptz,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, path),
  unique (locale, slug, type)
);

alter table public.content_items
  add column if not exists search_vector tsvector
  generated always as (
    to_tsvector(
      'portuguese',
      coalesce(title, '') || ' ' ||
      coalesce(subtitle, '') || ' ' ||
      coalesce(excerpt, '') || ' ' ||
      coalesce(search_text, '')
    )
  ) stored;

create index if not exists idx_content_items_search_vector on public.content_items using gin (search_vector);
create index if not exists idx_content_items_status_type on public.content_items (status, type);
create index if not exists idx_content_items_published_at on public.content_items (published_at desc);

create table if not exists public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references public.content_items(id) on delete cascade,
  version_number integer not null,
  editor_json jsonb not null default '[]'::jsonb,
  render_html text,
  plain_text text,
  summary text,
  change_note text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (content_item_id, version_number)
);

create table if not exists public.content_term_map (
  content_item_id uuid not null references public.content_items(id) on delete cascade,
  term_id uuid not null references public.terms(id) on delete cascade,
  primary key (content_item_id, term_id)
);

create table if not exists public.content_audience_map (
  content_item_id uuid not null references public.content_items(id) on delete cascade,
  audience_segment_id uuid not null references public.audience_segments(id) on delete cascade,
  primary key (content_item_id, audience_segment_id)
);

create table if not exists public.content_relations (
  source_content_id uuid not null references public.content_items(id) on delete cascade,
  target_content_id uuid not null references public.content_items(id) on delete cascade,
  relation_type text not null,
  sort_order integer not null default 0,
  primary key (source_content_id, target_content_id, relation_type)
);

create table if not exists public.menus (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  location text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  menu_id uuid not null references public.menus(id) on delete cascade,
  parent_id uuid references public.menu_items(id) on delete cascade,
  label text not null,
  item_type text not null check (item_type in ('internal', 'external', 'content')),
  href text,
  content_item_id uuid references public.content_items(id) on delete set null,
  target text,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.forms (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  success_message text,
  destination_email text,
  is_active boolean not null default true,
  settings_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.form_fields (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.forms(id) on delete cascade,
  field_key text not null,
  label text not null,
  field_type text not null,
  placeholder text,
  help_text text,
  is_required boolean not null default false,
  sort_order integer not null default 0,
  validation_json jsonb not null default '{}'::jsonb,
  options_json jsonb not null default '[]'::jsonb,
  unique (form_id, field_key),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text,
  phone text,
  organization_name text,
  job_title text,
  city text,
  state text,
  interest_area text,
  message text,
  status public.lead_status not null default 'new',
  source text,
  campaign text,
  notes text,
  first_submission_at timestamptz,
  last_submission_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.forms(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  payload jsonb not null,
  consent_json jsonb not null default '{}'::jsonb,
  utm_json jsonb not null default '{}'::jsonb,
  source_url text,
  status text not null default 'received',
  submitted_at timestamptz not null default now()
);

create index if not exists idx_form_submissions_submitted_at on public.form_submissions (submitted_at desc);

create table if not exists public.redirects (
  id uuid primary key default gen_random_uuid(),
  source_path text not null unique,
  target_path text not null,
  redirect_type integer not null check (redirect_type in (301, 302, 307, 308)),
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value_json jsonb not null default '{}'::jsonb,
  is_public boolean not null default false,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.program_tracks (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.grade_levels (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  grade_number integer,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.program_phases (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  phase_number integer,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.program_themes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.curriculum_units (
  id uuid primary key default gen_random_uuid(),
  track_id uuid references public.program_tracks(id) on delete set null,
  grade_level_id uuid references public.grade_levels(id) on delete set null,
  phase_id uuid references public.program_phases(id) on delete set null,
  theme_id uuid references public.program_themes(id) on delete set null,
  audience_segment_id uuid references public.audience_segments(id) on delete set null,
  content_item_id uuid references public.content_items(id) on delete set null,
  external_lms_url text,
  title text not null,
  slug text not null unique,
  summary text,
  objectives text,
  duration_minutes integer,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.consent_records (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  email text,
  source_url text,
  consent_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.privacy_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text not null,
  request_type text not null,
  message text,
  status text not null default 'received',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_logs_created_at on public.audit_logs (created_at desc);

create or replace view public.published_content as
select
  ci.id,
  ci.type,
  ci.locale,
  ci.slug,
  ci.path,
  ci.title,
  ci.subtitle,
  ci.excerpt,
  ci.template_key,
  ci.seo_title,
  ci.seo_description,
  ci.canonical_url,
  ci.noindex,
  ci.nofollow,
  ci.published_at,
  cr.render_html,
  cr.plain_text
from public.content_items ci
left join public.content_revisions cr
  on cr.content_item_id = ci.id
 and cr.version_number = ci.published_version_number
where ci.status = 'published';

create or replace function public.has_role(_role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.role_assignments ra
    where ra.user_id = auth.uid()
      and ra.role = _role
  );
$$;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.has_role('super_admin')
    or public.has_role('admin')
    or public.has_role('editor')
    or public.has_role('reviewer')
    or public.has_role('analyst');
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at before update on public.profiles
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_media_assets_updated_at on public.media_assets;
create trigger trg_media_assets_updated_at before update on public.media_assets
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_taxonomies_updated_at on public.taxonomies;
create trigger trg_taxonomies_updated_at before update on public.taxonomies
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_terms_updated_at on public.terms;
create trigger trg_terms_updated_at before update on public.terms
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_content_items_updated_at on public.content_items;
create trigger trg_content_items_updated_at before update on public.content_items
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_menus_updated_at on public.menus;
create trigger trg_menus_updated_at before update on public.menus
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_menu_items_updated_at on public.menu_items;
create trigger trg_menu_items_updated_at before update on public.menu_items
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_forms_updated_at on public.forms;
create trigger trg_forms_updated_at before update on public.forms
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_form_fields_updated_at on public.form_fields;
create trigger trg_form_fields_updated_at before update on public.form_fields
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_leads_updated_at on public.leads;
create trigger trg_leads_updated_at before update on public.leads
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_redirects_updated_at on public.redirects;
create trigger trg_redirects_updated_at before update on public.redirects
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_program_tracks_updated_at on public.program_tracks;
create trigger trg_program_tracks_updated_at before update on public.program_tracks
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_grade_levels_updated_at on public.grade_levels;
create trigger trg_grade_levels_updated_at before update on public.grade_levels
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_program_phases_updated_at on public.program_phases;
create trigger trg_program_phases_updated_at before update on public.program_phases
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_program_themes_updated_at on public.program_themes;
create trigger trg_program_themes_updated_at before update on public.program_themes
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_curriculum_units_updated_at on public.curriculum_units;
create trigger trg_curriculum_units_updated_at before update on public.curriculum_units
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_privacy_requests_updated_at on public.privacy_requests;
create trigger trg_privacy_requests_updated_at before update on public.privacy_requests
for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.role_assignments enable row level security;
alter table public.media_assets enable row level security;
alter table public.taxonomies enable row level security;
alter table public.terms enable row level security;
alter table public.audience_segments enable row level security;
alter table public.content_items enable row level security;
alter table public.content_revisions enable row level security;
alter table public.content_term_map enable row level security;
alter table public.content_audience_map enable row level security;
alter table public.content_relations enable row level security;
alter table public.menus enable row level security;
alter table public.menu_items enable row level security;
alter table public.forms enable row level security;
alter table public.form_fields enable row level security;
alter table public.leads enable row level security;
alter table public.form_submissions enable row level security;
alter table public.redirects enable row level security;
alter table public.site_settings enable row level security;
alter table public.program_tracks enable row level security;
alter table public.grade_levels enable row level security;
alter table public.program_phases enable row level security;
alter table public.program_themes enable row level security;
alter table public.curriculum_units enable row level security;
alter table public.consent_records enable row level security;
alter table public.privacy_requests enable row level security;
alter table public.audit_logs enable row level security;

-- profiles
drop policy if exists "profiles_self_read" on public.profiles;
create policy "profiles_self_read"
on public.profiles
for select
using (auth.uid() = user_id or public.is_admin_user());

drop policy if exists "profiles_self_update" on public.profiles;
create policy "profiles_self_update"
on public.profiles
for update
using (auth.uid() = user_id or public.is_admin_user());

-- admin managed tables
do $$
declare
  t text;
begin
  foreach t in array array[
    'role_assignments',
    'media_assets',
    'taxonomies',
    'terms',
    'audience_segments',
    'content_items',
    'content_revisions',
    'content_term_map',
    'content_audience_map',
    'content_relations',
    'menus',
    'menu_items',
    'forms',
    'form_fields',
    'leads',
    'form_submissions',
    'redirects',
    'site_settings',
    'program_tracks',
    'grade_levels',
    'program_phases',
    'program_themes',
    'curriculum_units',
    'audit_logs'
  ]
  loop
    execute format('drop policy if exists "%s_admin_all" on public.%I;', t, t);
    execute format(
      'create policy "%s_admin_all" on public.%I for all using (public.is_admin_user()) with check (public.is_admin_user());',
      t, t
    );
  end loop;
end $$;

-- public read policies
drop policy if exists "content_public_read" on public.content_items;
create policy "content_public_read"
on public.content_items
for select
using (status = 'published');

drop policy if exists "content_revisions_public_read" on public.content_revisions;
create policy "content_revisions_public_read"
on public.content_revisions
for select
using (
  exists (
    select 1
    from public.content_items ci
    where ci.id = content_item_id
      and ci.status = 'published'
      and ci.published_version_number = version_number
  )
);

drop policy if exists "menus_public_read" on public.menus;
create policy "menus_public_read"
on public.menus
for select
using (true);

drop policy if exists "menu_items_public_read" on public.menu_items;
create policy "menu_items_public_read"
on public.menu_items
for select
using (is_visible = true);

drop policy if exists "terms_public_read" on public.terms;
create policy "terms_public_read"
on public.terms
for select
using (true);

drop policy if exists "taxonomies_public_read" on public.taxonomies;
create policy "taxonomies_public_read"
on public.taxonomies
for select
using (true);

drop policy if exists "audience_segments_public_read" on public.audience_segments;
create policy "audience_segments_public_read"
on public.audience_segments
for select
using (true);

drop policy if exists "program_tracks_public_read" on public.program_tracks;
create policy "program_tracks_public_read"
on public.program_tracks
for select
using (true);

drop policy if exists "grade_levels_public_read" on public.grade_levels;
create policy "grade_levels_public_read"
on public.grade_levels
for select
using (true);

drop policy if exists "program_phases_public_read" on public.program_phases;
create policy "program_phases_public_read"
on public.program_phases
for select
using (true);

drop policy if exists "program_themes_public_read" on public.program_themes;
create policy "program_themes_public_read"
on public.program_themes
for select
using (true);

drop policy if exists "curriculum_units_public_read" on public.curriculum_units;
create policy "curriculum_units_public_read"
on public.curriculum_units
for select
using (is_active = true);

-- public inserts
drop policy if exists "form_submissions_public_insert" on public.form_submissions;
create policy "form_submissions_public_insert"
on public.form_submissions
for insert
with check (true);

drop policy if exists "consent_records_public_insert" on public.consent_records;
create policy "consent_records_public_insert"
on public.consent_records
for insert
with check (true);

drop policy if exists "privacy_requests_public_insert" on public.privacy_requests;
create policy "privacy_requests_public_insert"
on public.privacy_requests
for insert
with check (true);

-- seed taxonomies
insert into public.taxonomies (code, label, description, sort_order)
values
  ('tema', 'Tema', 'Temas editoriais e curriculares', 1),
  ('persona', 'Persona', 'Públicos prioritários', 2),
  ('formato', 'Formato', 'Formato de conteúdo', 3),
  ('etapa_funil', 'Etapa do funil', 'Topo, meio e fundo', 4)
on conflict (code) do nothing;

-- seed audience segments
insert into public.audience_segments (code, label, description)
values
  ('escolas_privadas', 'Escolas privadas', 'Escolas particulares e mantenedoras'),
  ('redes_publicas', 'Redes públicas', 'Secretarias e redes públicas'),
  ('gestores', 'Gestores escolares', 'Direção, coordenação, mantenedores'),
  ('educadores', 'Educadores', 'Professores e equipes pedagógicas'),
  ('familias', 'Famílias', 'Pais e responsáveis'),
  ('alunos', 'Alunos', 'Crianças e adolescentes')
on conflict (code) do nothing;

-- seed program tracks
insert into public.program_tracks (code, label, description, sort_order)
values
  ('fundamental_1', 'Ensino Fundamental I', 'Trilha para anos iniciais', 1),
  ('fundamental_2', 'Ensino Fundamental II', 'Trilha para anos finais', 2),
  ('familias', 'Famílias', 'Conteúdos e materiais para pais e responsáveis', 3),
  ('educadores', 'Educadores', 'Conteúdos e materiais para professores e gestores', 4)
on conflict (code) do nothing;

-- seed grade levels
insert into public.grade_levels (code, label, grade_number, sort_order)
values
  ('ano_1', 'Ano 1', 1, 1),
  ('ano_2', 'Ano 2', 2, 2),
  ('ano_3', 'Ano 3', 3, 3),
  ('ano_4', 'Ano 4', 4, 4),
  ('ano_5', 'Ano 5', 5, 5),
  ('ano_6', 'Ano 6', 6, 6),
  ('ano_7', 'Ano 7', 7, 7),
  ('ano_8', 'Ano 8', 8, 8),
  ('ano_9', 'Ano 9', 9, 9)
on conflict (code) do nothing;

-- seed program phases
insert into public.program_phases (code, label, phase_number, sort_order)
values
  ('fase_1', 'Fase 1', 1, 1),
  ('fase_2', 'Fase 2', 2, 2),
  ('fase_3', 'Fase 3', 3, 3),
  ('fase_4', 'Fase 4', 4, 4),
  ('fase_5', 'Fase 5', 5, 5),
  ('fase_6', 'Fase 6', 6, 6)
on conflict (code) do nothing;

-- seed program themes
insert into public.program_themes (code, label, description, sort_order)
values
  ('privacidade_de_dados', 'Privacidade de dados', 'Proteção de dados e privacidade', 1),
  ('direitos_do_cidadao', 'Direitos do cidadão digital', 'Direitos, deveres e consciência cidadã', 2),
  ('navegacao_segura', 'Navegação segura', 'Segurança online e boas práticas', 3),
  ('imagem_e_reputacao', 'Imagem e reputação nas redes', 'Identidade e reputação digital', 4),
  ('fake_news', 'Fake news e educação midiática', 'Desinformação e leitura crítica', 5),
  ('jogos_online', 'Jogos online', 'Riscos e práticas saudáveis em jogos', 6),
  ('cyberbullying', 'Cyberbullying', 'Prevenção e enfrentamento', 7),
  ('educacao_financeira_digital', 'Educação financeira digital', 'Consumo, golpes e decisões online', 8),
  ('tempo_de_tela', 'Tempo de tela', 'Equilíbrio digital e saúde', 9),
  ('eca_digital', 'ECA Digital', 'Marco legal e orientações relacionadas', 10)
on conflict (code) do nothing;


-- additional public read policies used by the public site
drop policy if exists "media_assets_public_read" on public.media_assets;
create policy "media_assets_public_read"
on public.media_assets
for select
using (visibility = 'public');

drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
on public.site_settings
for select
using (is_public = true);

drop policy if exists "content_term_map_public_read" on public.content_term_map;
create policy "content_term_map_public_read"
on public.content_term_map
for select
using (
  exists (
    select 1
    from public.content_items ci
    where ci.id = content_item_id
      and ci.status = 'published'
  )
);

drop policy if exists "content_audience_map_public_read" on public.content_audience_map;
create policy "content_audience_map_public_read"
on public.content_audience_map
for select
using (
  exists (
    select 1
    from public.content_items ci
    where ci.id = content_item_id
      and ci.status = 'published'
  )
);

drop policy if exists "content_relations_public_read" on public.content_relations;
create policy "content_relations_public_read"
on public.content_relations
for select
using (
  exists (
    select 1
    from public.content_items ci
    where ci.id = source_content_id
      and ci.status = 'published'
  )
  and exists (
    select 1
    from public.content_items ci
    where ci.id = target_content_id
      and ci.status = 'published'
  )
);

drop policy if exists "forms_public_read" on public.forms;
create policy "forms_public_read"
on public.forms
for select
using (is_active = true);

drop policy if exists "form_fields_public_read" on public.form_fields;
create policy "form_fields_public_read"
on public.form_fields
for select
using (
  exists (
    select 1
    from public.forms f
    where f.id = form_id
      and f.is_active = true
  )
);
