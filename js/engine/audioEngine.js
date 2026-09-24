/**
 * Sacred Audio Engine
 * Generates an ambient meditative Tanpura drone (Sa - Pa tuning at 108Hz / 162Hz)
 * with sacred Om harmonic resonance using the Web Audio API.
 */

class SacredAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.isMuted = false;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  startDrone() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    const baseFreq = 108; // Sacred Sa frequency
    // Drone harmonics: Sa (root), Pa (fifth 1.5x), Sa' (octave 2x), low resonance (0.5x)
    const harmonics = [
      { freq: baseFreq * 0.5, type: 'sine', gain: 0.15 },
      { freq: baseFreq, type: 'triangle', gain: 0.2 },
      { freq: baseFreq * 1.5, type: 'sine', gain: 0.12 }, // Pa
      { freq: baseFreq * 2.0, type: 'sine', gain: 0.08 },
      { freq: baseFreq * 2.01, type: 'triangle', gain: 0.05 } // subtle chorusing detune
    ];

    // Filter for warm temple resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(4, this.ctx.currentTime);
    filter.connect(this.masterGain);

    this.oscillators = harmonics.map(h => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = h.type;
      osc.frequency.setValueAtTime(h.freq, this.ctx.currentTime);
      g.gain.setValueAtTime(h.gain, this.ctx.currentTime);
      osc.connect(g);
      g.connect(filter);
      osc.start();
      return { osc, gain: g };
    });

    // Fade in gently
    this.masterGain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + 3);
    this.isPlaying = true;
  }

  stopDrone() {
    if (!this.isPlaying || !this.ctx) return;
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
    setTimeout(() => {
      this.oscillators.forEach(item => {
        try { item.osc.stop(); } catch(e) {}
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 1600);
  }

  toggle() {
    if (this.isPlaying) {
      this.stopDrone();
      return false;
    } else {
      this.startDrone();
      return true;
    }
  }
}

export const audioEngine = new SacredAudioEngine();
