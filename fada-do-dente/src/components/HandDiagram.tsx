import React from 'react';
import { Finger, FINGER_COLORS } from '../types';

interface HandDiagramProps {
  highlightedFinger?: Finger | null;
  showLabels?: boolean;
}

const HandDiagram: React.FC<HandDiagramProps> = ({ 
  highlightedFinger = null,
  showLabels = true 
}) => {
  const fingerLabels: Record<Finger, string> = {
    'left-pinky': 'Mínimo',
    'left-ring': 'Anelar',
    'left-middle': 'Médio',
    'left-index': 'Indicador',
    'right-index': 'Indicador',
    'right-middle': 'Médio',
    'right-ring': 'Anelar',
    'right-pinky': 'Mínimo',
  };

  const getFingerColor = (finger: Finger): string => {
    return highlightedFinger === finger 
      ? FINGER_COLORS[finger] 
      : `${FINGER_COLORS[finger]}66`;
  };

  return (
    <div className="flex gap-8 justify-center items-center p-4">
      {/* Left Hand */}
      <div className="relative">
        <svg width="200" height="180" viewBox="0 0 200 180" className="drop-shadow-lg">
          {/* Palm */}
          <ellipse cx="100" cy="130" rx="50" ry="40" fill="#FFE4C4" stroke="#DEB887" strokeWidth="2"/>
          
          {/* Pinky */}
          <rect x="20" y="60" width="20" height="70" rx="10" 
                fill={getFingerColor('left-pinky')} 
                stroke={highlightedFinger === 'left-pinky' ? '#FFF' : '#DEB887'} 
                strokeWidth={highlightedFinger === 'left-pinky' ? 3 : 2}
                className="transition-all duration-200"/>
          
          {/* Ring */}
          <rect x="45" y="50" width="22" height="80" rx="11" 
                fill={getFingerColor('left-ring')}
                stroke={highlightedFinger === 'left-ring' ? '#FFF' : '#DEB887'}
                strokeWidth={highlightedFinger === 'left-ring' ? 3 : 2}
                className="transition-all duration-200"/>
          
          {/* Middle */}
          <rect x="72" y="45" width="24" height="85" rx="12" 
                fill={getFingerColor('left-middle')}
                stroke={highlightedFinger === 'left-middle' ? '#FFF' : '#DEB887'}
                strokeWidth={highlightedFinger === 'left-middle' ? 3 : 2}
                className="transition-all duration-200"/>
          
          {/* Index */}
          <rect x="101" y="50" width="24" height="80" rx="12" 
                fill={getFingerColor('left-index')}
                stroke={highlightedFinger === 'left-index' ? '#FFF' : '#DEB887'}
                strokeWidth={highlightedFinger === 'left-index' ? 3 : 2}
                className="transition-all duration-200"/>
          
          {/* Thumb */}
          <rect x="130" y="90" width="25" height="50" rx="12" 
                fill="#FFE4C4"
                stroke="#DEB887"
                strokeWidth="2"
                transform="rotate(20 130 90)"/>
        </svg>
        
        {showLabels && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-night-sky font-bold text-sm">
            Mão Esquerda
          </div>
        )}
      </div>
      
      {/* Right Hand */}
      <div className="relative">
        <svg width="200" height="180" viewBox="0 0 200 180" className="drop-shadow-lg">
          {/* Palm */}
          <ellipse cx="100" cy="130" rx="50" ry="40" fill="#FFE4C4" stroke="#DEB887" strokeWidth="2"/>
          
          {/* Index */}
          <rect x="75" y="50" width="24" height="80" rx="12" 
                fill={getFingerColor('right-index')}
                stroke={highlightedFinger === 'right-index' ? '#FFF' : '#DEB887'}
                strokeWidth={highlightedFinger === 'right-index' ? 3 : 2}
                className="transition-all duration-200"/>
          
          {/* Middle */}
          <rect x="104" y="45" width="24" height="85" rx="12" 
                fill={getFingerColor('right-middle')}
                stroke={highlightedFinger === 'right-middle' ? '#FFF' : '#DEB887'}
                strokeWidth={highlightedFinger === 'right-middle' ? 3 : 2}
                className="transition-all duration-200"/>
          
          {/* Ring */}
          <rect x="133" y="50" width="22" height="80" rx="11" 
                fill={getFingerColor('right-ring')}
                stroke={highlightedFinger === 'right-ring' ? '#FFF' : '#DEB887'}
                strokeWidth={highlightedFinger === 'right-ring' ? 3 : 2}
                className="transition-all duration-200"/>
          
          {/* Pinky */}
          <rect x="160" y="60" width="20" height="70" rx="10" 
                fill={getFingerColor('right-pinky')}
                stroke={highlightedFinger === 'right-pinky' ? '#FFF' : '#DEB887'}
                strokeWidth={highlightedFinger === 'right-pinky' ? 3 : 2}
                className="transition-all duration-200"/>
          
          {/* Thumb */}
          <rect x="45" y="90" width="25" height="50" rx="12" 
                fill="#FFE4C4"
                stroke="#DEB887"
                strokeWidth="2"
                transform="rotate(-20 70 90)"/>
        </svg>
        
        {showLabels && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-night-sky font-bold text-sm">
            Mão Direita
          </div>
        )}
      </div>
    </div>
  );
};

export default HandDiagram;
