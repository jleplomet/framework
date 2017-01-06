
import React from 'react';
import ReactDOM from 'react-dom';
import * as defaultReducers from './reducers';
import {settingsUpdate} from './actions';
import {configureStore, updateStoreReducers, getHistory} from './store/configureStore';
import {loadLanguageFile} from './utils/language';
import {loadAssets} from './utils/assets';
import {emitListener, addListenerOnce} from './utils/emitter';
import RootComponent from './containers/RootComponent';
import CoreComponent from './containers/CoreComponent';

const NAMESPACE = '[lib/core]';

let store = false;
let coreBootMethods = [];
let reducersAdded = false;
let domRendered = false;

/**
 * Default history type. Routing does not persist state across sessions.
 *
 * @type {string}
 */
export const MEMORY_HISTORY  = 'MEMORY_HISTORY';
/**
 * Routing with hashtag support.
 *
 * @type {string}
 */
export const HASH_HISTORY    = 'HASH_HISTORY';
/**
 * Routing with HTML5 History API support.
 *
 * @type {string}
 */
export const BROWSER_HISTORY = 'BROWSER_HISTORY';

/**
 * Starting point for App. Creates initial Store and sets History method for
 * routing.
 *
 * @param  {string} historyType MEMORY_HISTORY | HASH_HISTORY | BROWSER_HISTORY
 */
export function initCore(historyType = MEMORY_HISTORY) {
  console.log(NAMESPACE, 'initCore', historyType);

  store = configureStore(defaultReducers, historyType);
}

/**
 * Boots up framework and updates store with custom reducers if added.
 * Loads language file if enabled, loads assets if specified.
 *
 * @return {Promise}
 */
export function bootCore() {
  console.log(NAMESPACE, 'bootCore');

  return new Promise(resolve => {

    // We can add custom reducers to the store so whatever component that needs
    // data, can now manage their own piece of the state through a custom reducer.
    // Instead of recreating the store, I think the replaceReducer API might do
    // the trick.
    if (reducersAdded) {
      updateStoreReducers(store, defaultReducers);
    }

    const {settings} = store.getState();
    const {
      cdnurl,
      assets,
      assetsLoadProgress,
      assetsMaxConnections,
      languageCode,
      languageFile,
      runPerformanceTest
    } = settings.toJS();

    if (languageFile) {
      coreBootMethods.push(
        loadLanguageFile.bind(null, languageCode, store.dispatch)
      );
    }

    coreBootMethods.push(loadAssets.bind(null, assets, assetsLoadProgress, assetsMaxConnections));
    
    if (runPerformanceTest) {
      // for the performance test, lets make sure our initial dom is rendered so whoever needs to 
      // handle the test will have access to the dom.
      coreBootMethods.push(renderDom);
      
      coreBootMethods.push(performanceTest);
    }

    coreBootMethods.reduce((sequence, bootMethod) => {
      return sequence.then(() => bootMethod());
    }, Promise.resolve())
      .then(() => {
        console.log(NAMESPACE, 'bootCore complete');
        
        resolve();
      })
      .catch(error => {throw error});
  });
}

/**
 * Render React Components and Begin Routing. We are done with core.js now.
 * The app is now in the hands of the React Components defined as routes.
 *
 * @return {Promise}
 */
export function renderDom() {
  if (domRendered) {
    return console.info(NAMESPACE, 'renderDom already happened due to a performance test request. You can safely remove this call.');  
  }
  
  console.log(NAMESPACE, 'renderDom');

  return new Promise(resolve => {
    const {settings} = store.getState();
    const {
      mountSelector,
      routes
    } = settings.toJS();

    ReactDOM.render(
      <RootComponent
        store={store}
        routes={routes}
        history={getHistory()} />,
      document.querySelector(mountSelector),
      () => {
        domRendered = true;
        
        resolve();
      }
    );
  });
}

export function updateSettings(settings) {
  console.log(NAMESPACE, 'updateSettings');

  store.dispatch(settingsUpdate(settings));
}

export function addReducer(key, reducer) {
  Object.assign(defaultReducers, {[key]: reducer});

  reducersAdded = true;
}

function performanceTest() {
  console.log(NAMESPACE, 'performanceTest');
  
  return new Promise(resolve => {
    addListenerOnce('performanceTestComplete', resolve);
    
    emitListenerType('performanceTest');
  })
}