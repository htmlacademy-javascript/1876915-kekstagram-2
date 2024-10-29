import { RenderPosition } from './render.js';

export const createComment = ({ avatar, name, message }) => {
  const element = document.createElement('div');
  element.insertAdjacentHTML(RenderPosition.BEFOREEND,
    `<li class="social__comment">
      <img class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
      <p class="social__text">${message}</p>
    </li>`);
  return element.firstElementChild;
};
