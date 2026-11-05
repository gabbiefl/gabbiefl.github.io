import { cn } from '../../lib/cn';

interface SwitchOption<T extends string> {
  value: T;
  label: string;
}

interface PixelSwitchProps<T extends string> {
  options: readonly SwitchOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Nome do grupo para leitores de tela (ex.: "Idioma"). */
  label: string;
  /** md (padrão): 40px de miolo, texto 14px. sm: 32px de miolo, texto 13px (mais discreto). */
  size?: 'md' | 'sm';
  className?: string;
}

// Classes completas (não montadas por template) para o Tailwind encontrá-las no código.
const SIZE = {
  md: 'h-10 min-w-11 px-3.5 text-sm',
  sm: 'h-8 min-w-10 px-3 text-[13px]',
} as const;

/**
 * Seletor "switch" pixel: uma pílula em degraus com uma peça deslizante (o "polegar") que mostra
 * a opção ativa. Usado para o idioma (EN | PT), mas serve para qualquer escolha de poucas opções.
 *
 * Como funciona, em camadas (a mesma técnica do botão pixel-chunk):
 *   wrapper  -> sombra dura + anel de foco
 *   contorno -> fundo --ink com cantos em degrau (parece a "borda")
 *   miolo    -> fundo --paper, também em degrau; guarda o polegar e os botões
 *
 * Acessibilidade: continuam sendo botões de verdade dentro de um grupo. Cada um tem
 * `aria-pressed`, então leitor de tela anuncia "EN, pressionado". Teclado: Tab entre as opções,
 * Enter ou Espaço escolhe. O polegar é só visual (aria-hidden).
 */
export function PixelSwitch<T extends string>({
  options,
  value,
  onChange,
  label,
  size = 'md',
  className,
}: PixelSwitchProps<T>) {
  // Posição da opção ativa; o polegar se desloca de acordo (0 = primeira, 1 = segunda...).
  // Math.max protege o caso de um `value` que não esteja na lista (cai na primeira opção).
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  return (
    <div
      role="group"
      aria-label={label}
      // O contorno de foco vai no wrapper, e não nos botões: o miolo tem clip-path (cantos em
      // degrau), que CORTARIA qualquer contorno desenhado dentro dele. `has-[:focus-visible]`
      // acende o anel quando algum botão filho recebe foco por teclado.
      className={cn(
        'inline-block pixel-shadow-3 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-5 has-[:focus-visible]:outline-current',
        className,
      )}
    >
      <div className="bg-ink p-0.5 pixel-clip pixel-step-3">
        <div
          className="relative grid bg-paper pixel-clip pixel-step-1"
          // N colunas iguais, uma por opção (para 2 opções: 50% cada).
          style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
        >
          {/* Polegar: ocupa 1/N da largura e se desloca N-1 vezes a própria largura. A
              transição em 3 degraus (steps(3)) combina com o pixel; sem `motion-safe` (ou seja,
              com prefers-reduced-motion) ele troca de posição na hora. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 bg-ink motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[steps(3)]"
            style={{
              width: `${100 / options.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
          {options.map((option) => {
            const active = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => onChange(option.value)}
                // relative z-1: fica ACIMA do polegar. A cor do texto inverte (on-ink sobre o
                // polegar escuro; ink sobre o papel). outline-none: o anel é o do wrapper.
                className={cn(
                  'relative z-1 cursor-pointer font-pixel font-semibold tracking-pixel-wide outline-none motion-safe:transition-colors motion-safe:duration-150 motion-safe:ease-[steps(3)]',
                  SIZE[size],
                  active ? 'text-on-ink' : 'text-ink',
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
