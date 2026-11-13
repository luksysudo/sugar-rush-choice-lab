/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Misi 4: Pusat Katering FoodGo
 * 2 Tantangan Berjenjang (Input Subtotal tiap paket -> Input Total)
 * Tantangan 1: Analisis Stok Awal (Subtotal 6, 5, 4 -> Total 15)
 * Tantangan 2: Analisis Perubahan Stok (Subtotal 4, 6, 3 -> Total 13)
 * Tidak ada bocoran rumus atau subtotal pada kartu menu!
 * Sistem Hint bertahap ("DAN" vs "ATAU").
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  UtensilsCrossed,
  Sparkles,
  HeartPulse,
  BadgePercent,
  Crown,
  ChevronRight,
  Calculator,
} from 'lucide-react';
import { StudentProfile } from '../types';
import { VanellopeGuide } from './VanellopeGuide';
import {
  verifyFoodGoTantangan1Subtotals,
  verifyFoodGoTantangan1Total,
  verifyFoodGoTantangan2Subtotals,
  verifyFoodGoTantangan2Total,
} from '../utils/mathRules';
import { playCorrectSound, playWrongSound } from '../utils/soundEffects';

interface Mission4Props {
  profile: StudentProfile;
  onComplete: () => void;
  onBackToMap: () => void;
}

export const Mission4FoodGoCatering: React.FC<Mission4Props> = ({
  profile,
  onComplete,
  onBackToMap,
}) => {
  const [currentStage, setCurrentStage] = useState<1 | 2>(1);

  // Tantangan 1 State
  const [t1Sehat, setT1Sehat] = useState('');
  const [t1Hemat, setT1Hemat] = useState('');
  const [t1Spesial, setT1Spesial] = useState('');
  const [t1TotalInput, setT1TotalInput] = useState('');
  const [t1Checked, setT1Checked] = useState(false);
  const [t1SubtotalsCorrect, setT1SubtotalsCorrect] = useState(false);
  const [t1TotalCorrect, setT1TotalCorrect] = useState(false);
  const [t1SubtotalStatus, setT1SubtotalStatus] = useState({
    sehatOk: false,
    hematOk: false,
    spesialOk: false,
  });
  const [t1HintLevel, setT1HintLevel] = useState(1);

  // Tantangan 2 State
  const [t2Sehat, setT2Sehat] = useState('');
  const [t2Hemat, setT2Hemat] = useState('');
  const [t2Spesial, setT2Spesial] = useState('');
  const [t2TotalInput, setT2TotalInput] = useState('');
  const [t2Checked, setT2Checked] = useState(false);
  const [t2SubtotalsCorrect, setT2SubtotalsCorrect] = useState(false);
  const [t2TotalCorrect, setT2TotalCorrect] = useState(false);
  const [t2SubtotalStatus, setT2SubtotalStatus] = useState({
    sehatOk: false,
    hematOk: false,
    spesialOk: false,
  });
  const [t2HintLevel, setT2HintLevel] = useState(1);

  // Unified Check for Tantangan 1 (All 3 card subtotals + Langkah Akhir total)
  const handleCheckTantangan1 = (e: React.FormEvent) => {
    e.preventDefault();
    setT1Checked(true);
    const subRes = verifyFoodGoTantangan1Subtotals({
      sehat: t1Sehat,
      hemat: t1Hemat,
      spesial: t1Spesial,
    });
    const totalOk = verifyFoodGoTantangan1Total(t1TotalInput);

    setT1SubtotalStatus({
      sehatOk: subRes.sehatOk,
      hematOk: subRes.hematOk,
      spesialOk: subRes.spesialOk,
    });
    setT1SubtotalsCorrect(subRes.allSubtotalsOk);

    if (subRes.allSubtotalsOk && totalOk) {
      setT1TotalCorrect(true);
      playCorrectSound();
      try {
        confetti({ particleCount: 85, spread: 70, origin: { y: 0.6 } });
      } catch {}
    } else {
      setT1TotalCorrect(false);
      setT1HintLevel((prev) => prev + 1);
      playWrongSound();
    }
  };

  // Unified Check for Tantangan 2 (All 3 card subtotals + Langkah Akhir total)
  const handleCheckTantangan2 = (e: React.FormEvent) => {
    e.preventDefault();
    setT2Checked(true);
    const subRes = verifyFoodGoTantangan2Subtotals({
      sehat: t2Sehat,
      hemat: t2Hemat,
      spesial: t2Spesial,
    });
    const totalOk = verifyFoodGoTantangan2Total(t2TotalInput);

    setT2SubtotalStatus({
      sehatOk: subRes.sehatOk,
      hematOk: subRes.hematOk,
      spesialOk: subRes.spesialOk,
    });
    setT2SubtotalsCorrect(subRes.allSubtotalsOk);

    if (subRes.allSubtotalsOk && totalOk) {
      setT2TotalCorrect(true);
      playCorrectSound();
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {}
    } else {
      setT2TotalCorrect(false);
      setT2HintLevel((prev) => prev + 1);
      playWrongSound();
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] bg-candy-pattern p-3 sm:p-6 pt-16 sm:pt-16 pb-12 flex flex-col">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto w-full mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToMap}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Peta Sirkuit</span>
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Pembalap: <strong className="text-emerald-700">{profile.name || 'Pembalap Muda'}</strong></span>
            <span className="text-slate-300">|</span>
            <span className="font-bold text-purple-600">Pos 4 • Tantangan {currentStage} dari 2</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Mission Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold mb-1.5 uppercase">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Pos 4 • Pusat Katering FoodGo
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-candy tracking-wide">
              {currentStage === 1
                ? 'TANTANGAN 1: ANALISIS STOK AWAL KATERING'
                : 'TANTANGAN 2: ANALISIS PERUBAHAN STOK & BATASAN'}
            </h2>
            <p className="text-purple-100 text-xs sm:text-sm mt-0.5">
              Langkah 1: Hitung & isi kotak <strong>Subtotal Paket</strong> di bagian bawah tiap kartu paket. Langkah Akhir: Jumlahkan ketiganya!
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 px-4 rounded-2xl border border-white/20 shrink-0">
            <span className={`w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center ${currentStage === 1 ? 'bg-white text-purple-700' : 'bg-emerald-400 text-white'}`}>
              {t1TotalCorrect ? '✓' : '1'}
            </span>
            <span className="text-white text-xs font-bold">➔</span>
            <span className={`w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center ${currentStage === 2 ? 'bg-white text-purple-700' : 'bg-white/30 text-white'}`}>
              {t2TotalCorrect ? '✓' : '2'}
            </span>
          </div>
        </div>

        {/* -------------------- STAGE 1: ANALISIS STOK AWAL -------------------- */}
        {currentStage === 1 && (
          <form onSubmit={handleCheckTantangan1} className="space-y-6">
            {/* Vanellope Clear Step-by-Step Instructions */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-purple-100">
              <VanellopeGuide
                mood={t1TotalCorrect ? 'celebrating' : t1Checked ? 'hint' : 'thinking'}
                dialogue={
                  t1TotalCorrect ? (
                    <span>
                      Hebat sekali! Ketiga subtotal terhitung akurat dan total seluruh pilihan paket stok awal adalah <strong>15 paket</strong>! Sekarang ayo lanjut ke Tantangan 2!
                    </span>
                  ) : (
                    <span>
                      "Bantu kru katering FoodGo menghitung <strong>Stok Awal</strong>! <strong>Pertama</strong>, hitung subtotal pasangan tiap paket dengan mengalikan banyak makanan × banyak minuman di kotak bawah masing-masing kartu (ingat: pada <strong>Paket Hemat</strong>, kurangi <strong>1 pasangan yang dilarang</strong>!). <strong>Terakhir</strong>, jumlahkan hasil Paket Sehat + Paket Hemat + Paket Spesial pada kotak <strong>Langkah Akhir</strong> di bawah!"
                    </span>
                  )
                }
              />
            </div>

            {/* 3 Package Cards with High-Contrast Subtotal Input at the Bottom of Each Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Paket Sehat */}
              <div className="bg-white rounded-3xl p-5 border-2 border-emerald-300 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-extrabold text-slate-900 text-base font-candy">Paket Sehat</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                      Stok Awal
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <strong>Makanan:</strong> 2 pilihan (Salad Buah, Sandwich Gandum)
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <strong>Minuman:</strong> 3 pilihan (Infused Water, Jus Apel, Teh Hijau)
                    </div>
                    <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-950 text-[11px] font-medium">
                      Kondisi: Bebas dipasangkan tanpa pantangan.
                    </div>
                  </div>
                </div>

                {/* High-Contrast Subtotal Box at Card Bottom */}
                <div className="mt-4 pt-3 border-t-2 border-slate-200">
                  <div className="bg-white border-2 border-slate-800 rounded-2xl p-3 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="t1-sehat" className="text-xs font-extrabold text-slate-900">
                        Subtotal Paket:
                      </label>
                      {t1Checked && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            t1SubtotalStatus.sehatOk
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {t1SubtotalStatus.sehatOk ? 'Benar ✓' : 'Cek lagi'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="t1-sehat"
                        type="number"
                        disabled={t1TotalCorrect}
                        value={t1Sehat}
                        onChange={(e) => setT1Sehat(e.target.value)}
                        placeholder="ketik angka"
                        className="w-full px-3 py-2 text-center font-extrabold text-sm bg-white border-2 border-slate-400 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                      />
                      <span className="text-xs font-bold text-slate-700 shrink-0">paket</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paket Hemat */}
              <div className="bg-white rounded-3xl p-5 border-2 border-sky-300 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <BadgePercent className="w-5 h-5 text-sky-600" />
                      <h4 className="font-extrabold text-slate-900 text-base font-candy">Paket Hemat</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-sky-50 text-sky-800 rounded-full border border-sky-200">
                      Ada Batasan
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <strong>Makanan:</strong> 3 pilihan (Nasi Bento, Burger Mini, Kentang Madu)
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <strong>Minuman:</strong> 2 pilihan (Teh Manis, Es Lemon)
                    </div>
                    <div className="p-2.5 bg-amber-50 border border-amber-300 rounded-xl text-amber-950 text-[11px] font-medium">
                      Kondisi: <strong>Ada 1 pasangan dilarang</strong> (Kentang Madu tidak boleh dengan Es Lemon).
                    </div>
                  </div>
                </div>

                {/* High-Contrast Subtotal Box at Card Bottom */}
                <div className="mt-4 pt-3 border-t-2 border-slate-200">
                  <div className="bg-white border-2 border-slate-800 rounded-2xl p-3 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="t1-hemat" className="text-xs font-extrabold text-slate-900">
                        Subtotal Paket:
                      </label>
                      {t1Checked && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            t1SubtotalStatus.hematOk
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {t1SubtotalStatus.hematOk ? 'Benar ✓' : 'Cek lagi'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="t1-hemat"
                        type="number"
                        disabled={t1TotalCorrect}
                        value={t1Hemat}
                        onChange={(e) => setT1Hemat(e.target.value)}
                        placeholder="ketik angka"
                        className="w-full px-3 py-2 text-center font-extrabold text-sm bg-white border-2 border-slate-400 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
                      />
                      <span className="text-xs font-bold text-slate-700 shrink-0">paket</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paket Spesial */}
              <div className="bg-white rounded-3xl p-5 border-2 border-purple-300 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-purple-600" />
                      <h4 className="font-extrabold text-slate-900 text-base font-candy">Paket Spesial</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-purple-50 text-purple-800 rounded-full border border-purple-200">
                      Stok Awal
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <strong>Makanan:</strong> 2 pilihan (Steakette Wagyu, Salmon Teriyaki)
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <strong>Minuman:</strong> 2 pilihan (Ocha Dingin, Boba Milk Tea)
                    </div>
                    <div className="p-2.5 bg-purple-50/70 border border-purple-200 rounded-xl text-purple-950 text-[11px] font-medium">
                      Kondisi: Bebas dipasangkan tanpa batasan.
                    </div>
                  </div>
                </div>

                {/* High-Contrast Subtotal Box at Card Bottom */}
                <div className="mt-4 pt-3 border-t-2 border-slate-200">
                  <div className="bg-white border-2 border-slate-800 rounded-2xl p-3 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="t1-spesial" className="text-xs font-extrabold text-slate-900">
                        Subtotal Paket:
                      </label>
                      {t1Checked && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            t1SubtotalStatus.spesialOk
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {t1SubtotalStatus.spesialOk ? 'Benar ✓' : 'Cek lagi'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="t1-spesial"
                        type="number"
                        disabled={t1TotalCorrect}
                        value={t1Spesial}
                        onChange={(e) => setT1Spesial(e.target.value)}
                        placeholder="ketik angka"
                        className="w-full px-3 py-2 text-center font-extrabold text-sm bg-white border-2 border-slate-400 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                      />
                      <span className="text-xs font-bold text-slate-700 shrink-0">paket</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Langkah Akhir Box Below the 3 Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border-2 border-purple-300 space-y-5">
              {/* Stepped Hint Box */}
              {t1Checked && !t1TotalCorrect && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 space-y-2 animate-shake">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-amber-800">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>
                      {!t1SubtotalsCorrect
                        ? 'Ada subtotal paket yang belum tepat. Yuk cek petunjuk bertahap ini:'
                        : 'Subtotal ketiga paket sudah tepat! Periksa kembali Langkah Akhir (Total):'}
                    </span>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-1.5 pl-6 list-disc font-medium text-amber-900/90 leading-relaxed">
                    {!t1SubtotalStatus.sehatOk && (
                      <li>
                        <strong>Paket Sehat:</strong> 1 Makanan <strong>DAN</strong> 1 Minuman dipasangkan ➔ gunakan Aturan Perkalian: (2 makanan) × (3 minuman).
                      </li>
                    )}
                    {!t1SubtotalStatus.hematOk && (
                      <li>
                        <strong>Paket Hemat:</strong> Kalikan (3 makanan × 2 minuman), lalu ingat kurangi <strong>1 pasangan yang dilarang</strong>.
                      </li>
                    )}
                    {!t1SubtotalStatus.spesialOk && (
                      <li>
                        <strong>Paket Spesial:</strong> 2 makanan dipasangkan bebas dengan 2 minuman ➔ gunakan Aturan Perkalian: (2 makanan) × (2 minuman).
                      </li>
                    )}
                    {(t1SubtotalsCorrect || t1HintLevel >= 2) && (
                      <li>
                        <strong>Langkah Akhir (Aturan Penjumlahan):</strong> Karena memilih Paket Sehat <strong>ATAU</strong> Paket Hemat <strong>ATAU</strong> Paket Spesial, jumlahkan ketiga subtotal paket tersebut!
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {!t1TotalCorrect ? (
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border-2 border-slate-800">
                  <label htmlFor="t1-total" className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                    Langkah Akhir — Total Seluruh Pilihan Paket (Paket Sehat + Paket Hemat + Paket Spesial):
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                    <div className="flex items-center gap-2">
                      <input
                        id="t1-total"
                        type="number"
                        value={t1TotalInput}
                        onChange={(e) => setT1TotalInput(e.target.value)}
                        placeholder="ketik angka"
                        className="w-full sm:w-44 px-3 py-2.5 text-center font-extrabold text-base bg-white border-2 border-slate-500 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                      />
                      <span className="text-xs font-bold text-slate-700">paket</span>
                    </div>
                    <button
                      type="submit"
                      className="px-7 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
                    >
                      PERIKSA JAWABAN
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 sm:p-5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Tantangan 1 Tuntas! Ketiga subtotal (6, 5, 4) dan Total Stok Awal = 15 paket benar!</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStage(2)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>Lanjut ke Tantangan 2 (Perubahan Stok)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </form>
        )}

        {/* -------------------- STAGE 2: ANALISIS PERUBAHAN STOK -------------------- */}
        {currentStage === 2 && (
          <form onSubmit={handleCheckTantangan2} className="space-y-6">
            {/* Vanellope Clear Step-by-Step Instructions */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-purple-100">
              <VanellopeGuide
                mood={t2TotalCorrect ? 'celebrating' : t2Checked ? 'hint' : 'thinking'}
                dialogue={
                  t2TotalCorrect ? (
                    <span>
                      Fantastis! Kamu berhasil menuntaskan seluruh 4 Pos Misi di Sugar Rush Choice Lab! Total perubahan stok yang terhitung adalah <strong>13 paket</strong>!
                    </span>
                  ) : (
                    <span>
                      "Sekarang terjadi perubahan stok di katering! <strong>Pertama</strong>, hitung ulang subtotal tiap paket di kotak bawah masing-masing kartu (<strong>Paket Sehat</strong> berkurang 1 minuman, <strong>Paket Hemat</strong> larangan dibuka sehingga bebas dipasangkan, dan <strong>Paket Spesial</strong> ikuti syarat khusus Makanan 1 + Makanan 2). <strong>Terakhir</strong>, jumlahkan ketiga subtotal pada kotak <strong>Langkah Akhir</strong> di bawah!"
                    </span>
                  )
                }
              />
            </div>

            {/* 3 Package Cards with High-Contrast Subtotal Input at Card Bottom */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Paket Sehat (1 minuman habis) */}
              <div className="bg-white rounded-3xl p-5 border-2 border-emerald-300 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-extrabold text-slate-900 text-base font-candy">Paket Sehat</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full border border-rose-200">
                      Stok Berubah
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <strong>Makanan:</strong> 2 pilihan
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <strong>Minuman:</strong> 2 pilihan (1 minuman habis dari semula 3)
                    </div>
                    <div className="p-2.5 bg-amber-50 border border-amber-300 rounded-xl text-amber-950 text-[11px] font-medium">
                      Kondisi: Tersisa 2 makanan & 2 minuman bebas dipasangkan.
                    </div>
                  </div>
                </div>

                {/* High-Contrast Subtotal Box at Card Bottom */}
                <div className="mt-4 pt-3 border-t-2 border-slate-200">
                  <div className="bg-white border-2 border-slate-800 rounded-2xl p-3 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="t2-sehat" className="text-xs font-extrabold text-slate-900">
                        Subtotal Paket:
                      </label>
                      {t2Checked && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            t2SubtotalStatus.sehatOk
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {t2SubtotalStatus.sehatOk ? 'Benar ✓' : 'Cek lagi'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="t2-sehat"
                        type="number"
                        disabled={t2TotalCorrect}
                        value={t2Sehat}
                        onChange={(e) => setT2Sehat(e.target.value)}
                        placeholder="ketik angka"
                        className="w-full px-3 py-2 text-center font-extrabold text-sm bg-white border-2 border-slate-400 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                      />
                      <span className="text-xs font-bold text-slate-700 shrink-0">paket</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paket Hemat (Batasan dibuka) */}
              <div className="bg-white rounded-3xl p-5 border-2 border-sky-300 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <BadgePercent className="w-5 h-5 text-sky-600" />
                      <h4 className="font-extrabold text-slate-900 text-base font-candy">Paket Hemat</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                      Batasan Dibuka
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <strong>Makanan:</strong> 3 pilihan
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <strong>Minuman:</strong> 2 pilihan
                    </div>
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-[11px] font-medium">
                      Kondisi: <strong>Pasangan terlarang dibuka penuh</strong>, semua boleh dipasangkan.
                    </div>
                  </div>
                </div>

                {/* High-Contrast Subtotal Box at Card Bottom */}
                <div className="mt-4 pt-3 border-t-2 border-slate-200">
                  <div className="bg-white border-2 border-slate-800 rounded-2xl p-3 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="t2-hemat" className="text-xs font-extrabold text-slate-900">
                        Subtotal Paket:
                      </label>
                      {t2Checked && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            t2SubtotalStatus.hematOk
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {t2SubtotalStatus.hematOk ? 'Benar ✓' : 'Cek lagi'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="t2-hemat"
                        type="number"
                        disabled={t2TotalCorrect}
                        value={t2Hemat}
                        onChange={(e) => setT2Hemat(e.target.value)}
                        placeholder="ketik angka"
                        className="w-full px-3 py-2 text-center font-extrabold text-sm bg-white border-2 border-slate-400 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
                      />
                      <span className="text-xs font-bold text-slate-700 shrink-0">paket</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paket Spesial (Syarat Khusus) */}
              <div className="bg-white rounded-3xl p-5 border-2 border-purple-300 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-purple-600" />
                      <h4 className="font-extrabold text-slate-900 text-base font-candy">Paket Spesial</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                      Syarat Baru
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <strong>Makanan 1:</strong> Hanya dapat dipadukan dengan 2 minuman
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <strong>Makanan 2:</strong> Hanya dapat dipadukan dengan 1 minuman khusus
                    </div>
                    <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl text-purple-950 text-[11px] font-medium">
                      Kondisi: Jumlahkan kemungkinan pasangan Makanan 1 + Makanan 2.
                    </div>
                  </div>
                </div>

                {/* High-Contrast Subtotal Box at Card Bottom */}
                <div className="mt-4 pt-3 border-t-2 border-slate-200">
                  <div className="bg-white border-2 border-slate-800 rounded-2xl p-3 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="t2-spesial" className="text-xs font-extrabold text-slate-900">
                        Subtotal Paket:
                      </label>
                      {t2Checked && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            t2SubtotalStatus.spesialOk
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {t2SubtotalStatus.spesialOk ? 'Benar ✓' : 'Cek lagi'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="t2-spesial"
                        type="number"
                        disabled={t2TotalCorrect}
                        value={t2Spesial}
                        onChange={(e) => setT2Spesial(e.target.value)}
                        placeholder="ketik angka"
                        className="w-full px-3 py-2 text-center font-extrabold text-sm bg-white border-2 border-slate-400 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                      />
                      <span className="text-xs font-bold text-slate-700 shrink-0">paket</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Langkah Akhir Box Below the 3 Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border-2 border-purple-300 space-y-5">
              {/* Stepped Hint Box */}
              {t2Checked && !t2TotalCorrect && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 space-y-2 animate-shake">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-amber-800">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>
                      {!t2SubtotalsCorrect
                        ? 'Subtotal perubahan stokmu belum tepat. Coba perhatikan petunjuk bertahap ini:'
                        : 'Subtotal perubahan stok sudah tepat! Periksa kembali Langkah Akhir (Total):'}
                    </span>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-1.5 pl-6 list-disc font-medium text-amber-900/90 leading-relaxed">
                    {!t2SubtotalStatus.sehatOk && (
                      <li>
                        <strong>Paket Sehat:</strong> Karena 1 minuman habis, tersisa 2 makanan & 2 minuman ➔ gunakan Aturan Perkalian (2 × 2).
                      </li>
                    )}
                    {!t2SubtotalStatus.hematOk && (
                      <li>
                        <strong>Paket Hemat:</strong> Karena larangan dibuka penuh, semua 3 makanan bebas berpasangan dengan 2 minuman ➔ gunakan Aturan Perkalian (3 × 2).
                      </li>
                    )}
                    {!t2SubtotalStatus.spesialOk && (
                      <li>
                        <strong>Paket Spesial:</strong> Makanan 1 memiliki 2 pasangan minuman, sedangkan Makanan 2 memiliki 1 pasangan minuman ➔ jumlahkan (2 + 1).
                      </li>
                    )}
                    {(t2SubtotalsCorrect || t2HintLevel >= 2) && (
                      <li>
                        <strong>Langkah Akhir (Aturan Penjumlahan):</strong> Karena memilih Paket Sehat <strong>ATAU</strong> Paket Hemat <strong>ATAU</strong> Paket Spesial, jumlahkan ketiga subtotal paket tersebut!
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {!t2TotalCorrect ? (
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border-2 border-slate-800">
                  <label htmlFor="t2-total" className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                    Langkah Akhir — Total Seluruh Pilihan Paket (Paket Sehat + Paket Hemat + Paket Spesial):
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                    <div className="flex items-center gap-2">
                      <input
                        id="t2-total"
                        type="number"
                        value={t2TotalInput}
                        onChange={(e) => setT2TotalInput(e.target.value)}
                        placeholder="ketik angka"
                        className="w-full sm:w-44 px-3 py-2.5 text-center font-extrabold text-base bg-white border-2 border-slate-500 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                      />
                      <span className="text-xs font-bold text-slate-700">paket</span>
                    </div>
                    <button
                      type="submit"
                      className="px-7 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
                    >
                      PERIKSA JAWABAN
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 font-extrabold text-base text-emerald-800">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <span>Seluruh Tantangan Misi 4 Tuntas! (+50 PTS & ⭐ Bintang ke-4 Diraih!)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-800/90 leading-relaxed">
                    <strong>Rangkuman Pembelajaran:</strong>
                    <br />• <em>Tantangan 1 (Stok Awal):</em> Paket Sehat (6) + Paket Hemat (5) + Paket Spesial (4) = 15 paket.
                    <br />• <em>Tantangan 2 (Perubahan Stok):</em> Paket Sehat (4) + Paket Hemat (6) + Paket Spesial (3) = 13 paket.
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={onComplete}
                      className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-candy font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <span>KEMBALI KE PETA SIRKUIT & BUKA KUIS EVALUASI &gt;</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
