import { expect, test, type Page } from '@playwright/test';

// /kit carrega por import dinâmico (só em desenvolvimento): espera os painéis aparecerem antes de
// qualquer checagem, senão o teste olha a página enquanto o chunk ainda está chegando.
async function openKit(page: Page) {
  await page.goto('/kit');
  await page.locator('main > [data-theme="light"]').waitFor();
}

test.describe('/kit', () => {
  test.use({ locale: 'pt-BR' });

  test('mostra os componentes nos dois temas, cada painel com suas cores', async ({ page }) => {
    await openKit(page);
    // Os painéis são filhos diretos do <main>; o <html> também tem data-theme.
    const light = page.locator('main > [data-theme="light"]');
    const dark = page.locator('main > [data-theme="dark"]');

    await expect(light.locator('.pxb')).not.toHaveCount(0);
    await expect(dark.locator('.pxb')).toHaveCount(await light.locator('.pxb').count());

    await expect(light).toHaveCSS('background-color', 'rgb(243, 238, 230)');
    await expect(dark).toHaveCSS('background-color', 'rgb(21, 16, 19)');

    // Botão primário: fundo --ink (muda com o tema) e sombra rosa nos dois.
    const primaryInner = (panel: typeof light) => panel.locator('.pxb-primary .pxb-i').first();
    await expect(primaryInner(light)).toHaveCSS('background-color', 'rgb(27, 20, 22)');
    await expect(primaryInner(dark)).toHaveCSS('background-color', 'rgb(243, 238, 230)');
    for (const panel of [light, dark]) {
      await expect(panel.locator('.pxb-primary').first()).toHaveCSS(
        'filter',
        /rgb\(247, 182, 210\)/,
      );
    }
  });

  test('foco por teclado fica visível nos botões', async ({ page }) => {
    await openKit(page);
    await page.keyboard.press('Tab');

    const focused = page.locator(':focus');
    await expect(focused).toHaveClass(/pxb/);
    await expect(focused).toHaveCSS('outline-style', 'solid');
    await expect(focused).toHaveCSS('outline-width', '3px');
  });

  test('ProjectImage: com URL mostra <img> com alt; sem URL mostra o placeholder com role="img"', async ({
    page,
  }) => {
    await openKit(page);
    const panel = page.locator('main > [data-theme="light"]');

    // Com URL: uma <img> de verdade, com alt.
    await expect(panel.locator('img[alt="Imagem de exemplo"]')).toBeVisible();
    // Sem URL: nenhuma <img>, e o quadro é role="img" com o rótulo do content.json.
    await expect(
      panel.getByRole('img', { name: 'Espaço reservado para a imagem do projeto' }),
    ).toBeVisible();
    await expect(panel.locator('img')).toHaveCount(1);
  });

  test('sprites decorativos ficam fora da árvore de acessibilidade', async ({ page }) => {
    await openKit(page);
    const svgs = page.locator('main svg');
    const total = await svgs.count();
    expect(total).toBeGreaterThan(20);
    await expect(page.locator('main svg:not([aria-hidden="true"])')).toHaveCount(0);
  });
});
