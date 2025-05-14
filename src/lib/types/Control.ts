import type {Policy} from "$lib/types/Policy";

export class Control {
  id: string;
  name: string;
  objective: string;
  purpose: string;
  type: string | string[];
  securityProperties: string[];
  riskGrouping: string;
  policies: Policy[];
  status?: string;

  constructor(data: {
    id: string;
    name: string;
    objective: string;
    purpose: string;
    type: string | string[];
    securityProperties: string[];
    riskGrouping: string;
    policies: string[];
    status?: string;
  },policyMap: Map<string, Policy>) {
    this.id = data.id;
    this.name = data.name;
    this.objective = data.objective;
    this.purpose = data.purpose;
    this.type = data.type;
    this.securityProperties = data.securityProperties;
    this.riskGrouping = data.riskGrouping;
    this.status = data.status;
    this.policies = data.policies.map(id => {
      const policy = policyMap.get(id)
      if (!policy) {
        throw new Error(`No policy found for id ${id}`);
      } else {
        return policy;
      }
    });
  }
}