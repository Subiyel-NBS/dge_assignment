import React from 'react';

interface ErrorMessageProps {
  message?: string;
  className?: string;
  id?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = '',
  id,
}) => {
  if (!message) return null;

  const classes = `text-sm text-red-600 mt-1 ${className}`.trim();

  return (
    <div id={id} className={classes} role="alert" aria-live="polite">
      {message}
    </div>
  );
};