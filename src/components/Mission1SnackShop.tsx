/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Misi 1: Kedai Camilan Sirkuit
 * Tantangan 1 (Aturan Penjumlahan: 4 + 3 + 2 = 9)
 * Tantangan 2 (Aturan Perkalian: 4 x 3 = 12)
 * Sistem Hint bertahap ("DAN" vs "ATAU") tanpa membocorkan jawaban benar.
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  Coffee,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { StudentProfile } from '../types';
import { VanellopeGuide } from './VanellopeGuide';
import {
  verifyMission1Challenge1,
  verifyMission1Challenge2,
} from '../utils/mathRules';
import { playCorrectSound, playWrongSound } from '../utils/soundEffects';

interface Mission1Props {
  profile: StudentProfile;
  onComplete: () => void;
  onBackToMap: () => void;
}

export const Mission1SnackShop: React.FC<Mission1Props> = ({
  profile,
  onComplete,
  onBackToMap,
}) => {
  // Current challenge stage: 1 or 2
  const [currentStage, setCurrentStage] = useState<1 | 2>(1);

  // Challenge 1 State (Aturan Penjumlahan: 4 + 3 + 2 = 9)
  const [c1Input, setC1Input] = useState('');
  const [c1Checked, setC1Checked] = useState(false);
  const [c1Correct, setC1Correct] = useState(false);
  const [c1HintLevel, setC1HintLevel] = useState(1);

  // Challenge 2 State (Aturan Perkalian: 4 x 3 = 12)
  const [c2Input, setC2Input] = useState('');
  const [c2Checked, setC2Checked] = useState(false);
  const [c2Correct, setC2Correct] = useState(false);
  const [c2HintLevel, setC2HintLevel] = useState(1);

  const cakes = [
    { name: 'Tar Ceri Manis', icon: '🎂' },
    { name: 'Tar Cokelat Lava', icon: '🍰' },
    { name: 'Tar Strawberry Glaze', icon: '🧁' },
    { name: 'Tar Keju Karamel', icon: '🥧' },
  ];

  const iceCreams = [
    { name: 'Es Krim Mint Choco', icon: '🍦' },
    { name: 'Es Krim Vanilla Berry', icon: '🍧' },
    { name: 'Es Krim Sundae Pelangi', icon: '🍨' },
  ];

  const puddings = [
    { name: 'Puding Mangga Tropis', icon: '🍮' },
    { name: 'Puding Karamel Susu', icon: '🍮' },
  ];

  const drinks = [
    { name: 'Susu Hangat Madu', icon: '🥛' },
    { name: 'Jus Jeruk Segar', icon: '🧃' },
    { name: 'Teh Lemon Mint', icon: '🍵' },
  ];

  // Handle Challenge 1 Check
  const handleCheckChallenge1 = (e: React.FormEvent) => {
    e.preventDefault();
    setC1Checked(true);
    const correct = verifyMission1Challenge1(c1Input);

    if (correct) {
      setC1Correct(true);
      playCorrectSound();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#EC4899', '#34D399', '#FBBF24'],
        });
      } catch {
        // ignore
      }
    } else {
      setC1Correct(false);
      setC1HintLevel((prev) => prev + 1);
      playWrongSound();
    }
  };

  // Handle Challenge 2 Check
  const handleCheckChallenge2 = (e: React.FormEvent) => {
    e.preventDefault();
    setC2Checked(true);
    const correct = verifyMission1Challenge2(c2Input);

    if (correct) {
      setC2Correct(true);
      playCorrectSound();
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#10B981', '#38BDF8', '#EC4899'],
        });
      } catch {
        // ignore
      }
    } else {
      setC2Correct(false);
      setC2HintLevel((prev) => prev + 1);
      playWrongSound();
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] bg-candy-pattern p-3 sm:p-6 pt-16 sm:pt-16 pb-12 flex flex-col">
      {/* Top Navigation */}
      <div className="max-w-5xl mx-auto w-full mb-5">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 flex items-center justify-between">
          <button
            onClick={onBackToMap}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Peta Sirkuit</span>
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Pembalap: <strong className="text-emerald-700">{profile.name || 'Pembalap Muda'}</strong></span>
            <span className="text-slate-300">|</span>
            <span className="font-bold text-pink-600">Pos 1 • Tantangan {currentStage} dari 2</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full space-y-6">
        {/* Mission Banner Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold mb-2 uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5" />
              Pos 1 • Kedai Camilan Sirkuit
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-candy tracking-wide">
              {currentStage === 1 ? 'TANTANGAN 1: ATURAN PENJUMLAHAN' : 'TANTANGAN 2: ATURAN PERKALIAN'}
            </h2>
            <p className="text-pink-100 text-xs sm:text-sm mt-1 max-w-xl">
              {currentStage === 1
                ? 'Pahami konsep kata hubung "ATAU" untuk kejadian saling lepas saat memilih 1 camilan tunggal.'
                : 'Pahami konsep kata hubung "DAN" untuk kejadian berpasangan simultan saat meracik paket sarapan.'}
            </p>
          </div>

          {/* Stepper Pill Indicator */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 px-4 rounded-2xl border border-white/20 shrink-0">
            <span className={`w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center ${currentStage === 1 ? 'bg-white text-pink-600' : 'bg-emerald-400 text-white'}`}>
              {c1Correct ? '✓' : '1'}
            </span>
            <span className="text-white text-xs font-bold">➔</span>
            <span className={`w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center ${currentStage === 2 ? 'bg-white text-pink-600' : 'bg-white/30 text-white'}`}>
              {c2Correct ? '✓' : '2'}
            </span>
          </div>
        </div>

        {/* -------------------- STAGE 1: TANTANGAN 1 (PENJUMLAHAN) -------------------- */}
        {currentStage === 1 && (
          <div className="space-y-6">
            {/* Etalase Makanan: 4 Tar + 3 Es Krim + 2 Puding */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tar (4) */}
              <div className="bg-white rounded-3xl p-5 border-2 border-rose-200 shadow-xs">
                <h4 className="font-extrabold text-sm text-rose-900 mb-3 flex items-center justify-between">
                  <span>Kelompok Kue Tar</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200">
                    4 jenis
                  </span>
                </h4>
                <div className="space-y-2">
                  {cakes.map((c, i) => (
                    <div key={i} className="p-2 px-3 bg-rose-50/50 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-700">
                      <span className="text-lg">{c.icon}</span>
                      <span>{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Es Krim (3) */}
              <div className="bg-white rounded-3xl p-5 border-2 border-sky-200 shadow-xs">
                <h4 className="font-extrabold text-sm text-sky-900 mb-3 flex items-center justify-between">
                  <span>Kelompok Es Krim</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-sky-50 border border-sky-200">
                    3 rasa
                  </span>
                </h4>
                <div className="space-y-2">
                  {iceCreams.map((ic, i) => (
                    <div key={i} className="p-2 px-3 bg-sky-50/50 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-700">
                      <span className="text-lg">{ic.icon}</span>
                      <span>{ic.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Puding (2) */}
              <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-xs">
                <h4 className="font-extrabold text-sm text-amber-900 mb-3 flex items-center justify-between">
                  <span>Kelompok Puding</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                    2 jenis
                  </span>
                </h4>
                <div className="space-y-2">
                  {puddings.map((p, i) => (
                    <div key={i} className="p-2 px-3 bg-amber-50/50 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-700">
                      <span className="text-lg">{p.icon}</span>
                      <span>{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Question Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-pink-100 space-y-6">
              <VanellopeGuide
                mood={c1Correct ? 'celebrating' : c1Checked ? 'hint' : 'thinking'}
                dialogue={
                  c1Correct ? (
                    <span>
                      Hebat sekali! Karena aku hanya boleh memilih <strong>1 jenis camilan saja</strong> (kejadian saling lepas dengan kata hubung <strong>"ATAU"</strong>), maka kita gunakan <strong>Aturan Penjumlahan</strong>! Sekarang ayo lanjut ke Tantangan 2!
                    </span>
                  ) : (
                    <span>
                      "Sebelum sesi latihan balap dimulai, aku hanya boleh memilih <strong>1 jenis camilan saja</strong> dari etalase yang berisi <strong>4 jenis Kue Tar</strong>, <strong>3 rasa Es Krim</strong>, dan <strong>2 jenis Puding</strong>. Berapa banyak pilihan camilan yang bisa kuambil?"
                    </span>
                  )
                }
              />

              {/* Stepped Hint Box (Strict: NEVER reveal formula or answer, hide advance button) */}
              {c1Checked && !c1Correct && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 space-y-2 animate-shake">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-amber-800">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Jawabanmu belum tepat. Yuk periksa konsep kata hubungnya:</span>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-1.5 pl-6 list-disc font-medium text-amber-900/90 leading-relaxed">
                    <li>
                      <strong>Cek Konsep:</strong> Vanellope hanya memilih <em>SATU</em> camilan saja (ia memilih Kue Tar <strong>ATAU</strong> Es Krim <strong>ATAU</strong> Puding), bukan memakannya secara bersamaan.
                    </li>
                    <li>
                      <strong>Identifikasi Aturan:</strong> Karena kejadian ini saling lepas (menggunakan kata hubung <strong>"ATAU"</strong>), aturan apa yang digunakan? Apakah Aturan Perkalian atau Aturan Penjumlahan?
                    </li>
                    {c1HintLevel >= 2 && (
                      <li>
                        <strong>Petunjuk Tambahan:</strong> Untuk konsep "ATAU", gunakan <strong>Aturan Penjumlahan</strong>. Jumlahkan semua opsi yang tersedia: (jumlah kue tar) + (jumlah es krim) + (jumlah puding). Coba hitung kembali!
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Success Banner */}
              {c1Correct && (
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Tantangan 1 Berhasil! Siap untuk Tantangan 2?</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStage(2)}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                  >
                    <span>Lanjut ke Tantangan 2</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Form Input (Hidden or Disabled when correct) */}
              {!c1Correct && (
                <form onSubmit={handleCheckChallenge1} className="flex flex-col sm:flex-row items-center gap-3">
                  <label htmlFor="c1-input" className="text-xs sm:text-sm font-bold text-slate-800 shrink-0">
                    Berapa banyak pilihan camilan?
                  </label>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      id="c1-input"
                      type="number"
                      value={c1Input}
                      onChange={(e) => setC1Input(e.target.value)}
                      placeholder="Ketik angka..."
                      className="w-full sm:w-36 px-4 py-2.5 text-center font-bold text-base bg-[#FAF8F5] border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:outline-none focus:bg-white text-slate-800"
                    />
                    <span className="text-xs font-semibold text-slate-500">pilihan</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
                  >
                    PERIKSA JAWABAN
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* -------------------- STAGE 2: TANTANGAN 2 (PERKALIAN) -------------------- */}
        {currentStage === 2 && (
          <div className="space-y-6">
            {/* Visual Pairing Showcase: 4 Kue Tar x 3 Minuman */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 4 Kue Tar */}
              <div className="bg-white rounded-3xl p-5 border-2 border-rose-200 shadow-xs">
                <h4 className="font-extrabold text-sm text-rose-900 mb-3 flex items-center justify-between">
                  <span>Pilihan Kue Tar (Tahap 1)</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200">
                    4 jenis
                  </span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {cakes.map((c, i) => (
                    <div key={i} className="p-2 px-3 bg-rose-50/50 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-700">
                      <span className="text-lg">{c.icon}</span>
                      <span>{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 Minuman */}
              <div className="bg-white rounded-3xl p-5 border-2 border-teal-200 shadow-xs">
                <h4 className="font-extrabold text-sm text-teal-900 mb-3 flex items-center justify-between">
                  <span>Pilihan Minuman (Tahap 2)</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200">
                    3 pilihan
                  </span>
                </h4>
                <div className="space-y-2">
                  {drinks.map((d, i) => (
                    <div key={i} className="p-2 px-3 bg-teal-50/50 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-700">
                      <span className="text-lg">{d.icon}</span>
                      <span>{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Question Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-pink-100 space-y-6">
              <VanellopeGuide
                mood={c2Correct ? 'celebrating' : c2Checked ? 'hint' : 'thinking'}
                dialogue={
                  c2Correct ? (
                    <span>
                      Tepat sekali! Karena kita harus mengambil 1 Kue Tar <strong>DAN</strong> 1 Minuman secara berpasangan, kita gunakan <strong>Aturan Perkalian</strong>! Misi 1 selesai dengan sempurna!
                    </span>
                  ) : (
                    <span>
                      "Untuk paket sarapan pembalap, aku harus mengambil <strong>1 Kue Tar DAN 1 Minuman</strong>. Jika tersedia <strong>4 Kue Tar</strong> dan <strong>3 Minuman</strong>, berapa banyak pasangan sarapan yang bisa kubuat?"
                    </span>
                  )
                }
              />

              {/* Stepped Hint Box */}
              {c2Checked && !c2Correct && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 space-y-2 animate-shake">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-amber-800">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Jawabanmu belum tepat. Coba perhatikan petunjuk bertahap ini:</span>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-1.5 pl-6 list-disc font-medium text-amber-900/90 leading-relaxed">
                    <li>
                      <strong>Cek Konsep:</strong> Perhatikan kata hubungnya. Apakah Vanellope memilih Kue Tar <em>ATAU</em> Minuman, ataukah ia mengambil 1 Kue Tar <strong>DAN</strong> 1 Minuman secara berpasangan?
                    </li>
                    <li>
                      <strong>Identifikasi Aturan:</strong> Karena kejadian ini terjadi bersama-sama/berurutan (berpasangan dengan kata hubung <strong>"DAN"</strong>), gunakan <strong>Aturan Perkalian</strong>, bukan penjumlahan!
                    </li>
                    {c2HintLevel >= 2 && (
                      <li>
                        <strong>Petunjuk Tambahan:</strong> Kalikan banyaknya opsi kue tar (4) dengan banyaknya opsi minuman (3). Coba hitung kembali!
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Success Banner & Continue to Circuit Map Button */}
              {c2Correct && (
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 text-emerald-900 space-y-3">
                  <div className="flex items-center gap-2 font-extrabold text-base text-emerald-800">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <span>Kedua Tantangan Misi 1 Tuntas! (+50 PTS & ⭐ 1 Bintang)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-800/90 leading-relaxed">
                    <strong>Rangkuman Pembelajaran:</strong>
                    <br />• <em>Tantangan 1 (Kata hubung ATAU / Saling Lepas):</em> Aturan Penjumlahan = 4 + 3 + 2 = 9 pilihan.
                    <br />• <em>Tantangan 2 (Kata hubung DAN / Berpasangan):</em> Aturan Perkalian = 4 × 3 = 12 pasangan. Pasangan ini juga dapat dipetakan pada <strong>Tabel Silang (4 baris × 3 kolom = 12 sel)</strong> maupun <strong>Diagram Pohon (4 cabang × 3 cabang)</strong>!
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={onComplete}
                      className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-candy font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <span>KEMBALI KE PETA SIRKUIT & BUKA POS 2 &gt;</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Form Input */}
              {!c2Correct && (
                <form onSubmit={handleCheckChallenge2} className="flex flex-col sm:flex-row items-center gap-3">
                  <label htmlFor="c2-input" className="text-xs sm:text-sm font-bold text-slate-800 shrink-0">
                    Berapa banyak pasangan sarapan?
                  </label>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      id="c2-input"
                      type="number"
                      value={c2Input}
                      onChange={(e) => setC2Input(e.target.value)}
                      placeholder="Ketik angka..."
                      className="w-full sm:w-36 px-4 py-2.5 text-center font-bold text-base bg-[#FAF8F5] border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:outline-none focus:bg-white text-slate-800"
                    />
                    <span className="text-xs font-semibold text-slate-500">pasangan</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
                  >
                    PERIKSA JAWABAN
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
