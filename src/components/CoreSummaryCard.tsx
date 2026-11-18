/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Rangkuman Utama Sugar Rush: Choice Lab
 * Kartu ringkas poin kunci Aturan Penjumlahan vs. Aturan Perkalian sebelum & sesudah Kuis.
 */

import React from 'react';
import { BookCheck, PlusCircle, X as MultiplyIcon } from 'lucide-react';

interface CoreSummaryCardProps {
  context?: 'pre_quiz' | 'post_quiz';
}

export const CoreSummaryCard: React.FC<CoreSummaryCardProps> = ({ context = 'pre_quiz' }) => {
  return (
    <section
      data-testid="rangkuman-utama-card"
      className="bg-gradient-to-br from-[#FFFDF9] via-emerald-50/40 to-pink-50/40 rounded-3xl p-5 sm:p-6 border-2 border-emerald-300 shadow-md space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/70 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <BookCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 font-candy leading-tight">
              Rangkuman Utama Sugar Rush: Choice Lab
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-600">
              {context === 'pre_quiz'
                ? 'Bekal konsep inti sebelum menghadapi 10 soal Kuis Evaluasi Akhir'
                : 'Ringkasan konsep inti Kaidah Pencacahan yang telah kamu pelajari'}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wide">
          Poin Kunci KD 3.3
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Aturan Penjumlahan */}
        <div className="bg-white rounded-2xl p-4 border-2 border-pink-200 space-y-1.5">
          <div className="flex items-center gap-2 font-extrabold text-xs sm:text-sm text-pink-900">
            <PlusCircle className="w-4 h-4 text-pink-600 shrink-0" />
            <span>Kapan Pakai Aturan Penjumlahan (+)?</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Saat memilih <strong>SATU alternatif saja</strong> dari beberapa kelompok pilihan yang{' '}
            <strong>saling lepas / terpisah</strong> (kata kunci: <strong>"ATAU"</strong>).
          </p>
          <div className="text-[11px] font-mono font-bold text-pink-800 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-100">
            Total = n₁ + n₂ + ... + nₚ
          </div>
        </div>

        {/* Aturan Perkalian */}
        <div className="bg-white rounded-2xl p-4 border-2 border-sky-200 space-y-1.5">
          <div className="flex items-center gap-2 font-extrabold text-xs sm:text-sm text-sky-900">
            <MultiplyIcon className="w-4 h-4 text-sky-600 shrink-0" />
            <span>Kapan Pakai Aturan Perkalian (×)?</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Saat menyusun pilihan melalui <strong>beberapa tahap berurutan / berpasangan</strong> di mana semua bagian wajib dipilih bersama (kata kunci: <strong>"DAN"</strong>, termasuk metode <em>Kotak Posisi</em>).
          </p>
          <div className="text-[11px] font-mono font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
            Total = n₁ × n₂ × ... × nₖ
          </div>
        </div>
      </div>
    </section>
  );
};
