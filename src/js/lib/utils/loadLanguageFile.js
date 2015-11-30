
import {settingsUpdate} from '../actions';
import {getDataAsset} from '../utils'
import jQuery from '../../plugins/jquery';

const NAMESPACE = '[lib/utils/loadLanguageFile]';

export default function loadLanguageFile(languageCode, dispatch) {
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

