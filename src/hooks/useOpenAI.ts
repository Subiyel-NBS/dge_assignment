import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../store";
import {
  setLoading,
  setSuggestion,
  setError,
  setPopupOpen,
  clearSuggestion,
} from "../store/aiSlice";
import HttpClient from "../services/HttpClient";

const httpClient = new HttpClient({
  baseURL: "http://localhost:5000",
  timeout: 30000,
});

export const useOpenAI = () => {
  const dispatch = useDispatch();
  const aiState = useSelector((state: RootState) => state.ai);

  const generateSuggestion = useCallback(
    async (
      fieldType:
        | "financialSituation"
        | "employmentCircumstances"
        | "reasonForApplying",
      currentValue: string = "",
      userContext: string = ""
    ) => {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const prompts = {
        financialSituation: `Help me describe my current financial situation for a social support application. Context: ${userContext}. Current text: "${currentValue}". Please write a clear, honest description of financial hardship that would be appropriate for a government assistance application. Keep it professional and factual.`,
        employmentCircumstances: `Help me describe my employment circumstances for a social support application. Context: ${userContext}. Current text: "${currentValue}". Please write a clear description of my employment situation and any challenges I'm facing. Keep it professional and factual.`,
        reasonForApplying: `Help me explain why I'm applying for financial assistance. Context: ${userContext}. Current text: "${currentValue}". Please write a compelling but honest reason for needing government financial support. Keep it professional and factual.`,
      };

      const systemPrompt =
        "You are a helpful assistant that helps people write professional applications for government social support. Be empathetic, professional, and factual. Keep responses concise but complete.";
      const fullPrompt = `${systemPrompt}\n\n${prompts[fieldType]}`;

      try {
        const response = await httpClient.post("/api/chat", {
          prompt: fullPrompt,
        });

        if (response.data.success && response.data.response) {
          const suggestion = response.data.response.trim();
          dispatch(setSuggestion(suggestion));
          dispatch(setPopupOpen(true));
        } else {
          const errorMessage = "No suggestion received";
          dispatch(setError(errorMessage));
          toast.error(errorMessage);
        }
      } catch (error: any) {
        let errorMessage = "";
        
        if (error.code === "ECONNABORTED") {
          errorMessage = "Request timed out. Please try again.";
        } else if (error.status === 401) {
          errorMessage = "Invalid API key. Please check your configuration.";
        } else if (error.status === 429) {
          errorMessage = "Rate limit exceeded. Please try again later.";
        } else if (error.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = error.message || "Failed to generate suggestion. Please try again.";
        }
        
        dispatch(setError(errorMessage));
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

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
