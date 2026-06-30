import { MAX_POSSIBLE_SCORE } from "./questions";

export type Golongan = {
  rank: number; // 1 = paling waras, 20 = paling akut
  nama: string;
  tagline: string;
};

// Urutan dari paling waras (rank 1) ke paling akut (rank 20)
export const GOLONGAN_LIST: Golongan[] = [
  { rank: 1, nama: "Hati Es Batu", tagline: "Gak bucin sama sekali, dingin total, doi siapa" },
  { rank: 2, nama: "Santuy Society", tagline: "Masih woles, sesekali notice doi doang" },
  { rank: 3, nama: "Kepo Tapi Jaim", tagline: "Suka stalk diem-diem tapi gengsi keliatan" },
  { rank: 4, nama: "Tim Fast Respon", tagline: "Chat dibales cepet, tapi belum sampe parno" },
  { rank: 5, nama: "Notif Diprioritasin", tagline: "HP udah disetel biar gak miss chat doi" },
  { rank: 6, nama: "Senyum Sendiri Gang", tagline: "Liat nama doi nongol, auto ketawa receh" },
  { rank: 7, nama: "Stalker Bersertifikat", tagline: "Story doi gak ada yang kelewat, jam berapa pun" },
  { rank: 8, nama: "Re-Read Chat Sampe Hafal", tagline: "Chat lama dibaca ulang kayak nonton ulang film favorit" },
  { rank: 9, nama: "Butuh Centang Biru Detik Ini", tagline: "Gelisah kalo chat belum dibaca-bales" },
  { rank: 10, nama: "Tim Overthinking Sejagat", tagline: 'Satu kata "oke" jadi bahan mikir semalaman' },
  { rank: 11, nama: "Rencana Auto Batal Demi Doi", tagline: "Agenda pribadi kalah sama panggilan doi" },
  { rank: 12, nama: "Panic Online Tapi Hening", tagline: "Doi online tapi gak bales, jantung deg-degan" },
  { rank: 13, nama: "Sutradara Masa Depan", tagline: "Udah bikin skenario hidup bareng doi di kepala" },
  { rank: 14, nama: "Pembela Tangguh Doi", tagline: "Bela doi mati-matian walau jelas doi yang salah" },
  { rank: 15, nama: "Bunglon Demi Doi", tagline: "Taste musik/film/makanan auto nyontek doi" },
  { rank: 16, nama: "Detektif Circle Doi", tagline: "Hafal mantan, temen, sampe riwayat doi kayak nama sendiri" },
  { rank: 17, nama: "Mode Darurat Asmara", tagline: "Segala hal di hidup auto nomor dua, doi nomor satu" },
  { rank: 18, nama: "Bahaya Tau Tapi Gas Aja", tagline: "Udah ngerti red flag-nya tapi tetep lanjut santai" },
  { rank: 19, nama: "Hampa Tanpa Kabar Doi", tagline: "Dunia berasa mati kalo doi ngilang seharian" },
  { rank: 20, nama: "Bucin Akut Tingkat Dewa", tagline: "Logika udah resign, total surrender ke doi" },
];

// Cutoff skor (dari simulasi distribusi 50.000 responden, beta(2,2) latent trait model)
// supaya golongan ekstrem (1 & 20) jauh lebih jarang dicapai dibanding golongan tengah,
// meniru pola sensus asli yang distribusinya gak rata/linear.
// Skor maksimum total = 400 (40 soal x 10).
const CUTOFFS = [47, 67, 85, 104, 121, 137, 153, 168, 183, 198, 212, 226, 240, 255, 270, 286, 303, 321, 343];

export function getGolonganFromScore(totalScore: number): Golongan {
  for (let i = 0; i < CUTOFFS.length; i++) {
    if (totalScore <= CUTOFFS[i]) {
      return GOLONGAN_LIST[i];
    }
  }
  return GOLONGAN_LIST[GOLONGAN_LIST.length - 1];
}

export function getPercentageScore(totalScore: number): number {
  return Math.round((totalScore / MAX_POSSIBLE_SCORE) * 100);
}
