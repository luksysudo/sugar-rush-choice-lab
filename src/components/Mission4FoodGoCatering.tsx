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
  const [t1SubtotalsChecked, setT1SubtotalsChecked] = useState(false);
  const [t1SubtotalsCorrect, setT1SubtotalsCorrect] = useState(false);
  const [t1TotalInput, setT1TotalInput] = useState('');
  const [t1TotalChecked, setT1TotalChecked] = useState(false);
  const [t1TotalCorrect, setT1TotalCorrect] = useState(false);
  const [t1HintLevel, setT1HintLevel] = useState(1);

  // Tantangan 2 State
  const [t2Sehat, setT2Sehat] = useState('');
  const [t2Hemat, setT2Hemat] = useState('');
  const [t2Spesial, setT2Spesial] = useState('');
  const [t2SubtotalsChecked, setT2SubtotalsChecked] = useState(false);
  const [t2SubtotalsCorrect, setT2SubtotalsCorrect] = useState(false);
  const [t2TotalInput, setT2TotalInput] = useState('');
  const [t2TotalChecked, setT2TotalChecked] = useState(false);
  const [t2TotalCorrect, setT2TotalCorrect] = useState(false);
  const [t2HintLevel, setT2HintLevel] = useState(1);

  // Check Tantangan 1 Subtotals
  const handleCheckT1Subtotals = (e: React.FormEvent) => {
    e.preventDefault();
    setT1SubtotalsChecked(true);
    const res = verifyFoodGoTantangan1Subtotals({
      sehat: t1Sehat,
      hemat: t1Hemat,
      spesial: t1Spesial,
    });

    if (res.allSubtotalsOk) {
      setT1SubtotalsCorrect(true);
      playCorrectSound();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
    } else {
      setT1SubtotalsCorrect(false);
      setT1HintLevel((prev) => prev + 1);
      playWrongSound();
    }
  };

  // Check Tantangan 1 Total
  const handleCheckT1Total = (e: React.FormEvent) => {
    e.preventDefault();
    setT1TotalChecked(true);
    const correct = verifyFoodGoTantangan1Total(t1TotalInput);

    if (correct) {
      setT1TotalCorrect(true);
      playCorrectSound();
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch {}
    } else {
      setT1TotalCorrect(false);
      setT1HintLevel((prev) => prev + 1);
      playWrongSound();
    }
  };

  // Check Tantangan 2 Subtotals
  const handleCheckT2Subtotals = (e: React.FormEvent) => {
    e.preventDefault();
    setT2SubtotalsChecked(true);
    const res = verifyFoodGoTantangan2Subtotals({
      sehat: t2Sehat,
      hemat: t2Hemat,
      spesial: t2Spesial,
    });

    if (res.allSubtotalsOk) {
      setT2SubtotalsCorrect(true);
      playCorrectSound();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
    } else {
      setT2SubtotalsCorrect(false);
      setT2HintLevel((prev) => prev + 1);
      playWrongSound();
    }
  };

  // Check Tantangan 2 Total
  const handleCheckT2Total = (e: React.FormEvent) => {
    e.preventDefault();
    setT2TotalChecked(true);
    const correct = verifyFoodGoTantangan2Total(t2TotalInput);

    if (correct) {
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
              Format pertanyaan berjenjang: Hitung subtotal tiap paket terlebih dahulu, lalu hitung total seluruh kemungkinan paket.
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
          <div className="space-y-6">
            {/* 3 Package Cards (WITHOUT any formula or subtotal spoilers!) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Paket Sehat */}
              <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-extrabold text-slate-800 text-sm font-candy">Paket Sehat</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                      Stok Awal
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <strong>Makanan:</strong> 2 pilihan (Salad Buah, Sandwich Gandum)
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <strong>Minuman:</strong> 3 pilihan (Infused Water, Jus Apel, Teh Hijau)
                    </div>
                    <div className="p-2 bg-emerald-50/70 border border-emerald-100 rounded-xl text-emerald-900 text-[11px]">
                      Kondisi: Bebas dipasangkan tanpa pantangan.
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-semibold text-center italic">
                  Hitung subtotal pasangan Paket Sehat
                </div>
              </div>

              {/* Paket Hemat */}
              <div className="bg-white rounded-3xl p-5 border-2 border-sky-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <BadgePercent className="w-5 h-5 text-sky-600" />
                      <h4 className="font-extrabold text-slate-800 text-sm font-candy">Paket Hemat</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-sky-50 text-sky-800 rounded-full border border-sky-200">
                      Ada Batasan
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <strong>Makanan:</strong> 3 pilihan (Nasi Bento, Burger Mini, Kentang Madu)
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <strong>Minuman:</strong> 2 pilihan (Teh Manis, Es Lemon)
                    </div>
                    <div className="p-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
                      Kondisi: <strong>Ada 1 pasangan dilarang</strong> (Kentang Madu tidak boleh dengan Es Lemon).
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-semibold text-center italic">
                  Hitung subtotal pasangan Paket Hemat
                </div>
              </div>

              {/* Paket Spesial */}
              <div className="bg-white rounded-3xl p-5 border-2 border-purple-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-purple-600" />
                      <h4 className="font-extrabold text-slate-800 text-sm font-candy">Paket Spesial</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-purple-50 text-purple-800 rounded-full border border-purple-200">
                      Stok Awal
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <strong>Makanan:</strong> 2 pilihan (Steakette Wagyu, Salmon Teriyaki)
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <strong>Minuman:</strong> 2 pilihan (Ocha Dingin, Boba Milk Tea)
                    </div>
                    <div className="p-2 bg-purple-50/70 border border-purple-100 rounded-xl text-purple-900 text-[11px]">
                      Kondisi: Bebas dipasangkan tanpa batasan.
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-semibold text-center italic">
                  Hitung subtotal pasangan Paket Spesial
                </div>
              </div>
            </div>

            {/* Berjenjang Question Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-purple-100 space-y-6">
              <VanellopeGuide
                mood={t1TotalCorrect ? 'celebrating' : t1SubtotalsCorrect ? 'happy' : t1SubtotalsChecked ? 'hint' : 'thinking'}
                dialogue={
                  t1TotalCorrect ? (
                    <span>
                      Hebat sekali! Ketiga subtotal terhitung akurat dan total stok awal adalah <strong>15 kemungkinan paket</strong>! Sekarang, ayo beralih ke Tantangan 2 untuk menganalisis perubahan stok!
                    </span>
                  ) : t1SubtotalsCorrect ? (
                    <span>
                      "Subtotal ketiga paket sudah tepat! Sekarang, karena kru balap memilih Paket Sehat <strong>ATAU</strong> Paket Hemat <strong>ATAU</strong> Paket Spesial, berapa Total seluruh kemungkinan paket stok awal?"
                    </span>
                  ) : (
                    <span>
                      "Bantu kru katering FoodGo menganalisis <strong>Stok Awal</strong>! Hitung subtotal kemungkinan pasangan untuk Paket Sehat, Paket Hemat, dan Paket Spesial terlebih dahulu."
                    </span>
                  )
                }
              />

              {/* Stepped Hint Box for Subtotals */}
              {t1SubtotalsChecked && !t1SubtotalsCorrect && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 space-y-2 animate-shake">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-amber-800">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Subtotal paketmu belum tepat. Perhatikan petunjuk bertahap ini:</span>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-1.5 pl-6 list-disc font-medium text-amber-900/90 leading-relaxed">
                    <li>
                      <strong>Paket Sehat:</strong> 1 Makanan <strong>DAN</strong> 1 Minuman dipasangkan ➔ gunakan Aturan Perkalian: (2 makanan) × (3 minuman).
                    </li>
                    <li>
                      <strong>Paket Hemat:</strong> Hitung total kombinasi (3 makanan × 2 minuman), lalu kurangi 1 pasangan yang dilarang.
                    </li>
                    <li>
                      <strong>Paket Spesial:</strong> 2 makanan dipasangkan bebas dengan 2 minuman ➔ gunakan Aturan Perkalian: (2 makanan) × (2 minuman).
                    </li>
                  </ul>
                </div>
              )}

              {/* STEP 1: Input Subtotals Form */}
              <form onSubmit={handleCheckT1Subtotals} className="space-y-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Langkah 1: Masukkan Subtotal Tiap Paket
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Sehat */}
                  <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-1.5">
                    <label htmlFor="t1-sehat" className="block text-xs font-bold text-emerald-900">
                      Subtotal Paket Sehat:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="t1-sehat"
                        type="number"
                        disabled={t1SubtotalsCorrect}
                        value={t1Sehat}
                        onChange={(e) => setT1Sehat(e.target.value)}
                        placeholder="Ketik angka..."
                        className="w-full px-3 py-2 text-center font-bold text-sm bg-white border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                      <span className="text-xs font-medium text-slate-500">paket</span>
                    </div>
                  </div>

                  {/* Hemat */}
                  <div className="p-3 bg-sky-50/50 rounded-2xl border border-sky-200 space-y-1.5">
                    <label htmlFor="t1-hemat" className="block text-xs font-bold text-sky-900">
                      Subtotal Paket Hemat:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="t1-hemat"
                        type="number"
                        disabled={t1SubtotalsCorrect}
                        value={t1Hemat}
                        onChange={(e) => setT1Hemat(e.target.value)}
                        placeholder="Ketik angka..."
                        className="w-full px-3 py-2 text-center font-bold text-sm bg-white border border-sky-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                      <span className="text-xs font-medium text-slate-500">paket</span>
                    </div>
                  </div>

                  {/* Spesial */}
                  <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-1.5">
                    <label htmlFor="t1-spesial" className="block text-xs font-bold text-purple-900">
                      Subtotal Paket Spesial:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="t1-spesial"
                        type="number"
                        disabled={t1SubtotalsCorrect}
                        value={t1Spesial}
                        onChange={(e) => setT1Spesial(e.target.value)}
                        placeholder="Ketik angka..."
                        className="w-full px-3 py-2 text-center font-bold text-sm bg-white border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <span className="text-xs font-medium text-slate-500">paket</span>
                    </div>
                  </div>
                </div>

                {!t1SubtotalsCorrect && (
                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
                    >
                      PERIKSA SUBTOTAL PAKET
                    </button>
                  </div>
                )}
              </form>

              {/* STEP 2: Input Total (Only unlocked once subtotals are correct!) */}
              {t1SubtotalsCorrect && (
                <div className="pt-4 border-t border-purple-100 space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Subtotal ketiga paket terverifikasi benar! Sekarang masukkan Total Stok Awal:</span>
                  </div>

                  {/* Stepped Hint Box for Total */}
                  {t1TotalChecked && !t1TotalCorrect && (
                    <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-amber-900 space-y-1.5 animate-shake">
                      <div className="flex items-center gap-2 font-bold text-xs text-amber-800">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Totalmu belum tepat:</span>
                      </div>
                      <p className="text-xs text-amber-900/90 leading-relaxed pl-6">
                        Karena kategori Paket Sehat, Paket Hemat, dan Paket Spesial adalah pilihan yang saling lepas (konsep kata hubung <strong>"ATAU"</strong>), gunakan <strong>Aturan Penjumlahan</strong>! Jumlahkan ketiga subtotal paket yang telah kamu temukan di atas.
                      </p>
                    </div>
                  )}

                  {!t1TotalCorrect ? (
                    <form onSubmit={handleCheckT1Total} className="flex flex-col sm:flex-row items-center gap-3">
                      <label htmlFor="t1-total" className="text-xs sm:text-sm font-bold text-slate-800 shrink-0">
                        Total Kemungkinan Paket Stok Awal:
                      </label>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          id="t1-total"
                          type="number"
                          value={t1TotalInput}
                          onChange={(e) => setT1TotalInput(e.target.value)}
                          placeholder="Ketik total..."
                          className="w-full sm:w-36 px-4 py-2 text-center font-bold text-base bg-[#FAF8F5] border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-600"
                        />
                        <span className="text-xs font-semibold text-slate-500">paket</span>
                      </div>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
                      >
                        PERIKSA TOTAL STOK AWAL
                      </button>
                    </form>
                  ) : (
                    /* Tantangan 1 Cleared -> Next Challenge Button */
                    <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center justify-between">
                      <div className="text-xs sm:text-sm font-bold text-emerald-800">
                        Tantangan 1 Tuntas! Total Stok Awal: 15 paket.
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStage(2)}
                        className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                      >
                        <span>Lanjut ke Tantangan 2 (Perubahan Stok)</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* -------------------- STAGE 2: ANALISIS PERUBAHAN STOK -------------------- */}
        {currentStage === 2 && (
          <div className="space-y-6">
            {/* 3 Package Cards for Perubahan Stok (WITHOUT any formula or subtotal spoilers!) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Paket Sehat (1 minuman habis) */}
              <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-extrabold text-slate-800 text-sm font-candy">Paket Sehat</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full border border-rose-200">
                      Stok Berubah
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <strong>Makanan:</strong> 2 pilihan
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <strong>Minuman:</strong> 2 pilihan (1 minuman habis dari semula 3)
                    </div>
                    <div className="p-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
                      Kondisi: Tersisa 2 makanan & 2 minuman bebas dipasangkan.
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-semibold text-center italic">
                  Hitung subtotal pasangan baru Paket Sehat
                </div>
              </div>

              {/* Paket Hemat (Batasan dibuka) */}
              <div className="bg-white rounded-3xl p-5 border-2 border-sky-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <BadgePercent className="w-5 h-5 text-sky-600" />
                      <h4 className="font-extrabold text-slate-800 text-sm font-candy">Paket Hemat</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                      Batasan Dibuka
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <strong>Makanan:</strong> 3 pilihan
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <strong>Minuman:</strong> 2 pilihan
                    </div>
                    <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-[11px]">
                      Kondisi: <strong>Pasangan terlarang dibuka penuh</strong>, semua boleh dipasangkan.
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-semibold text-center italic">
                  Hitung subtotal pasangan baru Paket Hemat
                </div>
              </div>

              {/* Paket Spesial (Syarat Khusus) */}
              <div className="bg-white rounded-3xl p-5 border-2 border-purple-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-purple-600" />
                      <h4 className="font-extrabold text-slate-800 text-sm font-candy">Paket Spesial</h4>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                      Syarat Baru
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <strong>Makanan 1:</strong> Hanya dapat dipadukan dengan 2 minuman
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <strong>Makanan 2:</strong> Hanya dapat dipadukan dengan 1 minuman khusus
                    </div>
                    <div className="p-2 bg-purple-50 border border-purple-200 rounded-xl text-purple-900 text-[11px]">
                      Kondisi: Jumlahkan kemungkinan pasangan Makanan 1 + Makanan 2.
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-semibold text-center italic">
                  Hitung subtotal pasangan baru Paket Spesial
                </div>
              </div>
            </div>

            {/* Berjenjang Question Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-purple-100 space-y-6">
              <VanellopeGuide
                mood={t2TotalCorrect ? 'celebrating' : t2SubtotalsCorrect ? 'happy' : t2SubtotalsChecked ? 'hint' : 'thinking'}
                dialogue={
                  t2TotalCorrect ? (
                    <span>
                      Fantastis! Kamu berhasil menuntaskan seluruh 4 Pos Misi di Sugar Rush Choice Lab! Dengan aturan perkalian dan penjumlahan gabungan, total perubahan stok adalah <strong>13 paket</strong>!
                    </span>
                  ) : t2SubtotalsCorrect ? (
                    <span>
                      "Subtotal perubahan stok sudah benar! Sekarang jumlahkan ketiga paket (Paket Sehat ATAU Paket Hemat ATAU Paket Spesial) untuk mendapatkan Total Akhir!"
                    </span>
                  ) : (
                    <span>
                      "Katering mengalami perubahan stok! Hitung subtotal baru untuk Paket Sehat, Paket Hemat (larangan dibuka), dan Paket Spesial (syarat khusus)!"
                    </span>
                  )
                }
              />

              {/* Stepped Hint Box for Subtotals */}
              {t2SubtotalsChecked && !t2SubtotalsCorrect && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 space-y-2 animate-shake">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-amber-800">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Subtotal perubahan stokmu belum tepat. Coba perhatikan petunjuk bertahap ini:</span>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-1.5 pl-6 list-disc font-medium text-amber-900/90 leading-relaxed">
                    <li>
                      <strong>Paket Sehat:</strong> Karena 1 minuman habis, tersisa 2 makanan & 2 minuman ➔ gunakan Aturan Perkalian (2 × 2).
                    </li>
                    <li>
                      <strong>Paket Hemat:</strong> Karena larangan dibuka penuh, semua 3 makanan bebas berpasangan dengan 2 minuman ➔ gunakan Aturan Perkalian (3 × 2).
                    </li>
                    <li>
                      <strong>Paket Spesial:</strong> Makanan 1 memiliki 2 pasangan minuman, sedangkan Makanan 2 memiliki 1 pasangan minuman ➔ jumlahkan (2 + 1).
                    </li>
                  </ul>
                </div>
              )}

              {/* STEP 1: Input Subtotals Form */}
              <form onSubmit={handleCheckT2Subtotals} className="space-y-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Langkah 1: Masukkan Subtotal Perubahan Stok Tiap Paket
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Sehat */}
                  <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-1.5">
                    <label htmlFor="t2-sehat" className="block text-xs font-bold text-emerald-900">
                      Subtotal Baru Paket Sehat:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="t2-sehat"
                        type="number"
                        disabled={t2SubtotalsCorrect}
                        value={t2Sehat}
                        onChange={(e) => setT2Sehat(e.target.value)}
                        placeholder="Ketik angka..."
                        className="w-full px-3 py-2 text-center font-bold text-sm bg-white border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                      <span className="text-xs font-medium text-slate-500">paket</span>
                    </div>
                  </div>

                  {/* Hemat */}
                  <div className="p-3 bg-sky-50/50 rounded-2xl border border-sky-200 space-y-1.5">
                    <label htmlFor="t2-hemat" className="block text-xs font-bold text-sky-900">
                      Subtotal Baru Paket Hemat:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="t2-hemat"
                        type="number"
                        disabled={t2SubtotalsCorrect}
                        value={t2Hemat}
                        onChange={(e) => setT2Hemat(e.target.value)}
                        placeholder="Ketik angka..."
                        className="w-full px-3 py-2 text-center font-bold text-sm bg-white border border-sky-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                      <span className="text-xs font-medium text-slate-500">paket</span>
                    </div>
                  </div>

                  {/* Spesial */}
                  <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-1.5">
                    <label htmlFor="t2-spesial" className="block text-xs font-bold text-purple-900">
                      Subtotal Baru Paket Spesial:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="t2-spesial"
                        type="number"
                        disabled={t2SubtotalsCorrect}
                        value={t2Spesial}
                        onChange={(e) => setT2Spesial(e.target.value)}
                        placeholder="Ketik angka..."
                        className="w-full px-3 py-2 text-center font-bold text-sm bg-white border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <span className="text-xs font-medium text-slate-500">paket</span>
                    </div>
                  </div>
                </div>

                {!t2SubtotalsCorrect && (
                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
                    >
                      PERIKSA SUBTOTAL PERUBAHAN
                    </button>
                  </div>
                )}
              </form>

              {/* STEP 2: Input Total Perubahan Stok */}
              {t2SubtotalsCorrect && (
                <div className="pt-4 border-t border-purple-100 space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Subtotal perubahan stok terverifikasi benar! Sekarang masukkan Total Perubahan Stok:</span>
                  </div>

                  {/* Stepped Hint Box for Total */}
                  {t2TotalChecked && !t2TotalCorrect && (
                    <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-amber-900 space-y-1.5 animate-shake">
                      <div className="flex items-center gap-2 font-bold text-xs text-amber-800">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Total perubahan stokmu belum tepat:</span>
                      </div>
                      <p className="text-xs text-amber-900/90 leading-relaxed pl-6">
                        Karena kategori Paket Sehat, Paket Hemat, dan Paket Spesial adalah pilihan yang saling lepas (konsep kata hubung <strong>"ATAU"</strong>), gunakan <strong>Aturan Penjumlahan</strong>! Jumlahkan ketiga subtotal paket yang telah kamu temukan di atas.
                      </p>
                    </div>
                  )}

                  {!t2TotalCorrect ? (
                    <form onSubmit={handleCheckT2Total} className="flex flex-col sm:flex-row items-center gap-3">
                      <label htmlFor="t2-total" className="text-xs sm:text-sm font-bold text-slate-800 shrink-0">
                        Total Seluruh Kemungkinan Paket:
                      </label>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          id="t2-total"
                          type="number"
                          value={t2TotalInput}
                          onChange={(e) => setT2TotalInput(e.target.value)}
                          placeholder="Ketik total..."
                          className="w-full sm:w-36 px-4 py-2 text-center font-bold text-base bg-[#FAF8F5] border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-600"
                        />
                        <span className="text-xs font-semibold text-slate-500">paket</span>
                      </div>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
                      >
                        PERIKSA TOTAL PERUBAHAN STOK
                      </button>
                    </form>
                  ) : (
                    /* Tantangan 2 Cleared -> Finish Mission 4 */
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
