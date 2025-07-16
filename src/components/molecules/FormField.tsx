import React from 'react';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/Textarea';
import { Select } from '../atoms/Select';
import { ErrorMessage } from '../atoms/ErrorMessage';

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  type?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'textarea';
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  options?: Option[];
  required?: boolean;
  disabled?: boolean;
  error?: string;
  rows?: number;
  className?: string;
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
}

export const FormField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, FormFieldProps>(({
  type = 'text',
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  options = [],
  required = false,
  disabled = false,
  error,
  rows = 4,
  className = '',
}, ref) => {
  const fieldId = `field-${name}`;
  const errorId = `error-${name}`;

  const renderField = () => {
    const commonProps = {
      id: fieldId,
      name,
      value,
      onChange,
      onBlur,
      disabled,
      required,
      error,
      placeholder,
      'aria-describedby': error ? errorId : undefined,
    };

    switch (type) {
      case 'textarea':
        return <Textarea {...commonProps} ref={ref as React.ForwardedRef<HTMLTextAreaElement>} rows={rows} />;
      case 'select':
        return <Select {...commonProps} ref={ref as React.ForwardedRef<HTMLSelectElement>} options={options} />;
      default:
        return <Input {...commonProps} ref={ref as React.ForwardedRef<HTMLInputElement>} type={type} />;
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      {renderField()}
      <ErrorMessage message={error} id={errorId} />
    </div>
  );
});