/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Database Integration & Top 5 Leaderboard (Google Apps Script / Webhook with graceful fallback)
 * Data dummy/palsu telah dihapus sepenuhnya sesuai permintaan.
 */

import { LeaderboardEntry } from '../types';

// Default Apps Script URL variable that can be configured by the teacher / user
export const DEFAULT_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz_SUGAR_RUSH_LAB_MOCK/exec';

const STORAGE_KEY = 'sugar_rush_leaderboard_v1';

// Clean initial leaderboard without any fake/dummy data
export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [];

export interface ScorePayload {
  nama: string;
  kelas: string;
  misi1: string; // 'Selesai' | 'Belum'
  misi2: string;
  misi3: string;
  misi4: string;
  skorKuis: number;
  waktuSelesai: string; // 'HH:mm:ss'
  durasi: string; // '08 menit 25 detik'
  // Backward-compatibility keys
  name?: string;
  studentClass?: string;
  score?: number;
  timeStr?: string;
  durationSeconds?: number;
  timestamp?: string;
}

export function getLocalLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: LeaderboardEntry[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return sortAndRank(parsed);
  } catch {
    return [];
  }
}

function sortAndRank(list: LeaderboardEntry[]): LeaderboardEntry[] {
  // Filter out any potential old dummy entries if previously saved
  const filtered = list.filter((item) => {
    const lower = (item.name || '').toLowerCase();
    return (
      lower !== 'aisyah nur' &&
      lower !== 'aisya madina' &&
      lower !== 'alwah naira' &&
      lower !== 'rian ardiansyah' &&
      lower !== 'nabil pratama'
    );
  });

  // Sort descending by score, then ascending by durationSeconds
  const sorted = [...filtered].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return (a.durationSeconds || 0) - (b.durationSeconds || 0);
  });

  return sorted.slice(0, 10).map((item, idx) => ({
    ...item,
    rank: idx + 1,
  }));
}

/**
 * Fetch Top 5 Leaderboard
 * Calls Google Apps Script Web App GET or falls back to local storage
 */
export async function fetchTop5Leaderboard(
  appsScriptUrl = DEFAULT_APPS_SCRIPT_URL
): Promise<{ data: LeaderboardEntry[]; isOnline: boolean; message?: string }> {
  if (
    appsScriptUrl &&
    appsScriptUrl.startsWith('https://') &&
    !appsScriptUrl.includes('MOCK')
  ) {
    try {
      const response = await fetch(appsScriptUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        const json = await response.json();
        if (Array.isArray(json)) {
          const ranked = sortAndRank(json);
          return { data: ranked.slice(0, 5), isOnline: true, message: 'Online (Google Sheets Real-time)' };
        }
      }
    } catch {
      // Gracefully fall back to local storage
    }
  }

  const local = getLocalLeaderboard();
  return {
    data: local.slice(0, 5),
    isOnline: false,
    message: local.length > 0 ? 'Mode Lokal Terhubung' : 'Belum ada data peringkat untuk sesi ini.',
  };
}

/**
 * Send test result to Google Apps Script via POST
 * Data JSON: nama, kelas, misi1, misi2, misi3, misi4, skorKuis, waktuSelesai, dan durasi
 */
export async function submitScoreToDatabase(
  payload: ScorePayload,
  durationSeconds: number,
  appsScriptUrl = DEFAULT_APPS_SCRIPT_URL
): Promise<{ success: boolean; isOnline: boolean; updatedLeaderboard: LeaderboardEntry[] }> {
  const newEntry: LeaderboardEntry = {
    id: 'entry-' + Date.now(),
    rank: 99,
    name: payload.nama,
    studentClass: payload.kelas,
    score: payload.skorKuis,
    timeStr: payload.durasi,
    durationSeconds: durationSeconds,
    timestamp: payload.waktuSelesai,
  };

  // Update local storage
  const current = getLocalLeaderboard();
  const updated = sortAndRank([...current, newEntry]);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed saving to localStorage:', err);
  }

  // Attempt Google Apps Script POST
  let isOnline = false;
  if (
    appsScriptUrl &&
    appsScriptUrl.startsWith('https://') &&
    !appsScriptUrl.includes('MOCK')
  ) {
    try {
      await fetch(appsScriptUrl, {
        method: 'POST',
        mode: 'no-cors', // standard for Google Apps Script redirects
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      isOnline = true;
    } catch {
      isOnline = false;
    }
  }

  return { success: true, isOnline, updatedLeaderboard: updated.slice(0, 5) };
}

/**
 * Reset Leaderboard Database (Guru Feature)
 * Calls APPS_SCRIPT_URL + "?action=reset" via GET and clears local storage
 */
export async function resetLeaderboardDatabase(
  appsScriptUrl = DEFAULT_APPS_SCRIPT_URL
): Promise<{ success: boolean; isOnline: boolean }> {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed clearing localStorage:', err);
  }

  let isOnline = false;
  if (
    appsScriptUrl &&
    appsScriptUrl.startsWith('https://') &&
    !appsScriptUrl.includes('MOCK')
  ) {
    try {
      const resetUrl = appsScriptUrl.includes('?')
        ? `${appsScriptUrl}&action=reset`
        : `${appsScriptUrl}?action=reset`;
      await fetch(resetUrl, {
        method: 'GET',
        mode: 'no-cors',
      });
      isOnline = true;
    } catch (err) {
      console.warn('Apps Script reset ping failed or blocked by CORS:', err);
    }
  }

  return { success: true, isOnline };
}
