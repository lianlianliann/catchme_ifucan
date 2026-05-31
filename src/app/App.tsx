import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { MainMenuScreen } from './game/MainMenuScreen';
import { DifficultySelectScreen } from './game/DifficultySelectScreen';
import { InGameScreen } from './game/InGameScreen';
import { RoundResolvedScreen } from './game/RoundResolvedScreen';
import { GameOverWinScreen } from './game/GameOverWinScreen';
import { GameOverLossScreen } from './game/GameOverLossScreen';
import { GameProvider, useGame } from '../context/GameContext'; 
import { DifficultyMode } from '../game_logic/GameLogic';

type Screen = 'MAIN_MENU' | 'DIFFICULTY_SELECT' | 'IN_GAME' | 'ROUND_RESOLVED' | 'GAME_OVER_WIN' | 'GAME_OVER_LOSS';

// We separate this so useGame() is called INSIDE the GameProvider
function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('MAIN_MENU');
  const { state, startNewGame, processTurnSequence } = useGame();

  const handleStartGame = () => {
    setCurrentScreen('DIFFICULTY_SELECT');
  };

  const handleSelectDifficulty = (selectedDifficulty: DifficultyMode) => {
    startNewGame(selectedDifficulty);
    setCurrentScreen('IN_GAME');
  };

  const handleNextRound = () => {
    // 1. Run the backend logic for the turn
    processTurnSequence();
    // 2. Switch to the popup screen
    setCurrentScreen('ROUND_RESOLVED');
  };

  const handleContinueFromResolved = () => {
    // Check win/loss status calculated by processTurnSequence
    if (state.gameStatus === 'LOSS') {
      setCurrentScreen('GAME_OVER_LOSS');
    } else if (state.gameStatus === 'WIN') {
      setCurrentScreen('GAME_OVER_WIN');
    } else {
      setCurrentScreen('IN_GAME');
    }
  };

  const handleRestart = () => {
    setCurrentScreen('MAIN_MENU');
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
            onNextRound={handleNextRound}
            onQuitToMenu={handleRestart}
          />
        )}

        {currentScreen === 'ROUND_RESOLVED' && (
          <RoundResolvedScreen
            key="round-resolved"
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

// Wrap the app in the context provider
export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}