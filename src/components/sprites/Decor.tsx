import { cn } from '../../lib/cn';
import { CURSOR, DIAMOND, FLOWER, SPARKLE, type SpriteData } from './data';
import { PixelSvg, type SpriteProps } from './PixelSvg';

type Tone = 'pink' | 'blue';

// O miolo rosa vira azul bebê quando tone="blue".
const TONE: Record<Tone, { pink: 'pink' | 'blue' }> = {
  pink: { pink: 'pink' },
  blue: { pink: 'blue' },
};

/** Sparkle de 4 pontas. Pequeno, sem halo no escuro. Largura original: 45px. */
export function Sparkle({ tone = 'pink', ...props }: SpriteProps & { tone?: Tone }) {
  return <PixelSvg sprite={SPARKLE} recolor={TONE[tone]} {...props} />;
}

/** Cursor azul bebê (60x90). Grande: ganha halo creme no escuro via --fx. */
export function Cursor({ className, ...props }: SpriteProps) {
  return (
    <PixelSvg
      sprite={CURSOR}
      className={cn('block overflow-visible filter-(--fx)', className)}
      {...props}
    />
  );
}

/** Adesivo de flor (81x81). Grande: ganha halo creme no escuro via --fx. */
export function Flower({ className, ...props }: SpriteProps) {
  return (
    <PixelSvg
      sprite={FLOWER}
      className={cn('block overflow-visible filter-(--fx)', className)}
      {...props}
    />
  );
}

/** Nó da linha do tempo: rosa; azul e piscando (blink) para o cargo atual. */
export function Diamond({
  tone = 'pink',
  blink = false,
  className,
  ...props
}: SpriteProps & { tone?: Tone; blink?: boolean }) {
  return (
    <PixelSvg
      sprite={DIAMOND}
      recolor={TONE[tone]}
      className={cn(blink && 'motion-safe:animate-blink', className)}
      {...props}
    />
  );
}

// Único sprite escrito à mão: o contorno cobre a forma toda e o rosa é pintado por cima.
const DOT: SpriteData = {
  box: [12, 12],
  paths: {
    ink: 'M2 0h8v2h2v8h-2v2H2v-2H0V2h2z',
    pink: 'M3 2h6v1h1v6H9v1H3V9H2V3h1z',
  },
};

/** Bolinha rosa do balão "disponível" (12x12). */
export function Dot({ blink = false, className, ...props }: SpriteProps & { blink?: boolean }) {
  return (
    <PixelSvg
      sprite={DOT}
      className={cn('block flex-none', blink && 'motion-safe:animate-blink', className)}
      {...props}
    />
  );
}
