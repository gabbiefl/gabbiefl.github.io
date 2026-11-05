import { createContext } from 'react';

/** Escolha da pessoa: "auto" segue prefers-color-scheme. */
export type ThemePreference = 'light' | 'dark' | 'auto';
/** Tema aplicado em data-theme. */
export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  preference: ThemePreference;
  theme: Theme;
  setPreference: (preference: ThemePreference) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
