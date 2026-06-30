import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { QUIZ_QUESTIONS } from "@/lib/questions";
import { getGolonganFromScore, getPercentageScore } from "@/lib/scoring";
import { pickRandomDescription } from "@/lib/descriptions";

// Pakai service role kalau ada (lebih aman untuk write dari server),
// fallback ke anon key kalau service role belum diset.
function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

type SubmitBody = {
  nama: string;
  answers: Record<number, "A" | "B" | "C" | "D" | "E" | "F">;
};

export async function POST(req: NextRequest) {
  try {
    const body: SubmitBody = await req.json();
    const { nama, answers } = body;

    // Validasi nama
    const trimmedNama = (nama || "").trim();
    if (!trimmedNama || trimmedNama.length > 50) {
      return NextResponse.json(
        { error: "Nama wajib diisi, maksimal 50 karakter." },
        { status: 400 }
      );
    }

    // Validasi semua 40 soal sudah terjawab
    if (!answers || Object.keys(answers).length !== QUIZ_QUESTIONS.length) {
      return NextResponse.json(
        { error: "Semua 40 pertanyaan wajib dijawab." },
        { status: 400 }
      );
    }

    // Hitung skor di SERVER, jangan percaya skor dari client
    let totalScore = 0;
    for (const q of QUIZ_QUESTIONS) {
      const answerLabel = answers[q.id];
      const option = q.options.find((o) => o.label === answerLabel);
      if (!option) {
        return NextResponse.json(
          { error: `Jawaban tidak valid untuk soal #${q.id}.` },
          { status: 400 }
        );
      }
      totalScore += option.score;
    }

    const golongan = getGolonganFromScore(totalScore);
    const percentage = getPercentageScore(totalScore);
    const deskripsi = pickRandomDescription(golongan.nama);

    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from("responses")
      .insert({
        nama: trimmedNama,
        total_score: totalScore,
        golongan_rank: golongan.rank,
        golongan_nama: golongan.nama,
        deskripsi,
        percentage,
      })
      .select()
      .single();

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Gagal menyimpan hasil. Coba lagi sebentar." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: data.id,
      nama: data.nama,
      golongan: golongan,
      deskripsi,
      percentage,
      totalScore,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Submit error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan. Coba lagi." },
      { status: 500 }
    );
  }
}
