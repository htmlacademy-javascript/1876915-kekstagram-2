import { Effects, EffectStyles } from './const.js';

const editorElement = document.querySelector('.img-upload__overlay');
const editorEffectList = editorElement.querySelector('.effects__list');
const editorSliderParentElement = editorElement.querySelector('.img-upload__effect-level');
const editorSliderElement = editorSliderParentElement.querySelector('.effect-level__slider');
const editorEffectValueElement = editorElement.querySelector('.effect-level__value');
const editorPreviewElement = editorElement.querySelector('.img-upload__preview > img');

let activeEffectName = Effects.NONE;
let activeEffectUnit = '';

const getFormatToSlider = () => (sliderValue) => parseFloat(sliderValue);
const getFormatFromSlider = (digits = 1) => (sliderValue) => parseFloat(sliderValue).toFixed(digits);
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
  editorSliderParentElement.classList.toggle('hidden', effect === Effects.NONE);

  switch (effect) {
    case Effects.CHROME:
      editorSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1,
      });
      break;

    case Effects.SEPIA:
      editorSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1,
      });
      break;

    case Effects.MARVIN:
      editorSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 0,
        step: 1,
      });
      activeEffectUnit = '%';

      break;

    case Effects.PHOBOS:
      editorSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 0,
        step: 0.1,
      });
      activeEffectUnit = 'px';
      break;

    case Effects.HEAT:
      editorSliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 1,
        step: 0.1,
      });
      break;

    default:
    case Effects.NONE:
      editorSliderElement.noUiSlider.updateOptions(getDefaultSliderSettings());
      break;
  }
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
    editorPreviewElement.style.filter = (activeEffectName === Effects.NONE) ? EffectStyles[Effects.NONE] :
      `${EffectStyles[activeEffectName]}(${editorEffectValueElement.value}${activeEffectUnit})`;
  });
};
