import {
  ArrowRightSmall,
  ArrowUpRight,
  BrowserBar,
  Dot,
  Envelope,
  GithubIcon,
  LinkedinIcon,
} from '../components/sprites';
import { Highlight, PixelButton, PixelCard, Reveal, SectionLabel } from '../components/ui';
import type { ContactLink } from '../i18n/types';
import { useContent } from '../i18n/useLang';
import { externalLinkProps } from '../lib/externalLink';

/** Ícone de cada linha da lista: o content.json marca o tipo com isMail/isGithub/isLinkedin. */
function LinkIcon({ link }: { link: ContactLink }) {
  if (link.isMail) return <Envelope />;
  if (link.isGithub) return <GithubIcon />;
  if (link.isLinkedin) return <LinkedinIcon />;
  return null;
}

/**
 * Seção "Contato".
 *
 * Esquerda: título grande e o botão "Enviar e-mail" (abre o app de e-mail).
 * Direita: uma "janela" pixel com o status e os links (e-mail, GitHub, LinkedIn).
 */
export function Contact() {
  const { contact } = useContent();

  return (
    // overflow-clip: a sombra dos cartões não deve criar rolagem horizontal.
    <section id="contact" className="grain relative overflow-clip paper-grid py-(--section-y)">
      <div className="relative z-1 mx-auto w-full max-w-(--container-max) px-(--gutter)">
        <div className="grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-center gap-[clamp(40px,6vw,88px)] max-[900px]:grid-cols-1">
          {/* ---- Coluna esquerda ---- */}
          <Reveal>
            <SectionLabel>{contact.label}</SectionLabel>
            <h2 className="m-0 font-serif text-(length:--title-size-xl) leading-none font-bold tracking-[-0.03em]">
              {contact.h1a} <Highlight>{contact.h1b}</Highlight>
            </h2>
            <div className="mt-10">
              <PixelButton href={contact.mailto} variant="primary" className="group">
                {contact.send}
                <ArrowRightSmall className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1" />
              </PixelButton>
            </div>
          </Reveal>

          {/* ---- Coluna direita: janela pixel ---- */}
          <Reveal delay={150}>
            <PixelCard shadow={6} innerClassName="block">
              <BrowserBar size="md" />
              <p className="m-0 flex items-center gap-2.5 border-b-2 border-chip-ink bg-baby-blue px-5 py-3 text-sm leading-[1.35] font-medium text-chip-ink">
                <Dot blink />
                {contact.status}
              </p>
              {/* divide-y: a linha tracejada entre os itens (border-top em cada <li> exceto o
                primeiro), sem precisar de seletor `li + li`. */}
              <ul
                aria-label={contact.listLabel}
                className="m-0 list-none divide-y-[1.5px] divide-dashed divide-ink p-0"
              >
                {contact.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...externalLinkProps(link.href)}
                      // Hover rosa com texto sempre escuro (como a tag em degrau). O foco usa um
                      // contorno por DENTRO (offset negativo) porque a linha ocupa a largura toda
                      // e um contorno por fora seria cortado pelas bordas da janela.
                      className="group flex items-center gap-3.5 px-5 py-4 text-ink hover:bg-pink hover:text-chip-ink focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-ink motion-safe:transition-colors motion-safe:duration-100 motion-safe:ease-[steps(2)]"
                    >
                      <span aria-hidden="true" className="grid w-6 flex-none place-items-center">
                        <LinkIcon link={link} />
                      </span>
                      <span className="flex min-w-0 flex-col leading-[1.3]">
                        <b className="font-pixel text-[13px] font-semibold tracking-pixel-wide uppercase opacity-85">
                          {link.label}
                        </b>
                        {/* wrap-anywhere: e-mails e URLs longos quebram em vez de estourar a janela. */}
                        <span className="text-base font-medium wrap-anywhere">{link.value}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="ml-auto block flex-none motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      >
                        <ArrowUpRight />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </PixelCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
