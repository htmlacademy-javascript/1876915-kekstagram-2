import { getData } from './fetch.js';
import { createGallery } from './create-gallery.js';
import { initForm } from './form.js';
import { showDownloadErrorMessage } from './messages.js';

getData(createGallery, showDownloadErrorMessage);
initForm();
