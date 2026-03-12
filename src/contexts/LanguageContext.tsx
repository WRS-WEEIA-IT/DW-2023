import { createContext } from 'react';
import React from 'react';

interface LanguageModeContextInterface {
  languageMode: 'polish' | 'english';
  setLanguageMode: React.Dispatch<React.SetStateAction<'polish' | 'english'>>;
}

export const LanguageModeContext = createContext<LanguageModeContextInterface>(
  {} as LanguageModeContextInterface
);
