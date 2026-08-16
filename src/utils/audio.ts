// Web Audio API Sound Synthesizer for notifications and cute cat sounds

class SoundManager {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play focus start sound (Clear, energizing chime)
  playFocusStart(volume = 0.5, soundType: "chime" | "bell" | "marimba" | "gentle" = "chime") {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.4, now);
    masterGain.connect(ctx.destination);

    // Uplifting chord progression: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const delays = [0, 0.12, 0.24, 0.38];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      if (soundType === "marimba") {
        osc.type = "sine";
      } else if (soundType === "bell") {
        osc.type = "triangle";
      } else {
        osc.type = "sine";
      }

      osc.frequency.setValueAtTime(freq, now + delays[i]);

      // Soft attack, decaying sustain
      const startTime = now + delays[i];
      noteGain.gain.setValueAtTime(0, startTime);
      noteGain.gain.linearRampToValueAtTime(0.7, startTime + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.6);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(startTime);
      osc.stop(startTime + 1.7);
    });
  }

  // Play break start sound (Cozy, relaxing melodic chime)
  playBreakStart(volume = 0.5, soundType: "chime" | "bell" | "marimba" | "gentle" = "chime") {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.4, now);
    masterGain.connect(ctx.destination);

    // Relaxing mellow chord: G4, D5, G5, B5, D6
    const notes = [392.0, 587.33, 783.99, 987.77, 1174.66];
    const delays = [0, 0.15, 0.32, 0.5, 0.7];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = soundType === "bell" ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now + delays[i]);

      const startTime = now + delays[i];
      noteGain.gain.setValueAtTime(0, startTime);
      noteGain.gain.linearRampToValueAtTime(0.6, startTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.0008, startTime + 2.2);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(startTime);
      osc.stop(startTime + 2.3);
    });
  }

  // Play synthesized cute cat meow
  playCatMeow(volume = 0.5) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.35, now);
    masterGain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(3, now);

    // "Nya~" pitch curve (inflection up then down)
    const baseFreq = 580 + Math.random() * 80;
    osc.frequency.setValueAtTime(baseFreq * 0.9, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.95, now + 0.38);

    // Volume envelope
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.8, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.42);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Play soft UI click / bubble sound
  playClick(volume = 0.5) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);

    gain.gain.setValueAtTime(volume * 0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }
}

export const soundManager = new SoundManager();
