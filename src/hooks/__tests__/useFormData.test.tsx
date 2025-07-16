import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useFormData } from '../useFormData';
import formReducer from '../../store/formSlice';

const createMockStore = () => {
  return configureStore({
    reducer: {
      form: formReducer,
      ai: () => ({ isLoading: false, suggestion: '', isPopupOpen: false, error: null }),
    },
  });
};

describe('useFormData', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  test('initializes with default form state', () => {
    const { result } = renderHook(() => useFormData(), { wrapper });
    
    expect(result.current.formState.currentStep).toBe(0);
    expect(result.current.formState.formData.personalInfo.name).toBe('');
  });

  test('updates personal data', () => {
    const { result } = renderHook(() => useFormData(), { wrapper });
    
    act(() => {
      result.current.updatePersonalData({ name: 'John Doe' });
    });
    
    expect(result.current.formState.formData.personalInfo.name).toBe('John Doe');
  });

  test('navigates to next step', () => {
    const { result } = renderHook(() => useFormData(), { wrapper });
    
    act(() => {
      result.current.nextStep();
    });
    
    expect(result.current.formState.currentStep).toBe(1);
  });

  test('navigates to previous step', () => {
    const { result } = renderHook(() => useFormData(), { wrapper });
    
    act(() => {
      result.current.nextStep();
      result.current.previousStep();
    });
    
    expect(result.current.formState.currentStep).toBe(0);
  });
});