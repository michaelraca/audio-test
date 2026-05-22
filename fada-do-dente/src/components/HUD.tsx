import React from 'react';

interface HUDProps {
  score: number;
  combo: number;
  magicEnergy: number;
  level: number;
  targetScore: number;
}

const HUD: React.FC<HUDProps> = ({ 
  score, 
  combo, 
  magicEnergy, 
  level,
  targetScore 
}) => {
  const getComboLevel = (combo: number): string => {
    if (combo >= 20) return 'ARCO-ÍRIS ✨';
    if (combo >= 10) return 'TURBO 🚀';
    if (combo >= 5) return 'MÁGICO ⭐';
    return '';
  };

  const getComboColor = (combo: number): string => {
    if (combo >= 20) return 'text-fairy-gold';
    if (combo >= 10) return 'text-fairy-blue';
    if (combo >= 5) return 'text-magic-DEFAULT';
    return 'text-gray-400';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Score */}
        <div className="card-magic bg-gradient-to-br from-purple-100 to-pink-100">
          <div className="text-center">
            <div className="text-night-sky font-bold text-sm uppercase tracking-wide">Pontos</div>
            <div className="text-3xl font-bold text-magic-dark text-glow">{score}</div>
            <div className="text-xs text-gray-500 mt-1">Meta: {targetScore}</div>
          </div>
        </div>
        
        {/* Combo */}
        <div className={`card-magic transition-all duration-300 ${combo > 0 ? 'animate-glow' : ''}`}>
          <div className="text-center">
            <div className="text-night-sky font-bold text-sm uppercase tracking-wide">Combo</div>
            <div className={`text-3xl font-bold ${getComboColor(combo)} combo-pop`}>
              {combo}x
            </div>
            {combo > 0 && (
              <div className={`text-xs font-bold mt-1 ${getComboColor(combo)}`}>
                {getComboLevel(combo)}
              </div>
            )}
          </div>
        </div>
        
        {/* Magic Energy */}
        <div className="card-magic bg-gradient-to-br from-blue-100 to-purple-100 col-span-2 md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-night-sky font-bold text-sm uppercase tracking-wide mb-2">
                Energia Mágica
              </div>
              <div className="h-6 bg-night-sky/30 rounded-full overflow-hidden border-2 border-magic-light">
                <div 
                  className="h-full bg-gradient-to-r from-magic-light via-magic-DEFAULT to-magic-dark transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(100, magicEnergy)}%` }}
                />
              </div>
              <div className="text-right text-xs text-magic-dark font-bold mt-1">
                {Math.min(100, magicEnergy)}%
              </div>
            </div>
            
            {/* Magic orb icon */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-magic-DEFAULT rounded-full animate-pulse opacity-50"/>
              <div className="absolute inset-2 bg-gradient-to-br from-fairy-pink to-fairy-blue rounded-full animate-spin" style={{ animationDuration: '3s' }}/>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Level indicator */}
      <div className="mt-4 text-center">
        <div className="inline-block card-magic px-6 py-2">
          <span className="text-night-sky font-bold">Fase {level}</span>
        </div>
      </div>
    </div>
  );
};

export default HUD;
