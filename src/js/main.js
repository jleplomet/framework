
import "scss/main";

import {
  BROWSER_HISTORY,
  initCore,
  bootCore,
  addConstants,
  updateSettings,
  renderDom
} from 'js/lib/core';
import routes from './routes';

// initialize lib/core and set which history type to create the store with
// default is createHashHistory
initCore(BROWSER_HISTORY);

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
