/**
 * Web Audio API Retro Cyber Sound Synthesizer
 * Generates arcade cyber chimes, ticks, and beeps with zero external audio assets.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    const saved = localStorage.getItem('cipher_game_muted');
    if (saved !== null) {
      this.isMuted = saved === 'true';
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    localStorage.setItem('cipher_game_muted', String(muted));
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // Play a simple frequency beep
  public playTone(freq: number, type: OscillatorType, duration: number, gainValue = 0.08) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context might be blocked prior to user interaction
    }
  }

  public playKeyClick() {
    this.playTone(880, 'sine', 0.04, 0.03);
  }

  public playHint() {
    this.playTone(587.33, 'triangle', 0.15, 0.06);
    setTimeout(() => this.playTone(880, 'triangle', 0.2, 0.06), 80);
  }

  public playCorrect() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.25, 0.08);
      }, idx * 75);
    });
  }

  public playIncorrect() {
    if (this.isMuted) return;
    this.playTone(180, 'sawtooth', 0.18, 0.07);
    setTimeout(() => {
      this.playTone(140, 'sawtooth', 0.25, 0.07);
    }, 120);
  }

  public playTick() {
    this.playTone(1200, 'sine', 0.03, 0.02);
  }

  public playTimeout() {
    if (this.isMuted) return;
    this.playTone(220, 'square', 0.2, 0.08);
    setTimeout(() => this.playTone(164.81, 'square', 0.4, 0.08), 180);
  }

  public playVictory() {
    if (this.isMuted) return;
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.35, 0.09);
      }, idx * 100);
    });
  }
}

export const sound = new SoundController();
