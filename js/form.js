import { sendData } from './fetch.js';
import { initSlider } from './slider.js';
import { isEscapeKey } from './utils.js';
import { getErrorMessage, validateComment, validateHashTags } from './validation.js';

const DEFAULT_PREVIEW_IMAGE = 'img/upload-default-image.jpg';
const PICTURE_SCALE_STEP = 0.25;
const PICTURE_DEFAULT_SCALE = 1.0;
const PICTURE_MAX_SCALE = 1.0;
const PICTURE_MIN_SCALE = 0.25;

const formElement = document.querySelector('.img-upload__form');
const picturePickerElement = formElement.querySelector('.img-upload__input');
const editorElement = formElement.querySelector('.img-upload__overlay');
const editorPreviewElement = editorElement.querySelector('.img-upload__preview > img');
const editorScaleControlElement = editorElement.querySelector('.img-upload__scale > input');
const editorCloseButtonElement = editorElement.querySelector('#upload-cancel');
const editorHashtagElement = editorElement.querySelector('.text__hashtags');
const editorCommentElement = editorElement.querySelector('.text__description');

const scaleIncButton = editorElement.querySelector('.scale__control--bigger');
const scaleDecButton = editorElement.querySelector('.scale__control--smaller');

let scale = PICTURE_DEFAULT_SCALE;
let validate, addValidator;

editorHashtagElement.addEventListener('input', ({ target }) => {
  target.value = target.value.toLowerCase().trimStart().replace(/\s{2,}/g, ' ');
});

editorCommentElement.addEventListener('input', ({ target }) => {
  target.value = target.value.trim().replace(/\s{2,}/g, ' ');
});

const updatePreviewScale = (isIncreasing = false) => {
  scale += isIncreasing ? PICTURE_SCALE_STEP : -PICTURE_SCALE_STEP;
  scale = scale < PICTURE_MIN_SCALE ? PICTURE_MIN_SCALE : scale;
  scale = scale > PICTURE_MAX_SCALE ? PICTURE_MAX_SCALE : scale;
  editorScaleControlElement.value = `${Math.round(scale * 100)}%`;
  editorPreviewElement.style.transform = `scale(${scale})`;
};

const overlayCloseKeyHandler = (evt) => isEscapeKey(evt) ? editorCloseButtonElement.dispatchEvent(new Event('click')) : evt;

const overlayCloseButtonHandler = () => {
  editorElement.classList.add('hidden');
  editorPreviewElement.src = DEFAULT_PREVIEW_IMAGE;
  picturePickerElement.value = '';
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', overlayCloseKeyHandler);
};

const openOverlay = () => {
  editorElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  editorPreviewElement.src = URL.createObjectURL(picturePickerElement.files[0]);

  document.body.addEventListener('keydown', overlayCloseKeyHandler);
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (validate(formElement)) {
    sendData(() => { }, () => { }, formElement);
    formElement.reset();
  }
});

export const initForm = () => {
  initSlider();
  ({ validate, addValidator } = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error',
  }));

  addValidator(editorHashtagElement, validateHashTags, getErrorMessage);
  addValidator(editorCommentElement, validateComment, getErrorMessage);

  picturePickerElement.addEventListener('change', openOverlay);
  editorCloseButtonElement.addEventListener('click', overlayCloseButtonHandler);
  editorCommentElement.addEventListener('keydown', (evt) => isEscapeKey(evt) ? evt.stopPropagation() : evt);
  editorHashtagElement.addEventListener('keydown', (evt) => isEscapeKey(evt) ? evt.stopPropagation() : evt);
  scaleIncButton.addEventListener('click', () => updatePreviewScale(true));
  scaleDecButton.addEventListener('click', () => updatePreviewScale(false));
};

