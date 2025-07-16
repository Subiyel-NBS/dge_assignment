import React from 'react';

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  rows?: number;
  className?: string;
  id?: string;
  name?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  error,
  rows = 4,
  className = '',
  id,
  name,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-vertical';
  
  const normalClasses = 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';
  const errorClasses = 'border-red-500 focus:border-red-500 focus:ring-red-500';
  const disabledClasses = 'bg-gray-50 cursor-not-allowed';

  const classes = `
    ${baseClasses}
    ${error ? errorClasses : normalClasses}
    ${disabled ? disabledClasses : ''}
    ${className}
  `.trim();

  return (
    <textarea
      ref={ref}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      required={required}
      rows={rows}
      className={classes}
      id={id}
      name={name}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-invalid={error ? 'true' : 'false'}
    />
  );
});