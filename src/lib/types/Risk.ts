export type Risk = {
  id: string; // e.g., "A"
  dateAdded: string; // e.g., "2024-06-11"
  category: string; // e.g., "Operational (Including Information Security Risks)"
  description: string; // e.g., "Incident management: A loss of confidentiality..."
  likelihood: number | null; // e.g., 3 or null
  impact: number | null; // e.g., 4 or null
  score: number | null; // e.g., 6 or null
  owner: string | null; // e.g., "Vendor Manager" or null
  treatment: string; // e.g., "Treat"
  controls: string[]; // e.g., ["A.5.26", "A.5.27", ...]
  checkProcess: string; // e.g., "Incident Review"
  notes: string | null; // e.g., "We use Endpoint Security..." or null
  status: string | null; // e.g., "Fully Implemented" or null
  conformance: string | null; // e.g., "Yes" or null
  lastReviewed: string | null; // e.g., null
};