/** Junta nomes de classe ignorando valores falsos: cn('a', cond && 'b'). */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}
