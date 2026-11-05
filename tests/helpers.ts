import type { Locator, Page } from '@playwright/test';

/**
 * Espera as fontes web terminarem de carregar. Enquanto elas não chegam, o navegador mostra uma
 * fonte reserva e, quando a verdadeira chega, o texto muda de tamanho e EMPURRA tudo para baixo
 * (layout shift). Medir posições nesse intervalo dá números que valem para um instante só.
 * Passado como string porque o tsconfig dos testes não tem os tipos do DOM.
 */
export async function fontsReady(page: Page): Promise<void> {
  await page.evaluate('document.fonts.ready.then(() => true)');
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Mede VÁRIOS elementos de uma vez, numa única leitura do DOM: todos os retângulos refletem o
 * mesmo instante. Com `Promise.all` de vários `boundingBox()` cada medida é uma chamada separada,
 * e se o layout mudar entre elas (fonte chegando, imagem carregando) as medidas ficam
 * incoerentes entre si e o teste oscila.
 */
export async function rects(locator: Locator): Promise<Rect[]> {
  return locator.evaluateAll((elements) =>
    elements.map((element) => {
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width, height };
    }),
  );
}
