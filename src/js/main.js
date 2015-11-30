
import "scss/main";

import cdnurl from './cdnurl';

import {
  initCore,
  bootCore,
  addConstants,
  updateSettings,
  renderDom
} from './lib/core';
import {getImageAsset} from './lib/utils'

import routes from './routes';

// initialize lib/core and set which history type to create the store with
// default is createHashHistory
initCore();

// add constants for custom reducer actions or notifications
// addConstants({

// });

// update settings
// we are using webpack to handle our assets and rename them with a cache busting
// hash, webpack config will automatically append the cdn url to those assets
// as well. cool.
updateSettings({
  cdnurl,
  languageFile: true,
  languageCode: 'en_us',
  routes
});

bootCore().then(renderDom);
