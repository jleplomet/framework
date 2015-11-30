
const NAMESPACE = '[lib/utils]';

export function getImageAsset(path, cdnurl) {
  return require(`../../../images/${path}`);
}

export function getDataAsset(path, cdnurl) {
  return require(`../../../data/${path}`);
}

export function cleanPathName(pathname) {
  return pathname.split('/')[1] || 'index';
}

export function getLanguageForId(id, language) {
  if (language.hasOwnProperty(id)) {
    return language[id];
  }

  return false;
}
