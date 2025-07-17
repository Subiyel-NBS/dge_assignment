export interface PersonalInfo {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}

export interface FamilyFinancialInfo {
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  dependents: number;
  employmentStatus: 'employed' | 'unemployed' | 'self-employed' | 'retired' | 'student';
  monthlyIncome: number;
  housingStatus: 'owned' | 'rented' | 'staying_with_family' | 'homeless';
}

export interface SituationDescriptions {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

export interface FormData {
  personalInfo: PersonalInfo;
  familyFinancialInfo: FamilyFinancialInfo;
  situationDescriptions: SituationDescriptions;
}

export interface FormState {
  currentStep: number;
  formData: FormData;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export interface AIAssistanceState {
  loadingFields: Record<string, boolean>;
  suggestion: string;
  currentField: string | null;
  isPopupOpen: boolean;
  error: string | null;
}

export type FormStep = 'personal' | 'family' | 'situation';

export interface StepConfig {
  id: FormStep;
  title: string;
  description: string;
  fields: string[];
}