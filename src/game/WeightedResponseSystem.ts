// ─────────────────────────────────────────────────────────────────────────────
// WeightedResponseSystem.ts
// Changes from previous version:
//  1. evaluateAndScore return type changed from `string | null` to `string | null`
//     (was already typed this way but returned value was unused — GameContext
//      now captures and forwards it to NarrativeEngine.generateRoundSummary)
//  No logic changes — all base effectiveness values and context multipliers
//  are unchanged from the original.
// ─────────────────────────────────────────────────────────────────────────────

import { GameState } from './GameLogic';

export class WeightedResponseSystem {

  // Base effectiveness per defense type
  // (calibrated against proposal Table 1 EP costs — higher cost = higher base)
  private static BaseEffectiveness: Record<string, number> = {
    WhiteBloodCells: 1.0,
    Antibodies:      2.5,
    Inflammation:    2.0,
    FeverResponse:   3.5,
    MemoryCells:     1.5,
    CytokineBurst:   5.0,
  };

  // Context multipliers: active mutations modify defense effectiveness
  // e.g. Antigenic_Drift weakens Antibodies but boosts MemoryCells
  private static ContextMultipliers: Record<string, Record<string, number>> = {
    Evade_Phagocytosis_Mutation: { Antibodies: 1.5,  Inflammation: 1.3 },
    Antigenic_Drift_Mutation:    { MemoryCells: 2.0, Antibodies: 0.6 },
    Antigenic_Shift_Mutation:    { MemoryCells: 0.5, CytokineBurst: 1.4 },
    Thermal_Resistance_Mutation: { FeverResponse: 0.3, WhiteBloodCells: 1.2 },
    Heat_Shock_Proteins_Mutation:{ FeverResponse: 0.2, Antibodies: 1.3 },
  };

  /**
   * Score each defense the player used this round by weighted effectiveness.
   * Updates state.lastUsedDefenses with the scores.
   * Returns the dominant defense key (highest score) or null if nothing was used.
   * The return value is consumed by GameContext → NarrativeEngine.
   */
  public evaluateAndScore(state: GameState): string | null {
    const scores: Record<string, number> = {};

    // Determine last round's dominant defense for the diminishing-returns penalty
    let lastDominant: string | null = null;
    if (Object.keys(state.lastUsedDefenses).length > 0) {
      lastDominant = Object.entries(state.lastUsedDefenses)
        .sort((a, b) => b[1] - a[1])[0][0];
    }

    Object.entries(state.playerDefenses).forEach(([defense, units]) => {
      if (units <= 0 || WeightedResponseSystem.BaseEffectiveness[defense] === undefined) return;

      let score = units * WeightedResponseSystem.BaseEffectiveness[defense];

      // Apply mutation context multipliers
      state.activeMutations.forEach(mutation => {
        const mult = WeightedResponseSystem.ContextMultipliers[mutation]?.[defense];
        if (mult !== undefined) score *= mult;
      });

      // Diminishing returns: over-reliance on the previous round's dominant defense
      if (lastDominant && defense === lastDominant) {
        score *= 0.85;
      }

      scores[defense] = score;
    });

    state.lastUsedDefenses = scores;

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : null;
  }
}