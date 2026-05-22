import React from 'react';
import { Finger, FINGER_COLORS } from '../types';
import { KEY_POSITIONS, getFingerForKey } from '../utils/keyMapping';

interface KeyboardProps {
  highlightedKey?: string | null;
  onKeyPress?: (key: string) => void;
  showFingerColors?: boolean;
  activeKeys?: string[];
}

const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const Keyboard: React.FC<KeyboardProps> = ({ 
  highlightedKey = null,
  onKeyPress,
  showFingerColors = true,
  activeKeys = []
}) => {
  const getKeyColor = (key: string): string => {
    if (highlightedKey === key.toLowerCase()) {
      return '#9B72CF'; // Magic purple for target key
    }
    
    if (activeKeys.includes(key.toLowerCase())) {
      return '#4ECDC4'; // Teal for recently pressed
    }
    
    if (showFingerColors) {
      const finger = getFingerForKey(key);
      if (finger) {
        return `${FINGER_COLORS[finger]}40`; // Semi-transparent finger color
      }
    }
    
    return '#FFFFFF'; // Default white
  };

  const getKeyStrokeColor = (key: string): string => {
    if (highlightedKey === key.toLowerCase()) {
      return '#FFD700'; // Gold stroke for target
    }
    return '#E0E0E0';
  };

  return (
    <div className="bg-night-sky/50 p-6 rounded-3xl shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col gap-2">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex gap-2 justify-center"
            style={{ marginLeft: rowIndex === 1 ? '0px' : rowIndex === 2 ? '30px' : '0px' }}
          >
            {row.map((key) => {
              const isHighlighted = highlightedKey === key.toLowerCase();
              const isActive = activeKeys.includes(key.toLowerCase());
              
              return (
                <button
                  key={key}
                  onMouseDown={() => onKeyPress?.(key)}
                  className={`
                    w-12 h-12 rounded-xl font-bold text-lg uppercase
                    transition-all duration-150 transform
                    ${isHighlighted ? 'scale-110 shadow-lg shadow-magic-DEFAULT/50' : ''}
                    ${isActive ? 'scale-95' : 'hover:scale-105'}
                  `}
                  style={{
                    backgroundColor: getKeyColor(key),
                    border: `3px solid ${getKeyStrokeColor(key)}`,
                    color: isHighlighted ? '#FFF' : '#333',
                    textShadow: isHighlighted ? '0 0 10px rgba(255,255,255,0.8)' : 'none',
                  }}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
        
        {/* Space bar */}
        <div className="flex justify-center mt-2">
          <button
            className="w-64 h-12 rounded-xl bg-white/80 border-3 border-gray-300 
                       font-bold text-gray-600 hover:bg-white transition-all"
          >
            ESPAÇO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
