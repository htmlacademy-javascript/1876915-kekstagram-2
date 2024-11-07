import { ButtonMessage, File, Scale } from './const.js';
import { sendData } from './fetch.js';
import { showFileErrorMessage, showUploadErrorMessage, showUploadSuccessMessage } from './api-message.js';
import { initSlider, resetSlider } from './slider.js';
import { disableButton, enableButton, isEscapeKey } from './utils.js';
import { getErrorMessage, validateComment, validateHashTags } from './validation.js';

const formElement = document.querySelector('.img-upload__form');
const submitButtonElement = document.querySelector('.img-upload__submit');
const filePickerElement = formElement.querySelector('.img-upload__input');
const editorElement = formElement.querySelector('.img-upload__overlay');
const editorPreviewElement = editorElement.querySelector('.img-upload__preview > img');

const editorScaleControlElement = editorElement.querySelector('.img-upload__scale > input');
const editorCloseButtonElement = editorElement.querySelector('#upload-cancel');
const editorHashtagElement = editorElement.querySelector('.text__hashtags');
const editorCommentTextElement = editorElement.querySelector('.text__description');

const effectPreviews = editorElement.querySelectorAll('.effects__preview');
const scaleIncButton = editorElement.querySelector('.scale__control--bigger');
const scaleDecButton = editorElement.querySelector('.scale__control--smaller');

let scale = Scale.PICTURE_DEFAULT_SCALE;
let pristine = null;

const checkFileValidity = (file) => File.FILE_TYPES.some((value) => value === file.type);

const setScale = (value) => {
  editorScaleControlElement.value = `${Math.round(value * 100)}%`;
  editorPreviewElement.style.transform = `scale(${value})`;
};

const updatePreviewScale = (isIncreasing = false) => {
  scale += isIncreasing ? Scale.PICTURE_SCALE_STEP : -Scale.PICTURE_SCALE_STEP;
  scale = scale < Scale.PICTURE_MIN_SCALE ? Scale.PICTURE_MIN_SCALE : scale;
  scale = scale > Scale.PICTURE_MAX_SCALE ? Scale.PICTURE_MAX_SCALE : scale;
  setScale(scale);
};

const resetScale = () => {
  scale = Scale.PICTURE_DEFAULT_SCALE;
  setScale(scale);
};

const updateOverlayEffectImages = (url) => {
  editorPreviewElement.src = url;
  effectPreviews.forEach((item) => {
    item.style.backgroundImage = `url(${url})`;
  });
};

const overlayCloseKeyHandler = (evt) => isEscapeKey(evt) ? editorCloseButtonElement.dispatchEvent(new Event('click')) : evt;

const overlayCloseButtonHandler = () => {
  formElement.reset();
  pristine.reset();
  resetSlider();
  resetScale();
  editorElement.classList.add('hidden');
  updateOverlayEffectImages(Scale.DEFAULT_PREVIEW_IMAGE);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', overlayCloseKeyHandler);
  pristine.reset();
};

const openOverlay = () => {
  const file = (filePickerElement.files[0]);
  if (!checkFileValidity(file)) {
    showFileErrorMessage(File.FILE_TYPE_ERROR_MESSAGE);
    return;
  }

  updateOverlayEffectImages(URL.createObjectURL(file));
  editorElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', overlayCloseKeyHandler);
};

const formUploadSuccessHandler = () => {
  showUploadSuccessMessage();
  overlayCloseButtonHandler();
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    disableButton(submitButtonElement, ButtonMessage.SENDING);
    sendData(
      new FormData(formElement),
      formUploadSuccessHandler,
      showUploadErrorMessage,
      () => enableButton(submitButtonElement, ButtonMessage.SEND),
    );
  }
};

export const initForm = () => {
  initSlider();
  pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(editorHashtagElement, validateHashTags, getErrorMessage);
  pristine.addValidator(editorCommentTextElement, validateComment, getErrorMessage);

  formElement.addEventListener('submit', formSubmitHandler);
  filePickerElement.addEventListener('change', openOverlay);
  editorCloseButtonElement.addEventListener('click', overlayCloseButtonHandler);
  editorCommentTextElement.addEventListener('keydown', (evt) => isEscapeKey(evt) ? evt.stopPropagation() : evt);
  editorHashtagElement.addEventListener('keydown', (evt) => isEscapeKey(evt) ? evt.stopPropagation() : evt);
  scaleIncButton.addEventListener('click', () => updatePreviewScale(true));
  scaleDecButton.addEventListener('click', () => updatePreviewScale(false));

  editorHashtagElement.addEventListener('input', ({ target }) => {
    target.value = target.value.toLowerCase().trimStart().replace(/\s{2,}/g, ' ');
  });

  editorCommentTextElement.addEventListener('input', ({ target }) => {
    target.value = target.value.trimStart().replace(/\s{2,}/g, ' ');
  });
};

