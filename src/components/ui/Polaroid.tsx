import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';
import { Avatar, Flower, Sparkle } from '../sprites';
import { PixelCard } from './PixelCard';

interface PolaroidProps {
  /** Descrição da foto para leitores de tela (content.json: about.imgLabel). Vazio = decorativa. */
  label: string;
  /** URL da foto. Sem ela, mostra o avatar pixel de placeholder. */
  src?: string;
  /** Inclinação em graus (spec: +1.2). */
  tilt?: number;
  className?: string;
}

/**
 * Polaroid do Sobre: cartão pixel creme, foto (ou avatar pixel de placeholder, sem legenda), fita, 2 sparkles e a flor.
 *
 * Tamanho: 320px de largura máxima. Tudo que é fixo em px (fita, flor, sparkles, margens) é
 * proporcional a esse tamanho, para o conjunto manter a mesma aparência. O avatar usa % da largura (e não px), então
 * acompanha o cartão em qualquer tamanho, inclusive quando o pai o limita no celular.
 */
export function Polaroid({ label, src, tilt = 1.2, className }: PolaroidProps) {
  return (
    // `group`: o hover do cartão inteiro move a flor (group-hover). A inclinação vem de uma
    // variável CSS (--tilt) usada na propriedade `rotate`; no hover ele "endireita" e sobe 4px.
    // Se a inclinação fosse um transform inline, o hover do CSS nunca conseguiria vencê-la.
    <div
      className={cn(
        'group relative w-full max-w-80 rotate-(--tilt) hover:-translate-y-1 hover:rotate-0 motion-safe:transition-[rotate,translate] motion-safe:duration-300 motion-safe:ease-out motion-reduce:hover:translate-y-0',
        className,
      )}
      style={{ '--tilt': `${tilt}deg` } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="absolute top-[-12px] left-1/2 z-2 h-6 w-22 -translate-x-1/2 -rotate-5 bg-pink/94 tape-edge"
      />
      <PixelCard shadow={6} tone="cream" innerClassName="relative p-4 pb-14">
        {src ? (
          // Foto real: preenche o quadrado (object-cover corta o excesso, centralizado). O alt é
          // o rótulo do content.json; vazio, a imagem vira decorativa (alt="").
          <img
            src={src}
            alt={label}
            decoding="async"
            className="relative block aspect-square w-full border-2 border-chip-ink object-cover"
          />
        ) : (
          <div
            // Com rótulo: a foto é uma "imagem" com descrição. Sem rótulo (texto vazio no
            // content.json): vira decorativa e some da acessibilidade. Um role="img" SEM nome é
            // pior que nenhum, pois o leitor de tela anuncia "imagem" sem dizer o que é.
            {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
            className="relative grid aspect-square place-items-center overflow-hidden border-2 border-chip-ink bg-baby-blue"
          >
            {/* w-[46%] h-auto: o SVG ocupa 46% da largura da foto e mantém a proporção (o
                atributo height fixo do sprite é ignorado pelo h-auto). mt-[10%]: o respiro de
                cima também é proporcional (% de margem é relativo à LARGURA do pai). */}
            <Avatar className="mt-[10%] h-auto w-[46%]" />
          </div>
        )}
      </PixelCard>
      <Sparkle
        size={32}
        className="absolute top-[26px] -right-[22px] motion-safe:animate-twinkle"
      />
      <Sparkle
        tone="blue"
        size={26}
        className="absolute bottom-[22%] -left-[24px] motion-safe:animate-twinkle motion-safe:[animation-delay:1.6s]"
      />
      {/* Abaixo de 900px a flor encolhe mais (scale .8) e chega perto da borda, para não estourar
          a tela. No Tailwind v4, rotate e scale são propriedades separadas, então rotate-12 e
          max-[900px]:scale-80 se somam sem um sobrescrever o outro. */}
      <Flower
        size={54}
        className="absolute -right-5 -bottom-4 z-3 rotate-12 group-hover:rotate-[28deg] motion-safe:transition-[rotate] motion-safe:duration-500 motion-safe:ease-out max-[900px]:-right-2 max-[900px]:scale-80"
      />
    </div>
  );
}
