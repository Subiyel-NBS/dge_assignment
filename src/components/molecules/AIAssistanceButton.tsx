import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../atoms/Button';

interface AIAssistanceButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
  className?: string;
}

export const AIAssistanceButton: React.FC<AIAssistanceButtonProps> = ({
  onClick,
  isLoading,
  disabled = false,
  className = '',
}) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      loading={isLoading}
      className={`flex items-center gap-2 ${className}`}
      aria-label={t('common.helpMeWrite')}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      {t('common.helpMeWrite')}
    </Button>
  );
};