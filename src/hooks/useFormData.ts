import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../store';
import {
  updatePersonalInfo,
  updateFamilyFinancialInfo,
  updateSituationDescriptions,
  loadFormData,
  setCurrentStep,
} from '../store/formSlice';
import { FormData, PersonalInfo, FamilyFinancialInfo, SituationDescriptions } from '../types/form';

const STORAGE_KEY = 'socialSupportForm';

export const useFormData = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form);

  const saveToLocalStorage = (data: FormData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save form data to localStorage:', error);
    }
  };

  const loadFromLocalStorage = (): FormData | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load form data from localStorage:', error);
      return null;
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear form data from localStorage:', error);
    }
  };

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      dispatch(loadFormData(savedData));
    }
  }, [dispatch]);

  useEffect(() => {
    saveToLocalStorage(formState.formData);
  }, [formState.formData]);

  const updatePersonalData = (data: Partial<PersonalInfo>) => {
    dispatch(updatePersonalInfo(data));
  };

  const updateFamilyData = (data: Partial<FamilyFinancialInfo>) => {
    dispatch(updateFamilyFinancialInfo(data));
  };

  const updateSituationData = (data: Partial<SituationDescriptions>) => {
    dispatch(updateSituationDescriptions(data));
  };

  const goToStep = (step: number) => {
    dispatch(setCurrentStep(step));
  };

  const nextStep = () => {
    if (formState.currentStep < 2) {
      dispatch(setCurrentStep(formState.currentStep + 1));
    }
  };

  const previousStep = () => {
    if (formState.currentStep > 0) {
      dispatch(setCurrentStep(formState.currentStep - 1));
    }
  };

  return {
    formState,
    updatePersonalData,
    updateFamilyData,
    updateSituationData,
    goToStep,
    nextStep,
    previousStep,
    clearLocalStorage,
  };
};