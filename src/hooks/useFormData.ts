// This hook is deprecated - use useFormManager instead
// Keeping for backward compatibility with existing components

import { useFormManager } from './useFormManager';

export const useFormData = () => {
  const formManager = useFormManager();
  
  return {
    formState: {
      currentStep: formManager.currentStep,
      formData: {
        personalInfo: formManager.personalForm.getValues(),
        familyFinancialInfo: formManager.familyForm.getValues(),
        situationDescriptions: formManager.situationForm.getValues(),
      },
      isSubmitting: false,
      errors: {},
    },
    updatePersonalData: (data: any) => {
      Object.keys(data).forEach(key => {
        formManager.personalForm.setValue(key as any, data[key]);
      });
    },
    updateFamilyData: (data: any) => {
      Object.keys(data).forEach(key => {
        formManager.familyForm.setValue(key as any, data[key]);
      });
    },
    updateSituationData: (data: any) => {
      Object.keys(data).forEach(key => {
        formManager.situationForm.setValue(key as any, data[key]);
      });
    },
    nextStep: formManager.nextStep,
    previousStep: formManager.previousStep,
    clearLocalStorage: formManager.handleStartFresh,
  };
};