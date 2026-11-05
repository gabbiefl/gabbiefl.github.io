import { createContext } from 'react';
import type { Lang } from './types';

export interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const LangContext = createContext<LangContextValue | null>(null);
