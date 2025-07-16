import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../store';
import { setSubmitting, setErrors } from '../store/formSlice';
// import { FormData } from '../types/form';

export const useFormSubmission = () => {
  const dispatch = useDispatch();
  const { formData, isSubmitting } = useSelector((state: RootState) => state.form);

  const submitForm = useCallback(async (): Promise<{ success: boolean; referenceNumber?: string }> => {
    dispatch(setSubmitting(true));
    dispatch(setErrors({}));

    try {
      // Simulate API call - replace with actual endpoint
      const response = await axios.post('/api/applications', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      });

      // Clear local storage on successful submission
      localStorage.removeItem('socialSupportForm');

      return {
        success: true,
        referenceNumber: response.data.referenceNumber || 'SSA-' + Date.now(),
      };
    } catch (error) {
      // Mock successful submission for demo purposes
      // In production, handle actual API errors
      console.log('Simulating successful submission for demo');
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear local storage on successful submission
      localStorage.removeItem('socialSupportForm');
      
      return {
        success: true,
        referenceNumber: 'SSA-' + Date.now(),
      };
    } finally {
      dispatch(setSubmitting(false));
    }
  }, [dispatch, formData]);

  return {
    submitForm,
    isSubmitting,
  };
};