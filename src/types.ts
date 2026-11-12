/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StudentProfile {
  name: string;
  studentClass: string;
}

export type ScreenMode =
  | 'welcome'
  | 'circuit_map'
  | 'mission_1'
  | 'mission_2'
  | 'mission_3'
  | 'mission_4'
  | 'quiz_leaderboard';

export interface LeaderboardEntry {
  id?: string;
  rank: number;
  name: string;
  studentClass: string;
  score: number;
  timeStr: string; // e.g. "03:00"
  durationSeconds: number;
  timestamp: string;
}

export interface QuizQuestionItem {
  id: number;
  topic: string;
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}
