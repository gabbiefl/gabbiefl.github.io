import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LANG_KEY, readStorage, writeStorage } from '../storage';
import { SITE } from '../site';
import { contents } from './content';
import { LangContext } from './LangContext';
import type { Lang } from './types';

function isLang(value: string | null): value is Lang {
  return value === 'pt' || value === 'en';
}

function initialLang(): Lang {
  const stored = readStorage(LANG_KEY);
  if (isLang(stored)) return stored;
  return /^pt/i.test(navigator.language) ? 'pt' : 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    // Título da aba acompanha o idioma: "Gabriela Flores | Full-Stack Developer".
    document.title = `${SITE.name.first} ${SITE.name.last} | ${contents[lang].hero.role}`;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    writeStorage(LANG_KEY, next);
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LangContext value={value}>{children}</LangContext>;
}
