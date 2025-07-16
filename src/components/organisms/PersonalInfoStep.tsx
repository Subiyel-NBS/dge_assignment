import React from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../molecules/FormField';
import { PersonalInfo } from '../../types/form';

interface PersonalInfoStepProps {
  form: UseFormReturn<PersonalInfo>;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ form }) => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = form;

  const genderOptions = [
    { value: 'male', label: t('personalInfo.genderOptions.male') },
    { value: 'female', label: t('personalInfo.genderOptions.female') },
    { value: 'other', label: t('personalInfo.genderOptions.other') },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('personalInfo.title')}
        </h2>
        <p className="text-gray-600">
          {t('personalInfo.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          type="text"
          label={t('personalInfo.name')}
          {...register('name', { required: t('validation.nameRequired') })}
          error={errors.name?.message}
          required
        />

        <FormField
          type="text"
          label={t('personalInfo.nationalId')}
          {...register('nationalId', { 
            required: t('validation.nationalIdRequired'),
            pattern: {
              value: /^\d{8,}$/,
              message: t('validation.nationalIdInvalid')
            }
          })}
          error={errors.nationalId?.message}
          required
        />

        <FormField
          type="date"
          label={t('personalInfo.dateOfBirth')}
          {...register('dateOfBirth', { required: t('validation.dateOfBirthRequired') })}
          error={errors.dateOfBirth?.message}
          required
        />

        <FormField
          type="select"
          label={t('personalInfo.gender')}
          {...register('gender', { required: true })}
          options={genderOptions}
          error={errors.gender?.message}
          required
        />

        <FormField
          type="text"
          label={t('personalInfo.address')}
          {...register('address', { required: t('validation.addressRequired') })}
          error={errors.address?.message}
          required
          className="md:col-span-2"
        />

        <FormField
          type="text"
          label={t('personalInfo.city')}
          {...register('city', { required: t('validation.cityRequired') })}
          error={errors.city?.message}
          required
        />

        <FormField
          type="text"
          label={t('personalInfo.state')}
          {...register('state', { required: t('validation.stateRequired') })}
          error={errors.state?.message}
          required
        />

        <FormField
          type="text"
          label={t('personalInfo.country')}
          {...register('country', { required: t('validation.countryRequired') })}
          error={errors.country?.message}
          required
        />

        <FormField
          type="tel"
          label={t('personalInfo.phone')}
          {...register('phone', { 
            required: t('validation.phoneRequired'),
            pattern: {
              value: /^[+]?[1-9][\d]{7,15}$/,
              message: t('validation.phoneInvalid')
            }
          })}
          error={errors.phone?.message}
          required
        />

        <FormField
          type="email"
          label={t('personalInfo.email')}
          {...register('email', { 
            required: t('validation.emailRequired'),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('validation.emailInvalid')
            }
          })}
          error={errors.email?.message}
          required
        />
      </div>
    </div>
  );
};