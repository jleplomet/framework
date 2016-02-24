
const NAMESPACE = '[lib/utils/sound]';

let muted = false;
let muteOnLostFocusEnabled = false;
let mutedByLostFocus = false;
let muteCallback = false;
let soundInstance;
let soundInstanceVolume = 0;

export function playSound(id, volume = 0.75, loop = 0, interrupt = createjs.Sound.INTERRUPT_NONE) {
  return new Promise((resolve, reject) => {
    if (muted) {
      return reject(`${NAMESPACE} is muted.`);
    }

    soundInstanceVolume = volume;

    soundInstance = createjs.Sound.play(id, {
      interrupt,
      volume,
      loop,
      pan: 0.5
    });

    soundInstance.on('complete', resolve);
  });
}

export function muteOnLostFocus() {
  if (muteOnLostFocusEnabled) {
    return;
  }

  window.addEventListener('focus', () => {
    if (mutedByLostFocus) {
      mute(false);

      mutedByLostFocus = false;
    }
  });

  window.addEventListener('blur', () => {
    if (!isMute()) {
      mute(true);

      mutedByLostFocus = true;
    }
  });

  muteOnLostFocusEnabled = true;
}

export function mute(mute) {
  console.log(NAMESPACE, 'mute', mute);

  muted = mute;

  if (soundInstance && muted) {
    soundInstance.volume = 0;
  } else if (soundInstance && !muted) {
    soundInstance.volume = soundInstanceVolume;
  }
}

export function isMute() {
  return muted;
}
