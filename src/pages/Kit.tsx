import type { ReactNode } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Avatar,
  BrowserBar,
  ChartIcon,
  Chevron,
  CodeIcon,
  Cursor,
  DatabaseIcon,
  Diamond,
  Dot,
  Envelope,
  Flower,
  GithubIcon,
  Landscape,
  LinkedinIcon,
  Moon,
  PenIcon,
  PhoneIcon,
  ServerIcon,
  Sparkle,
  Sun,
} from '../components/sprites';
import {
  Highlight,
  PixelButton,
  PixelCard,
  PixelSwitch,
  Pill,
  Polaroid,
  ProjectImage,
  SectionLabel,
  StepTag,
} from '../components/ui';
import type { Lang } from '../i18n/types';
import { useContent, useLang } from '../i18n/useLang';

// Galeria de componentes (/kit), só em desenvolvimento: confere os componentes base nos dois temas.
// Os rótulos de código (nomes de componente) são de desenvolvimento; o resto vem do content.json.

// Imagem de exemplo (SVG inline em data URI) para demonstrar o ProjectImage COM url.
const DEMO_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Crect width='320' height='200' fill='%23999'/%3E%3Ccircle cx='160' cy='100' r='60' fill='%23ddd'/%3E%3C/svg%3E";

// Os 6 ícones da Stack, em xadrez rosa/azul como na seção.
const STACK_ICONS = [
  [CodeIcon, 'pink'],
  [ServerIcon, 'blue'],
  [DatabaseIcon, 'pink'],
  [PenIcon, 'blue'],
  [PhoneIcon, 'pink'],
  [ChartIcon, 'blue'],
] as const;

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4">
      <h3 className="border-b-[1.5px] border-dashed border-ink pb-2 font-pixel text-sm font-semibold tracking-pixel-wide uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Cell({ name, children }: { name: string; children: ReactNode }) {
  return (
    <figure className="m-0 grid justify-items-start gap-2">
      <div className="flex min-h-14 items-center">{children}</div>
      <figcaption className="font-pixel text-[13px] tracking-pixel">{name}</figcaption>
    </figure>
  );
}

function KitSections() {
  const { hero, about, experience, projects, stack } = useContent();
  const { lang, setLang } = useLang();
  const tech = experience.jobs[1]?.tech ?? [];
  const stackItems = stack.g1.items;
  const langs: Lang[] = ['en', 'pt'];

  return (
    <div className="grid gap-10">
      <Group title="PixelButton">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-6">
          <PixelButton href="#contact" variant="primary">
            {hero.ctaContact}
            <ArrowRight />
          </PixelButton>
          <PixelButton href="#projects">
            {hero.ctaProjects}
            <ArrowDown />
          </PixelButton>
          <PixelButton onClick={() => undefined} size="s">
            size s
          </PixelButton>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-6">
          <PixelButton href="#demo" size="sm" variant="primary">
            {projects.demo}
            <ArrowUpRight />
          </PixelButton>
          <PixelButton href="#code" size="sm">
            {projects.code}
            <ArrowUpRight />
          </PixelButton>
          <PixelSwitch
            label={hero.langLabel}
            options={langs.map((code) => ({ value: code, label: code.toUpperCase() }))}
            value={lang}
            onChange={setLang}
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-6">
          <PixelButton size="sq" aria-label="sun">
            <Sun size={26} />
          </PixelButton>
          <PixelButton size="sq" aria-label="moon">
            <Moon size={26} />
          </PixelButton>
          <PixelButton href="#github" size="sq" aria-label={hero.socialLabel}>
            <GithubIcon />
          </PixelButton>
          <PixelButton href="#linkedin" size="sq" aria-label={hero.socialLabel}>
            <LinkedinIcon />
          </PixelButton>
        </div>
      </Group>

      <Group title="PixelCard">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
          {about.facts.map((fact) => (
            <PixelCard
              key={fact.k}
              as="div"
              shadow={4}
              innerClassName="flex flex-col gap-1.5 px-5 py-[18px]"
            >
              <span className="font-pixel text-sm font-semibold tracking-pixel-wide uppercase opacity-85">
                {fact.k}
              </span>
              <span className="text-xl leading-tight font-semibold">{fact.v}</span>
              <span className="text-sm opacity-85">{fact.s}</span>
            </PixelCard>
          ))}
        </div>
        <div className="flex flex-wrap items-start gap-x-8 gap-y-8">
          <PixelCard
            shadow={3}
            outline="chip"
            tone="pink"
            fill={false}
            innerClassName="grid size-13 place-items-center"
          >
            <CodeIcon />
          </PixelCard>
          <PixelCard
            shadow={3}
            outline="chip"
            tone="blue"
            fill={false}
            innerClassName="grid size-13 place-items-center"
          >
            <ServerIcon />
          </PixelCard>
        </div>
      </Group>

      <Group title="Polaroid">
        <div className="px-9 pt-6 pb-8">
          <Polaroid label={about.imgLabel} className="mx-auto" />
        </div>
      </Group>

      <Group title="Pill · StepTag · SectionLabel · Highlight">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          <Pill variant="accent" as="li">
            {experience.now}
          </Pill>
          {tech.map((t) => (
            <Pill key={t} as="li">
              {t}
            </Pill>
          ))}
        </ul>
        <ul className="m-0 flex list-none flex-wrap gap-x-2.5 gap-y-3 p-0">
          {stackItems.map((item) => (
            <StepTag key={item} as="li">
              {item}
            </StepTag>
          ))}
        </ul>
        <div>
          <SectionLabel>{about.label}</SectionLabel>
          <h2 className="m-0 max-w-[16em] font-serif text-(length:--title-size) leading-[1.06] font-bold tracking-tight">
            {about.h1a} <Highlight>{about.h1b}</Highlight>
          </h2>
        </div>
      </Group>

      <Group title="ProjectImage">
        <div className="grid gap-6 sm:grid-cols-2">
          <ProjectImage alt={projects.thumbLabel} tone="blue" />
          <ProjectImage src={DEMO_IMAGE} alt="Imagem de exemplo" tone="pink" />
        </div>
      </Group>

      <Group title="Sprites">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          <Cell name="Sparkle pink">
            <Sparkle />
          </Cell>
          <Cell name="Sparkle blue">
            <Sparkle tone="blue" size={36} />
          </Cell>
          <Cell name="Dot blink">
            <Dot blink />
          </Cell>
          <Cell name="Diamond">
            <Diamond />
          </Cell>
          <Cell name="Diamond blue blink">
            <Diamond tone="blue" blink />
          </Cell>
          <Cell name="Chevron">
            <Chevron />
          </Cell>
          <Cell name="Envelope">
            <Envelope />
          </Cell>
          <Cell name="Arrows">
            <span className="flex items-center gap-3">
              <ArrowRight />
              <ArrowDown />
              <ArrowUpRight />
              <ArrowUp />
            </span>
          </Cell>
          <Cell name="Sun · Moon">
            <span className="flex items-center gap-3">
              <Sun />
              <Moon />
            </span>
          </Cell>
          <Cell name="Cursor (--fx)">
            <Cursor />
          </Cell>
          <Cell name="Flower (--fx)">
            <Flower />
          </Cell>
          <Cell name="Stack icons">
            <span className="flex flex-wrap items-center gap-3">
              {STACK_ICONS.map(([Icon, tone], i) => (
                <PixelCard
                  key={i}
                  shadow={3}
                  outline="chip"
                  tone={tone}
                  fill={false}
                  innerClassName="grid size-13 place-items-center"
                >
                  <Icon />
                </PixelCard>
              ))}
            </span>
          </Cell>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col overflow-hidden border-2 border-chip-ink bg-card-cream">
            <BrowserBar />
            <div className="grid flex-1 place-items-center bg-baby-blue py-4">
              <Landscape />
            </div>
          </div>
          <div className="grid aspect-square max-w-60 place-items-end justify-items-center overflow-hidden border-2 border-chip-ink bg-baby-blue pb-4">
            <Avatar />
          </div>
        </div>
      </Group>
    </div>
  );
}

function Panel({ theme, children }: { theme: 'light' | 'dark'; children: ReactNode }) {
  return (
    <div data-theme={theme} className="grain paper-grid px-(--gutter) py-10 text-ink">
      <p className="mb-8 font-pixel text-lg font-semibold tracking-pixel uppercase">{theme}</p>
      <div className="relative z-2">{children}</div>
    </div>
  );
}

export default function Kit() {
  return (
    <main className="grid lg:grid-cols-2">
      <Panel theme="light">
        <KitSections />
      </Panel>
      <Panel theme="dark">
        <KitSections />
      </Panel>
    </main>
  );
}
