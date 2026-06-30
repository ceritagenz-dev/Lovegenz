import descriptionsData from "./descriptions_data.json";

export type DescriptionsMap = Record<string, string[]>;

export const DESCRIPTIONS: DescriptionsMap = descriptionsData as DescriptionsMap;

// Pilih satu deskripsi random dari 30 yang tersedia untuk golongan tertentu.
// Dipakai sekali waktu submit, hasilnya disimpan permanen di DB (gak di-reroll tiap kali dibuka).
export function pickRandomDescription(golonganNama: string): string {
  const pool = DESCRIPTIONS[golonganNama];
  if (!pool || pool.length === 0) {
    return "Belum ada deskripsi untuk golongan ini.";
  }
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}
