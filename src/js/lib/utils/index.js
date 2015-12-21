
const NAMESPACE = '[lib/utils]';

export function getImageAsset(path) {
  return require(`./../../../images/${path}`);
}

export function getDataAsset(path) {
  return require(`./../../../data/${path}`);
}

export function getSoundAsset(path) {
  return require(`./../../../sounds/${path}`);
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
