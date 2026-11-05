import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Sparkle } from '../sprites';

/** Rótulo de seção: sparkle de 27px com miolo rosa + "0N — Nome" em Pixelify. */
export function SectionLabel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        'mb-3.5 flex items-center font-pixel text-base leading-[1.2] font-semibold tracking-pixel',
        className,
      )}
    >
      <Sparkle size={27} className="mr-2.5 inline-block flex-none align-[-4px]" />
      {children}
    </p>
  );
}
