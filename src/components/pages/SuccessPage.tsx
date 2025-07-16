import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../atoms/Button';

interface SuccessPageProps {
  referenceNumber: string;
  onStartOver: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({
  referenceNumber,
  onStartOver,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('success.title')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('success.message')}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">
            {t('success.referenceNumber')}:
          </p>
          <p className="text-lg font-mono font-semibold text-gray-900">
            {referenceNumber}
          </p>
        </div>

        <Button
          variant="primary"
          onClick={onStartOver}
          className="w-full"
        >
          Submit Another Application
        </Button>
      </div>
    </div>
  );
};