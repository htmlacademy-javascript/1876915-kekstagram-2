import { getData } from './fetch.js';
import { createGallery } from './gallery.js';
import { initForm } from './form.js';
import { showDownloadErrorMessage } from './api-message.js';

getData(createGallery, showDownloadErrorMessage);
initForm();
