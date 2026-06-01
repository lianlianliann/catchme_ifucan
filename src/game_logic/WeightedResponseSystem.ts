// ─────────────────────────────────────────────────────────────────────────────
// WeightedResponseSystem.ts
// Changes:
//  1. evaluateAndScore now also builds and stores DefenseScore[] on state
//     (state.lastDefenseScores) so the UI can render an Immune Efficacy Report
//  2. Returns { dominantDefense, scores } instead of just the dominant key
//     (GameContext still only needs dominantDefense for NarrativeEngine)
// ─────────────────────────────────────────────────────────────────────────────

import { GameState, DefenseScore } from './GameLogic';

// Human-readable names for UI display
const DEFENSE_DISPLAY_NAMES: Record<string, string> = {
  WhiteBloodCells: "White Blood Cells",
  Antibodies:      "Antibodies",
  Inflammation:    "Inflammation",
  FeverResponse:   "Fever Response",
  MemoryCells:     "Memory Cells",
  CytokineBurst:   "Cytokine Burst",
};

// Mutation descriptions that appear as penalty annotations
const MUTATION_PENALTY_NOTES: Record<string, Record<string, string>> = {
  Evade_Phagocytosis_Mutation: {
    Antibodies:   "Evade Phagocytosis countered — Antibodies boosted",
    Inflammation: "Evade Phagocytosis countered — Inflammation boosted",
  },
  Antigenic_Drift_Mutation: {
    MemoryCells: "Antigenic Drift active — Memory Cells boosted",
    Antibodies:  "Antigenic Drift active (−40% efficiency)",
  },
  Antigenic_Shift_Mutation: {
    MemoryCells:    "Antigenic Shift — Memory Cells blinded",
    CytokineBurst:  "Antigenic Shift countered — Cytokine Burst boosted",
  },
  Thermal_Resistance_Mutation: {
    FeverResponse:    "Thermal Resistance active (−70% efficiency)",
    WhiteBloodCells:  "Thermal Resistance countered — WBCs boosted",
  },
  Heat_Shock_Proteins_Mutation: {
    FeverResponse: "Heat Shock Proteins active (−80% efficiency)",
    Antibodies:    "Heat Shock Proteins countered — Antibodies boosted",
  },
};

export class WeightedResponseSystem {
  private static BaseEffectiveness: Record<string, number> = {
    WhiteBloodCells: 1.0,
    Antibodies:      2.5,
    Inflammation:    2.0,
    FeverResponse:   3.5,
    MemoryCells:     1.5,
    CytokineBurst:   5.0,
  };

  private static ContextMultipliers: Record<string, Record<string, number>> = {
    Evade_Phagocytosis_Mutation: { Antibodies: 1.5,  Inflammation: 1.3 },
    Antigenic_Drift_Mutation:    { MemoryCells: 2.0, Antibodies: 0.6 },
    Antigenic_Shift_Mutation:    { MemoryCells: 0.5, CytokineBurst: 1.4 },
    Thermal_Resistance_Mutation: { FeverResponse: 0.3, WhiteBloodCells: 1.2 },
    Heat_Shock_Proteins_Mutation:{ FeverResponse: 0.2, Antibodies: 1.3 },
  };

  public evaluateAndScore(state: GameState): string | null {
    const rawScores: Record<string, number> = {};

    let lastDominant: string | null = null;
    if (Object.keys(state.lastUsedDefenses).length > 0) {
      lastDominant = Object.entries(state.lastUsedDefenses)
        .sort((a, b) => b[1] - a[1])[0][0];
    }

    Object.entries(state.playerDefenses).forEach(([defense, units]) => {
      if (units <= 0 || WeightedResponseSystem.BaseEffectiveness[defense] === undefined) return;

      let score = units * WeightedResponseSystem.BaseEffectiveness[defense];

      state.activeMutations.forEach(mutation => {
        const mult = WeightedResponseSystem.ContextMultipliers[mutation]?.[defense];
        if (mult !== undefined) score *= mult;
      });

      if (lastDominant && defense === lastDominant) {
        score *= 0.85;
      }

      rawScores[defense] = score;
    });

    state.lastUsedDefenses = rawScores;

    // ── Build structured DefenseScore[] for UI display ────────────────────
    const maxScore = Math.max(...Object.values(rawScores), 1);
    const defenseScores: DefenseScore[] = Object.entries(rawScores).map(([defenseType, score]) => {
      // Find the most relevant mutation note for this defense
      let mutationPenalty: string | null = null;
      for (const mutation of state.activeMutations) {
        const note = MUTATION_PENALTY_NOTES[mutation]?.[defenseType];
        if (note) {
          mutationPenalty = note;
          break; // show first match only
        }
      }

      return {
        defenseType,
        score: Math.round((score / maxScore) * 100),  // normalised 0-100
        mutationPenalty,
        isEffective: score / maxScore >= 0.5,
      };
    }).sort((a, b) => b.score - a.score);

    state.lastDefenseScores = defenseScores;

    const sorted = Object.entries(rawScores).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : null;
  }
}