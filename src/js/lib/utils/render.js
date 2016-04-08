
let _rid = 0;

let _FPS = 0;
let _TIME = 0;
let _DELTA = 0;

let _lastRender      = false;
let _renderCallbacks = [];
let _nextFrameCallbacks = [];

let _renderStarted = false;

enableRender();

export function enableRender() {
  if (!_renderStarted) {
    _rid = requestAnimationFrame(render);

    _renderStarted = true;
  }
}

export function startRender(callback) {
  if (_renderCallbacks.indexOf(callback) === -1) {
    _renderCallbacks.push(callback);
  }
}

export function stopRender(callback) {
  const index = _renderCallbacks.indexOf(callback);

  if (index > -1) {
    _renderCallbacks.splice(index, 1);
  }
}

export function nextFrame(callback) {
  const args = [arguments.length - 1];

  if (arguments.length > 1) {
    const l = arguments.length;
    let i = 1;

    for (; i < l; i++) {
      args[i - 1] = arguments[i];
    }
  }

  _nextFrameCallbacks.push(() => callback.apply(null, args));
}

export function getRenderFPS() {
  return _FPS;
}

export function disableRender() {
  cancelAnimationFrame(_rid);
  
  _renderStarted = false;
} 

function render(now) {
  let fps = 60;

  let lastRenderDifference = 0;

  if (_lastRender) {
    lastRenderDifference = now - _lastRender;
    fps = 1000 / lastRenderDifference;
  }

  _lastRender = now;
  _FPS = fps;
  _TIME = now;
  _DELTA = lastRenderDifference;

  for (let i = _renderCallbacks.length - 1; i > -1; i--) {
    const callback = _renderCallbacks[i];

    callback(_TIME, lastRenderDifference, _FPS);
  }

  if (_nextFrameCallbacks.length) {
    fireNextFrame();
  }

  _rid = requestAnimationFrame(render);
}

function fireNextFrame() {
  const callback = _nextFrameCallbacks[0];

  callback();

  // remove this callback as nextFrame is a one time thing
  _nextFrameCallbacks.splice(0, 1);
}