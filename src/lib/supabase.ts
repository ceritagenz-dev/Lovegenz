import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars belum diset. Cek .env.local atau Vercel Environment Variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ResponseRow = {
  id: string;
  created_at: string;
  nama: string;
  total_score: number;
  golongan_rank: number;
  golongan_nama: string;
  deskripsi: string;
  percentage: number;
};
