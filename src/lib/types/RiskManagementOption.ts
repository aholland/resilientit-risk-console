export const riskManagementOptions = ['Treat', 'Transfer', 'Terminate', 'Tolerate'] as const;
export type RiskManagementOption = typeof riskManagementOptions[number];