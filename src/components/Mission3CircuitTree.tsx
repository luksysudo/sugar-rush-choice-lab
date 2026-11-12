/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Misi 3: Peta Jalur Sirkuit (Diagram Pohon Interaktif)
 * Siswa mengisi kerangka diagram pohon kosong dengan kartu lintasan.
 * Bocoran daftar 6 rute cabang di bawah telah DIHAPUS agar siswa berpikir mandiri.
 * Sistem Hint bertahap ("DAN" vs "ATAU") tanpa membocorkan jawaban.
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  GitBranch,
  Sparkles,
  Navigation,
  HelpCircle,
} from 'lucide-react';
import { StudentProfile } from '../types';
import { VanellopeGuide } from './VanellopeGuide';
import { verifyMission3Answer } from '../utils/mathRules';

interface Mission3Props {
  profile: StudentProfile;
  onComplete: () => void;
  onBackToMap: () => void;
}

export const Mission3CircuitTree: React.FC<Mission3Props> = ({
  profile,
  onComplete,
  onBackToMap,
}) => {
  // Tree slot completion state
  const [placedMainA, setPlacedMainA] = useState(true);
  const [placedMainB, setPlacedMainB] = useState(true);
  const [placedSubBranches, setPlacedSubBranches] = useState<Record<string, boolean>>({
    'A-1': true,
    'A-2': true,
    'A-3': true,
    'B-1': true,
    'B-2': true,
    'B-3': true,
  });

  const [userInput, setUserInput] = useState('');
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintLevel, setHintLevel] = useState(1);

  const tunnels = [
    { id: '1', name: 'Terowongan Marshmallow', icon: '🍡' },
    { id: '2', name: 'Terowongan Wafer Karamel', icon: '🧇' },
    { id: '3', name: 'Jembatan Lolipop', icon: '🍭' },
  ];

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    setHasChecked(true);
    const correct = verifyMission3Answer(userInput);

    if (correct) {
      setIsCorrect(true);
      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#EC4899'],
        });
      } catch {
        // ignore
      }
    } else {
      setIsCorrect(false);
      setHintLevel((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] bg-candy-pattern p-3 sm:p-6 pb-12 flex flex-col">
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
          <div className="text-xs font-semibold text-slate-500">
            Pembalap: <strong className="text-emerald-700">{profile.name || 'Pembalap Muda'}</strong> • Pos 3
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Mission Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-400 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold mb-1.5 uppercase">
              <GitBranch className="w-3.5 h-3.5" />
              Pos 3 • Diagram Pohon Interaktif
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-candy tracking-wide">
              MISI 3: PETA JALUR SIRKUIT
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm mt-0.5">
              Dari Start tersedia 2 jalur utama, dan tiap jalur memiliki 3 lintasan akhir menuju Finis.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3 px-4 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-2xl">🗺️</span>
            <div className="text-xs font-bold mt-1">Reward Misi</div>
            <div className="text-xs font-extrabold text-amber-200">+50 PTS • ⭐ 1 Bintang</div>
          </div>
        </div>

        {/* Tree Diagram Visual Interactive Canvas */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-base text-slate-800 font-candy flex items-center gap-2">
              <Navigation className="w-4 h-4 text-amber-500" />
              Kerangka Diagram Pohon Jalur Balap
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              Perhatikan struktur cabang 1 (Jalur Utama) ➔ cabang 2 (Lintasan Akhir)
            </span>
          </div>

          {/* Interactive Visual Tree Diagram */}
          <div className="overflow-x-auto py-2">
            <div className="min-w-[720px] flex items-center justify-between relative px-6 py-6 bg-gradient-to-r from-slate-50 via-amber-50/20 to-emerald-50/30 rounded-2xl border border-slate-200">
              {/* Root: START */}
              <div className="flex flex-col items-center z-10">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 text-white flex flex-col items-center justify-center p-2 text-center shadow-lg border-2 border-white">
                  <span className="text-lg">🚦</span>
                  <span className="text-xs font-extrabold font-candy">START</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 mt-1">Garis Mulai</span>
              </div>

              {/* Connecting lines from Start to 2 Main Branches */}
              <div className="flex-1 flex flex-col justify-between h-44 px-4 relative">
                <div className="border-t-2 border-r-2 border-amber-400 rounded-tr-2xl h-1/2 w-full" />
                <div className="border-b-2 border-r-2 border-pink-400 rounded-br-2xl h-1/2 w-full" />
              </div>

              {/* 2 Main Branches */}
              <div className="flex flex-col justify-between h-60 z-10 space-y-6">
                {/* Branch 1 */}
                <div className="w-40 p-3 bg-amber-100 border-2 border-amber-300 rounded-2xl text-center shadow-xs">
                  <div className="text-base">🍫</div>
                  <div className="text-xs font-extrabold text-amber-950 font-candy">Jalur Cokelat</div>
                  <span className="text-[10px] text-amber-700 font-semibold">Cabang Utama 1</span>
                </div>

                {/* Branch 2 */}
                <div className="w-40 p-3 bg-pink-100 border-2 border-pink-300 rounded-2xl text-center shadow-xs">
                  <div className="text-base">🍬</div>
                  <div className="text-xs font-extrabold text-pink-950 font-candy">Jalur Permen Gula</div>
                  <span className="text-[10px] text-pink-700 font-semibold">Cabang Utama 2</span>
                </div>
              </div>

              {/* Sub-branch connectors */}
              <div className="flex-1 flex flex-col justify-between h-72 px-4">
                <div className="h-1/2 flex flex-col justify-around py-1">
                  <div className="border-b-2 border-amber-300 w-full" />
                  <div className="border-b-2 border-amber-300 w-full" />
                  <div className="border-b-2 border-amber-300 w-full" />
                </div>
                <div className="h-1/2 flex flex-col justify-around py-1">
                  <div className="border-b-2 border-pink-300 w-full" />
                  <div className="border-b-2 border-pink-300 w-full" />
                  <div className="border-b-2 border-pink-300 w-full" />
                </div>
              </div>

              {/* 3 Sub-branches per main branch (Total 6 leaf branches) */}
              <div className="flex flex-col justify-between h-84 z-10 space-y-2">
                {/* From Jalur Cokelat */}
                {tunnels.map((t) => (
                  <div
                    key={`A-${t.id}`}
                    className="w-46 p-2 px-3 bg-white border border-amber-200 rounded-xl flex items-center gap-2 text-xs shadow-2xs"
                  >
                    <span>{t.icon}</span>
                    <span className="font-semibold text-slate-800 text-[11px] truncate">{t.name}</span>
                  </div>
                ))}

                <div className="h-2" />

                {/* From Jalur Permen Gula */}
                {tunnels.map((t) => (
                  <div
                    key={`B-${t.id}`}
                    className="w-46 p-2 px-3 bg-white border border-pink-200 rounded-xl flex items-center gap-2 text-xs shadow-2xs"
                  >
                    <span>{t.icon}</span>
                    <span className="font-semibold text-slate-800 text-[11px] truncate">{t.name}</span>
                  </div>
                ))}
              </div>

              {/* Target: FINIS */}
              <div className="flex flex-col items-center z-10 ml-6">
                <div className="w-20 h-20 rounded-2xl bg-emerald-600 text-white flex flex-col items-center justify-center p-2 text-center shadow-lg border-2 border-white animate-pulse">
                  <span className="text-lg">🏁</span>
                  <span className="text-xs font-extrabold font-candy">FINIS</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 mt-1">Garis Akhir</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <strong>Instruksi Analisis:</strong> Amati diagram pohon di atas. Dari titik Start ada <strong>2 pilihan jalur utama</strong>, dan dari masing-masing jalur utama bercabang ke <strong>3 lintasan akhir</strong> menuju Finis. Hitunglah total seluruh kemungkinan rute unik yang bisa dilalui pembalap!
          </div>
        </div>

        {/* Bottom Dialogue & Calculation Area */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-pink-100 space-y-5">
          <VanellopeGuide
            mood={isCorrect ? 'celebrating' : hasChecked ? 'hint' : 'happy'}
            dialogue={
              isCorrect ? (
                <span>
                  Luar biasa! Karena setiap 1 jalur utama bercabang lagi ke 3 lintasan akhir secara berurutan (konsep <strong>"DAN"</strong>), kita gunakan <strong>Aturan Perkalian</strong>! Total rute unik = 6 rute!
                </span>
              ) : (
                <span>
                  "Dari garis Start menuju Checkpoint ada <strong>2 jalur utama</strong>. Dari setiap jalur utama bercabang lagi menjadi <strong>3 lintasan akhir</strong> menuju Finish. Berapa banyak seluruh kemungkinan rute yang bisa kulalui?"
                </span>
              )
            }
          />

          {/* Stepped Hint Box */}
          {hasChecked && !isCorrect && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 space-y-2 animate-shake">
              <div className="flex items-center gap-2 font-extrabold text-sm text-amber-800">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Jawabanmu belum tepat. Yuk cek konsep kata hubungnya:</span>
              </div>
              <ul className="text-xs sm:text-sm space-y-1.5 pl-6 list-disc font-medium text-amber-900/90 leading-relaxed">
                <li>
                  <strong>Cek Konsep:</strong> Perjalanan balap ini terdiri dari 2 tahapan berurutan: memilih Jalur Utama (Tahap 1) <strong>DAN</strong> memilih Lintasan Akhir (Tahap 2).
                </li>
                <li>
                  <strong>Identifikasi Aturan:</strong> Karena kejadian ini berurutan dan berpasangan (konsep <strong>"DAN"</strong>), kita menggunakan <strong>Aturan Perkalian</strong>, bukan penjumlahan!
                </li>
                {hintLevel >= 2 && (
                  <li>
                    <strong>Petunjuk Tambahan:</strong> Kalikan banyaknya cabang jalur utama (2) dengan banyaknya sub-cabang lintasan akhir (3). Coba hitung kembali!
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Success Banner */}
          {isCorrect && (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 text-emerald-900 space-y-3">
              <div className="flex items-center gap-2 font-extrabold text-base text-emerald-800">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>Misi 3 Berhasil Diselesaikan! (+50 PTS & ⭐ 1 Bintang)</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-800/90 leading-relaxed">
                <strong>Pembahasan Konsep:</strong> Diagram pohon adalah visualisasi matematis untuk aturan perkalian. Banyaknya seluruh rute dari awal ke akhir sama dengan hasil kali cabang tiap tingkatan: <strong>2 jalur utama × 3 lintasan akhir = 6 rute berbeda</strong>.
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={onComplete}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-candy font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>KEMBALI KE PETA SIRKUIT & BUKA POS 4 &gt;</span>
                </button>
              </div>
            </div>
          )}

          {/* Form Input */}
          {!isCorrect && (
            <form onSubmit={handleCheckAnswer} className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label htmlFor="mission3-input" className="text-xs sm:text-sm font-bold text-slate-800 shrink-0">
                  Total seluruh rute unik:
                </label>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    id="mission3-input"
                    type="number"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ketik angka..."
                    className="w-full sm:w-36 px-4 py-2.5 text-center font-bold text-base bg-[#FAF8F5] border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:outline-none focus:bg-white text-slate-800"
                  />
                  <span className="text-xs font-semibold text-slate-500">rute</span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
                >
                  PERIKSA JAWABAN
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
