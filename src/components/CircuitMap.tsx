/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Peta Sirkuit (Menu Utama) - Sugar Rush: Choice Lab
 * Dilengkapi penguncian akses Misi 1-4 & Kuis sebelum membaca Buku Materi
 * serta ilustrasi vektor SVG kustom bertema Sugar Rush pada setiap kartu Pos.
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
  Layers,
} from 'lucide-react';
import { StudentProfile } from '../types';
import { VanellopeGuide } from './VanellopeGuide';
import {
  Mission1Illustration,
  Mission2Illustration,
  Mission3Illustration,
  Mission4Illustration,
} from './MissionIllustrations';

interface CircuitMapProps {
  profile: StudentProfile;
  completedMissions: number[]; // e.g. [1, 2]
  stars: number;
  points: number;
  hasReadMaterial: boolean;
  onSelectMission: (missionId: number) => void;
  onOpenQuizLeaderboard: () => void;
  onOpenGuide: () => void;
  onOpenPrerequisites: () => void;
  onBackToWelcome: () => void;
}

export const CircuitMap: React.FC<CircuitMapProps> = ({
  profile,
  completedMissions,
  stars,
  points,
  hasReadMaterial,
  onSelectMission,
  onOpenQuizLeaderboard,
  onOpenGuide,
  onOpenPrerequisites,
  onBackToWelcome,
}) => {
  const missions = [
    {
      id: 1,
      posNum: 1,
      title: 'KEDAI CAMILAN SIRKUIT',
      topic: 'Aturan Penjumlahan',
      desc: 'Pilih 1 camilan favorit dari etalase kue, es krim, atau puding!',
      tag: 'Pos 1',
      subtitle: 'Kedai Aneka Manisan',
    },
    {
      id: 2,
      posNum: 2,
      title: 'GARASI KOSTUM PEMBALAP',
      topic: 'Aturan Perkalian',
      desc: 'Pasang outfit manekin balap dari kombinasi Atasan, Bawahan & Sepatu!',
      tag: 'Pos 2',
      subtitle: 'Mannequin Fitting Studio',
    },
    {
      id: 3,
      posNum: 3,
      title: 'PETA JALUR SIRKUIT',
      topic: 'Diagram Pohon',
      desc: 'Telusuri jalur balap & petakan kombinasi rakitan mobil dengan diagram pohon!',
      tag: 'Pos 3',
      subtitle: 'Diagram Cabang Jalur',
    },
    {
      id: 4,
      posNum: 4,
      title: 'PUSAT KATERING FOODGO',
      topic: 'Kombinasi dengan Batasan',
      desc: 'Hitung paket makanan & minuman dengan perubahan stok dan syarat khusus!',
      tag: 'Pos 4',
      subtitle: 'FoodGo Catering Hub',
    },
  ];

  // Logic: All missions locked if student hasn't read & confirmed Buku Materi yet.
  // Once hasReadMaterial is true: Pos 1 unlocked; Pos 2 unlocked if Pos 1 completed, etc.
  const isMissionUnlocked = (id: number) => {
    if (!hasReadMaterial) return false;
    if (id === 1) return true;
    return completedMissions.includes(id - 1);
  };

  const allCompleted = missions.every((m) => completedMissions.includes(m.id));

  // Determine Vanellope's message
  const getGuideMessage = () => {
    if (!hasReadMaterial) {
      return 'Hai Pembalap! Sebelum balapan dimulai, kamu wajib membuka & membaca seluruh bagian Buku Materi terlebih dahulu untuk membuka kunci semua Misi dan Kuis Akhir!';
    }
    if (allCompleted) {
      return 'Luar biasa! Semua 4 Pos Misi telah kamu kuasai dengan sempurna! Sekarang saatnya menguji kemampuanmu di Kuis Evaluasi & perebutkan Peringkat Kelas!';
    }
    if (completedMissions.includes(3)) {
      return 'Hebat! Lanjutkan ke Pos 4: Pusat Katering FoodGo untuk belajar kombinasi dengan batasan stok!';
    }
    if (completedMissions.includes(2)) {
      return 'Keren! Garasi kostum selesai. Sekarang buka Pos 3 untuk menganalisis & memetakan jalur sirkuit dengan Diagram Pohon!';
    }
    if (completedMissions.includes(1)) {
      return 'Mantap! Pos 1 selesai. Sekarang kamu sudah kembali ke Peta Sirkuit. Silakan klik Pos 2: Garasi Kostum Pembalap!';
    }
    return 'Akses misi sudah terbuka! Selamat datang di Peta Sirkuit. Klik Pos 1: Kedai Camilan Sirkuit untuk memulai petualangan!';
  };

  const renderMissionIllustration = (id: number) => {
    switch (id) {
      case 1:
        return <Mission1Illustration />;
      case 2:
        return <Mission2Illustration />;
      case 3:
        return <Mission3Illustration />;
      case 4:
        return <Mission4Illustration />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] bg-candy-pattern flex flex-col p-3 sm:p-6 pt-16 sm:pt-16 pb-12">
      {/* Top Header Card */}
      <div className="max-w-6xl mx-auto w-full mb-5">
        <header className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:px-6 sm:py-3.5 shadow-md border border-pink-100/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToWelcome}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
              title="Kembali ke Layar Awal"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-xs sm:text-sm font-bold text-slate-800">
              <span className="text-slate-500 font-medium">Pembalap:</span>{' '}
              <span className="text-emerald-700 uppercase">{profile.name || 'Pembalap Muda'}</span>
              <span className="text-slate-300 mx-2">|</span>
              <span className="text-slate-500 font-medium">Kelas:</span>{' '}
              <span className="text-pink-600 font-bold">{profile.studentClass || 'Umum'}</span>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
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

            {/* Buku Materi Quick Button */}
            <button
              type="button"
              onClick={onOpenPrerequisites}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                !hasReadMaterial
                  ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-sm animate-pulse'
                  : 'bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200'
              }`}
              title="Buka Buku Materi"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Buku Materi</span>
            </button>

            {/* Guide Quick Button */}
            <button
              type="button"
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
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between space-y-5">
        {/* Mandatory Material Lock Banner (Shown when !hasReadMaterial) */}
        {!hasReadMaterial && (
          <div className="bg-gradient-to-r from-amber-50 via-pink-50 to-amber-50 border-2 border-pink-300 rounded-3xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-sm shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-candy">
                  Baca Buku Materi terlebih dahulu untuk membuka misi!
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Jelajahi seluruh 4 tab di Buku Materi dan tekan tombol konfirmasi <strong>"Saya Sudah Membaca & Paham Materi"</strong> agar Misi 1–4 & Kuis terbuka otomatis.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenPrerequisites}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-candy font-extrabold text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
            >
              <Layers className="w-4 h-4" />
              <span>Buka Buku Materi Sekarang</span>
            </button>
          </div>
        )}

        {/* Race Track Banner */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-200/80 shadow-inner bg-gradient-to-r from-amber-100 via-pink-100 to-emerald-100 p-4 sm:p-5">
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

          <div className="h-10 w-full rounded-2xl bg-slate-800 flex items-center justify-between px-4 sm:px-8 border-y-2 border-white/40 shadow-sm relative overflow-hidden">
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

        {/* 4 Mission Cards with Custom SVG Illustrations */}
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
                    : 'border-slate-200 opacity-75 bg-slate-50/90'
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
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" />
                      Terkunci
                    </span>
                  )}
                </div>

                {/* Custom Sugar Rush SVG Illustration Box */}
                <div className="rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-emerald-50/40 border border-slate-100 flex flex-col items-center justify-center p-2.5 text-center mb-3">
                  {renderMissionIllustration(mission.id)}
                  <div className="text-[11px] font-bold text-slate-500 mt-1">
                    {mission.subtitle}
                  </div>
                </div>

                {/* Titles */}
                <div className="mb-3">
                  <h3 className="font-extrabold text-slate-900 text-sm font-candy leading-tight">
                    {mission.title}
                  </h3>
                  <p className="text-xs font-bold text-emerald-600 mt-0.5">{mission.topic}</p>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">{mission.desc}</p>
                </div>

                {/* Lock Reason Message */}
                {!hasReadMaterial && (
                  <p className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-2.5 py-1.5 mb-2.5 text-center leading-snug">
                    Baca Buku Materi terlebih dahulu untuk membuka misi!
                  </p>
                )}

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => unlocked && onSelectMission(mission.id)}
                  disabled={!unlocked}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                    completed
                      ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                      : unlocked
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white active:scale-95 shadow-emerald-500/20'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
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
                      <Lock className="w-3.5 h-3.5" />
                      <span>TERKUNCI</span>
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
              mood={!hasReadMaterial ? 'thinking' : allCompleted ? 'celebrating' : 'happy'}
              dialogue={getGuideMessage()}
            />
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center sm:items-end">
            <button
              type="button"
              disabled={!hasReadMaterial}
              onClick={() => hasReadMaterial && onOpenQuizLeaderboard()}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-candy font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg transition-all ${
                !hasReadMaterial
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                  : allCompleted
                  ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white animate-pulse shadow-pink-500/30 active:scale-95'
                  : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95'
              }`}
            >
              {!hasReadMaterial ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>KUIS EVALUASI TERKUNCI</span>
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5 text-amber-300" />
                  <span>KUIS EVALUASI & LEADERBOARD</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-500 mt-1.5 text-center sm:text-right">
              {!hasReadMaterial ? (
                <span className="text-rose-600 font-semibold">
                  Baca Buku Materi terlebih dahulu untuk membuka misi!
                </span>
              ) : allCompleted ? (
                'Semua pos tuntas! Uji pemahamanmu sekarang!'
              ) : (
                'Tersedia 10 Soal Evaluasi & Papan Peringkat Kelas'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
