import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Shadow = 3 | 4 | 6;
type Tone = 'paper' | 'cream' | 'pink' | 'blue';
type Outline = 'ink' | 'chip';

// Classes completas (não montadas por template) para o Tailwind encontrá-las no código.
const SHADOW: Record<Shadow, string> = {
  3: 'pixel-shadow-3',
  4: 'pixel-shadow-4',
  6: 'pixel-shadow-6',
};
const TONE: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  cream: 'bg-card-cream text-chip-ink',
  pink: 'bg-pink text-chip-ink',
  blue: 'bg-baby-blue text-chip-ink',
};
const OUTLINE: Record<Outline, string> = {
  ink: 'bg-ink',
  chip: 'bg-chip-ink',
};

export interface PixelCardProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  /** Elemento HTML do cartão (ex.: "li" dentro de uma lista, "article" para um projeto). */
  as?: 'div' | 'article' | 'li' | 'section';
  /** Tamanho da sombra dura em px: 3 (ícones da Stack), 4 (Sobre e Experiência), 6 (projetos, polaroid). */
  shadow?: Shadow;
  /** Cor do miolo. cream é o cartão do polaroid (#FFFDF8). */
  tone?: Tone;
  /** ink segue o tema; chip fica sempre escuro (ícones da Stack). */
  outline?: Outline;
  /** Classes do elemento externo (layout, altura, rotação). */
  className?: string;
  /** Classes do miolo (padding, grid, gap). */
  innerClassName?: string;
  /**
   * Se true (padrão), contorno e miolo ocupam 100% da altura do elemento externo. Isso é o que
   * faz cartões da mesma linha de uma grade terem a mesma altura por inteiro (Sobre, Projetos).
   * Passe false quando o miolo tem altura própria (ex.: o quadradinho de 52px da Stack):
   * `h-full` e `size-13` brigam pela mesma propriedade, e o `h-full` ganhava, achatando o ícone.
   */
  fill?: boolean;
  children?: ReactNode;
}

/** Cartão pixel: contorno .o, miolo .i, degraus 4/2px e sombra dura. */
export function PixelCard({
  as = 'div',
  shadow = 4,
  tone = 'paper',
  outline = 'ink',
  className,
  innerClassName,
  fill = true,
  children,
  ...rest
}: PixelCardProps) {
  const Tag: ElementType = as;
  return (
    <Tag {...rest} className={cn('block', SHADOW[shadow], className)}>
      <div className={cn(fill && 'h-full', 'p-0.5 pixel-clip pixel-step-4', OUTLINE[outline])}>
        <div
          className={cn(fill && 'h-full', 'pixel-clip pixel-step-2', TONE[tone], innerClassName)}
        >
          {children}
        </div>
      </div>
    </Tag>
  );
}
