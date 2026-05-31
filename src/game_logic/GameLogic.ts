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
}

export interface OrganGraph {
  zones: Record<string, OrganZone>;
  adjacencyList: Record<string, string[]>;
}

export type DifficultyMode = 'Casual' | 'Epidemic' | 'Pandemic';

// ─── Canonical EP costs (single source of truth) ────────────────────────────
// Proposal Table 1. All UI callers must read from here, not hardcode values.
export const DEFENSE_EP_COSTS: Record<string, number> = {
  WhiteBloodCells: 10,
  Antibodies:      25,
  Inflammation:    20,
  FeverResponse:   35,
  MemoryCells:     15,
  CytokineBurst:   50,
};

// Cytokine Burst also deals +10% severity to the host (proposal rule)
export const CYTOKINE_SEVERITY_PENALTY = 10;

// ─── Biological cooldown per defense type (rounds before reuse allowed) ──────
// Scientific basis documented in audit:
//   WBCs       – 1 round  (rapid bone marrow output)
//   Antibodies – 2 rounds (B-cell activation lag)
//   Inflammation–2 rounds (tissue recovery window)
//   FeverResponse–3 rounds(metabolic cost; consecutive fever is dangerous)
//   MemoryCells – 3 rounds (clonal expansion is slow)
//   CytokineBurst–3 rounds (cytokine storm recovery / autoimmune risk)
export const DEFENSE_COOLDOWNS: Record<string, number> = {
  WhiteBloodCells: 1,
  Antibodies:      2,
  Inflammation:    2,
  FeverResponse:   3,
  MemoryCells:     3,
  CytokineBurst:   3,
};

// ─── Structured narrative context (workaround while popup UI is unavailable) ─
export interface TurnContext {
  title: string;
  virusActions: string[];
  bodyCondition: string[];
  severityAssessment: string;
}

export interface DifficultySettings {
  minimaxDepth: number;           // Corrected: Casual=2, Epidemic=4, Pandemic=6
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
    minimaxDepth: 2,               // unchanged
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
    minimaxDepth: 4,               // FIXED: was 3, proposal specifies 4
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
    minimaxDepth: 6,               // FIXED: was 4, proposal specifies 6
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

  // ── NEW: structured narrative context ─────────────────────────────────────
  // Populated by NarrativeEngine at game start and end of each round.
  // When popup UI is ready, it reads directly from this field.
  // Until then, the same content is mirrored into logFeed as formatted text.
  currentTurnContext: TurnContext | null;

  // ── NEW: spam prevention ──────────────────────────────────────────────────
  // defenseCooldowns: rounds remaining before a defense type can be redeployed.
  //   Decremented by 1 each round in processTurnSequence.
  //   Set to DEFENSE_COOLDOWNS[type] when a defense is deployed.
  defenseCooldowns: Record<string, number>;

  // defenseUsedThisRound: how many times each defense has been deployed
  //   in the CURRENT round (resets to {} each round).
  //   Used to calculate the escalating EP surcharge (+50% per repeat use).
  defenseUsedThisRound: Record<string, number>;

  // ── NEW: clean-round severity decrease ───────────────────────────────────
  // Consecutive rounds with no new infections and no uncontested mutations.
  // After 1 clean round: -2% severity. After 2: -4%. Capped at -6% per round.
  cleanRoundsStreak: number;
}

// ─── Helper: organ flavour text (unchanged) ──────────────────────────────────
export function getOrganSymptomText(zoneName: string, isInitial: boolean): string {
  const stage = isInitial ? "Infiltration Base established" : "Severe Degradation";
  switch (zoneName) {
    case "Lungs":
      return `[Lungs] ${stage}: Alveolar cellular spaces compromised. Patient experiencing breathing difficulties and tissue fluid inflammation.`;
    case "Bloodstream":
      return `[Bloodstream] ${stage}: Viral colonies using arterial channels to rapidly accelerate pathogen load dispersal.`;
    case "LymphNodes":
      return `[Lymph Nodes] ${stage}: Swelling inside deep lymphatic filters. Immune cell synthesis is running under high stress.`;
    case "Gut":
      return `[Gut] ${stage}: Epithelial tight-junctions disrupted. Intestinal processing degraded, lowering baseline player turn EP.`;
    case "Heart":
      return `[Heart] ${stage}: Cardiac microvascular strain observed. Host resting parameter spikes into heavy tachycardia boundaries.`;
    case "Brain":
      return `[Brain] 🚨 CRITICAL: Blood-Brain barrier broken. Central nervous tissue under direct attack, triggering cognitive failures.`;
    default:
      return `[${zoneName}] Tissue integrity compromised under pathogen replication load.`;
  }
}

// ─── Initial state builder ───────────────────────────────────────────────────
export function buildInitialState(difficulty: DifficultyMode): GameState {
  const settings = DIFFICULTY_SETTINGS[difficulty];
  const organGraph: OrganGraph = {
    zones: {
      Lungs:       { name: 'Lungs',       epGeneration: 5,  activeDefenseCount: 0, isInfected: false },
      Bloodstream: { name: 'Bloodstream', epGeneration: 10, activeDefenseCount: 0, isInfected: false },
      LymphNodes:  { name: 'LymphNodes',  epGeneration: 15, activeDefenseCount: 0, isInfected: false },
      Gut:         { name: 'Gut',         epGeneration: 8,  activeDefenseCount: 0, isInfected: false },
      Heart:       { name: 'Heart',       epGeneration: 6,  activeDefenseCount: 0, isInfected: false },
      Brain:       { name: 'Brain',       epGeneration: 3,  activeDefenseCount: 0, isInfected: false },
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

  const logs = [
    `==================================================`,
    `🚨 EMERGENCY CASE DIAGNOSTIC INITIALIZED`,
    `==================================================`,
    `[VIRUS ACTION] A pathogenetic agent has breached primary skin filters.`
  ];

  if (settings.startingInfectionZones === 1) {
    organGraph.zones['Lungs'].isInfected = true;
    logs.push(getOrganSymptomText('Lungs', true));
  } else {
    const keys = Object.keys(organGraph.zones);
    const shuffled = [...keys].sort(() => 0.5 - Math.random()).slice(0, settings.startingInfectionZones);
    shuffled.forEach(key => {
      organGraph.zones[key].isInfected = true;
      logs.push(getOrganSymptomText(key, true));
    });
  }

  logs.push(`[DIAGNOSTIC] Base Severity: 0%. Deploy immune cell structures immediately.`);
  logs.push(`==================================================\n`);

  const startingCount = Object.values(organGraph.zones).filter(z => z.isInfected).length;

  return {
    organGraph,
    playerEp: 50,
    infectionRate: startingCount,
    severityIndex: 0,
    difficulty,
    roundNumber: 1,
    activeMutations: [],
    activeMutationStacks: {},
    lastUsedDefenses: {},
    playerDefenses: {},
    minimaxRecommendedTarget: null,
    logFeed: logs,
    gameStatus: 'IN_PROGRESS',

    // New fields
    currentTurnContext: null,
    defenseCooldowns: {},
    defenseUsedThisRound: {},
    cleanRoundsStreak: 0,
  };
}