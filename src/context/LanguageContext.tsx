import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, TRANSLATIONS, TranslationDictionary } from '../data/translations';

interface LanguageContextType {
  language: LanguageCode;
  pendingLanguage: LanguageCode | null;
  isConfirmModalOpen: boolean;
  selectLanguage: (code: LanguageCode) => void;
  confirmLanguageChange: () => void;
  cancelLanguageChange: () => void;
  t: (key: keyof TranslationDictionary, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'statkarmayogi_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'hi' || saved === 'ta' || saved === 'en' || saved === 'te' || saved === 'ml' || saved === 'kn') {
      return saved as LanguageCode;
    }
    return 'en';
  });

  const [pendingLanguage, setPendingLanguage] = useState<LanguageCode | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const selectLanguage = (code: LanguageCode) => {
    if (code === language) return;
    setPendingLanguage(code);
    setIsConfirmModalOpen(true);
  };

  const confirmLanguageChange = () => {
    if (pendingLanguage) {
      setLanguage(pendingLanguage);
      setPendingLanguage(null);
    }
    setIsConfirmModalOpen(false);
  };

  const cancelLanguageChange = () => {
    setPendingLanguage(null);
    setIsConfirmModalOpen(false);
  };

  const t = (key: keyof TranslationDictionary, params?: Record<string, string>): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS['en'];
    let text = dict[key] || TRANSLATIONS['en'][key] || key;
    if (params) {
      Object.keys(params).forEach((paramKey) => {
        text = text.replace(`{${paramKey}}`, params[paramKey]);
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        pendingLanguage,
        isConfirmModalOpen,
        selectLanguage,
        confirmLanguageChange,
        cancelLanguageChange,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
