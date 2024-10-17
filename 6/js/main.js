import { createPictures } from './utils/create-pictures.js';
import { getRandomPhotoDescriptions } from './utils/data.js';
import { render, RenderPosition } from './utils/render.js';

const pictureContainer = document.querySelector('.pictures');
render(pictureContainer, createPictures(getRandomPhotoDescriptions()), RenderPosition.BEFOREEND);
