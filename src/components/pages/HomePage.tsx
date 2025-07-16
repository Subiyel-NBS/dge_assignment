import React, { useState } from 'react';
import { FormWizard } from '../organisms/FormWizard';
import { SuccessPage } from './SuccessPage';

export const HomePage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleFormSuccess = (refNumber: string) => {
    setReferenceNumber(refNumber);
    setIsSubmitted(true);
  };

  const handleStartOver = () => {
    setIsSubmitted(false);
    setReferenceNumber('');
  };

  if (isSubmitted) {
    return <SuccessPage referenceNumber={referenceNumber} onStartOver={handleStartOver} />;
  }

  return (
    <div className="py-8">
      <FormWizard onSuccess={handleFormSuccess} />
    </div>
  );
};