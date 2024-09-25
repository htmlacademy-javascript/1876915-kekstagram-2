/** @module js/functions */

/**
* Check the length of the string
* @param {string} string - string literal
* @param {number} limit - allowed length
* @return {boolean}
*/
export const isStringLengthValid = (string = '', limit) => string.length <= (+limit ? limit : -1);


/**
 * Check if the string is palindrome
 * @param {string} string - string literal
 * @return {boolean}
*/
export const isPalindromeString = (string) => {
  const normalized = string.replace(/\s/g, '').toLowerCase();

  return normalized === [...normalized].reverse().join('');
};


/**
 * Extracts the numbers contained in the string
 * @param {string} string - string literal
 * @return {number | NaN} - concatenated numbers
*/
export const getNumbersFromString = (string = '') => parseInt(string.toString().replace(/\D+/g, ''), 10);
