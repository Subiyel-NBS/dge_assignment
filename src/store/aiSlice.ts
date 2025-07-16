import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AIAssistanceState } from '@/types/form';

const initialState: AIAssistanceState = {
  isLoading: false,
  suggestion: '',
  isPopupOpen: false,
  error: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSuggestion: (state, action: PayloadAction<string>) => {
      state.suggestion = action.payload;
    },
    setPopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isPopupOpen = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSuggestion: (state) => {
      state.suggestion = '';
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setSuggestion,
  setPopupOpen,
  setError,
  clearSuggestion,
} = aiSlice.actions;

export default aiSlice.reducer;