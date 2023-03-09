import { expect, test } from '@playwright/test';

test('index page displays appropraite elements', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'SvelteKit Money Calculator' })).toBeVisible();
	const inputElements = await page.$$('input');
	expect(inputElements.length).toBe(2);
	const enabledInput = await page.$('input:not([disabled])');
	await enabledInput?.fill('100');
	expect((await page.$$('input')).length).toBe(3);
	await expect(page.locator('.container')).toHaveText('SUM:');
});
