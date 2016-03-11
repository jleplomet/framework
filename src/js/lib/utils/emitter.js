
import {EventEmitter} from 'fbemitter';

/**
 * Event Emitter uitility based off of fbemitter.
 *
 * Documentation https://github.com/facebook/emitter
 *
 * Simple wrapper for fbemitter so we can have one global emitter
 */

const _emitter = new EventEmitter();


export function addListener(type, callback) {
  return _emitter.addListener(type, callback);
}

export function addListenerOnce(type, callback) {
  return _emitter.once(type, callback);
}

export function emitListenerType(type, ...args) {
  _emitter.emit(type, ...args);
}

export function removeAllListeners(type = false) {
  _emitter.removeAllListeners(type);
}
