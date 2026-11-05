import { Diamond } from '../components/sprites';
import { Highlight, Pill, Reveal, SectionLabel } from '../components/ui';
import { useContent } from '../i18n/useLang';
import type { ExperienceContent, Job } from '../i18n/types';

/**
 * Seção "Experiência".
 *
 * Desktop: duas colunas. A da esquerda (título + introdução) é STICKY e acompanha a rolagem
 * enquanto a linha do tempo da direita passa. Mobile (<900px): uma coluna, sem sticky.
 */
export function Experience() {
  const { experience } = useContent();

  return (
    // O container NÃO pode ter overflow:hidden. Qualquer valor de overflow diferente de
    // `visible` transforma o elemento no "ancestral de rolagem" do sticky, e o sticky passa a
    // grudar nele (que nunca rola) em vez de na janela, ou seja, para de funcionar.
    // `overflow-clip` recorta sem criar esse ancestral de rolagem.
    <section id="experience" className="grain relative overflow-clip paper-flat py-(--section-y)">
      {/* relative z-1: conteúdo acima do grão (que fica no nível 0). */}
      <div className="relative z-1 mx-auto grid w-full max-w-(--container-max) grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start gap-[clamp(40px,6vw,88px)] px-(--gutter) max-[900px]:grid-cols-1">
        {/* `items-start` no grid é o que permite o sticky: sem ele a coluna estica até a altura
            da lista e não sobraria espaço para o cabeçalho "andar" dentro dela.
            top-16 = 64px abaixo do topo da janela. */}
        <div className="sticky top-16 max-[900px]:static">
          <Reveal>
            <SectionLabel>{experience.label}</SectionLabel>
            <h2 className="m-0 font-serif text-(length:--title-size) leading-[1.06] font-bold tracking-tight">
              {experience.h1a} <Highlight>{experience.h1b}</Highlight>
            </h2>
            <p className="mt-5.5 mb-0 max-w-[36ch]">{experience.intro}</p>
          </Reveal>
        </div>

        {/* <ol>: é uma sequência cronológica, então lista ordenada. */}
        <ol className="m-0 list-none p-0">
          {/* A `key` diz ao React "este é o mesmo item" entre renderizações e precisa ser estável.
              O texto do cargo mudaria ao trocar de idioma (PT e EN são diferentes), recriando o
              item à toa. Como a lista é fixa e tem a mesma ordem nos dois idiomas, o índice serve. */}
          {experience.jobs.map((job, index) => (
            <JobItem key={index} job={job} experience={experience} />
          ))}
        </ol>
      </div>
    </section>
  );
}

// Diamante da linha do tempo: cresce 25% em 2 passos quando o mouse passa sobre o cargo
// (group-hover; `group` é o <li> do cargo). `scale` é uma propriedade própria no Tailwind v4,
// então não briga com o piscar (que mexe só na opacidade).
const DIAMOND_CLASS =
  'absolute top-0.75 left-0 motion-safe:transition-[scale] motion-safe:duration-100 motion-safe:ease-[steps(2)] group-hover:scale-125';

/** Um cargo na linha do tempo. */
function JobItem({ job, experience }: { job: Job; experience: ExperienceContent }) {
  return (
    // `group` permite que o filho (linha tracejada) saiba que este é o último item (group-last).
    // pl-12 abre espaço à esquerda para o diamante e a linha; no mobile encolhe para pl-10.
    // O <li> é o próprio Reveal: cada cargo entra quando chega à tela. O Reveal expõe
    // data-shown, que a linha tracejada abaixo usa para "se desenhar" depois da entrada.
    <Reveal as="li" className="group relative pb-10 pl-12 last:pb-0 max-[900px]:pl-10">
      {/* Linha tracejada vertical que liga este cargo ao próximo. Começa abaixo do diamante
          (top 30px) e vai até perto do fim do item. No último cargo não há "próximo", então
          ela some (group-last:hidden). left-2.5 = 10px = o centro do diamante de 21px. */}
      <span
        aria-hidden="true"
        className="absolute top-7.5 bottom-1.5 left-2.5 origin-top border-l-[1.5px] border-dashed border-ink group-last:hidden motion-safe:transition-[scale] motion-safe:delay-300 motion-safe:duration-700 motion-safe:ease-out motion-safe:group-data-[shown=false]:scale-y-0"
      />

      {/* Nó da linha do tempo: azul e piscando no cargo atual; rosa nos anteriores.
          (O piscar só roda sem prefers-reduced-motion; ver Diamond/Dot.) */}
      {job.current ? (
        <Diamond tone="blue" blink className={DIAMOND_CLASS} />
      ) : (
        <Diamond className={DIAMOND_CLASS} />
      )}

      {/* Linha do título: cargo (+ etiqueta "Atual") à esquerda e período à direita, na MESMA
          linha. Abaixo de 900px o período desce para baixo do título (flex-col). */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 max-[900px]:flex-col max-[900px]:items-start">
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
          <h3 className="m-0 font-serif text-[clamp(19px,1.8vw,24px)] leading-[1.15] font-bold tracking-[-0.015em]">
            {job.role}
          </h3>
          {job.current && <Pill variant="accent">{experience.now}</Pill>}
        </div>
        {/* whitespace-nowrap: "set. 2026 — o momento" nunca quebra no meio. */}
        <p className="m-0 font-pixel text-[15px] font-medium tracking-wider whitespace-nowrap opacity-85">
          {job.period}
        </p>
      </div>

      <p className="mt-1.5 mb-0 text-[15px] font-medium">
        {job.org}
        {/* O " · " é só visual; aria-hidden evita que o leitor de tela o anuncie. */}
        <span aria-hidden="true" className="opacity-50">
          {' '}
          ·{' '}
        </span>
        <span className="opacity-85">{job.meta}</span>
      </p>

      {/* Marcador quadrado rosa feito com ::before (before:), sem imagem nem elemento extra.
          top-[.62em] alinha o quadradinho com o centro da primeira linha do texto. */}
      <ul className="mt-4 mb-0 grid gap-2.5 p-0">
        {job.bullets.map((bullet) => (
          <li
            key={bullet}
            className="relative max-w-[60ch] pl-5.5 before:absolute before:top-[.62em] before:left-0 before:size-2 before:border-[1.5px] before:border-ink before:bg-pink"
          >
            {bullet}
          </li>
        ))}
      </ul>

      {/* Projeto em destaque do cargo: uma linha DISCRETA (sem caixa, sem imagem), só com uma
          barrinha rosa à esquerda, um rótulo pixel pequeno e o texto. Fica entre os itens e as
          pílulas e ocupa poucas linhas, para não poluir a linha do tempo. */}
      {job.highlight && (
        <div className="mt-4 max-w-[60ch] border-l-[3px] border-pink pl-3.5">
          <p className="m-0 font-pixel text-xs leading-[1.2] font-semibold tracking-pixel-wide uppercase opacity-80">
            {experience.projectLabel}
          </p>
          <p className="mt-1 mb-0 text-[15px] leading-normal">
            <b className="font-semibold">{job.highlight.name}</b>
            <span aria-hidden="true">: </span>
            <span className="opacity-85">{job.highlight.desc}</span>
          </p>
        </div>
      )}

      <ul aria-label={experience.techLabel} className="mt-5 mb-0 flex flex-wrap gap-2 p-0">
        {job.tech.map((tech) => (
          <Pill key={tech} as="li">
            {tech}
          </Pill>
        ))}
      </ul>
    </Reveal>
  );
}
