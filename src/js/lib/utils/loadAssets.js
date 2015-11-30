
const NAMESPACE = '[lib/utils/loadAssets]';

export default function loadAssets(cdnurl, assets) {
  console.log(NAMESPACE, 'loadAssets');

  return new Promise(resolve => {
    if (!assets.length) {
      return resolve();
    }

    const queue = new createjs.LoadQueue(false);

    createjs.Sound.alternateExtensions = ['ogg'];

    queue.installPlugin(createjs.Sound);

    queue.addEventListener('complete', resolve);

    queue.loadManifest(assets);
  });
}
