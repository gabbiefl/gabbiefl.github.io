import {
  ArrowRight,
  Chevron,
  Cursor,
  Dot,
  GithubIcon,
  LinkedinIcon,
  Sparkle,
} from '../components/sprites';
import { PixelButton, Reveal } from '../components/ui';
import { cn } from '../lib/cn';
import { SITE } from '../site';
import { useContent } from '../i18n/useLang';
import { externalLinkProps } from '../lib/externalLink';

// Posições das 6 alças da caixa de seleção: cantos e meios dos lados.
const HANDLES = [
  'top-0 left-0',
  'top-0 left-full',
  'top-full left-0',
  'top-full left-full',
  'top-1/2 left-0',
  'top-1/2 left-full',
];

export function Hero() {
  const { hero, contact } = useContent();
  const github = contact.links.find((link) => link.isGithub);
  const linkedin = contact.links.find((link) => link.isLinkedin);
  const socials = [
    github && { link: github, icon: <GithubIcon /> },
    linkedin && { link: linkedin, icon: <LinkedinIcon /> },
  ].filter((item) => item !== undefined);

  return (
    <section
      id="top"
      className="grain relative flex min-h-[max(760px,100vh)] flex-col overflow-clip paper-grid"
    >
      <div className="relative z-1 flex flex-1 flex-col items-center justify-center gap-[clamp(64px,7vw,92px)] px-(--gutter-hero) pt-[calc(84px+clamp(40px,5vw,64px))] pb-32">
        {/* Entrada ao carregar: o Hero já está na tela, então o Reveal dispara na hora. A moldura
            entra primeiro e os botões 300ms depois. O `translate` do Reveal e o `rotate` da
            moldura são propriedades independentes, então não se atrapalham. */}
        <Reveal className="relative max-w-full -rotate-[1.4deg] border-[1.5px] border-dashed border-ink px-[clamp(28px,6vw,96px)] py-[clamp(28px,4.2vw,60px)] text-center">
          {HANDLES.map((position) => (
            <span
              key={position}
              aria-hidden="true"
              className={cn(
                'absolute size-[clamp(10px,1.2vw,16px)] -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-ink bg-pink',
                position,
              )}
            />
          ))}

          <Sparkle className="absolute top-[-30px] right-[6%] motion-safe:animate-twinkle" />
          <Sparkle
            tone="blue"
            size={36}
            className="absolute top-[58%] -left-[42px] motion-safe:animate-twinkle motion-safe:[animation-delay:1.2s]"
          />
          <Sparkle
            size={27}
            className="absolute top-[22%] -right-[46px] motion-safe:animate-twinkle motion-safe:[animation-delay:2.4s]"
          />

          <span className="absolute top-0 left-[clamp(16px,6%,84px)] inline-flex -translate-y-[68%] -rotate-3 items-center gap-[9px] rounded-[10px] border border-chip-ink/55 bg-baby-blue py-[7px] pr-[15px] pl-3 text-sm leading-[1.35] font-medium whitespace-nowrap text-chip-ink max-[800px]:max-w-[calc(100%-24px)] max-[800px]:whitespace-normal">
            <Dot blink />
            {/* lang="en": a frase é a MESMA em inglês nos dois idiomas (escolha de marca), então o
                leitor de tela deve pronunciá-la em inglês mesmo na página em português. */}
            <span lang="en">{hero.status}</span>
            <span
              aria-hidden="true"
              className="absolute bottom-[-7px] left-[18px] size-[11px] rotate-45 border-r border-b border-chip-ink/55 bg-baby-blue"
            />
          </span>

          {/* Tamanho do nome: clamp(mínimo, proporcional à largura da tela, máximo). O teto é 100px
              (6.4vw até ~1560px de largura), para o nome não dominar a página. O mínimo é 60px: no
              celular a caixa, que se ajusta ao texto, não pode ficar estreita, senão o cursor
              cobriria a pílula do cargo. */}
          <h1
            aria-label={`${SITE.name.first} ${SITE.name.last}`}
            className="m-0 font-serif text-[clamp(60px,6.4vw,100px)] leading-[.92] font-bold tracking-[-0.035em]"
          >
            <span aria-hidden="true" className="block">
              {SITE.name.first}
            </span>
            <span aria-hidden="true" className="block whitespace-nowrap italic">
              {SITE.name.last}
            </span>
          </h1>

          <span className="absolute bottom-0 left-1/2 inline-flex min-h-9 -translate-x-1/2 translate-y-1/2 items-center rounded-full border-[1.5px] border-chip-ink bg-pink px-5 font-pixel text-lg font-semibold tracking-pixel whitespace-nowrap text-chip-ink shadow-[0_4px_0_var(--shadow)]">
            {hero.role}
          </span>

          <div
            aria-hidden="true"
            className="absolute top-[calc(66%+18px)] left-[calc(79%+46px)] z-3 origin-top-left max-[800px]:scale-[.68]"
          >
            <div className="flex flex-col items-start motion-safe:animate-float">
              <Cursor />
            </div>
          </div>
        </Reveal>

        <Reveal delay={300} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          {/* gap-3 no celular e gap-4 acima de 480px. flex-wrap só como rede de segurança: em telas
              de 360px+ os dois botões cabem lado a lado (o botão md fica compacto no celular, ver
              pixel.css); em telas minúsculas eles quebram para duas linhas em vez de estourar. */}
          <div className="flex flex-wrap items-center justify-center gap-3 min-[480px]:gap-4">
            {/* Principal: "Ver projetos" (a maioria de quem avalia quer ver o trabalho antes de
                escrever). Secundário: o contato. */}
            <PixelButton href="#projects" variant="primary" className="group">
              {hero.ctaProjects}
              <ArrowRight className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1" />
            </PixelButton>
            <PixelButton href="#contact">{hero.ctaContact}</PixelButton>
          </div>
          <ul aria-label={hero.socialLabel} className="m-0 flex list-none gap-3 p-0 pr-[3px]">
            {socials.map(({ link, icon }) => (
              <li key={link.label}>
                <PixelButton
                  href={link.href}
                  size="sq"
                  aria-label={link.label}
                  {...externalLinkProps(link.href)}
                >
                  {icon}
                </PixelButton>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Chevron "V" para rolar até a próxima seção (substitui a faixa de marquee, o que dá mais
          respiro até o Sobre).
          - É um <a> para #about; o rótulo acessível vem do content.json.
          - O desenho é pequeno (22px de largura), mas a área clicável é 44px (size-11), o mínimo
            confortável para toque.
          - Animação "nudge": o V salta 5px para baixo e volta, em 2 quadros (steps), como um sprite;
            só roda sem prefers-reduced-motion. A animação fica num <span> interno, porque o
            link já usa transform (-translate-x-1/2) para se centralizar.
          - Centralizado com left-1/2 + -translate-x-1/2; z-2 acima do grão (nível 0). */}
      <a
        href="#about"
        aria-label={hero.scroll}
        className="absolute bottom-8 left-1/2 z-2 grid size-11 -translate-x-1/2 place-items-center"
      >
        <span className="block motion-safe:animate-nudge">
          <Chevron size={22} />
        </span>
      </a>
    </section>
  );
}
