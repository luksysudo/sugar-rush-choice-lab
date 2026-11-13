/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Materi Prasyarat / Buku Materi: Teori Kaidah Pencacahan (Berdasarkan Modul Matematika Umum Kelas XII KD 3.3 - Asmar Achmad, 2020)
 * KHUSUS memuat definisi resmi, rumus umum, dan tabel perbandingan (Tanpa contoh soal)
 * Dilengkapi sistem penjelajahan 4 tab wajib & tombol konfirmasi pembuka kunci misi.
 */

import React, { useState } from 'react';
import {
  Layers,
  X,
  BookCheck,
  ArrowRightLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LockOpen,
  Sparkles,
} from 'lucide-react';
import { playCorrectSound } from '../utils/soundEffects';

interface PrerequisiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasConfirmedRead?: boolean;
  onConfirmRead?: () => void;
}

const MATERIAL_TABS = [
  { id: 1, label: '1. Definisi', shortTitle: 'Definisi Umum' },
  { id: 2, label: '2. Aturan Perkalian', shortTitle: 'Aturan Perkalian' },
  { id: 3, label: '3. Aturan Penjumlahan', shortTitle: 'Aturan Penjumlahan' },
  { id: 4, label: '4. Perbandingan', shortTitle: 'Tabel Perbandingan' },
] as const;

export const PrerequisiteModal: React.FC<PrerequisiteModalProps> = ({
  isOpen,
  onClose,
  hasConfirmedRead = false,
  onConfirmRead,
}) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [visitedTabs, setVisitedTabs] = useState<number[]>([1]);

  if (!isOpen) return null;

  const handleSelectTab = (tabId: number) => {
    setActiveTab(tabId);
    setVisitedTabs((prev) => (prev.includes(tabId) ? prev : [...prev, tabId]));
  };

  const allTabsVisited = MATERIAL_TABS.every((tab) => visitedTabs.includes(tab.id));

  const handleConfirmAndUnlock = () => {
    if (!allTabsVisited) return;
    playCorrectSound();
    onConfirmRead?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-pink-100 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Tutup Materi Prasyarat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start sm:items-center gap-3.5 mb-4 pb-4 border-b border-slate-100 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-pink-500 text-white flex items-center justify-center shadow-md shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
                <BookCheck className="w-3.5 h-3.5 text-amber-600" />
                Buku Materi • SMA Kelas XII
              </div>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  allTabsVisited
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-pink-50 text-pink-700 border border-pink-200'
                }`}
              >
                {visitedTabs.length} / {MATERIAL_TABS.length} Bagian Dibaca
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-candy">
              Materi Teori: Kaidah Pencacahan
            </h3>
            <p className="text-xs text-slate-500">
              Rujukan Teoretis: Modul Pembelajaran SMA Matematika Umum KD 3.3 (Asmar Achmad, 2020)
            </p>
          </div>
        </div>

        {/* 4 Interactive Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4" role="tablist" aria-label="Bagian Buku Materi">
          {MATERIAL_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const isVisited = visitedTabs.includes(tab.id);
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectTab(tab.id)}
                className={`px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-between gap-1.5 border-2 ${
                  isActive
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                    : isVisited
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800 hover:bg-emerald-100/70'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-pink-300 hover:bg-pink-50/40'
                }`}
              >
                <span className="truncate">{tab.label}</span>
                {isVisited && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-emerald-600'}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Scrollable Tab Content Area */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-sm text-slate-700 leading-relaxed">
          {/* TAB 1: Definisi Kaidah Pencacahan */}
          {activeTab === 1 && (
            <div className="p-5 sm:p-6 bg-gradient-to-br from-[#FFFDF9] to-amber-50/60 border-2 border-amber-200/80 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-extrabold text-amber-950 text-base sm:text-lg font-candy">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <span>Definisi Kaidah Pencacahan</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-9">
                <strong>Kaidah Pencacahan</strong> adalah kaidah atau aturan yang digunakan untuk menentukan atau menghitung banyaknya susunan objek atau berapa banyak cara yang terjadi pada suatu peristiwa tanpa harus merinci semua kemungkinan susunannya secara manual.
              </p>
              <div className="ml-9 p-4 bg-white rounded-xl border border-amber-200/80 text-xs text-slate-600 space-y-1.5">
                <div className="font-extrabold text-amber-900 uppercase tracking-wide text-[11px]">
                  Prinsip Dasar Pencacahan:
                </div>
                <p>
                  Kaidah pencacahan terbagi menjadi dua aturan fundamental berdasarkan hubungan antar-kejadian, yaitu <strong>Aturan Perkalian</strong> (untuk kejadian berurutan/simultan) dan <strong>Aturan Penjumlahan</strong> (untuk kejadian yang saling lepas/terpisah).
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Aturan Perkalian */}
          {activeTab === 2 && (
            <div className="p-5 sm:p-6 bg-gradient-to-br from-[#FFFDF9] to-sky-50/60 border-2 border-sky-200/80 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-extrabold text-sky-950 text-base sm:text-lg font-candy">
                <span className="w-7 h-7 rounded-full bg-sky-500 text-white text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <span>Aturan Perkalian (Multiplication Rule)</span>
              </div>

              <div className="pl-9 space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-sky-900 uppercase tracking-wide mb-1">
                    a. Definisi Khusus (Dua Kejadian):
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Jika kejadian pertama dapat terjadi dalam <em>m</em> cara dan setiap kejadian pertama diikuti oleh kejadian kedua yang terjadi dalam <em>n</em> cara, maka kejadian pertama dan kejadian kedua tersebut secara bersama-sama atau berurutan terjadi dalam{' '}
                    <strong className="text-sky-900 font-mono">(m × n)</strong> cara.
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-sky-900 uppercase tracking-wide mb-1">
                    b. Perluasan Aturan (k Kejadian Berurutan):
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">
                    Jika ada <em>k</em> kejadian (pilihan) dengan masing-masing memiliki{' '}
                    <em>n₁, n₂, n₃, ..., nₖ</em> cara berbeda, maka total cara secara berurutan adalah:
                  </p>
                  <div className="p-3.5 bg-white border border-sky-200 rounded-xl font-mono text-center text-sm font-extrabold text-sky-800 shadow-2xs">
                    Total Cara = n₁ × n₂ × n₃ × ... × nₖ
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-sky-900 uppercase tracking-wide mb-1.5">
                    c. Representasi Visual Kombinasi (Tabel Silang &amp; Diagram Pohon):
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Kombinasi kejadian berurutan dengan aturan perkalian (misalnya 2 pilihan tahap pertama <strong>A₁, A₂</strong> dan 3 pilihan tahap kedua <strong>B₁, B₂, B₃</strong>) dapat dipetakan secara sistematis melalui dua bentuk visual berikut:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-stretch" data-testid="buku-materi-visual-representations">
                    {/* Left Card: Tabel Silang (Baris x Kolom) */}
                    <div
                      data-testid="tabel-silang-card"
                      className="bg-white border-2 border-sky-200 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between gap-2.5"
                    >
                      <div className="space-y-1">
                        <div className="text-[11px] font-extrabold text-sky-900 uppercase tracking-wide">
                          1. Tabel Silang (Baris × Kolom)
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Memetakan pasangan 2 tahap pilihan pada sel pertemuan baris dan kolom.
                        </p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px] font-mono border-collapse text-center">
                          <thead>
                            <tr className="bg-sky-100 text-sky-950">
                              <th className="border border-sky-200 px-2 py-1.5 font-extrabold">
                                P₁ \ P₂
                              </th>
                              <th className="border border-sky-200 px-2 py-1.5 font-bold">B₁</th>
                              <th className="border border-sky-200 px-2 py-1.5 font-bold">B₂</th>
                              <th className="border border-sky-200 px-2 py-1.5 font-bold">B₃</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th className="border border-sky-200 bg-sky-50 px-2 py-1.5 font-extrabold text-sky-900">
                                A₁
                              </th>
                              <td className="border border-sky-200 px-1.5 py-1.5 text-slate-700 font-semibold">
                                (A₁, B₁)
                              </td>
                              <td className="border border-sky-200 px-1.5 py-1.5 text-slate-700 font-semibold">
                                (A₁, B₂)
                              </td>
                              <td className="border border-sky-200 px-1.5 py-1.5 text-slate-700 font-semibold">
                                (A₁, B₃)
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-sky-200 bg-sky-50 px-2 py-1.5 font-extrabold text-sky-900">
                                A₂
                              </th>
                              <td className="border border-sky-200 px-1.5 py-1.5 text-slate-700 font-semibold">
                                (A₂, B₁)
                              </td>
                              <td className="border border-sky-200 px-1.5 py-1.5 text-slate-700 font-semibold">
                                (A₂, B₂)
                              </td>
                              <td className="border border-sky-200 px-1.5 py-1.5 text-slate-700 font-semibold">
                                (A₂, B₃)
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="text-[11px] font-bold text-sky-800 bg-sky-50 border border-sky-200/80 rounded-lg px-2.5 py-1.5 text-center font-mono">
                        2 baris × 3 kolom = 6 kombinasi
                      </div>
                    </div>

                    {/* Right Card: Diagram Pohon */}
                    <div
                      data-testid="diagram-pohon-card"
                      className="bg-white border-2 border-emerald-200 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between gap-2.5"
                    >
                      <div className="space-y-1">
                        <div className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wide">
                          2. Diagram Pohon (Tree Diagram)
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Menelusuri cabang berurutan dari titik awal hingga hasil akhir (efektif untuk ≥ 2 tahap).
                        </p>
                      </div>

                      <div className="w-full flex items-center justify-center bg-emerald-50/40 rounded-lg border border-emerald-100 p-2">
                        <svg
                          viewBox="0 0 280 150"
                          className="w-full h-auto max-h-36"
                          role="img"
                          aria-label="Diagram Pohon dua tahap menghasilkan 6 kombinasi"
                        >
                          {/* Edges Start -> A1, A2 */}
                          <line x1="42" y1="75" x2="96" y2="38" stroke="#0EA5E9" strokeWidth="2" />
                          <line x1="42" y1="75" x2="96" y2="112" stroke="#0EA5E9" strokeWidth="2" />

                          {/* Edges A1 -> B1, B2, B3 */}
                          <line x1="120" y1="38" x2="178" y2="16" stroke="#10B981" strokeWidth="1.8" />
                          <line x1="120" y1="38" x2="178" y2="38" stroke="#10B981" strokeWidth="1.8" />
                          <line x1="120" y1="38" x2="178" y2="60" stroke="#10B981" strokeWidth="1.8" />

                          {/* Edges A2 -> B1, B2, B3 */}
                          <line x1="120" y1="112" x2="178" y2="90" stroke="#10B981" strokeWidth="1.8" />
                          <line x1="120" y1="112" x2="178" y2="112" stroke="#10B981" strokeWidth="1.8" />
                          <line x1="120" y1="112" x2="178" y2="134" stroke="#10B981" strokeWidth="1.8" />

                          {/* Start Node */}
                          <rect x="4" y="62" width="40" height="26" rx="8" fill="#1E293B" />
                          <text x="24" y="79" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700">
                            Mulai
                          </text>

                          {/* Level 1 Nodes */}
                          <circle cx="108" cy="38" r="13" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
                          <text x="108" y="42" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="800">
                            A₁
                          </text>

                          <circle cx="108" cy="112" r="13" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
                          <text x="108" y="116" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="800">
                            A₂
                          </text>

                          {/* Level 2 Nodes & Final Pairs */}
                          {[
                            { y: 16, b: 'B₁', pair: '(A₁, B₁)' },
                            { y: 38, b: 'B₂', pair: '(A₁, B₂)' },
                            { y: 60, b: 'B₃', pair: '(A₁, B₃)' },
                            { y: 90, b: 'B₁', pair: '(A₂, B₁)' },
                            { y: 112, b: 'B₂', pair: '(A₂, B₂)' },
                            { y: 134, b: 'B₃', pair: '(A₂, B₃)' },
                          ].map((node, i) => (
                            <g key={i}>
                              <rect
                                x="176"
                                y={node.y - 9}
                                width="24"
                                height="18"
                                rx="6"
                                fill="#D1FAE5"
                                stroke="#059669"
                                strokeWidth="1.5"
                              />
                              <text
                                x="188"
                                y={node.y + 4}
                                textAnchor="middle"
                                fill="#065F46"
                                fontSize="9.5"
                                fontWeight="800"
                              >
                                {node.b}
                              </text>
                              <text
                                x="210"
                                y={node.y + 3.5}
                                fill="#1E293B"
                                fontSize="9.5"
                                fontWeight="700"
                                fontFamily="monospace"
                              >
                                → {node.pair}
                              </text>
                            </g>
                          ))}
                        </svg>
                      </div>

                      <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-lg px-2.5 py-1.5 text-center font-mono">
                        2 cabang × 3 cabang = 6 ujung kombinasi
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Aturan Penjumlahan */}
          {activeTab === 3 && (
            <div className="p-5 sm:p-6 bg-gradient-to-br from-[#FFFDF9] to-pink-50/60 border-2 border-pink-200/80 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-extrabold text-pink-950 text-base sm:text-lg font-candy">
                <span className="w-7 h-7 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <span>Aturan Penjumlahan (Addition Rule)</span>
              </div>

              <div className="pl-9 space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-pink-900 uppercase tracking-wide mb-1">
                    a. Definisi Khusus (Dua Kejadian Saling Lepas):
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Jika kejadian pertama dapat terjadi dalam <em>m</em> cara dan kejadian kedua secara terpisah (saling lepas) dapat terjadi dalam <em>n</em> cara, maka kejadian pertama atau kejadian kedua dapat terjadi dalam{' '}
                    <strong className="text-pink-900 font-mono">(m + n)</strong> cara.
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-pink-900 uppercase tracking-wide mb-1">
                    b. Perluasan Aturan (p Kejadian Terpisah):
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">
                    Jika terdapat <em>p</em> kejadian yang saling terpisah dengan masing-masing{' '}
                    <em>n₁, n₂, n₃, ..., nₚ</em> cara, maka kejadian pertama, atau kedua, ..., atau ke-<em>p</em> dapat terjadi dalam:
                  </p>
                  <div className="p-3.5 bg-white border border-pink-200 rounded-xl font-mono text-center text-sm font-extrabold text-pink-800 shadow-2xs">
                    Total Cara = n₁ + n₂ + n₃ + ... + nₚ
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Tabel Perbandingan Utama */}
          {activeTab === 4 && (
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
                        Digunakan untuk kejadian yang <strong>terjadi bersamaan</strong> atau{' '}
                        <strong>berurutan</strong> (berpasangan secara simultan).
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
                        Mengalikan setiap pilihan:
                        <br />
                        <strong className="text-sky-900 font-bold">m × n</strong> atau{' '}
                        <strong className="text-sky-900 font-bold">n₁ × n₂ × ... × nₖ</strong>
                      </td>
                      <td className="py-3 px-3 border border-slate-200 font-mono text-pink-800 font-semibold leading-relaxed">
                        Menjumlahkan setiap pilihan:
                        <br />
                        <strong className="text-pink-900 font-bold">m + n</strong> atau{' '}
                        <strong className="text-pink-900 font-bold">n₁ + n₂ + ... + nₚ</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-1 text-[11px] text-slate-400 italic text-right">
                Sumber: Modul Pembelajaran SMA Matematika Umum Kelas XII KD 3.3 (Kaidah Pencacahan), Kemendikbud 2020.
              </div>
            </div>
          )}
        </div>

        {/* Navigation + Mandatory Read Confirmation Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
          {/* Step Nav Bar */}
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              disabled={activeTab === 1}
              onClick={() => handleSelectTab(Math.max(1, activeTab - 1))}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                activeTab === 1
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <span className="text-[11px] font-semibold text-slate-500 text-center">
              {allTabsVisited ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Semua 4 bagian materi telah dibaca!
                </span>
              ) : (
                `Baca semua ${MATERIAL_TABS.length} tab materi untuk membuka akses misi`
              )}
            </span>

            <button
              type="button"
              disabled={activeTab === MATERIAL_TABS.length}
              onClick={() => handleSelectTab(Math.min(MATERIAL_TABS.length, activeTab + 1))}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                activeTab === MATERIAL_TABS.length
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-pink-100 hover:bg-pink-200 text-pink-800'
              }`}
            >
              <span>Lanjut Bagian</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Unlock Confirmation Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 bg-amber-50/70 border border-amber-200 rounded-2xl p-3">
            <div className="text-[11px] text-amber-900 font-medium text-center sm:text-left">
              {hasConfirmedRead
                ? 'Akses seluruh misi dan kuis sudah terbuka di Peta Sirkuit.'
                : allTabsVisited
                ? 'Tekan tombol konfirmasi di samping untuk membuka Misi 1–4 & Kuis!'
                : 'Klik & jelajahi keempat tab di atas terlebih dahulu agar tombol konfirmasi aktif.'}
            </div>
            <button
              type="button"
              disabled={!allTabsVisited}
              onClick={handleConfirmAndUnlock}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-candy font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shrink-0 ${
                allTabsVisited
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md shadow-emerald-500/20 active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <LockOpen className="w-4 h-4" />
              <span>Saya Sudah Membaca & Paham Materi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
