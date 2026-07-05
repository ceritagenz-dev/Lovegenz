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
  const S = 1080;
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Gradient bg
  const grad = ctx.createLinearGradient(0, 0, S, S);
  grad.addColorStop(0, "#E0115F");
  grad.addColorStop(0.5, "#A91079");
  grad.addColorStop(1, "#C2185B");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);

  // Dot pattern overlay (subtle texture)
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  for (let dx = 30; dx < S; dx += 55) {
    for (let dy = 30; dy < S; dy += 55) {
      ctx.beginPath();
      ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Deco circles
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath(); ctx.arc(S * 0.85, S * 0.1, 220, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(S * 0.1, S * 0.9, 170, 0, Math.PI * 2); ctx.fill();

  // White card with glow
  const CM = 70, CW = S - CM * 2, CH = S - CM * 2, RD = 48;
  ctx.shadowColor = "rgba(194,24,91,0.4)";
  ctx.shadowBlur = 40;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(CM + RD, CM);
  ctx.lineTo(CM + CW - RD, CM);
  ctx.quadraticCurveTo(CM + CW, CM, CM + CW, CM + RD);
  ctx.lineTo(CM + CW, CM + CH - RD);
  ctx.quadraticCurveTo(CM + CW, CM + CH, CM + CW - RD, CM + CH);
  ctx.lineTo(CM + RD, CM + CH);
  ctx.quadraticCurveTo(CM, CM + CH, CM, CM + CH - RD);
  ctx.lineTo(CM, CM + RD);
  ctx.quadraticCurveTo(CM, CM, CM + RD, CM);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;

  const CX = S / 2;
  ctx.textAlign = "center";

  // Branding pill di atas kartu
  const pillW = 280, pillH = 44, pillX = CX - pillW / 2, pillY = CM + 28;
  ctx.fillStyle = "rgba(194,24,91,0.12)";
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 22);
  ctx.fill();
  ctx.fillStyle = "rgba(194,24,91,0.55)";
  ctx.font = "600 24px Poppins, sans-serif";
  ctx.fillText("✨  KUIS BUCIN 2026  ✨", CX, CM + 57);

  // Heart
  ctx.font = "80px sans-serif";
  ctx.fillText("💓", CX, CM + 155);

  // Nama
  ctx.fillStyle = "#C2185B";
  const namaDisplay = nama.length > 18 ? nama.slice(0, 16) + "…" : nama;
  ctx.font = "bold 60px Poppins, sans-serif";
  ctx.fillText(namaDisplay, CX, CM + 245);

  // Divider
  ctx.strokeStyle = "rgba(194,24,91,0.15)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(CM + 80, CM + 272); ctx.lineTo(CM + CW - 80, CM + 272);
  ctx.stroke();

  // Golongan — zona FIXED 300-430, max 2 baris, font auto-shrink
  ctx.fillStyle = "#FF3D7F";
  const golFontSize = golonganNama.length > 22 ? 38 : golonganNama.length > 16 ? 44 : 50;
  ctx.font = `bold ${golFontSize}px Poppins, sans-serif`;
  const maxGolW = CW - 100;
  const words = golonganNama.split(" ");
  let line1 = "", line2 = "";
  for (let i = 0; i < words.length; i++) {
    const test = line1 + (line1 ? " " : "") + words[i];
    if (ctx.measureText(test).width > maxGolW && line1) {
      let rest = words.slice(i).join(" ");
      while (ctx.measureText(rest).width > maxGolW && rest.length > 2) {
        rest = rest.slice(0, -2) + "…";
      }
      line2 = rest;
      break;
    }
    line1 = test;
  }
  const golY = CM + 340;
  const lineH = golFontSize * 1.3;
  ctx.fillText(line1, CX, golY);
  if (line2) ctx.fillText(line2, CX, golY + lineH);

  // Percentage — posisi FIXED y=610, tidak pernah bergerak
  ctx.fillStyle = "#C2185B";
  ctx.font = "bold 148px Poppins, sans-serif";
  ctx.fillText(`${percentage}%`, CX, CM + 610);

  // Label
  ctx.fillStyle = "rgba(194,24,91,0.5)";
  ctx.font = "500 33px Poppins, sans-serif";
  ctx.fillText("tingkat kebucinan", CX, CM + 662);

  // URL pill box + @ceritagenz watermark
  const urlShort = url.replace("https://", "");
  ctx.font = "bold 28px Poppins, sans-serif";
  const urlMeasure = ctx.measureText(urlShort).width;
  const urlPillW = urlMeasure + 60;
  const urlPillH = 52;
  const urlPillX = CX - urlPillW / 2;
  const urlPillY = CM + CH - 80;
  ctx.fillStyle = "rgba(194,24,91,0.15)";
  ctx.beginPath();
  ctx.roundRect(urlPillX, urlPillY, urlPillW, urlPillH, 26);
  ctx.fill();
  ctx.fillStyle = "#C2185B";
  ctx.font = "bold 26px Poppins, sans-serif";
  ctx.fillText(urlShort, CX, urlPillY + 34);

  // @ceritagenz watermark — pojok kanan bawah background
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "500 22px Poppins, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("@ceritagenz", S - 28, S - 22);

  return new Promise((res) => canvas.toBlob((b) => res(b), "image/png"));
}

export default function ShareButtons({ nama, golonganNama, percentage }: Props) {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState("");

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
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kuis-bucin-${nama}.png`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Hasil udah masuk galeri! Jangan lupa pamerin di Story ya! 😉");
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
          className="flex flex-col items-center gap-1.5 bg-bucin-pink text-white rounded-2xl py-3 active:scale-95 transition-transform disabled:opacity-70"
        >
          <span className="text-xl">{generating ? "⏳" : "📲"}</span>
          <span className="text-xs font-semibold">Share</span>
        </button>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 bg-[#25D366] text-white rounded-2xl py-3 active:scale-95 transition-transform"
        >
          <span className="text-xl">💬</span>
          <span className="text-xs font-semibold">WhatsApp</span>
        </a>

        <a
          href={twitterLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 bg-black text-white rounded-2xl py-3 active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-xs font-semibold">Post</span>
        </a>
      </div>

      <button
        onClick={handleDownloadImage}
        disabled={generating}
        className="w-full mt-3 flex items-center justify-center gap-2 bg-bucin-gold text-bucin-deepred text-sm font-bold py-3.5 rounded-2xl active:scale-95 transition-transform disabled:opacity-70 shadow-md"
      >
        <span className="text-base">{generating ? "⏳" : "⬇️"}</span>
        {generating ? "Generating gambar..." : "Simpan gambar hasil"}
      </button>

      <button
        onClick={handleCopy}
        className="w-full mt-2 text-center text-sm text-white/80 font-medium py-1.5 underline-offset-2 hover:underline"
      >
        {copied ? "Tersalin ✓" : "Atau salin teks & link"}
      </button>

      <a
        href="https://x.com/ceritagenz"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 w-full bg-black text-white rounded-full py-3 font-semibold text-sm active:scale-95 transition-transform border border-white/20"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Follow @ceritagenz
      </a>
    </div>
  );
}
