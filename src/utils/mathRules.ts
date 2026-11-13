/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Pure mathematical logic for Sugar Rush: Choice Lab (Kaidah Pencacahan SMA Kelas 12)
 */

/**
 * Misi 1 – Kedai Camilan Sirkuit
 * Tantangan 1 (Aturan Penjumlahan): 4 Kue Tar + 3 Es Krim + 2 Puding = 9 pilihan
 * Tantangan 2 (Aturan Perkalian): 4 Kue Tar x 3 Minuman = 12 pasangan
 */
export function verifyMission1Challenge1(userInput: number | string): boolean {
  const parsed = typeof userInput === 'string' ? parseInt(userInput.trim(), 10) : userInput;
  return parsed === 9; // 4 + 3 + 2 = 9
}

export function verifyMission1Challenge2(userInput: number | string): boolean {
  const parsed = typeof userInput === 'string' ? parseInt(userInput.trim(), 10) : userInput;
  return parsed === 12; // 4 * 3 = 12
}

/**
 * Misi 2 – Garasi Kostum Pembalap
 * Tantangan 1 (Identifikasi Aturan): Kasus A (Penjumlahan / Saling Lepas), Kasus B (Perkalian / Berpasangan)
 * Tantangan 2 (Simulasi Manekin): 4 Atasan x 3 Bawahan x 2 Sepatu = 24 kombinasi
 */
export function verifyMission2Challenge1(
  caseA: 'penjumlahan' | 'perkalian' | '',
  caseB: 'penjumlahan' | 'perkalian' | ''
): boolean {
  return caseA === 'penjumlahan' && caseB === 'perkalian';
}

export function verifyMission2Challenge2(userInput: number | string): boolean {
  const parsed = typeof userInput === 'string' ? parseInt(userInput.trim(), 10) : userInput;
  return parsed === 24; // 4 * 3 * 2 = 24
}

/**
 * Misi 3 – Peta Jalur Sirkuit (Diagram Pohon)
 * Tantangan 1: 2 jalur utama x 3 cabang = 6 rute
 * Tantangan 2: Merakit Modifikasi Mobil Balap (Diagram Pohon 3 Tingkat)
 *   Bengkel -> Rangka (T, R) -> Ban (K, S) -> Spoiler (Y, L) => 2 x 2 x 2 = 8 kombinasi
 */
export function verifyMission3Answer(userInput: number | string): boolean {
  const parsed = typeof userInput === 'string' ? parseInt(userInput.trim(), 10) : userInput;
  return parsed === 6; // 2 * 3 = 6
}

export type TireCode = '' | 'K' | 'S';
export type SpoilerCode = '' | 'Y' | 'L';

export interface CarBranchMapping {
  tires: [TireCode, TireCode];
  spoilers: [[SpoilerCode, SpoilerCode], [SpoilerCode, SpoilerCode]];
}

export interface Mission3CarTreeMapping {
  turbo: CarBranchMapping;
  rocket: CarBranchMapping;
}

function checkPair<T extends string>(
  pair: [T, T],
  required: [Exclude<T, ''>, Exclude<T, ''>]
): { complete: boolean; hasDuplicate: boolean } {
  const filled = pair.filter((v): v is Exclude<T, ''> => v !== '');
  const hasDuplicate = new Set(filled).size !== filled.length;
  const set = new Set(filled);
  const complete =
    pair.length === 2 &&
    pair.every((v) => v !== '') &&
    required.every((code) => set.has(code));
  return { complete, hasDuplicate };
}

export function verifyMission3TreeMapping(mapping: Mission3CarTreeMapping): {
  turboTiresComplete: boolean;
  rocketTiresComplete: boolean;
  turboSpoilersComplete: [boolean, boolean];
  rocketSpoilersComplete: [boolean, boolean];
  hasDuplicate: boolean;
  combinations: string[];
  isValid: boolean;
} {
  const tTireRes = checkPair(mapping.turbo.tires, ['K', 'S']);
  const rTireRes = checkPair(mapping.rocket.tires, ['K', 'S']);

  const tSp0Res = checkPair(mapping.turbo.spoilers[0], ['Y', 'L']);
  const tSp1Res = checkPair(mapping.turbo.spoilers[1], ['Y', 'L']);
  const rSp0Res = checkPair(mapping.rocket.spoilers[0], ['Y', 'L']);
  const rSp1Res = checkPair(mapping.rocket.spoilers[1], ['Y', 'L']);

  const hasDuplicate =
    tTireRes.hasDuplicate ||
    rTireRes.hasDuplicate ||
    tSp0Res.hasDuplicate ||
    tSp1Res.hasDuplicate ||
    rSp0Res.hasDuplicate ||
    rSp1Res.hasDuplicate;

  const combinations: string[] = [];
  const frames: { code: 'T' | 'R'; branch: CarBranchMapping }[] = [
    { code: 'T', branch: mapping.turbo },
    { code: 'R', branch: mapping.rocket },
  ];

  for (const frame of frames) {
    for (let ti = 0; ti < 2; ti++) {
      const tire = frame.branch.tires[ti] || '?';
      for (let si = 0; si < 2; si++) {
        const spoiler = frame.branch.spoilers[ti][si] || '?';
        combinations.push(`(${frame.code},${tire},${spoiler})`);
      }
    }
  }

  const isValid =
    tTireRes.complete &&
    rTireRes.complete &&
    tSp0Res.complete &&
    tSp1Res.complete &&
    rSp0Res.complete &&
    rSp1Res.complete;

  return {
    turboTiresComplete: tTireRes.complete,
    rocketTiresComplete: rTireRes.complete,
    turboSpoilersComplete: [tSp0Res.complete, tSp1Res.complete],
    rocketSpoilersComplete: [rSp0Res.complete, rSp1Res.complete],
    hasDuplicate,
    combinations,
    isValid,
  };
}

export function verifyMission3Challenge2Total(userInput: number | string): boolean {
  const parsed = typeof userInput === 'string' ? parseInt(userInput.trim(), 10) : userInput;
  return parsed === 8; // 2 * 2 * 2 = 8
}

/**
 * Misi 4 – Pusat Katering FoodGo
 * Tantangan 1 (Analisis Stok Awal):
 * - Paket Sehat: 2 makanan x 3 minuman = 6
 * - Paket Hemat: 3 makanan x 2 minuman - 1 dilarang = 5
 * - Paket Spesial: 2 makanan x 2 minuman bebas = 4
 * Total Stok Awal: 6 + 5 + 4 = 15
 *
 * Tantangan 2 (Analisis Perubahan Stok):
 * - Paket Sehat: 2 makanan x 2 minuman = 4
 * - Paket Hemat: 3 makanan x 2 minuman = 6
 * - Paket Spesial: Makanan 1 (2 opsi) + Makanan 2 (1 opsi) = 3
 * Total Perubahan Stok: 4 + 6 + 3 = 13
 */
export interface FoodGoSubtotals {
  sehat: number | string;
  hemat: number | string;
  spesial: number | string;
  total?: number | string;
}

export function verifyFoodGoTantangan1Subtotals(inputs: FoodGoSubtotals): {
  sehatOk: boolean;
  hematOk: boolean;
  spesialOk: boolean;
  allSubtotalsOk: boolean;
} {
  const sehat = typeof inputs.sehat === 'string' ? parseInt(inputs.sehat.trim(), 10) : inputs.sehat;
  const hemat = typeof inputs.hemat === 'string' ? parseInt(inputs.hemat.trim(), 10) : inputs.hemat;
  const spesial = typeof inputs.spesial === 'string' ? parseInt(inputs.spesial.trim(), 10) : inputs.spesial;

  const sehatOk = sehat === 6;
  const hematOk = hemat === 5;
  const spesialOk = spesial === 4;
  return { sehatOk, hematOk, spesialOk, allSubtotalsOk: sehatOk && hematOk && spesialOk };
}

export function verifyFoodGoTantangan1Total(totalInput: number | string): boolean {
  const total = typeof totalInput === 'string' ? parseInt(totalInput.trim(), 10) : totalInput;
  return total === 15; // 6 + 5 + 4 = 15
}

export function verifyFoodGoTantangan2Subtotals(inputs: FoodGoSubtotals): {
  sehatOk: boolean;
  hematOk: boolean;
  spesialOk: boolean;
  allSubtotalsOk: boolean;
} {
  const sehat = typeof inputs.sehat === 'string' ? parseInt(inputs.sehat.trim(), 10) : inputs.sehat;
  const hemat = typeof inputs.hemat === 'string' ? parseInt(inputs.hemat.trim(), 10) : inputs.hemat;
  const spesial = typeof inputs.spesial === 'string' ? parseInt(inputs.spesial.trim(), 10) : inputs.spesial;

  const sehatOk = sehat === 4;
  const hematOk = hemat === 6;
  const spesialOk = spesial === 3;
  return { sehatOk, hematOk, spesialOk, allSubtotalsOk: sehatOk && hematOk && spesialOk };
}

export function verifyFoodGoTantangan2Total(totalInput: number | string): boolean {
  const total = typeof totalInput === 'string' ? parseInt(totalInput.trim(), 10) : totalInput;
  return total === 13; // 4 + 6 + 3 = 13
}

/**
 * Evaluasi Kuis Kaidah Pencacahan (10 Soal)
 */
export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export function shuffleQuizQuestions<T>(
  questions: readonly T[],
  rng: () => number = Math.random
): T[] {
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function scoreQuiz(userAnswers: Record<number, string>, questions: QuizQuestion[]): {
  score: number;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
} {
  let correctCount = 0;
  for (const q of questions) {
    if (userAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  }
  const totalQuestions = questions.length;
  const score = correctCount * 10;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  return { score, correctCount, totalQuestions, percentage };
}

/**
 * Quote Motivasi Matematika & Kaidah Pencacahan
 */
export interface MotivationQuote {
  text: string;
  theme: string;
}

export const MATH_MOTIVATION_QUOTES: MotivationQuote[] = [
  {
    text: 'Dalam hidup seperti halnya Kaidah Pencacahan, setiap pilihan yang kamu ambil membuka jutaan kemungkinan baru menuju kesuksesan!',
    theme: 'Kemungkinan & Pilihan',
  },
  {
    text: 'Matematika tidak hanya tentang menghitung angka, tetapi tentang menemukan pola terbaik di antara banyaknya kemungkinan.',
    theme: 'Pola & Strategi',
  },
  {
    text: 'Aturan perkalian mengajarkan kita: langkah kecil yang digabungkan dengan konsistensi akan menghasilkan pencapaian yang berlipat ganda!',
    theme: 'Aturan Perkalian',
  },
  {
    text: 'Sama seperti menyusun diagram pohon, setiap cabang tantangan membawamu selangkah lebih dekat menuju garis finis impianmu.',
    theme: 'Diagram Pohon',
  },
];

export function getMathMotivationQuote(score: number, seed?: number): MotivationQuote {
  if (typeof seed === 'number' && !Number.isNaN(seed)) {
    const idx = Math.abs(Math.floor(seed)) % MATH_MOTIVATION_QUOTES.length;
    return MATH_MOTIVATION_QUOTES[idx];
  }
  if (score >= 90) return MATH_MOTIVATION_QUOTES[0];
  if (score >= 70) return MATH_MOTIVATION_QUOTES[2];
  if (score >= 50) return MATH_MOTIVATION_QUOTES[1];
  return MATH_MOTIVATION_QUOTES[3];
}

/**
 * Format DD/MM/YYYY HH:mm:ss untuk jamMengerjakan
 */
export function formatJamMengerjakan(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const mins = pad(date.getMinutes());
  const secs = pad(date.getSeconds());
  return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
}

/**
 * Format durasi ringkas seperti "12m 35d"
 */
export function formatDurationShort(totalSeconds: number): string {
  const safeSecs = Math.max(1, Math.round(totalSeconds));
  const mins = Math.floor(safeSecs / 60);
  const secs = safeSecs % 60;
  return `${mins}m ${String(secs).padStart(2, '0')}d`;
}

/**
 * Format rincian skor Misi 1 - 4 untuk payload Google Sheets
 */
export function formatSkorMisi(completedMissions: number[]): string {
  const m1 = completedMissions.includes(1) ? 50 : 0;
  const m2 = completedMissions.includes(2) ? 50 : 0;
  const m3 = completedMissions.includes(3) ? 50 : 0;
  const m4 = completedMissions.includes(4) ? 50 : 0;
  const total = m1 + m2 + m3 + m4;
  return `Misi 1: ${m1}, Misi 2: ${m2}, Misi 3: ${m3}, Misi 4: ${m4} (Total: ${total}/200)`;
}

