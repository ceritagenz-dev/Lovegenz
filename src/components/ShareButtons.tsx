"use client";

import { useState } from "react";
import { GOLONGAN_EMOJI } from "@/lib/golonganEmoji";

type Props = {
  nama: string;
  golonganNama: string;
  percentage: number;
};

const SHARE_HEADERS = [
  "Kekuatan kebucinan lo udah resmi tercatat, sekarang waktunya pamer:",
  "Dunia harus tau lo ada di level ini. Pamer dulu:",
  "Hasil lo udah keluar — jangan disimpen sendiri:",
  "Circle lo harus tau ini. Gas share:",
  "Ini bukan malu, ini kebanggaan. Share sekarang:",
  "Seberapa bucin lo udah terbukti secara ilmiah. Sebar:",
  "Gelar resmi lo udah keluar. Waktunya pamer ke circle:",
  "Bukan rahasia lagi — ini saatnya lo jujur ke semua orang:",
  "Data lo udah masuk. Sekarang giliran orang lain tau:",
  "Lo udah berani jujur 40 soal, sekarang berani share:",
  "Hasil tes kejujuran lo siap dipamerin:",
  "Sertifikat kebucinan lo sudah terbit. Bagikan:",
  "Ini bukan aib, ini achievement. Pamerin:",
  "Level lo udah ketahuan — sekarang tantang doi tes juga:",
  "Kuis selesai, saatnya flex ke timeline:",
  "Fakta bucin lo udah resmi. Share ke yang penasaran:",
  "Lo udah berani tes, sekarang berani pamerin hasilnya:",
  "Jangan sendirian bucin-nya. Ajak yang lain tes juga:",
  "Ini moment paling jujur lo hari ini. Bagikan:",
  "Data kebucinan lo udah dikunci. Gas pamer:",
  "Hasilnya udah ada, tinggal lo yang berani share:",
  "Ini saat lo jujur ke circle soal kondisi hati lo:",
  "Golongan lo udah ketahuan. Kasih tau mereka juga:",
  "Lo udah berani ngisi 40 soal — sekarang berani share:",
  "Kalau doi lihat ini, salam dari hati lo yang jujur:",
  "Bukti resmi sudah ada. Saatnya dunia tau:",
  "Ini hasil lo. Ini kebenaran lo. Share dengan bangga:",
  "Makin banyak yang tau, makin seru. Gas share:",
  "Tes udah selesai — saatnya circle lo ikut tes juga:",
  "Lo jujur sama diri sendiri. Sekarang jujur ke timeline:",
  "Satu langkah lagi: kasih tau orang-orang di circle lo:",
  "Hasil real, bukan rekayasa. Share ke yang penasaran:",
  "Ini dia datanya. Siapa yang berani share pertama?",
  "Kebucinan lo sudah terkalkulasi. Waktunya viral:",
  "Data udah ada, caption tinggal lo yang buat:",
  "Pamerin hasilnya — biar teman lo ikut tes juga:",
  "Share ke doi, lihat reaksinya. Hehe:",
  "Level bucin lo — resmi, terukur, siap dibagikan:",
  "Ini hasil lo. Bangga atau malu, tetap share:",
  "Jangan jadi satu-satunya yang tau. Sebar:",
];

function pickShareHeader(nama: string, percentage: number): string {
  const idx = (nama.length * 11 + percentage * 7) % SHARE_HEADERS.length;
  return SHARE_HEADERS[idx];
}

const TWEET_CAPTION = (golonganNama: string, percentage: number) =>
  `Golongan gue udah keluar 😭🚩\n\n"${golonganNama}" — ${percentage}% tingkat kebucinan\n\nGolongan lo apa? Coba tes kalau berani, ini 40 soal yang bikin mikir ulang soal hubungan.`;

const WA_CAPTION = (nama: string, golonganNama: string, percentage: number, url: string) =>
  `Hasil KUIS BUCIN 2026 gue keluar 😭🚩\n\nNama: ${nama}\nGolongan: "${golonganNama}"\nTingkat kebucinan: ${percentage}%\n\nLo berani tes juga? 40 pertanyaan, gak ada ampun.\n👉 ${url}`;

// Helper: wrap text di canvas
function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(" ");
  let line = "";
  let lineCount = 0;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, y + lineCount * lineHeight);
      line = words[n] + " ";
      lineCount++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y + lineCount * lineHeight);
  return lineCount + 1;
}

async function generateShareImage(
  nama: string,
  golonganNama: string,
  percentage: number,
  url: string
): Promise<Blob | null> {
  try { await document.fonts.load("900 80px Poppins"); await document.fonts.load("700 32px Poppins"); } catch {}
  const canvas = document.createElement("canvas");
  const W = 1080, H = 1350;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const CX = W / 2;
  const emoji = GOLONGAN_EMOJI[golonganNama] ?? "💘";

  // ── OUTER CARD FRAME (rounded, so it reads as a premium sticker) ─────────
  const FR = 44; // frame radius
  ctx.save();
  ctx.beginPath(); ctx.roundRect(0, 0, W, H, FR); ctx.clip();

  // ── BASE BACKGROUND — smooth diagonal wash, no hard seam ─────────────────
  const base = ctx.createLinearGradient(0, 0, W * 0.35, H);
  base.addColorStop(0, "#3d0022");
  base.addColorStop(0.42, "#7a0048");
  base.addColorStop(0.72, "#b8005f");
  base.addColorStop(1, "#e0006e");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  // Soft blurred glow blobs for depth (real blur where supported)
  const blob = (x: number, y: number, r: number, color: string, alpha: number) => {
    ctx.save();
    try { ctx.filter = `blur(${r * 0.35}px)`; } catch {}
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color.replace("ALPHA", String(alpha)));
    g.addColorStop(1, color.replace("ALPHA", "0"));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  };
  blob(120, 160, 380, "rgba(255,107,157,ALPHA)", 0.45);
  blob(W - 100, 120, 320, "rgba(255,209,102,ALPHA)", 0.22);
  blob(CX, 560, 460, "rgba(255,61,127,ALPHA)", 0.30);
  blob(60, H - 260, 400, "rgba(216,0,110,ALPHA)", 0.4);

  // Fine dot-grid texture over the whole card
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  for (let x = 26; x < W; x += 52) for (let y = 26; y < H; y += 52) {
    ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill();
  }

  // Large faint decorative heart outline behind the hero ring
  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 26;
  ctx.beginPath();
  const hx = CX, hy = 330, hs = 430;
  ctx.moveTo(hx, hy + hs * 0.3);
  ctx.bezierCurveTo(hx, hy, hx - hs * 0.6, hy, hx - hs * 0.6, hy + hs * 0.3);
  ctx.bezierCurveTo(hx - hs * 0.6, hy + hs * 0.7, hx, hy + hs, hx, hy + hs);
  ctx.bezierCurveTo(hx, hy + hs, hx + hs * 0.6, hy + hs * 0.7, hx + hs * 0.6, hy + hs * 0.3);
  ctx.bezierCurveTo(hx + hs * 0.6, hy, hx, hy, hx, hy + hs * 0.3);
  ctx.stroke();
  ctx.restore();

  // Sparkle confetti — mixed glyphs, varied size/opacity for a livelier feel
  const sparkles: [number, number, number, number, string][] = [
    [70, 90, 26, 0.55, "✦"], [W - 80, 80, 20, 0.4, "✦"],
    [50, 640, 18, 0.35, "✦"], [W - 56, 600, 24, 0.5, "✦"],
    [120, 330, 16, 0.3, "✧"], [W - 140, 300, 22, 0.4, "✧"],
    [W - 200, 720, 30, 0.35, "💫"], [90, 760, 22, 0.3, "💗"],
  ];
  sparkles.forEach(([sx, sy, sz, op, glyph]) => {
    ctx.globalAlpha = op;
    ctx.fillStyle = glyph === "💫" || glyph === "💗" ? "#ffffff" : "rgba(255,209,102,1)";
    ctx.font = `${sz}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(glyph, sx, sy);
    ctx.globalAlpha = 1;
  });

  ctx.textAlign = "center";

  // ── APP BADGE ──────────────────────────────────────────────────────────
  ctx.font = "600 19px Poppins, sans-serif";
  const badgeLabel = "💘  KUIS BUCIN 2026";
  const bW = ctx.measureText(badgeLabel).width + 56, bH = 48, bX = CX - bW / 2, bY = 62;
  ctx.fillStyle = "rgba(255,255,255,0.10)";
  ctx.strokeStyle = "rgba(255,255,255,0.28)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(bX, bY, bW, bH, 24); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText(badgeLabel, CX, bY + 31);

  // ── AVATAR BUBBLE (initial) ──────────────────────────────────────────────
  const initial = (nama.trim()[0] || "?").toUpperCase();
  const avCX = CX, avCY = 202, avR = 58;
  const avGrad = ctx.createLinearGradient(avCX - avR, avCY - avR, avCX + avR, avCY + avR);
  avGrad.addColorStop(0, "#FFD166"); avGrad.addColorStop(1, "#FF3D7F");
  ctx.save();
  ctx.shadowColor = "rgba(255,61,127,0.6)"; ctx.shadowBlur = 30;
  ctx.beginPath(); ctx.arc(avCX, avCY, avR + 4, 0, Math.PI * 2);
  ctx.strokeStyle = avGrad; ctx.lineWidth = 4; ctx.stroke();
  ctx.restore();
  ctx.beginPath(); ctx.arc(avCX, avCY, avR, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.fill();
  ctx.font = "800 56px Poppins, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(initial, avCX, avCY + 20);

  // ── NAMA ──────────────────────────────────────────────────────────────
  const namaDisplay = nama.length > 18 ? nama.slice(0, 16) + "\u2026" : nama;
  ctx.font = "800 44px Poppins, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(255,61,127,0.6)"; ctx.shadowBlur = 18;
  ctx.fillText(namaDisplay, CX, 306);
  ctx.shadowBlur = 0;

  // ── PERCENTAGE — HERO RING ────────────────────────────────────────────
  const rCX = CX, rCY = 590, rR = 210, rLW = 20;

  // Outer soft halo behind the ring
  blob(rCX, rCY, rR + 90, "rgba(255,107,157,ALPHA)", 0.35);

  // Track
  ctx.beginPath(); ctx.arc(rCX, rCY, rR, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.10)"; ctx.lineWidth = rLW; ctx.stroke();

  // Progress arc
  const arcStart = -Math.PI / 2;
  const arcEnd = arcStart + (percentage / 100) * Math.PI * 2;
  const arcG = ctx.createLinearGradient(rCX - rR, rCY - rR, rCX + rR, rCY + rR);
  arcG.addColorStop(0, "#FFD166"); arcG.addColorStop(0.5, "#FF6B9D"); arcG.addColorStop(1, "#FF3D7F");
  ctx.save();
  ctx.shadowColor = "rgba(255,107,157,0.7)"; ctx.shadowBlur = 24;
  ctx.beginPath(); ctx.arc(rCX, rCY, rR, arcStart, arcEnd);
  ctx.strokeStyle = arcG; ctx.lineWidth = rLW; ctx.lineCap = "round"; ctx.stroke();
  ctx.restore();

  // Bright end-cap dot with glow
  const dotX = rCX + rR * Math.cos(arcEnd), dotY = rCY + rR * Math.sin(arcEnd);
  ctx.save();
  ctx.shadowColor = "rgba(255,209,102,0.9)"; ctx.shadowBlur = 20;
  ctx.beginPath(); ctx.arc(dotX, dotY, rLW * 0.62, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff"; ctx.fill();
  ctx.restore();
  ctx.beginPath(); ctx.arc(dotX, dotY, rLW * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = "#FFD166"; ctx.fill();

  // Inner thin ring for extra polish
  ctx.beginPath(); ctx.arc(rCX, rCY, rR - rLW / 2 - 10, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.16)"; ctx.lineWidth = 1.5; ctx.stroke();

  // Percentage number inside ring
  ctx.save();
  ctx.shadowColor = "rgba(255,61,127,0.55)"; ctx.shadowBlur = 30;
  const pctG = ctx.createLinearGradient(CX, rCY - 110, CX, rCY + 60);
  pctG.addColorStop(0, "#ffffff"); pctG.addColorStop(1, "#FFD9E7");
  ctx.fillStyle = pctG;
  ctx.font = "900 140px Poppins, sans-serif";
  ctx.fillText(percentage + "%", CX, rCY + 46);
  ctx.restore();
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "500 24px Poppins, sans-serif";
  ctx.fillText("tingkat kebucinan", CX, rCY + 88);

  // ── GOLONGAN — floating rounded card lifted off the background ──────────
  const cardM = 44, cardY = 900, cardH = H - cardY - 40, cardR = 40;
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.25)"; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14;
  const cardG = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
  cardG.addColorStop(0, "#FF5FA0"); cardG.addColorStop(1, "#D8006E");
  ctx.fillStyle = cardG;
  ctx.beginPath(); ctx.roundRect(cardM, cardY, W - cardM * 2, cardH, cardR); ctx.fill();
  ctx.restore();

  // subtle inner top highlight on the card
  ctx.save();
  ctx.beginPath(); ctx.roundRect(cardM, cardY, W - cardM * 2, cardH, cardR); ctx.clip();
  const hi = ctx.createLinearGradient(0, cardY, 0, cardY + 90);
  hi.addColorStop(0, "rgba(255,255,255,0.16)"); hi.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = hi; ctx.fillRect(cardM, cardY, W - cardM * 2, 90);
  ctx.restore();

  const innerCX = CX;
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "700 17px Poppins, sans-serif";
  ctx.fillText("G  O  L  O  N  G  A  N", innerCX, cardY + 46);

  // Big emoji badge
  ctx.font = "56px sans-serif";
  ctx.fillText(emoji, innerCX, cardY + 112);

  const gFs = golonganNama.length > 20 ? 42 : golonganNama.length > 14 ? 50 : 58;
  ctx.font = "900 " + gFs + "px Poppins, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(0,0,0,0.2)"; ctx.shadowBlur = 10;
  const mW = W - cardM * 2 - 80, ws = golonganNama.split(" ");
  let l1 = "", l2 = "";
  for (let i = 0; i < ws.length; i++) {
    const t = l1 + (l1 ? " " : "") + ws[i];
    if (ctx.measureText(t).width > mW && l1) { l2 = ws.slice(i).join(" "); break; }
    l1 = t;
  }
  const lH = gFs * 1.18, gTextY = cardY + 168 + (l2 ? 0 : lH / 2);
  ctx.fillText(l1, innerCX, gTextY);
  if (l2) { if (ctx.measureText(l2).width > mW) l2 = l2.slice(0, -2) + "\u2026"; ctx.fillText(l2, innerCX, gTextY + lH); }
  ctx.shadowBlur = 0;

  // Tagline + URL pill anchored to bottom of card
  const tagY = cardY + cardH - 112;
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "500 19px Poppins, sans-serif";
  ctx.fillText("Tes lo di:", innerCX, tagY);

  const uT = url.replace("https://", "").replace(/\/$/, "");
  ctx.font = "800 25px Poppins, sans-serif";
  const uPillLabel = uT + "  →";
  const uW = ctx.measureText(uPillLabel).width + 56, uY = tagY + 18;
  const pillG = ctx.createLinearGradient(innerCX - uW / 2, 0, innerCX + uW / 2, 0);
  pillG.addColorStop(0, "#FFD166"); pillG.addColorStop(1, "#FFBC1F");
  ctx.save();
  ctx.shadowColor = "rgba(255,209,102,0.5)"; ctx.shadowBlur = 18;
  ctx.fillStyle = pillG;
  ctx.beginPath(); ctx.roundRect(innerCX - uW / 2, uY, uW, 52, 26); ctx.fill();
  ctx.restore();
  ctx.fillStyle = "#8B0045";
  ctx.fillText(uPillLabel, innerCX, uY + 34);

  // Footer handle — sits just inside the bottom of the card
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "500 18px Poppins, sans-serif";
  ctx.fillText("@ceritagenz", innerCX, cardY + cardH - 22);

  ctx.restore(); // end outer clip

  // ── OUTER FRAME BORDER (premium edge) ────────────────────────────────────
  const borderG = ctx.createLinearGradient(0, 0, W, H);
  borderG.addColorStop(0, "rgba(255,209,102,0.9)");
  borderG.addColorStop(0.5, "rgba(255,255,255,0.35)");
  borderG.addColorStop(1, "rgba(255,61,127,0.9)");
  ctx.beginPath(); ctx.roundRect(2, 2, W - 4, H - 4, FR); ctx.strokeStyle = borderG; ctx.lineWidth = 4; ctx.stroke();

  return new Promise(res => canvas.toBlob(b => res(b), "image/png"));
}

export default function ShareButtons({ nama, golonganNama, percentage }: Props) {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const shareHeader = pickShareHeader(nama, percentage);
  const shareUrl =
    typeof window !== "undefined" ? window.location.origin : "https://lovegenz.vercel.app";

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const handleNativeShare = async () => {
    setGenerating(true);
    const blob = await generateShareImage(nama, golonganNama, percentage, shareUrl);
    setGenerating(false);
    const caption = WA_CAPTION(nama, golonganNama, percentage, shareUrl);

    if (
      blob &&
      navigator.canShare &&
      navigator.canShare({ files: [new File([blob], "hasil-kuis-bucin.png", { type: "image/png" })] })
    ) {
      try {
        await navigator.share({
          title: "Kuis Bucin 2026",
          text: caption,
          files: [new File([blob], "hasil-kuis-bucin.png", { type: "image/png" })],
        });
        return;
      } catch {}
    }
    if (navigator.share) {
      try { await navigator.share({ title: "Kuis Bucin 2026", text: caption, url: shareUrl }); return; } catch {}
    }
    await handleCopy();
  };

  const handleDownloadImage = async () => {
    setGenerating(true);
    const blob = await generateShareImage(nama, golonganNama, percentage, shareUrl);
    setGenerating(false);
    if (!blob) return;
    const objUrl = URL.createObjectURL(blob);
    setPreviewUrl(objUrl); // tampilkan modal preview dulu
  };

  const handleConfirmDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = `kuis-bucin-${nama}.png`;
    a.click();
    URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    showToast("Hasil udah masuk galeri! Jangan lupa pamerin di Story ya! 😉");
  };

  const handleClosePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const handleCopy = async () => {
    const caption = WA_CAPTION(nama, golonganNama, percentage, shareUrl);
    try { await navigator.clipboard.writeText(caption); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waLink = `https://wa.me/?text=${encodeURIComponent(WA_CAPTION(nama, golonganNama, percentage, shareUrl))}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(TWEET_CAPTION(golonganNama, percentage))}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="w-full relative">
      {/* Preview modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: "blur(10px)", background: "rgba(0,0,0,0.65)" }}
          onClick={handleClosePreview}
        >
          <div
            className="bg-white rounded-3xl p-5 w-full max-w-sm flex flex-col gap-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewUrl}
              alt="Preview hasil kuis"
              className="w-full rounded-2xl"
            />
            <p className="text-center text-xs text-gray-400 font-medium">
              Pastikan hasil sudah pas sebelum disimpan 👀
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleClosePreview}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm active:scale-95 transition-transform"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDownload}
                className="flex-1 py-3 rounded-xl bg-bucin-gold text-bucin-deepred font-display font-bold text-sm active:scale-95 transition-transform"
              >
                ⬇️ Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="absolute -top-14 left-0 right-0 mx-auto bg-white text-bucin-deepred text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-lg text-center z-10">
          {toast}
        </div>
      )}

      <p className="font-display text-center text-white font-semibold mb-3 text-sm text-shadow-soft">
        {shareHeader}
      </p>

      <div className="grid grid-cols-3 gap-2.5">
        <button
          onClick={handleNativeShare}
          disabled={generating}
          className="flex flex-col items-center gap-2 bg-bucin-pink text-white rounded-2xl py-3.5 active:scale-95 transition-transform disabled:opacity-70"
        >
          <span className="text-2xl">{generating ? "⏳" : "📲"}</span>
          <span className="text-[11px] font-normal tracking-wide">Share</span>
        </button>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 bg-[#25D366] text-white rounded-2xl py-3.5 active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="text-[11px] font-normal tracking-wide">WhatsApp</span>
        </a>

        <a
          href={twitterLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 bg-black text-white rounded-2xl py-3.5 active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-[11px] font-normal tracking-wide">Post</span>
        </a>
      </div>

      {/* Simpan gambar — premium gold glow */}
      <button
        onClick={handleDownloadImage}
        disabled={generating}
        className="w-full mt-3 flex items-center justify-center gap-2 bg-bucin-gold text-bucin-deepred text-sm font-bold py-3.5 rounded-2xl active:scale-95 transition-transform disabled:opacity-70"
        style={{ boxShadow: "0 4px 20px rgba(255,209,102,0.5), 0 0 0 1px rgba(255,209,102,0.3)" }}
      >
        <span className="text-base">{generating ? "⏳" : "⬇️"}</span>
        {generating ? "Generating gambar..." : "Simpan gambar hasil"}
      </button>

      <button
        onClick={handleCopy}
        className="w-full mt-2 text-center text-[11px] text-white/55 font-normal py-1 underline-offset-2 hover:underline"
      >
        {copied ? "Tersalin ✓" : "Atau salin teks & link"}
      </button>

      {/* Follow @ceritagenz card */}
      <a
        href="https://x.com/ceritagenz"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 w-full flex items-center gap-3 bg-bucin-cream border-2 border-bucin-pink/30 rounded-2xl px-4 py-3.5 active:scale-95 transition-transform"
      >
        {/* X logo circle */}
        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-black flex items-center justify-center shadow">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 text-left min-w-0">
          <p className="font-display font-bold text-bucin-deepred text-sm leading-tight">
            Follow @ceritagenz
          </p>
          <p className="text-bucin-deepred/60 text-xs leading-snug mt-0.5">
            Random thoughts generasi yang capek tapi tetep jalan 🐥
          </p>
        </div>

        {/* Follow button */}
        <div className="flex-shrink-0 bg-black text-white text-xs font-bold px-4 py-2 rounded-full">
          Follow
        </div>
      </a>
    </div>
  );
}
