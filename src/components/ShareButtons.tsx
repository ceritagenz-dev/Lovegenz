"use client";

import { useState } from "react";

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
  try { await document.fonts.load("bold 72px Poppins"); } catch {}
  const canvas = document.createElement("canvas");
  const W = 1080, H = 1350;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const CX = W / 2;

  // ── BACKGROUND ───────────────────────────────────────────────────────────
  // Top 65%: dark gradient
  const bgTop = ctx.createLinearGradient(0, 0, W, H * 0.65);
  bgTop.addColorStop(0, "#6b002e");
  bgTop.addColorStop(0.5, "#9e0050");
  bgTop.addColorStop(1, "#7a0055");
  ctx.fillStyle = bgTop;
  ctx.fillRect(0, 0, W, H * 0.65);

  // Bottom 35%: bright hot pink — stark contrast block
  const bgBot = ctx.createLinearGradient(0, H * 0.65, 0, H);
  bgBot.addColorStop(0, "#d6006a");
  bgBot.addColorStop(1, "#a8004f");
  ctx.fillStyle = bgBot;
  ctx.fillRect(0, H * 0.65, W, H * 0.35);

  // Divider glow line
  const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
  lineGrad.addColorStop(0, "rgba(255,255,255,0)");
  lineGrad.addColorStop(0.5, "rgba(255,255,255,0.4)");
  lineGrad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = lineGrad;
  ctx.fillRect(0, H * 0.65 - 2, W, 4);

  // Radial glow top-left
  const r1 = ctx.createRadialGradient(150, 150, 0, 150, 150, 450);
  r1.addColorStop(0, "rgba(255,61,127,0.4)"); r1.addColorStop(1, "rgba(255,61,127,0)");
  ctx.fillStyle = r1; ctx.fillRect(0, 0, W, H * 0.65);

  // Radial glow center
  const r2 = ctx.createRadialGradient(CX, 500, 0, CX, 500, 360);
  r2.addColorStop(0, "rgba(180,0,80,0.35)"); r2.addColorStop(1, "rgba(180,0,80,0)");
  ctx.fillStyle = r2; ctx.fillRect(0, 200, W, 600);

  // Dot grid texture
  ctx.fillStyle = "rgba(255,255,255,0.035)";
  for (let x = 30; x < W; x += 54) for (let y = 30; y < H * 0.65; y += 54) {
    ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI*2); ctx.fill();
  }

  // Large decorative heart outline in background
  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 28;
  ctx.beginPath();
  const hx = CX, hy = 340, hs = 420;
  ctx.moveTo(hx, hy + hs * 0.3);
  ctx.bezierCurveTo(hx, hy, hx - hs * 0.6, hy, hx - hs * 0.6, hy + hs * 0.3);
  ctx.bezierCurveTo(hx - hs * 0.6, hy + hs * 0.7, hx, hy + hs, hx, hy + hs);
  ctx.bezierCurveTo(hx, hy + hs, hx + hs * 0.6, hy + hs * 0.7, hx + hs * 0.6, hy + hs * 0.3);
  ctx.bezierCurveTo(hx + hs * 0.6, hy, hx, hy, hx, hy + hs * 0.3);
  ctx.stroke();
  ctx.restore();

  // Corner sparkles
  const sparkPos = [[80,80],[W-80,80],[60,620],[W-60,620],[130,350],[W-130,350]];
  sparkPos.forEach(([sx,sy]) => {
    ctx.fillStyle = "rgba(255,209,102,0.5)";
    ctx.font = "24px sans-serif";
    ctx.fillText("✦", sx-8, sy+8);
  });

  ctx.textAlign = "center";

  // ── APP BADGE ─────────────────────────────────────────────────────────────
  const bW=300, bH=46, bX=CX-bW/2, bY=70;
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.roundRect(bX,bY,bW,bH,23); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "500 18px Poppins, sans-serif";
  ctx.fillText("KUIS BUCIN 2026", CX, bY+29);

  // ── NAMA ─────────────────────────────────────────────────────────────────
  const namaDisplay = nama.length > 16 ? nama.slice(0,14)+"\u2026" : nama;
  ctx.font = "900 80px Poppins, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(255,61,127,0.7)"; ctx.shadowBlur = 28;
  ctx.fillText(namaDisplay, CX, 230);
  ctx.shadowBlur = 0;

  // Small underline accent
  const nW = Math.min(ctx.measureText(namaDisplay).width + 40, 600);
  const uGrad = ctx.createLinearGradient(CX-nW/2, 0, CX+nW/2, 0);
  uGrad.addColorStop(0,"rgba(255,209,102,0)");
  uGrad.addColorStop(0.5,"rgba(255,209,102,0.9)");
  uGrad.addColorStop(1,"rgba(255,209,102,0)");
  ctx.fillStyle = uGrad; ctx.fillRect(CX-nW/2, 248, nW, 4);

  // ── PERCENTAGE — HERO ─────────────────────────────────────────────────────
  // Circular ring track
  const rCX=CX, rCY=490, rR=230, rLW=14;
  ctx.beginPath(); ctx.arc(rCX, rCY, rR, 0, Math.PI*2);
  ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth=rLW; ctx.stroke();
  // Arc fill
  const arcStart = -Math.PI/2;
  const arcEnd = arcStart + (percentage/100) * Math.PI*2;
  const arcG = ctx.createLinearGradient(rCX-rR, rCY-rR, rCX+rR, rCY+rR);
  arcG.addColorStop(0, "#FFD166"); arcG.addColorStop(0.5, "#FF6B9D"); arcG.addColorStop(1, "#FF3D7F");
  ctx.beginPath(); ctx.arc(rCX, rCY, rR, arcStart, arcEnd);
  ctx.strokeStyle = arcG; ctx.lineWidth = rLW; ctx.lineCap="round"; ctx.stroke();
  // End dot glow
  const dotX = rCX + rR * Math.cos(arcEnd), dotY = rCY + rR * Math.sin(arcEnd);
  ctx.beginPath(); ctx.arc(dotX, dotY, rLW*0.8, 0, Math.PI*2);
  ctx.fillStyle = "#FFD166"; ctx.fill();

  // Percentage number inside ring
  ctx.shadowColor = "rgba(255,61,127,0.5)"; ctx.shadowBlur = 30;
  const pctG = ctx.createLinearGradient(CX, rCY-120, CX, rCY+60);
  pctG.addColorStop(0,"#ffffff"); pctG.addColorStop(1,"#FFB4CC");
  ctx.fillStyle = pctG;
  ctx.font = "900 150px Poppins, sans-serif";
  ctx.fillText(percentage+"%", CX, rCY+50);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "400 24px Poppins, sans-serif";
  ctx.fillText("tingkat kebucinan", CX, rCY+95);

  // ── GOLONGAN — bright bottom block ───────────────────────────────────────
  const golY = H * 0.65 + 30;

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.font = "700 18px Poppins, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("GOLONGAN", CX, golY+20);
  ctx.letterSpacing = "0px";

  const gFs = golonganNama.length > 20 ? 48 : golonganNama.length > 14 ? 56 : 64;
  ctx.font = "900 " + gFs + "px Poppins, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(0,0,0,0.2)"; ctx.shadowBlur = 12;
  const mW = W - 100, ws = golonganNama.split(" ");
  let l1="", l2="";
  for (let i=0;i<ws.length;i++){
    const t=l1+(l1?" ":"")+ws[i];
    if(ctx.measureText(t).width>mW&&l1){l2=ws.slice(i).join(" ");break;}
    l1=t;
  }
  const lH=gFs*1.2, gTextY=golY+50+(l2?0:lH/2);
  ctx.fillText(l1, CX, gTextY);
  if(l2){if(ctx.measureText(l2).width>mW)l2=l2.slice(0,-2)+"\u2026";ctx.fillText(l2,CX,gTextY+lH);}
  ctx.shadowBlur=0;

  // Small tagline
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "400 20px Poppins, sans-serif";
  ctx.fillText("Tes lo di:", CX, golY+210);

  // URL pill on bottom block
  const uT = url.replace("https://","");
  ctx.font = "700 24px Poppins, sans-serif";
  const uW = ctx.measureText(uT).width + 60, uY = golY+230;
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath(); ctx.roundRect(CX-uW/2,uY,uW,48,24); ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.fillText(uT, CX, uY+30);

  // @ceritagenz
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = "400 18px Poppins, sans-serif";
  ctx.fillText("@ceritagenz", CX, H-30);

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
