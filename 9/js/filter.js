// const DEFAULT_SHOWN_RANDOM_QUANTITY = 10;

const filterContainerElement = document.body.querySelector('.img-filters');

export const initFilters = () => {
  filterContainerElement.classList.remove('img-filters--inactive');
};
