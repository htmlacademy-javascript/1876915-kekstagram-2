import { Filter, PictureFilter } from './const.js';
import { getData } from './fetch.js';
import { updateGallery } from './gallery.js';
import { showDownloadErrorMessage } from './api-message.js';
import { debounce } from './utils.js';

const filterContainerElement = document.body.querySelector('.img-filters');
const firstChild = filterContainerElement.querySelector('.img-filters__button');

let currentFilter = PictureFilter.DEFAULT;
let activeElement = null;

const filterButtonHandler = debounce(({ target }) => {
  if (target.tagName === 'BUTTON' && !target.classList.contains(Filter.ACTIVE_FILTER_CLASS)) {
    currentFilter = target.id;
    activeElement.classList.remove(Filter.ACTIVE_FILTER_CLASS);
    target.classList.add(Filter.ACTIVE_FILTER_CLASS);
    activeElement = target;
    getData((data) => updateGallery(data, currentFilter), showDownloadErrorMessage);
  }
}, Filter.DEBOUNCE_TIME);

export const getCurrentFilter = () => currentFilter;

export const initFilters = () => {
  activeElement = filterContainerElement.querySelector(Filter.ACTIVE_FILTER_CLASS);
  if (!activeElement) {
    firstChild.classList.add(Filter.ACTIVE_FILTER_CLASS);
    activeElement = firstChild;
  }
  filterContainerElement.classList.remove(Filter.INACTIVE_FILTER_LIST);
  filterContainerElement.addEventListener('click', filterButtonHandler);
};
