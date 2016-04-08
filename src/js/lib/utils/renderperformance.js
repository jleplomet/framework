
import {getRenderFPS} from './render';

const NAMESPACE = '[js/lib/util/renderperformance]';

export default class RenderPerformance {
  constructor() {
    this._enabled = true;
    this._average = 0;
    this.averageFPS = 0;
    this._time = false;
    this._times = [];
    this._fps = [];
    this._pastFPS = 60;
  }

  record() {
    if (!this._enabled) {
      return;
    }

    if (!this._time) {
      this._time = performance.now();
    } else {
      const diff = performance.now() - this._time;

      this._time = null;

      this._times.unshift(diff);

      if (this._times.length > this._pastFPS) {
        this._times.pop();
      }

      this._fps.unshift(getRenderFPS());

      if (this._fps.length > this._pastFPS) {
        this._fps.pop();
      }

      this._times.forEach(_time => this.average += _time);

      this.average /= this._times.length;

      this._fps.forEach(_fps => this.averageFPS += _fps);

      this.averageFPS /= this._fps.length;
    }
  }

  get times() {
    return this._times;
  }

  get median() {
    this._times.sort((a, b) => a - b);

    return this._times[~~(this._times.length / 2)];
  }

  set enabled(value) {
    if (!value) {
      console.log(NAMESPACE, 'disabled');
    }

    this._enabled = value;
  }
}
