
Framework
===============================================

A very minimal boilerplate to work with React, Redux, React-Router to build a SPA. Or you can rip out all the React stuff and use only the utility files.

This boilerplate is 100% for my development needs only :-)

## Getting Started

Go ahead and clone this repo and copy and paste all files to your project directory.

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

### React

The best part of this framework is that its React enabled. That means we have the full power of [React](react) to handle our DOM. [Redux](redux) to handle our data layer and state management of our React components. [React Router](react-router) to handle our Routes to and from sections.

To see how React is used with this framework, read: [The React Docs](/docs/REACT.md)

### Utilities

This framework is not just about React. If you don't want to use React and just want to use the Utilities, read: [The Utility Docs](/docs/UTILS.md). Lots of help for webpack/dev-server stuff from [react-boilerplate](react-boilerplate).

## Features
- JavaScript with [Babel][babel]
  - [ES2015 Preset][es2015]
  - [React Preset][react-preset]
  - [Stage-1 Preset][stage1]
- [React][react]
  - [Redux][redux]
  - [React Router][react-router]

[react-boilerplate]:https://github.com/mxstbr/react-boilerplate
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
