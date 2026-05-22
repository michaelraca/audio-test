import { Particle } from '../types';

let particleId = 0;

export function createParticle(
  x: number,
  y: number,
  color: string = '#9B72CF'
): Particle {
  const angle = (Math.random() - 0.5) * Math.PI;
  const speed = 2 + Math.random() * 3;
  
  return {
    id: particleId++,
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: -Math.sin(angle) * speed - 2,
    life: 1,
    color,
    size: 4 + Math.random() * 6,
  };
}

export function updateParticle(particle: Particle): Particle {
  return {
    ...particle,
    x: particle.x + particle.vx,
    y: particle.y + particle.vy,
    vy: particle.vy + 0.1, // gravity
    life: particle.life - 0.02,
  };
}

export function shouldRemoveParticle(particle: Particle): boolean {
  return particle.life <= 0;
}

export function generateSparkles(
  x: number,
  y: number,
  count: number = 5,
  colors: string[] = ['#9B72CF', '#FFB6D9', '#A8D8FF', '#FFD700']
): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(createParticle(x, y, color));
  }
  return particles;
}

export function playSound(type: 'correct' | 'error' | 'combo' | 'levelComplete') {
  // Simple audio feedback using Web Audio API
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'correct':
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
        
      case 'error':
        oscillator.frequency.setValueAtTime(329.63, audioContext.currentTime); // E4
        oscillator.frequency.setValueAtTime(293.66, audioContext.currentTime + 0.1); // D4
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
        
      case 'combo':
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.1); // G5
        oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime + 0.2); // C6
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
        break;
        
      case 'levelComplete':
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15);
          gain.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.3);
          osc.start(audioContext.currentTime + i * 0.15);
          osc.stop(audioContext.currentTime + i * 0.15 + 0.3);
        });
        break;
    }
  } catch (e) {
    console.log('Audio not available');
  }
}

export function calculateScore(
  isCorrect: boolean,
  combo: number,
  timeBonus: number = 0
): number {
  if (!isCorrect) {
    return -5;
  }
  
  const baseScore = 10;
  const comboMultiplier = 1 + Math.floor(combo / 5) * 0.2;
  return Math.floor(baseScore * comboMultiplier + timeBonus);
}

export function getComboLevel(combo: number): string {
  if (combo >= 20) return 'ARCO-ÍRIS';
  if (combo >= 10) return 'TURBO';
  if (combo >= 5) return 'MÁGICO';
  return '';
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
