import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { PersonalInfo, FamilyFinancialInfo, SituationDescriptions } from '../types/form';

export const useFormValidation = () => {
  const { t } = useTranslation();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateNationalId = (nationalId: string): boolean => {
    return nationalId.length >= 8 && /^\d+$/.test(nationalId);
  };

  const validatePersonalInfo = useCallback((data: PersonalInfo): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!data.name.trim()) errors.name = t('validation.nameRequired');
    if (!data.nationalId.trim()) errors.nationalId = t('validation.nationalIdRequired');
    else if (!validateNationalId(data.nationalId)) errors.nationalId = t('validation.nationalIdInvalid');
    
    if (!data.dateOfBirth) errors.dateOfBirth = t('validation.dateOfBirthRequired');
    if (!data.address.trim()) errors.address = t('validation.addressRequired');
    if (!data.city.trim()) errors.city = t('validation.cityRequired');
    if (!data.state.trim()) errors.state = t('validation.stateRequired');
    if (!data.country.trim()) errors.country = t('validation.countryRequired');
    
    if (!data.phone.trim()) errors.phone = t('validation.phoneRequired');
    else if (!validatePhone(data.phone)) errors.phone = t('validation.phoneInvalid');
    
    if (!data.email.trim()) errors.email = t('validation.emailRequired');
    else if (!validateEmail(data.email)) errors.email = t('validation.emailInvalid');

    return errors;
  }, [t]);

  const validateFamilyInfo = useCallback((data: FamilyFinancialInfo): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (data.dependents < 0) errors.dependents = t('validation.dependentsInvalid');
    if (data.monthlyIncome < 0) errors.monthlyIncome = t('validation.incomeInvalid');

    return errors;
  }, [t]);

  const validateSituationInfo = useCallback((data: SituationDescriptions): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!data.financialSituation.trim()) {
      errors.financialSituation = t('common.required');
    }
    if (!data.employmentCircumstances.trim()) {
      errors.employmentCircumstances = t('common.required');
    }
    if (!data.reasonForApplying.trim()) {
      errors.reasonForApplying = t('common.required');
    }

    return errors;
  }, [t]);

  return {
    validatePersonalInfo,
    validateFamilyInfo,
    validateSituationInfo,
  };
};