/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Materi Prasyarat: Teori Kaidah Pencacahan (Berdasarkan Modul Matematika Umum Kelas XII KD 3.3 - Asmar Achmad, 2020)
 * KHUSUS memuat definisi resmi, rumus umum, dan tabel perbandingan (Tanpa contoh soal)
 */

import React from 'react';
import { Layers, X, BookCheck, Calculator, ArrowRightLeft, Sparkles } from 'lucide-react';

interface PrerequisiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrerequisiteModal: React.FC<PrerequisiteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Tutup Materi Prasyarat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-pink-500 text-white flex items-center justify-center shadow-md shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-0.5">
              <BookCheck className="w-3.5 h-3.5 text-amber-600" />
              Kurikulum Matematika Wajib SMA Kelas XII
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-candy">
              Materi Teori: Kaidah Pencacahan
            </h3>
            <p className="text-xs text-slate-500">
              Rujukan Teoretis: Modul Pembelajaran SMA Matematika Umum KD 3.3 (Asmar Achmad, 2020)
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Bagian 1: Definisi Kaidah Pencacahan */}
          <div className="p-5 bg-gradient-to-br from-[#FFFDF9] to-amber-50/60 border-2 border-amber-200/80 rounded-2xl shadow-xs">
            <div className="flex items-center gap-2 font-extrabold text-amber-950 text-base font-candy mb-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center shrink-0">1</span>
              <span>Definisi Kaidah Pencacahan</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
              <strong>Kaidah Pencacahan</strong> adalah kaidah atau aturan yang digunakan untuk menentukan atau menghitung banyaknya susunan objek atau berapa banyak cara yang terjadi pada suatu peristiwa tanpa harus merinci semua kemungkinan susunannya secara manual.
            </p>
          </div>

          {/* Bagian 2: Aturan Perkalian */}
          <div className="p-5 bg-gradient-to-br from-[#FFFDF9] to-sky-50/60 border-2 border-sky-200/80 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-sky-950 text-base font-candy">
              <span className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs flex items-center justify-center shrink-0">2</span>
              <span>Aturan Perkalian (Multiplication Rule)</span>
            </div>

            <div className="pl-8 space-y-3">
              <div>
                <h5 className="text-xs font-bold text-sky-900 uppercase tracking-wide mb-1">
                  a. Definisi Khusus (Dua Kejadian):
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Jika kejadian pertama dapat terjadi dalam <em>m</em> cara dan setiap kejadian pertama diikuti oleh kejadian kedua yang terjadi dalam <em>n</em> cara, maka kejadian pertama dan kejadian kedua tersebut secara bersama-sama atau berurutan terjadi dalam <strong className="text-sky-900 font-mono">(m × n)</strong> cara.
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-sky-900 uppercase tracking-wide mb-1">
                  b. Perluasan Aturan (k Kejadian Berurutan):
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">
                  Jika ada <em>k</em> kejadian (pilihan) dengan masing-masing memiliki <em>n₁, n₂, n₃, ..., nₖ</em> cara berbeda, maka total cara secara berurutan adalah:
                </p>
                <div className="p-3 bg-white border border-sky-200 rounded-xl font-mono text-center text-sm font-extrabold text-sky-800 shadow-2xs">
                  Total Cara = n₁ × n₂ × n₃ × ... × nₖ
                </div>
              </div>
            </div>
          </div>

          {/* Bagian 3: Aturan Penjumlahan */}
          <div className="p-5 bg-gradient-to-br from-[#FFFDF9] to-pink-50/60 border-2 border-pink-200/80 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-pink-950 text-base font-candy">
              <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center shrink-0">3</span>
              <span>Aturan Penjumlahan (Addition Rule)</span>
            </div>

            <div className="pl-8 space-y-3">
              <div>
                <h5 className="text-xs font-bold text-pink-900 uppercase tracking-wide mb-1">
                  a. Definisi Khusus (Dua Kejadian Saling Lepas):
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Jika kejadian pertama dapat terjadi dalam <em>m</em> cara dan kejadian kedua secara terpisah (saling lepas) dapat terjadi dalam <em>n</em> cara, maka kejadian pertama atau kejadian kedua dapat terjadi dalam <strong className="text-pink-900 font-mono">(m + n)</strong> cara.
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-pink-900 uppercase tracking-wide mb-1">
                  b. Perluasan Aturan (p Kejadian Terpisah):
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">
                  Jika terdapat <em>p</em> kejadian yang saling terpisah dengan masing-masing <em>n₁, n₂, n₃, ..., nₚ</em> cara, maka kejadian pertama, atau kedua, ..., atau ke-<em>p</em> dapat terjadi dalam:
                </p>
                <div className="p-3 bg-white border border-pink-200 rounded-xl font-mono text-center text-sm font-extrabold text-pink-800 shadow-2xs">
                  Total Cara = n₁ + n₂ + n₃ + ... + nₚ
                </div>
              </div>
            </div>
          </div>

          {/* Bagian 4: Tabel Perbandingan Utama */}
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base font-candy">
              <ArrowRightLeft className="w-5 h-5 text-emerald-600" />
              <span>Tabel Perbandingan: Aturan Perkalian vs. Aturan Penjumlahan</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-300">
                    <th className="py-2.5 px-3 border border-slate-200 w-1/4">Aspek Pembanding</th>
                    <th className="py-2.5 px-3 border border-slate-200 w-3/8 text-sky-900 bg-sky-50/50">
                      Aturan Perkalian
                    </th>
                    <th className="py-2.5 px-3 border border-slate-200 w-3/8 text-pink-900 bg-pink-50/50">
                      Aturan Penjumlahan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="py-3 px-3 font-bold bg-slate-50 border border-slate-200">
                      Sifat Kejadian
                    </td>
                    <td className="py-3 px-3 border border-slate-200 leading-relaxed">
                      Digunakan untuk kejadian yang <strong>terjadi bersamaan</strong> atau <strong>berurutan</strong> (berpasangan secara simultan).
                    </td>
                    <td className="py-3 px-3 border border-slate-200 leading-relaxed">
                      Digunakan untuk kejadian yang <strong>saling lepas / terpisah</strong> (tidak dapat terjadi secara bersamaan).
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3 font-bold bg-slate-50 border border-slate-200">
                      Kata Kunci Penghubung
                    </td>
                    <td className="py-3 px-3 border border-slate-200 font-mono font-bold text-sky-800">
                      "DAN"
                    </td>
                    <td className="py-3 px-3 border border-slate-200 font-mono font-bold text-pink-800">
                      "ATAU"
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3 font-bold bg-slate-50 border border-slate-200">
                      Operasi Matematika
                    </td>
                    <td className="py-3 px-3 border border-slate-200 font-mono text-sky-800 font-semibold leading-relaxed">
                      Mengalikan setiap pilihan:<br />
                      <strong className="text-sky-900 font-bold">m × n</strong> atau <strong className="text-sky-900 font-bold">n₁ × n₂ × ... × nₖ</strong>
                    </td>
                    <td className="py-3 px-3 border border-slate-200 font-mono text-pink-800 font-semibold leading-relaxed">
                      Menjumlahkan setiap pilihan:<br />
                      <strong className="text-pink-900 font-bold">m + n</strong> atau <strong className="text-pink-900 font-bold">n₁ + n₂ + ... + nₚ</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 italic text-right">
              Sumber: Modul Pembelajaran SMA Matematika Umum Kelas XII KD 3.3 (Kaidah Pencacahan), Kemendikbud 2020.
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
          >
            Tutup Materi Teori
          </button>
        </div>
      </div>
    </div>
  );
};
