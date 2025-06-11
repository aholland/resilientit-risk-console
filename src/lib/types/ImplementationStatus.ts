export const implementationStatus = ['Fully Implemented', 'Partially Implemented', 'Not Implemented'] as const;
export type ImplementationStatus = typeof implementationStatus[number];