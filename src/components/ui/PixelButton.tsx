import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'default' | 'primary';
/**
 * md: padrão (degraus 4/2px, sombra 4px, altura 52).
 * s: degraus 3/1px e sombra 3px.
 * sm: como s, com altura 40 e texto 14px.
 * sq: como s, quadrado 40x40 para ícone.
 * sq-s: como sq, porém menor (32x32), para controles discretos como o toggle de tema do header.
 */
type Size = 'md' | 's' | 'sm' | 'sq' | 'sq-s';

interface CommonProps {
  /** primary: preenchido com --ink e sombra rosa. */
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };
type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

export type PixelButtonProps = AnchorProps | ButtonProps;

function classes(variant: Variant, size: Size, className: string | undefined) {
  return cn(
    'pxb',
    variant === 'primary' && 'pxb-primary',
    size !== 'md' && 'pxb-s',
    size === 'sm' && 'pxb-sm',
    size === 'sq' && 'pxb-sq',
    size === 'sq-s' && 'pxb-sq-s',
    className,
  );
}

/** Botão "pixel-chunk". Vira <a> quando recebe href, senão <button>. */
export function PixelButton(props: PixelButtonProps) {
  if (props.href !== undefined) {
    const { variant = 'default', size = 'md', className, children, ...anchor } = props;
    return (
      <a {...anchor} className={classes(variant, size, className)}>
        <span className="pxb-o">
          <span className="pxb-i">{children}</span>
        </span>
      </a>
    );
  }

  const {
    variant = 'default',
    size = 'md',
    className,
    children,
    type = 'button',
    ...button
  } = props;
  return (
    <button {...button} type={type} className={classes(variant, size, className)}>
      <span className="pxb-o">
        <span className="pxb-i">{children}</span>
      </span>
    </button>
  );
}
