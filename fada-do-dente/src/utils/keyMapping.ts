import { KeyMapping, Finger } from '../types';

export const KEY_TO_FINGER: Record<string, Finger> = {
  // Left hand - Home row
  'a': 'left-pinky',
  's': 'left-ring',
  'd': 'left-middle',
  'f': 'left-index',
  
  // Right hand - Home row
  'j': 'right-index',
  'k': 'right-middle',
  'l': 'right-ring',
  'ç': 'right-pinky',
  ';': 'right-pinky',
  
  // Left hand - Top row
  'q': 'left-pinky',
  'w': 'left-ring',
  'e': 'left-middle',
  'r': 'left-index',
  
  // Right hand - Top row
  'u': 'right-index',
  'i': 'right-middle',
  'o': 'right-ring',
  'p': 'right-pinky',
  
  // Left hand - Bottom row
  'z': 'left-pinky',
  'x': 'left-ring',
  'c': 'left-middle',
  'v': 'left-index',
  
  // Right hand - Bottom row
  'b': 'right-index',
  'n': 'right-middle',
  'm': 'right-ring',
  ',': 'right-pinky',
  '.': 'right-pinky',
};

export const FINGER_TO_KEY: Record<Finger, string[]> = {
  'left-pinky': ['a', 'q', 'z'],
  'left-ring': ['s', 'w', 'x'],
  'left-middle': ['d', 'e', 'c'],
  'left-index': ['f', 'r', 'v'],
  'right-index': ['j', 'u', 'b'],
  'right-middle': ['k', 'i', 'n'],
  'right-ring': ['l', 'o', 'm'],
  'right-pinky': ['ç', 'p', ',', '.', ';'],
};

export const KEY_POSITIONS: Record<string, { row: number; col: number }> = {
  // Top row (row 0)
  'q': { row: 0, col: 0 },
  'w': { row: 0, col: 1 },
  'e': { row: 0, col: 2 },
  'r': { row: 0, col: 3 },
  't': { row: 0, col: 4 },
  'y': { row: 0, col: 5 },
  'u': { row: 0, col: 6 },
  'i': { row: 0, col: 7 },
  'o': { row: 0, col: 8 },
  'p': { row: 0, col: 9 },
  
  // Home row (row 1)
  'a': { row: 1, col: 0 },
  's': { row: 1, col: 1 },
  'd': { row: 1, col: 2 },
  'f': { row: 1, col: 3 },
  'g': { row: 1, col: 4 },
  'h': { row: 1, col: 5 },
  'j': { row: 1, col: 6 },
  'k': { row: 1, col: 7 },
  'l': { row: 1, col: 8 },
  'ç': { row: 1, col: 9 },
  
  // Bottom row (row 2)
  'z': { row: 2, col: 0 },
  'x': { row: 2, col: 1 },
  'c': { row: 2, col: 2 },
  'v': { row: 2, col: 3 },
  'b': { row: 2, col: 4 },
  'n': { row: 2, col: 5 },
  'm': { row: 2, col: 6 },
};

export function getFingerForKey(key: string): Finger | null {
  const normalizedKey = key.toLowerCase();
  return KEY_TO_FINGER[normalizedKey] || null;
}

export function getKeyForFinger(finger: Finger): string[] {
  return FINGER_TO_KEY[finger] || [];
}

export function isHomeRowKey(key: string): boolean {
  const homeRowKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', 'ç'];
  return homeRowKeys.includes(key.toLowerCase());
}

export const LEVELS_DATA = [
  // Tutorial
  {
    id: 0,
    name: 'Conhecendo as Mãos',
    description: 'Vamos aprender a posição correta das mãos!',
    world: 0,
    keys: ['f', 'j'],
    targetScore: 10,
    difficulty: 'tutorial' as const,
  },
  // World 1 - Home Row
  {
    id: 1,
    name: 'A S D F',
    description: 'Mão esquerda na linha base',
    world: 1,
    keys: ['a', 's', 'd', 'f'],
    targetScore: 50,
    difficulty: 'easy' as const,
  },
  {
    id: 2,
    name: 'J K L Ç',
    description: 'Mão direita na linha base',
    world: 1,
    keys: ['j', 'k', 'l', 'ç'],
    targetScore: 50,
    difficulty: 'easy' as const,
  },
  {
    id: 3,
    name: 'Linha Base Completa',
    description: 'Todas as teclas da linha base',
    world: 1,
    keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', 'ç'],
    targetScore: 100,
    difficulty: 'medium' as const,
  },
];

export const SIMPLE_WORDS = [
  'fada',
  'dente',
  'lua',
  'casa',
  'asa',
  'sala',
  'faca',
  'lada',
  'jada',
  'cala',
];

export const SHORT_PHRASES = [
  'a fada voa',
  'pegue o dente',
  'lua clara',
  'casa da fada',
  'asa de luz',
];
