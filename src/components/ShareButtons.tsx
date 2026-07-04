"use client";

import { useState } from "react";

type Props = {
  nama: string;
  golonganNama: string;
  percentage: number;
};

const TWEET_CAPTION = (golonganNama: string, percentage: number) =>
  `Golongan gue udah keluar 😭🚩\n\n"${golonganNama}" — ${percentage}% tingkat kebucinan\n\nGolongan lo apa? Coba tes kalau berani, ini 40 soal yang bikin mikir ulang soal hubungan.`;

const WA_CAPTION = (nama: string, golonganNama: string, percentage: number, url: string) =>
  `Hasil SENSUS BUCIN 2026 gua keluar 😭🚩\n\nNama: ${nama}\nGolongan: "${golonganNama}"\nTingkat kebucinan: ${percentage}%\n\nLo berani tes seberapa bucin lo juga? 40 pertanyaan, gak ada ampun.\n👉 ${url}`;

async function generateShareImage(
  nama: string,
  golonganNama: string,
  percentage: number,
  url: string
): Promise<Blob | null> {
  try {
    await document.fonts.load("bold 72px Poppins");
  } catch {}

  const canvas = document.createElement("canvas");
  const S = 1080;
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, S, S);
  grad.addColorStop(0, "#E0115F");
  grad.addColorStop(0.5, "#A91079");
  grad.addColorStop(1, "#C2185B");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);

  // Subtle circle deco
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.beginPath();
  ctx.arc(S * 0.85, S * 0.12, 240, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(S * 0.1, S * 0.88, 180, 0, Math.PI * 2);
  ctx.fill();

  // White card
  const CM = 70;
  const CW = S - CM * 2;
  const CH = S - CM * 2;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  const r = 48;
  ctx.moveTo(CM + r, CM);
  ctx.lineTo(CM + CW - r, CM);
  ctx.quadraticCurveTo(CM + CW, CM, CM + CW, CM + r);
  ctx.lineTo(CM + CW, CM + CH - r);
  ctx.quadraticCurveTo(CM + CW, CM + CH, CM + CW - r, CM + CH);
  ctx.lineTo(CM + r, CM + CH);
  ctx.quadraticCurveTo(CM, CM + CH, CM, CM + CH - r);
  ctx.lineTo(CM, CM + r);
  ctx.quadraticCurveTo(CM, CM, CM + r, CM);
  ctx.closePath();
  ctx.fill();

  const CX = S / 2;

  // App label
  ctx.fillStyle = "rgba(194,24,91,0.5)";
  ctx.font = "500 36px Poppins, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("SENSUS BUCIN 2026", CX, CM + 70);

  // Heart
  ctx.font = "100px sans-serif";
  ctx.fillText("💓", CX, CM + 195);

  // Nama
  ctx.fillStyle = "#C2185B";
  ctx.font = "bold 70px Poppins, sans-serif";
  const namaDisplay = nama.length > 16 ? nama.slice(0, 14) + "…" : nama;
  ctx.fillText(namaDisplay, CX, CM + 300);

  // Divider
  ctx.strokeStyle = "rgba(194,24,91,0.15)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(CM + 80, CM + 330);
  ctx.lineTo(CM + CW - 80, CM + 330);
  ctx.stroke();

  // Golongan
  ctx.fillStyle = "#FF3D7F";
  ctx.font = "bold 52px Poppins, sans-serif";
  const golDisplay =
    golonganNama.length > 22 ? golonganNama.slice(0, 20) + "…" : golonganNama;
  ctx.fillText(golDisplay, CX, CM + 400);

  // Percentage big
  ctx.fillStyle = "#C2185B";
  ctx.font = "bold 180px Poppins, sans-serif";
  ctx.fillText(`${percentage}%`, CX, CM + 610);

  // Label
  ctx.fillStyle = "rgba(194,24,91,0.55)";
  ctx.font = "500 38px Poppins, sans-serif";
  ctx.fillText("tingkat kebucinan", CX, CM + 670);

  // URL
  ctx.fillStyle = "rgba(194,24,91,0.4)";
  ctx.font = "32px Poppins, sans-serif";
  ctx.fillText(url, CX, CM + CH - 35);

  return new Promise((res) => canvas.toBlob((b) => res(b), "image/png"));
}

export default function ShareButtons({ nama, golonganNama, percentage }: Props) {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const shareUrl =
    typeof window !== "undefined" ? window.location.origin : "https://lovegenz.vercel.app";

  const handleNativeShare = async () => {
    setGenerating(true);
    const blob = await generateShareImage(nama, golonganNama, percentage, shareUrl);
    setGenerating(false);

    const caption = WA_CAPTION(nama, golonganNama, percentage, shareUrl);

    if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], "hasil-sensus.png", { type: "image/png" })] })) {
      try {
        await navigator.share({
          title: "Sensus Bucin 2026",
          text: caption,
          files: [new File([blob], "hasil-sensus.png", { type: "image/png" })],
        });
        return;
      } catch {}
    }
    // Fallback: share without image
    if (navigator.share) {
      try {
        await navigator.share({ title: "Sensus Bucin 2026", text: caption, url: shareUrl });
        return;
      } catch {}
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
    a.download = `sensus-bucin-${nama}.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    const caption = WA_CAPTION(nama, golonganNama, percentage, shareUrl);
    try {
      await navigator.clipboard.writeText(`${caption}`);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waLink = `https://wa.me/?text=${encodeURIComponent(
    WA_CAPTION(nama, golonganNama, percentage, shareUrl)
  )}`;

  const tweetText = TWEET_CAPTION(golonganNama, percentage);
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="w-full">
      <p className="font-display text-center text-white font-semibold mb-3 text-sm text-shadow-soft">
        Bagikan hasil sensus lo
      </p>

      <div className="grid grid-cols-3 gap-2.5">
        {/* Share with image */}
        <button
          onClick={handleNativeShare}
          disabled={generating}
          className="flex flex-col items-center gap-1.5 bg-bucin-pink text-white rounded-2xl py-3 active:scale-95 transition-transform disabled:opacity-70"
        >
          <span className="text-xl">{generating ? "⏳" : "📲"}</span>
          <span className="text-xs font-semibold">Share</span>
        </button>

        {/* WhatsApp */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 bg-[#25D366] text-white rounded-2xl py-3 active:scale-95 transition-transform"
        >
          <span className="text-xl">💬</span>
          <span className="text-xs font-semibold">WhatsApp</span>
        </a>

        {/* Post X */}
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

      {/* Download image */}
      <button
        onClick={handleDownloadImage}
        disabled={generating}
        className="w-full mt-2.5 bg-white/20 text-white text-sm font-semibold py-2.5 rounded-xl active:scale-95 transition-transform disabled:opacity-70"
      >
        {generating ? "Generating..." : "⬇️  Simpan gambar hasil"}
      </button>

      <button
        onClick={handleCopy}
        className="w-full mt-2 text-center text-sm text-white/80 font-medium py-1.5 underline-offset-2 hover:underline"
      >
        {copied ? "Tersalin ✓" : "Atau salin teks & link"}
      </button>

      {/* Follow */}
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
