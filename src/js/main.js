
import {bootCore, addConstants, updateSettings, renderDom} from 'js/lib/core';
import CoreComponent from './lib/CoreComponent';

import Index from './components/Index';

// add constants for custom reducer actions or notifications
// addConstants({

// });

// update settings
updateSettings({
  cdnurl: '',
  languageFile: true,
  languageCode: 'en_us',
  routes: {
    path: '/',
    component: CoreComponent,
    childRoutes: [
      {indexRoute: true, component: Index}
    ]
  }
});

bootCore().then(renderDom);
