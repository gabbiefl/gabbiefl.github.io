/**
 * Divisor entre duas seções: uma linha tracejada fina. Todas as seções têm o MESMO fundo; esta
 * linha marca a troca.
 *
 * Truque de posição: o contêiner tem altura 0 e a linha é posicionada em cima dele. Assim o
 * divisor cai exatamente na emenda entre as duas seções, sem somar altura à página (o respiro
 * já vem do padding `--section-y` das seções). `z-2` o coloca acima do grão das seções
 * (`.grain`). É puramente decorativo: `aria-hidden`.
 */
export function SectionDivider() {
  return (
    <div aria-hidden="true" className="relative z-2 h-0">
      <div className="absolute inset-x-0 top-0 mx-auto w-full max-w-(--container-max) px-(--gutter)">
        <div className="h-0 border-t-[1.5px] border-dashed border-ink/25" />
      </div>
    </div>
  );
}
