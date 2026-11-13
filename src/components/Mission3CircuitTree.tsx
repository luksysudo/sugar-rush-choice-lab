/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Misi 3: Peta Jalur Sirkuit (Diagram Pohon Interaktif - 2 Tantangan)
 * Tantangan 1: Analisis Diagram Pohon Jalur Balap (2 x 3 = 6 rute)
 * Tantangan 2: Memetakan Diagram Pohon Sendiri (S -> P/C -> K/M/V -> Finis, total = 6 rute)
 * Sistem Hint bertahap ("DAN" vs "ATAU") tanpa membocorkan jawaban + Audio Feedback.
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  GitBranch,
  Navigation,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { StudentProfile } from '../types';
import { VanellopeGuide } from './VanellopeGuide';
import {
  CheckpointCode,
  Mission3TreeMapping,
  verifyMission3Answer,
  verifyMission3TreeMapping,
  verifyMission3Challenge2Total,
} from '../utils/mathRules';
import { playCorrectSound, playWrongSound } from '../utils/soundEffects';

interface Mission3Props {
  profile: StudentProfile;
  onComplete: () => void;
  onBackToMap: () => void;
}

const CHECKPOINT_OPTIONS: { code: Exclude<CheckpointCode, ''>; label: string; shortLabel: string; badgeClass: string }[] = [
  {
    code: 'K',
    label: 'Pos Karamel (K)',
    shortLabel: 'Karamel (K)',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    code: 'M',
    label: 'Pos Mint (M)',
    shortLabel: 'Mint (M)',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  {
    code: 'V',
    label: 'Pos Vanila (V)',
    shortLabel: 'Vanila (V)',
    badgeClass: 'bg-pink-100 text-pink-900 border-pink-300',
  },
];

export const Mission3CircuitTree: React.FC<Mission3Props> = ({
  profile,
  onComplete,
  onBackToMap,
}) => {
  const [currentStage, setCurrentStage] = useState<1 | 2>(1);

  // Tantangan 1 State
  const [c1Input, setC1Input] = useState('');
  const [c1Checked, setC1Checked] = useState(false);
  const [c1Correct, setC1Correct] = useState(false);
  const [c1HintLevel, setC1HintLevel] = useState(1);

  // Tantangan 2 State (Interactive Tree Mapping: S -> P/C -> K/M/V)
  const [treeMapping, setTreeMapping] = useState<Mission3TreeMapping>({
    branchP: ['', '', ''],
    branchC: ['', '', ''],
  });
  const [mappingCelebrated, setMappingCelebrated] = useState(false);
  const [c2Input, setC2Input] = useState('');
  const [c2Checked, setC2Checked] = useState(false);
  const [c2Correct, setC2Correct] = useState(false);
  const [c2HintLevel, setC2HintLevel] = useState(1);

  const tunnels = [
    { id: '1', name: 'Terowongan Marshmallow', icon: '🍡' },
    { id: '2', name: 'Terowongan Wafer Karamel', icon: '🧇' },
    { id: '3', name: 'Jembatan Lolipop', icon: '🍭' },
  ];

  const mappingStatus = verifyMission3TreeMapping(treeMapping);

  const hasDuplicates = (arr: CheckpointCode[]) => {
    const filled = arr.filter((v) => v !== '');
    return new Set(filled).size !== filled.length;
  };

  const pHasDuplicate = hasDuplicates(treeMapping.branchP);
  const cHasDuplicate = hasDuplicates(treeMapping.branchC);

  const handleUpdateBranch = (
    branch: 'branchP' | 'branchC',
    index: 0 | 1 | 2,
    value: CheckpointCode
  ) => {
    const nextBranch = [...treeMapping[branch]] as [
      CheckpointCode,
      CheckpointCode,
      CheckpointCode
    ];
    nextBranch[index] = value;
    const nextMapping: Mission3TreeMapping = {
      ...treeMapping,
      [branch]: nextBranch,
    };
    setTreeMapping(nextMapping);

    const status = verifyMission3TreeMapping(nextMapping);
    if (status.isValid && !mappingCelebrated) {
      setMappingCelebrated(true);
      playCorrectSound();
    }
  };

  // Tantangan 1 Answer Check
  const handleCheckChallenge1 = (e: React.FormEvent) => {
    e.preventDefault();
    setC1Checked(true);
    const correct = verifyMission3Answer(c1Input);

    if (correct) {
      setC1Correct(true);
      playCorrectSound();
      try {
        confetti({
          particleCount: 75,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#EC4899'],
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

  // Tantangan 2 Total Answer Check
  const handleCheckChallenge2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mappingStatus.isValid) return;
    setC2Checked(true);
    const correct = verifyMission3Challenge2Total(c2Input);

    if (correct) {
      setC2Correct(true);
      playCorrectSound();
      try {
        confetti({
          particleCount: 95,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#EC4899'],
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

  const getCheckpointMeta = (code: CheckpointCode) =>
    CHECKPOINT_OPTIONS.find((opt) => opt.code === code);

  return (
    <div className="min-h-screen bg-[#FFFDF9] bg-candy-pattern p-3 sm:p-6 pt-16 sm:pt-16 pb-12 flex flex-col">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto w-full mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBackToMap}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Peta Sirkuit</span>
          </button>
          <div className="text-xs font-semibold text-slate-500">
            Pembalap: <strong className="text-emerald-700">{profile.name || 'Pembalap Muda'}</strong> •{' '}
            <span className="font-bold text-amber-600">Pos 3 • Tantangan {currentStage} dari 2</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Mission Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-400 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold mb-1.5 uppercase">
              <GitBranch className="w-3.5 h-3.5" />
              Pos 3 • Peta Jalur Sirkuit
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-candy tracking-wide">
              {currentStage === 1
                ? 'TANTANGAN 1: DIAGRAM POHON JALUR BALAP'
                : 'TANTANGAN 2: MEMETAKAN DIAGRAM POHON SENDIRI'}
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm mt-0.5">
              {currentStage === 1
                ? 'Dari Start tersedia 2 jalur utama, dan tiap jalur memiliki 3 lintasan akhir menuju Finis.'
                : 'Lengkapi cabang pos pemeriksaan K, M, dan V pada rute Pelangi (P) dan Cokelat (C) hingga seluruh rute terpetakan!'}
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 px-4 rounded-2xl border border-white/20 shrink-0">
            <span
              className={`w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center ${
                currentStage === 1 ? 'bg-white text-amber-700' : 'bg-emerald-400 text-white'
              }`}
            >
              {c1Correct ? '✓' : '1'}
            </span>
            <span className="text-white text-xs font-bold">➔</span>
            <span
              className={`w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center ${
                currentStage === 2 ? 'bg-white text-amber-700' : 'bg-white/30 text-white'
              }`}
            >
              {c2Correct ? '✓' : '2'}
            </span>
          </div>
        </div>

        {/* -------------------- STAGE 1: TANTANGAN 1 (EXISTING TREE) -------------------- */}
        {currentStage === 1 && (
          <>
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md space-y-4">
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <h3 className="font-extrabold text-base text-slate-800 font-candy flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-amber-500" />
                  Kerangka Diagram Pohon Jalur Balap
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  Perhatikan struktur cabang 1 (Jalur Utama) ➔ cabang 2 (Lintasan Akhir)
                </span>
              </div>

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

                  {/* Connecting lines */}
                  <div className="flex-1 flex flex-col justify-between h-44 px-4 relative">
                    <div className="border-t-2 border-r-2 border-amber-400 rounded-tr-2xl h-1/2 w-full" />
                    <div className="border-b-2 border-r-2 border-pink-400 rounded-br-2xl h-1/2 w-full" />
                  </div>

                  {/* 2 Main Branches */}
                  <div className="flex flex-col justify-between h-60 z-10 space-y-6">
                    <div className="w-40 p-3 bg-amber-100 border-2 border-amber-300 rounded-2xl text-center shadow-xs">
                      <div className="text-base">🍫</div>
                      <div className="text-xs font-extrabold text-amber-950 font-candy">Jalur Cokelat</div>
                      <span className="text-[10px] text-amber-700 font-semibold">Cabang Utama 1</span>
                    </div>
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

                  {/* 3 Sub-branches per main branch */}
                  <div className="flex flex-col justify-between h-84 z-10 space-y-2">
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
                <strong>Instruksi Analisis:</strong> Amati diagram pohon di atas. Dari titik Start ada{' '}
                <strong>2 pilihan jalur utama</strong>, dan dari masing-masing jalur utama bercabang ke{' '}
                <strong>3 lintasan akhir</strong> menuju Finis. Hitunglah total seluruh kemungkinan rute unik yang bisa dilalui pembalap!
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-pink-100 space-y-5">
              <VanellopeGuide
                mood={c1Correct ? 'celebrating' : c1Checked ? 'hint' : 'happy'}
                dialogue={
                  c1Correct ? (
                    <span>
                      Hebat! Karena setiap 1 jalur utama bercabang lagi ke 3 lintasan akhir secara berurutan (konsep{' '}
                      <strong>"DAN"</strong>), kita gunakan <strong>Aturan Perkalian</strong>! Sekarang ayo lanjut ke Tantangan 2 untuk memetakan diagram pohon sendiri!
                    </span>
                  ) : (
                    <span>
                      "Dari garis Start menuju Checkpoint ada <strong>2 jalur utama</strong>. Dari setiap jalur utama bercabang lagi menjadi <strong>3 lintasan akhir</strong> menuju Finish. Berapa banyak seluruh kemungkinan rute yang bisa kulalui?"
                    </span>
                  )
                }
              />

              {c1Checked && !c1Correct && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 space-y-2 animate-shake">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-amber-800">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Jawabanmu belum tepat. Yuk cek konsep kata hubungnya:</span>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-1.5 pl-6 list-disc font-medium text-amber-900/90 leading-relaxed">
                    <li>
                      <strong>Cek Konsep:</strong> Perjalanan balap ini terdiri dari 2 tahapan berurutan: memilih Jalur Utama (Tahap 1){' '}
                      <strong>DAN</strong> memilih Lintasan Akhir (Tahap 2).
                    </li>
                    <li>
                      <strong>Identifikasi Aturan:</strong> Karena kejadian ini berurutan dan berpasangan (konsep{' '}
                      <strong>"DAN"</strong>), kita menggunakan <strong>Aturan Perkalian</strong>, bukan penjumlahan!
                    </li>
                    {c1HintLevel >= 2 && (
                      <li>
                        <strong>Petunjuk Tambahan:</strong> Kalikan banyaknya cabang jalur utama dengan banyaknya sub-cabang lintasan akhir. Coba hitung kembali!
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {c1Correct && (
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Tantangan 1 Berhasil! Siap memetakan diagram pohon sendiri di Tantangan 2?</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStage(2)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>Lanjut ke Tantangan 2</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {!c1Correct && (
                <form onSubmit={handleCheckChallenge1} className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label htmlFor="mission3-c1-input" className="text-xs sm:text-sm font-bold text-slate-800 shrink-0">
                      Total seluruh rute unik:
                    </label>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        id="mission3-c1-input"
                        type="number"
                        value={c1Input}
                        onChange={(e) => setC1Input(e.target.value)}
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
          </>
        )}

        {/* -------------------- STAGE 2: TANTANGAN 2 (INTERACTIVE TREE MAPPING) -------------------- */}
        {currentStage === 2 && (
          <>
            {/* Case Study Prompt Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md space-y-5">
              <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-pink-50/70 rounded-2xl border border-amber-200 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider">
                  Studi Kasus Pemetaan Diagram Pohon
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  Panitia balap Sugar Rush merancang jalur menuju Garis Finis. Dari titik <strong>Start (S)</strong>, pembalap bisa memilih <strong>2 rute awal</strong>: <strong>Jalur Pelangi (P)</strong> atau <strong>Jalur Cokelat (C)</strong>. Setelah melewati rute awal tersebut, masing-masing rute bercabang lagi menuju <strong>3 pos pemeriksaan</strong>: <strong>Pos Karamel (K)</strong>, <strong>Pos Mint (M)</strong>, atau <strong>Pos Vanila (V)</strong> sebelum akhirnya mencapai Garis Finis. Lengkapilah cabang diagram pohon di bawah ini dengan memilih pos tujuan pada setiap cabang rute agar seluruh kemungkinan jalur terpetakan!
                </p>
              </div>

              {/* Interactive Tree Builder Canvas */}
              <div className="overflow-x-auto py-2">
                <div className="min-w-[780px] flex items-center justify-between relative px-5 py-6 bg-gradient-to-r from-slate-50 via-pink-50/20 to-emerald-50/30 rounded-2xl border border-slate-200 gap-4">
                  {/* Root: START (S) */}
                  <div className="flex flex-col items-center z-10 shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-slate-800 text-white flex flex-col items-center justify-center p-2 text-center shadow-lg border-2 border-white">
                      <span className="text-lg">🚦</span>
                      <span className="text-xs font-extrabold font-candy">Start (S)</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 mt-1">Titik Awal</span>
                  </div>

                  {/* Connector lines S -> P & C */}
                  <div className="w-16 flex flex-col justify-between h-56 shrink-0">
                    <div className="border-t-2 border-r-2 border-pink-400 rounded-tr-2xl h-1/2 w-full" />
                    <div className="border-b-2 border-r-2 border-amber-500 rounded-br-2xl h-1/2 w-full" />
                  </div>

                  {/* 2 Main Route Nodes: P and C */}
                  <div className="flex flex-col justify-between h-72 z-10 shrink-0 py-3">
                    <div className="w-40 p-3 bg-pink-100 border-2 border-pink-300 rounded-2xl text-center shadow-xs">
                      <div className="text-base">🌈</div>
                      <div className="text-xs font-extrabold text-pink-950 font-candy">Jalur Pelangi (P)</div>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          mappingStatus.pComplete
                            ? 'bg-emerald-500 text-white'
                            : 'bg-pink-200 text-pink-800'
                        }`}
                      >
                        {mappingStatus.pComplete ? '3 Cabang Lengkap ✓' : 'Petakan K, M, V'}
                      </span>
                    </div>

                    <div className="w-40 p-3 bg-amber-100 border-2 border-amber-300 rounded-2xl text-center shadow-xs">
                      <div className="text-base">🍫</div>
                      <div className="text-xs font-extrabold text-amber-950 font-candy">Jalur Cokelat (C)</div>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          mappingStatus.cComplete
                            ? 'bg-emerald-500 text-white'
                            : 'bg-amber-200 text-amber-900'
                        }`}
                      >
                        {mappingStatus.cComplete ? '3 Cabang Lengkap ✓' : 'Petakan K, M, V'}
                      </span>
                    </div>
                  </div>

                  {/* Connector Lines Mid -> 6 Leaf Slots */}
                  <div className="w-12 flex flex-col justify-between h-84 shrink-0">
                    <div className="h-1/2 flex flex-col justify-around py-2">
                      <div className="border-b-2 border-pink-300 w-full" />
                      <div className="border-b-2 border-pink-300 w-full" />
                      <div className="border-b-2 border-pink-300 w-full" />
                    </div>
                    <div className="h-1/2 flex flex-col justify-around py-2">
                      <div className="border-b-2 border-amber-300 w-full" />
                      <div className="border-b-2 border-amber-300 w-full" />
                      <div className="border-b-2 border-amber-300 w-full" />
                    </div>
                  </div>

                  {/* 6 Interactive Branch Dropdown Nodes */}
                  <div className="flex-1 flex flex-col justify-between space-y-2.5 z-10">
                    {/* P Branches (0, 1, 2) */}
                    {([0, 1, 2] as const).map((idx) => {
                      const val = treeMapping.branchP[idx];
                      const meta = getCheckpointMeta(val);
                      return (
                        <div
                          key={`P-${idx}`}
                          className={`p-2 px-3 rounded-xl border-2 flex items-center justify-between gap-2 bg-white shadow-2xs transition-all ${
                            val ? 'border-pink-300' : 'border-dashed border-pink-200'
                          }`}
                        >
                          <select
                            aria-label={`Cabang Jalur Pelangi ${idx + 1}`}
                            value={val}
                            onChange={(e) =>
                              handleUpdateBranch('branchP', idx, e.target.value as CheckpointCode)
                            }
                            className="flex-1 text-xs font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                          >
                            <option value="">-- Pilih Pos Cabang P{idx + 1} --</option>
                            {CHECKPOINT_OPTIONS.map((opt) => (
                              <option key={opt.code} value={opt.code}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <span
                            className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-extrabold border shrink-0 ${
                              meta ? meta.badgeClass : 'bg-slate-100 text-slate-400 border-slate-200'
                            }`}
                          >
                            {val ? `(P, ${val})` : '(P, ?)'}
                          </span>
                        </div>
                      );
                    })}

                    <div className="h-2" />

                    {/* C Branches (0, 1, 2) */}
                    {([0, 1, 2] as const).map((idx) => {
                      const val = treeMapping.branchC[idx];
                      const meta = getCheckpointMeta(val);
                      return (
                        <div
                          key={`C-${idx}`}
                          className={`p-2 px-3 rounded-xl border-2 flex items-center justify-between gap-2 bg-white shadow-2xs transition-all ${
                            val ? 'border-amber-300' : 'border-dashed border-amber-200'
                          }`}
                        >
                          <select
                            aria-label={`Cabang Jalur Cokelat ${idx + 1}`}
                            value={val}
                            onChange={(e) =>
                              handleUpdateBranch('branchC', idx, e.target.value as CheckpointCode)
                            }
                            className="flex-1 text-xs font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                          >
                            <option value="">-- Pilih Pos Cabang C{idx + 1} --</option>
                            {CHECKPOINT_OPTIONS.map((opt) => (
                              <option key={opt.code} value={opt.code}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <span
                            className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-extrabold border shrink-0 ${
                              meta ? meta.badgeClass : 'bg-slate-100 text-slate-400 border-slate-200'
                            }`}
                          >
                            {val ? `(C, ${val})` : '(C, ?)'}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Target: FINIS */}
                  <div className="flex flex-col items-center z-10 ml-3 shrink-0">
                    <div
                      className={`w-20 h-20 rounded-2xl text-white flex flex-col items-center justify-center p-2 text-center shadow-lg border-2 border-white transition-all ${
                        mappingStatus.isValid ? 'bg-emerald-600 animate-pulse' : 'bg-slate-400'
                      }`}
                    >
                      <span className="text-lg">🏁</span>
                      <span className="text-xs font-extrabold font-candy">FINIS</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 mt-1">Garis Akhir</span>
                  </div>
                </div>
              </div>

              {/* Duplicate Warning */}
              {(pHasDuplicate || cHasDuplicate) && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs font-semibold text-amber-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Perhatian: Dalam satu rute awal ({pHasDuplicate ? 'Jalur P' : ''}{pHasDuplicate && cHasDuplicate ? ' & ' : ''}{cHasDuplicate ? 'Jalur C' : ''}), ketiga cabang harus menuju pos yang berbeda-beda (<strong>K, M, dan V</strong> masing-masing satu kali).
                  </span>
                </div>
              )}

              {/* Live Mapped Routes Preview */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Status Pemetaan Pasangan Jalur (P/C, K/M/V):</span>
                  <span className={mappingStatus.isValid ? 'text-emerald-700' : 'text-pink-600'}>
                    {mappingStatus.isValid
                      ? 'Seluruh cabang lengkap terpetakan! ✓'
                      : 'Lengkapi ke-6 cabang diagram pohon di atas'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    ...treeMapping.branchP.map((code, i) => ({
                      key: `p-${i}`,
                      text: code ? `(P, ${code})` : `(P, ?)`,
                      filled: !!code,
                    })),
                    ...treeMapping.branchC.map((code, i) => ({
                      key: `c-${i}`,
                      text: code ? `(C, ${code})` : `(C, ?)`,
                      filled: !!code,
                    })),
                  ].map((chip) => (
                    <span
                      key={chip.key}
                      className={`px-3 py-1 rounded-xl font-mono text-xs font-bold border ${
                        chip.filled
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      {chip.text} ➔ 🏁
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Dialogue & Final Total Input */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-pink-100 space-y-5">
              <VanellopeGuide
                mood={c2Correct ? 'celebrating' : c2Checked && !c2Correct ? 'hint' : mappingStatus.isValid ? 'happy' : 'thinking'}
                dialogue={
                  c2Correct ? (
                    <span>
                      Sempurna! Diagram pohonmu terpetakan dengan rapi dan hitungan totalmu benar: ada{' '}
                      <strong>6 kemungkinan jalur unik</strong> dari Start (S) menuju Garis Finis! Misi 3 tuntas!
                    </span>
                  ) : mappingStatus.isValid ? (
                    <span>
                      Keren! Keenam cabang diagram pohon sudah lengkap terpetakan. Sekarang hitung: berdasarkan diagram pohon buatanmu, ada berapa total seluruh kemungkinan jalur dari Start (S) menuju Finis?
                    </span>
                  ) : (
                    <span>
                      "Ayo bantu panitia melengkapi diagram pohon di atas! Pastikan dari <strong>Jalur Pelangi (P)</strong> dan <strong>Jalur Cokelat (C)</strong> masing-masing terhubung ke ketiga pos: <strong>Karamel (K), Mint (M), dan Vanila (V)</strong>!"
                    </span>
                  )
                }
              />

              {/* Stepped Hint Box for Challenge 2 */}
              {c2Checked && !c2Correct && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 space-y-2 animate-shake">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-amber-800">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Jawabanmu belum tepat. Yuk cek kembali diagram pohon yang sudah kamu buat:</span>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-1.5 pl-6 list-disc font-medium text-amber-900/90 leading-relaxed">
                    <li>
                      <strong>Cek Konsep:</strong> Pembalap memilih Rute Awal (P atau C) <strong>DAN</strong> Pos Pemeriksaan (K, M, atau V) secara berurutan. Apakah menggunakan Aturan Perkalian ("DAN") atau Penjumlahan ("ATAU")?
                    </li>
                    <li>
                      <strong>Hitung Dari Diagram Pohon:</strong> Hitung jumlah total pasangan jalur ujung (ujung cabang menuju 🏁 Finis) yang baru saja kamu petakan di atas!
                    </li>
                    {c2HintLevel >= 2 && (
                      <li>
                        <strong>Petunjuk Tambahan:</strong> Kalikan banyaknya rute awal dengan banyaknya pos pemeriksaan per rute. Coba hitung ulang!
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Success Banner */}
              {c2Correct && (
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 text-emerald-900 space-y-3">
                  <div className="flex items-center gap-2 font-extrabold text-base text-emerald-800">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <span>Kedua Tantangan Misi 3 Berhasil Diselesaikan! (+50 PTS & ⭐ 1 Bintang)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-800/90 leading-relaxed">
                    <strong>Pembahasan Konsep:</strong> Dari Start (S) terdapat 2 rute awal (P, C), dan tiap rute bercabang ke 3 pos pemeriksaan (K, M, V). Keenam pasangan jalur unik yang terbentuk adalah (P,K), (P,M), (P,V), (C,K), (C,M), dan (C,V) ➔ total <strong>2 × 3 = 6 jalur</strong>.
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

              {/* Input Form Unlocked Only When Tree Mapping Is Complete */}
              {mappingStatus.isValid && !c2Correct && (
                <form onSubmit={handleCheckChallenge2} className="space-y-4 pt-2 border-t border-slate-100">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    Diagram Pohon Lengkap! Masukkan total seluruh jalur yang terbentuk:
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label htmlFor="mission3-c2-input" className="text-xs sm:text-sm font-bold text-slate-800 shrink-0">
                      Total seluruh kemungkinan jalur:
                    </label>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        id="mission3-c2-input"
                        type="number"
                        value={c2Input}
                        onChange={(e) => setC2Input(e.target.value)}
                        placeholder="Ketik angka..."
                        className="w-full sm:w-36 px-4 py-2.5 text-center font-bold text-base bg-[#FAF8F5] border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:outline-none focus:bg-white text-slate-800"
                      />
                      <span className="text-xs font-semibold text-slate-500">jalur</span>
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
          </>
        )}
      </div>
    </div>
  );
};
