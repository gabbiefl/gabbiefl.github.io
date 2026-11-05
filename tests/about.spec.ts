import { expect, test } from '@playwright/test';

test.describe('seção sobre mim', () => {
  test.use({ locale: 'pt-BR' });

  test('mostra o conteúdo em PT: h2 com destaque, parágrafos, cartões e polaroid sem legenda', async ({
    page,
  }) => {
    await page.goto('/');
    const about = page.locator('#about');

    await expect(about.getByRole('heading', { level: 2 })).toContainText(
      'Desenvolvimento full-stack com olhar criativo.',
    );
    // O destaque é só a segunda metade da frase.
    await expect(about.locator('.highlight')).toHaveText('criativo.');

    const cards = about.getByRole('listitem');
    await expect(cards).toHaveCount(2);
    await expect(cards.nth(0)).toContainText('Formação');
    await expect(cards.nth(0)).toContainText('Cesuca');
    await expect(cards.nth(1)).toContainText('Inglês');
    await expect(cards.nth(1)).toContainText('C1');

    // O polaroid aparece (a fita é um dos seus elementos), sem depender do texto do imgLabel.
    await expect(about.locator('.tape-edge')).toBeVisible();
    // O polaroid não tem legenda (a foto fala por si).
    await expect(about.getByText('pixel avatar')).toHaveCount(0);
  });

  test('troca de idioma atualiza a seção, e o polaroid segue sem legenda', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'EN', exact: true }).click();

    const about = page.locator('#about');
    await expect(about.getByRole('heading', { level: 2 })).toContainText(
      'Full-stack development with a creative eye.',
    );
    await expect(about.getByText('pixel avatar')).toHaveCount(0);
    await expect(about.getByRole('listitem').nth(0)).toContainText('Education');
  });

  test('desktop: polaroid à esquerda e cartões lado a lado', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const about = page.locator('#about');

    const photo = (await about.locator('.tape-edge').boundingBox())!; // a fita fica no topo do polaroid
    const title = (await about.getByRole('heading', { level: 2 }).boundingBox())!;
    expect(photo.x).toBeLessThan(title.x);

    const cards = about.getByRole('listitem');
    const first = (await cards.nth(0).boundingBox())!;
    const second = (await cards.nth(1).boundingBox())!;
    expect(second.x).toBeGreaterThan(first.x + first.width / 2);
  });

  test('mobile (390px): uma coluna, sem rolagem horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const about = page.locator('#about');

    const cards = about.getByRole('listitem');
    const first = (await cards.nth(0).boundingBox())!;
    const second = (await cards.nth(1).boundingBox())!;
    expect(second.y).toBeGreaterThan(first.y + first.height - 1);

    const overflow = await page
      .locator('html')
      .evaluate((root) => root.scrollWidth - root.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('o link "Sobre" do nav leva até a seção', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page
      .getByRole('navigation', { name: 'Seções' })
      .getByRole('link', { name: 'Sobre' })
      .click();
    await expect(page).toHaveURL(/#about$/);
    await expect(page.locator('#about')).toBeInViewport();
  });
});
