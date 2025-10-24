'use client';

class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private isEnabled: boolean = true;
  private volume: number = 0.3;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initializeAudioContext();
    }
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Resume the context if it's suspended (required by some browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    localStorage.setItem('devfeed-sound-enabled', enabled.toString());
  }

  public getEnabled(): boolean {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('devfeed-sound-enabled');
      return stored ? stored === 'true' : true;
    }
    return true;
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    localStorage.setItem('devfeed-sound-volume', this.volume.toString());
  }

  private async ensureAudioContext() {
    if (!this.audioContext) {
      await this.initializeAudioContext();
    }
    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  public getVolume(): number {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('devfeed-sound-volume');
      return stored ? parseFloat(stored) : 0.3;
    }
    return 0.3;
  }

  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine'): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      data[i] = Math.sin(2 * Math.PI * frequency * t) * 0.3;
    }

    return buffer;
  }

  private createBeep(frequency: number, duration: number, volume: number = 0.3): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 8); // Quick decay
      data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * volume;
    }

    return buffer;
  }

  private createClick(): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.1;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      const noise = (Math.random() * 2 - 1) * 0.1;
      const envelope = Math.exp(-t * 20);
      data[i] = noise * envelope;
    }

    return buffer;
  }

  private createWhoosh(): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.3;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      const frequency = 200 + (800 * t); // Sweep from 200Hz to 1000Hz
      const envelope = Math.exp(-t * 3);
      data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.2;
    }

    return buffer;
  }

  private createPowerUp(): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.5;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      const frequency = 400 + (600 * t); // Rising tone
      const envelope = Math.exp(-t * 2);
      data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.25;
    }

    return buffer;
  }

  private createError(): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.4;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      const frequency = 300 - (200 * t); // Falling tone
      const envelope = Math.exp(-t * 1.5);
      data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
    }

    return buffer;
  }

  private async playSound(buffer: AudioBuffer | null) {
    if (!this.isEnabled || !buffer) return;

    try {
      await this.ensureAudioContext();
      if (!this.audioContext) return;

      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      gainNode.gain.value = this.volume;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start();
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  public async playClick() {
    const buffer = this.createClick();
    await this.playSound(buffer);
  }

  public async playBeep(frequency: number = 800, duration: number = 0.1) {
    const buffer = this.createBeep(frequency, duration);
    await this.playSound(buffer);
  }

  public async playWhoosh() {
    const buffer = this.createWhoosh();
    await this.playSound(buffer);
  }

  public async playPowerUp() {
    const buffer = this.createPowerUp();
    await this.playSound(buffer);
  }

  public async playError() {
    const buffer = this.createError();
    await this.playSound(buffer);
  }

  public async playSuccess() {
    // Play a pleasant ascending chord
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    for (let i = 0; i < frequencies.length; i++) {
      setTimeout(() => {
        const buffer = this.createBeep(frequencies[i], 0.2, 0.2);
        this.playSound(buffer);
      }, i * 100);
    }
  }

  public async playNotification() {
    // Play a gentle notification sound
    const buffer = this.createBeep(1000, 0.15, 0.2);
    await this.playSound(buffer);
  }

  public async playModalOpen() {
    const buffer = this.createWhoosh();
    await this.playSound(buffer);
  }

  public async playModalClose() {
    const buffer = this.createBeep(400, 0.1, 0.15);
    await this.playSound(buffer);
  }

  public async playButtonHover() {
    const buffer = this.createBeep(600, 0.05, 0.1);
    await this.playSound(buffer);
  }

  public async playButtonPress() {
    const buffer = this.createClick();
    await this.playSound(buffer);
  }

  public async playFavoriteAdd() {
    const buffer = this.createPowerUp();
    await this.playSound(buffer);
  }

  public async playFavoriteRemove() {
    const buffer = this.createError();
    await this.playSound(buffer);
  }

  public async playPageTransition() {
    const buffer = this.createWhoosh();
    await this.playSound(buffer);
  }

}

export const soundManager = SoundManager.getInstance();
export default soundManager;
