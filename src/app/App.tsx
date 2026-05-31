import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { MainMenuScreen } from './game/MainMenuScreen';
import { DifficultySelectScreen } from './game/DifficultySelectScreen';
import { InGameScreen } from './game/InGameScreen';
import { RoundResolvedScreen } from './game/RoundResolvedScreen';
import { GameOverWinScreen } from './game/GameOverWinScreen';
import { GameOverLossScreen } from './game/GameOverLossScreen';

type Screen = 'MAIN_MENU' | 'DIFFICULTY_SELECT' | 'IN_GAME' | 'ROUND_RESOLVED' | 'GAME_OVER_WIN' | 'GAME_OVER_LOSS';
type Difficulty = 'CASUAL' | 'EPIDEMIC' | 'PANDEMIC';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('MAIN_MENU');
  const [difficulty, setDifficulty] = useState<Difficulty>('CASUAL');
  const [round, setRound] = useState(1);
  const [energy, setEnergy] = useState(75);
  const [severity, setSeverity] = useState(60);
  const [roundEvents, setRoundEvents] = useState<any[]>([]);

  // Handle starting game
  const handleStartGame = () => {
    setCurrentScreen('DIFFICULTY_SELECT');
  };

  // Handle difficulty selection
  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentScreen('IN_GAME');
    // Reset game state
    setRound(1);
    setEnergy(75);
    setSeverity(60);
  };

  // Handle using an immune action
  const handleUseAction = (cost: number) => {
    if (energy >= cost) {
      setEnergy(prev => Math.max(0, prev - cost));
      // Randomly reduce severity a bit when action is used
      setSeverity(prev => Math.max(0, prev - Math.floor(Math.random() * 10 + 5)));
    }
  };

  // Handle next round button
  const handleNextRound = () => {
    // Generate events and update state BEFORE going to round resolved screen
    const events = [];
    let newSeverity = severity;
    let newEnergy = energy;

    // Random positive event
    if (Math.random() > 0.5) {
      events.push({
        type: 'positive' as const,
        text: 'Zone cleared: Gut',
        value: '-8 INFECTION'
      });
    }

    // Random negative event
    if (Math.random() > 0.3) {
      const severityIncrease = Math.floor(Math.random() * 10 + 5);
      events.push({
        type: 'negative' as const,
        text: 'New zone infected: Blood',
        value: `+${severityIncrease}%`
      });
      newSeverity = Math.min(100, newSeverity + severityIncrease);
    }

    // Random mutation
    if (Math.random() > 0.6) {
      events.push({
        type: 'warning' as const,
        text: 'Mutation activated',
        value: 'ANTIGENIC DRIFT'
      });
    }

    // Energy regeneration
    const epGain = difficulty === 'CASUAL' ? 40 : difficulty === 'EPIDEMIC' ? 30 : 20;
    events.push({
      type: 'info' as const,
      text: 'EP regenerated from zones',
      value: `+${epGain} EP`
    });
    newEnergy = Math.min(100, newEnergy + epGain);

    // Update state
    setSeverity(newSeverity);
    setEnergy(newEnergy);
    setRoundEvents(events);
    setCurrentScreen('ROUND_RESOLVED');
  };

  // Handle continue from round resolved
  const handleContinueFromResolved = () => {
    if (severity >= 100) {
      setCurrentScreen('GAME_OVER_LOSS');
    } else if (severity <= 0) {
      setCurrentScreen('GAME_OVER_WIN');
    } else {
      setRound(prev => prev + 1);
      setCurrentScreen('IN_GAME');
    }
  };

  // Handle restart/return to menu
  const handleRestart = () => {
    setCurrentScreen('MAIN_MENU');
    setRound(1);
    setEnergy(75);
    setSeverity(60);
  };

  return (
    <div className="min-h-screen bg-[#050d0a] font-mono">
      <AnimatePresence mode="wait">
        {currentScreen === 'MAIN_MENU' && (
          <MainMenuScreen key="main-menu" onStartGame={handleStartGame} />
        )}

        {currentScreen === 'DIFFICULTY_SELECT' && (
          <DifficultySelectScreen
            key="difficulty-select"
            onSelectDifficulty={handleSelectDifficulty}
          />
        )}

        {currentScreen === 'IN_GAME' && (
          <InGameScreen
            key="in-game"
            energy={energy}
            severity={severity}
            difficulty={difficulty}
            round={round}
            onUseAction={handleUseAction}
            onNextRound={handleNextRound}
            onQuitToMenu={handleRestart}
          />
        )}

        {currentScreen === 'ROUND_RESOLVED' && (
          <RoundResolvedScreen
            key="round-resolved"
            round={round}
            events={roundEvents}
            newSeverity={severity}
            onContinue={handleContinueFromResolved}
          />
        )}

        {currentScreen === 'GAME_OVER_WIN' && (
          <GameOverWinScreen key="game-over-win" onRestart={handleRestart} />
        )}

        {currentScreen === 'GAME_OVER_LOSS' && (
          <GameOverLossScreen key="game-over-loss" onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </div>
  );
}