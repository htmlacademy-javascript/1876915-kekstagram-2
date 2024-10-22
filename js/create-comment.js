import { RenderPosition } from './render.js';

export const createComment = ({ avatar, message }) => {
  const element = document.createElement('div');
  element.insertAdjacentHTML(RenderPosition.BEFOREEND,
    `<li class="social__comment">
      <img class="social__picture"
        src="${avatar}"
        alt="Аватар комментатора фотографии"
        width="35" height="35">
      <p class="social__text">${message}</p>
    </li>`);
  return element.firstElementChild;
};
