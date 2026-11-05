import { cn } from '../../lib/cn';
import { SITE } from '../../site';

/**
 * Marca `<gabbie/>` em Pixelify Sans (fonte pixel), com os sinais < e /> mais claros
 * (opacidade .6). Link para o topo da página. Usada no cabeçalho e no rodapé, cada um com seu
 * tamanho (passado por className).
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      // O texto visível é "<gabbie/>", que um leitor de tela leria de forma estranha;
      // o aria-label troca por o nome da pessoa.
      aria-label={`${SITE.name.first} ${SITE.name.last}`}
      // Hover/foco rosa: uma sombra DURA rosa (2px de deslocamento, sem blur) atrás das letras e um
      // leve "pulo" de 1px para cima e para a esquerda, a mesma linguagem dos botões pixel (sombra
      // rosa no botão primário). Sombra, e não trocar a cor da letra, porque o rosa sobre o
      // fundo creme do tema claro quase não tem contraste: assim o texto continua legível e o
      // rosa aparece nos dois temas. Sem prefers-reduced-motion não há o "pulo" (só a sombra).
      className={cn(
        'inline-flex items-center font-pixel font-semibold tracking-pixel hover:[text-shadow:2px_2px_0_var(--pink)] focus-visible:[text-shadow:2px_2px_0_var(--pink)] motion-safe:transition-[text-shadow,translate] motion-safe:duration-100 motion-safe:ease-[steps(2)] motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:focus-visible:-translate-x-px motion-safe:focus-visible:-translate-y-px',
        className,
      )}
    >
      <span aria-hidden="true" className="font-medium opacity-60">
        &lt;
      </span>
      {SITE.wordmark}
      <span aria-hidden="true" className="font-medium opacity-60">
        /&gt;
      </span>
    </a>
  );
}
