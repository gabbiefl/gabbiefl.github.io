import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

/** Destaque de palavra: faixa rosa no claro, bloco rosa no escuro; texto sempre escuro. */
export function Highlight({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cn('highlight', className)}>{children}</span>;
}
