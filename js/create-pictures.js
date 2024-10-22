
const templateElement = document.querySelector('#picture').content.querySelector('.picture');

export const createPictures = (data = []) => {
  const pictures = document.createDocumentFragment();

  for (const item of data) {
    const clonedElement = templateElement.cloneNode(true);
    const imgElement = clonedElement.querySelector('.picture__img') || {};
    const commentsElement = clonedElement.querySelector('.picture__comments') || {};
    const likesElement = clonedElement.querySelector('.picture__likes') || {};

    clonedElement.dataset.id = item.id;

    imgElement.src = item.url;
    imgElement.alt = item.description;
    commentsElement.textContent = item.comments?.length;
    likesElement.textContent = item.likes;

    pictures.append(clonedElement);
  }


  return pictures;
};
