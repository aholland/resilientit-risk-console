import type { Control } from './Control';

export class Risk {
  id: string;
  dateAdded: string;
  category: string;
  title: string;
  description: string;
  likelihood: number | null;
  impact: number | null;
  owner: string | null;
  treatment: string;
  controls: Control[];
  checkProcess: string;
  notes: string | null;
  status: string | null;
  conformance: string | null;
  lastReviewed: string | null;

  constructor(data: {
    id: string;
    dateAdded: string;
    category: string;
    title: string;
    description: string;
    likelihood: number | null;
    impact: number | null;
    owner: string | null;
    treatment: string;
    controls: string[];
    checkProcess: string;
    notes: string | null;
    status: string | null;
    conformance: string | null;
    lastReviewed: string | null;
    },
    controlsMap: Map<string, Control>
  ) {
    this.id = data.id;
    this.dateAdded = data.dateAdded;
    this.category = data.category;
    this.title = data.title;
    this.description = data.description;
    this.likelihood = data.likelihood;
    this.impact = data.impact;
    this.owner = data.owner;
    this.treatment = data.treatment;
    this.controls = data.controls
      .map(id => controlsMap.get(id))
      .filter((control): control is Control => control !== undefined);
    this.checkProcess = data.checkProcess;
    this.notes = data.notes;
    this.status = data.status;
    this.conformance = data.conformance;
    this.lastReviewed = data.lastReviewed;
  }

  score(): number | null {
    if (this.likelihood === null || this.impact === null) {
      return null;
    }
    return this.likelihood + this.impact - 1;
  }

  scoreInRange(lowerBoundInclusive: number, upperBoundInclusive: number): boolean {
    const score = this.score();
    return score ? (lowerBoundInclusive <= score && score <= upperBoundInclusive) : false;
  }

  scoreEmpty(): boolean {
    return this.score() === null;
  }
  scoreIsLow(): boolean {
    return this.scoreInRange(Number.NEGATIVE_INFINITY,3);
  }
  scoreIsMid(): boolean {
    return this.scoreInRange(4,5);
  }
  scoreIsHigh(): boolean {
    return this.scoreInRange(6,Number.POSITIVE_INFINITY);
  }
}