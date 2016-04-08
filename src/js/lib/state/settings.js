
import {fromJS} from 'immutable';

const settings = {
  assets: [],
  assetsLoadProgress: false,
  assetsMaxConnections: 10,
  cdnurl: 'files/',
  languageCode: 'en_us',
  languageFile: false,
  language: {},
  mountSelector: '[data-app]',
  routes: {},
  transitionName: 'swap',
  transitionEnterTimeout: 500,
  transitionLeaveTimeout: 500,
  staticComponents: [],
  runPerformanceTest: false
};

export default fromJS(settings);
