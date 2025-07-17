import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useFormData } from '../useFormData';
import formReducer from '../../store/formSlice';
import aiReducer from '../../store/aiSlice';

const createMockStore = () => {
  return configureStore({
    reducer: {
      form: formReducer,
      ai: aiReducer,
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

  test('has updatePersonalData function', () => {
    const { result } = renderHook(() => useFormData(), { wrapper });
    
    expect(typeof result.current.updatePersonalData).toBe('function');
  });

  test('navigates to next step', () => {
    const { result } = renderHook(() => useFormData(), { wrapper });
    
    act(() => {
      result.current.nextStep();
    });
    
    expect(result.current.formState.currentStep).toBe(1);
  });

  test('has navigation functions', () => {
    const { result } = renderHook(() => useFormData(), { wrapper });
    
    expect(typeof result.current.nextStep).toBe('function');
    expect(typeof result.current.previousStep).toBe('function');
  });
});