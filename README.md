# Sensus Bucin 2026

Kuis "tes seberapa bucin" — 40 pertanyaan, 20 golongan, hasil deskripsi random
dari 30 varian per golongan. Dibangun dengan Next.js 14 (App Router) +
Supabase + Tailwind, struktur mirip Sensus Warganet.

## Fitur

- 40 soal pilihan ganda A-F
- 20 golongan bucin dengan bobot skor non-linear (distribusi mirip kurva normal,
  hasil simulasi 50.000 responden — golongan ekstrem lebih jarang dicapai)
- 600 deskripsi unik (30 per golongan), dipilih random sekali saat submit,
  lalu disimpan permanen (gak berubah-ubah tiap dibuka ulang)
- Input nama wajib sebelum submit
- Halaman publik `/hasil` — daftar semua responden (nama, golongan, deskripsi),
  terbaru di atas, dengan tombol "muat lebih banyak"
- Tombol share ke WhatsApp, X/Twitter, native share sheet, dan copy-to-clipboard,
  dengan caption otomatis

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com)
2. Masuk ke **SQL Editor**, jalankan isi file `supabase_schema.sql`
   (ini bikin tabel `responses` + Row Level Security policy)
3. Masuk ke **Project Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (klik "Reveal") → `SUPABASE_SERVICE_ROLE_KEY` (opsional tapi disarankan)

### 3. Environment variables

```bash
cp .env.local.example .env.local
```

Isi `.env.local` dengan value dari step 2.

### 4. Jalankan lokal

```bash
npm run dev
```

Buka `http://localhost:3000`

## Deploy ke Vercel

1. Push project ini ke GitHub repo
2. Di [vercel.com](https://vercel.com), klik **New Project**, import repo tersebut
3. Sebelum deploy, masuk ke **Environment Variables**, tambahkan ketiga
   variable yang sama dari `.env.local` (untuk environment Production,
   Preview, dan Development)
4. Klik **Deploy**

Vercel otomatis detect ini project Next.js, gak perlu konfigurasi build khusus.

## Struktur Project

```
src/
  app/
    page.tsx              # Flow utama: landing → nama → 40 soal → hasil
    hasil/page.tsx         # Halaman daftar semua responden
    api/
      submit/route.ts      # POST: hitung skor di server, simpan ke Supabase
      results/route.ts     # GET: ambil daftar responden (paginated)
    layout.tsx
    globals.css
  components/
    HeartbeatProgress.tsx  # Progress bar bertema "EKG/detak jantung"
    QuestionCard.tsx       # Kartu 1 soal + 6 opsi
    ShareButtons.tsx       # Tombol share sosmed
  lib/
    questions.ts           # 40 soal + bobot skor per opsi
    scoring.ts              # 20 golongan + cutoff skor (hasil simulasi)
    descriptions.ts         # Helper random-pick deskripsi
    descriptions_data.json  # 600 deskripsi (30 x 20 golongan)
    supabase.ts             # Client Supabase
supabase_schema.sql          # Schema tabel + RLS policy
```

## Catatan teknis

- **Bobot skor**: tiap opsi A-F punya skor 0-10 (bukan linear 0-5), dan beberapa
  soal "berat" (soal red flag, prioritas hidup vs karir) dikalibrasi punya bobot
  psikologis lebih besar. Cutoff antar golongan dihitung dari simulasi distribusi
  beta(2,2) latent-trait model atas 50.000 kombinasi jawaban, supaya hasil akhir
  natural — kebanyakan orang nge-cluster di golongan tengah, golongan paling
  waras (#1) dan paling akut (#20) sengaja lebih jarang dicapai.
- **Skor dihitung di server** (`/api/submit`), bukan di client, supaya gak bisa
  dimanipulasi dari devtools.
- **Deskripsi di-random sekali** saat submit dan disimpan ke DB — jadi kalau
  user buka lagi link hasil atau muncul di halaman `/hasil`, deskripsinya tetap
  sama (gak reroll setiap render).
