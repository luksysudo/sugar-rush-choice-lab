/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Layar Awal (Welcome Screen) - Sugar Rush: Choice Lab
 */

import React, { useState } from 'react';
import { BookOpen, Layers, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { StudentProfile } from '../types';
import { VanellopeGuide } from './VanellopeGuide';

interface WelcomeScreenProps {
  initialProfile: StudentProfile;
  onStart: (profile: StudentProfile) => void;
  onOpenGuide: () => void;
  onOpenPrerequisites: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  initialProfile,
  onStart,
  onOpenGuide,
  onOpenPrerequisites,
}) => {
  const [name, setName] = useState(initialProfile.name || '');
  const [studentClass, setStudentClass] = useState(initialProfile.studentClass || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartAdventure = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Harap masukkan Nama Lengkap Siswa terlebih dahulu.');
      return;
    }
    if (!studentClass.trim()) {
      setErrorMessage('Harap masukkan Kelas Siswa (contoh: XII MIPA 1).');
      return;
    }
    setErrorMessage('');
    onStart({
      name: name.trim(),
      studentClass: studentClass.trim(),
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] bg-candy-pattern flex flex-col justify-between p-4 sm:p-8 pt-16 sm:pt-16">
      {/* Decorative floating candy header items */}
      <div className="max-w-5xl mx-auto w-full pt-4 pb-2 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          Modul Interaktif Matematika
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-candy">
          SUGAR RUSH: CHOICE LAB
        </h1>
        <p className="text-sm sm:text-base font-semibold text-pink-600 mt-1">
          Kaidah Pencacahan • 12th Grade SMA Mathematics
        </p>
      </div>

      {/* Main Content Card matching the reference image */}
      <div className="max-w-4xl mx-auto w-full my-auto py-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-pink-100/80 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Form & Actions */}
          <div className="md:col-span-7 space-y-5">
            <form onSubmit={handleStartAdventure} className="space-y-4">
              <div>
                <label
                  htmlFor="student-name"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Nama Lengkap Siswa
                </label>
                <input
                  id="student-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ketik nama lengkap di sini..."
                  className="w-full px-4 py-3 bg-[#FAF8F5] border-2 border-slate-200 rounded-2xl text-slate-800 font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label
                  htmlFor="student-class"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Kelas
                </label>
                <input
                  id="student-class"
                  type="text"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  placeholder="Ketik kelas di sini..."
                  className="w-full px-4 py-3 bg-[#FAF8F5] border-2 border-slate-200 rounded-2xl text-slate-800 font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 text-xs font-medium text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Action Buttons: Buku Panduan & Buku Materi */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={onOpenGuide}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#422006] hover:bg-[#582D0A] text-[#FEF3C7] rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>BUKU PANDUAN</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenPrerequisites}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#422006] hover:bg-[#582D0A] text-[#FEF3C7] rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <Layers className="w-4 h-4 text-pink-400" />
                  <span>BUKU MATERI</span>
                </button>
              </div>

              {/* Big CTA Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-98 tracking-wide font-candy"
              >
                <span>MULAI PETUALANGAN</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>
          </div>

          {/* Right Column: Vanellope Character & Speech Bubble matching reference */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-xs">
              {/* Dialogue Bubble */}
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-4 shadow-md text-xs sm:text-sm font-semibold text-slate-800 relative mb-4">
                <div className="text-emerald-600 font-extrabold text-[11px] mb-1">
                  VANELLOPE VON SCHWEETZ:
                </div>
                Halo! Selamat datang di <strong>Sugar Rush Choice Lab</strong>. Ayo bantu aku menyiapkan Grand Prix dengan aturan pencacahan!
                {/* Bubble tail pointing down */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-slate-200 rotate-45" />
              </div>

              {/* Character Illustration */}
              <div className="flex justify-center">
                <VanellopeGuide
                  dialogue=""
                  showAvatarOnly={true}
                  size="lg"
                  mood="happy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="text-center text-xs text-slate-400 py-3">
        Kaidah Pencacahan SMA Kelas 12 • Sugar Rush Mathematics Laboratory
      </footer>
    </div>
  );
};
