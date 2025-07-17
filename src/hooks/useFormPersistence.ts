import { useEffect, useCallback, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

// Simple debounce implementation
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } => {
  let timeout: NodeJS.Timeout | null = null;
  
  const debouncedFunc = ((...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  }) as T & { cancel: () => void };
  
  debouncedFunc.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  return debouncedFunc;
};

const STORAGE_KEY = 'social-support-form-data';

interface FormPersistenceOptions {
  debounceMs?: number;
  storage?: Storage;
}

export const useFormPersistence = <T extends Record<string, any>>(
  form: UseFormReturn<T>,
  key: string,
  options: FormPersistenceOptions = {}
) => {
  const { debounceMs = 500, storage = localStorage } = options;
  const isInitializedRef = useRef(false);
  const previousValuesRef = useRef<T | null>(null);

  // Load saved data on mount
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const saved = storage.getItem(`${STORAGE_KEY}-${key}`);
        if (saved) {
          const parsedData = JSON.parse(saved);
          form.reset(parsedData);
          previousValuesRef.current = parsedData;
        }
      } catch (error) {
        console.error(`Failed to load saved data for ${key}:`, error);
      } finally {
        isInitializedRef.current = true;
      }
    };

    loadSavedData();
  }, [form, key, storage]);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce((data: T) => {
      try {
        storage.setItem(`${STORAGE_KEY}-${key}`, JSON.stringify(data));
      } catch (error) {
        console.error(`Failed to save data for ${key}:`, error);
      }
    }, debounceMs),
    [key, storage, debounceMs]
  );

  // Watch for form changes and save
  useEffect(() => {
    if (!isInitializedRef.current) return;

    const subscription = form.watch((value) => {
      // Only save if values actually changed
      if (JSON.stringify(value) !== JSON.stringify(previousValuesRef.current)) {
        previousValuesRef.current = value as T;
        debouncedSave(value as T);
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [form, debouncedSave]);

  // Clear saved data
  const clearSavedData = useCallback(() => {
    try {
      storage.removeItem(`${STORAGE_KEY}-${key}`);
      previousValuesRef.current = null;
    } catch (error) {
      console.error(`Failed to clear saved data for ${key}:`, error);
    }
  }, [key, storage]);

  // Check if data exists
  const hasSavedData = useCallback(() => {
    try {
      return storage.getItem(`${STORAGE_KEY}-${key}`) !== null;
    } catch {
      return false;
    }
  }, [key, storage]);

  return {
    clearSavedData,
    hasSavedData,
    isInitialized: isInitializedRef.current,
  };
};