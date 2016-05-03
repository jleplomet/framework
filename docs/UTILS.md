Framework - The Utility Docs
===============================================

## Utility Functions

While this framework is a little opinionated by using React to handle the site structure, routing, and data management layer (Redux), it also includes a few scripts that can be used outside of React should you choose not to follow this setup. I got tired of writing the same tired code over and over again for projects. Here is an intro to these utility functions.

### Assets ```src/js/lib/utils/assets.js```

Assets is a neat utility that handles a couple things. Since we use Webpack to build our files, we can require our assets and have Webpack fill in our cdn url automatically, and optional cache busting filenames or append cache busting url params to the asset url. This is very useful as the only thing we need to worry about is the path to the asset. Also, Assets provides a function to load assets on demand using createjs.PreloadJS.

All assets live in ```src/{images,sounds,data,fonts}```

##### Image Assets ```src/images/```

```js
import {getImageAsset} from 'js/lib/utils/assets';

const logo = getImageAsset('logo.png'); // http://some.url.com/files/images/logo.png
```

##### Sound Assets ```src/sounds/```

```js
import {getSoundAsset} from 'js/lib/utils/assets';

const sound = getSoundAsset('sound.mp3'); // http://some.url.com/files/sounds/sound.mp3
```

##### Load Assets

```js
import {getImageAsset, getSoundAsset, loadAssets} from 'js/lib/utils/assets';

const manifest = [
  {id: 'logo', src: getImageAsset('logo.png')},
  {id: 'bgLoop', src: getSoundAsset('bgLoop.mp3')}
];

// display a loader?

loadAssets(manifest)
  .then(() => {
    // hide your loader?

    // continue on with your app...
  });
```

### Device ```src/js/lib/utils/device.js```

Device is a great utility to filter out certain traits of the browser. It has a bunch of predefined checks and can easily be expanded.

```js
import * as device from 'js/lib/utils/device';

// are we on a retina device?
// --- device.retina is a function that needs to be called. If you are lucky to have two monitors,
// switching between the retina display and non retina display will update the devicePixelRatio and this will allow
// you to handle dynamically.
if (device.retina()) {
  // retina device
}

// support webGL?
if (!device.webGL) { ... }

// for mobile this utility really shines! we try to actually figure out what device you are on by testing some webGL stuff.
// I guess Apple reports its processor type and with figuring out the screen size, we can determine the actual device.
// Android support coming soon. I think.
if (device.phone && device.device === 'iPhone 6s Plus') {
 // we are on the latest and greatest...
}
```

Tons more checks avaliable, just browse ```src/js/lib/utils/device.js``` for more.

### Emitter ```src/js/lib/utils/emitter.js```

Emitter is a global event system based on [fbemitter]. Emitter allows you register and fire events across your app. Supports one time listeners so you dont have to worry about removing one time events.

```js
import {addListener, addListenerOnce, emitListenerType} from 'js/lib/utils/emitter';

// add a listener then remove at a later time
const someEvent = addListener('some_event', someEvent);

function someEvent(data) {
  // we are done with this event after some use case happens
  someEvent.remove();
}

emitListenerType('some_event', {foo: 'bar'});

// add a listener once and forget about it
addListenerOnce('some_event', data => console.log('some_event!', data));

// logs: some_event! {foo: 'bar'}
emitListener('some_event', {foo: 'bar'});
//logs nothing
emitListener('some_event', {foo: 'bar'});

// add some listeners and then remove them all
addListener('some_event_a', data => console.log('some_event_a', data));
addListener('some_event_b', data => console.log('some_event_b', data));
addListener('some_event_c', data => console.log('some_event_c', data));

// This one is a little dangerous so use it wisely.. It will remove all events
// registered in the global emitter.
removeAllListeners()

// remove only listeners with type some_event_a
removeAllListeners('some_event_a');

// Lets say you have a global emitter where multiple files listen to events:
// some_event_a and some_event_b. Across your codebase, these events are handled.
// File ABC registers this event when it "appears" and File ABC would like to stop
// listening when it "disappears". You cannot call removeAllListeners because it will
// remove all the events and the other files that depend on it will break.
//
// Enter listenerCache.
//
import {addListener, removeAllListenersFromCache} from 'js/lib/utils/emitter';

// create the listener cache so we can remove the events this file creates.
const listenerCache = [];

class ABC {
  viewDidAppear() {
    // some_event_a and some_event_b are global events, other files will also
    // handle these events. we will add them to this files specific listenerCache
    // so we can remove these events only.
    addListener('some_event_a', some_handler, listenerCache);
    addListener('some_event_b', some_handler, listenerCache);
  }

  viewDidDisappear() {
    // some_event_a, and some_event_b will continue to fire but this file will
    // not handle these events as its now removed.
    removeAllListenersFromCache(listenerCache);
  }
}

```

### Render ```src/js/lib/utils/render.js```

Render is utility that creates a global requestAnimationFrame for the entire app. no need to fire off your own loops, just hook up to this one. No need to worry when to start the requestAnimationFrame loop. The moment you import the utility, the loop is started and only started once.

Start running your custom loop function on every frame

```js
import {startRender} from 'js/lib/utils/render';

function loop() {
  // draw something.
}

startRender(loop);
```

Stop your custom loop function from running as the task is complete. This will not stop the global requestAnimationFrame.

```js
import {stopRender} from 'js/lib/utils/render';

stopRender(loop); // loop is removed from the render cache and will not update
```

Call a function to run on the next available frame. This will only run once and when the browser is ready to fire away.

```js
import {nextFrame} from 'js/lib/utils/render';

function handleOnNextFrame(a, b) {
 console.log(a, b) // foo, bar
}

nextFrame(handleOnNextFrame, "foo", "bar"); // params after function name represents function params
```

Something happens in your app and you need to disable the global requestAnimationFrame

```js
import {disableRender} from 'js/lib/utils/render';

disableRender();
```

Whatever happened is now over and you need to enable the global requestAnimationFrame again
```js
import {enableRender} from 'js/lib/utils/render';

enableRender();
```

### Render Performance ```src/js/lib/utils/renderperformance.js```

Use this class to test your render performance and determine your current FPS.

```js
import {startRender} from 'js/lib/utils/render';
import RenderPerformance from 'js/lib/utils/renderperformance';

const renderPerformance = new RenderPerformance();

function render() {
  renderPerformance.record();
  // do stuff
  renderPerformance.record();
}

renderPerformance.enabled = true;

startRender(render);

setTimeout(() => {
  // run this mini performance test for 3 seconds and figure out your FPS
  renderPerformance.enabled = false;

  if (renderPerformance.averageFPS < 55) {
    // adjust your render loop, 60fps is the goal.
  }
}, 3000);
```

### Sound ```src/js/lib/utils/sound.js```

Use this utility to play some sounds. Currently can handle one background loop and mulitple sound fx.

```js
import {playSound, playSoundFx} from 'js/lib/utils/sound';

// play the background loop
playSound('bgLoop', 1, -1); // sound id, volume, loop

// later on, play a sound fx
playSoundFx('soundFx1', 0.75); // sound id, volume
```

Lets mute all sounds

```js
import {mute, playSoundFx} from 'js/lib/utils/sound';

// all sounds are muted
mute(true);

// will not play as mute is active
playSoundFx('soundFx1', 0.75);
```

Turned on by default, Sound will mute when we leave the window and will unmute (only if muted by lost focus) when we are back on the window.

### Thread ```src/js/lib/utils/thread.js```

Web workers is the only way to have a multi-threaded setup in JS. Kind of. This is a simple wrapper to work with Web workers. Use this file when you need to offload some complex code to a web worker while keeping your main thread open.

```js
import Thread from 'js/lib/utils/thread';

// create the thread which will spawn the web worker
const thread = new Thread();

// upload custom methods to the web worker so you can execute
thread.extend({
  hello(a, b, c) {
    // IMPORTANT: methods you upload to the web worker will be in the Web Worker
    // context! Do not try to access the DOM! Not possible.
    // https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope

    // come complex processing?
    var results = Math.round(a * b * c);

    // report back to the main thread...
    self.emit('hello', {results});
  }
});

// lets listen for when the thread completes our custom method
thread.on('hello', data => console.log('hello', data.results))
// execute our method hello on the webworker!
// params after method name will be applied as function parameters to custom method
// uploaded to the web worker
thread.execute('hello', 10, 100, 1000);

```

### Webcam ```src/js/lib/utils/webcam.js```

I just read a tweet that mentioned a new API to access the webcam for both chrome and firefox. Ill update this when I read into it some more.

[fbemitter]:https://github.com/facebook/emitter
[babel]:https://babeljs.io/
[es2015]:https://babeljs.io/docs/learn-es2015/
[react-preset]:https://babeljs.io/docs/plugins/preset-react/
[stage1]:https://babeljs.io/docs/plugins/preset-stage-1/
[react]:https://facebook.github.io/react/
[redux]:http://redux.js.org/
[redux-docs]:http://redux.js.org/index.html
[react-router]:https://github.com/reactjs/react-router
[react-router-docs]:https://github.com/reactjs/react-router/tree/master/docs
