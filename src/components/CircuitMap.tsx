/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Peta Sirkuit (Menu Utama) - Sugar Rush: Choice Lab
 */

import React from 'react';
import {
  Star,
  Coins,
  Lock,
  CheckCircle2,
  Play,
  Trophy,
  BookOpen,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { StudentProfile, ScreenMode } from '../types';
import { VanellopeGuide } from './VanellopeGuide';

interface CircuitMapProps {
  profile: StudentProfile;
  completedMissions: number[]; // e.g. [1, 2]
  stars: number;
  points: number;
  onSelectMission: (missionId: number) => void;
  onOpenQuizLeaderboard: () => void;
  onOpenGuide: () => void;
  onBackToWelcome: () => void;
}

export const CircuitMap: React.FC<CircuitMapProps> = ({
  profile,
  completedMissions,
  stars,
  points,
  onSelectMission,
  onOpenQuizLeaderboard,
  onOpenGuide,
  onBackToWelcome,
}) => {
  const missions = [
    {
      id: 1,
      posNum: 1,
      title: 'KEDAI CAMILAN SIRKUIT',
      topic: 'Aturan Penjumlahan',
      desc: 'Pilih 1 camilan favorit dari etalase kue, es krim, atau puding!',
      iconBg: 'bg-pink-100 text-pink-600',
      badgeColor: 'bg-emerald-500',
      tag: 'Pos 1',
      items: ['🧁 Cupcake', '🍩 Donat', '🍮 Puding', '🍦 Es Krim'],
    },
    {
      id: 2,
      posNum: 2,
      title: 'GARASI KOSTUM PEMBALAP',
      topic: 'Aturan Perkalian',
      desc: 'Pasang outfit manekin balap dari kombinasi Atasan, Bawahan & Sepatu!',
      iconBg: 'bg-sky-100 text-sky-600',
      badgeColor: 'bg-sky-500',
      tag: 'Pos 2',
      items: ['👕 4 Atasan', '👗 3 Bawahan', '👟 2 Sepatu'],
    },
    {
      id: 3,
      posNum: 3,
      title: 'PETA JALUR SIRKUIT',
      topic: 'Diagram Pohon',
      desc: 'Telusuri percabangan jalan pintas dari Garis Start ke Finis!',
      iconBg: 'bg-amber-100 text-amber-600',
      badgeColor: 'bg-amber-500',
      tag: 'Pos 3',
      items: ['🌳 2 Jalur Utama', '🌿 3 Terowongan', '🏁 Finis'],
    },
    {
      id: 4,
      posNum: 4,
      title: 'PUSAT KATERING FOODGO',
      topic: 'Kombinasi dengan Batasan',
      desc: 'Hitung paket makanan & minuman dengan perubahan stok dan syarat khusus!',
      iconBg: 'bg-purple-100 text-purple-600',
      badgeColor: 'bg-purple-500',
      tag: 'Pos 4',
      items: ['🍱 Paket Sehat', '🍔 Paket Hemat', '🌟 Paket Spesial'],
    },
  ];

  // Logic: Pos 1 is always unlocked. Pos 2 is unlocked if Pos 1 completed, etc.
  const isMissionUnlocked = (id: number) => {
    if (id === 1) return true;
    return completedMissions.includes(id - 1);
  };

  const allCompleted = missions.every((m) => completedMissions.includes(m.id));

  // Determine Vanellope's message
  const getGuideMessage = () => {
    if (allCompleted) {
      return 'Luar biasa! Semua 4 Pos Misi telah kamu kuasai dengan sempurna! Sekarang saatnya menguji kemampuanmu di Kuis Evaluasi & perebutkan Peringkat Kelas!';
    }
    if (completedMissions.includes(3)) {
      return 'Hebat! Lanjutkan ke Pos 4: Pusat Katering FoodGo untuk belajar kombinasi dengan batasan stok!';
    }
    if (completedMissions.includes(2)) {
      return 'Keren! Garasi kostum selesai. Sekarang buka Pos 3 untuk menganalisis jalur sirkuit dengan Diagram Pohon!';
    }
    if (completedMissions.includes(1)) {
      return 'Mantap! Pos 1 selesai. Sekarang kamu sudah kembali ke Peta Sirkuit. Silakan klik Pos 2: Garasi Kostum Pembalap!';
    }
    return 'Halo Pembalap! Selamat datang di Peta Sirkuit. Klik Pos 1: Kedai Camilan Sirkuit untuk memulai petualangan!';
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] bg-candy-pattern flex flex-col p-3 sm:p-6 pb-12">
      {/* Top Header Card matching the reference image layout */}
      <div className="max-w-6xl mx-auto w-full mb-6">
        <header className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:px-6 sm:py-3.5 shadow-md border border-pink-100/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWelcome}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
              title="Kembali ke Layar Awal"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-xs sm:text-sm font-bold text-slate-800">
              <span className="text-slate-500 font-medium">Pembalap:</span>{' '}
              <span className="text-emerald-700 uppercase">{profile.name}</span>
              <span className="text-slate-300 mx-2">|</span>
              <span className="text-slate-500 font-medium">Kelas:</span>{' '}
              <span className="text-pink-600 font-bold">{profile.studentClass}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Star Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-xs sm:text-sm font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{stars} / 4</span>
            </div>

            {/* Coin/Point Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm font-bold">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>{points} PTS</span>
            </div>

            {/* Guide Quick Button */}
            <button
              onClick={onOpenGuide}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
              title="Buka Buku Panduan"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </header>
      </div>

      {/* Main Track & Missions Canvas */}
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between space-y-6">
        {/* Race Track Banner with Candy Elements */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-200/80 shadow-inner bg-gradient-to-r from-amber-100 via-pink-100 to-emerald-100 p-4 sm:p-5">
          {/* Track Asphalt & Candy Decors */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[11px] uppercase tracking-wider">
                GRAND PRIX SIRKUIT
              </span>
              <span className="text-xs font-semibold text-slate-600">
                Alur Kaidah Pencacahan Kelas 12
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
              <span>START ➔ FINISH</span>
            </div>
          </div>

          {/* Visual Track Lane with sweets */}
          <div className="h-10 w-full rounded-2xl bg-slate-800 flex items-center justify-between px-4 sm:px-8 border-y-2 border-white/40 shadow-sm relative overflow-hidden">
            {/* Checkered starting line */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-white/90 font-bold">START 🏁</span>
            </div>
            <div className="text-xl">🧁</div>
            <div className="text-xl">🍬</div>
            <div className="text-xl">🍩</div>
            <div className="text-xl">🍓</div>
            <div className="text-xl">🍭</div>
            <div className="text-xl">🏁 FINISH</div>
          </div>
        </div>

        {/* 4 Mission Cards in exact sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {missions.map((mission) => {
            const unlocked = isMissionUnlocked(mission.id);
            const completed = completedMissions.includes(mission.id);

            return (
              <div
                key={mission.id}
                className={`relative bg-white rounded-3xl p-5 border-2 transition-all flex flex-col justify-between shadow-md ${
                  completed
                    ? 'border-emerald-300 shadow-emerald-50'
                    : unlocked
                    ? 'border-emerald-500/80 shadow-lg hover:-translate-y-1'
                    : 'border-slate-200 opacity-60 bg-slate-50/80'
                }`}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-white text-[11px] font-extrabold uppercase">
                    {mission.tag}
                  </span>
                  {completed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Selesai
                    </span>
                  ) : unlocked ? (
                    <span className="text-[11px] font-bold text-white bg-emerald-500 px-2 py-0.5 rounded-full shadow-xs">
                      Open
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" />
                      Terkunci
                    </span>
                  )}
                </div>

                {/* Mission Visual Card Box */}
                <div className="h-28 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-emerald-50/50 border border-slate-100 flex flex-col items-center justify-center p-3 text-center mb-3">
                  {mission.id === 1 && (
                    <div className="space-y-1">
                      <div className="text-3xl">🧁 🍩 🍮</div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        Kedai Aneka Manisan
                      </div>
                    </div>
                  )}
                  {mission.id === 2 && (
                    <div className="space-y-1">
                      <div className="text-3xl">👗 🧥 👟</div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        Mannequin Fitting Studio
                      </div>
                    </div>
                  )}
                  {mission.id === 3 && (
                    <div className="space-y-1">
                      <div className="text-3xl">🌿 ➔ 🏁</div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        Diagram Cabang Jalur
                      </div>
                    </div>
                  )}
                  {mission.id === 4 && (
                    <div className="space-y-1">
                      <div className="text-3xl">🍱 📦 🍔</div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        FoodGo Catering Hub
                      </div>
                    </div>
                  )}
                </div>

                {/* Titles */}
                <div className="mb-4">
                  <h3 className="font-extrabold text-slate-900 text-sm font-candy leading-tight">
                    {mission.title}
                  </h3>
                  <p className="text-xs font-bold text-emerald-600 mt-0.5">
                    {mission.topic}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                    {mission.desc}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => unlocked && onSelectMission(mission.id)}
                  disabled={!unlocked}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                    completed
                      ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                      : unlocked
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white active:scale-95 shadow-emerald-500/20'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {completed ? (
                    <>
                      <span>ULANGI MISI</span>
                      <Play className="w-3.5 h-3.5" />
                    </>
                  ) : unlocked ? (
                    <>
                      <span>PILIH MISI</span>
                      <Play className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>TERKUNCI</span>
                      <Lock className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Section: Vanellope Dialogue & Kuis Evaluasi Launcher */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-pink-100">
          <div className="md:col-span-8">
            <VanellopeGuide
              mood={allCompleted ? 'celebrating' : 'happy'}
              dialogue={getGuideMessage()}
            />
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center sm:items-end">
            <button
              onClick={onOpenQuizLeaderboard}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-candy font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg transition-all active:scale-95 ${
                allCompleted
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white animate-pulse shadow-pink-500/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <Trophy className="w-5 h-5 text-amber-300" />
              <span>KUIS EVALUASI & LEADERBOARD</span>
            </button>
            <p className="text-[11px] text-slate-500 mt-1.5 text-center sm:text-right">
              {allCompleted
                ? 'Semua pos tuntas! Uji pemahamanmu sekarang!'
                : 'Tersedia 10 Soal Evaluasi & Papan Peringkat Kelas'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
