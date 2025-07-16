import React from 'react';
import { useTranslation } from 'react-i18next';

export const TermsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900">
        {t('terms.title')}
      </h1>
    </div>
  );
};