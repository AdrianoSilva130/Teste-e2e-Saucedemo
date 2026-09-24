import { test, expect } from '@playwright/test';

test.describe('Autenticação - Sucesso', () => {
  test('Deve realizar login com sucesso usando usuário e senha válidos', async ({ page }) => {
    // 1. Acessar a página inicial
    await page.goto('/');

    // 2. Preencher o formulário de login
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    // 3. Clicar no botão de login
    await page.getByRole('button', { name: 'Login' }).click();

    // 4. Asserções
    // Verifica se foi redirecionado para a página do inventário
    await expect(page).toHaveURL(/.*inventory.html/);
    
    // Verifica se o título da página "Products" está visível
    const title = page.locator('.title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Products');
  });
});