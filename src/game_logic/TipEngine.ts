// ─────────────────────────────────────────────────────────────────────────────
// TipEngine.ts
// Generates contextual, state-aware tips for the RoundResolvedScreen.
// Only used for Casual and Epidemic difficulties (never Pandemic).
//
// Priority order:
//  1. Critical severity (>75%) — direct emergency guidance
//  2. Active mutation with un-used counter — surfaces the counter
//  3. Reclamation progress — keep pushing zones under attack
//  4. EP over-spending on surcharges — diversify advice
//  5. Fallback — rotating general strategy
//
// Casual tips are explicit ("use X to counter Y").
// Epidemic tips are subtler ("consider varying your approach").
// ─────────────────────────────────────────────────────────────────────────────

import { GameState, DifficultyMode } from './GameLogic';
import { DecisionTree } from './DecisionTree';

export type TipCategory =
  | 'critical_severity'
  | 'mutation_counter'
  | 'reclamation'
  | 'ep_efficiency'
  | 'good_play'
  | 'general';

export interface Tip {
  category: TipCategory;
  text: string;
  highlight?: string; // bolded fragment, if any
}

const DEFENSE_READABLE: Record<string, string> = {
  WhiteBloodCells: "White Blood Cells",
  Antibodies:      "Antibodies",
  Inflammation:    "Inflammation",
  FeverResponse:   "Fever Response",
  MemoryCells:     "Memory Cells",
  CytokineBurst:   "Cytokine Burst",
};

const MUTATION_READABLE: Record<string, string> = {
  Evade_Phagocytosis_Mutation:    "Evade Phagocytosis",
  Antigenic_Drift_Mutation:       "Antigenic Drift",
  Antigenic_Shift_Mutation:       "Antigenic Shift",
  Thermal_Resistance_Mutation:    "Thermal Resistance",
  Heat_Shock_Proteins_Mutation:   "Heat Shock Proteins",
  Accelerated_Replication_Mutation: "Accelerated Replication",
  Membrane_Hardening_Mutation:    "Membrane Hardening",
  Cytokine_Suppressor_Mutation:   "Cytokine Suppressor",
};

const GENERAL_TIPS: string[] = [
  "Spread your defenses across multiple zones — the virus targets the path of least resistance.",
  "Healthy organs generate EP each round. Protecting them early keeps your economy strong.",
  "The virus adapts to your dominant strategy. Rotating defenses slows its mutation pressure.",
  "White Blood Cells are cheap and don't expire — stacking them can hold a zone in place.",
  "Reclamation requires sustained pressure above the zone's resistance threshold — commit to a zone, don't spread thin.",
  "Memory Cells are most valuable after you've seen 2+ mutations — plan them for later rounds.",
];

export class TipEngine {
  /**
   * Generate one tip for the current state.
   * Returns null if no tip should be shown (round 1, Pandemic, or nothing relevant).
   */
  public static generateTip(
    state: GameState,
    lastTipCategory: TipCategory | null
  ): Tip | null {
    // Never show tips on Pandemic or round 1
    if (state.difficulty === 'Pandemic') return null;
    if (state.roundNumber <= 1)          return null;

    const isCasual   = state.difficulty === 'Casual';

    // ── Priority 1: Critical severity ─────────────────────────────────────
    if (state.severityIndex >= 75 && lastTipCategory !== 'critical_severity') {
      if (isCasual) {
        return {
          category: 'critical_severity',
          text: `Severity is at ${state.severityIndex}% — the host is close to collapse. Prioritise reclaiming infected zones and counter every active mutation this round.`,
          highlight: `${state.severityIndex}%`,
        };
      } else {
        return {
          category: 'critical_severity',
          text: `Systemic load is critically elevated. The current defensive posture may be insufficient.`,
        };
      }
    }

    // ── Priority 2: Active mutation with unused counter ────────────────────
    for (const mutation of state.activeMutations) {
      const counter = DecisionTree.MutationCounters[mutation];
      if (!counter) continue;

      const counterUsedThisRound = (state.playerDefenses[counter] ?? 0) > 0;
      // If the counter wasn't used last round either (lastUsedDefenses is from prev round)
      const counterUsedLastRound = (state.lastUsedDefenses[counter] ?? 0) > 0;

      if (!counterUsedThisRound && !counterUsedLastRound && lastTipCategory !== 'mutation_counter') {
        const mutName     = MUTATION_READABLE[mutation]  ?? mutation;
        const counterName = DEFENSE_READABLE[counter]    ?? counter;

        if (isCasual) {
          return {
            category: 'mutation_counter',
            text: `The active mutation "${mutName}" is going unchallenged — deploy ${counterName} to contest it and prevent the +3% severity penalty.`,
            highlight: counterName,
          };
        } else {
          return {
            category: 'mutation_counter',
            text: `An active mutation appears to be reducing the effectiveness of your current approach. Consider diversifying your immune deployment.`,
          };
        }
      }

      // Acknowledge good play if the counter WAS used
      if (counterUsedLastRound && lastTipCategory !== 'good_play') {
        const mutName     = MUTATION_READABLE[mutation]  ?? mutation;
        const counterName = DEFENSE_READABLE[counter]    ?? counter;
        if (isCasual) {
          return {
            category: 'good_play',
            text: `Good call — your ${counterName} deployment is correctly contesting "${mutName}" this round.`,
            highlight: counterName,
          };
        }
        // Epidemic: no good-play tip (keep it harder)
      }
    }

    // ── Priority 3: Reclamation in progress ───────────────────────────────
    const reclamationZones = Object.entries(state.organGraph.zones)
      .filter(([, z]) => z.isInfected && z.reclamationProgress > 0 && z.reclamationProgress < 10);

    if (reclamationZones.length > 0 && lastTipCategory !== 'reclamation') {
      const [zoneName, zone] = reclamationZones[0];
      const pct = Math.round((zone.reclamationProgress / 10) * 100);

      if (isCasual) {
        return {
          category: 'reclamation',
          text: `${zoneName} is ${pct}% cleared — keep the pressure up! You need more defenders than its resistance threshold to continue making progress.`,
          highlight: zoneName,
        };
      } else {
        return {
          category: 'reclamation',
          text: `One zone shows partial immune progress. Sustained pressure is required to finish clearing it.`,
        };
      }
    }

    // ── Priority 4: EP surcharge warning ─────────────────────────────────
    const surchargeDefenses = Object.entries(state.defenseUsedThisRound)
      .filter(([, uses]) => uses >= 2);

    if (surchargeDefenses.length > 0 && lastTipCategory !== 'ep_efficiency') {
      const [defense] = surchargeDefenses[0];
      const name = DEFENSE_READABLE[defense] ?? defense;

      if (isCasual) {
        return {
          category: 'ep_efficiency',
          text: `Deploying ${name} multiple times per round triggers an EP surcharge. Consider splitting EP across different defense types for better efficiency.`,
          highlight: name,
        };
      } else {
        return {
          category: 'ep_efficiency',
          text: `Repeated use of the same defense type costs significantly more EP. Varying your approach preserves resources.`,
        };
      }
    }

    // ── Priority 5: Fallback ──────────────────────────────────────────────
    if (lastTipCategory !== 'general') {
      const idx = (state.roundNumber - 2) % GENERAL_TIPS.length;
      return {
        category: 'general',
        text: GENERAL_TIPS[idx],
      };
    }

    return null;
  }
}