import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { THEME_KEY, readStorage, writeStorage } from '../storage';
import { ThemeContext, type Theme, type ThemePreference } from './ThemeContext';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function isPreference(value: string | null): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'auto';
}

function subscribeSystemDark(onChange: () => void) {
  const mql = window.matchMedia(DARK_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

function getSystemDark() {
  return window.matchMedia(DARK_QUERY).matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => {
    const stored = readStorage(THEME_KEY);
    return isPreference(stored) ? stored : 'light';
  });
  const systemDark = useSyncExternalStore(subscribeSystemDark, getSystemDark, () => false);

  const theme: Theme = preference === 'auto' ? (systemDark ? 'dark' : 'light') : preference;

  useEffect(() => {
    document.documentElement.dataset['theme'] = theme;
  }, [theme]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    writeStorage(THEME_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ preference, theme, setPreference }),
    [preference, theme, setPreference],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
