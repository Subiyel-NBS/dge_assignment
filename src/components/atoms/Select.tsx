import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  value,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  error,
  placeholder,
  className = '',
  id,
  name,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white';
  
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
    <select
      ref={ref}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      required={required}
      className={classes}
      id={id}
      name={name}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-invalid={error ? 'true' : 'false'}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});