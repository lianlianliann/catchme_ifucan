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

    const virusActions = [
      `A virulent pathogen has successfully breached primary external epithelial barriers.`,
      `Initial viral colonies have anchored within: ${infectedZones.join(', ')}.`,
      `The pathogen is currently operating without mutations — but it is learning.`,
    ];

    const bodyCondition = infectedZones.map(zone =>
      NarrativeEngine.getOrganSymptomText(zone, true)
    );

    const severityAssessment =
      `Pathogen Severity Index is stable at ${state.severityIndex}%. ` +
      `Immediate cellular defense deployment is recommended. ` +
      `The virus will begin adapting to your strategy from Round 1.`;

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

    // 1. Virus identity / what it is this round ──────────────────────────────
    virusActions.push(
      `The pathogen is a rapidly-evolving adaptive virus operating across the organ graph. ` +
      `It uses Breadth-First Search to probe your weakest defenses and Minimax lookahead ` +
      `to plan several rounds ahead. It remembers what hurts it via Q-Learning.`
    );

    // 2. What the virus did this round (BFS spread diff) ─────────────────────
    let spreadCount = 0;
    Object.keys(nextState.organGraph.zones).forEach((zoneName) => {
      const wasInfected = prevState.organGraph.zones[zoneName].isInfected;
      const isNowInfected = nextState.organGraph.zones[zoneName].isInfected;
      if (!wasInfected && isNowInfected) {
        spreadCount++;
        virusActions.push(
          `[SPREAD] The virus flooded the ${zoneName} — it identified this zone as your weakest point.`
        );
        if (zoneName === "Brain") {
          virusActions.push(
            `[CRITICAL] ⚠ The Blood-Brain barrier has been penetrated. ` +
            `Central nervous tissue is under direct attack. Severity spiked +25%.`
          );
        }
      }
    });

    if (spreadCount === 0) {
      virusActions.push(
        `[STABLE] Your immune perimeter held. The virus could not breach any new organ this round.`
      );
    }

    // 3. Mutations — what the virus expressed and why ─────────────────────────
    if (nextState.activeMutations.length === 0) {
      virusActions.push(
        `[MUTATIONS] No active mutations yet. The virus is still profiling your defense strategy.`
      );
    } else {
      virusActions.push(
        `[MUTATIONS] Active genome modifications (${nextState.activeMutations.length} total):`
      );
      nextState.activeMutations.forEach(m => {
        const name = m.replace('_Mutation', '').replace(/_/g, ' ');
        const desc = NarrativeEngine.getMutationSummary(m);
        virusActions.push(` • ${name}: ${desc}`);
      });
    }

    if (newMutation) {
      const name = newMutation.replace('_Mutation', '').replace(/_/g, ' ');
      if (newMutation === DecisionTree.Accelerated_Replication) {
        virusActions.push(
          `[NEW MUTATION] "${name}": Your defenses left a gap. ` +
          `The virus optimised its transcription machinery and expanded its footprint.`
        );
      } else if (lastDominantDefense) {
        virusActions.push(
          `[ADAPTATION] The virus detected your reliance on ${lastDominantDefense.replace(/([A-Z])/g, ' $1').trim()} ` +
          `and expressed "${name}" directly in response.`
        );
      } else {
        virusActions.push(`[NEW MUTATION] The pathogen expressed: "${name}".`);
      }
    }

    // 4. Body condition for each infected organ ───────────────────────────────
    Object.entries(nextState.organGraph.zones).forEach(([name, zone]) => {
      if (zone.isInfected) {
        bodyCondition.push(NarrativeEngine.getOrganSymptomText(name, false));
      }
    });

    if (bodyCondition.length === 0) {
      bodyCondition.push(`[CLEAR] No organs are currently compromised. Host tissue integrity is holding.`);
    }

    // 5. Immune response impact ───────────────────────────────────────────────
    if (lastDominantDefense) {
      const readable = lastDominantDefense.replace(/([A-Z])/g, ' $1').trim();
      bodyCondition.push(
        `[IMMUNE RESPONSE] Your ${readable} deployment triggered measurable systemic shifts. ` +
        `The virus has logged this response and will counter-adapt next round.`
      );
    }

    // 6. Clean round severity recovery ───────────────────────────────────────
    if (cleanRoundsStreak > 0) {
      const decrease = Math.min(cleanRoundsStreak * 2, 6);
      bodyCondition.push(
        `[RECOVERY] Clean round streak: ${cleanRoundsStreak}. ` +
        `Host immune system reclaiming ground — Severity reduced by ${decrease}%.`
      );
    }

    // 7. Severity assessment ──────────────────────────────────────────────────
    let severityAssessment = `Systemic Saturation evaluated at ${nextState.severityIndex}%. `;
    if (nextState.severityIndex >= 75) {
      severityAssessment +=
        `⚠️ CRITICAL: Multi-organ failure window is open. ` +
        `The virus is ${100 - nextState.severityIndex}% from total host collapse. Deploy your strongest responses now.`;
    } else if (nextState.severityIndex >= 40) {
      severityAssessment +=
        `WARNING: Viral payload spreading rapidly. Secondary lymphatic systems are under stress. ` +
        `Prioritise clearing infected zones before the mutation stack compounds further.`;
    } else {
      severityAssessment +=
        `Infection is localised. Defensive matrix holding within margin parameters. ` +
        `Stay proactive — the virus is still adapting even while contained.`;
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

    lines.push(`\n📌 WHAT THE VIRUS IS:`);
    ctx.virusActions.forEach(line => lines.push(`  ${line}`));

    lines.push(`\n🧬 BODY STATUS:`);
    ctx.bodyCondition.forEach(line => lines.push(`  ${line}`));

    lines.push(`\n⚕️  SEVERITY ASSESSMENT:`);
    lines.push(`  ${ctx.severityAssessment}`);

    lines.push(divider + `\n`);

    state.logFeed.push(...lines);
  }

  // ── Mutation plain-English descriptions for narrative use ─────────────────
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

  private static getOrganSymptomText(zoneName: string, isInitial: boolean): string {
    const stateType = isInitial ? "Infiltration" : "Degradation";
    switch (zoneName) {
      case "Lungs":
        return `[Lungs] ${stateType}: Alveolar gas exchange disrupted. Respiratory inflammation and coughing observed.`;
      case "Bloodstream":
        return `[Bloodstream] ${stateType}: Pathogen running along arterial loops, triggering systemic cytokine warnings.`;
      case "LymphNodes":
        return `[Lymph Nodes] ${stateType}: Regional filter swelling. Immunoglobulin production under heavy stress.`;
      case "Gut":
        return `[Gut] ${stateType}: Intestinal epithelial junctions compromised, reducing metabolic EP absorption.`;
      case "Heart":
        return `[Heart] ${stateType}: Microvascular myocardium irritation causing elevated resting heart rate.`;
      case "Brain":
        return `[Brain] ${stateType} 🚨: Blood-Brain barrier penetrated. Cognitive degradation and neurological spikes initiated.`;
      default:
        return `[${zoneName}] Tissue integrity compromised under viral payload stress.`;
    }
  }
}