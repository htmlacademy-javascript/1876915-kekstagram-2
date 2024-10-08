import { getRandomPhotoDescription } from './utils/data.js';
import { isStringLengthValid, isPalindromeString, getNumbersFromString } from './utils/utils.js';

// eslint-disable-next-line
console.log(isStringLengthValid('string', undefined));  // false

// eslint-disable-next-line
console.log(isPalindromeString('А роза упала на лапу Азора'));  // true

// eslint-disable-next-line
console.log(getNumbersFromString('as32kf1sdl3426 \n sdd22'));  // 321342622
// eslint-disable-next-line
console.log(getNumbersFromString('-234.5')); // 2345
// eslint-disable-next-line
console.log(getNumbersFromString({})); // NaN
// eslint-disable-next-line
console.log(getNumbersFromString([1, 2, 3, 4])); // 1234

// eslint-disable-next-line
console.log(getRandomPhotoDescription());
