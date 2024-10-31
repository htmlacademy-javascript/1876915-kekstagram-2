import { Filters, PictureFilters } from './const.js';
import { updateGallery } from './gallery.js';

const filterContainerElement = document.body.querySelector('.img-filters');
const firstChild = filterContainerElement.querySelector('.img-filters__button');

let currentFilter = PictureFilters.DEFAULT;
let activeElement = null;

const filterButtonHandler = ({ target }) => {
  if (target.tagName === 'BUTTON' && !target.classList.contains(Filters.ACTIVE_FILTER_CLASS)) {
    currentFilter = target.id;
    activeElement.classList.remove(Filters.ACTIVE_FILTER_CLASS);
    target.classList.add(Filters.ACTIVE_FILTER_CLASS);
    activeElement = target;
    updateGallery(currentFilter);
  }
};

export const getCurrentFilter = () => currentFilter;

export const initFilters = () => {
  activeElement = filterContainerElement.querySelector(Filters.ACTIVE_FILTER_CLASS);
  if (!activeElement) {
    firstChild.classList.add(Filters.ACTIVE_FILTER_CLASS);
    activeElement = firstChild;
  }
  filterContainerElement.classList.remove('img-filters--inactive');
  filterContainerElement.addEventListener('click', filterButtonHandler);
};
