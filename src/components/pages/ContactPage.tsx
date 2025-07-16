import React from 'react';
import { useTranslation } from 'react-i18next';

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold text-gray-900">
        {t('contact.title')}
      </h1>
    </div>
  );
};