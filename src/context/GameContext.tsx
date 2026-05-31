import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  GameState,
  DifficultyMode,
  buildInitialState,
  DIFFICULTY_SETTINGS,
  DEFENSE_EP_COSTS,
  DEFENSE_COOLDOWNS,
  CYTOKINE_SEVERITY_PENALTY,
} from '../game/GameLogic';
import { VirusAI }              from '../game/VirusAI';
import { VirusRL }              from '../game/VirusRL';
import { DecisionTree }         from '../game/DecisionTree';
import { WeightedResponseSystem } from '../game/WeightedResponseSystem';
import { NarrativeEngine }      from '../game/NarrativeEngine';

interface GameContextType {
  state: GameState;
  startNewGame: (difficulty: DifficultyMode) => void;
  deployDefenseUnit: (zoneName: string, defenseType: string) => void;
  processTurnSequence: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Singletons that don't depend on difficulty (VirusRL is re-created on new game)
const virusAI      = new VirusAI();
const decisionTree = new DecisionTree();
const wrs          = new WeightedResponseSystem();

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state,    setState]    = useState<GameState>(() => buildInitialState('Casual'));
  const [rlEngine, setRlEngine] = useState<VirusRL>(() => new VirusRL('Casual'));

  // ── Start new game ─────────────────────────────────────────────────────────
  const startNewGame = (difficulty: DifficultyMode) => {
    const initial = buildInitialState(difficulty);
    // Wire narrative for game start — populates currentTurnContext AND logFeed
    const withContext = NarrativeEngine.generateInitialContext(structuredClone(initial));
    setState(withContext);
    setRlEngine(new VirusRL(difficulty));
  };

  // ── Deploy a defense unit ──────────────────────────────────────────────────
  // epCost parameter removed — costs are now read from DEFENSE_EP_COSTS.
  // UI callers should import DEFENSE_EP_COSTS for display purposes only.
  const deployDefenseUnit = (zoneName: string, defenseType: string) => {
    setState(prev => {
      if (prev.gameStatus !== 'IN_PROGRESS') return prev;

      const next = structuredClone(prev);

      // ── 1. Cooldown gate ───────────────────────────────────────────────────
      const cooldownRemaining = next.defenseCooldowns[defenseType] ?? 0;
      if (cooldownRemaining > 0) {
        next.logFeed.push(
          `[COOLDOWN] ${defenseType} is still recovering. ` +
          `Available again in ${cooldownRemaining} round(s). ` +
          `(Biological basis: immune cells require time to replenish between deployments.)`
        );
        return next;
      }

      // ── 2. Calculate actual EP cost with escalating surcharge ─────────────
      const baseEpCost    = DEFENSE_EP_COSTS[defenseType] ?? 0;
      const timesUsed     = next.defenseUsedThisRound[defenseType] ?? 0;
      // +50% compounding per repeat use within the same round
      // 1st use: baseEpCost × 1.0, 2nd: × 1.5, 3rd: × 2.25, ...
      const surchargeMultiplier = Math.pow(1.5, timesUsed);
      const actualEpCost  = Math.ceil(baseEpCost * surchargeMultiplier);

      if (timesUsed > 0) {
        next.logFeed.push(
          `[DIMINISHING RETURNS] ${defenseType} already used ${timesUsed}× this round. ` +
          `Repeat deployment costs ${actualEpCost} EP ` +
          `(base ${baseEpCost} EP × ${surchargeMultiplier.toFixed(2)} surcharge). ` +
          `Scientific basis: repeated immune activation yields reduced marginal efficacy.`
        );
      }

      // ── 3. EP affordability check ─────────────────────────────────────────
      if (next.playerEp < actualEpCost) {
        next.logFeed.push(
          `[SYSTEM ERROR] Insufficient energy reserves for ${defenseType}. ` +
          `Required: ${actualEpCost} EP. Available: ${next.playerEp} EP.`
        );
        return next;
      }

      // ── 4. Deduct EP and apply defense ────────────────────────────────────
      next.playerEp -= actualEpCost;
      next.organGraph.zones[zoneName].activeDefenseCount +=
        (defenseType === 'WhiteBloodCells' ? 1 : 2);
      next.playerDefenses[defenseType] = (next.playerDefenses[defenseType] ?? 0) + 1;

      // ── 5. Apply Cytokine Burst severity penalty ──────────────────────────
      // Proposal rule: Cytokine Burst costs +10% Severity Index (autoimmune damage)
      if (defenseType === 'CytokineBurst') {
        next.severityIndex = Math.min(100, next.severityIndex + CYTOKINE_SEVERITY_PENALTY);
        next.logFeed.push(
          `[CYTOKINE WARNING] Cytokine Burst released. ` +
          `Collateral autoimmune damage: +${CYTOKINE_SEVERITY_PENALTY}% Severity Index. ` +
          `(Cytokine storms can damage healthy tissue — use sparingly.)`
        );
      }

      // ── 6. Register use for cooldown and surcharge tracking ───────────────
      next.defenseUsedThisRound[defenseType] = timesUsed + 1;
      next.defenseCooldowns[defenseType]     = DEFENSE_COOLDOWNS[defenseType] ?? 1;

      next.logFeed.push(
        `[PLAYER ACTION] Dispatched ${defenseType} reinforcement units to the ${zoneName}. ` +
        `Cost: ${actualEpCost} EP. Cooldown: ${DEFENSE_COOLDOWNS[defenseType]} round(s).`
      );

      return next;
    });
  };

  // ── Process end-of-round sequence ─────────────────────────────────────────
  const processTurnSequence = () => {
    setState(prev => {
      if (prev.gameStatus !== 'IN_PROGRESS') return prev;

      // Snapshot of state before virus acts (used by NarrativeEngine diff)
      const prevSnapshot = structuredClone(prev);

      let next = structuredClone(prev);
      const settings = DIFFICULTY_SETTINGS[next.difficulty];
      const turnNarratives: string[] = [];

      turnNarratives.push(`\n==================================================`);
      turnNarratives.push(`📋 END-OF-ROUND REPORT: ROUND ${next.roundNumber}`);
      turnNarratives.push(`==================================================`);

      // ── Phase 0: Tick down cooldowns (start of new round processing) ───────
      Object.keys(next.defenseCooldowns).forEach(defType => {
        if (next.defenseCooldowns[defType] > 0) {
          next.defenseCooldowns[defType] -= 1;
        }
      });

      // ── Reset per-round use tracker ────────────────────────────────────────
      next.defenseUsedThisRound = {};

      // ── Phase 11a: Uncontested mutation severity penalty ──────────────────
      const mutationPenalty = decisionTree.calculateUncontestedSeverity(next, turnNarratives);
      const wasContested    = mutationPenalty === 0;

      if (mutationPenalty > 0) {
        next.severityIndex += mutationPenalty;
      }
      next.severityIndex = Math.min(100, Math.max(0, next.severityIndex));

      // ── Win/Loss boundary checks ───────────────────────────────────────────
      if (next.infectionRate <= 0) {
        next.gameStatus = 'WIN';
        turnNarratives.push('✓ MISSION SUCCESS — All cellular replication vectors cleared.');
        next.logFeed.push(...turnNarratives);
        return next;
      }

      if (next.severityIndex >= 100) {
        next.gameStatus = 'LOSS';
        next.severityIndex = 100;
        turnNarratives.push('✗ EMERGENCY COLLAPSE — Severity has reached 100% vital shutdown limits.');
        next.logFeed.push(...turnNarratives);
        return next;
      }

      // ── ADVANCE SIMULATION CLOCK ───────────────────────────────────────────
      next.roundNumber  += 1;
      next.playerDefenses = {};

      // ── Phase 2: EP income generation ─────────────────────────────────────
      const healthyCount = Object.values(next.organGraph.zones)
        .filter(z => !z.isInfected).length;
      const epGained     = healthyCount * settings.epPerHealthyOrgan;
      next.playerEp     += epGained;
      turnNarratives.push(
        `[ENERGY BIOMETRICS] +${epGained} EP distributed from ${healthyCount} clean organs.`
      );

      // ── Phase 3 & 4: RL strategy selection + Minimax evaluation ───────────
      const minimaxSuggestion = virusAI.calculateBestMove(next, settings.minimaxDepth);
      const strategicAction   = rlEngine.selectAction(next, minimaxSuggestion);
      next.minimaxRecommendedTarget = strategicAction;

      // ── Phase 5: BFS spread execution ─────────────────────────────────────
      const spreadLogs    = virusAI.executeSpreadVirus(next);
      const spreadOccurred = spreadLogs.some(l => l.includes('[BREACH]'));
      turnNarratives.push(...spreadLogs);

      // ── Phase 6: Decision Tree mutation ───────────────────────────────────
      const newlyAppliedMutation = decisionTree.selectAndApplyMutation(next);
      if (newlyAppliedMutation) {
        const structuralName  = newlyAppliedMutation.replace('_Mutation', '').replace(/_/g, ' ');
        const functionalDesc  = decisionTree.getMutationDescription(newlyAppliedMutation);
        turnNarratives.push(`[GENETIC ALTERATION] Pathogen expressed: "${structuralName}"`);
        turnNarratives.push(` -> Effect Profile: ${functionalDesc}`);
      }

      // ── Clean-round streak + severity decrease ────────────────────────────
      // A "clean round" = no new BFS spread AND no uncontested mutations
      const isCleanRound = !spreadOccurred && wasContested;
      if (isCleanRound) {
        next.cleanRoundsStreak += 1;
        const decrease = Math.min(next.cleanRoundsStreak * 2, 6);
        next.severityIndex = Math.max(0, next.severityIndex - decrease);
        turnNarratives.push(
          `[RECOVERY] Clean round! Streak: ${next.cleanRoundsStreak}. ` +
          `Host immune system reclaiming ground: -${decrease}% Severity.`
        );
      } else {
        next.cleanRoundsStreak = 0;
      }

      // ── Phase 9: Weighted Response System scoring ─────────────────────────
      const dominantDefense = wrs.evaluateAndScore(next);

      // ── Diagnostic totals ──────────────────────────────────────────────────
      turnNarratives.push(
        `[DIAGNOSTIC TOTALS] Active mutations in payload genome: ${next.activeMutations.length}`
      );
      turnNarratives.push(`==================================================\n`);

      // Push the raw turn log lines first
      next.logFeed.push(...turnNarratives);

      // ── Phase 11b: RL Q-table update ──────────────────────────────────────
      // FIXED: now fires AFTER full round resolution (was before BFS spread)
      rlEngine.updateQTable(next);

      // ── Narrative Engine: round summary ───────────────────────────────────
      // Populates state.currentTurnContext AND appends formatted banner to logFeed.
      // This is the popup workaround — when modal UI is ready, it reads
      // state.currentTurnContext directly and injectContextToLogFeed can be removed.
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