import { expect, test } from '@playwright/test';

test.describe('seção stack', () => {
  test.use({ locale: 'pt-BR' });

  test('mostra 5 grupos com título e as tecnologias', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#stack');

    await expect(section.getByRole('heading', { level: 3 })).toHaveText([
      'Front-end',
      'Back-end & Banco de Dados',
      'Mobile',
      'Análise de Dados',
      'Ferramentas e Design',
    ]);
    // Cada grupo é uma lista rotulada pelo título.
    await expect(section.getByRole('list', { name: 'Front-end' }).getByRole('listitem')).toHaveText(
      ['HTML', 'CSS', 'Sass', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'React.js'],
    );
    await expect(section.getByRole('list', { name: 'Mobile' }).getByRole('listitem')).toHaveText([
      'Dart',
      'Flutter',
    ]);
  });

  test('todo logo carrega e o nome acessível é o da tecnologia', async ({ page }) => {
    await page.goto('/');
    // Todo logo fica dentro de um role="img" com o nome da tecnologia.
    await expect(page.locator('#stack li li span[role="img"]')).toHaveCount(19);
    await expect(page.locator('#stack').getByRole('img', { name: 'React.js' })).toBeVisible();

    // Os 19 arquivos SVG precisam carregar (pega caminho errado ou SVG inválido).
    const logos = page.locator('#stack li li img');
    await expect(logos).toHaveCount(19);
    for (const logo of await logos.all()) {
      await logo.scrollIntoViewIfNeeded();
      await expect(logo).toHaveJSProperty('complete', true);
      // naturalWidth 0 = a imagem não carregou (caminho errado ou SVG inválido).
      const width = await logo.evaluateHandle(
        (el) => (el as unknown as { naturalWidth: number }).naturalWidth,
      );
      expect(await width.jsonValue()).toBeGreaterThan(0);
    }
    await expect(page.locator('#stack').getByRole('img', { name: 'Node.js' })).toBeVisible();
  });

  test('desktop: título à esquerda dos logos; celular: título em cima', async ({ page }) => {
    const rowBoxes = async () => {
      const row = page.locator('#stack > div > ul > li').first();
      return {
        title: (await row.getByRole('heading').boundingBox())!,
        logo: (await row.locator('li').first().boundingBox())!,
      };
    };

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    let { title, logo } = await rowBoxes();
    expect(title.x).toBeLessThan(logo.x);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    ({ title, logo } = await rowBoxes());
    expect(title.y + title.height).toBeLessThanOrEqual(logo.y);
  });

  test('a casa do logo fica rosa no hover', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const tile = page.locator('#stack li li').first();
    const house = tile.locator('span').first();
    // Rosa translúcido (70%): o Chromium devolve a cor em oklab, com o alfa no fim.
    const translucentPink = /^oklab\(.* \/ 0\.7\)$/;

    await expect(house).not.toHaveCSS('background-color', translucentPink);
    await tile.hover();
    await expect(house).toHaveCSS('background-color', translucentPink);
  });

  test('celular (390px): sem rolagem horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const overflow = await page
      .locator('html')
      .evaluate((root) => root.scrollWidth - root.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('o nome da tecnologia só aparece num balão no hover ou foco', async ({ page }) => {
    // Sem a animação de entrada (Reveal): com ela a linha ainda está subindo quando o mouse chega e
    // o hover falha de vez em quando.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const tile = page
      .locator('#stack')
      .getByRole('listitem')
      .filter({ hasText: /^React\.js$/ })
      .first();
    const balloon = tile.getByText('React.js', { exact: true });

    await expect(balloon).toBeHidden();
    await tile.hover();
    await expect(balloon).toBeVisible();

    await page.mouse.move(0, 0);
    await expect(balloon).toBeHidden();
    await tile.focus();
    await expect(balloon).toBeVisible();
  });

  test('em EN os títulos dos grupos trocam', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    const titles = page.locator('#stack').getByRole('heading', { level: 3 });

    await expect(titles.nth(1)).toHaveText('Back-end & Databases');
    await expect(titles.nth(3)).toHaveText('Data Analysis');
    await expect(titles.nth(4)).toHaveText('Tools and Design');
  });
});
