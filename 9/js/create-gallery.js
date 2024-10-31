import { MAX_SHOWN_COMMENT_QUANTITY } from './const.js';
import { createComment } from './create-comment.js';
import { createPictures } from './create-pictures.js';
import { initFilters } from './filter.js';
import { render, RenderPosition } from './render.js';
import { isEscapeKey } from './utils.js';

const galleryElement = document.querySelector('.pictures');
const popupElement = document.querySelector('.big-picture');
const popupCloseButtonElement = popupElement.querySelector('.big-picture__cancel');
const popupImgElement = popupElement.querySelector('.big-picture__img > img');
const popupLikesQuantityElement = popupElement.querySelector('.likes-count');

const popupCommentContainerElement = popupElement.querySelector('.social__comment-count');
const popupCommentShownElement = popupCommentContainerElement.querySelector('.social__comment-shown-count');
const popupCommentFromElement = popupCommentContainerElement.querySelector('.social__comment-from');
const popupCommentsQuantityElement = popupCommentContainerElement.querySelector('.social__comment-total-count');

const popupDescriptionElement = popupElement.querySelector('.social__caption');
const popupCommentsContainerElement = popupElement.querySelector('.social__comments');
const popupCommentsLoaderElement = popupElement.querySelector('.social__comments-loader');

let shownCommentsQuantity = 0;
let currentPictureId = 0;
const picturesData = new Map();

const popupCommentsLoaderHandler = (comments) => {
  const rest = Math.min((comments.length - shownCommentsQuantity), MAX_SHOWN_COMMENT_QUANTITY);
  for (let i = shownCommentsQuantity; i < (shownCommentsQuantity + rest); i++) {
    render(popupCommentsContainerElement, createComment(comments[i]), RenderPosition.BEFOREEND);
  }
  shownCommentsQuantity += rest;
  popupCommentShownElement.textContent = shownCommentsQuantity || '';
  popupCommentFromElement.classList.toggle('hidden', !comments.length);
  popupCommentsLoaderElement.classList.toggle('hidden', comments.length === shownCommentsQuantity);
};

const popupCloseKeyHandler = (evt) => isEscapeKey(evt) ? popupCloseButtonElement.dispatchEvent(new Event('click')) : evt;

const popupCloseButtonHandler = () => {
  shownCommentsQuantity = 0;
  popupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', popupCloseKeyHandler);
};

const showPopup = ({ url, likes, description, comments = [] }) => {
  popupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', popupCloseKeyHandler);
  popupImgElement.src = url;
  popupImgElement.alt = description;
  popupDescriptionElement.textContent = description;
  popupLikesQuantityElement.textContent = likes;
  popupCommentsQuantityElement.textContent = comments.length;
  popupCommentsContainerElement.innerHTML = '';
  popupCommentsLoaderHandler(comments);
};

galleryElement.addEventListener('click', (evt) => {
  const parent = evt.target.closest('.picture');
  if (parent) {
    evt.preventDefault();
    currentPictureId = +parent.dataset.id;
    showPopup(picturesData.get(currentPictureId));
  }
});

popupCloseButtonElement.addEventListener('click', popupCloseButtonHandler);

popupCommentsLoaderElement.addEventListener('click', () => {
  popupCommentsLoaderHandler(picturesData.get(currentPictureId).comments);
});

export const createGallery = (pictures = []) => {
  initFilters();
  pictures.forEach((item) => {
    picturesData.set(item.id, item);
  });

  render(galleryElement, createPictures(picturesData.values()), RenderPosition.BEFOREEND);
};
