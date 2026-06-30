"use client";

import { useState } from "react";

type Props = {
  nama: string;
  golonganNama: string;
  percentage: number;
};

function buildCaption(nama: string, golonganNama: string, percentage: number) {
  return `Hasil SENSUS BUCIN 2026 gua keluar 😭🚩\n\nGolongan: "${golonganNama}"\nTingkat kebucinan: ${percentage}%\n\nLo berani tes seberapa bucin lo juga? 40 pertanyaan, gak ada ampun.`;
}

export default function ShareButtons({ nama, golonganNama, percentage }: Props) {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    typeof window !== "undefined" ? window.location.origin : "https://sensus-bucin.vercel.app";
  const caption = buildCaption(nama, golonganNama, percentage);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Sensus Bucin 2026",
          text: caption,
          url: shareUrl,
        });
      } catch {
        // user cancelled, no-op
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${caption}\n\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waLink = `https://wa.me/?text=${encodeURIComponent(`${caption}\n\n${shareUrl}`)}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="w-full">
      <p className="font-display text-center text-white font-semibold mb-3 text-sm text-shadow-soft">
        Bagikan hasil sensus lo
      </p>
      <div className="grid grid-cols-3 gap-2.5">
        <button
          onClick={handleNativeShare}
          className="flex flex-col items-center gap-1.5 bg-bucin-pink text-white rounded-2xl py-3 active:scale-95 transition-transform"
        >
          <span className="text-xl">📲</span>
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
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-xs font-semibold">Post</span>
        </a>
      </div>
      <button
        onClick={handleCopy}
        className="w-full mt-2.5 text-center text-sm text-white/90 font-semibold py-2 underline-offset-2 hover:underline"
      >
        {copied ? "Tersalin ✓" : "Atau salin teks & link"}
      </button>

      <a
        href="https://x.com/ceritagenz"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 w-full bg-black text-white rounded-full py-3 font-semibold text-sm active:scale-95 transition-transform border border-white/20"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Follow @ceritagenz
      </a>
    </div>
  );
}
