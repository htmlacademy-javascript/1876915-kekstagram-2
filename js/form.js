import { ButtonMessages } from './const.js';
import { sendData } from './fetch.js';
import { showUploadErrorMessage, showUploadSuccessMessage } from './messages.js';
import { initSlider, resetSlider } from './slider.js';
import { disableButton, enableButton, isEscapeKey } from './utils.js';
import { getErrorMessage, validateComment, validateHashTags } from './validation.js';

const DEFAULT_PREVIEW_IMAGE = 'img/upload-default-image.jpg';
const PICTURE_SCALE_STEP = 0.25;
const PICTURE_DEFAULT_SCALE = 1.0;
const PICTURE_MAX_SCALE = 1.0;
const PICTURE_MIN_SCALE = 0.25;

const formElement = document.querySelector('.img-upload__form');
const submitButtonElement = document.querySelector('.img-upload__submit');
const filePickerElement = formElement.querySelector('.img-upload__input');
const editorElement = formElement.querySelector('.img-upload__overlay');
const editorPreviewElement = editorElement.querySelector('.img-upload__preview > img');
const editorScaleControlElement = editorElement.querySelector('.img-upload__scale > input');
const editorCloseButtonElement = editorElement.querySelector('#upload-cancel');
const editorHashtagElement = editorElement.querySelector('.text__hashtags');
const editorCommentElement = editorElement.querySelector('.text__description');

const scaleIncButton = editorElement.querySelector('.scale__control--bigger');
const scaleDecButton = editorElement.querySelector('.scale__control--smaller');

let scale = PICTURE_DEFAULT_SCALE;
let validate, addValidator, reset;

editorHashtagElement.addEventListener('input', ({ target }) => {
  target.value = target.value.toLowerCase().trimStart().replace(/\s{2,}/g, ' ');
});

editorCommentElement.addEventListener('input', ({ target }) => {
  target.value = target.value.trim().replace(/\s{2,}/g, ' ');
});

const setScale = (value) => {
  editorScaleControlElement.value = `${Math.round(value * 100)}%`;
  editorPreviewElement.style.transform = `scale(${value})`;
};

const updatePreviewScale = (isIncreasing = false) => {
  scale += isIncreasing ? PICTURE_SCALE_STEP : -PICTURE_SCALE_STEP;
  scale = scale < PICTURE_MIN_SCALE ? PICTURE_MIN_SCALE : scale;
  scale = scale > PICTURE_MAX_SCALE ? PICTURE_MAX_SCALE : scale;
  setScale(scale);
};

const overlayCloseKeyHandler = (evt) => isEscapeKey(evt) ? editorCloseButtonElement.dispatchEvent(new Event('click')) : evt;

const overlayCloseButtonHandler = () => {
  formElement.reset();
  reset();
  setScale(PICTURE_DEFAULT_SCALE);
  resetSlider();
  editorElement.classList.add('hidden');
  editorPreviewElement.src = DEFAULT_PREVIEW_IMAGE;
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', overlayCloseKeyHandler);
};

const openOverlay = () => {
  editorElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  editorPreviewElement.src = URL.createObjectURL(filePickerElement.files[0]);

  document.addEventListener('keydown', overlayCloseKeyHandler);
};

const formUploadSuccessHandler = () => {
  showUploadSuccessMessage();
  overlayCloseButtonHandler();
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (validate()) {
    disableButton(submitButtonElement, ButtonMessages.SENDING);
    sendData(
      new FormData(formElement),
      formUploadSuccessHandler,
      showUploadErrorMessage,
      () => enableButton(submitButtonElement, ButtonMessages.SEND),
    );
  }
});

export const initForm = () => {
  initSlider();
  ({ validate, addValidator, reset } = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error',
  }));

  addValidator(editorHashtagElement, validateHashTags, getErrorMessage);
  addValidator(editorCommentElement, validateComment, getErrorMessage);

  filePickerElement.addEventListener('change', openOverlay);
  editorCloseButtonElement.addEventListener('click', overlayCloseButtonHandler);
  editorCommentElement.addEventListener('keydown', (evt) => isEscapeKey(evt) ? evt.stopPropagation() : evt);
  editorHashtagElement.addEventListener('keydown', (evt) => isEscapeKey(evt) ? evt.stopPropagation() : evt);
  scaleIncButton.addEventListener('click', () => updatePreviewScale(true));
  scaleDecButton.addEventListener('click', () => updatePreviewScale(false));
};

