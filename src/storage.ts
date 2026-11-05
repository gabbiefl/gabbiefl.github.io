// Chaves duplicadas no script inline de index.html.
export const THEME_KEY = 'gf-theme';
export const LANG_KEY = 'gf-lang';

export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Armazenamento bloqueado (modo privado, política do navegador): a escolha vale só na sessão.
  }
}
