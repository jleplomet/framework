
import {settingsUpdate} from '../actions';
import {getDataAsset} from '../utils/assets'
import jQuery from '../../plugins/jquery';

const NAMESPACE = '[lib/utils/language]';

export function getLanguageForId(id, language) {
  if (language.hasOwnProperty(id)) {
    return language[id];
  }

  return false;
}

export function loadLanguageFile(languageCode, dispatch) {
  console.log(NAMESPACE, 'loadLanguageFile');

  return new Promise(resolve => {
    const url = getDataAsset(`${languageCode}.json`);

    jQuery.ajax({
      url
    }).done(data => {
      dispatch(settingsUpdate({language: data}));

      resolve();
    });
  })
}
