
Framework - The React Docs
===============================================

# WORK IN PROGRESS...

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

// we have to build a dynamic language site, we will get the language code from php and it will create a global js var.
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
