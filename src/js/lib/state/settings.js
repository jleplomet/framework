
import {fromJS} from 'immutable';

const settings = {
  cdnurl: 'files/',
  languageCode: 'en_us',
  languageFile: false,
  language: {},
  staticComponents: [],
  routes: {},
  mountSelector: '[data-app]'
};

export default fromJS(settings);
