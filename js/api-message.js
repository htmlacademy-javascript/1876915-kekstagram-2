import { render, RenderPosition } from './render.js';
import { isEscapeKey } from './utils.js';

const MESSAGE_CLOSE_TIME = 500;
const uploadSuccessTemplateElement = document.querySelector('#success')?.content.querySelector('.success');
const uploadErrorTemplateElement = document.querySelector('#error')?.content.querySelector('.error');
const downloadErrorTemplateElement = document.querySelector('#data-error')?.content.querySelector('.data-error');

const getMessageCloseHandler = (messageElement, buttonElement) => {
  const messageCloseHandler = (evt) => {
    if (evt.target === messageElement || evt.target === buttonElement || isEscapeKey(evt)) {
      evt.stopPropagation();
      document.body.removeEventListener('click', messageCloseHandler);
      document.body.removeEventListener('keydown', messageCloseHandler);
      messageElement.remove();
    }
  };
  return messageCloseHandler;
};

const createMessage = (template, message) => {
  if (!template) {
    return;
  }
  const fragment = document.createDocumentFragment();
  const clonedElement = template.cloneNode(true);
  const buttonElement = clonedElement.querySelector('button');

  if (document.querySelector(`.${template.classList[0]}`)) {
    return;
  }

  if (message) {
    const title = clonedElement.querySelector('h2');
    title.textContent = message;
  }

  if (buttonElement) {
    const evtHandler = getMessageCloseHandler(clonedElement, buttonElement);
    document.body.addEventListener('click', evtHandler);
    document.body.addEventListener('keydown', evtHandler);
  } else {
    setTimeout(() => clonedElement.remove(), MESSAGE_CLOSE_TIME);
  }

  fragment.append(clonedElement);
  render(document.body, fragment, RenderPosition.BEFOREEND);
};

export const showUploadSuccessMessage = () => createMessage(uploadSuccessTemplateElement);

export const showUploadErrorMessage = () => createMessage(uploadErrorTemplateElement);

export const showDownloadErrorMessage = (message) => createMessage(downloadErrorTemplateElement, message);

export const showFileErrorMessage = (message) => createMessage(downloadErrorTemplateElement, message);
