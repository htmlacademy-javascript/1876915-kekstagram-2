const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
export const MAX_SHOWN_COMMENT_QUANTITY = 5;

export const EndPoints = {
  SEND: `${BASE_URL}`,
  GET: `${BASE_URL}/data`,
};

export const Methods = {
  GET: 'GET',
  POST: 'POST',
};

export const KeyCodes = {
  ESC: 'Escape',
  ENTER: 'Enter',
};

export const Effects = {
  CHROME: 'chrome',
  HEAT: 'heat',
  NONE: 'none',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  SEPIA: 'sepia',
};

export const EffectStyles = {
  [Effects.CHROME]: 'grayscale',
  [Effects.HEAT]: 'brightness',
  [Effects.NONE]: 'none',
  [Effects.MARVIN]: 'invert',
  [Effects.PHOBOS]: 'blur',
  [Effects.SEPIA]: 'sepia',
};

export const ButtonMessages = {
  SEND: 'Опубликовать',
  SENDING: 'Отправляем...',
};
