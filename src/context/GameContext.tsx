import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  GameState,
  DifficultyMode,
  buildInitialState,
  DIFFICULTY_SETTINGS,
  DEFENSE_EP_COSTS,
  DEFENSE_COOLDOWNS,
  CYTOKINE_SEVERITY_PENALTY,
  ZONE_RESISTANCE,
  ZONE_INFECTION_WEIGHT,
  RECLAMATION_THRESHOLD,
  computeProjectedEp,
} from '../game_logic/GameLogic';
import { VirusAI }                from '../game_logic/VirusAI';
import { VirusRL }                from '../game_logic/VirusRL';
import { DecisionTree }           from '../game_logic/DecisionTree';
import { WeightedResponseSystem } from '../game_logic/WeightedResponseSystem';
import { NarrativeEngine }        from '../game_logic/NarrativeEngine';

interface GameContextType {
  state: GameState;
  startNewGame: (difficulty: DifficultyMode) => void;
  deployDefenseUnit: (zoneName: string, defenseType: string) => void;
  processTurnSequence: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const virusAI      = new VirusAI();
const decisionTree = new DecisionTree();
const wrs          = new WeightedResponseSystem();

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state,    setState]    = useState<GameState>(() => buildInitialState('Casual'));
  const [rlEngine, setRlEngine] = useState<VirusRL>(() => new VirusRL('Casual'));

  const startNewGame = (difficulty: DifficultyMode) => {
    const initial    = buildInitialState(difficulty);
    const withContext = NarrativeEngine.generateInitialContext(structuredClone(initial));
    setState(withContext);
    setRlEngine(new VirusRL(difficulty));
  };

  const deployDefenseUnit = (zoneName: string, defenseType: string) => {
    setState(prev => {
      if (prev.gameStatus !== 'IN_PROGRESS') return prev;

      const next = structuredClone(prev);

      const cooldownRemaining = next.defenseCooldowns[defenseType] ?? 0;
      if (cooldownRemaining > 0) {
        next.logFeed.push(`[COOLDOWN] ${defenseType} is still recovering. Available again in ${cooldownRemaining} round(s).`);
        return next;
      }

      const baseEpCost          = DEFENSE_EP_COSTS[defenseType] ?? 0;
      const timesUsed           = next.defenseUsedThisRound[defenseType] ?? 0;
      const surchargeMultiplier = Math.pow(1.5, timesUsed);
      const actualEpCost        = Math.ceil(baseEpCost * surchargeMultiplier);

      if (timesUsed > 0) {
        next.logFeed.push(`[DIMINISHING RETURNS] ${defenseType} already used ${timesUsed}× this round. Repeat deployment costs ${actualEpCost} EP.`);
      }

      if (next.playerEp < actualEpCost) {
        next.logFeed.push(`[SYSTEM ERROR] Insufficient energy reserves for ${defenseType}. Required: ${actualEpCost} EP. Available: ${next.playerEp} EP.`);
        return next;
      }

      next.playerEp -= actualEpCost;
      next.organGraph.zones[zoneName].activeDefenseCount += (defenseType === 'WhiteBloodCells' ? 1 : 2);
      next.playerDefenses[defenseType] = (next.playerDefenses[defenseType] ?? 0) + 1;

      if (defenseType === 'CytokineBurst') {
        next.severityIndex = Math.min(100, next.severityIndex + CYTOKINE_SEVERITY_PENALTY);
        next.logFeed.push(`[CYTOKINE WARNING] Cytokine Burst released. Collateral autoimmune damage: +${CYTOKINE_SEVERITY_PENALTY}% Severity Index.`);
      }

      next.defenseUsedThisRound[defenseType] = timesUsed + 1;
      const appliedCooldown = DEFENSE_COOLDOWNS[next.difficulty][defenseType] ?? 1;
      next.defenseCooldowns[defenseType] = appliedCooldown;

      next.logFeed.push(`[PLAYER ACTION] Dispatched ${defenseType} reinforcement units to the ${zoneName}. Cost: ${actualEpCost} EP. Cooldown: ${appliedCooldown} round(s).`);

      // Update projected EP after spending
      next.projectedEpNextRound = computeProjectedEp(next);

      return next;
    });
  };

  const processTurnSequence = () => {
    setState(prev => {
      if (prev.gameStatus !== 'IN_PROGRESS') return prev;

      const prevSnapshot = structuredClone(prev);
      let next           = structuredClone(prev);
      const settings     = DIFFICULTY_SETTINGS[next.difficulty];
      const turnNarratives: string[] = [];

      turnNarratives.push(`\n==================================================`);
      turnNarratives.push(`📋 END-OF-ROUND REPORT: ROUND ${next.roundNumber}`);
      turnNarratives.push(`==================================================`);

      // ── Phase 0: Tick down cooldowns ─────────────────────────────────────
      Object.keys(next.defenseCooldowns).forEach(defType => {
        if (next.defenseCooldowns[defType] > 0) next.defenseCooldowns[defType] -= 1;
      });
      next.defenseUsedThisRound = {};

      // ── Phase 2: EP income ────────────────────────────────────────────────
      const healthyOrgans   = Object.values(next.organGraph.zones).filter(z => !z.isInfected);
      const organEpGained   = healthyOrgans.reduce((t, z) => t + z.epGeneration, 0);
      const baseMetabolism  = 10;
      const totalEpGained   = organEpGained + baseMetabolism;
      next.playerEp        += totalEpGained;

      turnNarratives.push(`[ENERGY BIOMETRICS] +${totalEpGained} EP Recovered. (+${baseMetabolism} Base Metabolism, +${organEpGained} from ${healthyOrgans.length} clean organs).`);

      // ── Phase 3 & 4: RL + Minimax ─────────────────────────────────────────
      const minimaxSuggestion = virusAI.calculateBestMove(next, settings.minimaxDepth);
      const strategicAction   = rlEngine.selectAction(next, minimaxSuggestion);
      next.minimaxRecommendedTarget = strategicAction;

      // ── Phase 5: BFS spread ───────────────────────────────────────────────
      const spreadLogs    = virusAI.executeSpreadVirus(next);
      const spreadOccurred = spreadLogs.some(l => l.includes('[BREACH]'));
      turnNarratives.push(...spreadLogs);

      // ── Phase 6: Decision Tree mutation ───────────────────────────────────
      const newlyAppliedMutation = decisionTree.selectAndApplyMutation(next);
      if (newlyAppliedMutation) {
        const structuralName = newlyAppliedMutation.replace('_Mutation', '').replace(/_/g, ' ');
        const functionalDesc = decisionTree.getMutationDescription(newlyAppliedMutation);
        turnNarratives.push(`[GENETIC ALTERATION] Pathogen expressed: "${structuralName}"`);
        turnNarratives.push(` -> Effect Profile: ${functionalDesc}`);
      }

      // ── Phase 7: Zone Reclamation ─────────────────────────────────────────
      Object.entries(next.organGraph.zones).forEach(([zoneName, zone]) => {
        if (zone.isInfected) {
          const defense    = zone.activeDefenseCount;
          const resistance = ZONE_RESISTANCE[zoneName];
          const pressure   = defense - resistance;

          if (pressure > 0) {
            zone.reclamationProgress += pressure;
            if (zone.reclamationProgress >= RECLAMATION_THRESHOLD) {
              zone.isInfected            = false;
              zone.reclamationProgress   = 0;
              zone.activeDefenseCount    = Math.ceil(zone.activeDefenseCount * 0.5);
              next.infectionRate         = Math.max(0, next.infectionRate - ZONE_INFECTION_WEIGHT[zoneName]);
              turnNarratives.push(`[RECLAIMED] Sustained immune pressure cleared the ${zoneName}! Remaining cells transition to resident memory.`);
            }
          } else {
            zone.reclamationProgress = Math.max(0, zone.reclamationProgress + pressure - 1);
          }
        }
      });

      const remainingInfected = Object.values(next.organGraph.zones).filter(z => z.isInfected).length;
      if (remainingInfected === 0) next.infectionRate = 0;

      // ── Phase 8: Uncontested mutation severity penalty ────────────────────
      const mutationPenalty = decisionTree.calculateUncontestedSeverity(next, turnNarratives);
      const wasContested    = mutationPenalty === 0;
      if (mutationPenalty > 0) next.severityIndex += mutationPenalty;
      next.severityIndex = Math.min(100, Math.max(0, next.severityIndex));

      // ── Win/Loss ──────────────────────────────────────────────────────────
      if (next.infectionRate <= 0) {
        next.gameStatus = 'WIN';
        turnNarratives.push('✓ MISSION SUCCESS — All cellular replication vectors cleared.');
        next.logFeed.push(...turnNarratives);
        return next;
      }

      if (next.severityIndex >= 100) {
        next.gameStatus     = 'LOSS';
        next.severityIndex  = 100;
        turnNarratives.push('✗ EMERGENCY COLLAPSE — Severity has reached 100% vital shutdown limits.');
        next.logFeed.push(...turnNarratives);
        return next;
      }

      next.roundNumber   += 1;
      next.playerDefenses = {};

      // ── Clean-round streak + severity decrease ────────────────────────────
      const isCleanRound = !spreadOccurred && wasContested;
      if (isCleanRound) {
        next.cleanRoundsStreak += 1;
        const decrease = Math.min(next.cleanRoundsStreak * 2, 6);
        next.severityIndex = Math.max(0, next.severityIndex - decrease);
        turnNarratives.push(`[RECOVERY] Clean round! Streak: ${next.cleanRoundsStreak}. Host immune system reclaiming ground: -${decrease}% Severity.`);
      } else {
        next.cleanRoundsStreak = 0;
      }

      const dominantDefense = wrs.evaluateAndScore(next);

      turnNarratives.push(`[DIAGNOSTIC TOTALS] Active mutations in payload genome: ${next.activeMutations.length}`);
      turnNarratives.push(`==================================================\n`);

      next.logFeed.push(...turnNarratives);

      // ── Update projected EP for next round sidebar display ────────────────
      next.projectedEpNextRound = computeProjectedEp(next);

      rlEngine.updateQTable(next);

      NarrativeEngine.generateRoundSummary(
        prevSnapshot,
        next,
        dominantDefense,
        newlyAppliedMutation,
        next.cleanRoundsStreak
      );

      return next;
    });
  };

  return (
    <GameContext.Provider value={{ state, startNewGame, deployDefenseUnit, processTurnSequence }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame layout context mismatch error.");
  return context;
};