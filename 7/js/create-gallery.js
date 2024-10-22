import { KeyCode, MAX_SHOWN_COMMENT_QUANTITY } from './const.js';
import { createComment } from './create-comment.js';
import { createPictures } from './create-pictures.js';
import { render, RenderPosition } from './render.js';

const galleryContainerElement = document.querySelector('.pictures');
const popupElement = document.querySelector('.big-picture');
const popupCloseElement = popupElement.querySelector('.big-picture__cancel');
const popupImgElement = popupElement.querySelector('.big-picture__img > img');
const popupLikesQuantityElement = popupElement.querySelector('.likes-count');
const popupCommentShownElement = popupElement.querySelector('.social__comment-shown-count');
const popupCommentsQuantityElement = popupElement.querySelector('.social__comment-total-count');
const popupDescriptionElement = popupElement.querySelector('.social__caption');
const popupCommentsContainerElement = popupElement.querySelector('.social__comments');
const popupCommentsLoaderElement = popupElement.querySelector('.social__comments-loader');

let shownCommentsQuantity = 0;
let currentPictureId = 0;
const picturesData = new Map();

const popupCloseHandler = (evt, isKeyPressed) => {
  if (isKeyPressed && ((evt.key !== KeyCode.ESC))) {
    return;
  }
  document.body.removeEventListener('keydown', popupCloseHandler);
  popupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  shownCommentsQuantity = 0;

};

popupCloseElement.addEventListener('click', popupCloseHandler);

const popupCommentsLoaderHandler = (comments) => {
  const rest = Math.min((comments.length - shownCommentsQuantity), MAX_SHOWN_COMMENT_QUANTITY);
  for (let i = shownCommentsQuantity; i < (shownCommentsQuantity + rest); i++) {
    render(popupCommentsContainerElement, createComment(comments[i]), RenderPosition.BEFOREEND);
  }
  shownCommentsQuantity += rest;
  popupCommentShownElement.textContent = shownCommentsQuantity;
  popupCommentsLoaderElement.classList.toggle('hidden', comments.length === shownCommentsQuantity);
};

const updatePopup = ({ url, likes, description, comments = [] }) => {
  popupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', (evt) => popupCloseHandler(evt, true));
  popupImgElement.src = url;
  popupImgElement.alt = description;
  popupDescriptionElement.textContent = description;
  popupLikesQuantityElement.textContent = likes;
  popupCommentsQuantityElement.textContent = comments.length;
  popupCommentsContainerElement.innerHTML = '';
  popupCommentsLoaderHandler(comments);
};

galleryContainerElement.addEventListener('click', (evt) => {
  const parent = evt.target.closest('.picture');
  if (parent) {
    evt.preventDefault();
    currentPictureId = +parent.dataset.id;
    updatePopup(picturesData.get(currentPictureId));
  }
});

popupCommentsLoaderElement.addEventListener('click', () => {
  popupCommentsLoaderHandler(picturesData.get(currentPictureId).comments);
});

export const createGallery = (pictures = []) => {
  pictures.forEach((item) => {
    picturesData.set(item.id, item);
  });

  render(galleryContainerElement, createPictures(picturesData.values()), RenderPosition.BEFOREEND);
};
