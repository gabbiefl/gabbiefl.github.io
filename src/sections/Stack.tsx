import { Highlight, Reveal, SectionLabel, TechTile } from '../components/ui';
import { useContent } from '../i18n/useLang';

// Arquivo SVG de cada tecnologia (em public/tech-skills/), pelo nome EXATO que está no
// content.json (igual em PT e EN). Tecnologia nova no content.json precisa de uma entrada aqui
// (e do ícone na pasta). Os ícones já vêm em "quadradinho" com fundo próprio, então funcionam
// nos dois temas sem nenhum tratamento de cor.
interface Logo {
  file: string;
}
const LOGOS: Record<string, Logo> = {
  HTML: { file: 'tech-skills/HTML.svg' },
  CSS: { file: 'tech-skills/CSS.svg' },
  Sass: { file: 'tech-skills/Sass.svg' },
  Bootstrap: { file: 'tech-skills/Bootstrap.svg' },
  'Tailwind CSS': { file: 'tech-skills/TailwindCSS-Dark.svg' },
  JavaScript: { file: 'tech-skills/JavaScript.svg' },
  TypeScript: { file: 'tech-skills/TypeScript.svg' },
  'React.js': { file: 'tech-skills/React-Dark.svg' },
  'Node.js': { file: 'tech-skills/NodeJS-Dark.svg' },
  Express: { file: 'tech-skills/ExpressJS-Dark.svg' },
  MySQL: { file: 'tech-skills/MySQL-Dark.svg' },
  PostgreSQL: { file: 'tech-skills/PostgreSQL-Dark.svg' },
  Prisma: { file: 'tech-skills/Prisma.svg' },
  Git: { file: 'tech-skills/Git.svg' },
  GitHub: { file: 'tech-skills/Github-Dark.svg' },
  Figma: { file: 'tech-skills/Figma-Dark.svg' },
  Dart: { file: 'tech-skills/Dart-Dark.svg' },
  Flutter: { file: 'tech-skills/Flutter-Dark.svg' },
  Python: { file: 'tech-skills/Python-Dark.svg' },
};

/**
 * Seção "Stack": 5 grupos de tecnologias, SEM cartões, em LINHAS.
 *
 * Cada grupo é uma linha: título (com um dot pixel antes) na coluna da
 * esquerda e os logos coloridos na da direita, com um divisor tracejado entre as linhas. A
 * ordem de leitura é a do content.json (Front-end, Back-end, Mobile, Análise de dados,
 * Ferramentas). O nome de cada tecnologia aparece num balão no hover (ver TechTile). No celular
 * (<= 900px) o título passa para cima dos logos.
 */
export function Stack() {
  const { stack } = useContent();

  // O content.json guarda os grupos como g1..g5 (chaves separadas, não um array). Junto-os
  // aqui, em ordem, para poder percorrer com .map.
  const groups = [stack.g1, stack.g2, stack.g3, stack.g4, stack.g5];

  return (
    <section id="stack" className="grain relative overflow-clip paper-flat py-(--section-y)">
      <div className="relative z-1 mx-auto w-full max-w-(--container-max) px-(--gutter)">
        <Reveal>
          <SectionLabel>{stack.label}</SectionLabel>
          <h2 className="m-0 max-w-[16em] font-serif text-(length:--title-size) leading-[1.06] font-bold tracking-tight">
            {stack.h1a} <Highlight>{stack.h1b}</Highlight>
          </h2>
          <p className="mt-5.5 mb-0 max-w-[56ch]">{stack.intro}</p>
        </Reveal>

        <ul className="mt-[clamp(28px,3.5vw,40px)] mb-0 p-0">
          {groups.map((group, index) => (
            // Linha: título | logos. O divisor tracejado fica no TOPO de cada linha (menos da
            // primeira, que já fecha o parágrafo acima). O <li> é o próprio Reveal: as linhas
            // entram em sequência (atraso de 90ms por linha). NÃO ganha a classe `group`: os logos
            // (TechTile) já usam `group` para o próprio hover, e um `group` na linha faria todos
            // reagirem juntos quando o mouse passasse em qualquer ponto da linha.
            <Reveal
              key={group.title}
              as="li"
              delay={index * 90}
              className="grid grid-cols-[20rem_1fr] items-center gap-x-8 gap-y-3 border-dashed border-ink py-4 not-first:border-t-[1.5px] max-[900px]:grid-cols-1"
            >
              {/* Título em Pixelify (a fonte dos rótulos do site): dot pixel antes (quadradinho
                  de contorno escuro e miolo rosa, como o ornamento do rótulo da seção). O dot é
                  decorativo. */}
              <h3 className="m-0 flex items-center gap-2.5 font-pixel text-[clamp(18px,1.7vw,21px)] leading-none font-semibold tracking-pixel">
                <span
                  aria-hidden="true"
                  className="size-3 shrink-0 bg-ink p-0.5 pixel-clip pixel-step-2"
                >
                  <span className="block size-full bg-pink" />
                </span>
                {group.title}
              </h3>
              <ul aria-label={group.title} className="m-0 flex flex-wrap gap-2 p-0">
                {group.items.map((item) => {
                  const logo = LOGOS[item];
                  return (
                    <TechTile key={item} name={item}>
                      {logo ? (
                        <img
                          src={`/${logo.file}`}
                          alt=""
                          width={36}
                          height={36}
                          loading="lazy"
                          className="size-9"
                        />
                      ) : (
                        // Rede de segurança: tecnologia sem entrada em LOGOS (por exemplo, o nome foi
                        // renomeado no content.json) mostra as 2 primeiras letras em vez de uma imagem
                        // quebrada. O nome completo continua no balão e no aria-label.
                        <span
                          aria-hidden="true"
                          className="grid size-9 place-items-center font-pixel text-lg font-semibold"
                        >
                          {item.slice(0, 2)}
                        </span>
                      )}
                    </TechTile>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
