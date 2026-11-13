/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SUGAR RUSH: CHOICE LAB - Kaidah Pencacahan SMA Kelas 12
 */

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { StudentProfile, ScreenMode } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CircuitMap } from './components/CircuitMap';
import { Mission1SnackShop } from './components/Mission1SnackShop';
import { Mission2OutfitGarage } from './components/Mission2OutfitGarage';
import { Mission3CircuitTree } from './components/Mission3CircuitTree';
import { Mission4FoodGoCatering } from './components/Mission4FoodGoCatering';
import { QuizAndLeaderboard } from './components/QuizAndLeaderboard';
import { GuideModal } from './components/GuideModal';
import { PrerequisiteModal } from './components/PrerequisiteModal';
import { soundManager, playClickSound } from './utils/soundEffects';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('sugar_rush_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name !== 'AISYAH NUR') {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return { name: '', studentClass: '' };
  });

  const [screen, setScreen] = useState<ScreenMode>('welcome');
  const [completedMissions, setCompletedMissions] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('sugar_rush_completed_missions');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sugar_rush_stars');
      if (saved) return parseInt(saved, 10);
    } catch {
      // fallback
    }
    return 0;
  });

  const [points, setPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sugar_rush_points');
      if (saved) return parseInt(saved, 10);
    } catch {
      // fallback
    }
    return 0;
  });

  const [adventureStartTime, setAdventureStartTime] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('sugar_rush_start_time');
      if (saved) return parseInt(saved, 10);
    } catch {
      // fallback
    }
    return null;
  });

  const [hasReadMaterial, setHasReadMaterial] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sugar_rush_has_read_material') === 'true';
    } catch {
      return false;
    }
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => soundManager.isMuted());
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isPrerequisiteOpen, setIsPrerequisiteOpen] = useState(false);

  // Global button click sound via Web Audio API
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest('button:not(:disabled)');
      if (!btn) return;
      if (btn.getAttribute('data-sound-toggle') === 'true') return;
      playClickSound();
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // Check URL query parameters for ?autostart=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setScreen('circuit_map');
    }
  }, []);

  const handleToggleMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleConfirmReadMaterial = () => {
    setHasReadMaterial(true);
    try {
      localStorage.setItem('sugar_rush_has_read_material', 'true');
    } catch {
      // ignore
    }
  };

  // Save changes to localStorage and record adventure start time
  const handleUpdateProfile = (newProfile: StudentProfile) => {
    const now = Date.now();
    setAdventureStartTime(now);
    try {
      localStorage.setItem('sugar_rush_start_time', now.toString());
    } catch {
      // ignore
    }
    setProfile(newProfile);
    try {
      localStorage.setItem('sugar_rush_profile', JSON.stringify(newProfile));
    } catch {
      // ignore
    }
    setScreen('circuit_map');
  };

  const handleCompleteMission = (missionId: number) => {
    if (!completedMissions.includes(missionId)) {
      const updatedMissions = [...completedMissions, missionId];
      const newStars = Math.min(4, stars + 1);
      const newPoints = points + 50;

      setCompletedMissions(updatedMissions);
      setStars(newStars);
      setPoints(newPoints);

      try {
        localStorage.setItem(
          'sugar_rush_completed_missions',
          JSON.stringify(updatedMissions)
        );
        localStorage.setItem('sugar_rush_stars', newStars.toString());
        localStorage.setItem('sugar_rush_points', newPoints.toString());
      } catch {
        // ignore
      }
    }

    setScreen('circuit_map');
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans selection:bg-pink-200 selection:text-pink-900 relative">
      {/* Global Mute / Unmute Audio Toggle (Top-Right Corner) */}
      <button
        type="button"
        data-sound-toggle="true"
        onClick={handleToggleMute}
        aria-label={isMuted ? 'Aktifkan Suara' : 'Bisukan Suara'}
        title={isMuted ? 'Suara Bisu (Klik untuk Aktifkan)' : 'Suara Aktif (Klik untuk Bisukan)'}
        className={`fixed top-3 right-3 z-40 px-3 py-2 rounded-2xl border-2 shadow-md flex items-center gap-1.5 text-xs font-extrabold transition-all active:scale-95 ${
          isMuted
            ? 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'
            : 'bg-white/95 backdrop-blur-xs border-pink-200 text-pink-600 hover:border-pink-400 hover:bg-pink-50'
        }`}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="hidden sm:inline">Bisu</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">Suara</span>
          </>
        )}
      </button>

      {screen === 'welcome' && (
        <WelcomeScreen
          initialProfile={profile}
          onStart={handleUpdateProfile}
          onOpenGuide={() => setIsGuideOpen(true)}
          onOpenPrerequisites={() => setIsPrerequisiteOpen(true)}
        />
      )}

      {screen === 'circuit_map' && (
        <CircuitMap
          profile={profile}
          completedMissions={completedMissions}
          stars={stars}
          points={points}
          hasReadMaterial={hasReadMaterial}
          onSelectMission={(id) => {
            if (!hasReadMaterial) return;
            if (id === 1) setScreen('mission_1');
            if (id === 2) setScreen('mission_2');
            if (id === 3) setScreen('mission_3');
            if (id === 4) setScreen('mission_4');
          }}
          onOpenQuizLeaderboard={() => {
            if (!hasReadMaterial) return;
            setScreen('quiz_leaderboard');
          }}
          onOpenGuide={() => setIsGuideOpen(true)}
          onOpenPrerequisites={() => setIsPrerequisiteOpen(true)}
          onBackToWelcome={() => setScreen('welcome')}
        />
      )}

      {screen === 'mission_1' && (
        <Mission1SnackShop
          profile={profile}
          onComplete={() => handleCompleteMission(1)}
          onBackToMap={() => setScreen('circuit_map')}
        />
      )}

      {screen === 'mission_2' && (
        <Mission2OutfitGarage
          profile={profile}
          onComplete={() => handleCompleteMission(2)}
          onBackToMap={() => setScreen('circuit_map')}
        />
      )}

      {screen === 'mission_3' && (
        <Mission3CircuitTree
          profile={profile}
          onComplete={() => handleCompleteMission(3)}
          onBackToMap={() => setScreen('circuit_map')}
        />
      )}

      {screen === 'mission_4' && (
        <Mission4FoodGoCatering
          profile={profile}
          onComplete={() => handleCompleteMission(4)}
          onBackToMap={() => setScreen('circuit_map')}
        />
      )}

      {screen === 'quiz_leaderboard' && (
        <QuizAndLeaderboard
          profile={profile}
          completedMissions={completedMissions}
          adventureStartTime={adventureStartTime}
          onBackToMap={() => setScreen('circuit_map')}
        />
      )}

      {/* Global Modals */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <PrerequisiteModal
        isOpen={isPrerequisiteOpen}
        onClose={() => setIsPrerequisiteOpen(false)}
        hasConfirmedRead={hasReadMaterial}
        onConfirmRead={handleConfirmReadMaterial}
      />
    </div>
  );
}
