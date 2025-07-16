import React from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../molecules/FormField';
import { FamilyFinancialInfo } from '../../types/form';

interface FamilyInfoStepProps {
  form: UseFormReturn<FamilyFinancialInfo>;
}

export const FamilyInfoStep: React.FC<FamilyInfoStepProps> = ({ form }) => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = form;

  const maritalStatusOptions = [
    { value: 'single', label: t('familyInfo.maritalOptions.single') },
    { value: 'married', label: t('familyInfo.maritalOptions.married') },
    { value: 'divorced', label: t('familyInfo.maritalOptions.divorced') },
    { value: 'widowed', label: t('familyInfo.maritalOptions.widowed') },
  ];

  const employmentStatusOptions = [
    { value: 'employed', label: t('familyInfo.employmentOptions.employed') },
    { value: 'unemployed', label: t('familyInfo.employmentOptions.unemployed') },
    { value: 'self-employed', label: t('familyInfo.employmentOptions.self-employed') },
    { value: 'retired', label: t('familyInfo.employmentOptions.retired') },
    { value: 'student', label: t('familyInfo.employmentOptions.student') },
  ];

  const housingStatusOptions = [
    { value: 'owned', label: t('familyInfo.housingOptions.owned') },
    { value: 'rented', label: t('familyInfo.housingOptions.rented') },
    { value: 'staying_with_family', label: t('familyInfo.housingOptions.staying_with_family') },
    { value: 'homeless', label: t('familyInfo.housingOptions.homeless') },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('familyInfo.title')}
        </h2>
        <p className="text-gray-600">
          {t('familyInfo.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          type="select"
          label={t('familyInfo.maritalStatus')}
          {...register('maritalStatus', { required: true })}
          options={maritalStatusOptions}
          error={errors.maritalStatus?.message}
          required
        />

        <FormField
          type="number"
          label={t('familyInfo.dependents')}
          {...register('dependents', { 
            required: true,
            min: {
              value: 0,
              message: t('validation.dependentsInvalid')
            }
          })}
          error={errors.dependents?.message}
          required
        />

        <FormField
          type="select"
          label={t('familyInfo.employmentStatus')}
          {...register('employmentStatus', { required: true })}
          options={employmentStatusOptions}
          error={errors.employmentStatus?.message}
          required
        />

        <FormField
          type="number"
          label={t('familyInfo.monthlyIncome')}
          {...register('monthlyIncome', { 
            required: true,
            min: {
              value: 0,
              message: t('validation.incomeInvalid')
            }
          })}
          error={errors.monthlyIncome?.message}
          required
        />

        <FormField
          type="select"
          label={t('familyInfo.housingStatus')}
          {...register('housingStatus', { required: true })}
          options={housingStatusOptions}
          error={errors.housingStatus?.message}
          required
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};