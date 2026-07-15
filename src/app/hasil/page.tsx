"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GOLONGAN_EMOJI } from "@/lib/golonganEmoji";

type ResultItem = {
  id: string; created_at: string; nama: string;
  golongan_nama: string; golongan_rank: number;
  deskripsi: string; percentage: number;
};

const TOP3 = [
  { border:"#FBBF24", bg:"rgba(254,243,199,0.9)", badge:"🥇" },
  { border:"#9CA3AF", bg:"rgba(243,244,246,0.9)", badge:"🥈" },
  { border:"#F97316", bg:"rgba(255,237,213,0.9)", badge:"🥉" },
];

function timeAgo(d: string) {
  const ms = Date.now() - new Date(d).getTime();
  const m = Math.floor(ms/60000), h = Math.floor(m/60), day = Math.floor(h/24);
  if (m<1) return "Baru saja";
  if (m<60) return `${m} menit lalu`;
  if (h<24) return `${h} jam lalu`;
  if (day<7) return `${day} hari lalu`;
  return new Date(d).toLocaleDateString("id-ID",{day:"numeric",month:"short"});
}

function CircleProgress({ pct }: { pct: number }) {
  const s=44, r=(s-5)/2, c=2*Math.PI*r, d=(pct/100)*c;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{transform:"rotate(-90deg)"}}>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke="rgba(194,24,91,0.1)" strokeWidth={4}/>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke="#FF3D7F" strokeWidth={4}
        strokeDasharray={`${d} ${c}`} strokeLinecap="round"/>
    </svg>
  );
}

type Filter = "terbaru"|"terbucin";

export default function HasilPage() {
  const [results, setResults]     = useState<ResultItem[]>([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState<Filter>("terbaru");
  const [fading, setFading]       = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res  = await fetch(`/api/results?page=0&t=${Date.now()}`, { cache:"no-store" });
      const data = await res.json();
      setResults(data.results||[]); setTotal(data.total||0); setLoading(false);
    })();
  }, []);

  const changeFilter = (f: Filter) => {
    if (f===filter) return;
    setFading(true);
    setTimeout(() => { setFilter(f); setFading(false); }, 180);
  };

  const sorted = filter==="terbucin"
    ? [...results].sort((a,b) => b.percentage-a.percentage)
    : results;

  return (
    <main className="love-bg relative min-h-screen px-4 py-8 overflow-hidden">
      {/* Subtle bg hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[0,1,2,3,4].map(i => (
          <span key={i} className="heart-particle" style={{
            left:`${10+i*20}%`, bottom:"-30px", fontSize:16+i*4,
            animationDuration:`${10+i*3}s`, animationDelay:`-${i*2}s`, opacity:0 }}>
            💕
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/80 text-sm font-semibold hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Kembali
          </Link>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"/>
            </span>
            <span className="text-white/80 text-sm font-semibold">{total} responden</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-3xl animate-heartbeat" style={{filter:"drop-shadow(0 0 10px rgba(255,61,127,0.6))"}}>💘</span>
            <h1 className="font-display text-3xl font-extrabold text-white text-shadow-glow">Kuis Bucin 2026</h1>
            <span className="text-3xl animate-heartbeat" style={{animationDelay:"0.7s",filter:"drop-shadow(0 0 10px rgba(255,61,127,0.6))"}}>💘</span>
          </div>
          <p className="text-white/65 text-sm">10 hasil terbaru · yang paling baru ngisi muncul di atas</p>
        </div>

        {/* Filter */}
        <div className="flex glass-dark rounded-full p-1 self-center gap-1">
          {(["terbaru","terbucin"] as Filter[]).map(f => (
            <button key={f} onClick={() => changeFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter===f ? "bg-white text-bucin-deepred shadow-md" : "text-white/75 hover:text-white"}`}>
              {f==="terbaru" ? "🕐 Terbaru" : "👑 Top Bucin"}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-16">
            <span className="text-5xl animate-heartbeat-fast" style={{filter:"drop-shadow(0 0 16px rgba(255,61,127,0.6))"}}>💗</span>
            <p className="text-white/75 text-sm font-medium">Memuat data responden...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && results.length===0 && (
          <div className="glass-dark rounded-3xl p-10 text-center">
            <span className="text-5xl block mb-4">💔</span>
            <p className="text-white text-base font-semibold mb-4">Belum ada yang ngisi kuis nih.</p>
            <Link href="/" className="inline-block font-display font-bold px-6 py-3 rounded-full text-bucin-deepred"
              style={{background:"linear-gradient(135deg,#FFD166,#FFBC1F)"}}>
              Jadi yang pertama →
            </Link>
          </div>
        )}

        {/* Cards */}
        <div className={`flex flex-col gap-3 transition-opacity duration-200 ${fading ? "opacity-0" : "opacity-100"}`}>
          {sorted.map((item, i) => <ResultCard key={item.id} item={item} index={i} isTop={filter==="terbucin"} />)}
        </div>

        {/* Cross promo */}
        {results.length > 0 && (
          <a href="https://ceritagenz.vercel.app/" target="_blank" rel="noopener noreferrer"
            className="btn-shimmer w-full flex items-center justify-center gap-2.5 font-display font-bold text-base rounded-full py-4 active:scale-95 transition-transform mt-2"
            style={{background:"linear-gradient(135deg,#FFD166,#FFBC1F)",color:"#8B0045",
              boxShadow:"0 4px 20px rgba(255,209,102,0.4)"}}>
            <span className="text-xl">🗳️</span>
            Lo warganet golongan apa? Cek sekarang →
          </a>
        )}
      </div>
    </main>
  );
}

function ResultCard({ item, index, isTop }: { item:ResultItem; index:number; isTop:boolean }) {
  const emoji = GOLONGAN_EMOJI[item.golongan_nama] ?? "💘";
  const top   = isTop && index < 3 ? TOP3[index] : null;
  return (
    <div className="rounded-2xl p-4 sm:p-5 animate-fade-in-up"
      style={{
        animationDelay:`${index*55}ms`, opacity:0,
        background: top ? top.bg : "rgba(255,255,255,0.93)",
        border: `2px solid ${top ? top.border : "rgba(255,255,255,0.15)"}`,
        boxShadow: "0 4px 20px rgba(194,24,91,0.12), 0 1px 4px rgba(0,0,0,0.06)",
        backdropFilter: "blur(8px)",
      }}>
      <div className="flex items-center gap-3 mb-2">
        {/* Circle progress */}
        <div className="relative flex-shrink-0">
          <CircleProgress pct={item.percentage}/>
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-[11px]" style={{color:"#C2185B"}}>
            {item.percentage}%
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {top && <span className="text-base">{top.badge}</span>}
            <p className="font-display font-bold text-base leading-tight truncate" style={{color:"#8B0045"}}>{item.nama}</p>
          </div>
          <p className="font-semibold text-sm flex items-center gap-1" style={{color:"#FF3D7F"}}>
            <span>{emoji}</span>
            <span className="truncate">{item.golongan_nama}</span>
          </p>
        </div>
        <span className="text-[11px] font-medium flex-shrink-0" style={{color:"rgba(139,0,69,0.45)"}}>
          {timeAgo(item.created_at)}
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{color:"rgba(55,65,81,0.85)", lineHeight:1.6}}>{item.deskripsi}</p>
    </div>
  );
}
