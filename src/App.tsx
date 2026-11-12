/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SUGAR RUSH: CHOICE LAB - Kaidah Pencacahan SMA Kelas 12
 */

import React, { useState, useEffect } from 'react';
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

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isPrerequisiteOpen, setIsPrerequisiteOpen] = useState(false);

  // Check URL query parameters for ?autostart=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setScreen('circuit_map');
    }
  }, []);

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

    // Critical Requirement: After completing a mission, system MUST return to Circuit Map
    // so student clicks the next mission themselves!
    setScreen('circuit_map');
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans selection:bg-pink-200 selection:text-pink-900">
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
          onSelectMission={(id) => {
            if (id === 1) setScreen('mission_1');
            if (id === 2) setScreen('mission_2');
            if (id === 3) setScreen('mission_3');
            if (id === 4) setScreen('mission_4');
          }}
          onOpenQuizLeaderboard={() => setScreen('quiz_leaderboard')}
          onOpenGuide={() => setIsGuideOpen(true)}
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
      />
    </div>
  );
}
