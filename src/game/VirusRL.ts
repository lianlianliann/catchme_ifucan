import { GameState, DIFFICULTY_SETTINGS, DifficultyMode } from './GameLogic';

export class VirusRL {
  private qTable: Record<string, Record<string, number>> = {};
  private lastStateKey: string | null = null;
  private lastActionKey: string | null = null;
  private severityBeforeAction: number = 0;
  private difficulty: DifficultyMode;
  private settings: any;

  private static AllActions = ["Lungs", "Bloodstream", "LymphNodes", "Gut", "Heart", "Brain"];

  constructor(difficulty: DifficultyMode) {
    this.difficulty = difficulty;
    this.settings = DIFFICULTY_SETTINGS[difficulty];
    this.qTable = this.loadOrSeedQTable();
  }

  public selectAction(state: GameState, minimaxSuggestion: string | null): string | null {
    this.severityBeforeAction = state.severityIndex;
    const reachable = this.getReachableTargets(state);

    if (reachable.length === 0) {
      this.lastStateKey = null;
      this.lastActionKey = minimaxSuggestion;
      return minimaxSuggestion;
    }

    const stateKey = this.encodeState(state);
    this.lastStateKey = stateKey;
    let chosenAction: string;

    if (Math.random() < this.settings.rlExplorationRate) {
      chosenAction = reachable[Math.floor(Math.random() * reachable.length)];
      state.logFeed.push(`[RL DECISION] Exploration mode active -> Selecting variant vector: ${chosenAction}`);
    } else {
      this.ensureStateExists(stateKey);
      chosenAction = reachable.sort((a, b) => this.getQValue(stateKey, b) - this.getQValue(stateKey, a))[0];
    }

    this.lastActionKey = chosenAction;
    return chosenAction;
  }

  public updateQTable(newState: GameState): void {
    if (this.lastStateKey === null || this.lastActionKey === null) return;

    const reward = newState.severityIndex - this.severityBeforeAction;
    const newStateKey = this.encodeState(newState);
    const bestFutureQ = this.getBestQValue(newStateKey);

    const oldQ = this.getQValue(this.lastStateKey, this.lastActionKey);
    const newQ = oldQ + this.settings.rlLearningRate * (reward + this.settings.rlDiscountFactor * bestFutureQ - oldQ);

    this.setQValue(this.lastStateKey, this.lastActionKey, newQ);
    this.saveQTable();
    
    this.lastStateKey = null;
    this.lastActionKey = null;
  }

  private encodeState(state: GameState): string {
    const infectedCount = Object.values(state.organGraph.zones).filter(z => z.isInfected).length;
    const severityBracket = state.severityIndex < 25 ? 0 : state.severityIndex < 50 ? 1 : state.severityIndex < 75 ? 2 : 3;
    const epBracket = state.playerEp < 20 ? 0 : state.playerEp < 40 ? 1 : state.playerEp < 60 ? 2 : 3;
    const mutationCount = Math.min(state.activeMutations.length, 3);

    return `I${infectedCount}_S${severityBracket}_E${epBracket}_M${mutationCount}`;
  }

  private ensureStateExists(stateKey: string): void {
    if (!this.qTable[stateKey]) this.qTable[stateKey] = {};
    VirusRL.AllActions.forEach(action => {
      if (this.qTable[stateKey][action] === undefined) this.qTable[stateKey][action] = 0.0;
    });
  }

  private getQValue(stateKey: string, actionKey: string): number {
    return this.qTable[stateKey]?.[actionKey] ?? 0.0;
  }

  private setQValue(stateKey: string, actionKey: string, value: number): void {
    this.ensureStateExists(stateKey);
    this.qTable[stateKey][actionKey] = value;
  }

  private getBestQValue(stateKey: string): number {
    if (!this.qTable[stateKey]) return 0.0;
    const values = Object.values(this.qTable[stateKey]);
    return values.length > 0 ? Math.max(...values) : 0.0;
  }

  private getReachableTargets(state: GameState): string[] {
    const reachable = new Set<string>();
    Object.entries(state.organGraph.zones).forEach(([key, zone]) => {
      if (!zone.isInfected) return;
      (state.organGraph.adjacencyList[key] || []).forEach(n => {
        if (!state.organGraph.zones[n].isInfected) reachable.add(n);
      });
    });
    return Array.from(reachable);
  }

  private saveQTable(): void {
    try {
      localStorage.setItem(this.settings.qTableFilePath, JSON.stringify(this.qTable));
    } catch (e) {
      console.error("[RL] Saving error:", e);
    }
  }

  private loadOrSeedQTable(): Record<string, Record<string, number>> {
    try {
      const saved = localStorage.getItem(this.settings.qTableFilePath);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Object.keys(parsed).length > 0) return parsed;
      }
    } catch (e) {}
    return this.buildSeededQTable();
  }

  private buildSeededQTable(): Record<string, Record<string, number>> {
    const mult = this.difficulty === 'Casual' ? 0.3 : this.difficulty === 'Epidemic' ? 0.6 : 1.0;
    const baseValues: Record<string, number> = { Brain: 10, Heart: 8, LymphNodes: 7, Bloodstream: 6, Gut: 4, Lungs: 2 };
    const seeded: Record<string, Record<string, number>> = {};
    const states = ["I1_S0_E3_M0", "I1_S0_E2_M0", "I2_S1_E2_M1", "I3_S2_E1_M2", "I4_S3_E0_M3"];

    states.forEach(state => {
      seeded[state] = {};
      Object.entries(baseValues).forEach(([k, v]) => {
        seeded[state][k] = v * mult;
      });
    });
    return seeded;
  }
}