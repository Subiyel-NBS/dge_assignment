import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../atoms/Button';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  canProceed: boolean;
  isSubmitting: boolean;
  className?: string;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
  canProceed,
  isSubmitting,
  className = '',
}) => {
  const { t } = useTranslation();
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div>
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isSubmitting}
            aria-label={t('common.previous')}
          >
            {t('common.previous')}
          </Button>
        )}
      </div>
      
      <div>
        {isLastStep ? (
          <Button
            type="submit"
            variant="primary"
            onClick={onSubmit}
            disabled={!canProceed || isSubmitting}
            loading={isSubmitting}
            aria-label={t('common.submit')}
          >
            {t('common.submit')}
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={onNext}
            disabled={!canProceed || isSubmitting}
            aria-label={t('common.next')}
          >
            {t('common.next')}
          </Button>
        )}
      </div>
    </div>
  );
};