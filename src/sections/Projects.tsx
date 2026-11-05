import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Chevron, GithubIcon } from '../components/sprites';
import {
  Highlight,
  PixelButton,
  PixelCard,
  Pill,
  ProjectImage,
  Reveal,
  SectionLabel,
} from '../components/ui';
import { useContent } from '../i18n/useLang';
import { externalLinkProps } from '../lib/externalLink';

// Cor de fundo da miniatura de cada projeto, por posição: azul, rosa, bege.
const TONES = ['blue', 'pink', 'beige'] as const;

// Espaço entre os cartões em px. Precisa bater com o `gap-5` (20px) da faixa, porque o passo das
// setas é a largura de um cartão MAIS este espaço.
const GAP = 20;

/**
 * Seção "Projetos" como CARROSSEL: os cartões ficam lado a lado, todos do mesmo tamanho, numa
 * faixa que rola na horizontal (arrastando no celular, ou pelas setas no computador).
 *
 * A rolagem é a do próprio navegador (overflow-x + scroll-snap), em vez de um carrossel
 * "feito à mão" com transform: assim o gesto de arrastar, o teclado (Tab leva o foco ao
 * cartão e a faixa rola até ele) e a rolagem por trackpad funcionam sem código extra. As setas
 * são só um atalho que chama scrollBy.
 */
export function Projects() {
  const { projects } = useContent();

  // A faixa que rola. Precisamos dela para ler a posição (scrollLeft) e mandar rolar (scrollBy).
  const trackRef = useRef<HTMLUListElement>(null);
  // Cada seta fica desabilitada quando não há mais para onde rolar naquele sentido.
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Lê a posição da faixa e atualiza as duas setas. A folga de 1px evita falso positivo por
  // arredondamento de subpixel (scrollLeft costuma vir fracionado em telas de alta densidade).
  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 1);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    // Atualiza ao rolar e quando a faixa muda de tamanho (girar o celular, redimensionar a
    // janela, trocar de idioma e mudar a altura/largura dos textos).
    track.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [update, projects.projects.length]);

  // Rola um cartão para cada lado. Com prefers-reduced-motion, pula direto (sem animação).
  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector('li');
    if (!track || !card) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + GAP),
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  // Com poucos projetos (cabem todos na tela) não há o que rolar: as setas somem.
  const hasOverflow = canPrev || canNext;

  return (
    <section id="projects" className="grain relative overflow-clip paper-flat py-(--section-y)">
      <div className="relative z-1 mx-auto w-full max-w-(--container-max) px-(--gutter)">
        <Reveal>
          <SectionLabel>{projects.label}</SectionLabel>
          <h2 className="m-0 max-w-[16em] font-serif text-(length:--title-size) leading-[1.06] font-bold tracking-tight">
            {projects.h1a} <Highlight>{projects.h1b}</Highlight>
          </h2>
          <p className="mt-5.5 mb-0 max-w-[56ch]">{projects.intro}</p>
        </Reveal>

        {/* A FAIXA do carrossel:
            - flex + overflow-x-auto: cartões em fila, com rolagem horizontal quando passam da largura;
            - snap-x snap-mandatory + snap-start em cada cartão: ao soltar, a rolagem "encaixa" no
              início de um cartão (não para no meio de dois);
            - pb-3 pr-3: folga para a SOMBRA dura dos cartões (4px) não ser cortada, já que
              overflow-x também corta o eixo vertical;
            - [scrollbar-width:none]: esconde a barra (as setas e o arrastar fazem o papel dela). */}
        <div className="relative mt-[clamp(32px,4vw,48px)]">
          <ul
            ref={trackRef}
            className="mb-0 flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto p-0 pr-3 pb-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.projects.map((project, index) => (
              // shrink-0: o cartão NÃO encolhe para caber (senão viraria uma coluna espremida).
              // Largura: um terço da faixa (menos os 2 espaços de 20px = 2.5rem), entre 280px e 340px.
              // Assim 3 cartões cabem EXATOS na faixa no desktop (antes eles tinham largura fixa e o
              // terceiro ficava cortado na borda direita); com 4 ou mais, ou em telas estreitas, a
              // faixa rola e as setas aparecem.
              // flex + stretch (padrão): todos os cartões da fila ficam com a MESMA altura.
              //
              // O <li> é o próprio Reveal: cada cartão entra com um atraso maior que o anterior. Os
              // que estão fora da tela (à direita da faixa) entram quando a rolagem os traz à
              // vista, porque o IntersectionObserver considera o recorte da faixa.
              <Reveal
                key={project.num}
                as="li"
                delay={index * 100}
                className="w-[clamp(280px,calc((100%-2.5rem)/3),340px)] shrink-0 snap-start"
              >
                <PixelCard
                  as="article"
                  shadow={4}
                  className="h-full"
                  innerClassName="flex flex-col gap-4 p-4"
                >
                  <ProjectImage
                    src={project.image}
                    // Com imagem real, o alt descreve o projeto; no placeholder, o rótulo genérico.
                    alt={project.image ? project.title : projects.thumbLabel}
                    fit={project.imageFit === 'contain' ? 'contain' : 'cover'}
                    shape={project.imageShape === 'circle' ? 'circle' : 'rect'}
                    tone={TONES[index % TONES.length] ?? 'blue'}
                  />

                  <div className="flex min-w-0 flex-1 flex-col">
                    {/* Hierarquia tipográfica do cartão: título em Fraunces PESO 600 (os h2 das
                      seções usam 700) e tamanho moderado; descrição em Inter normal, menor e com
                      mais respiro entre linhas. (Não há rótulo "01 — Projeto": o cartão fica só
                      com o que importa.) */}
                    <h3 className="m-0 font-serif text-[1.0625rem] leading-snug font-semibold tracking-[-0.01em]">
                      {project.title}
                    </h3>
                    <p className="mt-2 mb-0 text-sm leading-relaxed font-normal opacity-85">
                      {project.desc}
                    </p>

                    <ul
                      aria-label={projects.techLabel}
                      className="mt-3 mb-0 flex flex-wrap gap-1.5 p-0"
                    >
                      {project.tech.map((tech) => (
                        <Pill key={tech} as="li">
                          {tech}
                        </Pill>
                      ))}
                    </ul>

                    {/* Cada botão só aparece se o projeto tiver o link (ex.: o ADA não tem demo).
                      mt-auto: empurra os botões para o fim do cartão, então ficam alinhados
                      embaixo mesmo com descrições de tamanhos diferentes. */}
                    {(project.demoUrl || project.codeUrl) && (
                      <div className="mt-auto flex flex-wrap gap-x-3 gap-y-2.5 pt-4">
                        {project.demoUrl && (
                          <PixelButton
                            href={project.demoUrl}
                            size="sm"
                            variant="primary"
                            {...externalLinkProps(project.demoUrl)}
                          >
                            {projects.demo}
                            <ArrowUpRight />
                          </PixelButton>
                        )}
                        {/* Código: só o logo do GitHub (o mesmo ícone do Hero e do Contato), num botão quadrado pequeno e sem destaque (o
                          texto fica no aria-label e no title, para leitor de tela e tooltip). É
                          mais discreto que um botão com texto, e o logo já diz o que é. */}
                        {project.codeUrl && (
                          <PixelButton
                            href={project.codeUrl}
                            size="sq-s"
                            aria-label={projects.code}
                            title={projects.code}
                            {...externalLinkProps(project.codeUrl)}
                          >
                            <GithubIcon width={16} height={16} />
                          </PixelButton>
                        )}
                      </div>
                    )}
                  </div>
                </PixelCard>
              </Reveal>
            ))}
          </ul>

          {/* Setas nas LATERAIS do carrossel, centralizadas na altura da faixa.
              - Telas largas (>=1100px): ficam FORA da faixa, na margem lateral (a margem é de
                ~64px e a seta de 36px cabe), sem cobrir nenhum cartão.
              - Telas menores (a margem é estreita demais): ficam por CIMA das bordas da faixa.
              `-translate-y-1/2` usa a propriedade `translate`, separada do `transform` que o
              botão usa no hover, então os dois efeitos não se atrapalham.
              Só aparecem quando há o que rolar, e `disabled` apaga a seta no começo/fim. */}
          {hasOverflow && (
            <>
              <PixelButton
                size="sq-s"
                aria-label={projects.prev}
                title={projects.prev}
                disabled={!canPrev}
                onClick={() => scrollByCard(-1)}
                className="absolute top-1/2 left-1 z-2 -translate-y-1/2 min-[1100px]:-left-14"
              >
                <Chevron size={16} className="rotate-90" />
              </PixelButton>
              <PixelButton
                size="sq-s"
                aria-label={projects.next}
                title={projects.next}
                disabled={!canNext}
                onClick={() => scrollByCard(1)}
                className="absolute top-1/2 right-4 z-2 -translate-y-1/2 min-[1100px]:-right-14"
              >
                <Chevron size={16} className="-rotate-90" />
              </PixelButton>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
