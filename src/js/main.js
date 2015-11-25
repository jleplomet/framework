
import "scss/main";

import {
  initCore,
  bootCore,
  addConstants,
  updateSettings,
  renderDom
} from 'js/lib/core';

import routes from './routes';

// initialize lib/core and set which history type to create the store with
// default is createHashHistory
initCore();

// add constants for custom reducer actions or notifications
// addConstants({

// });

// update settings
updateSettings({
  cdnurl: '',
  languageFile: true,
  languageCode: 'en_us',
  staticComponents: [

  ],
  routes
});

bootCore().then(renderDom);
