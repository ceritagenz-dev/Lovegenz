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
  { emoji: "🧊", label: "Es Batu",    delay: "0s" },
  { emoji: "😏", label: "Santuy",     delay: "0.4s" },
  { emoji: "😅", label: "Kepo Jaim",  delay: "0.8s" },
  { emoji: "💀", label: "Overthink",  delay: "1.2s" },
  { emoji: "🚨", label: "Bucin Akut", delay: "1.6s" },
];

const BASE_COUNT = 1000;

const HEART_PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${4 + (i * 6.8) % 92}%`,
  size: 13 + (i % 5) * 5,
  dur: `${8 + (i % 6) * 2.5}s`,
  delay: `-${(i * 2.1) % 12}s`,
  emoji: ["💗","💕","💓","💘","💖","🌸"][i % 6],
}));

const CONFETTI_COLORS = ["#FFD166","#FF3D7F","#A91079","#E0115F","#ffffff","#FF1493"];
const CONFETTI_PIECES = Array.from({ length: 30 }, (_, i) => ({
  id: i, left: `${(i*3.4)%100}%`,
  w: 5+(i%5)*2, circle: i%3!==0,
  ci: i%6, delay: `${(i*0.08).toFixed(2)}s`,
  dur: `${(2+i%6*0.3).toFixed(1)}s`,
}));

const HEADLINES = [
  "Hasil Kuis Bucin untuk","Sertifikat Bucin buat","Level Kebucinan",
  "Jejak Bucin Si Paling","Bukti Resmi Kebucinan","Data Bucin Milik",
  "Laporan Kebucinan dari","Rekam Jejak Bucin","Gelar Bucin Diraih",
  "Kartu Bucin atas Nama","Status Bucin Terkonfirmasi","Diagnosa Bucin untuk",
  "Hasil Kuis Bucin dari","Level Resmi Kebucinan","Rapor Bucin milik",
  "Cap Bucin Buat","Ini Hasilnya, Sis/Bro:","Udah Ketauan Level Lo",
  "Lo Resmi Masuk Golongan","Kebucinan Lo Terukur","Ini Faktanya tentang",
  "Buku Raport Bucin dari","Nilai Akhir Kebucinan","Tingkat Bucin Resmi",
  "Hasil Tes Kejujuran dari","Pengakuan Bucin Milik","Data Hati dari",
  "Profil Bucin untuk","Rekaman Perasaan dari","Kondisi Hati Terkini",
  "Fakta Bucin tentang","Profil Asmara dari","Status Kebucinan Level",
  "Ini Dia Hasilnya,","Sudah Tercatat:","Terbukti dan Tersimpan:",
  "Kebucinan Resmi Milik","Laporan Hati dari","Seberapa Bucin Si",
  "Hasil Kuis Jujur dari",
];
function pickHeadline(nama: string, pct: number) {
  return HEADLINES[(nama.length * 7 + pct * 3) % HEADLINES.length];
}

type Stage = "landing"|"nama"|"quiz"|"loading"|"hasil"|"error";
type HasilData = {
  nama: string;
  golongan: { rank: number; nama: string; tagline: string };
  deskripsi: string;
  percentage: number;
  totalScore: number;
};

// ─── Floating hearts ─────────────────────────────────────────────────────────
function FloatingHearts() {
  return (
    <>
      {HEART_PARTICLES.map((h) => (
        <span
          key={h.id}
          className="heart-particle select-none pointer-events-none"
          style={{
            left: h.left,
            bottom: "-40px",
            fontSize: h.size,
            animationDuration: h.dur,
            animationDelay: h.delay,
            zIndex: 0,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [stage, setStage]           = useState<Stage>("landing");
  const [nama, setNama]             = useState("");
  const [currentQ, setCurrentQ]     = useState(0);
  const [answers, setAnswers]       = useState<Record<number, string>>({});
  const [hasil, setHasil]           = useState<HasilData | null>(null);
  const [errorMsg, setErrorMsg]     = useState("");
  const [totalResponden, setTotalResponden] = useState<number | null>(null);
  const submittingRef  = useRef(false);
  const clickLockRef   = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) { const p: HasilData = JSON.parse(saved); setHasil(p); setStage("hasil"); }
    } catch {}
  }, []);

  useEffect(() => {
    fetch("/api/results?page=0", { cache: "no-store" })
      .then(r => r.json()).then(d => setTotalResponden(d.total ?? 0)).catch(() => {});
  }, []);

  const totalQ  = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[currentQ];

  const handleSelectOption = (label: string) => {
    if (submittingRef.current || clickLockRef.current) return;
    clickLockRef.current = true;
    const updated = { ...answers, [question.id]: label };
    setAnswers(updated);
    setTimeout(() => {
      clickLockRef.current = false;
      if (currentQ + 1 < totalQ) setCurrentQ(currentQ + 1);
      else submitQuiz(updated);
    }, 500);
  };

  const submitQuiz = async (fa: Record<number, string>) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStage("loading");
    try {
      const res  = await fetch("/api/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, answers: fa }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Gagal."); setStage("error"); submittingRef.current = false; return; }
      setHasil(data); setStage("hasil");
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
    } catch { setErrorMsg("Koneksi gagal."); setStage("error"); submittingRef.current = false; }
  };

  const handleBack = () => {
    if (currentQ > 0) { clickLockRef.current = false; setCurrentQ(currentQ - 1); }
  };

  return (
    <main className="love-bg relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      <FloatingHearts />
      <div className="relative z-10 w-full flex flex-col items-center">
        {stage === "landing" && <LandingScreen onStart={() => setStage("nama")} total={totalResponden} />}
        {stage === "nama"    && <NamaScreen nama={nama} setNama={setNama} onSubmit={() => nama.trim().length >= 3 && setStage("quiz")} />}
        {stage === "quiz"    && (
          <div className="w-full max-w-xl flex flex-col gap-3">
            <HeartbeatProgress current={currentQ + 1} total={totalQ} />
            {currentQ > 0 && (
              <div className="flex justify-start">
                <button onClick={handleBack}
                  className="flex items-center gap-1.5 text-white/80 text-xs font-semibold border border-white/25 rounded-full px-3.5 py-1.5 glass-dark active:scale-95 transition-transform">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>
                  </svg>
                  Putar balik
                </button>
              </div>
            )}
            <div className="mt-1">
              <QuestionCard key={question.id} question={question} selected={answers[question.id]} onSelect={handleSelectOption} />
            </div>
          </div>
        )}
        {stage === "loading" && <LoadingScreen />}
        {stage === "hasil"   && hasil && <HasilScreen hasil={hasil} />}
        {stage === "error"   && (
          <div className="flex flex-col items-center gap-5 text-center">
            <span className="text-5xl">😵</span>
            <p className="font-display text-white text-lg font-semibold">{errorMsg}</p>
            <button onClick={() => setStage("quiz")} className="bg-white text-bucin-deepred font-display font-bold px-6 py-3 rounded-full">Coba lagi</button>
          </div>
        )}
      </div>
    </main>
  );
}

// ─── Landing ──────────────────────────────────────────────────────────────────
function LandingScreen({ onStart, total }: { onStart: () => void; total: number | null }) {
  const count = (total ?? 0) + BASE_COUNT;
  const social = `${count.toLocaleString("id-ID")}+ warganet udah terdata 🔥`;
  return (
    <div className="flex flex-col items-center text-center max-w-md gap-5 w-full">
      {/* Hero emoji */}
      <div className="relative">
        <span className="text-7xl block animate-fade-in-up drop-shadow-2xl" style={{ filter: "drop-shadow(0 0 20px rgba(255,61,127,0.6))" }}>
          💘
        </span>
      </div>

      {/* Title with gradient */}
      <div className="animate-fade-in-up" style={{ animationDelay: "80ms", opacity: 0 }}>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold leading-tight text-shadow-glow" style={{ color: "#fff" }}>
          Kuis Bucin
        </h1>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight gradient-title">
          2026
        </h1>
      </div>

      {/* Description */}
      <p className="text-white/85 text-base leading-loose px-2 animate-fade-in-up" style={{ animationDelay: "160ms", opacity: 0 }}>
        40 pertanyaan jujur-jujuran. No filter, no boong-boongan.
        <br />
        <span className="text-white/60 text-sm font-medium">⏱ Kurang dari 3 menit</span>
      </p>

      {/* Tipe preview */}
      <div className="flex gap-2.5 justify-center flex-wrap animate-fade-in-up" style={{ animationDelay: "240ms", opacity: 0 }}>
        {TIPE_PREVIEW.map(t => (
          <div key={t.label} className="glass-dark rounded-2xl px-3 py-2.5 flex flex-col items-center gap-1.5 hover:scale-105 transition-transform" style={{ minWidth: 60 }}>
            <span className="text-xl animate-icon-pop" style={{ animationDelay: t.delay }}>{t.emoji}</span>
            <span className="text-white/80 text-[11px] font-semibold leading-none">{t.label}</span>
          </div>
        ))}
      </div>

      {/* Badge */}
      <div className="glass-dark rounded-2xl px-5 py-2.5 text-white/85 text-sm font-medium animate-fade-in-up" style={{ animationDelay: "300ms", opacity: 0 }}>
        Temukan apakah lo masuk &ldquo;Bucin Akut&rdquo; atau malah si &ldquo;Es Batu&rdquo;
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="btn-shimmer font-display font-extrabold text-lg px-12 py-4 rounded-full animate-breathe animate-fade-in-up active:scale-95 transition-transform"
        style={{ animationDelay: "380ms", opacity: 0, background: "linear-gradient(135deg, #FFD166 0%, #FFBC1F 100%)", color: "#8B0045", boxShadow: "0 4px 24px rgba(255,209,102,0.5), 0 0 0 1px rgba(255,209,102,0.3)" }}
      >
        Mulai Kuis →
      </button>

      {/* Social proof */}
      <p className="font-semibold text-sm animate-fade-in-up" style={{ animationDelay: "430ms", opacity: 0, color: "#FFD166", textShadow: "0 0 12px rgba(255,209,102,0.5)" }}>
        {social}
      </p>

      {/* Intip */}
      <Link href="/hasil"
        className="font-semibold text-sm border-2 rounded-full px-5 py-2 transition-colors hover:bg-white/10 animate-fade-in-up animate-heartbeat"
        style={{ animationDelay: "480ms", opacity: 0, borderColor: "rgba(255,255,255,0.4)", color: "rgba(255,255,255,0.85)", display: "inline-block" }}>
        Intip hasil orang lain dulu →
      </Link>
    </div>
  );
}

// ─── Nama ─────────────────────────────────────────────────────────────────────
function NamaScreen({ nama, setNama, onSubmit }: { nama: string; setNama: (v: string) => void; onSubmit: () => void }) {
  const [warning, setWarning] = useState("");
  const MAX = 20;
  const handleChange = (val: string) => {
    const filtered = val.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    if (val !== filtered) { setWarning("Nama hanya bisa berisi huruf ya 😅"); setTimeout(() => setWarning(""), 2000); }
    setNama(filtered.slice(0, MAX));
  };
  const tooShort = nama.trim().length > 0 && nama.trim().length < 3;

  return (
    <div className="flex flex-col items-center text-center max-w-sm w-full gap-5">
      <span className="text-5xl animate-wiggle" style={{ filter: "drop-shadow(0 0 12px rgba(255,61,127,0.5))" }}>👋</span>
      <h2 className="font-display text-3xl font-extrabold text-white text-shadow-soft">Siapa nama lo?</h2>
      <div className="w-full relative">
        <input
          autoFocus type="text" value={nama}
          onChange={e => handleChange(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onSubmit()}
          maxLength={MAX} placeholder="Nama samaran lo..."
          className="w-full rounded-2xl px-5 py-4 text-lg font-semibold text-center placeholder:text-pink-300 outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.95)",
            color: "#8B0045",
            border: tooShort ? "2px solid #f87171" : "2px solid transparent",
            boxShadow: "0 4px 24px rgba(194,24,91,0.25), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        />
        <span className="absolute bottom-3 right-4 text-xs font-semibold" style={{ color: nama.length >= MAX ? "#f87171" : "rgba(194,24,91,0.4)" }}>
          {nama.length}/{MAX}
        </span>
      </div>
      {warning && <p className="text-yellow-300 text-sm font-medium -mt-2">{warning}</p>}
      {tooShort && !warning && <p className="text-red-300 text-sm font-medium -mt-2">Nama minimal 3 huruf ya 😅</p>}
      <button
        onClick={onSubmit} disabled={nama.trim().length < 3}
        className="btn-shimmer font-display w-full font-extrabold text-lg py-4 rounded-full active:scale-95 transition-transform disabled:opacity-50"
        style={{ background: "linear-gradient(135deg, #FFD166, #FFBC1F)", color: "#8B0045", boxShadow: "0 4px 24px rgba(255,209,102,0.4)" }}
      >
        Mulai Kuis →
      </button>
    </div>
  );
}

// ─── Loading ──────────────────────────────────────────────────────────────────
const HEART_POS = [
  { id:0,left:"8%", delay:"0s",   dur:"2.8s", size:"text-2xl" },
  { id:1,left:"25%",delay:"0.6s", dur:"3.2s", size:"text-3xl" },
  { id:2,left:"50%",delay:"1.1s", dur:"2.5s", size:"text-xl"  },
  { id:3,left:"72%",delay:"0.3s", dur:"3.5s", size:"text-2xl" },
  { id:4,left:"88%",delay:"1.8s", dur:"2.9s", size:"text-xl"  },
  { id:5,left:"18%",delay:"2.1s", dur:"3.1s", size:"text-3xl" },
];

function LoadingScreen() {
  const [idx, setIdx]   = useState(0);
  const [vis, setVis]   = useState(true);
  useEffect(() => {
    const iv = setInterval(() => {
      setVis(false);
      setTimeout(() => { setIdx(i => (i+1) % LOADING_TEXTS.length); setVis(true); }, 300);
    }, 2300);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="relative flex flex-col items-center gap-6 min-h-[200px] justify-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {HEART_POS.map(h => (
          <span key={h.id} className={`absolute bottom-0 ${h.size} animate-float-up`}
            style={{ left:h.left, animationDelay:h.delay, animationDuration:h.dur, opacity:0.25 }}>
            💗
          </span>
        ))}
      </div>
      <div className="relative z-10 pulse-ring">
        <span className="text-7xl animate-heartbeat-fast block" style={{ filter: "drop-shadow(0 0 20px rgba(255,61,127,0.7))" }}>💗</span>
      </div>
      <p className={`font-display text-white text-base sm:text-lg font-semibold text-center px-6 max-w-xs transition-opacity duration-300 text-shadow-soft ${vis ? "opacity-100" : "opacity-0"}`}>
        {LOADING_TEXTS[idx]}
      </p>
    </div>
  );
}

// ─── Hasil ────────────────────────────────────────────────────────────────────
function HasilScreen({ hasil }: { hasil: HasilData }) {
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => { const t = setTimeout(() => setShowConfetti(false), 4500); return () => clearTimeout(t); }, []);
  const rankPct  = Math.round((hasil.golongan.rank / 20) * 100);
  const headline = pickHeadline(hasil.nama, hasil.percentage);

  return (
    <div className="flex flex-col items-center text-center max-w-md w-full gap-5">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {CONFETTI_PIECES.map(p => (
            <div key={p.id} className="absolute animate-confetti"
              style={{ left:p.left, top:"-40px", width:p.w, height:p.w,
                borderRadius: p.circle ? "50%" : "2px",
                background: CONFETTI_COLORS[p.ci],
                animationDelay:p.delay, animationDuration:p.dur }} />
          ))}
        </div>
      )}

      {/* Trophy */}
      <span className="text-5xl" style={{ filter: "drop-shadow(0 0 16px rgba(255,209,102,0.6))" }}>🏆</span>
      <p className="text-white/80 text-sm font-medium">{headline}</p>
      <h2 className="font-display text-2xl font-extrabold text-white text-shadow-glow -mt-2">{hasil.nama}</h2>

      {/* Main card */}
      <div className="love-card p-6 w-full overflow-hidden">
        {/* Pink gradient top accent */}
        <div className="h-1.5 rounded-full mb-4" style={{ background: "linear-gradient(90deg,#FFD166,#FF6B9D,#E0115F)" }} />

        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full" style={{ background: "#FFF0F3", color: "#C2185B" }}>
            Golongan #{hasil.golongan.rank} dari 20
          </span>
          <div className="flex gap-0.5">
            {Array.from({length:10},(_,i) => (
              <div key={i} className="w-1.5 h-4 rounded-full"
                style={{ background: (i+1)*10 <= rankPct ? "#FF3D7F" : "rgba(194,24,91,0.12)" }} />
            ))}
          </div>
        </div>

        <p className="text-xs font-semibold mb-3 text-left" style={{ color: "#FF3D7F" }}>
          {hasil.golongan.rank <= 5  ? "Hati lo masih bersih ✨ Gak ada virus bucin di sini"
          : hasil.golongan.rank <= 10 ? "Agak kena dikit, tapi masih bisa diselamatin 😅"
          : hasil.golongan.rank <= 15 ? "Waduh, gawat! 😂 Level kebucinan lo udah cukup parah nih"
          : "MAYDAY MAYDAY 🚨 Bucin level kritis terdeteksi!"}
        </p>

        <h3 className="font-display font-extrabold mb-4 leading-tight uppercase tracking-tight"
          style={{ fontSize: "clamp(1.4rem,6vw,2rem)", color: "#FF3D7F",
            textShadow: "2px 3px 0 rgba(169,16,121,0.25), 0 0 20px rgba(255,61,127,0.12)",
            transform: "rotate(-1deg)", display: "inline-block" }}>
          {hasil.golongan.nama}
        </h3>

        <p className="mb-5 text-[15px]" style={{ color: "rgba(139,0,69,0.75)", lineHeight: 1.65 }}>
          {hasil.deskripsi}
        </p>

        {/* Percentage + bar */}
        <div className="rounded-2xl px-4 pt-3 pb-4" style={{ background: "linear-gradient(135deg, #FFF0F3, #FFE4EE)" }}>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-2xl animate-heartbeat">💓</span>
            <div className="text-left">
              <p className="font-display font-bold text-xl" style={{ color: "#C2185B" }}>{hasil.percentage}%</p>
              <p className="text-xs font-medium" style={{ color: "rgba(194,24,91,0.6)" }}>tingkat kebucinan</p>
            </div>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,61,127,0.15)" }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${hasil.percentage}%`, background: "linear-gradient(90deg,#FFD166,#FF6B9D,#E0115F)" }} />
          </div>
        </div>
      </div>

      {/* Share section */}
      <div className="glass-dark rounded-3xl p-5 w-full">
        <ShareButtons nama={hasil.nama} golonganNama={hasil.golongan.nama} percentage={hasil.percentage} />
      </div>

      <p className="text-white/60 text-xs font-medium -mb-1">Cek seberapa parah kebucinan warga lain...</p>

      <Link href="/hasil"
        className="font-display font-bold px-8 py-3.5 rounded-full animate-breathe"
        style={{ display:"inline-block", background:"#fff", color:"#C2185B",
          boxShadow:"0 4px 24px rgba(255,255,255,0.25), 0 0 0 1px rgba(255,255,255,0.15)" }}>
        Lihat Hasil Responden Lain
      </Link>

      <a href="https://ceritagenz.vercel.app/" target="_blank" rel="noopener noreferrer"
        className="btn-shimmer w-full flex items-center justify-center gap-2.5 font-display font-bold text-base rounded-full py-4 active:scale-95 transition-transform mt-3"
        style={{ background:"linear-gradient(135deg,#6C63FF,#4F46E5)", color:"#fff",
          boxShadow:"0 4px 20px rgba(108,99,255,0.45)" }}>
        <span className="text-xl">🗳️</span>
        Lo warganet golongan apa? Cek sekarang →
      </a>
    </div>
  );
}
