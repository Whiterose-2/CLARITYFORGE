
export interface MissingConcept {
  name: string;
  reason: string;
  dependencyChain: string;
}

export interface LogicalGap {
  gap: string;
  evidence: string;
}

export interface ComparisonPoint {
  aspect: string;
  before: string;
  after: string;
}

export interface ImprovementTip {
  tip: string;
  thinkingPattern: string;
}

export interface ClarityAnalysis {
  score: number;
  scoreReasoning: string;
  missingConcepts: MissingConcept[];
  logicalGaps: LogicalGap[];
  reconstructedExplanation: string;
  comparison: ComparisonPoint[];
  improvementTips: ImprovementTip[];
  thinkingProcess?: string;
}

export type AppStatus = 'idle' | 'loading' | 'success' | 'error';
