import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../atoms/Button';

interface RestoreProgressModalProps {
  isOpen: boolean;
  onRestore: () => void;
  onStartFresh: () => void;
  lastSavedDate: Date;
}

export const RestoreProgressModal: React.FC<RestoreProgressModalProps> = ({
  isOpen,
  onRestore,
  onStartFresh,
  lastSavedDate,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <svg
            className="w-6 h-6 text-blue-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-gray-900">
            {t('restoreProgress.title', 'Restore Progress')}
          </h2>
        </div>
        
        <p className="text-gray-600 mb-2">
          {t('restoreProgress.description', 'We found saved progress from your previous session.')}
        </p>
        
        <p className="text-sm text-gray-500 mb-6">
          {t('restoreProgress.lastSaved', 'Last saved: {{date}}', {
            date: formatDate(lastSavedDate),
          })}
        </p>
        
        <div className="flex space-x-3">
          <Button
            variant="primary"
            onClick={onRestore}
            className="flex-1"
          >
            {t('restoreProgress.restore', 'Restore Progress')}
          </Button>
          
          <Button
            variant="outline"
            onClick={onStartFresh}
            className="flex-1"
          >
            {t('restoreProgress.startFresh', 'Start Fresh')}
          </Button>
        </div>
      </div>
    </div>
  );
};