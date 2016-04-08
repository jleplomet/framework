
const NAMESPACE = '[lib/utils/assets]';

let queue;

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
 * @param  {array} assets createjs.LoadQueue manifest to load. 
 * @param  {function} assetsLoadProgress optional callback to display load progress
 * @param  {number} maxConnections the number of concurrent loads to allow. 
 * @return {Promise}
 */
export function loadAssets(assets, assetsLoadProgress, maxConnections = 10) {
  console.log(NAMESPACE, 'loadAssets');

  return new Promise(resolve => {
    if (!assets.length) {
      return resolve();
    }

    console.log(NAMESPACE, `loading ${assets.length} asset(s)`);

    queue = new createjs.LoadQueue(false);
    queue.setMaxConnections(maxConnections);

    createjs.Sound.alternateExtensions = ['ogg'];

    queue.installPlugin(createjs.Sound);
    
    if (assetsLoadProgress) {
      queue.addEventListener('progress', assetsLoadProgress);
    }
    
    queue.addEventListener('complete', resolve);

    queue.loadManifest(assets);
  });
}

/**
 * Get asset from load queue. This function depends on preloadjs
 * 
 * @param {string} id the id of the asset needed.
 * 
 * @return {Object}
 */

export function getAssetWithId(id) {
  return queue.getItem(id);
}