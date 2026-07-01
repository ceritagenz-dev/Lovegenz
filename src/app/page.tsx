"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { QUIZ_QUESTIONS } from "@/lib/questions";
import HeartbeatProgress from "@/components/HeartbeatProgress";
import QuestionCard from "@/components/QuestionCard";
import ShareButtons from "@/components/ShareButtons";

const STORAGE_KEY = "sensusBucin2026_hasil";

type Stage = "landing" | "nama" | "quiz" | "loading" | "hasil" | "error";

type HasilData = {
  nama: string;
  golongan: { rank: number; nama: string; tagline: string };
  deskripsi: string;
  percentage: number;
  totalScore: number;
};

export default function Home() {
  const [stage, setStage] = useState<Stage>("landing");
  const [nama, setNama] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [hasil, setHasil] = useState<HasilData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const submittingRef = useRef(false);

  // Cek apakah device ini udah pernah submit sebelumnya.
  // Kalau udah, langsung tampilin hasil lama, gak boleh isi ulang dari awal.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: HasilData = JSON.parse(saved);
        setHasil(parsed);
        setStage("hasil");
      }
    } catch {
      // localStorage gak available / data corrupt, biarin user mulai normal
    }
  }, []);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[currentQ];

  const handleSelectOption = (label: string) => {
    if (submittingRef.current) return;
    const updated = { ...answers, [question.id]: label };
    setAnswers(updated);

    setTimeout(() => {
      if (currentQ + 1 < totalQuestions) {
        setCurrentQ(currentQ + 1);
      } else {
        submitQuiz(updated);
      }
    }, 220);
  };

  const submitQuiz = async (finalAnswers: Record<number, string>) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStage("loading");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, answers: finalAnswers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Gagal mengirim hasil.");
        setStage("error");
        submittingRef.current = false;
        return;
      }
      setHasil(data);
      setStage("hasil");
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        // gagal nyimpen ke localStorage gpp, gak fatal, cuma device gak ke-block
      }
    } catch {
      setErrorMsg("Koneksi gagal. Coba lagi.");
      setStage("error");
      submittingRef.current = false;
    }
  };

  const handleStartQuiz = () => setStage("nama");

  const handleSubmitNama = () => {
    if (nama.trim().length === 0) return;
    setStage("quiz");
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-bucin-red via-bucin-purple to-bucin-deepred bg-300% animate-gradientshift"
    >
      {stage === "landing" && <LandingScreen onStart={handleStartQuiz} />}

      {stage === "nama" && (
        <NamaScreen
          nama={nama}
          setNama={setNama}
          onSubmit={handleSubmitNama}
        />
      )}

      {stage === "quiz" && (
        <div className="w-full max-w-xl flex flex-col gap-5">
          <HeartbeatProgress current={currentQ + 1} total={totalQuestions} />
          <QuestionCard
            key={question.id}
            question={question}
            selected={answers[question.id]}
            onSelect={handleSelectOption}
          />
          {currentQ > 0 && (
            <button
              onClick={handleBack}
              className="text-white/80 text-sm font-medium text-center underline-offset-2 hover:underline"
            >
              ← Soal sebelumnya
            </button>
          )}
        </div>
      )}

      {stage === "loading" && (
        <div className="flex flex-col items-center gap-4">
          <span className="text-5xl animate-heartbeat">💗</span>
          <p className="font-display text-white text-lg font-medium">
            Menghitung tingkat kebucinan lo...
          </p>
        </div>
      )}

      {stage === "hasil" && hasil && <HasilScreen hasil={hasil} />}

      {stage === "error" && (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-5xl">😵</span>
          <p className="font-display text-white text-lg font-medium">
            {errorMsg}
          </p>
          <button
            onClick={() => setStage("quiz")}
            className="bg-white text-bucin-deepred font-display font-semibold px-6 py-3 rounded-full"
          >
            Coba lagi
          </button>
        </div>
      )}
    </main>
  );
}

function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center text-center max-w-md gap-5">
      <span className="text-6xl">💘</span>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-white text-shadow-soft leading-tight">
        Sensus Bucin
        <br />
        2026
      </h1>
      <p className="text-white/90 text-base leading-relaxed px-2">
        40 pertanyaan jujur-jujuran. No filter, no boong-boongan.
      </p>
      <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3 text-white/90 text-sm font-medium">
        20 tipe bucin · Tiap orang beda hasil
      </div>
      <button
        onClick={onStart}
        className="font-display bg-bucin-gold text-bucin-deepred font-bold text-lg px-10 py-4 rounded-full shadow-lg active:scale-95 transition-transform mt-2"
      >
        Mulai Sensus →
      </button>
      <Link
        href="/hasil"
        className="text-white/80 text-sm font-medium underline-offset-2 hover:underline"
      >
        Intip hasil orang lain dulu
      </Link>
    </div>
  );
}

function NamaScreen({
  nama,
  setNama,
  onSubmit,
}: {
  nama: string;
  setNama: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center max-w-sm w-full gap-5">
      <span className="text-5xl animate-wiggle">✍️</span>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-shadow-soft">
        Siapa nama lo?
      </h2>
      <input
        autoFocus
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        maxLength={50}
        placeholder="Nama / nickname kamu"
        className="w-full bg-white rounded-2xl px-5 py-4 text-bucin-deepred font-medium text-center text-lg placeholder:text-gray-400 outline-none focus:ring-4 focus:ring-bucin-gold/50"
      />
      <button
        onClick={onSubmit}
        disabled={nama.trim().length === 0}
        className="font-display w-full bg-bucin-gold text-bucin-deepred font-bold text-lg px-10 py-4 rounded-full shadow-lg active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"
      >
        Lanjut ke 40 Soal →
      </button>
    </div>
  );
}

function HasilScreen({ hasil }: { hasil: HasilData }) {
  return (
    <div className="flex flex-col items-center text-center max-w-md w-full gap-5">
      <span className="text-5xl">🏆</span>
      <p className="text-white/85 text-sm font-medium">
        Hasil Sensus Bucin untuk
      </p>
      <h2 className="font-display text-2xl font-bold text-white text-shadow-soft -mt-2">
        {hasil.nama}
      </h2>

      <div className="bg-white rounded-3xl card-shadow p-6 w-full">
        <p className="text-bucin-deepred/60 text-xs font-semibold uppercase tracking-wide mb-1">
          Golongan #{hasil.golongan.rank} dari 20
        </p>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-bucin-pink mb-3 leading-snug">
          {hasil.golongan.nama}
        </h3>
        <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
          {hasil.deskripsi}
        </p>
        <div className="flex items-center gap-3 bg-bucin-cream rounded-2xl px-4 py-3">
          <span className="text-2xl animate-heartbeat">💓</span>
          <div className="text-left">
            <p className="text-bucin-deepred font-display font-bold text-xl">
              {hasil.percentage}%
            </p>
            <p className="text-bucin-deepred/60 text-xs font-medium">
              tingkat kebucinan
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-5 w-full">
        <ShareButtons
          nama={hasil.nama}
          golonganNama={hasil.golongan.nama}
          percentage={hasil.percentage}
        />
      </div>

      <Link
        href="/hasil"
        className="font-display bg-white text-bucin-deepred font-bold px-8 py-3.5 rounded-full shadow-lg active:scale-95 transition-transform"
      >
        Lihat Hasil Responden Lain
      </Link>

      <a
        href="https://ceritagenz.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2.5 bg-[#6C63FF] text-white font-display font-bold text-base rounded-full py-4 shadow-lg active:scale-95 transition-transform"
      >
        <span className="text-xl">🗳️</span>
        Lo warganet golongan apa? Cek sekarang →
      </a>
    </div>
  );
}
