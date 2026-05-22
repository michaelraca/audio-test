import React, { useState, useEffect } from 'react';
import { GameState, Level, Particle, Finger } from '../types';
import { LEVELS_DATA, getFingerForKey } from '../utils/keyMapping';
import { 
  createParticle, 
  updateParticle, 
  shouldRemoveParticle, 
  generateSparkles,
  playSound,
  calculateScore,
  getComboLevel,
} from '../utils/gameUtils';
import HUD from './components/HUD';
import Keyboard from './components/Keyboard';
import HandDiagram from './components/HandDiagram';
import Fairy from './components/Fairy';
import ParticleSystem from './components/ParticleSystem';

const initialGameState: GameState = {
  currentLevel: 0,
  score: 0,
  combo: 0,
  maxCombo: 0,
  magicEnergy: 0,
  totalCorrect: 0,
  totalErrors: 0,
  unlockedFairies: ['classic'],
  currentFairy: 'classic',
};

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentLevel, setCurrentLevel] = useState<Level>(LEVELS_DATA[0]);
  const [targetKey, setTargetKey] = useState<string>('');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'error' | 'hint', message: string } | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);

  // Generate new target key
  const generateTargetKey = () => {
    const keys = currentLevel.keys;
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setTargetKey(randomKey);
  };

  // Initialize level
  useEffect(() => {
    if (gameStarted && !levelComplete) {
      generateTargetKey();
    }
  }, [currentLevel, gameStarted, levelComplete]);

  // Particle animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(updateParticle)
          .filter(p => !shouldRemoveParticle(p))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Clear feedback after delay
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || levelComplete) return;

      const pressedKey = e.key.toLowerCase();
      
      // Add to active keys for visual feedback
      setActiveKeys(prev => [...prev, pressedKey]);
      setTimeout(() => {
        setActiveKeys(prev => prev.filter(k => k !== pressedKey));
      }, 150);

      // Check if correct key
      if (pressedKey === targetKey) {
        // Correct!
        const finger = getFingerForKey(pressedKey);
        
        // Generate particles at center-top of screen
        const newParticles = generateSparkles(
          window.innerWidth / 2 + (Math.random() - 0.5) * 200,
          window.innerHeight / 3,
          8
        );
        
        setParticles(prev => [...prev, ...newParticles]);
        playSound('correct');
        
        // Update game state
        const newCombo = gameState.combo + 1;
        const scoreGain = calculateScore(true, newCombo);
        
        setGameState(prev => ({
          ...prev,
          score: prev.score + scoreGain,
          combo: newCombo,
          maxCombo: Math.max(prev.maxCombo, newCombo),
          magicEnergy: Math.min(100, prev.magicEnergy + 5),
          totalCorrect: prev.totalCorrect + 1,
        }));

        // Play combo sound at milestones
        if (newCombo > 0 && newCombo % 5 === 0) {
          playSound('combo');
          setFeedback({ type: 'correct', message: `✨ Combo ${newCombo}! ${getComboLevel(newCombo)}` });
        } else {
          setFeedback({ type: 'correct', message: 'Muito bem! ✨' });
        }

        // Generate next target
        generateTargetKey();

        // Check level completion
        if (gameState.score + scoreGain >= currentLevel.targetScore) {
          setLevelComplete(true);
          playSound('levelComplete');
        }
      } else {
        // Wrong key - gentle feedback
        playSound('error');
        
        const correctFinger = getFingerForKey(targetKey);
        let hintMessage = `Quase! ✨`;
        if (correctFinger) {
          const fingerNames: Record<Finger, string> = {
            'left-pinky': 'Mínimo esquerdo',
            'left-ring': 'Anelar esquerdo',
            'left-middle': 'Médio esquerdo',
            'left-index': 'Indicador esquerdo',
            'right-index': 'Indicador direito',
            'right-middle': 'Médio direito',
            'right-ring': 'Anelar direito',
            'right-pinky': 'Mínimo direito',
          };
          hintMessage = `Use o dedo ${fingerNames[correctFinger]} para "${targetKey.toUpperCase()}"`;
        }

        setGameState(prev => ({
          ...prev,
          combo: 0,
          totalErrors: prev.totalErrors + 1,
        }));

        setFeedback({ type: 'hint', message: hintMessage });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, levelComplete, targetKey, gameState, currentLevel]);

  const startGame = () => {
    setGameStarted(true);
    generateTargetKey();
  };

  const nextLevel = () => {
    const nextLevelIndex = gameState.currentLevel + 1;
    if (nextLevelIndex < LEVELS_DATA.length) {
      setCurrentLevel(LEVELS_DATA[nextLevelIndex]);
      setGameState(prev => ({
        ...prev,
        currentLevel: nextLevelIndex,
        score: 0,
        combo: 0,
        magicEnergy: 0,
      }));
      setLevelComplete(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-night-deep via-night-sky to-magic-dark overflow-hidden">
      {/* Animated stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <ParticleSystem particles={particles} />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fairy-pink via-magic-light to-fairy-blue text-glow mb-2">
            🧚 Fada do Dente
          </h1>
          <p className="text-xl text-fairy-pink">Typing Adventure ✨</p>
        </header>

        {!gameStarted ? (
          /* Start Screen */
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
            <Fairy type="classic" size="large" isFlying />
            
            <div className="card-magic max-w-md text-center">
              <h2 className="text-2xl font-bold text-magic-dark mb-4">
                Bem-vindo à Aventura!
              </h2>
              <p className="text-gray-700 mb-6">
                Ajude a Fada do Dente a completar sua missão mágica! 
                Cada tecla correta gera energia mágica para ela voar.
              </p>
              
              <div className="mb-6">
                <h3 className="font-bold text-magic-dark mb-2">Como jogar:</h3>
                <ul className="text-left text-sm text-gray-600 space-y-1">
                  <li>⌨️ Pressione a tecla destacada no teclado</li>
                  <li>👆 Use o dedo correto mostrado nas mãos</li>
                  <li>✨ Acerte em sequência para ganhar combos</li>
                  <li>🎯 Alcance a pontuação alvo para avançar</li>
                </ul>
              </div>

              <button onClick={startGame} className="btn-magic text-lg">
                Começar Aventura 🚀
              </button>
            </div>
          </div>
        ) : (
          /* Game Screen */
          <div className="space-y-6">
            {/* HUD */}
            <HUD 
              score={gameState.score}
              combo={gameState.combo}
              magicEnergy={gameState.magicEnergy}
              level={currentLevel.id + 1}
              targetScore={currentLevel.targetScore}
            />

            {/* Feedback message */}
            {feedback && (
              <div className={`text-center text-xl font-bold animate-bounce ${
                feedback.type === 'correct' ? 'text-green-400' : 
                feedback.type === 'error' ? 'text-orange-400' : 'text-blue-400'
              }`}>
                {feedback.message}
              </div>
            )}

            {/* Main game area */}
            <div className="grid md:grid-cols-3 gap-6 items-center">
              {/* Left - Hand diagram */}
              <div className="card-magic">
                <h3 className="text-center font-bold text-magic-dark mb-2">Posição das Mãos</h3>
                <HandDiagram highlightedFinger={getFingerForKey(targetKey)} />
              </div>

              {/* Center - Fairy and target */}
              <div className="flex flex-col items-center gap-6">
                <div className="card-magic p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Pressione a tecla:</div>
                  <div className="text-8xl font-bold text-magic-DEFAULT animate-pulse">
                    {targetKey.toUpperCase()}
                  </div>
                </div>
                
                <Fairy type={gameState.currentFairy as any} isFlying={gameState.combo > 0} size="large" />
                
                {gameState.combo > 0 && (
                  <div className="text-2xl font-bold text-fairy-gold animate-bounce">
                    {gameState.combo}x Combo! 🔥
                  </div>
                )}
              </div>

              {/* Right - Keyboard */}
              <div className="card-magic">
                <h3 className="text-center font-bold text-magic-dark mb-2">Teclado Mágico</h3>
                <Keyboard 
                  highlightedKey={targetKey}
                  activeKeys={activeKeys}
                  showFingerColors
                />
              </div>
            </div>

            {/* Level info */}
            <div className="text-center card-magic max-w-2xl mx-auto">
              <h3 className="font-bold text-magic-dark">{currentLevel.name}</h3>
              <p className="text-gray-600 text-sm">{currentLevel.description}</p>
              <div className="mt-2 text-xs text-gray-500">
                Teclas: {currentLevel.keys.map(k => k.toUpperCase()).join(' • ')}
              </div>
            </div>
          </div>
        )}

        {/* Level Complete Modal */}
        {levelComplete && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="card-magic max-w-md text-center animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-magic-dark mb-4">
                Fase Completa!
              </h2>
              <div className="space-y-2 mb-6">
                <p className="text-xl">Pontuação: <span className="font-bold text-magic-DEFAULT">{gameState.score}</span></p>
                <p className="text-lg">Combo Máximo: <span className="font-bold text-fairy-gold">{gameState.maxCombo}x</span></p>
                <p className="text-lg">Acertos: <span className="font-bold text-green-500">{gameState.totalCorrect}</span></p>
              </div>
              
              {gameState.currentLevel < LEVELS_DATA.length - 1 ? (
                <button onClick={nextLevel} className="btn-magic">
                  Próxima Fase ➡️
                </button>
              ) : (
                <div className="text-fairy-pink font-bold">
                  🏆 Você completou todas as fases disponíveis!
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-fairy-pink/50 text-sm relative z-10">
        Feito com ✨ magia para aprender digitação
      </footer>
    </div>
  );
}

export default App;
