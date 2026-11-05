import type { Lang } from '../../i18n/types';
import { useContent, useLang } from '../../i18n/useLang';
import { useTheme } from '../../theme/useTheme';
import { Moon, Sun } from '../sprites';
import { PixelButton, PixelSwitch } from '../ui';
import { Wordmark } from './Wordmark';

// Opções do seletor de idioma, na ordem: EN, PT. "EN" e "PT" são códigos de
// idioma (iguais em qualquer língua), por isso não vêm do content.json.
const LANG_OPTIONS: { value: Lang; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'pt', label: 'PT' },
];

/** Cabeçalho: wordmark, navegação, toggle de tema e seletor de idioma. Fica sobre o Hero. */
export function Header() {
  const { hero } = useContent();
  const { lang, setLang } = useLang();
  const { theme, setPreference } = useTheme();
  const isDark = theme === 'dark';
  const themeLabel = isDark ? hero.themeToLight : hero.themeToDark;

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-(--gutter-hero) py-5">
        <Wordmark className="min-h-11 text-xl" />

        <div className="flex items-center gap-x-6 gap-y-2">
          {/* gap-x-2 (8px) + o padding de 8px de cada link mantêm os 24px de distância entre os
              textos, e ainda deixam uma área clicável confortável em volta da palavra. */}
          <nav aria-label={hero.navLabel} className="flex items-center gap-x-2 max-[800px]:hidden">
            {hero.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                // `group`: o link comanda o estado (hover/foco) e o <span> de dentro reage a ele.
                className="group inline-flex min-h-11 items-center px-2 text-[15px] font-medium"
              >
                {/* Hover/foco personalizado: uma linha CONTÍNUA rosa (3px) que "desenha" o
                    sublinhado da esquerda para a direita, em degraus (steps), como um traço de
                    pixel. Como é feito:
                    - a linha é o FUNDO do <span>: um gradiente de uma cor só (rosa -> rosa), que
                      é a forma de desenhar uma cor sólida como IMAGEM de fundo. Precisa ser
                      imagem (e não background-color) porque só o background-size de imagens
                      pode animar de 0% a 100% da largura;
                    - a cor é o token --pink, igual nos dois temas. O rosa tem pouco contraste
                      sobre o creme, por isso 3px (e não 2px): é só um indicador, o texto da
                      palavra continua legível por conta própria;
                    - leading-tight + pb-0.5 aproximam a linha do texto (com a altura de linha
                      padrão ela ficaria longe da palavra);
                    - sem prefers-reduced-motion a linha aparece direto, e o foco por teclado
                      recebe o MESMO efeito do hover. */}
                <span className="bg-[linear-gradient(var(--pink),var(--pink))] bg-size-[0%_3px] bg-left-bottom bg-no-repeat pb-0.5 leading-tight group-hover:bg-size-[100%_3px] group-focus-visible:bg-size-[100%_3px] motion-safe:transition-[background-size] motion-safe:duration-200 motion-safe:ease-[steps(4)]">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <PixelButton
            size="sq-s"
            aria-label={themeLabel}
            title={themeLabel}
            onClick={() => setPreference(isDark ? 'light' : 'dark')}
          >
            {/* Ícones do Font Awesome: a Lua no claro (clicar ativa o escuro) e o Sol no escuro. */}
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </PixelButton>

          {/* mr-[3px]: reserva o espaço da sombra dura de 3px, que sai pela direita. */}
          <PixelSwitch
            label={hero.langLabel}
            options={LANG_OPTIONS}
            size="sm"
            value={lang}
            onChange={setLang}
            className="mr-[3px]"
          />
        </div>
      </div>
    </header>
  );
}
