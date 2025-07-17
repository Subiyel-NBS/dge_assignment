import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormData, PersonalInfo, FamilyFinancialInfo, SituationDescriptions } from '../types/form';

const initialFormData: FormData = {
  personalInfo: {
    name: '',
    nationalId: '',
    dateOfBirth: '',
    gender: 'male',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
  },
  familyFinancialInfo: {
    maritalStatus: 'single',
    dependents: 0,
    employmentStatus: 'unemployed',
    monthlyIncome: 0,
    housingStatus: 'rented',
  },
  situationDescriptions: {
    financialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
  },
};

const initialState: FormState = {
  currentStep: 0,
  formData: initialFormData,
  isSubmitting: false,
  errors: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      state.formData.personalInfo = { ...state.formData.personalInfo, ...action.payload };
    },
    updateFamilyFinancialInfo: (state, action: PayloadAction<Partial<FamilyFinancialInfo>>) => {
      state.formData.familyFinancialInfo = { ...state.formData.familyFinancialInfo, ...action.payload };
    },
    updateSituationDescriptions: (state, action: PayloadAction<Partial<SituationDescriptions>>) => {
      state.formData.situationDescriptions = { ...state.formData.situationDescriptions, ...action.payload };
    },
    setErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    loadFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialFormData;
      state.currentStep = 0;
      state.errors = {};
      state.isSubmitting = false;
    },
  },
});

export const {
  setCurrentStep,
  updatePersonalInfo,
  updateFamilyFinancialInfo,
  updateSituationDescriptions,
  setErrors,
  clearErrors,
  setSubmitting,
  loadFormData,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;