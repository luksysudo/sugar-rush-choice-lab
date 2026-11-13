/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Web Audio API Sound Effects (Zero external audio files)
 * - Klik Tombol: Pop/click lembut dan renyah
 * - Jawaban Benar: Chime melodi naik ceria (ding-ding-ding!)
 * - Jawaban Salah: Buzz/boop lembut berfrekuensi rendah
 */

const MUTE_STORAGE_KEY = 'sugar_rush_sound_muted';

class SoundManager {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    try {
      const saved = localStorage.getItem(MUTE_STORAGE_KEY);
      if (saved === 'true') {
        this.muted = true;
      }
    } catch {
      // ignore storage errors
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        try {
          this.ctx = new AudioCtx();
        } catch {
          return null;
        }
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(mute: boolean): void {
    this.muted = mute;
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, mute ? 'true' : 'false');
    } catch {
      // ignore
    }
    if (!mute) {
      this.playClick();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  /**
   * Soft crisp pop/click for button interactions
   */
  public playClick(): void {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.045);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // ignore audio context errors in restricted environments
    }
  }

  /**
   * Cheerful ascending chime melody (ding-ding-ding!) for correct answers
   */
  public playCorrect(): void {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.09;
        const duration = idx === notes.length - 1 ? 0.35 : 0.16;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.13, start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + duration + 0.02);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Gentle low-frequency buzz/boop for wrong answers
   */
  public playWrong(): void {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(210, now);
      osc.frequency.linearRampToValueAtTime(145, now + 0.22);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();

export const playClickSound = () => soundManager.playClick();
export const playCorrectSound = () => soundManager.playCorrect();
export const playWrongSound = () => soundManager.playWrong();
