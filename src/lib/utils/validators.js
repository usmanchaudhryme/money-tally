/**
 * Regular expression matching valid money value input in German i.e. comma is used instead of period
 * Valid values:
 * 1,
 * 1,0
 * 223,12
 * 12,11
 * 0,01
 *
 * Invalid values:
 * 001      | Leading zeroes
 * 01       | Leading zero not follwed by comma
 * 1,00,00  | Multiple commas
 * 1,000    | More than 2 characters after comma
 * 1abc     | Any kind of alphabetical characters
 */
export const isValidMoneyValue = (/** @type {string} */ value) => {
	const allowedCharactersRegExp =
		/^(?!0\d)(?!.*\,.*\,)(?:\d+|\d+\,\d{0,2})[\b\t\x08\x7f\u2190\u2192\u21e4\u21e5]*$/;
	return allowedCharactersRegExp.test(value);
};
