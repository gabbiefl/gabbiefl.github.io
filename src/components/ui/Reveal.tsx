import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface RevealProps {
  /** Elemento HTML do wrapper ("li" quando estiver dentro de uma lista). */
  as?: 'div' | 'li' | 'ul';
  /** Atraso em ms, para escalonar vários elementos que entram juntos. */
  delay?: number;
  className?: string;
  children: ReactNode;
}

/** Sem animação quando a pessoa pediu menos movimento ou o navegador não tem IntersectionObserver. */
const skipsMotion = () =>
  typeof IntersectionObserver === 'undefined' ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Entrada suave ao rolar: o conteúdo começa levemente abaixo e transparente e sobe até o lugar
 * quando chega à tela (uma vez só). É um efeito de "respiro": a página deixa de aparecer toda
 * de uma vez, sem chamar atenção para si.
 *
 * Como funciona:
 * - IntersectionObserver avisa quando o elemento entra na janela (sem ouvir o scroll à mão).
 * - O estado `shown` vira um atributo `data-shown`; o Tailwind aplica o estado "escondido"
 *   (opacity-0 + translate-y-4) só enquanto for false, e a transição faz o resto.
 * - `motion-safe:`: quem tem prefers-reduced-motion nunca vê o estado escondido, o conteúdo
 *   aparece direto. O estado inicial também já vem `true` nesse caso (lazy initializer), então
 *   não há nem o "pulo" de um render escondido.
 * - Importante: o conteúdo continua no DOM e acessível o tempo todo; só a aparência muda.
 */
export function Reveal({ as = 'div', delay = 0, className, children }: RevealProps) {
  // `as 'div'`: só para o TypeScript aceitar um único tipo de ref; em tempo de execução vale o
  // elemento escolhido em `as` (div, li ou ul), e aqui só usamos o que todos têm em comum.
  const Tag = as as 'div';
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(skipsMotion);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      // 6% de folga embaixo: o efeito começa um pouco depois de o elemento aparecer na borda.
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        'motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:ease-out',
        'motion-safe:data-[shown=false]:translate-y-4 motion-safe:data-[shown=false]:opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
