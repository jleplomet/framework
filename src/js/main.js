
import "scss/main";

import {bootCore, addConstants, updateSettings, renderDom} from 'js/lib/core';
import routes from './routes';

// add constants for custom reducer actions or notifications
// addConstants({

// });

// update settings
updateSettings({
  cdnurl: '',
  languageFile: true,
  languageCode: 'en_us',
  routes
});

bootCore().then(renderDom);
