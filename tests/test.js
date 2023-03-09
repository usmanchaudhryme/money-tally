import { expect, test } from '@playwright/test';

test('index page displays heading', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'SvelteKit Money Calculator' })).toBeVisible();
});

test('adding value to last input adds new dynamic input field', async ({ page }) => {
	await page.goto('/');
	const inputs = await page.$$('input');
	expect(inputs).toHaveLength(2);

	const firstInput = await page.$('#input_0');
	if (firstInput) {
		await firstInput.type('1,00');
	}

	expect(await page.$$('input')).toHaveLength(3);
});

test('should display sum of all the input values', async ({ page }) => {
	await page.goto('/');
	const firstInput = await page.$('#input_0');
	if (firstInput) {
		await firstInput.type('1,00');
	}
	const secondInput = await page.$('#input_1');
	if (secondInput) {
		await secondInput.type('1,20');
	}

	const sumInput = await page.$('#sum');
	if (sumInput) {
		expect(await sumInput.inputValue()).toBe('2,2');
	}
	expect(await page.$$('input')).toHaveLength(4);
});

test('should display notification message if we try to type in wrong input', async ({ page }) => {
	await page.goto('/');
	const firstInput = await page.$('#input_0');
	if (firstInput) {
		await firstInput.type('1,,00');
	}
	const secondInput = await page.$('#input_1');
	if (secondInput) {
		await secondInput.type('002,10');
	}

	const sumInput = await page.$('#sum');
	if (sumInput) {
		expect(await sumInput.inputValue()).toBe('1,1');
	}

	const pageText = await page.textContent('.info-message');
	if (pageText) {
		expect(pageText.includes('Value Suggestion')).toBe(true);
	}
});
