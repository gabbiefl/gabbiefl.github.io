import { expect, test } from '@playwright/test';

test.describe('tema e idioma', () => {
  test.use({ locale: 'pt-BR' });

  test('trocar tema e idioma muda data-theme e <html lang> e persiste após recarregar', async ({
    page,
  }) => {
    const html = page.locator('html');
    await page.goto('/');

    // Padrões: tema claro; idioma pelo navegador (pt-BR -> pt).
    await expect(html).toHaveAttribute('data-theme', 'light');
    await expect(html).toHaveAttribute('lang', 'pt');
    await expect(page.getByText('Desenvolvedora Full-Stack', { exact: true })).toBeVisible();
    await expect(page).toHaveTitle('Gabriela Flores | Desenvolvedora Full-Stack');

    await page.getByRole('button', { name: 'Ativar modo escuro' }).click();
    await page.getByRole('button', { name: 'EN', exact: true }).click();

    await expect(html).toHaveAttribute('data-theme', 'dark');
    await expect(html).toHaveAttribute('lang', 'en');
    await expect(page.getByText('Full-Stack Developer', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
    await expect(page).toHaveTitle('Gabriela Flores | Full-Stack Developer');

    await page.reload();

    await expect(html).toHaveAttribute('data-theme', 'dark');
    await expect(html).toHaveAttribute('lang', 'en');
    await expect(page.getByText('Full-Stack Developer', { exact: true })).toBeVisible();
  });
});

test.describe('estilos', () => {
  test('utilitários do Tailwind usam os tokens e acompanham o tema', async ({ page }) => {
    await page.goto('/');
    const body = page.locator('body');
    const h1 = page.getByRole('heading', { level: 1 });

    await expect(h1).toHaveCSS('font-family', /Fraunces/);
    await expect(body).toHaveCSS('background-color', 'rgb(243, 238, 230)');
    await expect(body).toHaveCSS('color', 'rgb(27, 20, 22)');

    await page.getByRole('button', { name: /dark mode|modo escuro/ }).click();

    await expect(body).toHaveCSS('background-color', 'rgb(21, 16, 19)');
    await expect(body).toHaveCSS('color', 'rgb(243, 238, 230)');
  });
});

test.describe('padrões', () => {
  test.use({ locale: 'en-US' });

  test('idioma padrão não-português cai em en', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

test.describe('tema auto', () => {
  test.use({ colorScheme: 'dark' });

  test('"auto" segue prefers-color-scheme', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('gf-theme', 'auto'));
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
});
