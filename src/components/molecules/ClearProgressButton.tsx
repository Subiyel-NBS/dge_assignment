import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../atoms/Button";

interface ClearProgressButtonProps {
  onClear: () => void;
  disabled?: boolean;
  className?: string;
}

export const ClearProgressButton: React.FC<ClearProgressButtonProps> = ({
  onClear,
  disabled = false,
  className = "",
}) => {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleClear = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onClear();
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-sm text-gray-600">
          {t("clearProgress.confirmMessage", "Are you sure?")}
        </span>
        <Button variant="outline" size="sm" onClick={handleConfirm}>
          {t("clearProgress.confirm", "Yes")}
        </Button>
        <Button variant="outline" size="sm" onClick={handleCancel}>
          {t("clearProgress.cancel", "No")}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClear}
      disabled={disabled}
      className={`text-red-600 hover:text-red-700 hover:border-red-300 ${className}`}
    >
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      {t("clearProgress.button", "Clear Progress")}
    </Button>
  );
};
