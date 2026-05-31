// ─────────────────────────────────────────────────────────────────────────────
// NarrativeEngine.ts
// Changes from previous version:
//  1. Now imports TurnContext from GameLogic (was using an inline type that
//     didn't exist on GameState — this was the root cause of it being dead code)
//  2. generateInitialContext and generateRoundSummary now:
//       a) populate state.currentTurnContext (structured field for future popup UI)
//       b) inject the same content into state.logFeed as formatted banner blocks
//          (the workaround while popup frontend is unavailable)
//  3. Added injectContextToLogFeed() — the bridge between the two channels
//  4. generateRoundSummary now receives cleanRoundsStreak so it can report
//     whether a severity decrease is being applied
// ─────────────────────────────────────────────────────────────────────────────

import { GameState, TurnContext } from './GameLogic';
import { DecisionTree } from './DecisionTree';

export class NarrativeEngine {

  // ── ROUND START: called once when a new game begins ──────────────────────
  public static generateInitialContext(state: GameState): GameState {
    const infectedZones = Object.keys(state.organGraph.zones).filter(
      (k) => state.organGraph.zones[k].isInfected
    );

    const zoneList = infectedZones.length === 1
      ? infectedZones[0]
      : infectedZones.slice(0, -1).join(', ') + ` and ${infectedZones[infectedZones.length - 1]}`;

    const virusActions = [
      `A virulent pathogen has breached the host's primary epithelial barriers.`,
      `Initial viral colonies have anchored within: ${zoneList}.`,
      `No mutations expressed yet — the virus is cataloguing your immune response patterns.`,
      `Expect the first genetic adaptation within ${state.difficulty === 'Casual' ? '2 rounds' : '1 round'}.`,
    ];

    const bodyCondition = infectedZones.map(zone =>
      NarrativeEngine.getDynamicOrganText(zone, state.organGraph.zones[zone], 1, [])
    );

    const sev = state.severityIndex;
    const severityAssessment =
      `Initial Severity Index: ${sev}%. ` +
      (infectedZones.includes('Brain')
        ? `⚠️ WARNING: Brain compromised at game start — Severity is already critically elevated. Immediate maximum response required.`
        : `Immediate defense deployment is recommended. The virus will begin adapting from Round 1.`);

    const ctx: TurnContext = {
      title: "🚨 EMERGENCY PATHOLOGY BRIEFING — INFECTION DETECTED",
      virusActions,
      bodyCondition,
      severityAssessment,
    };

    state.currentTurnContext = ctx;
    NarrativeEngine.injectContextToLogFeed(state, ctx);
    return state;
  }

  // ── ROUND END: called after processTurnSequence resolves each round ───────
  public static generateRoundSummary(
    prevState: GameState,
    nextState: GameState,
    lastDominantDefense: string | null,
    newMutation: string | null,
    cleanRoundsStreak: number
  ): GameState {
    const virusActions: string[] = [];
    const bodyCondition: string[] = [];

    // 1. Virus origin anchor — where it currently lives ──────────────────────
    const infectedZones = Object.keys(nextState.organGraph.zones)
      .filter(k => nextState.organGraph.zones[k].isInfected);
    const infectedCount = infectedZones.length;

    if (infectedCount === 0) {
      virusActions.push(`[CLEARED] All viral colonies have been eradicated from host tissue.`);
    } else if (infectedCount === 1) {
      virusActions.push(
        `[CONTAINED] Pathogen activity is isolated within the ${infectedZones[0]}. ` +
        `It has not yet found a breach vector into adjacent tissue.`
      );
    } else {
      const zoneList = infectedZones.slice(0, -1).join(', ') + ` and ${infectedZones[infectedZones.length - 1]}`;
      virusActions.push(
        `[ACTIVE] Viral colonies are entrenched across ${infectedCount} zones: ${zoneList}. ` +
        `Multi-front pressure is compounding host strain.`
      );
    }

    // 2. What the virus did this round (BFS spread diff) ─────────────────────
    const newlyInfected: string[] = [];
    const reclaimed: string[] = [];

    Object.keys(nextState.organGraph.zones).forEach((zoneName) => {
      const wasInfected = prevState.organGraph.zones[zoneName].isInfected;
      const isNowInfected = nextState.organGraph.zones[zoneName].isInfected;
      if (!wasInfected && isNowInfected) newlyInfected.push(zoneName);
      if (wasInfected && !isNowInfected)  reclaimed.push(zoneName);
    });

    newlyInfected.forEach(zoneName => {
      const defCount = prevState.organGraph.zones[zoneName].activeDefenseCount;
      const reason = defCount === 0
        ? `the zone had no active defenders`
        : `your ${defCount} defense unit${defCount > 1 ? 's' : ''} there were overwhelmed`;
      virusActions.push(`[BREACH] ${zoneName} fell — ${reason}.`);
      if (zoneName === "Brain") {
        virusActions.push(
          `[CRITICAL] ⚠ Blood-Brain barrier penetrated. CNS tissue under direct attack. Severity +25%.`
        );
      }
    });

    reclaimed.forEach(zoneName => {
      virusActions.push(`[REPELLED] Sustained immune pressure drove the pathogen out of ${zoneName}.`);
    });

    if (newlyInfected.length === 0 && reclaimed.length === 0) {
      // Vary the stable message based on round number and current infection count
      const roundMod = prevState.roundNumber % 4;
      const stableVariants = [
        `[STABLE] Your defensive perimeter held — the pathogen found no viable breach vector this round.`,
        `[STABLE] No new incursions. The virus is probing for gaps but your coverage is holding.`,
        `[STABLE] Viral expansion stalled. Immune cell pressure is matching pathogen replication output.`,
        `[STABLE] Containment maintained. The pathogen remains locked in its current footprint.`,
      ];
      virusActions.push(stableVariants[roundMod]);
    }

    // 3. Mutations — what the virus expressed and why ─────────────────────────
    if (newMutation) {
      const name = newMutation.replace('_Mutation', '').replace(/_/g, ' ');
      if (newMutation === DecisionTree.Accelerated_Replication) {
        virusActions.push(
          `[NEW MUTATION] "${name}": An uncontested window let the virus optimise its transcription ` +
          `machinery. Replication rate increased — infection footprint will expand further.`
        );
      } else if (lastDominantDefense) {
        const readableDefense = lastDominantDefense.replace(/([A-Z])/g, ' $1').trim();
        virusActions.push(
          `[ADAPTATION] Your repeated use of ${readableDefense} was logged. ` +
          `The virus expressed "${name}" to neutralise it.`
        );
      } else {
        virusActions.push(`[NEW MUTATION] Pathogen expressed: "${name}" — probing for systemic weaknesses.`);
      }
    }

    if (nextState.activeMutations.length === 0) {
      virusActions.push(`[MUTATIONS] Genome unmodified. The virus is still profiling your strategy.`);
    } else {
      virusActions.push(`[MUTATIONS] Active genome load (${nextState.activeMutations.length}):`);
      nextState.activeMutations.forEach(m => {
        const name = m.replace('_Mutation', '').replace(/_/g, ' ');
        const desc = NarrativeEngine.getMutationSummary(m);
        const isNew = m === newMutation ? ' ← NEW' : '';
        virusActions.push(` • ${name}${isNew}: ${desc}`);
      });
    }

    // 4. Body condition — dynamic per organ, per round ────────────────────────
    Object.entries(nextState.organGraph.zones).forEach(([zoneName, zone]) => {
      if (zone.isInfected) {
        bodyCondition.push(
          NarrativeEngine.getDynamicOrganText(zoneName, zone, prevState.roundNumber, nextState.activeMutations)
        );
      }
    });

    if (bodyCondition.length === 0) {
      bodyCondition.push(`[CLEAR] No organs currently compromised. Host tissue integrity is holding.`);
    }

    // 5. Immune response impact — varies by defense type ─────────────────────
    if (lastDominantDefense) {
      bodyCondition.push(NarrativeEngine.getImmuneResponseLine(lastDominantDefense, nextState));
    }

    // 6. Reclamation progress report ─────────────────────────────────────────
    Object.entries(nextState.organGraph.zones).forEach(([zoneName, zone]) => {
      if (zone.isInfected && zone.reclamationProgress > 0) {
        const pct = Math.round((zone.reclamationProgress / 10) * 100);
        bodyCondition.push(
          `[RECLAMATION] ${zoneName} clearance at ${pct}% — sustained pressure required to finish the job.`
        );
      }
    });

    // 7. Clean round severity recovery ───────────────────────────────────────
    if (cleanRoundsStreak > 0) {
      const decrease = Math.min(cleanRoundsStreak * 2, 6);
      const streakDesc = cleanRoundsStreak === 1
        ? `First clean round.`
        : `${cleanRoundsStreak}-round clean streak.`;
      bodyCondition.push(
        `[RECOVERY] ${streakDesc} Host autoimmune activity recovering — Severity -${decrease}%.`
      );
    }

    // 8. Severity assessment — granular bands ─────────────────────────────────
    const sev = nextState.severityIndex;
    let severityAssessment = `Systemic load at ${sev}%. `;

    if (sev >= 90) {
      severityAssessment += `🚨 IMMINENT COLLAPSE — Host is ${100 - sev}% from full systemic shutdown. All resources must go to containment now.`;
    } else if (sev >= 75) {
      severityAssessment += `⚠️ CRITICAL threshold reached. Multi-organ failure cascade is possible within the next 2–3 rounds. Deploy maximum countermeasures.`;
    } else if (sev >= 55) {
      severityAssessment += `WARNING: Compounding viral pressure is straining secondary systems. Mutation stack is becoming dangerous — prioritise counters.`;
    } else if (sev >= 40) {
      severityAssessment += `ELEVATED: Viral payload spreading across lymphatic channels. Clear infected zones before the mutation stack deepens.`;
    } else if (sev >= 20) {
      severityAssessment += `MODERATE: Infection localised. Defensive matrix holding, but the virus is still learning your patterns.`;
    } else {
      severityAssessment += `LOW: Host vitals stable. Maintain pressure — early eradication prevents mutation compounding later.`;
    }

    const ctx: TurnContext = {
      title: `📊 BIOLOGICAL TELEMETRY — END OF ROUND ${prevState.roundNumber}`,
      virusActions,
      bodyCondition,
      severityAssessment,
    };

    nextState.currentTurnContext = ctx;
    NarrativeEngine.injectContextToLogFeed(nextState, ctx);
    return nextState;
  }

  // ── WORKAROUND: mirror TurnContext into logFeed as formatted banner ────────
  // This is the popup substitute while the frontend modal is unavailable.
  // When the popup UI is built, it reads state.currentTurnContext directly
  // and this function can be removed or left as a log supplement.
  private static injectContextToLogFeed(state: GameState, ctx: TurnContext): void {
    const divider = `==================================================`;
    const lines: string[] = [];

    lines.push(divider);
    lines.push(ctx.title);
    lines.push(divider);

    lines.push(`\n🦠 PATHOGEN STATUS:`);
    ctx.virusActions.forEach(line => lines.push(`  ${line}`));

    lines.push(`\n🧬 BODY STATUS:`);
    ctx.bodyCondition.forEach(line => lines.push(`  ${line}`));

    lines.push(`\n⚕️  SEVERITY ASSESSMENT:`);
    lines.push(`  ${ctx.severityAssessment}`);

    lines.push(divider + `\n`);

    state.logFeed.push(...lines);
  }

  // ── Dynamic organ condition — shifts with round count and active mutations ──
  private static getDynamicOrganText(
    zoneName: string,
    zone: { reclamationProgress: number },
    roundNumber: number,
    activeMutations: string[]
  ): string {
    // Stage is driven by how long the infection has been running (rough proxy: roundNumber)
    // and whether reclamation is underway
    const isLate = roundNumber >= 6;
    const isMid  = roundNumber >= 3;
    const underPressure = zone.reclamationProgress > 0;

    switch (zoneName) {
      case "Lungs": {
        if (underPressure)
          return `[Lungs] Immune cells advancing into alveolar tissue. Inflammatory exudate thinning — breathing obstruction partially clearing.`;
        if (isLate)
          return `[Lungs] Extensive alveolar consolidation. Oxygen transfer critically impaired; respiratory failure risk is elevated.`;
        if (isMid)
          return `[Lungs] Viral load expanding through bronchial branches. Persistent coughing with worsening hypoxic episodes.`;
        return `[Lungs] Infiltration: Alveolar gas exchange disrupted. Respiratory inflammation and coughing observed.`;
      }
      case "Bloodstream": {
        if (underPressure)
          return `[Bloodstream] Immune complexes clearing arterial channels. Pathogen density declining in peripheral circulation.`;
        if (isLate)
          return `[Bloodstream] Systemic viremia sustained. Pathogen now seeding distant tissue via arterial flow — secondary infection risk elevated.`;
        if (isMid)
          return `[Bloodstream] Viral particles circulating at detectable titres. Coagulation markers showing early inflammatory cascade signs.`;
        return `[Bloodstream] Infiltration: Pathogen seeding arterial loops, triggering early systemic cytokine activity.`;
      }
      case "LymphNodes": {
        const hasAntigenic = activeMutations.some(m => m.includes('Antigenic'));
        if (underPressure)
          return `[Lymph Nodes] Lymphatic drainage improving. Immunoglobulin output stabilising as viral load decreases.`;
        if (hasAntigenic)
          return `[Lymph Nodes] Antigenic mutation has partially blinded lymphatic filters — B-cell response is struggling to tag the correct epitopes.`;
        if (isLate)
          return `[Lymph Nodes] Deep lymphatic saturation. Germinal centres overwhelmed; adaptive immunity output is collapsing.`;
        if (isMid)
          return `[Lymph Nodes] Follicular swelling progressing. Antigen-presenting cells unable to clear the viral load fast enough.`;
        return `[Lymph Nodes] Infiltration: Regional filter swelling. Immunoglobulin production under initial stress.`;
      }
      case "Gut": {
        if (underPressure)
          return `[Gut] Epithelial tight-junction repair underway. Metabolic absorption slowly recovering.`;
        if (isLate)
          return `[Gut] Mucosal barrier severely degraded. Gut microbiome disrupted — secondary bacterial translocation is possible.`;
        if (isMid)
          return `[Gut] Villous atrophy progressing. Nutrient and EP absorption significantly reduced — metabolic reserves draining faster.`;
        return `[Gut] Infiltration: Epithelial junctions compromised. Intestinal processing degraded, reducing turn EP output.`;
      }
      case "Heart": {
        if (underPressure)
          return `[Heart] Myocardial inflammation receding under immune pressure. Resting heart rate trending toward normal.`;
        if (isLate)
          return `[Heart] Viral myocarditis progressing. Arrhythmia events detected — cardiac output instability is a growing risk.`;
        if (isMid)
          return `[Heart] Pericardial inflammation spreading to myocardial tissue. Elevated troponin markers indicate cellular damage.`;
        return `[Heart] Infiltration: Microvascular strain. Resting tachycardia observed; early cardiac stress signals active.`;
      }
      case "Brain": {
        const hasMembrane = activeMutations.includes('Membrane_Hardening_Mutation');
        if (underPressure)
          return `[Brain] 🚨 Immune cells breaching CNS. Viral titre in cerebrospinal fluid slowly declining — neurological recovery possible.`;
        if (hasMembrane)
          return `[Brain] 🚨 Membrane Hardening is blocking standard neuroinflammation responses. The pathogen is operating in the CNS with reduced resistance.`;
        if (isLate)
          return `[Brain] 🚨 SEVERE: Widespread neuronal apoptosis. Autonomic regulation failing — host entering critical neurological decline.`;
        if (isMid)
          return `[Brain] 🚨 Encephalitic progression detected. Glial cell activation elevating intracranial pressure. Cognitive function severely impaired.`;
        return `[Brain] 🚨 Infiltration: Blood-Brain barrier penetrated. Initial neurological disruption and CNS inflammation beginning.`;
      }
      default:
        return `[${zoneName}] Tissue integrity under sustained viral payload stress.`;
    }
  }

  // ── Immune response line — varies by defense type deployed ────────────────
  private static getImmuneResponseLine(dominantDefense: string, state: GameState): string {
    const readable = dominantDefense.replace(/([A-Z])/g, ' $1').trim();

    switch (dominantDefense) {
      case 'WhiteBloodCells':
        return `[IMMUNE RESPONSE] White Blood Cell surge dispatched — phagocytic activity elevated across infected zones.` +
          (state.activeMutations.includes('Evade_Phagocytosis_Mutation')
            ? ` However, the mucus-coated pathogen is partially resisting engulfment.`
            : ` Pathogen cells are being absorbed at baseline efficiency.`);
      case 'Antibodies':
        return `[IMMUNE RESPONSE] Antibody deployment targeting surface antigens.` +
          (state.activeMutations.includes('Antigenic_Drift_Mutation') || state.activeMutations.includes('Antigenic_Shift_Mutation')
            ? ` Antigenic mutation has shifted the epitope — binding efficiency is reduced.`
            : ` Neutralisation proceeding across active infection zones.`);
      case 'Inflammation':
        return `[IMMUNE RESPONSE] Localised inflammatory response isolating infected tissue.` +
          (state.activeMutations.includes('Membrane_Hardening_Mutation')
            ? ` Membrane Hardening is nullifying the containment effect — the virus is ignoring the barrier.`
            : ` Viral migration into adjacent zones is being slowed.`);
      case 'FeverResponse':
        return `[IMMUNE RESPONSE] Systemic fever protocol raised core body temperature.` +
          (state.activeMutations.includes('Heat_Shock_Proteins_Mutation')
            ? ` Heat Shock Proteins are shielding the pathogen — fever is having no effect.`
            : state.activeMutations.includes('Thermal_Resistance_Mutation')
            ? ` Thermal Resistance is blunting the damage — partial effect only.`
            : ` Viral protein structures destabilised. Effective thermal pressure applied.`);
      case 'MemoryCells':
        return `[IMMUNE RESPONSE] Memory Cell network activated — immune system cross-referencing known strain signatures.` +
          (state.activeMutations.includes('Antigenic_Shift_Mutation')
            ? ` Antigenic Shift has fully reorganised the capsid — Memory Cells cannot identify this variant.`
            : ` Recognition efficiency high; secondary response mounting.`);
      case 'CytokineBurst':
        return `[IMMUNE RESPONSE] Cytokine storm triggered — broad-spectrum inflammatory cascade active.` +
          (state.activeMutations.includes('Cytokine_Suppressor_Mutation')
            ? ` Cytokine Suppressor is halving the damage — and the collateral autoimmune cost still applies.`
            : ` Heavy viral clearance in progress. Monitor Severity — collateral tissue damage is accruing.`);
      default:
        return `[IMMUNE RESPONSE] ${readable} deployment produced measurable systemic response this round.`;
    }
  }


  private static getMutationSummary(mutation: string): string {
    switch (mutation) {
      case DecisionTree.Accelerated_Replication:
        return "Virus replicates faster — global infection footprint is expanding each round.";
      case DecisionTree.Antigenic_Drift:
        return "Surface proteins shifted — your Antibodies are 40% less effective.";
      case DecisionTree.Antigenic_Shift:
        return "Full capsid reassortment — Memory Cells cannot recognise this strain.";
      case DecisionTree.Evade_Phagocytosis:
        return "Mucus coating synthesised — White Blood Cells cannot absorb the pathogen.";
      case DecisionTree.Thermal_Resistance:
        return "Cell wall hardened — Fever Response thermal damage is blocked.";
      case DecisionTree.Heat_Shock_Proteins:
        return "Protein shields active — Fever Response is completely neutralised.";
      case DecisionTree.Membrane_Hardening:
        return "Surface hardened — Inflammation containment has no effect.";
      case DecisionTree.Cytokine_Suppressor:
        return "Genome re-engineered — Cytokine Burst damage is cut in half.";
      default:
        return "Adaptive modification reducing host immune effectiveness.";
    }
  }

}