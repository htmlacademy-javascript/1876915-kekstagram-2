import { getData } from './fetch.js';
import { createGallery } from './gallery.js';
import { initForm } from './form.js';
import { showDownloadErrorMessage } from './api-message.js';
import { getRandomPhotoData } from './data.js';
import { Messages } from './const.js';

getData(createGallery, () => {
  showDownloadErrorMessage(Messages.DOWNLOAD_ERROR_MESSAGE);
  createGallery(getRandomPhotoData());
});
initForm();
