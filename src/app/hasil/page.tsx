"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ResultItem = {
  id: string;
  created_at: string;
  nama: string;
  golongan_nama: string;
  golongan_rank: number;
  deskripsi: string;
  percentage: number;
};

const GOLONGAN_EMOJI: Record<string, string> = {
  "Hati Es Batu": "🧊",
  "Santuy Society": "😌",
  "Kepo Tapi Jaim": "🫣",
  "Tim Fast Respon": "⚡",
  "Notif Diprioritasin": "🔔",
  "Senyum Sendiri Gang": "😄",
  "Stalker Bersertifikat": "👁️",
  "Re-Read Chat Sampe Hafal": "📱",
  "Butuh Centang Biru Detik Ini": "🔵",
  "Tim Overthinking Sejagat": "🌀",
  "Rencana Auto Batal Demi Doi": "📅",
  "Panic Online Tapi Hening": "😰",
  "Sutradara Masa Depan": "🎬",
  "Pembela Tangguh Doi": "🛡️",
  "Bunglon Demi Doi": "🦎",
  "Detektif Circle Doi": "🔍",
  "Mode Darurat Asmara": "🚨",
  "Bahaya Tau Tapi Gas Aja": "⚠️",
  "Hampa Tanpa Kabar Doi": "💔",
  "Bucin Akut Tingkat Dewa": "👑",
};

function CircleProgress({ pct }: { pct: number }) {
  const size = 44;
  const r = (size - 5) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="rgba(194,24,91,0.12)" strokeWidth={4}
      />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="#FF3D7F" strokeWidth={4}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
      />
    </svg>
  );
}

type FilterType = "terbaru" | "terbucin";

export default function HasilPage() {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("terbaru");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/results?page=0`, { cache: "no-store" });
      const data = await res.json();
      setResults(data.results || []);
      setTotal(data.total || 0);
      setLoading(false);
    })();
  }, []);

  const sorted =
    filter === "terbucin"
      ? [...results].sort((a, b) => b.percentage - a.percentage)
      : results;

  return (
    <main className="min-h-screen bg-gradient-to-br from-bucin-red via-bucin-purple to-bucin-deepred bg-300% animate-gradientshift px-4 py-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-white/85 text-sm font-medium underline-offset-2 hover:underline"
          >
            ← Kembali
          </Link>
          <span className="text-white/85 text-sm font-medium">
            {total} responden
          </span>
        </div>

        <div className="text-center mb-1">
          <h1 className="font-display text-3xl font-bold text-white text-shadow-soft">
            Kuis Bucin 2026
          </h1>
          <p className="text-white/80 text-sm mt-1">
            10 hasil terbaru, yang paling baru ngisi muncul di atas
          </p>
        </div>

        {/* Filter toggle */}
        <div className="flex bg-white/15 backdrop-blur-sm rounded-full p-1 self-center gap-1">
          {(["terbaru", "terbucin"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === f
                  ? "bg-white text-bucin-deepred shadow"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {f === "terbaru" ? "🕐 Terbaru" : "🔥 Terbucin"}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-16">
            <span className="text-4xl animate-heartbeat">💗</span>
            <p className="text-white/85 text-sm">Memuat data responden...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && results.length === 0 && (
          <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 text-center">
            <p className="text-white text-base font-medium">
              Belum ada yang ngisi kuis nih.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 font-display bg-bucin-gold text-bucin-deepred font-bold px-6 py-3 rounded-full"
            >
              Jadi yang pertama →
            </Link>
          </div>
        )}

        {/* Result cards */}
        <div className="flex flex-col gap-3">
          {sorted.map((item, i) => (
            <ResultCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Cross promo */}
        {results.length > 0 && (
          <a
            href="https://ceritagenz.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 bg-[#6C63FF] text-white font-display font-bold text-base rounded-full py-4 shadow-lg active:scale-95 transition-transform animate-breathe mt-2"
          >
            <span className="text-xl">🗳️</span>
            Lo warganet golongan apa? Cek sekarang →
          </a>
        )}
      </div>
    </main>
  );
}

function ResultCard({ item, index }: { item: ResultItem; index: number }) {
  const emoji = GOLONGAN_EMOJI[item.golongan_nama] ?? "💘";
  return (
    <div
      className="bg-white rounded-2xl card-shadow p-4 sm:p-5 animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
    >
      <div className="flex items-center gap-3 mb-2">
        {/* Circle progress */}
        <div className="relative flex-shrink-0">
          <CircleProgress pct={item.percentage} />
          <span
            className="absolute inset-0 flex items-center justify-center font-display font-bold text-[11px] text-bucin-deepred"
          >
            {item.percentage}%
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-bucin-deepred text-base leading-tight truncate">
            {item.nama}
          </p>
          <p className="text-bucin-pink font-display font-semibold text-sm flex items-center gap-1">
            <span>{emoji}</span>
            <span className="truncate">{item.golongan_nama}</span>
          </p>
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{item.deskripsi}</p>
    </div>
  );
}
