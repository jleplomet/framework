
import {touch} from './device';

const NAMESPACE = '[lib/utils/sound]';

let muted = false;
let muteOnLostFocusEnabled = false;
let mutedByLostFocus = false;
let muteCallback = false;
let soundInstance;
let soundFxInstance;
let soundInstanceVolume = 0;
let soundFxInstanceVolume = 0;

if (!muteOnLostFocusEnabled && !touch) {
  muteOnLostFocus();
}

// TODO: figure out a clean solution to handle multiple looping sounds. is there ever a case for that?
export function playSound(id, volume = 0.75, loop = 0, interrupt = createjs.Sound.INTERRUPT_NONE) {
  return new Promise((resolve, reject) => {
    if (muted) {
      return console.warn(`${NAMESPACE} is muted.`);
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

export function playSoundFx(id, volume = 0.75) {
  return new Promise((resolve, reject) => {
    if (muted) {
      return console.warn(`${NAMESPACE} is muted.`);
    }
    
    soundFxInstanceVolume = volume;
    
    soundFxInstance = createjs.Sound.play(id, {
      interrupt: createjs.Sound.INTERRUPT_NONE,
      volume: soundFxInstanceVolume,
      pan: 0.5
    });
    
    soundFxInstance.on('complete', resolve);
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
    if (soundFxInstance) {
      soundFxInstance.volume = 0;
    }
  } else if (soundInstance && !muted) {
    soundInstance.volume = soundInstanceVolume;
    if (soundFxInstance) {
      soundFxInstance.volume = soundFxInstanceVolume;
    }
  }
}

export function isMute() {
  return muted;
}
