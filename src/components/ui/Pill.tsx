import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'tech' | 'accent';

const VARIANT: Record<Variant, string> = {
  // Pílula de tecnologia (Experiência/Projetos): borda 1.5px, 13px/500, fundo --surface.
  // No hover: sobe 2px e fica rosa translúcido com texto escuro (o mesmo rosa dos outros hovers).
  tech: 'border-ink bg-surface px-3 py-[3px] text-[13px] leading-[1.6] font-medium motion-safe:transition-[translate,background-color] motion-safe:duration-100 motion-safe:ease-[steps(2)] hover:-translate-y-0.5 hover:border-chip-ink hover:bg-pink/70 hover:text-chip-ink motion-reduce:hover:translate-none',
  // Etiqueta rosa em Pixelify (ex.: "Atual"): sempre escura, nos dois temas.
  accent:
    'min-h-[26px] border-chip-ink bg-pink px-3 font-pixel text-sm font-semibold tracking-pixel text-chip-ink',
};

interface PillProps {
  variant?: Variant;
  /** "li" quando estiver numa lista de tecnologias. */
  as?: 'span' | 'li';
  className?: string;
  children: ReactNode;
}

/** Pílula. */
export function Pill({ variant = 'tech', as: Tag = 'span', className, children }: PillProps) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center rounded-full border-[1.5px]',
        VARIANT[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
