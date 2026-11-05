import { expect, test, type Page } from '@playwright/test';

// Os testes localizam por ESTRUTURA (artigos, botões das setas), não pelo texto dos projetos,
// que está em revisão no content.json e muda.
test.describe('seção projetos (carrossel)', () => {
  test.use({ locale: 'pt-BR' });

  const cards = (page: Page) => page.locator('#projects').getByRole('article');
  const next = (page: Page) => page.getByRole('button', { name: 'Próximos projetos' });
  const prev = (page: Page) => page.getByRole('button', { name: 'Projetos anteriores' });
  const scrollLeft = (page: Page) =>
    page
      .locator('#projects ul')
      .first()
      .evaluate((el) => (el as unknown as { scrollLeft: number }).scrollLeft);

  test('mostra os 3 cartões, cada um com título e imagem ou placeholder', async ({ page }) => {
    await page.goto('/');

    await expect(cards(page)).toHaveCount(3);
    for (const card of await cards(page).all()) {
      await expect(card.getByRole('heading', { level: 3 })).toBeVisible();
      await expect(card.getByRole('img').first()).toBeAttached();
    }
  });

  test('o botão de código só aparece com URL e abre em outra aba; sem demo, sem botão de demo', async ({
    page,
  }) => {
    await page.goto('/');
    const first = cards(page).first();
    const code = first.getByRole('link', { name: 'Github' });

    await expect(code).toHaveAttribute('href', /github\.com/);
    await expect(code).toHaveAttribute('target', '_blank');
    await expect(code).toHaveAttribute('rel', 'noreferrer');
    // O primeiro projeto não tem demo: só o botão de código.
    await expect(first.getByRole('link')).toHaveCount(1);
  });

  test('desktop: 3 cartões cabem na faixa e as setas não aparecem', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const track = (await page.locator('#projects ul').first().boundingBox())!;
    const last = (await cards(page).last().boundingBox())!;

    // O último cartão termina dentro da faixa (não fica cortado na borda direita).
    expect(last.x + last.width).toBeLessThanOrEqual(track.x + track.width + 1);
    await expect(next(page)).toHaveCount(0);
  });

  test('tela estreita: as setas rolam o carrossel e se apagam no começo e no fim', async ({
    page,
  }) => {
    // Sem rolagem suave: com animação a posição final demoraria a assentar.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 800, height: 900 });
    await page.goto('/');

    await expect(prev(page)).toBeDisabled();
    await expect(next(page)).toBeEnabled();
    expect(await scrollLeft(page)).toBe(0);

    await next(page).click();
    await expect.poll(() => scrollLeft(page)).toBeGreaterThan(0);
    await expect(prev(page)).toBeEnabled();

    // Rola até o fim: a seta de avançar apaga.
    for (let i = 0; i < 3 && (await next(page).isEnabled()); i++) await next(page).click();
    await expect(next(page)).toBeDisabled();

    await prev(page).click();
    await expect(next(page)).toBeEnabled();
  });

  test('celular (390px): cartões em fila rolável, sem rolagem horizontal na página', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const [first, second] = await Promise.all([
      cards(page).nth(0).boundingBox(),
      cards(page).nth(1).boundingBox(),
    ]);

    // Lado a lado (mesma altura de topo), e o segundo começa à direita do primeiro.
    expect(Math.abs(first!.y - second!.y)).toBeLessThan(2);
    expect(second!.x).toBeGreaterThan(first!.x + first!.width / 2);

    const overflow = await page
      .locator('html')
      .evaluate((root) => root.scrollWidth - root.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('em EN os rótulos das setas e dos botões trocam', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 900 });
    await page.goto('/');
    await page.getByRole('button', { name: 'EN', exact: true }).click();

    await expect(page.getByRole('button', { name: 'Next projects' })).toBeVisible();
    await expect(cards(page).first().getByRole('link', { name: 'Github' })).toBeVisible();
  });
});
