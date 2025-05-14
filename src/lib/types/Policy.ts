export type Policy = {
  id: string; // eg, "A.5.1"
  name: string; // eg, "Policies for information security"
  status: 'published' | ' draft' | 'in review';
};

