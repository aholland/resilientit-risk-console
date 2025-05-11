import type {Policy} from "$lib/types/Policy";

export type Control = {
  id: string; // e.g., "A.5.1"
  name: string; // e.g., "Policies for information security"
  objective: string; // e.g., "Information security policy and topic-specific policies shall be defined..."
  purpose: string; // e.g., "To ensure continuing suitability, adequacy, effectiveness..."
  type: string | string[]; // e.g., "Preventive" or ["Preventive", "Detective"]
  securityProperties: string[]; // e.g., ["Confidentiality", "Integrity", "Availability"]
  riskGrouping: string; // e.g., "Policy Management"
  policy: Policy[] | null; // e.g., "General Information Security Policy"
  status: string;
};

// IMPLEMENTED


