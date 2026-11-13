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
            {/* 2-Column Side-by-Side Studio Grid (Left Sticky Vanellope Fitting Room, Right Outfit Options) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Column: Sticky VANELLOPE FITTING ROOM */}
              <div className="md:sticky md:top-16 bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-6 border-2 border-slate-700 shadow-xl flex flex-col items-center justify-between text-white relative min-h-[480px] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-36 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-56 h-24 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

                <div className="text-center z-10 w-full flex items-center justify-between px-2">
                  <span className="text-xs font-mono tracking-widest uppercase text-teal-400 font-extrabold">
                    VANELLOPE FITTING ROOM
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

                {/* Full-Body Illustrated Vanellope Chibi Character with Live Outfit */}
                <div className="relative my-auto py-3 flex flex-col items-center justify-center">
                  <svg viewBox="0 0 240 360" className="w-56 h-80 sm:w-64 sm:h-[340px] drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="fitSkin" x1="120" y1="45" x2="120" y2="130" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFF2E8" />
                        <stop offset="100%" stopColor="#FBDBC6" />
                      </linearGradient>
                      <linearGradient id="fitHair" x1="120" y1="20" x2="120" y2="145" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#2A242B" />
                        <stop offset="60%" stopColor="#1B171C" />
                        <stop offset="100%" stopColor="#0F0C0F" />
                      </linearGradient>
                      <radialGradient id="fitIris" cx="0.4" cy="0.4" r="0.6">
                        <stop offset="0%" stopColor="#8A512A" />
                        <stop offset="50%" stopColor="#5E351B" />
                        <stop offset="90%" stopColor="#2F180A" />
                        <stop offset="100%" stopColor="#180C04" />
                      </radialGradient>
                      <linearGradient id="fitLicorice" x1="145" y1="35" x2="180" y2="85" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FB7185" />
                        <stop offset="45%" stopColor="#F43F5E" />
                        <stop offset="100%" stopColor="#BE123C" />
                      </linearGradient>
                      <linearGradient id="fitHoodieMint" x1="120" y1="136" x2="120" y2="218" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="60%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>

                    {/* Studio Floor Shadow */}
                    <ellipse cx="120" cy="338" rx="46" ry="8" fill="#0F172A" opacity="0.55" />

                    {/* 1. BACK HAIR & HIGH PONYTAIL */}
                    <path
                      d="M75 88 C68 58 88 26 122 25 C156 24 174 56 168 88 C168 115 154 132 121 135 C86 135 75 115 75 88 Z"
                      fill="url(#fitHair)"
                    />
                    <g>
                      <path
                        d="M152 50 C168 31 190 29 199 42 C208 55 204 77 191 90 C181 99 164 101 155 93 C161 84 164 72 159 61 C156 56 152 52 152 50 Z"
                        fill="url(#fitHair)"
                      />
                      <path d="M177 41 C189 50 193 69 187 82" stroke="#382E3A" strokeWidth="2.4" strokeLinecap="round" />
                      <path d="M165 46 C177 56 181 72 178 80" stroke="#382E3A" strokeWidth="1.5" strokeLinecap="round" />
                      {/* Pink Licorice Bow */}
                      <path d="M149 48 C142 40 138 50 146 56 Z" fill="url(#fitLicorice)" />
                      <path d="M158 40 C168 32 172 42 162 50 Z" fill="url(#fitLicorice)" />
                      <ellipse cx="153" cy="48" rx="5" ry="4" fill="#E11D48" />
                      <path d="M154 51 C158 60 155 71 151 77" stroke="#F43F5E" strokeWidth="3.2" strokeLinecap="round" />
                      <path d="M151 51 C147 62 148 70 146 75" stroke="#E11D48" strokeWidth="2.8" strokeLinecap="round" />
                    </g>

                    {/* 2. NECK, BARE ARMS & BARE LEGS BASE */}
                    <rect x="112" y="122" width="16" height="19" rx="6" fill="#FBDBC6" />
                    {/* Left & Right Bare Arms + Hands */}
                    <path d="M96 144 L70 186" stroke="#FBDBC6" strokeWidth="13" strokeLinecap="round" />
                    <path d="M144 144 L170 186" stroke="#FBDBC6" strokeWidth="13" strokeLinecap="round" />
                    <circle cx="69" cy="188" r="6.2" fill="url(#fitSkin)" />
                    <circle cx="171" cy="188" r="6.2" fill="url(#fitSkin)" />
                    {/* Bare Legs Base */}
                    <rect x="103" y="214" width="12" height="94" rx="5" fill="#FBDBC6" />
                    <rect x="125" y="214" width="12" height="94" rx="5" fill="#FBDBC6" />

                    {/* 3. BAWAHAN (BOTTOMS) */}
                    {selectedBottom === '1' && (
                      <g>
                        {/* Striped Candy Stockings for Skirt */}
                        <rect x="103" y="256" width="12" height="52" fill="#A7F3D0" />
                        <line x1="103" y1="266" x2="115" y2="266" stroke="#059669" strokeWidth="2.5" />
                        <line x1="103" y1="278" x2="115" y2="278" stroke="#059669" strokeWidth="2.5" />
                        <line x1="103" y1="290" x2="115" y2="290" stroke="#059669" strokeWidth="2.5" />
                        <line x1="103" y1="302" x2="115" y2="302" stroke="#059669" strokeWidth="2.5" />
                        <rect x="125" y="256" width="12" height="52" fill="#A7F3D0" />
                        <line x1="125" y1="266" x2="137" y2="266" stroke="#059669" strokeWidth="2.5" />
                        <line x1="125" y1="278" x2="137" y2="278" stroke="#059669" strokeWidth="2.5" />
                        <line x1="125" y1="290" x2="137" y2="290" stroke="#059669" strokeWidth="2.5" />
                        <line x1="125" y1="302" x2="137" y2="302" stroke="#059669" strokeWidth="2.5" />
                        {/* Rok Permen */}
                        <path d="M97 210 L143 210 L160 262 L80 262 Z" fill="#EC4899" />
                        <path d="M97 210 L143 210 L144 216 L96 216 Z" fill="#BE185D" />
                        <line x1="106" y1="216" x2="96" y2="262" stroke="#F472B6" strokeWidth="2" />
                        <line x1="115" y1="216" x2="111" y2="262" stroke="#BE185D" strokeWidth="2" />
                        <line x1="125" y1="216" x2="129" y2="262" stroke="#BE185D" strokeWidth="2" />
                        <line x1="134" y1="216" x2="144" y2="262" stroke="#F472B6" strokeWidth="2" />
                        <path d="M80 260 Q120 265 160 260" stroke="#FBCFE8" strokeWidth="2.5" strokeLinecap="round" />
                      </g>
                    )}

                    {selectedBottom === '2' && (
                      <g>
                        {/* Celana Cokelat */}
                        <path
                          d="M96 210 L144 210 L142 308 L124 308 L120 242 L116 308 L98 308 Z"
                          fill="#78350F"
                        />
                        <rect x="96" y="210" width="48" height="7" rx="2" fill="#451A03" />
                        <rect x="116" y="211" width="8" height="5" rx="1" fill="#FBBF24" />
                        {/* Knee & cuff details */}
                        <rect x="99" y="262" width="15" height="9" rx="3" fill="#92400E" opacity="0.65" />
                        <rect x="126" y="262" width="15" height="9" rx="3" fill="#92400E" opacity="0.65" />
                        <line x1="98" y1="303" x2="116" y2="303" stroke="#451A03" strokeWidth="2.5" />
                        <line x1="124" y1="303" x2="142" y2="303" stroke="#451A03" strokeWidth="2.5" />
                      </g>
                    )}

                    {selectedBottom === '3' && (
                      <g>
                        {/* Striped Candy Stockings for Skirt */}
                        <rect x="103" y="256" width="12" height="52" fill="#FDE68A" />
                        <line x1="103" y1="266" x2="115" y2="266" stroke="#EC4899" strokeWidth="2.5" />
                        <line x1="103" y1="278" x2="115" y2="278" stroke="#EC4899" strokeWidth="2.5" />
                        <line x1="103" y1="290" x2="115" y2="290" stroke="#EC4899" strokeWidth="2.5" />
                        <line x1="103" y1="302" x2="115" y2="302" stroke="#EC4899" strokeWidth="2.5" />
                        <rect x="125" y="256" width="12" height="52" fill="#FDE68A" />
                        <line x1="125" y1="266" x2="137" y2="266" stroke="#EC4899" strokeWidth="2.5" />
                        <line x1="125" y1="278" x2="137" y2="278" stroke="#EC4899" strokeWidth="2.5" />
                        <line x1="125" y1="290" x2="137" y2="290" stroke="#EC4899" strokeWidth="2.5" />
                        <line x1="125" y1="302" x2="137" y2="302" stroke="#EC4899" strokeWidth="2.5" />
                        {/* Rok Mint */}
                        <path d="M97 210 L143 210 L160 262 L80 262 Z" fill="#2DD4BF" />
                        <path d="M97 210 L143 210 L144 216 L96 216 Z" fill="#0F766E" />
                        <line x1="106" y1="216" x2="96" y2="262" stroke="#99F6E4" strokeWidth="2" />
                        <line x1="115" y1="216" x2="111" y2="262" stroke="#0F766E" strokeWidth="2" />
                        <line x1="125" y1="216" x2="129" y2="262" stroke="#0F766E" strokeWidth="2" />
                        <line x1="134" y1="216" x2="144" y2="262" stroke="#99F6E4" strokeWidth="2" />
                        <path d="M80 260 Q120 265 160 260" stroke="#CCFBF1" strokeWidth="2.5" strokeLinecap="round" />
                      </g>
                    )}

                    {/* 4. SEPATU (SHOES) */}
                    {selectedShoes === '1' && (
                      <g>
                        {/* Sneakers Putih */}
                        <path d="M101 304 L117 304 L118 326 C118 331 98 332 88 329 L88 321 L101 310 Z" fill="#FFFFFF" />
                        <path d="M88 326 L118 326" stroke="#94A3B8" strokeWidth="2.5" />
                        <path d="M99 313 L107 313" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="105" cy="320" r="2" fill="#3B82F6" />

                        <path d="M123 304 L139 304 L139 310 L152 321 L152 329 C142 332 122 331 122 326 Z" fill="#FFFFFF" />
                        <path d="M122 326 L152 326" stroke="#94A3B8" strokeWidth="2.5" />
                        <path d="M133 313 L141 313" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="135" cy="320" r="2" fill="#3B82F6" />
                      </g>
                    )}
                    {selectedShoes === '2' && (
                      <g>
                        {/* Sepatu Bot Merah */}
                        <path d="M100 296 L118 296 L118 328 C118 333 96 333 86 329 L86 318 L100 305 Z" fill="#DC2626" />
                        <path d="M86 326 L118 326" stroke="#7F1D1D" strokeWidth="3" />
                        <rect x="100" y="296" width="18" height="5" rx="2" fill="#FCA5A5" />
                        <circle cx="105" cy="316" r="2" fill="#FDE68A" />

                        <path d="M122 296 L140 296 L140 305 L154 318 L154 329 C144 333 122 333 122 328 Z" fill="#DC2626" />
                        <path d="M122 326 L154 326" stroke="#7F1D1D" strokeWidth="3" />
                        <rect x="122" y="296" width="18" height="5" rx="2" fill="#FCA5A5" />
                        <circle cx="135" cy="316" r="2" fill="#FDE68A" />
                      </g>
                    )}

                    {/* 5. ATASAN (TOPS) */}
                    {selectedTop === 'A' && (
                      <g>
                        {/* Kemeja Pastel */}
                        <path
                          d="M92 138 C104 135 136 135 148 138 L174 182 L160 190 L144 162 L145 215 L95 215 L96 162 L80 190 L66 182 Z"
                          fill="#F472B6"
                        />
                        {/* White Peter-Pan Collar */}
                        <path d="M104 136 L120 153 L136 136 L126 142 L120 148 L114 142 Z" fill="#FDF2F8" />
                        {/* Placket & Pearl Buttons */}
                        <line x1="120" y1="152" x2="120" y2="215" stroke="#DB2777" strokeWidth="1.5" />
                        <circle cx="120" cy="164" r="2.2" fill="#FFFFFF" />
                        <circle cx="120" cy="180" r="2.2" fill="#FFFFFF" />
                        <circle cx="120" cy="196" r="2.2" fill="#FFFFFF" />
                        {/* Sleeve Cuffs */}
                        <path d="M67 180 L80 188" stroke="#FDF2F8" strokeWidth="4" strokeLinecap="round" />
                        <path d="M173 180 L160 188" stroke="#FDF2F8" strokeWidth="4" strokeLinecap="round" />
                      </g>
                    )}

                    {selectedTop === 'B' && (
                      <g>
                        {/* Kaos Oversize */}
                        <path
                          d="M88 138 C102 135 138 135 152 138 L172 178 L155 186 L146 164 L147 217 L93 217 L94 164 L85 186 L68 178 Z"
                          fill="#34D399"
                        />
                        <ellipse cx="120" cy="138" rx="14" ry="5" fill="#059669" />
                        <rect x="102" y="168" width="36" height="9" rx="3" fill="#FFFFFF" opacity="0.9" />
                        <rect x="108" y="182" width="24" height="4" rx="2" fill="#FDE047" />
                      </g>
                    )}

                    {selectedTop === 'C' && (
                      <g>
                        {/* Hoodie Mint Khas Vanellope */}
                        <path
                          d="M90 138 C102 135 138 135 150 138 L176 184 L161 190 L144 164 L147 217 L93 217 L96 164 L79 190 L64 184 Z"
                          fill="url(#fitHoodieMint)"
                        />
                        {/* Hood Collar */}
                        <path d="M98 135 C106 151 134 151 142 135 C134 155 106 155 98 135 Z" fill="#047857" />
                        {/* Pink Licorice Drawstrings */}
                        <path d="M112 144 L110 176" stroke="#F43F5E" strokeWidth="2.6" strokeLinecap="round" />
                        <circle cx="110" cy="177" r="2.4" fill="#E11D48" />
                        <path d="M128 144 L130 178" stroke="#F43F5E" strokeWidth="2.6" strokeLinecap="round" />
                        <circle cx="130" cy="179" r="2.4" fill="#E11D48" />
                        {/* Kangaroo Pocket */}
                        <path d="M101 186 L139 186 L134 211 L106 211 Z" fill="#059669" opacity="0.9" />
                        <path d="M104 187 L108 209" stroke="#34D399" strokeWidth="1.2" strokeDasharray="2 2" />
                        <path d="M136 187 L132 209" stroke="#34D399" strokeWidth="1.2" strokeDasharray="2 2" />
                        {/* Cuffs */}
                        <path d="M65 182 L79 189" stroke="#047857" strokeWidth="4.5" strokeLinecap="round" />
                        <path d="M175 182 L161 189" stroke="#047857" strokeWidth="4.5" strokeLinecap="round" />
                      </g>
                    )}

                    {selectedTop === 'D' && (
                      <g>
                        {/* Jaket Denim */}
                        <path
                          d="M90 138 C102 135 138 135 150 138 L175 184 L161 190 L144 164 L147 216 L93 216 L96 164 L79 190 L65 184 Z"
                          fill="#2563EB"
                        />
                        {/* Inner White Tee */}
                        <path d="M109 136 L131 136 L126 216 L114 216 Z" fill="#F8FAFC" />
                        {/* Denim Lapels */}
                        <path d="M102 137 L115 164 L114 216 L108 216 L102 156 Z" fill="#1D4ED8" />
                        <path d="M138 137 L125 164 L126 216 L132 216 L138 156 Z" fill="#1E40AF" />
                        {/* Chest Pockets & Buttons */}
                        <rect x="97" y="164" width="12" height="10" rx="1.5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="0.8" />
                        <rect x="131" y="164" width="12" height="10" rx="1.5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="0.8" />
                        <circle cx="112" cy="176" r="1.8" fill="#E2E8F0" />
                        <circle cx="112" cy="194" r="1.8" fill="#E2E8F0" />
                      </g>
                    )}

                    {/* 6. VANELLOPE EARS, FACE, EYES, SMILE & BANGS */}
                    {/* Ears + Candy Earrings */}
                    <ellipse cx="75" cy="94" rx="6.5" ry="9" fill="#FBDBC6" />
                    <ellipse cx="76" cy="94" rx="3.5" ry="5" fill="#F4BAA1" />
                    <ellipse cx="165" cy="94" rx="6.5" ry="9" fill="#FBDBC6" />
                    <ellipse cx="164" cy="94" rx="3.5" ry="5" fill="#F4BAA1" />
                    <circle cx="74" cy="100" r="2.2" fill="#34D399" />
                    <circle cx="166" cy="100" r="2.2" fill="#EC4899" />

                    {/* Face Base */}
                    <path
                      d="M79 86 C77 65 93 54 120 54 C147 54 163 65 161 86 C161 112 144 127 120 127 C96 127 79 112 79 86 Z"
                      fill="url(#fitSkin)"
                    />

                    {/* Rosy Cheeks & Freckles */}
                    <ellipse cx="91" cy="100" rx="9" ry="5" fill="#FDA4AF" opacity="0.65" />
                    <ellipse cx="149" cy="100" rx="9" ry="5" fill="#FDA4AF" opacity="0.65" />
                    <circle cx="88" cy="99" r="1" fill="#FB7185" />
                    <circle cx="93" cy="101" r="1" fill="#FB7185" />
                    <circle cx="147" cy="101" r="1" fill="#FB7185" />
                    <circle cx="152" cy="99" r="1" fill="#FB7185" />

                    {/* Front Bangs */}
                    <g>
                      <path
                        d="M77 74 C83 59 100 57 112 67 C121 56 141 56 151 65 C158 58 161 68 161 75 C159 61 150 47 120 47 C90 47 81 61 77 74 Z"
                        fill="url(#fitHair)"
                      />
                      <path d="M98 62 C110 60 127 61 139 71 C132 79 120 81 113 74 C108 79 99 77 98 62 Z" fill="#1B171C" />
                      <path d="M79 71 C76 86 79 100 84 105 C81 95 81 83 84 74 Z" fill="#1F1A20" />
                      <path d="M161 71 C164 86 161 100 156 105 C159 95 159 83 156 74 Z" fill="#1F1A20" />
                      <path d="M93 59 C105 54 134 54 148 59" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round" opacity="0.35" />
                    </g>

                    {/* Candy Hair Ornaments */}
                    <g>
                      <g transform="translate(86, 40)">
                        <circle cx="5.5" cy="5.5" r="5.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
                        <path d="M5.5 0 C7.5 2.5 7.5 8.5 5.5 11" stroke="#EF4444" strokeWidth="1.7" />
                        <path d="M0 5.5 C2.5 7.5 8.5 7.5 11 5.5" stroke="#EF4444" strokeWidth="1.7" />
                        <circle cx="5.5" cy="5.5" r="1.8" fill="#F87171" />
                      </g>
                      <polygon
                        points="142,37 144,41 148,41 145,44 146,48 142,46 138,48 139,44 136,41 140,41"
                        fill="#FBBF24"
                        stroke="#F59E0B"
                        strokeWidth="0.6"
                      />
                      <rect x="100" y="36" width="6" height="2.8" rx="1.4" transform="rotate(20 100 36)" fill="#38BDF8" />
                      <rect x="115" y="33" width="6.5" height="2.8" rx="1.4" transform="rotate(-14 115 33)" fill="#F43F5E" />
                      <rect x="129" y="36" width="5.5" height="2.8" rx="1.4" transform="rotate(42 129 36)" fill="#34D399" />
                      <circle cx="108" cy="47" r="2.2" fill="#A855F7" />
                      <circle cx="125" cy="45" r="2" fill="#FB923C" />
                      <rect x="172" y="65" width="5" height="2.6" rx="1.3" transform="rotate(-28 172 65)" fill="#F472B6" />
                      <circle cx="185" cy="59" r="2.3" fill="#FBBF24" />
                    </g>

                    {/* Eyebrows */}
                    <path d="M91 74 Q100 69 108 73" stroke="#3D2B1F" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M132 73 Q140 69 149 74" stroke="#3D2B1F" strokeWidth="2.2" strokeLinecap="round" />

                    {/* Expressive Chibi Eyes */}
                    <g>
                      <ellipse cx="100" cy="89" rx="9.5" ry="11.5" fill="#FFFFFF" />
                      <ellipse cx="101" cy="89" rx="7.8" ry="10.2" fill="url(#fitIris)" />
                      <ellipse cx="101" cy="89" rx="4.8" ry="6.4" fill="#0C0502" />
                      <path d="M95 93 C97 97 104 97 106 93" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
                      <circle cx="97.5" cy="85" r="3" fill="#FFFFFF" />
                      <circle cx="104" cy="92.5" r="1.5" fill="#FFFFFF" />
                      <path d="M89 86 C93 78 106 78 110 86" stroke="#1B171C" strokeWidth="2.8" strokeLinecap="round" />
                      <path d="M108 82 L112 79" stroke="#1B171C" strokeWidth="1.8" strokeLinecap="round" />

                      <ellipse cx="140" cy="89" rx="9.5" ry="11.5" fill="#FFFFFF" />
                      <ellipse cx="139" cy="89" rx="7.8" ry="10.2" fill="url(#fitIris)" />
                      <ellipse cx="139" cy="89" rx="4.8" ry="6.4" fill="#0C0502" />
                      <path d="M134 93 C136 97 143 97 145 93" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
                      <circle cx="136" cy="85" r="3" fill="#FFFFFF" />
                      <circle cx="142.5" cy="92.5" r="1.5" fill="#FFFFFF" />
                      <path d="M130 86 C134 78 147 78 151 86" stroke="#1B171C" strokeWidth="2.8" strokeLinecap="round" />
                      <path d="M149 82 L153 79" stroke="#1B171C" strokeWidth="1.8" strokeLinecap="round" />
                    </g>

                    {/* Cute Nose & Cheerful Open Smile */}
                    <path d="M118 96 Q120 98 122 96" stroke="#D97706" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M112 105 Q120 117 128 105 Z" fill="#BE123C" stroke="#881337" strokeWidth="1.5" />
                    <path d="M114 106 Q120 108.5 126 106" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
                    <ellipse cx="120" cy="111" rx="4.2" ry="2.5" fill="#FB7185" />
                  </svg>
                </div>

                <div className="z-10 bg-slate-800/90 border border-slate-600 rounded-xl px-3.5 py-2 text-center text-xs font-mono w-full">
                  <span className="text-teal-300 font-bold">Set Aktif:</span> Top {selectedTop} + Bottom {selectedBottom} + Shoes {selectedShoes}
                </div>
              </div>

              {/* Right Column: All Outfit Selection Options (Atasan, Bawahan, Sepatu) */}
              <div className="space-y-5">
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
