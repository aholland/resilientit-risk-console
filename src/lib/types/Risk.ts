import type {Control} from './Control';
import {RiskScore} from "$lib/types/RiskScore";
import type {Owner} from "$lib/types/Owner";
import type {RiskManagementOption} from "$lib/types/RiskManagementOption";
import type {ImplementationStatus} from "$lib/types/ImplementationStatus";


export class Risk {
  id: string;
  dateAdded: string;
  category: string;
  title: string;
  description: string;
  owner: Owner | null;
  treatment: RiskManagementOption;
  controls: Control[];
  checkProcess: string;
  notes: string | null;
  status: ImplementationStatus;
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
    controlsMap: Map<string, Control>,
    ownersMap: Map<string, Owner>
  ) {
    this.id = data.id;
    this.dateAdded = data.dateAdded;
    this.category = data.category;
    this.title = data.title;
    this.description = data.description;
    this.owner = data.owner ? ownersMap.get(data.owner) ?? null : null
    this.treatment = data.treatment as RiskManagementOption;
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
    this.status = data.status as ImplementationStatus;
  }
}