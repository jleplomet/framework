
const NAMESPACE = '[lib/utils/loadAssets]';

export default function loadAssets(assets) {
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
