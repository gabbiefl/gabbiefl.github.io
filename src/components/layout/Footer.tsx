import { ArrowUp } from '../sprites';
import { useContent } from '../../i18n/useLang';
import { Wordmark } from './Wordmark';

/**
 * Rodapé da página: a marca à esquerda e um link de texto "Voltar ao topo" à direita.
 *
 * Fica FORA do <main> e da seção de Contato (que tem o fundo quadriculado): o rodapé usa o papel
 * liso. Um <footer> que é filho direto da página (fora de <main>/<section>) já tem, por padrão, o
 * papel de "rodapé da página" (contentinfo) para leitores de tela, sem precisar de `role`.
 */
export function Footer() {
  const { contact } = useContent();

  return (
    <footer className="grain relative overflow-clip paper-flat">
      {/* relative z-1: conteúdo acima do grão. A linha tracejada fina (a mesma dos divisores entre
          seções) separa o rodapé do Contato. */}
      <div className="relative z-1 mx-auto w-full max-w-(--container-max) px-(--gutter)">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t-[1.5px] border-dashed border-ink/25 py-7 text-sm">
          <Wordmark className="text-base" />
          {/* Só um link de texto (sem botão): discreto, com o sublinhado rosa no hover/foco. */}
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 decoration-pink decoration-[3px] underline-offset-4 opacity-70 outline-ink hover:underline hover:opacity-100 focus-visible:underline focus-visible:opacity-100 focus-visible:outline-3 focus-visible:outline-offset-4"
          >
            {contact.top}
            <ArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
