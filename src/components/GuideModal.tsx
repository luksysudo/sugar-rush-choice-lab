/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Buku Panduan Modal
 */

import React from 'react';
import { BookOpen, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Tutup Panduan"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shadow-inner">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-candy">
              Buku Panduan Petualangan
            </h3>
            <p className="text-xs text-slate-500">
              Sugar Rush Choice Lab • Kaidah Pencacahan SMA Kelas 12
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <div className="bg-pink-50/70 border border-pink-100 p-4 rounded-2xl">
            <div className="flex items-center gap-2 font-semibold text-pink-700 mb-1">
              <Sparkles className="w-4 h-4" />
              Misi Kamu di Sirkuit
            </div>
            <p className="text-xs text-slate-600">
              Bantu Vanellope menyelesaikan 4 Pos Misi persiapan Grand Prix balap Sugar Rush. Setiap pos mengajarkan konsep fundamental Kaidah Pencacahan secara interaktif!
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 text-xs flex items-center justify-center">1</span>
                Pos 1: Kedai Camilan (Penjumlahan & Perkalian)
              </div>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Tantangan 1:</strong> Memilih 1 camilan dari 4 Tar, 3 Es Krim, 2 Puding (Aturan Penjumlahan: 4 + 3 + 2 = 9).<br />
                <strong>Tantangan 2:</strong> Meracik paket sarapan 1 Tar DAN 1 Minuman dari 4 Tar dan 3 Minuman (Aturan Perkalian: 4 × 3 = 12).
              </p>
            </div>

            <div className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-100">
              <div className="flex items-center gap-2 font-bold text-sky-800 text-sm">
                <span className="w-6 h-6 rounded-full bg-sky-200 text-sky-800 text-xs flex items-center justify-center">2</span>
                Pos 2: Garasi Kostum (Klasifikasi & Manekin)
              </div>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Tantangan 1:</strong> Mengklasifikasikan kasus Aturan Penjumlahan (kejadian saling lepas / "ATAU") vs Aturan Perkalian (berpasangan / "DAN").<br />
                <strong>Tantangan 2:</strong> Menyusun seragam manekin dari 4 Atasan, 3 Bawahan, 2 Sepatu (4 × 3 × 2 = 24 kombinasi).
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-100">
              <div className="flex items-center gap-2 font-bold text-amber-800 text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 text-xs flex items-center justify-center">3</span>
                Pos 3: Peta Jalur Sirkuit (Diagram Pohon)
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Menelusuri percabangan diagram pohon dari 2 jalur utama menuju masing-masing 3 lintasan akhir Finis (2 × 3 = 6 rute).
              </p>
            </div>

            <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2 font-bold text-purple-800 text-sm">
                <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 text-xs flex items-center justify-center">4</span>
                Pos 4: Pusat Katering FoodGo (Input Berjenjang)
              </div>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Tantangan 1:</strong> Analisis Stok Awal (subtotal Sehat: 6, Hemat: 5, Spesial: 4 $\to$ Total: 15).<br />
                <strong>Tantangan 2:</strong> Analisis Perubahan Stok (subtotal Sehat: 4, Hemat: 6, Spesial: 3 $\to$ Total: 13).
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Sistem Petunjuk (Hint Bertahap)
            </div>
            <p>
              Jangan takut salah! Jika jawabanmu belum tepat, Vanellope akan memberikan petunjuk (hint) bertahap. Tombol lanjut akan terbuka setelah kamu berhasil menemukan jawaban yang benar.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-95"
          >
            Mengerti, Siap Mulai!
          </button>
        </div>
      </div>
    </div>
  );
};
