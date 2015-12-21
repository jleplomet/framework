
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

export function cleanPathName(pathname, defaultPathName = 'index') {
  const cleaned = pathname.split('/')[1];

  if (cleaned === undefined || cleaned === false) {
    // we dont have a "/", just return the pathname
    return pathname;
  }

  return cleaned || defaultPathName;
}

export function getLanguageForId(id, language) {
  if (language.hasOwnProperty(id)) {
    return language[id];
  }

  return false;
}
