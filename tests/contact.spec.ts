import { expect, test } from '@playwright/test';

// Formato de um mailto válido. O endereço em si vem do content.json (não fica escrito aqui).
const MAILTO = /^mailto:\S+@\S+\.\S+$/;

test.describe('seção contato', () => {
  test.use({ locale: 'pt-BR' });

  test('"Enviar e-mail" é um link mailto com o endereço do content.json, sem botão de copiar', async ({
    page,
  }) => {
    await page.goto('/');
    const section = page.locator('#contact');
    const send = section.getByRole('link', { name: 'Enviar e-mail' });

    await expect(send).toHaveAttribute('href', MAILTO);
    await expect(send).not.toHaveAttribute('target', '_blank');
    // Não há botão de copiar: a seção inteira não tem nenhum <button>.
    await expect(section.locator('button')).toHaveCount(0);
    await expect(section.getByText(/Copiar e-mail|Copy e-mail/)).toHaveCount(0);
  });

  test('não há cursor azul ao lado do botão de enviar', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const section = page.locator('#contact');

    // O cursor era um elemento decorativo com pointer-events-none; agora não existe nenhum.
    await expect(section.locator('.pointer-events-none')).toHaveCount(0);
  });

  test('lista de links: e-mail, GitHub e LinkedIn; só o externo abre em outra aba', async ({
    page,
  }) => {
    await page.goto('/');
    const list = page.locator('#contact').getByRole('list', { name: 'Contatos e redes' });
    const links = list.getByRole('link');

    await expect(links).toHaveCount(3);
    await expect(links.nth(0)).toContainText('E-mail');
    await expect(links.nth(0)).toHaveAttribute('href', MAILTO);
    // O endereço exibido é o mesmo do mailto.
    const address = ((await links.nth(0).getAttribute('href')) ?? '').replace('mailto:', '');
    await expect(links.nth(0)).toContainText(address);
    await expect(links.nth(1)).toContainText('GitHub');
    await expect(links.nth(1)).toHaveAttribute('href', /^https:\/\/github\.com\/\S+/);
    await expect(links.nth(1)).toHaveAttribute('target', '_blank');
    await expect(links.nth(2)).toContainText('LinkedIn');
    await expect(links.nth(2)).toHaveAttribute('href', /linkedin\.com\/in\/gabriela-flores-lopes/);
    await expect(links.nth(2)).toHaveAttribute('target', '_blank');
    await expect(links.nth(2)).toHaveAttribute('rel', 'noreferrer');
  });

  test('a janela mostra o status de disponibilidade', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('#contact').getByText('Aberta a novas oportunidades', { exact: true }),
    ).toBeVisible();
  });

  test('rodapé: tem o papel de contentinfo, a marca e "Voltar ao topo"', async ({ page }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');

    await expect(footer).toHaveCount(1);
    await expect(footer).not.toContainText('©');
    await expect(footer.getByRole('link', { name: 'Gabriela Flores' })).toHaveAttribute(
      'href',
      '#top',
    );
    await expect(footer.getByRole('link', { name: 'Voltar ao topo' })).toHaveAttribute(
      'href',
      '#top',
    );
  });

  test('"Voltar ao topo" leva de volta ao Hero', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.getByRole('link', { name: 'Voltar ao topo' }).scrollIntoViewIfNeeded();
    await expect(page.locator('#top')).not.toBeInViewport();

    await page.getByRole('link', { name: 'Voltar ao topo' }).click();
    await expect(page).toHaveURL(/#top$/);
    await expect(page.locator('#top')).toBeInViewport();
  });

  test('o CTA do Hero leva até a seção de contato', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.getByRole('link', { name: 'Falar comigo' }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('em EN o botão e a lista trocam de idioma', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    const section = page.locator('#contact');

    await expect(section.getByRole('link', { name: 'Send e-mail' })).toBeVisible();
    await expect(section.getByRole('list', { name: 'Contacts and social links' })).toBeVisible();
  });

  test('desktop: texto à esquerda e janela à direita; mobile: uma coluna sem rolagem horizontal', async ({
    page,
  }) => {
    const section = page.locator('#contact');
    const columns = async () => ({
      title: (await section.getByRole('heading', { level: 2 }).boundingBox())!,
      list: (await section.getByRole('list', { name: /Contatos e redes/ }).boundingBox())!,
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const desktop = await columns();
    expect(desktop.list.x).toBeGreaterThan(desktop.title.x + desktop.title.width / 2);

    await page.setViewportSize({ width: 390, height: 844 });
    const mobile = await columns();
    expect(mobile.list.y).toBeGreaterThan(mobile.title.y + mobile.title.height - 1);
    const overflow = await page
      .locator('html')
      .evaluate((root) => root.scrollWidth - root.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('divisores entre as seções são decorativos e não somam altura', async ({ page }) => {
    await page.goto('/');
    const dividers = page.locator('main > div[aria-hidden="true"]');

    await expect(dividers).toHaveCount(4);
    for (const divider of await dividers.all()) {
      expect((await divider.boundingBox())!.height).toBe(0);
    }
  });
});
