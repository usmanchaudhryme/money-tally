import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'SvelteKit Money Calculator' })).toBeVisible();
	await expect(page.locator('.container')).toHaveText('Calculator Goes Here');
});
