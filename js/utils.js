import { KeyCode } from './const.js';

export const getRandomMixedArray = (array = [], length = 0) => {
  const result = [];
  while (array.length && length--) {
    const item = Math.round(Math.random() * (array.length - 1));
    result.push(array[item]);
    array.splice(item, 1);
  }

  return result;
};

export const isEscapeKey = (evt) => (evt.key === KeyCode.ESC);

export const pluralize = (number, textForms) => textForms[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

export const disableButton = (button, text) => {
  button.disabled = true;
  button.textContent = text;
};

export const enableButton = (button, text) => {
  button.disabled = false;
  button.textContent = text;
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
