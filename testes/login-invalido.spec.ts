import { test, expect } from '@playwright/test';

test.describe('Autenticação - Cenário Negativo', () => {
  test('Deve exibir mensagem de erro ao tentar logar com senha inválida', async ({ page }) => {
    // 1. Acessar a página inicial
    await page.goto('/');

    // 2. Preencher com e-mail/usuário válido e senha incorreta
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('senha_incorreta');

    // 3. Clicar no botão de login
    await page.getByRole('button', { name: 'Login' }).click();

    // 4. Asserções
    // Verifica se a mensagem de erro esperada é exibida na interface
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );

    // Garante que o usuário permanece na tela de login
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});