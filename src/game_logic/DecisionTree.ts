import { GameState, DIFFICULTY_SETTINGS } from './GameLogic';

export class DecisionTree {
  public static Evade_Phagocytosis = "Evade_Phagocytosis_Mutation";
  public static Antigenic_Drift = "Antigenic_Drift_Mutation";
  public static Antigenic_Shift = "Antigenic_Shift_Mutation";
  public static Thermal_Resistance = "Thermal_Resistance_Mutation";
  public static Heat_Shock_Proteins = "Heat_Shock_Proteins_Mutation";
  public static Accelerated_Replication = "Accelerated_Replication_Mutation";
  public static Membrane_Hardening = "Membrane_Hardening_Mutation";
  public static Cytokine_Suppressor = "Cytokine_Suppressor_Mutation";

  // ── Counter map: exposed for use by NarrativeEngine tips ─────────────────
  public static MutationCounters: Record<string, string> = {
    [DecisionTree.Evade_Phagocytosis]:    "Antibodies",
    [DecisionTree.Antigenic_Drift]:       "MemoryCells",
    [DecisionTree.Antigenic_Shift]:       "CytokineBurst",
    [DecisionTree.Thermal_Resistance]:    "FeverResponse",
    [DecisionTree.Heat_Shock_Proteins]:   "FeverResponse",
    [DecisionTree.Membrane_Hardening]:    "CytokineBurst",
    [DecisionTree.Cytokine_Suppressor]:   "MemoryCells",
    [DecisionTree.Accelerated_Replication]: "WhiteBloodCells",
  };

  public getMutationDescription(mutation: string): string {
    switch (mutation) {
      case DecisionTree.Accelerated_Replication:
        return "Evolves viral replication velocity, expanding total presence payload footprint (+1 global infection index).";
      case DecisionTree.Antigenic_Drift:
        return "Alters capsule envelope structures, reducing player Antibody placement performance weights by 40%.";
      case DecisionTree.Antigenic_Shift:
        return "Complete capsule structural reorganizations, rendering deployed Memory Cell networks fully blind.";
      case DecisionTree.Evade_Phagocytosis:
        return "Synthesizes protective mucus coating shields, preventing baseline WBC matrices from absorbing pathogen cells.";
      case DecisionTree.Thermal_Resistance:
        return "Alters cell wall core layers to block thermal damage metrics triggered by Fever Responses.";
      case DecisionTree.Heat_Shock_Proteins:
        return "Synthesizes protein shields, making standard Fever Response loops completely useless.";
      case DecisionTree.Membrane_Hardening:
        return "Hardens cellular surfaces to completely ignore localized isolation containment from tissue Inflammation.";
      case DecisionTree.Cytokine_Suppressor:
        return "Re-engineers genomic parameters to cut nuclear damage metrics of Cytokine Bursts directly in half.";
      default:
        return "Adapts envelope blueprints to mitigate host immune system capabilities.";
    }
  }

  // ── NEW: Probabilistic mutation timing ───────────────────────────────────
  // Casual:   eligible from round 3, 40% chance/round, guaranteed by round 5
  // Epidemic: eligible from round 2, 60% chance/round, no hard cap
  //           (pressure builds +10% each round without a mutation)
  // Pandemic: eligible from round 1, rolls every round at 75%+, no cap
  private shouldMutateThisRound(state: GameState): boolean {
    const round = state.roundNumber;
    const diff  = state.difficulty;

    if (diff === 'Casual') {
      if (round < 3) return false;
      if (round >= 5) return true;           // guaranteed by round 5
      return Math.random() < 0.40;
    }

    if (diff === 'Epidemic') {
      if (round < 2) return false;
      // Pressure escalates: +10% per round past eligibility without a mutation
      const roundsSinceEligible = round - 2;
      const lastMutationRound   = state.lastMutationRound ?? 0;
      const roundsWithoutMutation = round - lastMutationRound;
      const escalation = Math.min(0.30, (roundsWithoutMutation - 1) * 0.10);
      return Math.random() < (0.60 + escalation);
    }

    // Pandemic: always eligible, high base rate
    const lastMutationRound   = state.lastMutationRound ?? 0;
    const roundsWithoutMutation = round - lastMutationRound;
    const escalation = Math.min(0.20, (roundsWithoutMutation - 1) * 0.05);
    return Math.random() < (0.75 + escalation);
  }

  public selectAndApplyMutation(state: GameState): string | null {
    if (!this.shouldMutateThisRound(state)) return null;

    const dominantDefense = Object.keys(state.lastUsedDefenses).length > 0
      ? Object.entries(state.lastUsedDefenses).sort((a, b) => b[1] - a[1])[0][0]
      : null;

    const chosenMutation = this.traverse(dominantDefense, state);
    if (!chosenMutation) return null;

    this.applyMutation(chosenMutation, state);
    // Track when the last mutation occurred for escalation math
    state.lastMutationRound = state.roundNumber;
    return chosenMutation;
  }

  private traverse(dominantDefense: string | null, state: GameState): string {
    const canCompound       = state.difficulty !== 'Casual';
    const canDoubleCompound = state.difficulty === 'Pandemic';

    if (!dominantDefense) return DecisionTree.Accelerated_Replication;

    switch (dominantDefense) {
      case "WhiteBloodCells":
        return DecisionTree.Evade_Phagocytosis;
      case "Antibodies":
        if (canCompound && state.activeMutations.includes(DecisionTree.Antigenic_Drift))
          return DecisionTree.Antigenic_Shift;
        return DecisionTree.Antigenic_Drift;
      case "Inflammation":
        return DecisionTree.Membrane_Hardening;
      case "FeverResponse":
        if (canCompound && state.activeMutations.includes(DecisionTree.Thermal_Resistance))
          return DecisionTree.Heat_Shock_Proteins;
        return DecisionTree.Thermal_Resistance;
      case "MemoryCells":
        if (canCompound && state.activeMutations.includes(DecisionTree.Antigenic_Drift))
          return DecisionTree.Antigenic_Shift;
        return DecisionTree.Antigenic_Drift;
      case "CytokineBurst":
        if (canDoubleCompound && state.activeMutations.includes(DecisionTree.Cytokine_Suppressor))
          return DecisionTree.Accelerated_Replication;
        return DecisionTree.Cytokine_Suppressor;
      default:
        return DecisionTree.Accelerated_Replication;
    }
  }

  private applyMutation(mutation: string, state: GameState): void {
    if (!state.activeMutations.includes(mutation)) {
      state.activeMutations.push(mutation);
    }
    state.activeMutationStacks[mutation] = (state.activeMutationStacks[mutation] || 0) + 1;

    if (mutation === DecisionTree.Accelerated_Replication) {
      state.infectionRate += 1;
    }
  }

  public calculateUncontestedSeverity(state: GameState, narratives: string[]): number {
    const counters = DecisionTree.MutationCounters;
    
    // First, isolate only the mutations that are actually unchecked this round
    const uncontestedMutations = state.activeMutations.filter(mutation => {
      const counter = counters[mutation];
      if (!counter) return false;
      const contested = state.playerDefenses[counter] !== undefined && state.playerDefenses[counter] > 0;
      return !contested;
    });

    if (uncontestedMutations.length === 0) return 0;

    // Apply exponential backpressure based on the number of stacked uncontested mutations
    const penalty = uncontestedMutations.reduce((total, mutation, index) => {
      // Base penalty of 3, multiplied by 1.4^index
      const compoundedPenalty = 3 * Math.pow(1.4, index);
      const shortName = mutation.replace('_Mutation', '').replace(/_/g, ' ');
      
      const displayPenalty = compoundedPenalty.toFixed(1);
      narratives.push(` -> [UNCONTESTED] "${shortName}" left unchecked! +${displayPenalty}% Severity (Cascading).`);
      
      return total + compoundedPenalty;
    }, 0);

    return penalty;
  }
}