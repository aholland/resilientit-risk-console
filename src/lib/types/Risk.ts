import type {Control} from './Control';
import {RiskScore} from "$lib/types/RiskScore";

type Status = 'Not Implemented'|'Partially Implemented'|'Fully Implemented'|null;

export class Risk {
  id: string;
  dateAdded: string;
  category: string;
  title: string;
  description: string;
  owner: string | null;
  treatment: string;
  controls: Control[];
  checkProcess: string;
  notes: string | null;
  status: Status;
  conformance: string | null;
  lastReviewed: string | null;
  score: RiskScore;

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
    this.owner = data.owner;
    this.treatment = data.treatment;
    this.controls = data.controls
      .map(id => controlsMap.get(id))
      .filter((control): control is Control => control !== undefined);
    this.checkProcess = data.checkProcess;
    this.notes = data.notes;
    this.conformance = data.conformance;
    this.lastReviewed = data.lastReviewed;
    this.score = new RiskScore(data.likelihood ?? 0, data.impact ?? 0, 5);
    if (!(['Not Implemented', 'Partially Implemented', 'Fully Implemented',null].includes(data.status))) {
      throw new Error(`Unknown status "${data.status}"`);
    }
    this.status = data.status as Status;
  }
}