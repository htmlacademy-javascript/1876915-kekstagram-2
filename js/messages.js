import { render, RenderPosition } from './render.js';

const MESSAGE_CLOSE_TIME = 5000;
const uploadSuccessTemplateElement = document.querySelector('#success')?.content.querySelector('.success');
const uploadErrorTemplateElement = document.querySelector('#error')?.content.querySelector('.error');
const downloadErrorTemplateElement = document.querySelector('#data-error')?.content.querySelector('.data-error');

export const showDownloadErrorMessage = (error) => {
  if (!downloadErrorTemplateElement) {
    return;
  }

  const fragment = document.createDocumentFragment();
  const clonedElement = downloadErrorTemplateElement.cloneNode(true);
  const errorElement = document.createElement('p');
  errorElement.textContent = error;
  clonedElement.append(errorElement);
  fragment.append(clonedElement);
  render(document.body, fragment, RenderPosition.BEFOREEND);
  setTimeout(() => clonedElement.remove(), MESSAGE_CLOSE_TIME);
};

export const showUploadSuccessMessage = () => {
  if (!uploadSuccessTemplateElement) {
    return;
  }
  const fragment = document.createDocumentFragment();
  const clonedElement = uploadSuccessTemplateElement.cloneNode(true);
  const buttonElement = clonedElement.querySelector('.success__button');

  const buttonClickHandler = () => {
    clonedElement.removeEventListener('click', buttonClickHandler);
    clonedElement.remove();
  };

  buttonElement.addEventListener('click', buttonClickHandler);
  fragment.append(clonedElement);
  render(document.body, fragment, RenderPosition.BEFOREEND);
};

export const showUploadErrorMessage = () => {
  if (!uploadErrorTemplateElement) {
    return;
  }
  const fragment = document.createDocumentFragment();
  const clonedElement = uploadErrorTemplateElement.cloneNode(true);
  const buttonElement = clonedElement.querySelector('.error__button');

  const buttonClickHandler = () => {
    clonedElement.removeEventListener('click', buttonClickHandler);
    clonedElement.remove();
  };

  buttonElement.addEventListener('click', buttonClickHandler);
  fragment.append(clonedElement);
  render(document.body, fragment, RenderPosition.BEFOREEND);
};

