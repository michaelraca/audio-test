import React from 'react';

interface FairyProps {
  type?: 'classic' | 'ninja' | 'space' | 'robot' | 'crystal';
  isFlying?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Fairy: React.FC<FairyProps> = ({ 
  type = 'classic',
  isFlying = false,
  size = 'medium'
}) => {
  const sizeClass = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  const getFairyColors = () => {
    switch (type) {
      case 'ninja':
        return { body: '#2C3E50', wings: '#34495E', glow: '#95A5A6' };
      case 'space':
        return { body: '#1a1a3e', wings: '#4B0082', glow: '#9370DB' };
      case 'robot':
        return { body: '#708090', wings: '#B0C4DE', glow: '#00CED1' };
      case 'crystal':
        return { body: '#E0D4FC', wings: '#FFB6D9', glow: '#FFD700' };
      default: // classic
        return { body: '#FFB6D9', wings: '#A8D8FF', glow: '#FFD700' };
    }
  };

  const colors = getFairyColors();

  return (
    <div className={`${sizeClass[size]} relative animate-float`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Glow effect */}
        <circle cx="50" cy="50" r="45" fill={colors.glow} opacity="0.3" className="animate-pulse"/>
        
        {/* Back wings */}
        <ellipse 
          cx="30" cy="45" rx="15" ry="25" 
          fill={colors.wings} opacity="0.7"
          className={isFlying ? 'wing-flap' : ''}
          style={{ transformOrigin: '45px 45px' }}
        />
        <ellipse 
          cx="70" cy="45" rx="15" ry="25" 
          fill={colors.wings} opacity="0.7"
          className={isFlying ? 'wing-flap' : ''}
          style={{ transformOrigin: '55px 45px' }}
        />
        
        {/* Body */}
        <ellipse cx="50" cy="55" rx="12" ry="18" fill={colors.body}/>
        
        {/* Head */}
        <circle cx="50" cy="35" r="12" fill="#FFE4C4"/>
        
        {/* Hair */}
        <path 
          d="M 38 30 Q 50 20 62 30 Q 65 35 62 38 L 60 35 Q 50 28 40 35 L 38 38 Z" 
          fill={type === 'space' ? '#1a1a3e' : '#FFD700'}
        />
        
        {/* Eyes */}
        <circle cx="46" cy="34" r="2.5" fill="#2C3E50"/>
        <circle cx="54" cy="34" r="2.5" fill="#2C3E50"/>
        
        {/* Smile */}
        <path 
          d="M 47 38 Q 50 41 53 38" 
          stroke="#E74C3C" 
          strokeWidth="1.5" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Front wings */}
        <ellipse 
          cx="32" cy="50" rx="12" ry="20" 
          fill={colors.wings} opacity="0.8"
          className={isFlying ? 'wing-flap' : ''}
          style={{ transformOrigin: '44px 50px' }}
        />
        <ellipse 
          cx="68" cy="50" rx="12" ry="20" 
          fill={colors.wings} opacity="0.8"
          className={isFlying ? 'wing-flap' : ''}
          style={{ transformOrigin: '56px 50px' }}
        />
        
        {/* Magic sparkles */}
        {isFlying && (
          <>
            <circle cx="25" cy="30" r="2" fill="#FFF" className="animate-ping"/>
            <circle cx="75" cy="35" r="1.5" fill="#FFF" className="animate-ping" style={{ animationDelay: '0.2s' }}/>
            <circle cx="20" cy="60" r="1.5" fill="#FFF" className="animate-ping" style={{ animationDelay: '0.4s' }}/>
            <circle cx="80" cy="55" r="2" fill="#FFF" className="animate-ping" style={{ animationDelay: '0.6s' }}/>
          </>
        )}
      </svg>
    </div>
  );
};

export default Fairy;
