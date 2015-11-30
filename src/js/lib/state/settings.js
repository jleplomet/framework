
import {fromJS} from 'immutable';

const settings = {
  assets: [],
  cdnurl: 'files/',
  languageCode: 'en_us',
  languageFile: false,
  language: {},
  mountSelector: '[data-app]',
  routes: {},
  staticComponents: []
};

export default fromJS(settings);
