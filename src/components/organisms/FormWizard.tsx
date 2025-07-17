import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProgressBar } from '../atoms/ProgressBar';
import { StepNavigation } from '../molecules/StepNavigation';
import { AISuggestionPopup } from '../molecules/AISuggestionPopup';
import { RestoreProgressModal } from '../molecules/RestoreProgressModal';
import { PersonalInfoStep } from './PersonalInfoStep';
import { FamilyInfoStep } from './FamilyInfoStep';
import { SituationStep } from './SituationStep';
import { useFormManager } from '../../hooks/useFormManager';
import { useOpenAI } from '../../hooks/useOpenAI';

interface FormWizardProps {
  onSuccess: (referenceNumber: string) => void;
}

export const FormWizard: React.FC<FormWizardProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const { isPopupOpen, suggestion, currentField, closePopup, clearSuggestion } = useOpenAI();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const {
    personalForm,
    familyForm,
    situationForm,
    currentStep,
    handleNext,
    handlePrevious,
    handleSubmit,
    handleRestoreProgress,
    handleStartFresh,
    showRestoreModal,
    canProceed,
  } = useFormManager();

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await handleSubmit();
      if (result.success && result.referenceNumber) {
        onSuccess(result.referenceNumber);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestionAccept = (text: string) => {
    if (isPopupOpen && suggestion && currentField) {
      // Apply suggestion to the current step's form
      switch (currentStep) {
        case 0:
          personalForm.setValue(currentField as any, text);
          break;
        case 1:
          familyForm.setValue(currentField as any, text);
          break;
        case 2:
          situationForm.setValue(currentField as any, text);
          break;
      }
    }
    clearSuggestion();
  };

  const handleSuggestionDiscard = () => {
    clearSuggestion();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
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
          <ProgressBar currentStep={currentStep} totalSteps={3} />
        </div>
        
        <nav className="flex space-x-8 mb-6" aria-label="Progress">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${
                index <= currentStep ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  index <= currentStep
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
              currentStep={currentStep}
              totalSteps={3}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSubmit={handleFormSubmit}
              canProceed={canProceed()}
              isSubmitting={isSubmitting}
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

      <RestoreProgressModal
        isOpen={showRestoreModal}
        onRestore={handleRestoreProgress}
        onStartFresh={handleStartFresh}
        lastSavedDate={new Date()}
      />
    </div>
  );
};