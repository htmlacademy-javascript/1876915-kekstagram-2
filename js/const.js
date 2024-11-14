const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

export const EndPoint = {
  SEND: `${BASE_URL}`,
  GET: `${BASE_URL}/data`,
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
};

export const KeyCode = {
  ESC: 'Escape',
  ENTER: 'Enter',
};

export const Effect = {
  CHROME: 'chrome',
  HEAT: 'heat',
  NONE: 'none',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  SEPIA: 'sepia',
};

export const EffectStyle = {
  [Effect.CHROME]: 'grayscale',
  [Effect.HEAT]: 'brightness',
  [Effect.NONE]: 'none',
  [Effect.MARVIN]: 'invert',
  [Effect.PHOBOS]: 'blur',
  [Effect.SEPIA]: 'sepia',
};

export const ButtonMessage = {
  SEND: 'Опубликовать',
  SENDING: 'Отправляем...',
};

export const PictureFilter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

export const Gallery = {
  RANDOM_TYPE_PICTURE_QUANTITY: 10,
  MAX_SHOWN_COMMENT_QUANTITY: 5,
};

export const Messages = {
  FILE_TYPES: ['image/jpg', 'image/jpeg', 'image/png'],
  FILE_TYPE_ERROR_MESSAGE: 'Не верный формат файла',
  DOWNLOAD_ERROR_MESSAGE: 'Не удалось загрузить данные. Работа с fake data',
};

export const Filter = {
  ACTIVE_FILTER_CLASS: 'img-filters__button--active',
  INACTIVE_FILTER_LIST: 'img-filters--inactive',
  DEBOUNCE_TIME: 100,
};

export const Scale = {
  DEFAULT_PREVIEW_IMAGE: 'img/upload-default-image.jpg',
  PICTURE_SCALE_STEP: 0.25,
  PICTURE_DEFAULT_SCALE: 1.0,
  PICTURE_MAX_SCALE: 1.0,
  PICTURE_MIN_SCALE: 0.25,
};

export const Validity = {
  HASHTAG_MAX_QUANTITY: 5,
  HASHTAG_MAX_LENGTH: 20,
  COMMENT_MAX_LENGTH: 140,
};
