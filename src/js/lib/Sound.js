
const NAMESPACE = '[lib/sound]';

let muted = false;
let soundInstance;
let soundInstanceVolume = 0;

export function playSound(
  id,
  volume = 0.75,
  loop = 0,
  interrupt = createjs.Sound.INTERRUPT_NONE
) {
  return new Promise((resolve, reject) => {
    if (muted) {
      return reject(`${NAMESPACE} is muted.`);
    }

    soundInstance = createjs.Sound.play(id, {
      interrupt,
      volume,
      loop,
      pan: 0.5
    });

    soundInstance.on('complete', resolve);
  });
}

export function mute(mute) {
  muted = mute;

  if (soundInstance && muted) {
    soundInstance.volume = 0;
  } else if (soundInstance && !muted) {
    soundInstance.volume = soundInstanceVolume;
  }
}
