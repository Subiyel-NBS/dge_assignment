import React from 'react';

interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  required = false,
  children,
  className = '',
}) => {
  const classes = `block text-sm font-medium text-gray-700 mb-1 ${className}`.trim();

  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
      {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
    </label>
  );
};