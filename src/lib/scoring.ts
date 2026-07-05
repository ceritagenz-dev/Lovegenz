import { MAX_POSSIBLE_SCORE } from "./questions";

export type Golongan = {
  rank: number;
  nama: string;
  tagline: string;
};

// Urutan dari paling waras (rank 1) ke paling akut (rank 20)
export const GOLONGAN_LIST: Golongan[] = [
  { rank: 1, nama: "Hati Es Batu", tagline: "Dingin total, doi siapa, hidup aman sentosa" },
  { rank: 2, nama: "Santuy Society", tagline: "Ada rasa dikit tapi masih bisa main badminton" },
  { rank: 3, nama: "Kepo Tapi Jaim", tagline: "Stalk diem-diem tapi pura-pura gak tau apa-apa" },
  { rank: 4, nama: "Centang Biru Hunter", tagline: "Fast respon, aware statusnya, tapi belum parno" },
  { rank: 5, nama: "Mode Siaga HP", tagline: "Semua notif di-mute, kecuali doi" },
  { rank: 6, nama: "Senyum Sendiri Gang", tagline: "Nama doi muncul = senyum receh gak ketulungan" },
  { rank: 7, nama: "Stalker Bersertifikat", tagline: "Story doi, foto jadul, lokasi — gak ada yang kelewat" },
  { rank: 8, nama: "Chat Lama = Playlist Favorit", tagline: "Baca ulang chat lama kayak rewatch film kesayangan" },
  { rank: 9, nama: "Butuh Centang Biru Detik Ini", tagline: "Belum dibaca = gelisah, sudah dibaca = lebih gelisah" },
  { rank: 10, nama: "Tim Overthinking Sejagat", tagline: "'Oke' dari doi = bahan mikir sampe subuh" },
  { rank: 11, nama: "Cancel Semua Demi Doi", tagline: "Semua agenda tentative sampai doi konfirmasi" },
  { rank: 12, nama: "Panic Online Tapi Hening", tagline: "Doi online tapi gak bales = siksaan batin level dewa" },
  { rank: 13, nama: "Sutradara Masa Depan", tagline: "Skenario nikah udah jadi, tinggal doi yang belum tau" },
  { rank: 14, nama: "Doi Gak Pernah Salah", tagline: "Red flag? Di mata lo itu cuma tanda sayang yang beda" },
  { rank: 15, nama: "Bunglon Demi Doi", tagline: "Selera lo auto-update ngikutin doi tanpa disadari" },
  { rank: 16, nama: "Detektif Circle Doi", tagline: "Hafal semua orang di circle doi sampe teman TK-nya" },
  { rank: 17, nama: "All In Tanpa Rem", tagline: "Doi nomor satu, sisanya gak ada di dalam list" },
  { rank: 18, nama: "Bahaya Tau Tapi Gas Aja", tagline: "Red flag terlihat jelas, tapi gas tetap dipijak" },
  { rank: 19, nama: "Withdrawal Doi Sehari Aja", tagline: "Satu hari tanpa kabar doi = dunia gelap total" },
  { rank: 20, nama: "Bucin Akut Tingkat Dewa", tagline: "Logika udah resign, hati penuh surrender ke doi" },
];

// Cutoff skor (distribusi beta(2,2), 40 soal x maks 10)
const CUTOFFS = [47, 67, 85, 104, 121, 137, 153, 168, 183, 198, 212, 226, 240, 255, 270, 286, 303, 321, 343];

export function getGolonganFromScore(totalScore: number): Golongan {
  for (let i = 0; i < CUTOFFS.length; i++) {
    if (totalScore <= CUTOFFS[i]) return GOLONGAN_LIST[i];
  }
  return GOLONGAN_LIST[GOLONGAN_LIST.length - 1];
}

export function getPercentageScore(totalScore: number): number {
  return Math.round((totalScore / MAX_POSSIBLE_SCORE) * 100);
}
