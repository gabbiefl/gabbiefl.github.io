import { useState } from 'react';
import { cn } from '../../lib/cn';
import { BrowserBar, Landscape } from '../sprites';

type Tone = 'blue' | 'pink' | 'beige';

// Classes completas (não montadas por template) para o Tailwind encontrá-las no código.
const TONE: Record<Tone, string> = {
  blue: 'bg-baby-blue',
  pink: 'bg-pink',
  beige: 'bg-beige',
};

interface ProjectImageProps {
  /**
   * URL da imagem do projeto. Sem URL, mostra a paisagem pixel de placeholder.
   * `| undefined` explícito: com exactOptionalPropertyTypes, passar `project.image`
   * (que pode ser undefined) para uma prop opcional só compila se o undefined for declarado.
   */
  src?: string | undefined;
  /** Descrição: vira o `alt` da imagem ou o rótulo acessível do placeholder. */
  alt: string;
  /**
   * cover (padrão): a imagem preenche a área e o excesso é cortado (capturas de tela).
   * contain: a imagem aparece inteira, centralizada e com respiro (ícones de app, que são quadrados).
   */
  fit?: 'cover' | 'contain';
  /**
   * rect (padrão): a imagem usa a área toda (conforme `fit`).
   * circle: a imagem é recortada num CÍRCULO centralizado, com respiro em volta (símbolos e logos).
   * Tem precedência sobre `fit`.
   */
  shape?: 'rect' | 'circle';
  /** Cor de fundo da área da imagem (visível no placeholder e atrás de imagens com transparência). */
  tone?: Tone;
  className?: string;
}

/**
 * Miniatura de projeto: janelinha de navegador (barra com 3
 * quadradinhos) + área colorida com a imagem do projeto, ou a paisagem pixel se não houver.
 */
export function ProjectImage({
  src,
  alt,
  fit = 'cover',
  shape = 'rect',
  tone = 'blue',
  className,
}: ProjectImageProps) {
  // Se o arquivo da imagem não existir (ou falhar ao carregar), cai no placeholder em vez de
  // mostrar o ícone de "imagem quebrada". Assim dá para cadastrar o caminho no content.json
  // antes de colocar o arquivo na pasta.
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      // Acessibilidade: com imagem real, é o <img> que carrega o alt. No placeholder não há
      // <img>, então o próprio quadro vira `role="img"` com o rótulo. Nunca os dois juntos,
      // senão o leitor de tela anunciaria a descrição duas vezes.
      {...(showImage ? {} : { role: 'img', 'aria-label': alt })}
      // aspect-16/9: mantém a proporção 16:9 (baixa, para os cartões ocuparem menos altura) qualquer que seja a largura da coluna.
      className={cn(
        'relative flex aspect-16/9 min-h-0 flex-col overflow-hidden border-2 border-chip-ink bg-card-cream',
        className,
      )}
    >
      <BrowserBar />
      {/* relative: ancora a imagem, que fica absolute e preenche toda a área (object-cover
          corta o excesso em vez de distorcer). */}
      <div className={cn('relative grid flex-1 place-items-center', TONE[tone])}>
        {showImage && shape === 'circle' ? (
          // Círculo: uma camada que preenche a área, com padding e conteúdo centralizado. A
          // imagem ocupa a ALTURA útil (h-full) e vira um quadrado perfeito (aspect-square);
          // rounded-full o transforma em círculo e object-cover recorta o excesso se o arquivo
          // não for quadrado. A camada é FLEX (e não grid) de propósito: `h-full` só resolve
          // contra uma altura definida, e a linha de uma grade automática NÃO é definida, então a
          // imagem tomava o tamanho do arquivo (512px) e estourava a miniatura. Num contêiner flex
          // com `absolute inset-0` a altura é definida e a porcentagem funciona.
          <div className="absolute inset-0 flex items-center justify-center p-3">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              onError={() => setFailed(true)}
              className="aspect-square h-full max-w-full rounded-full object-cover"
            />
          </div>
        ) : showImage ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className={cn(
              'absolute inset-0 size-full',
              fit === 'contain' ? 'object-contain p-3' : 'object-cover',
            )}
          />
        ) : (
          <Landscape />
        )}
      </div>
    </div>
  );
}
