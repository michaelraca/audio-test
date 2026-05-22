import React, { useEffect, useState } from 'react';
import { Particle } from '../types';

interface ParticleSystemProps {
  particles: Particle[];
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ particles }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;
