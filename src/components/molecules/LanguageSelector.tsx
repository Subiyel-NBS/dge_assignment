import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '../atoms/Select';

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
}) => {
  const { i18n } = useTranslation();

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);
    
    // Update document direction for RTL support
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Select
        value={i18n.language}
        onChange={handleLanguageChange}
        options={languageOptions}
        className="w-auto min-w-[120px]"
        aria-label="Select language"
      />
    </div>
  );
};