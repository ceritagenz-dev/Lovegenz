-- =========================================================
-- SENSUS BUCIN 2026 — Database Schema
-- Jalankan di Supabase SQL Editor (project lo)
-- =========================================================

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nama text not null check (char_length(nama) between 1 and 50),
  total_score integer not null check (total_score >= 0),
  golongan_rank integer not null check (golongan_rank between 1 and 20),
  golongan_nama text not null,
  deskripsi text not null,
  percentage integer not null check (percentage between 0 and 100)
);

-- Index buat query "lihat hasil responden lain" (urut terbaru duluan)
create index if not exists responses_created_at_idx
  on public.responses (created_at desc);

-- Enable Row Level Security
alter table public.responses enable row level security;

-- Policy: siapa aja (anon) boleh INSERT (submit hasil kuis)
create policy "Anyone can insert responses"
  on public.responses
  for insert
  to anon
  with check (true);

-- Policy: siapa aja (anon) boleh SELECT (liat hasil responden lain, fitur publik)
create policy "Anyone can read responses"
  on public.responses
  for select
  to anon
  using (true);

-- Tidak ada policy UPDATE/DELETE untuk anon — hasil sensus bersifat permanen,
-- gak bisa diubah/dihapus dari sisi client demi integritas data publik.
