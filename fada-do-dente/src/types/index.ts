export type Finger = 'left-pinky' | 'left-ring' | 'left-middle' | 'left-index' | 
                      'right-index' | 'right-middle' | 'right-ring' | 'right-pinky';

export interface KeyMapping {
  key: string;
  finger: Finger;
  hand: 'left' | 'right';
  position: { row: number; col: number };
}

export interface GameState {
  currentLevel: number;
  score: number;
  combo: number;
  maxCombo: number;
  magicEnergy: number;
  totalCorrect: number;
  totalErrors: number;
  unlockedFairies: string[];
  currentFairy: string;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  world: number;
  keys: string[];
  words?: string[];
  targetScore: number;
  timeLimit?: number;
  difficulty: 'tutorial' | 'easy' | 'medium' | 'hard';
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

export const FINGER_COLORS: Record<Finger, string> = {
  'left-pinky': '#FF6B6B',
  'left-ring': '#4ECDC4',
  'left-middle': '#45B7D1',
  'left-index': '#96CEB4',
  'right-index': '#FFEAA7',
  'right-middle': '#DDA0DD',
  'right-ring': '#98D8C8',
  'right-pinky': '#F7DC6F',
};

export const HAND_POSITIONS = {
  left: {
    'left-pinky': { key: 'A', homeRow: true },
    'left-ring': { key: 'S', homeRow: true },
    'left-middle': { key: 'D', homeRow: true },
    'left-index': { key: 'F', homeRow: true },
  },
  right: {
    'right-index': { key: 'J', homeRow: true },
    'right-middle': { key: 'K', homeRow: true },
    'right-ring': { key: 'L', homeRow: true },
    'right-pinky': { key: 'Ç', homeRow: true },
  },
};
