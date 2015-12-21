
import {fromJS} from 'immutable';

const settings = {
  assets: [],
  cdnurl: 'files/',
  languageCode: 'en_us',
  languageFile: false,
  language: {},
  mountSelector: '[data-app]',
  routes: {},
  transitionName: 'swap',
  transitionEnterTimeout: 500,
  transitionLeaveTimeout: 500,
  staticComponents: []
};

export default fromJS(settings);
