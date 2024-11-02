import { Effect, EffectStyle } from './const.js';

const editorElement = document.querySelector('.img-upload__overlay');
const editorEffectList = editorElement.querySelector('.effects__list');
const editorSliderParentElement = editorElement.querySelector('.img-upload__effect-level');
const editorSliderElement = editorSliderParentElement.querySelector('.effect-level__slider');
const editorEffectValueElement = editorElement.querySelector('.effect-level__value');
const editorPreviewElement = editorElement.querySelector('.img-upload__preview > img');

let activeEffectName = Effect.NONE;
let activeEffectUnit = '';

const getFormatToSlider = () => (sliderValue) => parseFloat(sliderValue);
const getFormatFromSlider = (digits = 1) => (sliderValue) => Number.isInteger(sliderValue) ? sliderValue : parseFloat(sliderValue).toFixed(digits);

const getDefaultSliderSettings = () => ({
  range: {
    min: 0,
    max: 0,
  },
  start: 0,
  connect: 'lower',
  format: {
    to: getFormatFromSlider(),
    from: getFormatToSlider(),
  },
});

export const updateSliderSettings = (effect) => {
  editorSliderParentElement.classList.toggle('hidden', effect === Effect.NONE);

  switch (effect) {
    case Effect.CHROME:
      activeEffectUnit = '';
      editorSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;

    case Effect.SEPIA:
      activeEffectUnit = '';
      editorSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;

    case Effect.MARVIN:
      activeEffectUnit = '%';
      editorSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;

    case Effect.PHOBOS:
      activeEffectUnit = 'px';
      editorSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;

    case Effect.HEAT:
      activeEffectUnit = '';
      editorSliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;

    default:
    case Effect.NONE:
      activeEffectUnit = '';
      editorSliderElement.noUiSlider.updateOptions(getDefaultSliderSettings());
      break;
  }
};

export const resetSlider = () => {
  updateSliderSettings(Effect.NONE);
};

export const initSlider = () => {
  noUiSlider.create(editorSliderElement, getDefaultSliderSettings());

  const activeElement = editorElement.querySelector('input[type="radio"]:checked');
  activeEffectName = activeElement?.value || activeEffectName;
  updateSliderSettings(activeEffectName);


  editorEffectList.addEventListener('click', ({ target }) => {
    const parent = target.closest('.effects__radio');
    if (parent) {
      activeEffectName = parent.value;
      activeEffectUnit = '';
      updateSliderSettings(activeEffectName);
    }
  });

  editorSliderElement.noUiSlider.on('update', () => {
    editorEffectValueElement.value = editorSliderElement.noUiSlider.get();
    editorPreviewElement.style.filter = (activeEffectName === Effect.NONE) ? EffectStyle[Effect.NONE] : `${EffectStyle[activeEffectName]}(${editorEffectValueElement.value}${activeEffectUnit})`;
  });
};
