import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface TechTileProps {
  /** Nome da tecnologia: vira o texto do balão e o nome acessível do logo. */
  name: string;
  /** O logo em si (um <img> de SVG). Decorativo: o nome vem de `name`. */
  children: ReactNode;
  className?: string;
}

/**
 * Logo de uma tecnologia, SOLTO sobre o papel (sem cartão), com o NOME num balão ao passar o
 * mouse ou focar. O logo é o protagonista; o nome fica em segundo plano.
 *
 * Detalhes que importam:
 * - No hover/foco o logo sobe 2px e a casa dele fica rosa a 70% (o rosa dos hovers do
 *   site); o balão com o nome aparece acima.
 * - `tabIndex={0}` no <li>: sem isso, quem usa teclado ou toque nunca veria o nome. No celular,
 *   tocar no logo o foca (por isso `group-focus`, e não só `group-hover`).
 * - O nome acessível vem do `role="img"` + `aria-label` que envolve o logo (o leitor de tela lê
 *   "Node.js"). O balão é `aria-hidden` para não repetir; ele existe no DOM só para o visual.
 * - Quem tem `prefers-reduced-motion` não perde nada: o balão só liga e desliga, sem animação.
 */
export function TechTile({ name, children, className }: TechTileProps) {
  return (
    <li
      tabIndex={0}
      className={cn(
        'group relative block outline-ink focus-visible:outline-3 focus-visible:outline-offset-2',
        className,
      )}
    >
      {/* Casa de 56px do logo; fica rosa translúcido (70%, em degraus) no hover/foco. */}
      <span className="grid size-14 place-items-center transition-transform duration-75 ease-[steps(2)] pixel-clip pixel-step-2 group-hover:-translate-y-0.5 group-hover:bg-pink/70 group-focus:-translate-y-0.5 group-focus:bg-pink/70 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
        <span role="img" aria-label={name} className="grid place-items-center">
          {children}
        </span>
      </span>

      {/* Balão do nome, acima do logo. `hidden` + `group-hover:block` liga/desliga seco, no
          espírito pixel. bg-ink/text-on-ink: escuro no tema claro e claro no escuro. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 bg-ink px-2.5 py-1 font-pixel text-[13px] leading-[1.3] font-semibold tracking-pixel whitespace-nowrap text-on-ink pixel-clip pixel-step-2 group-hover:block group-focus:block"
      >
        {name}
      </span>
    </li>
  );
}
