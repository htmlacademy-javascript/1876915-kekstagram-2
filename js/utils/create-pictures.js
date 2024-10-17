
export const createPictures = (data = []) => {
  const pictures = document.createDocumentFragment();

  for (const item of data) {
    const templateElement = document.querySelector('#picture')?.content;
    const clonedElement = templateElement.querySelector('.picture')?.cloneNode(true);

    const imgElement = clonedElement.querySelector('.picture__img') || {};
    const commentsElement = clonedElement.querySelector('.picture__comments') || {};
    const likesElement = clonedElement.querySelector('.picture__likes') || {};

    clonedElement.href = item.url;
    clonedElement.dataset.id = item.id;

    imgElement.src = item.url;
    imgElement.alt = item.description;
    commentsElement.textContent = item.comments?.length;
    likesElement.textContent = item.likesQuantity;

    pictures.append(clonedElement);
  }


  return pictures;
};
