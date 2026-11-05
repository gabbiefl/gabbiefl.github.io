import type { SVGProps } from 'react';
import type { SpriteColor, SpriteData } from './data';

// Cada cor lógica do sprite vira um token (nada de hex solto). "base" segue currentColor.
const FILL_CLASS: Record<SpriteColor, string> = {
  ink: 'fill-chip-ink',
  pink: 'fill-pink',
  blue: 'fill-baby-blue',
  white: 'fill-white',
  base: 'fill-current',
};

export interface SpriteProps extends Omit<
  SVGProps<SVGSVGElement>,
  'width' | 'height' | 'viewBox' | 'children'
> {
  /** Largura em px; a altura acompanha a proporção original. */
  size?: number;
  /** Rótulo acessível. Sem ele o sprite é decorativo (aria-hidden). */
  label?: string;
}

interface PixelSvgProps extends SpriteProps {
  sprite: SpriteData;
  /** Troca uma cor lógica por outra (ex.: rosa por azul bebê). */
  recolor?: Partial<Record<SpriteColor, SpriteColor>>;
}

/** Base dos sprites: um <path> por cor, crispEdges, contorno em --chip-ink. */
export function PixelSvg({ sprite, recolor, size, label, ...rest }: PixelSvgProps) {
  const [w, h] = sprite.box;
  const width = size ?? w;
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };

  return (
    <svg
      width={width}
      height={(width * h) / w}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      focusable="false"
      {...a11y}
      {...rest}
    >
      {(Object.keys(sprite.paths) as SpriteColor[]).map((color) => (
        <path
          key={color}
          d={sprite.paths[color]}
          className={FILL_CLASS[recolor?.[color] ?? color]}
        />
      ))}
    </svg>
  );
}
