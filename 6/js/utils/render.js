export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const render = (container, fragment, place) => {

  if (!(container instanceof Element)) {
    throw new Error('Container aren\'t instance of Element');
  }

  if (!(fragment instanceof DocumentFragment)) {
    throw new Error('fragment aren\'t instance of DocumentFragment');
  }

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      container.before(fragment);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(fragment);
      break;
    case RenderPosition.AFTEREND:
      container.after(fragment);
      break;

    default:
    case RenderPosition.BEFOREEND:
      container.append(fragment);
      break;
  }
};
