
const NAMESPACE = '[lib/utils/assets]';

export function getImageAsset(path) {
  return require(`./../../../images/${path}`);
}

export function getDataAsset(path) {
  return require(`./../../../data/${path}`);
}

export function getSoundAsset(path) {
  return require(`./../../../sounds/${path}`);
}

export function loadAssets(assets) {
  console.log(NAMESPACE, 'loadAssets');
  
  return new Promise(resolve => {
    if (!assets.length) {
      return resolve();
    }

    console.log(NAMESPACE, `loading ${assets.length} asset(s)`);

    const queue = new createjs.LoadQueue(false);

    createjs.Sound.alternateExtensions = ['ogg'];

    queue.installPlugin(createjs.Sound);

    queue.addEventListener('complete', resolve);

    queue.loadManifest(assets);
  });
}
