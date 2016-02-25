
const NAMESPACE = '[lib/utils/assets]';

/**
 * Get HTTP url path for image asset. This will include the cdnurl defined for
 * the project. If cache busting filenames is enabled in Webpack config, the
 * filename will be changed to avoid cache.
 *
 * @param {string} path
 */
export function getImageAsset(path) {
  return require(`./../../../images/${path}`);
}

/**
 * Get HTTP url path for data asset. This will include the cdnurl defined for
 * the project. If cache busting filenames is enabled in Webpack config, the
 * filename will be changed to avoid cache.
 *
 * @param {string} path
 */
export function getDataAsset(path) {
  return require(`./../../../data/${path}`);
}

/**
 * Get HTTP url path for sound asset. This will include the cdnurl defined for
 * the project. If cache busting filenames is enabled in Webpack config, the
 * filename will be changed to avoid cache.
 *
 * @param {string} path
 */
export function getSoundAsset(path) {
  return require(`./../../../sounds/${path}`);
}

/**
 * Load a manifest of assets. This function depends on preloadjs.
 *
 * @param  {array} assets
 * @return {Promise}
 */
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
