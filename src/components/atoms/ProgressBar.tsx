import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  className = "",
}) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-green-200 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
        />
      </div>
      <div className="text-xs text-gray-600 mt-1 text-center">
        {currentStep + 1} of {totalSteps}
      </div>
    </div>
  );
};
