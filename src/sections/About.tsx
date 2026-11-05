import { Highlight, PixelCard, Polaroid, Reveal, SectionLabel } from '../components/ui';
import { useContent } from '../i18n/useLang';

/**
 * Seção "Sobre mim".
 *
 * Todo texto vem do content.json via useContent(); trocar o idioma re-renderiza
 * a seção sem nenhum texto fixo aqui dentro.
 */
export function About() {
  const { about } = useContent();

  return (
    // id="about" é o destino do link do nav. O `scroll-padding-top` global (global.css)
    // já evita que o título fique escondido sob o topo ao rolar até aqui.
    //
    // paper-flat + grain: fundo liso (o quadriculado fica só no Hero) e grão (tokens.css).
    // overflow-clip: os adesivos do polaroid saem alguns px da caixa; sem isso a página
    // ganharia rolagem horizontal. (clip, e não hidden, para não criar um novo contexto
    // de rolagem.)
    //
    // Ritmo vertical: o espaçamento vem da variável única --section-y, a mesma de todas as
    // seções, para o respiro ser igual em toda a página.
    <section
      id="about"
      className="grain relative overflow-clip paper-flat py-(--section-y) text-base leading-[1.65]"
    >
      {/* O grão (::after da section) fica no nível 0; este wrapper precisa ser `relative z-1`
          para o conteúdo ficar ACIMA do grão e não ser escurecido por ele. */}
      <div className="relative z-1 mx-auto grid w-full max-w-(--container-max) grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-center gap-[clamp(40px,6vw,88px)] px-(--gutter) max-[900px]:grid-cols-1">
        {/* Proporção 4fr/8fr: a coluna do texto é mais larga para os dois
            cartões (Formação e Inglês, em colunas iguais) respirarem, já que o texto da Formação é
            longo. O polaroid tem largura máxima fixa (320px) e continua cabendo na coluna menor. */}
        {/* Coluna esquerda: a foto. justify-self-center centraliza o polaroid na coluna;
            no mobile ele passa a ter no máximo 240px e fica centralizado (mx-auto). */}
        <Reveal className="mx-auto w-full max-w-80 justify-self-center max-[900px]:max-w-60">
          <Polaroid label={about.imgLabel} {...(about.img && { src: about.img })} />
        </Reveal>

        {/* Coluna direita: texto + cartões. */}
        <div>
          <Reveal delay={120}>
            <SectionLabel>{about.label}</SectionLabel>

            {/* h2: Fraunces fluida entre 34px e 58px (clamp). A segunda metade da frase recebe
              o destaque rosa; o texto do destaque é sempre escuro (ver Highlight). */}
            <h2 className="m-0 max-w-[16em] font-serif text-(length:--title-size) leading-[1.06] font-bold tracking-tight">
              {about.h1a} <Highlight>{about.h1b}</Highlight>
            </h2>

            {/* max-w-[64ch]: limita a linha a ~64 caracteres (largura confortável de leitura, alinhada com a coluna mais larga). */}
            <p className="mt-[26px] mb-0 max-w-[64ch]">{about.p1}</p>
            <p className="mt-4 mb-0 max-w-[64ch]">{about.p2}</p>
          </Reveal>

          {/* Lista semântica de "fatos". Os cartões NÃO repetem o texto dos parágrafos:
              mostram só formação e inglês. Duas colunas no desktop, uma no mobile. */}
          <ul className="mt-10 grid grid-cols-2 gap-[18px] p-0 max-[900px]:grid-cols-1">
            {about.facts.map((fact, index) => (
              // Cada cartão entra com um atraso maior que o anterior (escalonado). O hover levanta o
              // cartão 2px e alonga a sombra de 4 para 6px, em 2 passos (como os botões pixel):
              // o `--d` é a variável que o utilitário pixel-shadow usa para o tamanho da sombra.
              // `h-full` no PixelCard: o <li> (Reveal) estica até a altura da linha da grade, mas o
              // cartão dentro dele só ocupa o próprio conteúdo se não tiver altura; com h-full os dois
              // cartões ficam sempre do mesmo tamanho.
              <Reveal key={fact.k} as="li" delay={240 + index * 100}>
                <PixelCard
                  shadow={4}
                  className="h-full hover:-translate-0.5 hover:[--d:6px] motion-safe:transition-[filter,translate] motion-safe:duration-100 motion-safe:ease-[steps(2)] motion-reduce:hover:translate-none"
                  innerClassName="flex flex-col gap-1.5 px-5 py-[18px]"
                >
                  {/* Rótulo em Pixelify (pixel = marca/rótulo)... */}
                  <span className="font-pixel text-sm leading-[1.2] font-semibold tracking-pixel-wide uppercase opacity-80">
                    {fact.k}
                  </span>
                  {/* ...e o valor em Inter (o que se lê fica limpo). */}
                  <span className="text-lg leading-tight font-semibold">{fact.v}</span>
                  <span className="text-sm leading-[1.4] opacity-80">{fact.s}</span>
                </PixelCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
