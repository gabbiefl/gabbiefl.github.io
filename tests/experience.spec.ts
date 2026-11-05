import { expect, test } from '@playwright/test';

test.describe('seção experiência', () => {
  test.use({ locale: 'pt-BR' });

  test('mostra os 3 cargos; só o atual tem etiqueta "Atual" e diamante piscando', async ({
    page,
  }) => {
    await page.goto('/');
    const section = page.locator('#experience');

    await expect(section.getByRole('heading', { level: 3 })).toHaveText([
      'Desenvolvedora Web',
      'Assistente de programação',
      'Estagiária de TI',
    ]);
    await expect(section.getByText('Atual', { exact: true })).toHaveCount(1);
    await expect(section.locator('[class*="animate-blink"]')).toHaveCount(1);
  });

  test('não há cartões de projeto em destaque nem botões recolhíveis', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#experience');

    await expect(section.locator('button')).toHaveCount(0);
    await expect(section.locator('[aria-expanded]')).toHaveCount(0);
  });

  test('cada cargo lista suas tecnologias', async ({ page }) => {
    await page.goto('/');
    const lists = page.locator('#experience').getByRole('list', { name: 'Tecnologias' });

    await expect(lists).toHaveCount(3);
    // toContainText (e não toHaveText): a lista de tecnologias do cargo atual muda com frequência no
    // content.json; o que importa aqui é que as pílulas existam.
    await expect(lists.nth(0).getByRole('listitem')).toContainText(['TypeScript', 'React.js']);
  });

  test('desktop: o cabeçalho é sticky e acompanha a rolagem', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const section = page.locator('#experience');
    // h2 -> Reveal -> bloco sticky (o Reveal fica DENTRO do sticky).
    const head = section.getByRole('heading', { level: 2 }).locator('../..');

    await expect(head).toHaveCSS('position', 'sticky');
    // O container não pode virar ancestral de rolagem (quebraria o sticky).
    await expect(section).toHaveCSS('overflow', 'clip');

    // Rola até o começo da seção e depois mais um pouco: o cabeçalho deve ficar a 64px do topo.
    await section.scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 400);
    // A rolagem é suave (scroll-behavior: smooth), então espera o cabeçalho assentar.
    await expect
      .poll(async () => (await head.boundingBox())!.y, { timeout: 5000 })
      .toBeGreaterThanOrEqual(60);
    expect((await head.boundingBox())!.y).toBeLessThanOrEqual(70);
  });

  test('mobile (390px): cabeçalho deixa de ser sticky e o período fica abaixo do título', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const section = page.locator('#experience');
    // h2 -> Reveal -> bloco sticky (o Reveal fica DENTRO do sticky).
    const head = section.getByRole('heading', { level: 2 }).locator('../..');

    await expect(head).toHaveCSS('position', 'static');

    const title = (await section.getByRole('heading', { level: 3 }).first().boundingBox())!;
    const period = (await section.getByText('set. 2026 — o momento').boundingBox())!;
    expect(period.y).toBeGreaterThan(title.y + title.height - 1);

    const overflow = await page
      .locator('html')
      .evaluate((root) => root.scrollWidth - root.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('em EN o conteúdo da linha do tempo troca', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'EN', exact: true }).click();

    await expect(page.locator('#experience').getByRole('heading', { level: 3 })).toHaveText([
      'Web Developer',
      'Junior Software Developer',
      'IT Intern (Web Development & Customer Success)',
    ]);
  });

  test('os projetos em destaque são uma linha discreta (sem cartão) fora da lista de itens', async ({
    page,
  }) => {
    await page.goto('/');
    const section = page.locator('#experience');
    const label = section.getByText('Projeto em destaque', { exact: true });

    // Dois cargos têm projeto em destaque: o KoreIntegra (assistente) e o Koreview (estágio).
    await expect(label).toHaveCount(2);
    await expect(section.getByText('KoreIntegra', { exact: true })).toHaveCount(1);
    await expect(section.getByText('Koreview', { exact: true })).toHaveCount(1);
    // Não é um cartão: sem sombra dura nem fundo, só a barra rosa à esquerda.
    const box = label.first().locator('..');
    await expect(box).toHaveCSS('border-left-width', '3px');
    await expect(box).toHaveCSS('box-shadow', 'none');
    // E não repete o Koreview nos itens do cargo.
    const items = section.getByRole('listitem').filter({ hasText: /^Koreview:/ });
    await expect(items).toHaveCount(0);
  });
});
