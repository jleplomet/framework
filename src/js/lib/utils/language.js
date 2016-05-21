
import {settingsUpdate} from '../actions';
import {getDataAsset} from '../utils/assets'

const NAMESPACE = '[lib/utils/language]';

var _language = false;

export function getLanguageForId(id, language) {
  if (_language.hasOwnProperty(id)) {
    return _language[id];
  }

  return false;
}

export function loadLanguageFile(languageCode, dispatch) {
  console.log(NAMESPACE, 'loadLanguageFile');

  return new Promise(resolve => {
    const url = getDataAsset(`${languageCode}.json`);

    fetch(url)
      .then(response => response.json())
      .then(language => {
        dispatch(settingsUpdate({language}))

        // we store a local reference so we can later on pull from the language
        // structure with getLanguageForId when additional language is needed
        _language = language

        resolve()
      });
  })
}
