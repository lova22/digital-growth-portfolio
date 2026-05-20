-- ═══════════════════════════════════════════════════════
--  Digital Agency Portfolio — Supabase Schema Blueprint
-- ═══════════════════════════════════════════════════════

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─── projects ────────────────────────────────────────────
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       jsonb not null,           -- { "en": "...", "fr": "...", "ar": "..." }
  slug        text  not null unique,
  category    text  not null,
  image_url   text  not null,
  tech_stack  text[] not null default '{}',
  created_at  timestamptz not null default now()
);

-- Index for sorting by creation date
create index if not exists projects_created_at_idx on public.projects (created_at desc);

-- Row Level Security
alter table public.projects enable row level security;

-- Allow anyone to read projects (public portfolio)
create policy "projects_public_read"
  on public.projects for select
  using (true);

-- Only service-role / authenticated admin can insert/update/delete
create policy "projects_admin_write"
  on public.projects for all
  using (auth.role() = 'service_role');

-- ─── leads ───────────────────────────────────────────────
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  client_name  text not null check (char_length(client_name) between 2 and 100),
  email        text not null check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  message      text not null check (char_length(message) between 10 and 2000),
  created_at   timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Only the backend (service_role) can insert leads — never expose to public
create policy "leads_service_role_only"
  on public.leads for all
  using (auth.role() = 'service_role');

-- ─── Seed sample projects ─────────────────────────────────
insert into public.projects (title, slug, category, image_url, tech_stack) values
(
  '{"en":"AI-Powered SaaS Dashboard","fr":"Tableau SaaS IA","ar":"لوحة تحكم SaaS بالذكاء الاصطناعي"}',
  'ai-saas-dashboard',
  'AI Engineering',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  ARRAY['Next.js','OpenAI','Supabase','Tailwind']
),
(
  '{"en":"Gulf Real Estate Platform","fr":"Plateforme Immobilière","ar":"منصة عقارية خليجية"}',
  'gulf-real-estate',
  'Web Development',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  ARRAY['React','TypeScript','Mapbox']
),
(
  '{"en":"Brand Identity & Motion Kit","fr":"Identité Visuelle & Motion","ar":"هوية بصرية وموشن جرافيك"}',
  'brand-motion-kit',
  'Motion Design',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  ARRAY['After Effects','Figma','Illustrator']
);
