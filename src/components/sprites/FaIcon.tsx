import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../../lib/cn';

interface FaIconProps {
  className?: string;
  /** Tamanho em px. Se omitido, usa o padrão definido na criação do ícone. */
  size?: number;
  /** Rótulo acessível. Sem ele o ícone é decorativo (o Font Awesome já põe aria-hidden). */
  label?: string;
}

interface FaIconDefaults {
  /** Tamanho padrão em px. */
  size: number;
  /** Classes sempre aplicadas (ex.: a cor). */
  className: string;
}

/**
 * Fábrica de componentes de ícone Font Awesome. Existe para os ícones da Stack e os do toggle
 * de tema compartilharem a mesma estrutura (tamanho em px, rótulo opcional, cor por classe), em
 * vez de cada arquivo repetir o <FontAwesomeIcon ...>.
 *
 * Importar só os ícones necessários (e não a biblioteca inteira) mantém o bundle pequeno.
 */
export function makeFaIcon(icon: IconDefinition, defaults: FaIconDefaults) {
  return function FaIcon({ className, size = defaults.size, label }: FaIconProps) {
    return (
      <FontAwesomeIcon
        icon={icon}
        className={cn('block', defaults.className, className)}
        // fontSize em px: o SVG do FA mede 1em de altura, então isso define o tamanho.
        style={{ fontSize: size }}
        // `title` só quando há rótulo: ele tira o aria-hidden e torna o ícone anunciável.
        {...(label ? { title: label } : {})}
      />
    );
  };
}
