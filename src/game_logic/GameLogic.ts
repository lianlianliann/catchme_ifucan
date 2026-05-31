// ─────────────────────────────────────────────────────────────────────────────
// GameLogic.ts
// Changes from previous version:
//  1. DEFENSE_EP_COSTS  — canonical EP cost map (fixes costs being UI-only)
//  2. DEFENSE_COOLDOWNS — per-type biological cooldown in rounds
//  3. CYTOKINE_SEVERITY_PENALTY — enforces +10% severity rule from proposal
//  4. Minimax depth corrected: Epidemic 3→4, Pandemic 4→6
//  5. GameState gains: currentTurnContext, defenseCooldowns,
//     defenseUsedThisRound, cleanRoundsStreak (for severity decrease)
//  6. TurnContext interface added (used by NarrativeEngine workaround)
//  7. buildInitialState initialises the new fields
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

// ─── NEW: Zone Reclamation Constants ─────────────────────────────────────────
export const RECLAMATION_THRESHOLD = 10; // Total pressure points needed to clear a zone

export const ZONE_RESISTANCE: Record<string, number> = {
  Lungs: 2,
  Bloodstream: 3,
  LymphNodes: 4,
  Gut: 3,
  Heart: 4,
  Brain: 5,
};

// Determines how much the overall Infection Rate drops when a zone is cured
export const ZONE_INFECTION_WEIGHT: Record<string, number> = {
  Lungs: 1,
  Bloodstream: 1,
  LymphNodes: 1,
  Gut: 1,
  Heart: 2,
  Brain: 3,
};

// ─── Canonical EP costs (single source of truth) ────────────────────────────
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

export interface DifficultySettings {
  minimaxDepth: number;           
  bfsSpreadThreshold: number;
  epPerHealthyOrgan: number;
  startingInfectionZones: number;
  mutationIntervalRounds: number;
  telegraphMutations: boolean;
  rlLearningRate: number;
  rlDiscountFactor: number;
  rlExplorationRate: number;
  qTableFilePath: string;
}

export const DIFFICULTY_SETTINGS: Record<DifficultyMode, DifficultySettings> = {
  Casual: {
    minimaxDepth: 2,               
    bfsSpreadThreshold: 2,
    epPerHealthyOrgan: 5,
    startingInfectionZones: 1,
    mutationIntervalRounds: 2,
    telegraphMutations: true,
    rlLearningRate: 0.1,
    rlDiscountFactor: 0.9,
    rlExplorationRate: 0.2,
    qTableFilePath: "q_table_casual.json"
  },
  Epidemic: {
    minimaxDepth: 4,               
    bfsSpreadThreshold: 3,
    epPerHealthyOrgan: 4,
    startingInfectionZones: 2,
    mutationIntervalRounds: 1,
    telegraphMutations: false,
    rlLearningRate: 0.1,
    rlDiscountFactor: 0.9,
    rlExplorationRate: 0.15,
    qTableFilePath: "q_table_epidemic.json"
  },
  Pandemic: {
    minimaxDepth: 6,               
    bfsSpreadThreshold: 5,
    epPerHealthyOrgan: 3,
    startingInfectionZones: 3,
    mutationIntervalRounds: 1,
    telegraphMutations: false,
    rlLearningRate: 0.1,
    rlDiscountFactor: 0.9,
    rlExplorationRate: 0.1,
    qTableFilePath: "q_table_pandemic.json"
  }
};

export interface GameState {
  organGraph: OrganGraph;
  playerEp: number;
  infectionRate: number;
  severityIndex: number;
  difficulty: DifficultyMode;
  roundNumber: number;
  activeMutations: string[];
  activeMutationStacks: Record<string, number>;
  lastUsedDefenses: Record<string, number>;
  playerDefenses: Record<string, number>;
  minimaxRecommendedTarget: string | null;
  logFeed: string[];
  gameStatus: 'IN_PROGRESS' | 'WIN' | 'LOSS';
  currentTurnContext: TurnContext | null;
  defenseCooldowns: Record<string, number>;
  defenseUsedThisRound: Record<string, number>;
  cleanRoundsStreak: number;
}

export function getOrganSymptomText(zoneName: string, isInitial: boolean): string {
  const stage = isInitial ? "Infiltration Base established" : "Severe Degradation";
  switch (zoneName) {
    case "Lungs": return `[Lungs] ${stage}: Alveolar cellular spaces compromised. Patient experiencing breathing difficulties and tissue fluid inflammation.`;
    case "Bloodstream": return `[Bloodstream] ${stage}: Viral colonies using arterial channels to rapidly accelerate pathogen load dispersal.`;
    case "LymphNodes": return `[Lymph Nodes] ${stage}: Swelling inside deep lymphatic filters. Immune cell synthesis is running under high stress.`;
    case "Gut": return `[Gut] ${stage}: Epithelial tight-junctions disrupted. Intestinal processing degraded, lowering baseline player turn EP.`;
    case "Heart": return `[Heart] ${stage}: Cardiac microvascular strain observed. Host resting parameter spikes into heavy tachycardia boundaries.`;
    case "Brain": return `[Brain] 🚨 CRITICAL: Blood-Brain barrier broken. Central nervous tissue under direct attack, triggering cognitive failures.`;
    default: return `[${zoneName}] Tissue integrity compromised under pathogen replication load.`;
  }
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

  const logs: string[] = []; // Initialized as empty so Round 1 has a blank terminal
  let initialSeverity = 0;

  if (settings.startingInfectionZones === 1) {
    organGraph.zones['Lungs'].isInfected = true;
    initialSeverity += 5; 
  } else {
    const keys = Object.keys(organGraph.zones);
    const shuffled = [...keys].sort(() => 0.5 - Math.random()).slice(0, settings.startingInfectionZones);
    shuffled.forEach(key => {
      organGraph.zones[key].isInfected = true;
      initialSeverity += 5; 
      if (key === 'Brain') {
        initialSeverity += 25; 
      }
    });
  }

  const startingCount = Object.values(organGraph.zones).filter(z => z.isInfected).length;

  return {
    organGraph,
    playerEp: 50,
    infectionRate: startingCount,
    severityIndex: initialSeverity,
    difficulty,
    roundNumber: 1,
    activeMutations: [],
    activeMutationStacks: {},
    lastUsedDefenses: {},
    playerDefenses: {},
    minimaxRecommendedTarget: null,
    logFeed: logs,
    gameStatus: 'IN_PROGRESS',
    currentTurnContext: null,
    defenseCooldowns: {},
    defenseUsedThisRound: {},
    cleanRoundsStreak: 0,
  };
}