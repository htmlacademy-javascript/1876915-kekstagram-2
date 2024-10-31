/** @module js/utils */

import { KeyCodes } from './const.js';

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

/**
 * Get random positive integer from specified range
 * @param {number} lowerValue - lower border of the range
 * @param {number} upperValue - upper border of the range
 * @return {number}
*/
export const getRandomPositiveInteger = (lowerValue = 0, upperValue = 0) => {
  const lower = Math.ceil(Math.min(Math.abs(lowerValue), Math.abs(upperValue)));
  const upper = Math.floor(Math.max(Math.abs(lowerValue), Math.abs(upperValue)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

/**
 * Create an array filled with random unique integers from specified range
 * @param {number} lowerBorder - lower border of the range
 * @param {number} upperBorder - upper border of the range
 * @return {Array}
*/
export const getUniqueUIntArray = (lowerBorder = 0, upperBorder = 0) => {
  const arrayTotalNumbers = [];
  const arrayRandomNumbers = [];
  let lower = Math.ceil(Math.min(Math.abs(lowerBorder), Math.abs(upperBorder)));
  const upper = Math.floor(Math.max(Math.abs(lowerBorder), Math.abs(upperBorder)));
  let totalNumbers = Math.abs(upper - lower) + 1;
  while (totalNumbers--) {
    arrayTotalNumbers.push(totalNumbers + lower);
  }
  while (arrayTotalNumbers.length) {
    lower = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
    arrayRandomNumbers.push(arrayTotalNumbers[lower]);
    arrayTotalNumbers.splice(lower, 1);
  }
  return arrayRandomNumbers;
};


/**
 * Get an random part of an array
 * @param {Array} inputArray
 * @return {Array}
*/
export const getRandomArrayPart = function (array, length = 0) {
  if (Array.isArray(array) && (!isNaN(parseInt(length, 10)))) {
    const index = getRandomPositiveInteger(0, array.length - 1);
    const maxLength = index + length;

    if (length > array.length) {
      return array;
    }

    if (maxLength > array.length) {
      return array.slice(index).concat(array.slice(0, Math.abs(array.length - maxLength)));
    }

    return array.slice(index, index + length);
  }

  return [];
};

export const isEscapeKey = (evt) => (evt.key === KeyCodes.ESC);

export const pluralize = (number, textForms) => textForms[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

export const disableButton = (button, text) => {
  button.disabled = true;
  button.textContent = text;
};

export const enableButton = (button, text) => {
  button.disabled = false;
  button.textContent = text;
};
