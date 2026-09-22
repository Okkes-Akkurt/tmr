-- TMR Engineering veritabanı şeması
-- Supabase > SQL Editor içinde bir kez çalıştırın.

-- ---------- Yöneticiler ----------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

-- ---------- Site ayarları (tek satır) ----------
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.site_settings (id) values (1) on conflict do nothing;

-- ---------- Görseller ve hizmet notları ----------
-- key örnekleri: hero, s1..s24 (depolama yolu), n1..n24 (TR ek açıklama), e1..e24 (EN ek açıklama)
create table if not exists public.site_media (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

-- ---------- Projeler ----------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_en text,
  service_id int,
  location text,
  year text,
  scope text,
  scope_en text,
  images text[] not null default '{}',
  cover text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Referanslar ----------
create table if not exists public.client_references (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo text,
  created_at timestamptz not null default now()
);

-- ---------- Teklif talepleri ----------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  phone text not null check (char_length(phone) between 7 and 40),
  email text check (email is null or char_length(email) <= 200),
  company text check (company is null or char_length(company) <= 200),
  service text check (service is null or char_length(service) <= 200),
  location text check (location is null or char_length(location) <= 200),
  message text check (message is null or char_length(message) <= 4000),
  lang text not null default 'tr',
  status text not null default 'new' check (status in ('new', 'done')),
  ip_hash text
);
create index if not exists leads_created_idx on public.leads (created_at desc);
create index if not exists leads_ip_idx on public.leads (ip_hash, created_at desc);

-- ---------- Satır düzeyi güvenlik ----------
alter table public.admins enable row level security;
alter table public.site_settings enable row level security;
alter table public.site_media enable row level security;
alter table public.projects enable row level security;
alter table public.client_references enable row level security;
alter table public.leads enable row level security;

-- Herkese açık okuma
drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select to anon, authenticated using (true);
drop policy if exists "public read media" on public.site_media;
create policy "public read media" on public.site_media for select to anon, authenticated using (true);
drop policy if exists "public read projects" on public.projects;
create policy "public read projects" on public.projects for select to anon, authenticated using (published or public.is_admin());
drop policy if exists "public read references" on public.client_references;
create policy "public read references" on public.client_references for select to anon, authenticated using (true);

-- Yönetici yazma
drop policy if exists "admin write settings" on public.site_settings;
create policy "admin write settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin write media" on public.site_media;
create policy "admin write media" on public.site_media for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin write projects" on public.projects;
create policy "admin write projects" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin write references" on public.client_references;
create policy "admin write references" on public.client_references for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Teklifler: yalnızca yönetici okur/günceller/siler. Kayıt sunucudan gizli anahtarla yapılır (RLS'i aşar),
-- bu yüzden anon rolüne ekleme yetkisi verilmez.
drop policy if exists "admin manage leads" on public.leads;
create policy "admin manage leads" on public.leads for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Kullanıcı kendi yönetici kaydını görebilir (panel yetki kontrolü için)
drop policy if exists "self read admin" on public.admins;
create policy "self read admin" on public.admins for select to authenticated using (user_id = (select auth.uid()));

-- Data API yetkileri (RLS yine her satırı ayrıca denetler)
grant usage on schema public to anon, authenticated;
grant select on public.site_settings, public.site_media, public.projects, public.client_references to anon;
grant select, insert, update, delete on public.site_settings, public.site_media, public.projects, public.client_references, public.leads to authenticated;
grant select on public.admins to authenticated;
revoke all on public.leads from anon;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------- Dosya deposu ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site', 'site', true, 10485760, array['image/jpeg','image/png','image/webp','image/svg+xml'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- Silme işlemi select yetkisi de gerektirir
drop policy if exists "admin read site" on storage.objects;
create policy "admin read site" on storage.objects for select to authenticated using (bucket_id = 'site' and public.is_admin());
drop policy if exists "admin upload site" on storage.objects;
create policy "admin upload site" on storage.objects for insert to authenticated with check (bucket_id = 'site' and public.is_admin());
drop policy if exists "admin update site" on storage.objects;
create policy "admin update site" on storage.objects for update to authenticated using (bucket_id = 'site' and public.is_admin());
drop policy if exists "admin delete site" on storage.objects;
create policy "admin delete site" on storage.objects for delete to authenticated using (bucket_id = 'site' and public.is_admin());

-- ---------- İlk yönetici ----------
-- 1) Supabase > Authentication > Users > "Add user" ile e-posta ve şifre oluşturun.
-- 2) Aşağıdaki satırdaki e-postayı değiştirip çalıştırın:
-- insert into public.admins (user_id) select id from auth.users where email = 'sizin@eposta.com';
