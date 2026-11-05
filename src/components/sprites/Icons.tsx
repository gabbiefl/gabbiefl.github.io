import { cn } from '../../lib/cn';
import {
  ARROW_DOWN,
  ARROW_RIGHT,
  ARROW_UP,
  ARROW_UP_RIGHT,
  CHEVRON,
  type SpriteData,
} from './data';
import { PixelSvg, type SpriteProps } from './PixelSvg';

// Ícones de UI: um traço só, na cor do texto (currentColor).
function makeIcon(sprite: SpriteData) {
  return function Icon({ className, ...props }: SpriteProps) {
    return <PixelSvg sprite={sprite} className={cn('block flex-none', className)} {...props} />;
  };
}

export const Chevron = makeIcon(CHEVRON);
export const ArrowRight = makeIcon(ARROW_RIGHT);
export const ArrowDown = makeIcon(ARROW_DOWN);
export const ArrowUpRight = makeIcon(ARROW_UP_RIGHT);
export const ArrowUp = makeIcon(ARROW_UP);

// Seta → pequena (15x15) do botão "Enviar e-mail". É um desenho diferente da seta do Hero
// (22x18), por isso tem dados próprios. Cinco retângulos escritos à mão.
export const ArrowRightSmall = makeIcon({
  box: [15, 15],
  paths: { base: 'M6 0h3v3h-3zM9 3h3v3h-3zM0 6h15v3h-15zM9 9h3v3h-3zM6 12h3v3h-3z' },
});
