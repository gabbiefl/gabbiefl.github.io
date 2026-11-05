import { useContext } from 'react';
import { contents } from './content';
import { LangContext, type LangContextValue } from './LangContext';
import type { Content } from './types';

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang precisa estar dentro de <LangProvider>');
  return ctx;
}

/** Conteúdo (content.json) no idioma atual. */
export function useContent(): Content {
  return contents[useLang().lang];
}
