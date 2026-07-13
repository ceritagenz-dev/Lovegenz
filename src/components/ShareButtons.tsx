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
  const W = 1080, H = 1350; // portrait 4:5 — ideal buat IG Story & Feed
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const CX = W / 2;

  // ── Dark romantic background ─────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0,   "#7a003d");
  bg.addColorStop(0.3, "#b5004a");
  bg.addColorStop(0.6, "#8b0057");
  bg.addColorStop(1,   "#1a0018");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Radial glow top-left
  const gl1 = ctx.createRadialGradient(200, 180, 0, 200, 180, 520);
  gl1.addColorStop(0, "rgba(255,61,127,0.35)");
  gl1.addColorStop(1, "rgba(255,61,127,0)");
  ctx.fillStyle = gl1; ctx.fillRect(0, 0, W, H);

  // Radial glow bottom-right
  const gl2 = ctx.createRadialGradient(920, 1220, 0, 920, 1220, 420);
  gl2.addColorStop(0, "rgba(60,0,50,0.65)");
  gl2.addColorStop(1, "rgba(60,0,50,0)");
  ctx.fillStyle = gl2; ctx.fillRect(0, 0, W, H);

  // Dot texture
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  for (let dx = 25; dx < W; dx += 52) {
    for (let dy = 25; dy < H; dy += 52) {
      ctx.beginPath(); ctx.arc(dx, dy, 2, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Decorative circles
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.beginPath(); ctx.arc(W * 0.88, H * 0.07, 270, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(W * 0.1,  H * 0.93, 200, 0, Math.PI * 2); ctx.fill();

  // Scattered hearts
  const hE = ["\u{1F497}","\u{1F495}","\u{1F493}","\u2728","\u{1F496}","\u{1F338}"];
  const hP = [[60,90],[1000,160],[80,680],[1000,900],[60,1250],[1010,1150],[540,40],[530,1300],[240,400],[830,380],[280,1050],[800,1020]];
  ctx.font = "32px sans-serif"; ctx.globalAlpha = 0.13;
  hP.forEach(([hx,hy],i) => ctx.fillText(hE[i%hE.length], hx, hy));
  ctx.globalAlpha = 1;

  ctx.textAlign = "center";

  // ── TOP badge ─────────────────────────────────────────────────────────────
  const bY=90, bW=360, bH=54;
  const bG = ctx.createLinearGradient(CX-bW/2, 0, CX+bW/2, 0);
  bG.addColorStop(0, "rgba(255,209,102,0.25)"); bG.addColorStop(1, "rgba(255,61,127,0.25)");
  ctx.fillStyle = bG;
  ctx.beginPath(); ctx.roundRect(CX-bW/2, bY, bW, bH, 27); ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(CX-bW/2, bY, bW, bH, 27); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.font = "600 21px Poppins, sans-serif";
  ctx.fillText("\u{1F498}  KUIS BUCIN 2026  \u{1F498}", CX, bY + 34);

  // ── NAMA ─────────────────────────────────────────────────────────────────
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.shadowColor = "rgba(255,61,127,0.55)"; ctx.shadowBlur = 22;
  ctx.font = "bold 58px Poppins, sans-serif";
  ctx.fillText(nama.length > 18 ? nama.slice(0,16)+"\u2026" : nama, CX, 225);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255,255,255,0.42)";
  ctx.font = "400 23px Poppins, sans-serif";
  ctx.fillText("hasil kuis bucin", CX, 263);

  // Divider
  const dG = ctx.createLinearGradient(80, 0, W-80, 0);
  dG.addColorStop(0,"rgba(255,255,255,0)"); dG.addColorStop(0.5,"rgba(255,255,255,0.22)"); dG.addColorStop(1,"rgba(255,255,255,0)");
  ctx.strokeStyle = dG; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(100,295); ctx.lineTo(W-100,295); ctx.stroke();

  // ── PERCENTAGE — hero ─────────────────────────────────────────────────────
  const pG = ctx.createRadialGradient(CX, 490, 10, CX, 490, 280);
  pG.addColorStop(0, "rgba(255,61,127,0.28)"); pG.addColorStop(1, "rgba(255,61,127,0)");
  ctx.fillStyle = pG; ctx.fillRect(0, 250, W, 600);

  ctx.font = "900 220px Poppins, sans-serif";
  ctx.shadowColor = "rgba(255,61,127,0.65)"; ctx.shadowBlur = 45; ctx.shadowOffsetY = 8;
  const numG = ctx.createLinearGradient(CX-200, 310, CX+200, 560);
  numG.addColorStop(0,"#ffffff"); numG.addColorStop(0.5,"#FFD4E8"); numG.addColorStop(1,"#FF6B9D");
  ctx.fillStyle = numG;
  ctx.fillText(percentage+"%", CX, 530);
  ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "500 30px Poppins, sans-serif";
  ctx.fillText("tingkat kebucinan", CX, 580);

  // ── GOLONGAN glass card ───────────────────────────────────────────────────
  const cY=660, cH=270, cW=W-80, cX=40, cR=36;
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cX+cR,cY); ctx.lineTo(cX+cW-cR,cY); ctx.quadraticCurveTo(cX+cW,cY,cX+cW,cY+cR);
  ctx.lineTo(cX+cW,cY+cH-cR); ctx.quadraticCurveTo(cX+cW,cY+cH,cX+cW-cR,cY+cH);
  ctx.lineTo(cX+cR,cY+cH); ctx.quadraticCurveTo(cX,cY+cH,cX,cY+cH-cR);
  ctx.lineTo(cX,cY+cR); ctx.quadraticCurveTo(cX,cY,cX+cR,cY); ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Gold accent line
  const aG = ctx.createLinearGradient(cX+cR,0,cX+cW-cR,0);
  aG.addColorStop(0,"rgba(255,209,102,0)"); aG.addColorStop(0.5,"rgba(255,209,102,0.9)"); aG.addColorStop(1,"rgba(255,209,102,0)");
  ctx.fillStyle = aG; ctx.fillRect(cX+cR, cY, cW-cR*2, 3);

  ctx.fillStyle = "rgba(255,209,102,0.8)";
  ctx.font = "600 19px Poppins, sans-serif";
  ctx.fillText("GOLONGAN " + percentage + "% BUCIN", CX, cY+46);

  // Golongan name
  const gFs = golonganNama.length > 22 ? 42 : golonganNama.length > 16 ? 48 : 54;
  ctx.font = "bold " + gFs + "px Poppins, sans-serif";
  const mW = cW - 80, ws = golonganNama.split(" ");
  let l1="", l2="";
  for (let i=0;i<ws.length;i++) {
    const t = l1+(l1?" ":"")+ws[i];
    if (ctx.measureText(t).width > mW && l1) { l2=ws.slice(i).join(" "); break; }
    l1=t;
  }
  const lH = gFs*1.25, gY2 = cY+105+(l2?0:lH/2);
  ctx.shadowColor = "rgba(255,61,127,0.35)"; ctx.shadowBlur = 14;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(l1, CX, gY2);
  if (l2) { if (ctx.measureText(l2).width>mW) l2=l2.slice(0,-2)+"\u2026"; ctx.fillText(l2, CX, gY2+lH); }
  ctx.shadowBlur = 0;

  // ── CTA & URL ─────────────────────────────────────────────────────────────
  ctx.fillStyle = "rgba(255,255,255,0.48)";
  ctx.font = "400 22px Poppins, sans-serif";
  ctx.fillText("Cek golongan kebucinan lo juga \u2192", CX, 1010);

  const uT = url.replace("https://","");
  ctx.font = "bold 26px Poppins, sans-serif";
  const uW = ctx.measureText(uT).width+64;
  const uY = 1050;
  const uG = ctx.createLinearGradient(CX-uW/2,0,CX+uW/2,0);
  uG.addColorStop(0,"rgba(255,209,102,0.3)"); uG.addColorStop(1,"rgba(255,61,127,0.3)");
  ctx.fillStyle = uG;
  ctx.beginPath(); ctx.roundRect(CX-uW/2,uY,uW,50,25); ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth=1;
  ctx.beginPath(); ctx.roundRect(CX-uW/2,uY,uW,50,25); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillText(uT, CX, uY+32);

  // @ceritagenz
  ctx.fillStyle = "rgba(255,255,255,0.28)";
  ctx.font = "500 20px Poppins, sans-serif";
  ctx.fillText("@ceritagenz", CX, H - 38);

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
