// ─────────────────────────────────────────────────────────────────────────────
// GameLogic.ts
// Changes from proposal/previous version:
//  1. DEFENSE_EP_COSTS  — canonical EP cost map
//  2. DEFENSE_COOLDOWNS — per-type biological cooldown in rounds
//  3. CYTOKINE_SEVERITY_PENALTY — enforces +10% severity rule
//  4. Minimax depth: Casual=2, Epidemic=4, Pandemic=6
//  5. GameState gains: currentTurnContext, defenseCooldowns,
//     defenseUsedThisRound, cleanRoundsStreak, lastMutationRound
//  6. TurnContext interface
//  7. DifficultySettings: mutationIntervalRounds REMOVED — mutation timing
//     is now probabilistic, managed by DecisionTree
// ─────────────────────────────────────────────────────────────────────────────

export interface OrganZone {
  name: string;
  activeDefenseCount: number;
  isInfected: boolean;
  epGeneration: number;
  reclamationProgress: number;
}

export interface OrganGraph {
  zones: Record<string, OrganZone>;
  adjacencyList: Record<string, string[]>;
}

export type DifficultyMode = 'Casual' | 'Epidemic' | 'Pandemic';

// ─── Zone Reclamation Constants ───────────────────────────────────────────────
export const RECLAMATION_THRESHOLD = 10;

export const ZONE_RESISTANCE: Record<string, number> = {
  Lungs:       2,
  Bloodstream: 3,
  LymphNodes:  4,
  Gut:         3,
  Heart:       4,
  Brain:       5,
};

export const ZONE_INFECTION_WEIGHT: Record<string, number> = {
  Lungs:       1,
  Bloodstream: 1,
  LymphNodes:  1,
  Gut:         1,
  Heart:       2,
  Brain:       3,
};

// ─── Canonical EP costs ───────────────────────────────────────────────────────
export const DEFENSE_EP_COSTS: Record<string, number> = {
  WhiteBloodCells: 10,
  Antibodies:      25,
  Inflammation:    20,
  FeverResponse:   35,
  MemoryCells:     15,
  CytokineBurst:   50,
};

export const CYTOKINE_SEVERITY_PENALTY = 10;

export const DEFENSE_COOLDOWNS: Record<DifficultyMode, Record<string, number>> = {
  Casual: {
    WhiteBloodCells: 0,
    Antibodies:      1,
    Inflammation:    1,
    FeverResponse:   2,
    MemoryCells:     2,
    CytokineBurst:   2,
  },
  Epidemic: {
    WhiteBloodCells: 1,
    Antibodies:      2,
    Inflammation:    2,
    FeverResponse:   3,
    MemoryCells:     3,
    CytokineBurst:   3,
  },
  Pandemic: {
    WhiteBloodCells: 2,
    Antibodies:      3,
    Inflammation:    3,
    FeverResponse:   4,
    MemoryCells:     4,
    CytokineBurst:   4,
  }
};

export interface TurnContext {
  title: string;
  virusActions: string[];
  bodyCondition: string[];
  severityAssessment: string;
}

// ── NEW: Scored defense entry for WRS display ─────────────────────────────────
export interface DefenseScore {
  defenseType: string;
  score: number;
  mutationPenalty: string | null; // e.g. "Antigenic Drift active (-40%)"
  isEffective: boolean;
}

export interface DifficultySettings {
  minimaxDepth:          number;
  bfsSpreadThreshold:    number;
  epPerHealthyOrgan:     number;
  startingInfectionZones: number;
  telegraphMutations:    boolean;
  rlLearningRate:        number;
  rlDiscountFactor:      number;
  rlExplorationRate:     number;
  qTableFilePath:        string;
}

export const DIFFICULTY_SETTINGS: Record<DifficultyMode, DifficultySettings> = {
  Casual: {
    minimaxDepth:          2,
    bfsSpreadThreshold:    2,
    epPerHealthyOrgan:     5,
    startingInfectionZones: 1,
    telegraphMutations:    true,
    rlLearningRate:        0.1,
    rlDiscountFactor:      0.9,
    rlExplorationRate:     0.2,
    qTableFilePath:        "q_table_casual.json"
  },
  Epidemic: {
    minimaxDepth:          4,
    bfsSpreadThreshold:    3,
    epPerHealthyOrgan:     4,
    startingInfectionZones: 2,
    telegraphMutations:    false,
    rlLearningRate:        0.1,
    rlDiscountFactor:      0.9,
    rlExplorationRate:     0.15,
    qTableFilePath:        "q_table_epidemic.json"
  },
  Pandemic: {
    minimaxDepth:          6,
    bfsSpreadThreshold:    5,
    epPerHealthyOrgan:     3,
    startingInfectionZones: 3,
    telegraphMutations:    false,
    rlLearningRate:        0.1,
    rlDiscountFactor:      0.9,
    rlExplorationRate:     0.1,
    qTableFilePath:        "q_table_pandemic.json"
  }
};

export interface GameState {
  organGraph:             OrganGraph;
  playerEp:               number;
  infectionRate:          number;
  severityIndex:          number;
  difficulty:             DifficultyMode;
  roundNumber:            number;
  activeMutations:        string[];
  activeMutationStacks:   Record<string, number>;
  lastUsedDefenses:       Record<string, number>;
  playerDefenses:         Record<string, number>;
  minimaxRecommendedTarget: string | null;
  logFeed:                string[];
  gameStatus:             'IN_PROGRESS' | 'WIN' | 'LOSS';
  currentTurnContext:     TurnContext | null;
  defenseCooldowns:       Record<string, number>;
  defenseUsedThisRound:   Record<string, number>;
  cleanRoundsStreak:      number;
  // ── NEW ────────────────────────────────────────────────────────────────────
  lastMutationRound:      number;   // tracks when last mutation fired (for escalation)
  lastDefenseScores:      DefenseScore[]; // WRS scores from last processed round
  projectedEpNextRound:   number;   // preview EP for next round
}

export function getOrganSymptomText(zoneName: string, isInitial: boolean): string {
  const stage = isInitial ? "Infiltration Base established" : "Severe Degradation";
  switch (zoneName) {
    case "Lungs":       return `[Lungs] ${stage}: Alveolar cellular spaces compromised. Patient experiencing breathing difficulties.`;
    case "Bloodstream": return `[Bloodstream] ${stage}: Viral colonies using arterial channels to accelerate dispersal.`;
    case "LymphNodes":  return `[Lymph Nodes] ${stage}: Swelling inside deep lymphatic filters. Immune synthesis running under stress.`;
    case "Gut":         return `[Gut] ${stage}: Epithelial tight-junctions disrupted. Intestinal processing degraded.`;
    case "Heart":       return `[Heart] ${stage}: Cardiac microvascular strain observed. Host showing tachycardia.`;
    case "Brain":       return `[Brain] 🚨 CRITICAL: Blood-Brain barrier broken. Central nervous tissue under direct attack.`;
    default:            return `[${zoneName}] Tissue integrity compromised under pathogen replication load.`;
  }
}

// ── Helper: compute projected EP for next round ───────────────────────────────
export function computeProjectedEp(state: GameState): number {
  const healthyOrgans   = Object.values(state.organGraph.zones).filter(z => !z.isInfected);
  const organEp         = healthyOrgans.reduce((t, z) => t + z.epGeneration, 0);
  const baseMetabolism  = 10;
  return state.playerEp + organEp + baseMetabolism;
}

export function buildInitialState(difficulty: DifficultyMode): GameState {
  const settings = DIFFICULTY_SETTINGS[difficulty];
  const organGraph: OrganGraph = {
    zones: {
      Lungs:       { name: 'Lungs',       epGeneration: 5,  activeDefenseCount: 0, isInfected: false, reclamationProgress: 0 },
      Bloodstream: { name: 'Bloodstream', epGeneration: 10, activeDefenseCount: 0, isInfected: false, reclamationProgress: 0 },
      LymphNodes:  { name: 'LymphNodes',  epGeneration: 15, activeDefenseCount: 0, isInfected: false, reclamationProgress: 0 },
      Gut:         { name: 'Gut',         epGeneration: 8,  activeDefenseCount: 0, isInfected: false, reclamationProgress: 0 },
      Heart:       { name: 'Heart',       epGeneration: 6,  activeDefenseCount: 0, isInfected: false, reclamationProgress: 0 },
      Brain:       { name: 'Brain',       epGeneration: 3,  activeDefenseCount: 0, isInfected: false, reclamationProgress: 0 },
    },
    adjacencyList: {
      Lungs:       ['Bloodstream', 'LymphNodes'],
      Bloodstream: ['Lungs', 'Heart', 'LymphNodes', 'Gut'],
      LymphNodes:  ['Lungs', 'Bloodstream'],
      Gut:         ['Bloodstream'],
      Heart:       ['Bloodstream', 'Brain'],
      Brain:       ['Heart'],
    }
  };

  const logs: string[] = [];
  let initialSeverity = 0;

  if (settings.startingInfectionZones === 1) {
    organGraph.zones['Lungs'].isInfected = true;
    initialSeverity += 5;
  } else {
    const keys    = Object.keys(organGraph.zones);
    const shuffled = [...keys].sort(() => 0.5 - Math.random()).slice(0, settings.startingInfectionZones);
    shuffled.forEach(key => {
      organGraph.zones[key].isInfected = true;
      initialSeverity += 5;
      if (key === 'Brain') initialSeverity += 25;
    });
  }

  const startingCount = Object.values(organGraph.zones).filter(z => z.isInfected).length;

  const initialState: GameState = {
    organGraph,
    playerEp:               50,
    infectionRate:          startingCount,
    severityIndex:          initialSeverity,
    difficulty,
    roundNumber:            1,
    activeMutations:        [],
    activeMutationStacks:   {},
    lastUsedDefenses:       {},
    playerDefenses:         {},
    minimaxRecommendedTarget: null,
    logFeed:                logs,
    gameStatus:             'IN_PROGRESS',
    currentTurnContext:     null,
    defenseCooldowns:       {},
    defenseUsedThisRound:   {},
    cleanRoundsStreak:      0,
    lastMutationRound:      0,
    lastDefenseScores:      [],
    projectedEpNextRound:   50 + 10 + (startingCount < 6 ? (6 - startingCount) * 5 : 0),
  };

  return initialState;
}