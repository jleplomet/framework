
import "scss/main";

import cdnurl from './cdnurl';

import {
  initCore,
  bootCore,
  updateSettings,
  renderDom
} from 'js/lib/core';

import routes from './routes';

import * as device from 'js/lib/utils/device';

// initialize lib/core and set which history type to create the store with
// default is MEMORY_HISTORY
initCore();

// update settings and or add in custom settings to be used across the app
// through the store/state
updateSettings({
  cdnurl,
  languageFile: true,
  languageCode: 'en_us',
  routes
});

bootCore().then(renderDom);
