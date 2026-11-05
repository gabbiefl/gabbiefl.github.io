import { expect, test, type Page } from '@playwright/test';

// Aperta Tab até o elemento ficar focado (o foco por TECLADO é o que ativa :focus-visible).
async function tabUntilFocused(page: Page, target: ReturnType<Page['locator']>, max = 15) {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press('Tab');
    if (await target.evaluate((el) => el === el.ownerDocument.activeElement)) return;
  }
  throw new Error('o elemento não recebeu foco por teclado');
}

test.describe('header', () => {
  test.use({ locale: 'pt-BR' });

  test.describe('marca <gabbie/>', () => {
    test('usa a fonte pixel (Pixelify Sans) no cabeçalho e no rodapé', async ({ page }) => {
      await page.goto('/');
      const header = page.getByRole('banner').getByRole('link', { name: 'Gabriela Flores' });
      const footer = page.getByRole('contentinfo').getByRole('link', { name: 'Gabriela Flores' });

      await expect(header).toHaveCSS('font-family', /Pixelify Sans/);
      await expect(footer).toHaveCSS('font-family', /Pixelify Sans/);
      await expect(header).toContainText('gabbie');
    });

    test('hover/foco: sombra dura rosa atrás das letras, sem mudar a cor do texto', async ({
      page,
    }) => {
      await page.goto('/');
      const logo = page.getByRole('banner').getByRole('link', { name: 'Gabriela Flores' });

      await expect(logo).toHaveCSS('text-shadow', 'none');
      await logo.hover();
      // Sombra DURA (sem blur) de 2px, rosa (#F7B6D2). O texto continua escuro: o rosa é só a sombra.
      await expect(logo).toHaveCSS('text-shadow', 'rgb(247, 182, 210) 2px 2px 0px');
      await expect(logo).toHaveCSS('color', 'rgb(27, 20, 22)');
    });

    test('o foco por teclado recebe a mesma sombra rosa', async ({ page }) => {
      await page.goto('/');
      const logo = page.getByRole('banner').getByRole('link', { name: 'Gabriela Flores' });

      await tabUntilFocused(page, logo);
      await expect(logo).toHaveCSS('text-shadow', 'rgb(247, 182, 210) 2px 2px 0px');
    });

    test('no tema escuro a sombra também é rosa e o texto segue creme', async ({ page }) => {
      await page.addInitScript("localStorage.setItem('gf-theme', 'dark')");
      await page.goto('/');
      const logo = page.getByRole('banner').getByRole('link', { name: 'Gabriela Flores' });

      await logo.hover();
      await expect(logo).toHaveCSS('text-shadow', 'rgb(247, 182, 210) 2px 2px 0px');
      await expect(logo).toHaveCSS('color', 'rgb(243, 238, 230)');
    });

    test('com prefers-reduced-motion a sombra aparece, mas sem o "pulo" de 1px', async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      const logo = page.getByRole('banner').getByRole('link', { name: 'Gabriela Flores' });

      await logo.hover();
      await expect(logo).toHaveCSS('text-shadow', 'rgb(247, 182, 210) 2px 2px 0px');
      await expect(logo).toHaveCSS('translate', 'none');
    });
  });

  test.describe('hover dos links do nav', () => {
    const navLink = (page: Page, name: string) =>
      page.getByRole('navigation', { name: /Seções|Sections/ }).getByRole('link', { name });

    test('uma linha rosa contínua de 3px "desenha" o sublinhado no hover (tema claro)', async ({
      page,
    }) => {
      await page.goto('/');
      const text = navLink(page, 'Sobre').locator('span');

      // Repouso: a linha existe, mas com largura 0 (invisível); a altura já é de 3px.
      await expect(text).toHaveCSS('background-size', '0% 3px');
      await navLink(page, 'Sobre').hover();
      // toHaveCSS tenta de novo até a transição em degraus (200ms) terminar.
      await expect(text).toHaveCSS('background-size', '100% 3px');
      // A linha é CONTÍNUA (um gradiente de uma cor só, sem repetição) e rosa (#F7B6D2).
      await expect(text).toHaveCSS(
        'background-image',
        /^linear-gradient\(rgb\(247, 182, 210\), rgb\(247, 182, 210\)\)$/,
      );
    });

    test('a cor do texto NÃO muda no hover (só a linha aparece)', async ({ page }) => {
      await page.goto('/');
      const link = navLink(page, 'Projetos');

      await expect(link).toHaveCSS('color', 'rgb(27, 20, 22)');
      await link.hover();
      await expect(link.locator('span')).toHaveCSS('background-size', '100% 3px');
      await expect(link).toHaveCSS('color', 'rgb(27, 20, 22)');
    });

    test('no tema escuro a linha continua rosa (a cor não depende do tema)', async ({ page }) => {
      await page.addInitScript("localStorage.setItem('gf-theme', 'dark')");
      await page.goto('/');
      const link = navLink(page, 'Projetos');

      await link.hover();
      await expect(link.locator('span')).toHaveCSS('background-size', '100% 3px');
      await expect(link.locator('span')).toHaveCSS(
        'background-image',
        /^linear-gradient\(rgb\(247, 182, 210\), rgb\(247, 182, 210\)\)$/,
      );
    });

    test('a linha é fina: altura de 3px, bem menor que a área clicável de 44px', async ({
      page,
    }) => {
      await page.goto('/');
      const link = navLink(page, 'Sobre');

      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      await expect(link.locator('span')).toHaveCSS('background-size', '0% 3px');
    });

    test('o foco por teclado recebe o mesmo efeito do hover', async ({ page }) => {
      await page.goto('/');
      const link = navLink(page, 'Experiência');

      await tabUntilFocused(page, link);
      await expect(link.locator('span')).toHaveCSS('background-size', '100% 3px');
    });

    test('com prefers-reduced-motion não há transição (a linha aparece direto)', async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      const link = navLink(page, 'Stack');
      const text = link.locator('span');

      // Sem a classe motion-safe:, o valor da propriedade é o padrão do CSS: "all", em 0s.
      await expect(text).toHaveCSS('transition-property', 'all');
      await expect(text).toHaveCSS('transition-duration', '0s');
      await link.hover();
      await expect(text).toHaveCSS('background-size', '100% 3px');
    });
  });

  test.describe('tamanho dos controles (header mais leve)', () => {
    test('botão de tema 36px, switch 36px e marca de 20px', async ({ page }) => {
      await page.goto('/');
      const theme = page.getByRole('banner').getByRole('button', { name: 'Ativar modo escuro' });
      const group = page.getByRole('group', { name: /Idioma|Language/ });
      const logo = page.getByRole('banner').getByRole('link', { name: 'Gabriela Flores' });

      // 32px de miolo + 2px de contorno de cada lado = 36px (antes eram 44px).
      expect((await theme.boundingBox())!.height).toBeCloseTo(36, 0);
      expect((await theme.boundingBox())!.width).toBeCloseTo(36, 0);
      expect((await group.boundingBox())!.height).toBeCloseTo(36, 0);
      await expect(logo).toHaveCSS('font-size', '20px');
    });

    test('o ícone do tema acompanha o botão menor (16px)', async ({ page }) => {
      await page.goto('/');
      const icon = page
        .getByRole('banner')
        .getByRole('button', { name: 'Ativar modo escuro' })
        .locator('svg');

      await expect(icon).toHaveCSS('font-size', '16px');
    });

    test('os botões de rede do Hero continuam no tamanho grande (44px)', async ({ page }) => {
      await page.goto('/');
      const social = page.getByRole('list', { name: 'Redes sociais' }).getByRole('link').first();

      expect((await social.boundingBox())!.height).toBeCloseTo(44, 0);
    });
  });

  test.describe('switch de idioma', () => {
    // O rótulo do grupo muda com o idioma ("Idioma" em PT, "Language" em EN); por isso o nome
    // é buscado com uma regex, e não com o texto fixo, senão o grupo some do localizador no
    // exato momento em que o clique troca a língua.
    test('é um grupo com EN e PT; o idioma atual vem marcado como pressionado', async ({
      page,
    }) => {
      await page.goto('/');
      const group = page.getByRole('group', { name: /Idioma|Language/ });
      const en = group.getByRole('button', { name: 'EN', exact: true });
      const pt = group.getByRole('button', { name: 'PT', exact: true });

      await expect(group.getByRole('button')).toHaveCount(2);
      await expect(pt).toHaveAttribute('aria-pressed', 'true');
      await expect(en).toHaveAttribute('aria-pressed', 'false');
    });

    test('clicar troca o idioma, o aria-pressed, a cor do texto e a posição do polegar', async ({
      page,
    }) => {
      await page.goto('/');
      const group = page.getByRole('group', { name: /Idioma|Language/ });
      const en = group.getByRole('button', { name: 'EN', exact: true });
      const pt = group.getByRole('button', { name: 'PT', exact: true });
      const thumb = group.locator('span[aria-hidden="true"]');

      // PT ativo: polegar deslocado para a direita; texto do PT claro (sobre o polegar escuro).
      await expect(pt).toHaveCSS('color', 'rgb(255, 255, 255)');
      await expect(en).toHaveCSS('color', 'rgb(27, 20, 22)');
      await expect(thumb).not.toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');

      await en.click();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(en).toHaveAttribute('aria-pressed', 'true');
      await expect(pt).toHaveAttribute('aria-pressed', 'false');
      await expect(en).toHaveCSS('color', 'rgb(255, 255, 255)');
      // Polegar de volta ao início (a transição em degraus dura ~150ms; o expect espera).
      await expect(thumb).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
    });

    test('funciona pelo teclado e mostra o anel de foco no wrapper', async ({ page }) => {
      await page.goto('/');
      const group = page.getByRole('group', { name: /Idioma|Language/ });
      const en = group.getByRole('button', { name: 'EN', exact: true });

      await tabUntilFocused(page, en);
      // O anel fica no grupo (e não no botão), porque o miolo tem clip-path e cortaria o contorno.
      await expect(group).toHaveCSS('outline-style', 'solid');
      await expect(group).toHaveCSS('outline-width', '3px');

      await page.keyboard.press('Space');
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(en).toHaveAttribute('aria-pressed', 'true');

      await page.keyboard.press('Tab'); // vai para o PT
      await page.keyboard.press('Enter');
      await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
    });

    test('a escolha persiste após recarregar', async ({ page }) => {
      await page.goto('/');
      await page
        .getByRole('group', { name: /Idioma|Language/ })
        .getByRole('button', { name: 'EN', exact: true })
        .click();
      await page.reload();

      await expect(
        page
          .getByRole('group', { name: /Idioma|Language/ })
          .getByRole('button', { name: 'EN', exact: true }),
      ).toHaveAttribute('aria-pressed', 'true');
    });

    test('tem a mesma altura do botão de tema ao lado', async ({ page }) => {
      await page.goto('/');
      const theme = page.getByRole('banner').getByRole('button', { name: 'Ativar modo escuro' });
      const group = page.getByRole('group', { name: /Idioma|Language/ });

      const a = (await theme.boundingBox())!;
      const b = (await group.boundingBox())!;
      // O contorno de 2px e o miolo somam o mesmo que o botão pixel-chunk (±1px de arredondamento).
      expect(Math.abs(a.height - b.height)).toBeLessThanOrEqual(1);
    });

    test('com prefers-reduced-motion o polegar troca de lugar sem animar', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      const thumb = page
        .getByRole('group', { name: /Idioma|Language/ })
        .locator('span[aria-hidden="true"]');

      await expect(thumb).toHaveCSS('transition-duration', '0s');
    });

    test('mobile (390px): o switch cabe no cabeçalho sem rolagem horizontal', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/');
      await expect(page.getByRole('group', { name: /Idioma|Language/ })).toBeVisible();

      const overflow = await page
        .locator('html')
        .evaluate((root) => root.scrollWidth - root.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });

  test.describe('ícones do toggle de tema', () => {
    test('são do Font Awesome: Lua no claro, Sol no escuro, sempre decorativos', async ({
      page,
    }) => {
      await page.goto('/');
      const toggle = page.getByRole('banner').getByRole('button', { name: 'Ativar modo escuro' });
      const icon = toggle.locator('svg.svg-inline--fa');

      await expect(icon).toHaveAttribute('data-icon', 'moon');
      await expect(icon).toHaveAttribute('aria-hidden', 'true');

      await toggle.click();
      const toggleLight = page
        .getByRole('banner')
        .getByRole('button', { name: 'Ativar modo claro' });
      await expect(toggleLight.locator('svg.svg-inline--fa')).toHaveAttribute('data-icon', 'sun');
    });

    test('o ícone herda a cor do botão e troca junto com o tema', async ({ page }) => {
      await page.goto('/');
      const toggle = page.getByRole('banner').getByRole('button', { name: 'Ativar modo escuro' });
      await expect(toggle.locator('svg')).toHaveCSS('color', 'rgb(27, 20, 22)');

      await toggle.click();
      await expect(
        page.getByRole('banner').getByRole('button', { name: 'Ativar modo claro' }).locator('svg'),
      ).toHaveCSS('color', 'rgb(243, 238, 230)');
    });
  });
});
