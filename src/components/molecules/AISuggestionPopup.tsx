import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../atoms/Button';
import { Textarea } from '../atoms/Textarea';

interface AISuggestionPopupProps {
  isOpen: boolean;
  suggestion: string;
  onAccept: (text: string) => void;
  onDiscard: () => void;
  onClose: () => void;
}

export const AISuggestionPopup: React.FC<AISuggestionPopupProps> = ({
  isOpen,
  suggestion,
  onAccept,
  onDiscard,
  onClose,
}) => {
  const { t } = useTranslation();
  const [editedText, setEditedText] = useState(suggestion);

  React.useEffect(() => {
    setEditedText(suggestion);
  }, [suggestion]);

  if (!isOpen) return null;

  const handleAccept = () => {
    onAccept(editedText);
    onClose();
  };

  const handleDiscard = () => {
    onDiscard();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('ai.suggestion')}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3">
              {t('ai.editBeforeAccepting')}
            </p>
            <Textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={6}
              className="w-full"
              placeholder={t('ai.suggestion')}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={handleDiscard}
            >
              {t('common.discard')}
            </Button>
            <Button
              variant="outline"
              onClick={() => setEditedText(suggestion)}
              disabled={editedText === suggestion}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              onClick={handleAccept}
              disabled={!editedText.trim()}
            >
              {t('common.accept')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};