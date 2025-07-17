import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AIAssistanceState } from '../types/form';

const initialState: AIAssistanceState = {
  loadingFields: {},
  suggestion: '',
  currentField: null,
  isPopupOpen: false,
  error: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setFieldLoading: (state, action: PayloadAction<{ fieldName: string; isLoading: boolean }>) => {
      const { fieldName, isLoading } = action.payload;
      if (isLoading) {
        state.loadingFields[fieldName] = true;
      } else {
        delete state.loadingFields[fieldName];
      }
    },
    setSuggestion: (state, action: PayloadAction<{ suggestion: string; fieldName: string }>) => {
      state.suggestion = action.payload.suggestion;
      state.currentField = action.payload.fieldName;
    },
    setPopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isPopupOpen = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSuggestion: (state) => {
      state.suggestion = '';
      state.currentField = null;
      state.error = null;
    },
  },
});

export const {
  setFieldLoading,
  setSuggestion,
  setPopupOpen,
  setError,
  clearSuggestion,
} = aiSlice.actions;

export default aiSlice.reducer;