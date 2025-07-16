import React from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../molecules/FormField';
import { AIAssistanceButton } from '../molecules/AIAssistanceButton';
import { useOpenAI } from '../../hooks/useOpenAI';
import { SituationDescriptions } from '../../types/form';

interface SituationStepProps {
  form: UseFormReturn<SituationDescriptions>;
}

export const SituationStep: React.FC<SituationStepProps> = ({ form }) => {
  const { t } = useTranslation();
  const { register, formState: { errors }, watch, setValue } = form;
  const { isLoading, generateSuggestion } = useOpenAI();

  const watchedValues = watch();

  const handleAIAssistance = (fieldName: keyof SituationDescriptions) => {
    const currentValue = watchedValues[fieldName] || '';
    const userContext = `Employment: ${watchedValues.employmentCircumstances || 'Not specified'}, Financial: ${watchedValues.financialSituation || 'Not specified'}`;
    
    generateSuggestion(fieldName, currentValue, userContext);
  };

  const handleSuggestionAccept = (fieldName: keyof SituationDescriptions, text: string) => {
    setValue(fieldName, text);
  };

  // We'll handle the suggestion acceptance in the parent component
  React.useEffect(() => {
    // This effect is intentionally empty as suggestion handling is done in FormWizard
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('situationInfo.title')}
        </h2>
        <p className="text-gray-600">
          {t('situationInfo.description')}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t('situationInfo.financialSituation')}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <AIAssistanceButton
              onClick={() => handleAIAssistance('financialSituation')}
              isLoading={isLoading}
            />
          </div>
          <FormField
            type="textarea"
            label=""
            {...register('financialSituation', { required: t('common.required') })}
            placeholder={t('situationInfo.financialSituationPlaceholder')}
            error={errors.financialSituation?.message}
            rows={4}
            className="mb-0"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t('situationInfo.employmentCircumstances')}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <AIAssistanceButton
              onClick={() => handleAIAssistance('employmentCircumstances')}
              isLoading={isLoading}
            />
          </div>
          <FormField
            type="textarea"
            label=""
            {...register('employmentCircumstances', { required: t('common.required') })}
            placeholder={t('situationInfo.employmentCircumstancesPlaceholder')}
            error={errors.employmentCircumstances?.message}
            rows={4}
            className="mb-0"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t('situationInfo.reasonForApplying')}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <AIAssistanceButton
              onClick={() => handleAIAssistance('reasonForApplying')}
              isLoading={isLoading}
            />
          </div>
          <FormField
            type="textarea"
            label=""
            {...register('reasonForApplying', { required: t('common.required') })}
            placeholder={t('situationInfo.reasonForApplyingPlaceholder')}
            error={errors.reasonForApplying?.message}
            rows={4}
            className="mb-0"
          />
        </div>
      </div>
    </div>
  );
};