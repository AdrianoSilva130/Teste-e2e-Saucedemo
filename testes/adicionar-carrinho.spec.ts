import { test, expect } from '@playwright/test';

test.describe('Fluxo do Carrinho de Compras - SauceDemo', () => {
  test('Deve exibir catálogo, adicionar o produto "Sauce Labs Backpack" e validar 1 item no carrinho', async ({ page }) => {
    // 1. Acessar a página inicial e realizar login
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. Validação 1: Exibição do catálogo após o login
    await expect(page).toHaveURL(/.*inventory.html/);
    const title = page.locator('.title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Products');

    // Valida que o produto específico "Sauce Labs Backpack" está visível no catálogo
    const itemCatalogo = page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' });
    await expect(itemCatalogo).toBeVisible();

    // 3. Adicionar o produto ao carrinho
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 4. Validação 2: Quantidade igual a 1 no badge do ícone do carrinho
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');

    // 5. Navegar até a página do carrinho
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/.*cart.html/);

    // 6. Validação 3: Produto correto no carrinho
    const itemCarrinho = page.locator('[data-test="inventory-item-name"]');
    await expect(itemCarrinho).toBeVisible();
    await expect(itemCarrinho).toHaveText('Sauce Labs Backpack');

    // Valida também que o botão de "Remove" está presente para o produto correto
    const botãoRemover = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await expect(botãoRemover).toBeVisible();
  });
});