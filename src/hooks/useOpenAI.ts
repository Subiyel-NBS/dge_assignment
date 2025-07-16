import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { RootState } from '../store';
import { setLoading, setSuggestion, setError, setPopupOpen, clearSuggestion } from '../store/aiSlice';
import { OpenAIRequest, OpenAIResponse } from '../types/api';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const useOpenAI = () => {
  const dispatch = useDispatch();
  const aiState = useSelector((state: RootState) => state.ai);

  const generateSuggestion = useCallback(async (
    fieldType: 'financialSituation' | 'employmentCircumstances' | 'reasonForApplying',
    currentValue: string = '',
    userContext: string = ''
  ) => {
    if (!API_KEY) {
      dispatch(setError('OpenAI API key is not configured'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    const prompts = {
      financialSituation: `Help me describe my current financial situation for a social support application. Context: ${userContext}. Current text: "${currentValue}". Please write a clear, honest description of financial hardship that would be appropriate for a government assistance application. Keep it professional and factual.`,
      employmentCircumstances: `Help me describe my employment circumstances for a social support application. Context: ${userContext}. Current text: "${currentValue}". Please write a clear description of my employment situation and any challenges I'm facing. Keep it professional and factual.`,
      reasonForApplying: `Help me explain why I'm applying for financial assistance. Context: ${userContext}. Current text: "${currentValue}". Please write a compelling but honest reason for needing government financial support. Keep it professional and factual.`
    };

    const request: OpenAIRequest = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that helps people write professional applications for government social support. Be empathetic, professional, and factual. Keep responses concise but complete.'
        },
        {
          role: 'user',
          content: prompts[fieldType]
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    };

    try {
      const response = await axios.post<OpenAIResponse>(API_URL, request, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      });

      if (response.data.choices && response.data.choices.length > 0) {
        const suggestion = response.data.choices[0].message.content.trim();
        dispatch(setSuggestion(suggestion));
        dispatch(setPopupOpen(true));
      } else {
        dispatch(setError('No suggestion received'));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          dispatch(setError('Request timed out. Please try again.'));
        } else if (error.response?.status === 401) {
          dispatch(setError('Invalid API key. Please check your configuration.'));
        } else if (error.response?.status === 429) {
          dispatch(setError('Rate limit exceeded. Please try again later.'));
        } else {
          dispatch(setError('Failed to generate suggestion. Please try again.'));
        }
      } else {
        dispatch(setError('An unexpected error occurred.'));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const openPopup = useCallback(() => {
    dispatch(setPopupOpen(true));
  }, [dispatch]);

  const closePopup = useCallback(() => {
    dispatch(setPopupOpen(false));
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(setError(null));
  }, [dispatch]);

  const clearSuggestionCallback = useCallback(() => {
    dispatch(clearSuggestion());
  }, [dispatch]);

  return {
    ...aiState,
    generateSuggestion,
    openPopup,
    closePopup,
    clearError,
    clearSuggestion: clearSuggestionCallback,
  };
};