import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import aiReducer from './aiSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    ai: aiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;