/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Misi 2: Garasi Kostum Pembalap (Membedakan Aturan Penjumlahan & Perkalian)
 * Tantangan 1: Identifikasi Kasus (Penjumlahan vs Perkalian)
 * Tantangan 2: Simulasi Manekin Avatar (4 x 3 x 2 = 24)
 * Sistem Hint bertahap ("DAN" vs "ATAU") tanpa membocorkan jawaban benar.
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Shirt,
  Sparkles,
  RefreshCw,
  HelpCircle,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { StudentProfile } from '../types';
import { VanellopeGuide } from './VanellopeGuide';
import {
  verifyMission2Challenge1,
  verifyMission2Challenge2,
} from '../utils/mathRules';
import { playCorrectSound, playWrongSound } from '../utils/soundEffects';

interface Mission2Props {
  profile: StudentProfile;
  onComplete: () => void;
  onBackToMap: () => void;
}

export const Mission2OutfitGarage: React.FC<Mission2Props> = ({
  profile,
  onComplete,
  onBackToMap,
}) => {
  const [currentStage, setCurrentStage] = useState<1 | 2>(1);

  // Tantangan 1: Identifikasi Kasus
  const [caseASelection, setCaseASelection] = useState<'penjumlahan' | 'perkalian' | ''>('');
  const [caseBSelection, setCaseBSelection] = useState<'penjumlahan' | 'perkalian' | ''>('');
  const [c1Checked, setC1Checked] = useState(false);
  const [c1Correct, setC1Correct] = useState(false);
  const [c1HintLevel, setC1HintLevel] = useState(1);

  // Tantangan 2: Simulasi Manekin
  const [selectedTop, setSelectedTop] = useState<'A' | 'B' | 'C' | 'D'>('C');
  const [selectedBottom, setSelectedBottom] = useState<'1' | '2' | '3'>('1');
  const [selectedShoes, setSelectedShoes] = useState<'1' | '2'>('2');
  const [c2Input, setC2Input] = useState('');
  const [c2Checked, setC2Checked] = useState(false);
  const [c2Correct, setC2Correct] = useState(false);
  const [c2HintLevel, setC2HintLevel] = useState(1);

  // Tops (4 Options)
  const tops = [
    { id: 'A', name: 'Atasan A: Kemeja Pastel', icon: '👔', desc: 'Warna pastel lembut' },
    { id: 'B', name: 'Atasan B: Kaos Oversize', icon: '👕', desc: 'Gaya kasual santai' },
    { id: 'C', name: 'Atasan C: Hoodie Mint', icon: '🧥', desc: 'Hoodie balap khas Vanellope' },
    { id: 'D', name: 'Atasan D: Jaket Denim', icon: '🧥', desc: 'Bahan tebal tahan angin' },
  ];

  // Bottoms (3 Options)
  const bottoms = [
    { id: '1', name: 'Bawahan 1: Rok Permen', icon: '👗' },
    { id: '2', name: 'Bawahan 2: Celana Cokelat', icon: '👖' },
    { id: '3', name: 'Bawahan 3: Rok Mint', icon: '👗' },
  ];

  // Shoes (2 Options)
  const shoes = [
    { id: '1', name: 'Sepatu 1: Sneakers Putih', icon: '👟' },
    { id: '2', name: 'Sepatu 2: Sepatu Bot Merah', icon: '👢' },
  ];

  // Handle Challenge 1 Check
  const handleCheckChallenge1 = (e: React.FormEvent) => {
    e.preventDefault();
    setC1Checked(true);
    const correct = verifyMission2Challenge1(caseASelection, caseBSelection);

    if (correct) {
      setC1Correct(true);
      playCorrectSound();
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#38BDF8', '#10B981', '#EC4899'],
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
    const correct = verifyMission2Challenge2(c2Input);

    if (correct) {
      setC2Correct(true);
      playCorrectSound();
      try {
        confetti({
          particleCount: 95,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10B981', '#F59E0B', '#EC4899'],
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
            <span className="font-bold text-sky-600">Pos 2 • Tantangan {currentStage} dari 2</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Mission Title Header */}
        <div className="bg-gradient-to-r from-sky-600 to-teal-500 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold mb-1.5 uppercase">
              <Shirt className="w-3.5 h-3.5" />
              Pos 2 • Garasi Kostum Pembalap
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-candy tracking-wide">
              {currentStage === 1
                ? 'TANTANGAN 1: KLASIFIKASI ATURAN PENJUMLAHAN VS PERKALIAN'
                : 'TANTANGAN 2: SIMULASI MANEKIN OUTFIT BALAP'}
            </h2>
            <p className="text-sky-100 text-xs sm:text-sm mt-0.5">
              {currentStage === 1
                ? 'Bedakan sifat kejadian saling lepas ("ATAU") dengan kejadian berpasangan berurutan ("DAN").'
                : 'Pasang seragam balap pada manekin avatar dan hitung total kemungkinan kombinasinya!'}
            </p>
          </div>

          {/* Stepper Pill Indicator */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2.5 px-4 rounded-2xl border border-white/20 shrink-0">
            <span className={`w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center ${currentStage === 1 ? 'bg-white text-sky-700' : 'bg-emerald-400 text-white'}`}>
              {c1Correct ? '✓' : '1'}
            </span>
            <span className="text-white text-xs font-bold">➔</span>
            <span className={`w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center ${currentStage === 2 ? 'bg-white text-sky-700' : 'bg-white/30 text-white'}`}>
              {c2Correct ? '✓' : '2'}
            </span>
          </div>
        </div>

        {/* -------------------- STAGE 1: IDENTIFIKASI ATURAN -------------------- */}
        {currentStage === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-sky-100 space-y-6">
            <VanellopeGuide
              mood={c1Correct ? 'celebrating' : c1Checked ? 'hint' : 'thinking'}
              dialogue={
                c1Correct ? (
                  <span>
                    Analisis yang tajam! Kasus 1 menggunakan <strong>Aturan Penjumlahan</strong> karena kejadian saling lepas (memilih salah satu), sedangkan Kasus 2 menggunakan <strong>Aturan Perkalian</strong> karena perlengkapan dipasangkan berurutan. Ayo lanjut ke Tantangan 2!
                  </span>
                ) : (
                  <span>
                    "Sebelum kita merakit seragam di manekin, bantu aku membedakan 2 situasi di bawah: manakah yang menggunakan <strong>Aturan Penjumlahan</strong> dan manakah yang menggunakan <strong>Aturan Perkalian</strong>?"
                  </span>
                )
              }
            />

            <form onSubmit={handleCheckChallenge1} className="space-y-5">
              {/* Kasus A */}
              <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/60 space-y-3">
                <div className="flex items-center gap-2 font-extrabold text-sm text-slate-800">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center">A</span>
                  <span>Kasus A: Pemilihan Pelindung Kepala</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Di loker sirkuit tersedia <strong>3 Helm Balap Full-Face</strong> dan <strong>2 Topi Balap Visor</strong>. Vanellope hanya boleh memakai <strong>SATU</strong> pelindung kepala saja (ia memakai Helm <strong>ATAU</strong> Topi, tidak mungkin memakai keduanya sekaligus).
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Aturan yang berlaku:</span>
                  <button
                    type="button"
                    onClick={() => setCaseASelection('penjumlahan')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                      caseASelection === 'penjumlahan'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    Aturan Penjumlahan (Saling Lepas)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCaseASelection('perkalian')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                      caseASelection === 'perkalian'
                        ? 'border-sky-500 bg-sky-50 text-sky-800 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    Aturan Perkalian (Berpasangan)
                  </button>
                </div>
              </div>

              {/* Kasus B */}
              <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/60 space-y-3">
                <div className="flex items-center gap-2 font-extrabold text-sm text-slate-800">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center">B</span>
                  <span>Kasus B: Pasangan Perlengkapan Balap</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sebelum bertanding, mekanik wajib memasang <strong>1 Helm Pelindung DAN 1 Pasang Sarung Tangan</strong> secara berpasangan. Jika tersedia 3 pilihan Helm dan 4 pilihan Sarung Tangan, aturan manakah yang digunakan untuk mencari total pasangan perlengkapan?
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Aturan yang berlaku:</span>
                  <button
                    type="button"
                    onClick={() => setCaseBSelection('penjumlahan')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                      caseBSelection === 'penjumlahan'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    Aturan Penjumlahan (Saling Lepas)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCaseBSelection('perkalian')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                      caseBSelection === 'perkalian'
                        ? 'border-sky-500 bg-sky-50 text-sky-800 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    Aturan Perkalian (Berpasangan)
                  </button>
                </div>
              </div>

              {/* Stepped Hint Box */}
              {c1Checked && !c1Correct && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 space-y-2 animate-shake">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-amber-800">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Klasifikasimu belum tepat. Perhatikan petunjuk kata kunci ini:</span>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-1.5 pl-6 list-disc font-medium text-amber-900/90 leading-relaxed">
                    <li>
                      <strong>Cek Kasus A:</strong> Apakah Vanellope memilih salah satu (Helm <em>ATAU</em> Topi)? Ingat: kata hubung <strong>"ATAU"</strong> untuk kejadian saling lepas selalu menggunakan <strong>Aturan Penjumlahan</strong>.
                    </li>
                    <li>
                      <strong>Cek Kasus B:</strong> Apakah mekanik memasangkan Helm <em>DAN</em> Sarung Tangan secara simultan? Kata hubung <strong>"DAN"</strong> untuk kejadian berurutan berpasangan selalu menggunakan <strong>Aturan Perkalian</strong>.
                    </li>
                  </ul>
                </div>
              )}

              {/* Success Banner */}
              {c1Correct && (
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Tantangan 1 Berhasil! Kamu paham perbedaan ATAU vs DAN!</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStage(2)}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                  >
                    <span>Lanjut ke Tantangan 2 (Manekin)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Submit Button */}
              {!c1Correct && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!caseASelection || !caseBSelection}
                    className={`px-7 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                      caseASelection && caseBSelection
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md active:scale-95'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    PERIKSA KLASIFIKASI
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {/* -------------------- STAGE 2: SIMULASI MANEKIN -------------------- */}
        {currentStage === 2 && (
          <div className="space-y-6">
            {/* 2-Column Side-by-Side Studio Grid (Left Sticky Mannequin, Right Outfit Options) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Column: Sticky FIT-ROOM MANNEQUIN */}
              <div className="md:col-span-5 md:sticky md:top-16 bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-6 border-2 border-slate-700 shadow-xl flex flex-col items-center justify-between text-white relative min-h-[440px] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="text-center z-10 w-full flex items-center justify-between px-2">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-teal-400 font-bold">
                    FIT-ROOM MANNEQUIN
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const t = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)] as any;
                      const b = ['1', '2', '3'][Math.floor(Math.random() * 3)] as any;
                      const s = ['1', '2'][Math.floor(Math.random() * 2)] as any;
                      setSelectedTop(t);
                      setSelectedBottom(b);
                      setSelectedShoes(s);
                    }}
                    className="text-[11px] bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                    title="Coba kombinasi acak"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Acak
                  </button>
                </div>

                {/* Mannequin Vector */}
                <div className="relative my-auto py-3 flex flex-col items-center justify-center">
                  <svg viewBox="0 0 200 320" className="w-48 h-72 sm:w-56 sm:h-80 drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="100" cy="45" rx="20" ry="25" fill="#E2E8F0" />
                    <path d="M96 68 L104 68 L104 80 L96 80 Z" fill="#CBD5E1" />
                    <path d="M75 80 L125 80 L118 160 L82 160 Z" fill="#CBD5E1" />

                    {/* Tops */}
                    {selectedTop === 'A' && (
                      <g>
                        <path d="M70 80 C70 80 85 78 100 78 C115 78 130 80 130 80 L138 135 L124 140 L118 100 L116 160 L84 160 L82 100 L76 140 L62 135 Z" fill="#F472B6" />
                        <path d="M85 78 L100 95 L115 78 L105 84 L100 90 L95 84 Z" fill="#FBCFE8" />
                        <circle cx="100" cy="110" r="2" fill="#FFFFFF" />
                        <circle cx="100" cy="125" r="2" fill="#FFFFFF" />
                        <circle cx="100" cy="140" r="2" fill="#FFFFFF" />
                      </g>
                    )}
                    {selectedTop === 'B' && (
                      <g>
                        <path d="M66 82 C80 80 120 80 134 82 L142 130 L126 135 L120 162 L80 162 L74 135 L58 130 Z" fill="#34D399" />
                        <ellipse cx="100" cy="82" rx="14" ry="5" fill="#059669" />
                        <rect x="85" y="110" width="30" height="8" rx="2" fill="#FFFFFF" opacity="0.8" />
                      </g>
                    )}
                    {selectedTop === 'C' && (
                      <g>
                        <path d="M65 82 C80 80 120 80 135 82 L145 138 L128 142 L118 165 L82 165 L72 142 L55 138 Z" fill="#10B981" />
                        <path d="M80 80 C80 95 120 95 120 80 C110 88 90 88 80 80 Z" fill="#047857" />
                        <path d="M93 92 L91 125" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M107 92 L109 127" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M86 138 L114 138 L110 156 L90 156 Z" fill="#059669" />
                      </g>
                    )}
                    {selectedTop === 'D' && (
                      <g>
                        <path d="M66 82 C80 80 120 80 134 82 L144 140 L128 144 L118 164 L82 164 L72 144 L56 140 Z" fill="#3B82F6" />
                        <path d="M84 82 L100 115 L100 164 L96 164 L84 100 Z" fill="#1D4ED8" />
                        <path d="M116 82 L100 115 L100 164 L104 164 L116 100 Z" fill="#1E40AF" />
                        <rect x="80" y="105" width="14" height="6" rx="1" fill="#1D4ED8" />
                        <rect x="106" y="105" width="14" height="6" rx="1" fill="#1D4ED8" />
                      </g>
                    )}

                    {/* Bottoms */}
                    {selectedBottom === '1' && (
                      <g>
                        <path d="M82 160 L118 160 L135 210 L65 210 Z" fill="#EC4899" />
                        <path d="M80 160 L80 210" stroke="#BE185D" strokeWidth="1.5" />
                        <path d="M92 160 L92 210" stroke="#F472B6" strokeWidth="1.5" />
                        <path d="M100 160 L100 210" stroke="#BE185D" strokeWidth="1.5" />
                        <path d="M108 160 L108 210" stroke="#F472B6" strokeWidth="1.5" />
                        <path d="M120 160 L120 210" stroke="#BE185D" strokeWidth="1.5" />
                      </g>
                    )}
                    {selectedBottom === '2' && (
                      <g>
                        <path d="M82 160 L118 160 L116 250 L102 250 L100 185 L98 250 L84 250 Z" fill="#78350F" />
                        <rect x="82" y="160" width="36" height="5" fill="#451A03" />
                      </g>
                    )}
                    {selectedBottom === '3' && (
                      <g>
                        <path d="M82 160 L118 160 L135 210 L65 210 Z" fill="#2DD4BF" />
                        <path d="M82 160 L80 210" stroke="#0F766E" strokeWidth="1.5" />
                        <path d="M94 160 L93 210" stroke="#14B8A6" strokeWidth="1.5" />
                        <path d="M100 160 L100 210" stroke="#0F766E" strokeWidth="1.5" />
                        <path d="M106 160 L107 210" stroke="#14B8A6" strokeWidth="1.5" />
                        <path d="M118 160 L120 210" stroke="#0F766E" strokeWidth="1.5" />
                      </g>
                    )}

                    {/* Stockings if skirt */}
                    {(selectedBottom === '1' || selectedBottom === '3') && (
                      <g>
                        <rect x="85" y="210" width="10" height="42" fill="#A7F3D0" />
                        <line x1="85" y1="220" x2="95" y2="220" stroke="#059669" strokeWidth="2" />
                        <line x1="85" y1="230" x2="95" y2="230" stroke="#059669" strokeWidth="2" />
                        <line x1="85" y1="240" x2="95" y2="240" stroke="#059669" strokeWidth="2" />
                        <rect x="105" y="210" width="10" height="42" fill="#A7F3D0" />
                        <line x1="105" y1="220" x2="115" y2="220" stroke="#059669" strokeWidth="2" />
                        <line x1="105" y1="230" x2="115" y2="230" stroke="#059669" strokeWidth="2" />
                        <line x1="105" y1="240" x2="115" y2="240" stroke="#059669" strokeWidth="2" />
                      </g>
                    )}

                    {/* Shoes */}
                    {selectedShoes === '1' && (
                      <g>
                        <path d="M83 250 L96 250 L98 268 C98 272 82 274 74 272 L74 265 L83 255 Z" fill="#FFFFFF" />
                        <path d="M74 270 L98 270" stroke="#94A3B8" strokeWidth="2" />
                        <circle cx="88" cy="260" r="1.5" fill="#3B82F6" />
                        <path d="M104 250 L117 250 L126 255 L126 265 L126 272 C118 274 102 272 102 268 Z" fill="#FFFFFF" />
                        <path d="M102 270 L126 270" stroke="#94A3B8" strokeWidth="2" />
                        <circle cx="112" cy="260" r="1.5" fill="#3B82F6" />
                      </g>
                    )}
                    {selectedShoes === '2' && (
                      <g>
                        <path d="M82 245 L97 245 L98 272 C98 276 80 276 72 273 L72 262 L82 250 Z" fill="#DC2626" />
                        <path d="M72 271 L98 271" stroke="#7F1D1D" strokeWidth="2.5" />
                        <rect x="82" y="247" width="15" height="3" fill="#FCA5A5" />
                        <path d="M103 245 L118 245 L118 250 L128 262 L128 273 C120 276 102 276 102 272 Z" fill="#DC2626" />
                        <path d="M102 271 L128 271" stroke="#7F1D1D" strokeWidth="2.5" />
                        <rect x="103" y="247" width="15" height="3" fill="#FCA5A5" />
                      </g>
                    )}
                  </svg>
                </div>

                <div className="z-10 bg-slate-800/90 border border-slate-600 rounded-xl px-3.5 py-2 text-center text-xs font-mono w-full">
                  <span className="text-teal-300 font-bold">Set Aktif:</span> Top {selectedTop} + Bottom {selectedBottom} + Shoes {selectedShoes}
                </div>
              </div>

              {/* Right Column: All Outfit Selection Options (Atasan, Bawahan, Sepatu) */}
              <div className="md:col-span-7 space-y-5">
                {/* Pilih Atasan (4 Opsi) */}
                <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
                    <h3 className="font-extrabold text-sm text-slate-800 font-candy">
                      1. Pilih Atasan (4 Opsi)
                    </h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 bg-sky-50 text-sky-700 rounded-full border border-sky-200">
                      k₁ = 4
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {tops.map((top) => {
                      const isSelected = selectedTop === top.id;
                      return (
                        <button
                          key={top.id}
                          type="button"
                          onClick={() => setSelectedTop(top.id as any)}
                          className={`w-full p-3 rounded-2xl border-2 transition-all flex items-center justify-between text-left ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-400/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">{top.icon}</span>
                            <div>
                              <div className="text-xs font-extrabold text-slate-800">{top.name}</div>
                              <div className="text-[10px] text-slate-500">{top.desc}</div>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pilih Bawahan (3 Opsi) */}
                <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
                    <h3 className="font-extrabold text-sm text-slate-800 font-candy">
                      2. Pilih Bawahan (3 Opsi)
                    </h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 bg-pink-50 text-pink-700 rounded-full border border-pink-200">
                      k₂ = 3
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {bottoms.map((bottom) => {
                      const isSelected = selectedBottom === bottom.id;
                      return (
                        <button
                          key={bottom.id}
                          type="button"
                          onClick={() => setSelectedBottom(bottom.id as any)}
                          className={`w-full p-3 rounded-2xl border-2 transition-all flex items-center justify-between text-left ${
                            isSelected
                              ? 'border-pink-500 bg-pink-50/70 shadow-sm ring-2 ring-pink-400/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{bottom.icon}</span>
                            <span className="text-xs font-bold text-slate-800">{bottom.name}</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-pink-600 bg-pink-600' : 'border-slate-300'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pilih Sepatu (2 Opsi) */}
                <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
                    <h3 className="font-extrabold text-sm text-slate-800 font-candy">
                      3. Pilih Sepatu (2 Opsi)
                    </h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
                      k₃ = 2
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {shoes.map((shoe) => {
                      const isSelected = selectedShoes === shoe.id;
                      return (
                        <button
                          key={shoe.id}
                          type="button"
                          onClick={() => setSelectedShoes(shoe.id as any)}
                          className={`w-full p-3 rounded-2xl border-2 transition-all flex items-center justify-between text-left ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-2 ring-amber-400/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{shoe.icon}</span>
                            <span className="text-xs font-bold text-slate-800">{shoe.name}</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-amber-600 bg-amber-600' : 'border-slate-300'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Dialogue & Calculation Area */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-pink-100 space-y-5">
              <VanellopeGuide
                mood={c2Correct ? 'celebrating' : c2Checked ? 'hint' : 'happy'}
                dialogue={
                  c2Correct ? (
                    <span>
                      Tepat sekali! Karena seragam balap terdiri dari 1 Atasan <strong>DAN</strong> 1 Bawahan <strong>DAN</strong> 1 Pasang Sepatu yang berpasangan secara simultan, kita gunakan <strong>Aturan Perkalian</strong>!
                    </span>
                  ) : (
                    <span>
                      "Kombinasi kostum ini serasi! Berapa banyak kemungkinan kostum balap yang bisa dibuat dari <strong>4 Atasan</strong>, <strong>3 Bawahan</strong>, dan <strong>2 Sepatu</strong>?"
                    </span>
                  )
                }
              />

              {/* Stepped Hint Box */}
              {c2Checked && !c2Correct && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 space-y-2 animate-shake">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-amber-800">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Jawabanmu belum tepat. Yuk cek konsep kata hubungnya:</span>
                  </div>
                  <ul className="text-xs sm:text-sm space-y-1.5 pl-6 list-disc font-medium text-amber-900/90 leading-relaxed">
                    <li>
                      <strong>Cek Konsep:</strong> Apakah pembalap hanya memilih atasan <em>ATAU</em> bawahan saja? Tidak, pembalap harus memakai 1 Atasan <strong>DAN</strong> 1 Bawahan <strong>DAN</strong> 1 Sepatu secara bersamaan.
                    </li>
                    <li>
                      <strong>Identifikasi Aturan:</strong> Karena menggunakan konsep <strong>"DAN"</strong> (kejadian berpasangan simultan), gunakan <strong>Aturan Perkalian</strong>, bukan penjumlahan!
                    </li>
                    {c2HintLevel >= 2 && (
                      <li>
                        <strong>Petunjuk Tambahan:</strong> Kalikan jumlah opsi atasan (4) × opsi bawahan (3) × opsi sepatu (2). Coba hitung kembali!
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
                    <span>Kedua Tantangan Misi 2 Selesai! (+50 PTS & ⭐ 1 Bintang)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-800/90 leading-relaxed">
                    <strong>Rangkuman Pembelajaran:</strong>
                    <br />• <em>Tantangan 1:</em> Berhasil mengklasifikasikan kejadian saling lepas ("ATAU" ➔ Penjumlahan) dan kejadian berpasangan ("DAN" ➔ Perkalian).
                    <br />• <em>Tantangan 2:</em> Aturan Perkalian kostum: 4 × 3 × 2 = 24 kombinasi.
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={onComplete}
                      className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-candy font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <span>KEMBALI KE PETA SIRKUIT & BUKA POS 3 &gt;</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Form Input */}
              {!c2Correct && (
                <form onSubmit={handleCheckChallenge2} className="flex flex-col sm:flex-row items-center gap-3">
                  <label htmlFor="mission2-input" className="text-xs sm:text-sm font-bold text-slate-800 shrink-0">
                    Total kemungkinan kostum:
                  </label>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      id="mission2-input"
                      type="number"
                      value={c2Input}
                      onChange={(e) => setC2Input(e.target.value)}
                      placeholder="Ketik angka..."
                      className="w-full sm:w-36 px-4 py-2.5 text-center font-bold text-base bg-[#FAF8F5] border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:outline-none focus:bg-white text-slate-800"
                    />
                    <span className="text-xs font-semibold text-slate-500">kombinasi</span>
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
