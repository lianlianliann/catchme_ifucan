import { GameState, DIFFICULTY_SETTINGS, getOrganSymptomText } from './GameLogic';

export class VirusAI {
  public executeSpreadVirus(state: GameState): string[] {
    const graph = state.organGraph;
    const threshold = DIFFICULTY_SETTINGS[state.difficulty].bfsSpreadThreshold;
    const preferred = state.minimaxRecommendedTarget;
    const turnNarratives: string[] = [];

    const queue: string[] = [];
    const visited = new Set<string>();

    Object.entries(graph.zones).forEach(([key, zone]) => {
      if (zone.isInfected) {
        queue.push(key);
        visited.add(key);
      }
    });

    let spreadOccurred = false;

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (!graph.adjacencyList[current]) continue;

      const unvisited = graph.adjacencyList[current].filter(k => !visited.has(k));

      const sorted = unvisited.sort((a, b) => {
        let defA = graph.zones[a].activeDefenseCount;
        let defB = graph.zones[b].activeDefenseCount;
        if (a === preferred) defA -= 0.5;
        if (b === preferred) defB -= 0.5;
        return defA - defB;
      });

      for (const target of sorted) {
        const zone = graph.zones[target];
        if (zone.activeDefenseCount < threshold) {
          zone.isInfected = true;
          spreadOccurred = true;
          state.infectionRate += 1;
          state.severityIndex += 5;

          turnNarratives.push(`[BREACH] Virus completely overran tissue limits and flooded the ${zone.name}.`);
          turnNarratives.push(` -> ${getOrganSymptomText(target, false)}`);

          if (target === 'Brain') {
            state.severityIndex += 25;
            turnNarratives.push(`[CRITICAL] ⚠ Brain blood barrier broken! Severity spikes an additional +25%!`);
          }

          queue.push(target);
        }
        visited.add(target);
      }
    }

    if (!spreadOccurred) {
      turnNarratives.push("[STABLE] Immune cell walls held! The pathogen failed to invade any new organs this turn.");
    }

    return turnNarratives;
  }

  public calculateBestMove(state: GameState, depth: number): string | null {
    let bestScore = -Infinity;
    let bestTargetKey: string | null = null;

    for (const [key, zone] of Object.entries(state.organGraph.zones)) {
      if (!zone.isInfected) continue;
      if (!state.organGraph.adjacencyList[key]) continue;

      for (const target of state.organGraph.adjacencyList[key]) {
        if (state.organGraph.zones[target].isInfected) continue;

        const sim = structuredClone(state);
        sim.organGraph.zones[target].isInfected = true;
        sim.severityIndex += 5;
        if (target === 'Brain') sim.severityIndex += 25;

        const score = this.minimax(sim, depth - 1, -Infinity, Infinity, false);
        if (score > bestScore) {
          bestScore = score;
          bestTargetKey = target;
        }
      }
    }
    return bestTargetKey;
  }

  private minimax(state: GameState, depth: number, alpha: number, beta: number, isMaximizing: boolean): number {
    if (depth === 0 || state.infectionRate <= 0 || state.severityIndex >= 100) {
      return this.evaluateBoard(state);
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      const possibleMoves = this.getVirusMoves(state);
      if (possibleMoves.length === 0) return this.evaluateBoard(state);

      for (const move of possibleMoves) {
        const sim = structuredClone(state);
        sim.organGraph.zones[move.to].isInfected = true;
        sim.severityIndex += 5;
        if (move.to === 'Brain') sim.severityIndex += 25;

        const evalScore = this.minimax(sim, depth - 1, alpha, beta, false);
        maxEval = Math.max(maxEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      const playerMoves = this.getPlayerDefenseMoves(state);
      if (playerMoves.length === 0) return this.evaluateBoard(state);

      for (const target of playerMoves) {
        const sim = structuredClone(state);
        sim.organGraph.zones[target].activeDefenseCount += 2;
        sim.playerEp -= 10;

        const evalScore = this.minimax(sim, depth - 1, alpha, beta, true);
        minEval = Math.min(minEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }

  private getVirusMoves(state: GameState): Array<{ from: string; to: string }> {
    const moves: Array<{ from: string; to: string }> = [];
    Object.entries(state.organGraph.zones).forEach(([key, zone]) => {
      if (!zone.isInfected) return;
      const neighbors = state.organGraph.adjacencyList[key] || [];
      neighbors.forEach(n => {
        if (!state.organGraph.zones[n].isInfected) moves.push({ from: key, to: n });
      });
    });
    return moves;
  }

  private getPlayerDefenseMoves(state: GameState): string[] {
    const candidates = new Set<string>();
    Object.entries(state.organGraph.zones).forEach(([key, zone]) => {
      if (!zone.isInfected) return;
      const neighbors = state.organGraph.adjacencyList[key] || [];
      neighbors.forEach(n => {
        if (!state.organGraph.zones[n].isInfected) candidates.add(n);
      });
    });
    return Array.from(candidates)
      .sort((a, b) => state.organGraph.zones[a].activeDefenseCount - state.organGraph.zones[b].activeDefenseCount)
      .slice(0, 3);
  }

  private evaluateBoard(state: GameState): number {
    const infectedCount = Object.values(state.organGraph.zones).filter(z => z.isInfected).length;
    const mutationStacks = Object.values(state.activeMutationStacks).reduce((a, b) => a + b, 0);
    return state.severityIndex + (3 * infectedCount) + (2 * mutationStacks) - (0.5 * state.playerEp);
  }
}