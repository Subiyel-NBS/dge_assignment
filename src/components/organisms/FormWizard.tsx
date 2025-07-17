import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ProgressBar } from '../atoms/ProgressBar';
import { StepNavigation } from '../molecules/StepNavigation';
import { AISuggestionPopup } from '../molecules/AISuggestionPopup';
import { PersonalInfoStep } from './PersonalInfoStep';
import { FamilyInfoStep } from './FamilyInfoStep';
import { SituationStep } from './SituationStep';
import { useFormData } from '../../hooks/useFormData';
import { useOpenAI } from '../../hooks/useOpenAI';
import { useFormSubmission } from '../../hooks/useFormSubmission';
import { PersonalInfo, FamilyFinancialInfo, SituationDescriptions } from '../../types/form';

interface FormWizardProps {
  onSuccess: (referenceNumber: string) => void;
}

export const FormWizard: React.FC<FormWizardProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { formState, updatePersonalData, updateFamilyData, updateSituationData, nextStep, previousStep } = useFormData();
  const { isPopupOpen, suggestion, currentField, closePopup, clearSuggestion } = useOpenAI();
  const { submitForm } = useFormSubmission();


  const personalForm = useForm<PersonalInfo>({
    defaultValues: formState.formData.personalInfo,
    mode: 'onChange',
  });

  const familyForm = useForm<FamilyFinancialInfo>({
    defaultValues: formState.formData.familyFinancialInfo,
    mode: 'onChange',
  });

  const situationForm = useForm<SituationDescriptions>({
    defaultValues: formState.formData.situationDescriptions,
    mode: 'onChange',
  });

  React.useEffect(() => {
    personalForm.reset(formState.formData.personalInfo);
  }, [formState.formData.personalInfo, personalForm]);

  React.useEffect(() => {
    familyForm.reset(formState.formData.familyFinancialInfo);
  }, [formState.formData.familyFinancialInfo, familyForm]);

  React.useEffect(() => {
    situationForm.reset(formState.formData.situationDescriptions);
  }, [formState.formData.situationDescriptions, situationForm]);

  const getCurrentForm = () => {
    switch (formState.currentStep) {
      case 0:
        return personalForm;
      case 1:
        return familyForm;
      case 2:
        return situationForm;
      default:
        return personalForm;
    }
  };

  const handleNext = async () => {
    const currentForm = getCurrentForm();
    const isValid = await currentForm.trigger();
    
    if (isValid) {
      const formData = currentForm.getValues();
      
      switch (formState.currentStep) {
        case 0:
          updatePersonalData(formData as PersonalInfo);
          break;
        case 1:
          updateFamilyData(formData as FamilyFinancialInfo);
          break;
        case 2:
          updateSituationData(formData as SituationDescriptions);
          break;
      }
      
      nextStep();
    }
  };

  const handlePrevious = () => {
    previousStep();
  };

  const handleSubmit = async () => {
    const isValid = await situationForm.trigger();
    if (isValid) {
      const formData = situationForm.getValues();
      updateSituationData(formData);
      
      try {
        const result = await submitForm();
        if (result.success && result.referenceNumber) {
          onSuccess(result.referenceNumber);
        }
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
  };

  const handleSuggestionAccept = (text: string) => {
    if (isPopupOpen && suggestion && currentField) {
      situationForm.setValue(currentField as keyof SituationDescriptions, text);
      updateSituationData({ [currentField]: text } as Partial<SituationDescriptions>);
    }
    clearSuggestion();
  };

  const handleSuggestionDiscard = () => {
    clearSuggestion();
  };

  const canProceed = () => {
    const currentForm = getCurrentForm();
    return currentForm.formState.isValid;
  };

  const renderCurrentStep = () => {
    switch (formState.currentStep) {
      case 0:
        return <PersonalInfoStep form={personalForm} />;
      case 1:
        return <FamilyInfoStep form={familyForm} />;
      case 2:
        return <SituationStep form={situationForm} />;
      default:
        return <PersonalInfoStep form={personalForm} />;
    }
  };

  const steps = [
    t('navigation.step1'),
    t('navigation.step2'),
    t('navigation.step3'),
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Social Support Application
          </h1>
          <ProgressBar currentStep={formState.currentStep} totalSteps={3} />
        </div>
        
        <nav className="flex space-x-8 mb-6" aria-label="Progress">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${
                index <= formState.currentStep ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  index <= formState.currentStep
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : 'border-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 text-sm font-medium">{step}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={(e) => e.preventDefault()}>
          {renderCurrentStep()}
          
          <div className="mt-8 pt-6 border-t">
            <StepNavigation
              currentStep={formState.currentStep}
              totalSteps={3}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
              canProceed={canProceed()}
              isSubmitting={formState.isSubmitting}
            />
          </div>
        </form>
      </div>

      <AISuggestionPopup
        isOpen={isPopupOpen}
        suggestion={suggestion}
        onAccept={handleSuggestionAccept}
        onDiscard={handleSuggestionDiscard}
        onClose={closePopup}
      />
    </div>
  );
};