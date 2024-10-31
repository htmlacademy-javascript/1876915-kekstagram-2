import { pluralize } from './utils.js';

const HASHTAG_MAX_QUANTITY = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

let errorMessage = 'Error here';
const hashtagValidationRules = [
  [
    (value) => typeof value === 'string' ? (/^#/i).test(value) : true,
    'Невалидный хэштег! Хэштег начинается с символа "#".',
  ],
  [
    (value) => typeof value === 'string' ? (/^#[a-zа-яё0-9]{1,19}$/i).test(value) : true,
    'Строка после "#" должна состоять из букв и чисел',
  ],
  [
    (value) => typeof value === 'string' ? value.length <= HASHTAG_MAX_LENGTH : true,
    'Длина хэштега не должна превышать 20 символов',
  ],
  [
    (values) => Array.isArray(values) ? values.length <= HASHTAG_MAX_LENGTH : true,
    `Нельзя указать больше ${HASHTAG_MAX_QUANTITY} ${pluralize(HASHTAG_MAX_QUANTITY, ['хэштег', 'хэштега', 'хэштегов'])}`,
  ],
  [
    (values) => Array.isArray(values) ? !values.some((item, index, arr) => arr.includes(item, index + 1)) : true,
    'Хештеги не должны повторяться',
  ],
];

const validate = (values, rules) => values.every((item) => {
  for (const [rule, message] of rules) {
    if (!rule(item)) {
      errorMessage = message;
      return false;
    }
  }

  return true;
});

export const getErrorMessage = () => errorMessage;

export const validateHashTags = (checkedValue = '') => {
  if (!checkedValue.length) {
    return true;
  }

  const values = checkedValue.toLowerCase().replace(/#/gi, ' #').trim().split(/\s+/gi);
  values.push(values);

  return validate(values, hashtagValidationRules);
};

export const validateComment = (checkedValue = '') => {
  if (checkedValue.trim().length > COMMENT_MAX_LENGTH) {
    errorMessage = `Не более ${COMMENT_MAX_LENGTH} символов`;
    return false;
  }

  return true;
};

