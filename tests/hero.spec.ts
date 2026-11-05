import { expect, test } from '@playwright/test';

test.describe('header e hero', () => {
  test.use({ locale: 'pt-BR' });

  test('hero tem id="top", altura mínima e nav aponta para as seções', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const hero = page.locator('#top');
    await expect(hero).toBeVisible();
    const { height } = (await hero.boundingBox())!;
    expect(height).toBeGreaterThanOrEqual(900);

    const links = page.getByRole('navigation', { name: 'Seções' }).getByRole('link');
    await expect(links).toHaveCount(5);
    const hrefs = await links.evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    expect(hrefs).toEqual(['#about', '#experience', '#projects', '#stack', '#contact']);

    // Só o do cabeçalho (banner): a marca também aparece no rodapé.
    await expect(
      page.getByRole('banner').getByRole('link', { name: 'Gabriela Flores' }),
    ).toHaveAttribute('href', '#top');
    await expect(page.getByRole('heading', { level: 1, name: 'Gabriela Flores' })).toBeVisible();
  });

  test('altura mínima de 760px em telas baixas', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 600 });
    await page.goto('/');
    const { height } = (await page.locator('#top').boundingBox())!;
    expect(height).toBeGreaterThanOrEqual(760);
  });

  test('em 390px não há rolagem horizontal e o nav some', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const overflow = await page
      .locator('html')
      .evaluate((root) => root.scrollWidth - root.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(page.getByRole('navigation', { name: 'Seções' })).toBeHidden();
  });

  test('sem marquee: a base do Hero tem só o chevron que leva ao Sobre', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('#top');

    await expect(hero.locator('div.w-max')).toHaveCount(0);
    await expect(hero.getByRole('link', { name: 'Rolar para baixo' })).toHaveAttribute(
      'href',
      '#about',
    );
  });

  test('botões de GitHub e LinkedIn usam os links do content.json', async ({ page }) => {
    await page.goto('/');
    const social = page.getByRole('list', { name: 'Redes sociais' });
    await expect(social.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      /linkedin\.com\/in\/gabriela-flores-lopes/,
    );
    await expect(social.getByRole('link', { name: 'GitHub' })).toBeVisible();
  });

  test.describe('nome no centro', () => {
    // O tamanho segue clamp(60px, 6.4vw, 100px): proporcional à largura, com mínimo e teto.
    const sizes: [number, string][] = [
      [1920, '100px'], // teto
      [1440, '92.16px'], // 6.4vw
      [1024, '65.536px'], // 6.4vw
      [390, '60px'], // piso
    ];

    for (const [width, expected] of sizes) {
      test(`em ${width}px o nome mede ${expected}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/');
        await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('font-size', expected);
      });
    }

    test('o nome continua dentro da caixa tracejada em desktop largo', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      const name = (await page.getByRole('heading', { level: 1 }).boundingBox())!;

      // Mais baixo que antes: duas linhas de 100px com line-height .92 ≈ 184px (eram ~309px).
      expect(name.height).toBeLessThan(200);
      expect(name.width).toBeLessThan(700);
    });
  });

  test.describe('botões de ação', () => {
    test('"Ver projetos" é o botão principal, vem primeiro e tem seta; "Falar comigo" não tem seta', async ({
      page,
    }) => {
      await page.goto('/');
      const projects = page.getByRole('link', { name: 'Ver projetos' });
      const contact = page.getByRole('link', { name: 'Falar comigo' });

      await expect(projects.locator('svg')).toHaveCount(1);
      await expect(contact.locator('svg')).toHaveCount(0);
      await expect(projects).toHaveAttribute('href', '#projects');
      await expect(contact).toHaveAttribute('href', '#contact');
      // O principal fica à esquerda do secundário.
      const [first, second] = [await projects.boundingBox(), await contact.boundingBox()];
      expect(first!.x).toBeLessThan(second!.x);
    });
  });

  test('o primeiro Tab leva ao link "pular para o conteúdo", que só aparece com foco', async ({
    page,
  }) => {
    await page.goto('/');
    const skip = page.getByRole('link', { name: 'Pular para o conteúdo' });

    await page.keyboard.press('Tab');
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await expect(skip).toHaveCSS('position', 'fixed');

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
    await expect(page.locator('main#main')).toBeFocused();
  });
});
