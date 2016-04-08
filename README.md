
Framework
===============================================

A very minimal boilerplate to work with React, Redux, React-Router to build a SPA. Or you can rip out all the React stuff and use only the utility files.

This boilerplate is 100% for my development needs only :-)

## Getting Started

Go ahead and clone this repo and copy and paste all files to your project directory. Maybe at a later time, this project can be an actual package that you can install through npm. Maybe.

```sh
git clone https://github.com/jleplomet/framework.git

# copy to project directory

# Install project dependencies
npm install
```

##### Use npm scripts to handle development build
```sh
# development build that starts webpack-dev-middleware and express local server
npm run dev
```
Now open [http://localhost:3000](http://localhost:3000).

##### Use npm scripts to build for production
```sh
# will build for production by minifying html/js/css files.
npm run build
```
Will output to ```./build/```

## How To Use

Out of the box this boilerplate setups React, Redux, React-Router for you so the only thing you need to worry about is your React components, styling, and functionality of your app. Assets are automatically wired up according to your cdn url.

### Setup index.html and cdnurl for assets

#### index.html

A default ```index.html``` is provided for you under ```src/layout/```. Webpack will hookup css, js links on build. As we are using React, there is no real need to edit this file unless you need to include custom html or outside script resources that cannot be included in your css, js bundles.

#### cdnurl.js

This file contains the live url for your assets. The file lives in ```src/js```. Webpack will automagically prepend all requests for assets with this url so you don't have to update files between build environments.
```js
# src/js/cdnurl.js
module.exports = 'http://some.url.com/files/';
```

### Not Interested In React?

Thats ok. I use React because it makes development fun again. React allows me to dynamically handle my HTML with JSX and render what I need using plain old JavaScript. Its fast, its big in the community and it works at FB scale.

Check out the [Utility Functions](#utility-functions) instead.

### Setup routes.js

[React Router][react-router] is used to handle routing. ```src/js/routes.js``` defines our application routes so we can navigate to and from routes. React Router provides many types of ways to define your routes. This doc will explain the basic route examples a typical SPA will use. Please visit React Router [docs][react-router-docs] for more detailed information on how to setup routes.

##### The initial route ```IndexRoute``` is provided for you to start
```js
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import CoreComponent from 'js/lib/containers/CoreComponent';
import Index from 'js/components/Index';

const routes = (
  <Route path='/' component={CoreComponent}>
    <IndexRoute component={Index} />
  </Route>
);
```

##### Add custom ```Route``` component ```About``` with path ```/about```
```js
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import CoreComponent from 'js/lib/containers/CoreComponent';
import Index from 'js/components/Index';
import About from 'js/components/About';

# Default IndexRoute
const routes = (
  <Route path='/' component={CoreComponent}>
    <IndexRoute component={Index} />
    <Route path='/about' component={About} />
  </Route>
);
```

##### Add custom ```Route``` component ```Gallery``` with nested ```Route``` component ```GalleryImage```
```js
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import CoreComponent from 'js/lib/containers/CoreComponent';
import Index from 'js/components/Index';
import Gallery from 'js/components/Gallery';
import GalleryImage from 'js/components/GalleryImage';

const routes = (
  <Route path='/' component={CoreComponent}>
    <IndexRoute component={Index} />
    <Route path='gallery' component={Gallery}>
      <Route path='image/:id' component={GalleryImage} />
    </Route>
  </Route>
);
```

With this setup, your path will be ```/gallery/image/1```. We will explore how to handle these components further down the docs.

### Setup main.js

Now that we have our ```routes.js``` file ready to go, we can move onto setting up the rest of the boilerplate. ```src/js/main.js``` is the entry point for the entire boilerplate. We can define custom settings, custom redux reducers to handle a custom piece of the state, specify assets to preload and finally, render our entire React app and begin routing to and from our components.

##### We only need to call 3 required functions to begin our SPA: ```initCore```, ```bootCore```, and ```renderDom```

```js
import {
  initCore,
  bootCore,
  renderDom
} from 'js/lib/core';

import routes from './routes';

initCore();

bootCore().then(renderDom);
```

```intiCore``` is defined in ```src/js/lib/core.js``` its sole objective is to create our [Redux][redux] store and setup which type of routing we should use.

##### 3 options on routing: ```MEMORY_HISTORY``` (default), ```HASH_HISTORY```, ```BROWSER_HISTORY```

```js
import {
  initCore,
  HASH_HISTORY,
  BROWSER_HISTORY
} from 'js/lib/core/';

// the default is MEMORY_HISTORY, we don't need to keep track of our routing state
// or deep link to any route component.
initCore();

// we need to route with the hashtag as we require deep linking to any route
// component. HASH_HISTORY should only be used if you require support for IE9. Or,
// cannot use BROWSER_HISTORY as you cannot provide the server rewrite requirement.
initCore(HASH_HISTORY);

// BROWSER_HISTORY is the best history. It uses HTML5 History API. Its modern, no
// hashtag needed to keep track of our routing state and deep links will be cleanly
// written. This does require a server level rewrite though. No support for IE9!
initCore(BROWSER_HISTORY);
```

```bootCore``` is defined in ```src/js/lib/core.js```. Its job is to update our Redux store only if a custom reducer was introduced, load a language data file if we enabled, and finally preload any assets defined. On complete, the Promise resolves successfully and the final step is to call ```renderDom```.

```js
...

bootCore().then(renderDom);
```

Before we can expand on ```bootCore``` and how it loads that language data file, updates the Redux store, and preloads those assets, lets talk about ```updateSettings``` and ```addReducer```.

##### ```updateSettings```

```updateSettings``` is just a function that updates our store, more specifically a piece of the store called ```settings```. It dispatches an action to the store and the settings reducer updates the state accordingly. All this is handled by [Redux][redux], more information on how this works can be read by visiting the [docs][redux-docs].
To view the default state for settings, open ```src/js/lib/state/settings.js```

##### Update settings with ```updateSettings```

```js
...

// lets change our languageCode as a different language is needed
updateSettings({
  languageCode: 'mx' // this will now load a language file src/data/mx.json,
  routes // this is required at all times
});
```

##### ```updateReducer```

More on this later.

##### Finally lets start working with React and forget about this boilerplate

We have discussed the minimal options to setup our framework, ```initCore```, ```updateSettings```, ```bootCore```, and ```renderDom``` should be the only functions that need to call before we handle the rest our site in React land.

```js
import {
  initCore,
  bootCore,
  updateSettings,
  renderDom
} from 'js/lib/core';

import routes from './routes';

// initialize lib/core and set which history type to create the store with
// default is MEMORY_HISTORY
initCore();

// we have to build a dynamic langauge site, we will get the language code from php and it will create a global js var.
// not the best solution but it can work
updateSettings({
  languageFile: true,
  languageCode: window.someLanguageCode // en_us
  routes // this is required at all times
});

bootCore().then(() => {
  // we have a preloader overlay...
  // hide it here
  
  // render the dom dude
  renderDom(); 
});
```

React land stuff coming soon...

## Utility Functions

While this framework is a little opinionated by using React to handle the site structure, routing, and data management layer (Redux), it also includes a few scripts that can be used outside of React should you choose not to follow this setup. I got tired of writing the same tired code over and over again for projects. Here is an intro to these utility functions.

### Assets ```src/js/lib/utils/assets.js```

Assets is a neat utility that handles a couple things. Since we use Webpack to build our files, we can require our assets and have Webpack fill in our cdn url automatically, and optional cache busting filenames or append cache busting url params to the asset url. This is very useful as the only thing we need to worry about is the path to the asset. Also, Assets provides a function to load assets on demand using createjs.PreloadJS. 

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
// --- device.retina is a function that needs to be called. This is because if you are lucky to have two monitors, 
// switching between the retina display and non retina display will update the devicePixelRatio and this will allow 
// you to handle dynamically.
if (device.retina()) {
  // retina device 
}

// support webGL?
if (!device.webGL) { ... }

// for mobile this utility really shines! we try to actually figure out what device you are on by testing some webGL stuff. 
// I guess Apple reports its processor type and with figuring out the screen size, we can determine the actual device.
if (device.phone && device.device === 'iPhone 6s Plus') {
 // we are on the latest and greatest... 
}
```

Tons more checks avaliable, just browse ```src/js/lib/utils/device.js``` for more.

### Emitter ```src/js/lib/utils/emitter.js```

Emiiter is a global event system based on [fbemitter]

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
emitListenerType('some_event', {foo: 'bar'});
//logs nothing 
emitListenerType('some_event', {foo: 'bar'});

```

### Render ```src/js/lib/utils/render.js```

Render is utility that creates a global requestAnimationFrame for the entire app. no need to fire off your own loops, just hook up to this one. No need to worry when to start the requestAnimationFrame loop. The moment you import the utility, the loop is started.

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

Call a function to run on the next avaliable frame. This will only run once and when the browser is ready to fire away.

```js
import {nextFrame} from 'js/lib/utils/render';

function handleOnNextFrame(a, b) {
 console.log(a, b) // foo, bar 
}

nextFrame(handleOnNextFrame, "foo", "bar"); // params after function name represents function params
```

So something happens in your app and you want to disable the global requestAnimationFrame

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

Although I will be launching with this utility for my current project, I will not get into it at this moment as it needs more testing. Basically it is a wrapper for web workers. Feel free to explore the code though :-)

### Webcam ```src/js/lib/utils/webcam.js```

I just read a tweet that mentioned a new API to access the webcam for both chrome and firefox. Ill update this when I read into it some more.

## Features
- JavaScript with [Babel][babel]
  - [ES2015 Preset][es2015]
  - [React Preset][react-preset]
  - [Stage-1 Preset][stage1]
- [React][react]
  - [Redux][redux]
  - [React Router][react-router]
 
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
