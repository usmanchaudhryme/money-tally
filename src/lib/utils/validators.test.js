import { describe, it, expect } from 'vitest';
import { isValidMoneyValue } from './validators';
describe('sum test', () => {
	it('returns false on invalid inputs', () => {
		expect(isValidMoneyValue('1,0,1')).toBe(false);
		expect(isValidMoneyValue('001')).toBe(false);
		expect(isValidMoneyValue('10.11')).toBe(false);
		expect(isValidMoneyValue('abc')).toBe(false);
		expect(isValidMoneyValue('1abc')).toBe(false);
		expect(isValidMoneyValue('1*')).toBe(false);
	});

	it('returns true on valid inputs', () => {
		expect(isValidMoneyValue('1,0')).toBe(true);
		expect(isValidMoneyValue('223,12')).toBe(true);
		expect(isValidMoneyValue('12,11')).toBe(true);
		expect(isValidMoneyValue('0,01')).toBe(true);
	});
});
