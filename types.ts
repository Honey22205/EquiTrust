export type View = 'application' | 'decision' | 'controlPanel' | 'auditLog';
export type AuthView = 'signIn' | 'signUp';

export interface LoanApplication {
  creditScore: number;
  income: number;
  dti: number;
  existingProducts: number;
  customerId: string;
}

export interface FeatureContribution {
  name: string;
  impact: number;
}

export interface Decision {
  decision: 'Approved' | 'Denied' | 'Referred';
  naturalLanguageExplanation: string;
  featureContributions: FeatureContribution[];
}

export interface ConsentSettings {
  useIncome: boolean;
  useLocation: boolean;
  useSpendingHabits: boolean;
  forPersonalization: boolean;
}

export interface AuditLogEntry {
  timestamp: string;
  customerId: string;
  decision: 'Approved' | 'Denied' | 'Referred';
  explanation: string;
  inputParameters: Omit<LoanApplication, 'customerId'>;
  biasCheckResult: boolean;
}