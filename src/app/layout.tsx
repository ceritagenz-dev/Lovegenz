import type { Metadata } from "next";
import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sensus Bucin 2026 — Tes Seberapa Bucin Lo",
  description:
    "40 pertanyaan, 20 golongan. Cari tau lo masuk kategori bucin apa di Sensus Bucin 2026.",
  openGraph: {
    title: "Sensus Bucin 2026",
    description:
      "40 pertanyaan jujur-jujuran. Ketauan lo masuk golongan bucin yang mana.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sensus Bucin 2026",
    description:
      "40 pertanyaan jujur-jujuran. Ketauan lo masuk golongan bucin yang mana.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${fredoka.variable} ${jakarta.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
