import { cn } from '../../lib/cn';
import { AVATAR, LANDSCAPE } from './data';
import { PixelSvg, type SpriteProps } from './PixelSvg';

/** Paisagem do placeholder de imagem dos projetos (160x96), a 20% de opacidade. */
export function Landscape({ className, ...props }: SpriteProps) {
  return (
    <PixelSvg
      sprite={LANDSCAPE}
      className={cn('block text-chip-ink opacity-20', className)}
      {...props}
    />
  );
}

/** Busto do avatar placeholder do Sobre (144x176), a 16% de opacidade. */
export function Avatar({ className, ...props }: SpriteProps) {
  return (
    <PixelSvg
      sprite={AVATAR}
      className={cn('block text-chip-ink opacity-[.16]', className)}
      {...props}
    />
  );
}

/**
 * Barra de janela de navegador: três quadradinhos (rosa, azul, creme). Decorativa.
 * sm (padrão): barra dos cartões de projeto (26px). md: barra da janela do Contato (28px).
 */
export function BrowserBar({ className, size = 'sm' }: { className?: string; size?: 'sm' | 'md' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex flex-none items-center gap-1.5 border-b-2 border-chip-ink bg-card-cream',
        size === 'md' ? 'h-7 px-3' : 'h-[26px] px-2.5',
        className,
      )}
    >
      <i className="block size-2 border-[1.5px] border-chip-ink bg-pink" />
      <i className="block size-2 border-[1.5px] border-chip-ink bg-baby-blue" />
      <i className="block size-2 border-[1.5px] border-chip-ink bg-card-cream" />
    </div>
  );
}
