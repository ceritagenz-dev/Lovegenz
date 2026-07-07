"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { QUIZ_QUESTIONS } from "@/lib/questions";
import HeartbeatProgress from "@/components/HeartbeatProgress";
import QuestionCard from "@/components/QuestionCard";
import ShareButtons from "@/components/ShareButtons";

const STORAGE_KEY = "sensusBucin2026_hasil";

const LOADING_TEXTS = [
  "Lagi nge-analisis chat terakhir lo...",
  "Ngitung seberapa sering lo kepo story doi...",
  "Sistem lagi berdebar-debar nih...",
  "Lagi scroll TL doi dulu bentar...",
  "Proses pembuktian bucin sedang berjalan...",
  "Lagi cek read receipt lo yang ke-47...",
  "Menimbang skala ke-bucin-an lo...",
];

const TIPE_PREVIEW = [
  { emoji: "🧊", label: "Es Batu", delay: "0s" },
  { emoji: "😏", label: "Santuy", delay: "0.3s" },
  { emoji: "😅", label: "Kepo Jaim", delay: "0.6s" },
  { emoji: "💀", label: "Overthink", delay: "0.9s" },
  { emoji: "🚨", label: "Bucin Akut", delay: "1.2s" },
];

// Base offset biar angka keliatan lebih besar (menambah ke jumlah real)
const BASE_COUNT = 1000;

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
  const [totalResponden, setTotalResponden] = useState<number | null>(null);
  const submittingRef = useRef(false);
  const clickLockRef = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: HasilData = JSON.parse(saved);
        setHasil(parsed);
        setStage("hasil");
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetch("/api/results?page=0", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setTotalResponden(d.total ?? 0))
      .catch(() => {});
  }, []);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[currentQ];

  const handleSelectOption = (label: string) => {
    if (submittingRef.current || clickLockRef.current) return;
    clickLockRef.current = true;

    const updated = { ...answers, [question.id]: label };
    setAnswers(updated);

    setTimeout(() => {
      clickLockRef.current = false;
      if (currentQ + 1 < totalQuestions) {
        setCurrentQ(currentQ + 1);
      } else {
        submitQuiz(updated);
      }
    }, 500);
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
      } catch {}
    } catch {
      setErrorMsg("Koneksi gagal. Coba lagi.");
      setStage("error");
      submittingRef.current = false;
    }
  };

  const handleStartQuiz = () => setStage("nama");

  const handleSubmitNama = () => {
    if (nama.trim().length < 3) return;
    setStage("quiz");
  };

  const handleBack = () => {
    if (currentQ > 0) {
      clickLockRef.current = false; // reset lock saat navigasi balik
      setCurrentQ(currentQ - 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 < totalQuestions) {
      setCurrentQ(currentQ + 1);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-bucin-red via-bucin-purple to-bucin-deepred bg-300% animate-gradientshift">
      {stage === "landing" && (
        <LandingScreen onStart={handleStartQuiz} totalResponden={totalResponden} />
      )}

      {stage === "nama" && (
        <NamaScreen nama={nama} setNama={setNama} onSubmit={handleSubmitNama} />
      )}

      {stage === "quiz" && (
        <div className="w-full max-w-xl flex flex-col gap-3">
          <HeartbeatProgress current={currentQ + 1} total={totalQuestions} />

          {/* Back button */}
          {currentQ > 0 && (
            <div className="flex justify-start">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-white/85 text-xs font-semibold border border-white/30 rounded-full px-3.5 py-1.5 active:scale-95 transition-transform hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 14 4 9l5-5"/>
                  <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>
                </svg>
                Putar balik
              </button>
            </div>
          )}

          <div className="mt-1">
            <QuestionCard
              key={question.id}
              question={question}
              selected={answers[question.id]}
              onSelect={handleSelectOption}
            />
          </div>
        </div>
      )}

      {stage === "loading" && <LoadingScreen />}

      {stage === "hasil" && hasil && <HasilScreen hasil={hasil} />}

      {stage === "error" && (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-5xl">😵</span>
          <p className="font-display text-white text-lg font-medium">{errorMsg}</p>
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

// ─── Landing ────────────────────────────────────────────────────────────────

function LandingScreen({
  onStart,
  totalResponden,
}: {
  onStart: () => void;
  totalResponden: number | null;
}) {
  const displayCount = (totalResponden ?? 0) + BASE_COUNT;
  const socialProof = `${displayCount.toLocaleString("id-ID")}+ warganet udah terdata 🔥`;

  return (
    <div className="flex flex-col items-center text-center max-w-md gap-5">
      <span className="text-6xl animate-fade-in-up" style={{ animationDelay: "0ms" }}>
        💘
      </span>

      <h1
        className="font-display text-4xl sm:text-5xl font-bold text-white text-shadow-soft leading-tight animate-fade-in-up"
        style={{ animationDelay: "80ms", opacity: 0 }}
      >
        Kuis Bucin
        <br />
        2026
      </h1>

      <p
        className="text-white/90 text-base leading-loose px-2 animate-fade-in-up"
        style={{ animationDelay: "160ms", opacity: 0 }}
      >
        40 pertanyaan jujur-jujuran. No filter, no boong-boongan.
        <br />
        <span className="text-white/75 text-sm">⏱ Kurang dari 3 menit</span>
      </p>

      {/* Tipe bucin preview — dengan shadow elevasi */}
      <div
        className="flex gap-3 justify-center flex-wrap animate-fade-in-up"
        style={{ animationDelay: "240ms", opacity: 0 }}
      >
        {TIPE_PREVIEW.map((t) => (
          <div
            key={t.label}
            className="flex flex-col items-center gap-1 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md hover:scale-105 transition-transform"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
          >
            <span
              className="text-xl animate-icon-pop"
              style={{ animationDelay: t.delay }}
            >
              {t.emoji}
            </span>
            <span className="text-white/90 text-[11px] font-semibold">{t.label}</span>
          </div>
        ))}
      </div>

      {/* Badge text */}
      <div
        className="bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-2.5 text-white/90 text-sm font-medium animate-fade-in-up"
        style={{ animationDelay: "300ms", opacity: 0 }}
      >
        Temukan apakah lo masuk kategori &ldquo;Bucin Akut&rdquo; atau malah si &ldquo;Es Batu&rdquo;
      </div>

      {/* Mulai Kuis — breathing glow */}
      <button
        onClick={onStart}
        className="font-display bg-bucin-gold text-bucin-deepred font-bold text-lg px-10 py-4 rounded-full shadow-lg active:scale-95 transition-transform mt-1 animate-breathe animate-fade-in-up"
        style={{ animationDelay: "380ms", opacity: 0 }}
      >
        Mulai Kuis →
      </button>

      {/* Social proof — lebih bold dan mencolok */}
      <p
        className="text-white font-bold text-sm -mt-2 animate-fade-in-up"
        style={{ animationDelay: "430ms", opacity: 0, textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}
      >
        {socialProof}
      </p>

      {/* Intip hasil — pill dengan border */}
      <Link
        href="/hasil"
        className="text-white/85 text-sm font-semibold border border-white/40 rounded-full px-5 py-2 hover:bg-white/10 transition-colors animate-fade-in-up animate-heartbeat"
        style={{ animationDelay: "480ms", opacity: 0, display: "inline-block" }}
      >
        Intip hasil orang lain dulu →
      </Link>
    </div>
  );
}

// ─── Nama ───────────────────────────────────────────────────────────────────

function NamaScreen({
  nama,
  setNama,
  onSubmit,
}: {
  nama: string;
  setNama: (v: string) => void;
  onSubmit: () => void;
}) {
  const [warning, setWarning] = useState("");
  const MAX = 20;

  const handleChange = (val: string) => {
    // Filter: huruf saja (termasuk huruf beraksent & spasi)
    const filtered = val.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    if (val !== filtered) {
      setWarning("Nama hanya bisa berisi huruf ya 😅");
      setTimeout(() => setWarning(""), 2000);
    }
    setNama(filtered.slice(0, MAX));
  };

  const tooLong = nama.trim().length > 18;
  const tooShort = nama.trim().length > 0 && nama.trim().length < 3;

  return (
    <div className="flex flex-col items-center text-center max-w-sm w-full gap-5">
      <span className="text-5xl animate-wiggle">👋</span>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-shadow-soft">
        Siapa nama lo?
      </h2>
      <div className="w-full relative">
        <input
          autoFocus
          type="text"
          value={nama}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          maxLength={MAX}
          placeholder="Nama samaran lo..."
          className={`w-full bg-white rounded-2xl px-5 py-4 text-bucin-deepred font-medium text-center text-lg placeholder:text-gray-400 outline-none transition-shadow ${
            tooLong
              ? "focus:ring-4 focus:ring-yellow-400/60 ring-2 ring-yellow-400"
              : tooShort
              ? "focus:ring-4 focus:ring-red-400/60 ring-2 ring-red-400"
              : "focus:ring-4 focus:ring-white/80"
          }`}
        />
        {/* Counter */}
        <span
          className={`absolute bottom-2.5 right-4 text-xs font-semibold ${
            nama.length >= MAX
              ? "text-red-400"
              : nama.length >= 16
              ? "text-yellow-500"
              : "text-gray-400"
          }`}
        >
          {nama.length}/{MAX}
        </span>
      </div>

      {/* Warning */}
      {warning && (
        <p className="text-yellow-300 text-sm font-medium -mt-2 animate-fade-in-up">
          {warning}
        </p>
      )}
      {tooShort && !warning && (
        <p className="text-red-300 text-sm font-medium -mt-2">
          Nama minimal 3 huruf ya 😅
        </p>
      )}
      {tooLong && !warning && !tooShort && (
        <p className="text-yellow-300 text-sm font-medium -mt-2">
          Nama kepanjangan, coba lebih singkat 😄
        </p>
      )}

      <button
        onClick={onSubmit}
        disabled={nama.trim().length < 3}
        className="font-display w-full bg-bucin-gold text-bucin-deepred font-bold text-lg px-10 py-4 rounded-full shadow-lg active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"
      >
        Mulai Kuis →
      </button>
    </div>
  );
}

// ─── Loading ─────────────────────────────────────────────────────────────────

const HEART_POS = [
  { id: 0, left: "10%", delay: "0s", dur: "2.8s", size: "text-2xl" },
  { id: 1, left: "30%", delay: "0.6s", dur: "3.2s", size: "text-3xl" },
  { id: 2, left: "55%", delay: "1.1s", dur: "2.5s", size: "text-xl" },
  { id: 3, left: "75%", delay: "0.3s", dur: "3.5s", size: "text-2xl" },
  { id: 4, left: "88%", delay: "1.8s", dur: "2.9s", size: "text-xl" },
  { id: 5, left: "20%", delay: "2.1s", dur: "3.1s", size: "text-3xl" },
];

function LoadingScreen() {
  const [textIdx, setTextIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTextIdx((i) => (i + 1) % LOADING_TEXTS.length);
        setVisible(true);
      }, 300);
    }, 2300);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center gap-5 min-h-[200px] justify-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {HEART_POS.map((h) => (
          <span
            key={h.id}
            className={`absolute bottom-0 ${h.size} text-white/30 animate-float-up`}
            style={{ left: h.left, animationDelay: h.delay, animationDuration: h.dur }}
          >
            💗
          </span>
        ))}
      </div>
      <span className="text-6xl animate-heartbeat-fast relative z-10">💗</span>
      <p
        className={`font-display text-white text-base sm:text-lg font-medium text-center px-4 max-w-xs transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {LOADING_TEXTS[textIdx]}
      </p>
    </div>
  );
}

// ─── Hasil ───────────────────────────────────────────────────────────────────

const CONFETTI_PIECES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 3.7) % 100}%`,
  width: 6 + (i % 5) * 2,
  isCircle: i % 3 !== 0,
  colorIdx: i % 6,
  delay: `${(i * 0.09).toFixed(2)}s`,
  duration: `${(2.2 + (i % 6) * 0.3).toFixed(1)}s`,
}));

const CONFETTI_COLORS = [
  "#FFD166", "#FF3D7F", "#A91079", "#E0115F", "#ffffff", "#FF1493",
];

const HEADLINES = [
  "Hasil Kuis Bucin untuk", "Sertifikat Bucin buat", "Level Kebucinan",
  "Jejak Bucin Si Paling", "Bukti Resmi Kebucinan", "Data Bucin Milik",
  "Laporan Kebucinan dari", "Rekam Jejak Bucin", "Gelar Bucin Diraih",
  "Kartu Bucin atas Nama", "Status Bucin Terkonfirmasi", "Diagnosa Bucin untuk",
  "Hasil Sensus Bucin dari", "Level Resmi Kebucinan", "Rapor Bucin milik",
  "Cap Bucin Buat", "Ini Hasilnya, Sis/Bro:", "Udah Ketauan Level Lo",
  "Lo Resmi Masuk Golongan", "Kebucinan Lo Terukur", "Ini Faktanya tentang",
  "Buku Raport Bucin dari", "Nilai Akhir Kebucinan", "Tingkat Bucin Resmi",
  "Hasil Tes Kejujuran dari", "Pengakuan Bucin Milik", "Data Hati dari",
  "Profil Bucin untuk", "Rekaman Perasaan dari", "Kondisi Hati Terkini",
  "Fakta Bucin tentang", "Profil Asmara dari", "Status Kebucinan Level",
  "Ini Dia Hasilnya,", "Sudah Tercatat:", "Terbukti dan Tersimpan:",
  "Kebucinan Resmi Milik", "Laporan Hati dari", "Seberapa Bucin Si",
  "Hasil Kuis Jujur dari",
];

function pickHeadline(nama: string, percentage: number): string {
  const idx = (nama.length * 7 + percentage * 3) % HEADLINES.length;
  return HEADLINES[idx];
}

function HasilScreen({ hasil }: { hasil: HasilData }) {
  const [showConfetti, setShowConfetti] = useState(true);
  const headline = pickHeadline(hasil.nama, hasil.percentage);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const rankPct = Math.round((hasil.golongan.rank / 20) * 100);

  return (
    <div className="flex flex-col items-center text-center max-w-md w-full gap-5">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {CONFETTI_PIECES.map((p) => (
            <div
              key={p.id}
              className="absolute animate-confetti"
              style={{
                left: p.left,
                top: "-40px",
                width: p.width,
                height: p.width,
                borderRadius: p.isCircle ? "50%" : "2px",
                background: CONFETTI_COLORS[p.colorIdx],
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>
      )}

      <span className="text-5xl">🏆</span>
      <p className="text-white/85 text-sm font-medium">{headline}</p>
      <h2 className="font-display text-2xl font-bold text-white text-shadow-soft -mt-2">
        {hasil.nama}
      </h2>

      <div className="bg-white rounded-3xl card-shadow p-6 w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-bucin-cream text-bucin-deepred text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
            Golongan #{hasil.golongan.rank} dari 20
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="w-1.5 h-4 rounded-full"
                style={{
                  background: (i + 1) * 10 <= rankPct ? "#FF3D7F" : "rgba(194,24,91,0.12)",
                }}
              />
            ))}
          </div>
        </div>
        {/* Engaging micro-copy */}
        <p className="text-[11px] text-bucin-pink font-semibold mb-3 text-left">
          {hasil.golongan.rank <= 5
            ? "Hati lo masih bersih ✨ Gak ada virus bucin di sini"
            : hasil.golongan.rank <= 10
            ? "Agak kena dikit, tapi masih bisa diselamatin 😅"
            : hasil.golongan.rank <= 15
            ? "Waduh, gawat! 😂 Level kebucinan lo udah cukup parah nih"
            : "MAYDAY MAYDAY 🚨 Bucin level kritis terdeteksi!"}
        </p>
        {/* Golongan name — extra bold, bigger */}
        <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-bucin-pink mb-3 leading-tight">
          {hasil.golongan.nama}
        </h3>
        {/* Description — darker for better contrast */}
        <p className="text-bucin-deepred/75 text-[15px] leading-relaxed mb-5">{hasil.deskripsi}</p>

        {/* Percentage + Progress Bar — more bottom padding */}
        <div className="bg-bucin-cream rounded-2xl px-4 pt-3 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl animate-heartbeat">💓</span>
            <div className="text-left">
              <p className="text-bucin-deepred font-display font-bold text-xl">
                {hasil.percentage}%
              </p>
              <p className="text-bucin-deepred/60 text-xs font-medium">tingkat kebucinan</p>
            </div>
          </div>
          <div className="h-2.5 rounded-full bg-bucin-pink/20 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${hasil.percentage}%`,
                background: "linear-gradient(90deg, #FFD166, #FF3D7F, #E0115F)",
              }}
            />
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

      <p className="text-white/70 text-xs font-medium -mb-1">
        Cek seberapa parah kebucinan warga lain...
      </p>

      <Link
        href="/hasil"
        className="font-display bg-white text-bucin-deepred font-bold px-8 py-3.5 rounded-full animate-breathe"
        style={{ display: "inline-block", boxShadow: "0 4px 20px rgba(255,255,255,0.3), 0 0 0 1px rgba(255,255,255,0.1)" }}
      >
        Lihat Hasil Responden Lain
      </Link>

      <a
        href="https://ceritagenz.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2.5 bg-[#6C63FF] text-white font-display font-bold text-base rounded-full py-4 active:scale-95 transition-transform mt-3"
        style={{ boxShadow: "0 4px 20px rgba(108,99,255,0.4)" }}
      >
        <span className="text-xl">🗳️</span>
        Lo warganet golongan apa? Cek sekarang →
      </a>
    </div>
  );
}
