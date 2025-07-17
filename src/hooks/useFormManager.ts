import { useState, useCallback, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useFormPersistence } from './useFormPersistence';
import { PersonalInfo, FamilyFinancialInfo, SituationDescriptions } from '../types/form';

const STORAGE_KEY = 'social-support-form-data';

export const useFormManager = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  // Initialize forms
  const personalForm = useForm<PersonalInfo>({
    mode: 'onChange',
  });

  const familyForm = useForm<FamilyFinancialInfo>({
    mode: 'onChange',
  });

  const situationForm = useForm<SituationDescriptions>({
    mode: 'onChange',
  });

  // Setup persistence for each form
  const personalPersistence = useFormPersistence(personalForm, 'personal');
  const familyPersistence = useFormPersistence(familyForm, 'family');
  const situationPersistence = useFormPersistence(situationForm, 'situation');

  // Load current step from localStorage
  useEffect(() => {
    try {
      const savedStep = localStorage.getItem(`${STORAGE_KEY}-currentStep`);
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    } catch (error) {
      console.error('Failed to load current step:', error);
    }
  }, []);

  // Save current step to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}-currentStep`, currentStep.toString());
    } catch (error) {
      console.error('Failed to save current step:', error);
    }
  }, [currentStep]);

  // Check for existing data on mount
  useEffect(() => {
    if (!hasCheckedStorage) {
      const hasData = personalPersistence.hasSavedData() || 
                     familyPersistence.hasSavedData() || 
                     situationPersistence.hasSavedData();
      
      if (hasData) {
        setShowRestoreModal(true);
      }
      setHasCheckedStorage(true);
    }
  }, [hasCheckedStorage, personalPersistence, familyPersistence, situationPersistence]);

  // Get current form based on step
  const getCurrentForm = useCallback((): UseFormReturn<any> => {
    switch (currentStep) {
      case 0:
        return personalForm;
      case 1:
        return familyForm;
      case 2:
        return situationForm;
      default:
        return personalForm;
    }
  }, [currentStep, personalForm, familyForm, situationForm]);

  // Navigation functions
  const nextStep = useCallback(() => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step <= 2) {
      setCurrentStep(step);
    }
  }, []);

  // Handle next button click
  const handleNext = useCallback(async () => {
    const currentForm = getCurrentForm();
    const isValid = await currentForm.trigger();
    
    if (isValid) {
      nextStep();
    }
  }, [getCurrentForm, nextStep]);

  // Handle previous button click
  const handlePrevious = useCallback(() => {
    previousStep();
  }, [previousStep]);

  // Handle form submission
  const handleSubmit = useCallback(async (): Promise<{ success: boolean; referenceNumber?: string }> => {
    const isValid = await situationForm.trigger();
    if (!isValid) {
      return { success: false };
    }

    // Simulate form submission
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          referenceNumber: 'REF-' + Date.now().toString().slice(-6)
        });
      }, 1000);
    });
  }, [situationForm]);

  // Handle restore progress
  const handleRestoreProgress = useCallback(() => {
    setShowRestoreModal(false);
    // Data is already loaded by useFormPersistence
  }, []);

  // Handle start fresh
  const handleStartFresh = useCallback(() => {
    personalPersistence.clearSavedData();
    familyPersistence.clearSavedData();
    situationPersistence.clearSavedData();
    
    try {
      localStorage.removeItem(`${STORAGE_KEY}-currentStep`);
    } catch (error) {
      console.error('Failed to clear current step:', error);
    }
    
    personalForm.reset();
    familyForm.reset();
    situationForm.reset();
    setCurrentStep(0);
    setShowRestoreModal(false);
  }, [personalPersistence, familyPersistence, situationPersistence, personalForm, familyForm, situationForm]);

  // Check if current form is valid
  const canProceed = useCallback(() => {
    const currentForm = getCurrentForm();
    return currentForm.formState.isValid;
  }, [getCurrentForm]);

  // Check if any data exists
  const hasStoredData = useCallback(() => {
    return personalPersistence.hasSavedData() || 
           familyPersistence.hasSavedData() || 
           situationPersistence.hasSavedData();
  }, [personalPersistence, familyPersistence, situationPersistence]);

  return {
    // Forms
    personalForm,
    familyForm,
    situationForm,
    
    // Navigation
    currentStep,
    nextStep,
    previousStep,
    goToStep,
    
    // Handlers
    handleNext,
    handlePrevious,
    handleSubmit,
    handleRestoreProgress,
    handleStartFresh,
    
    // State
    showRestoreModal,
    hasCheckedStorage,
    canProceed,
    hasStoredData,
    
    // Utilities
    getCurrentForm,
  };
};