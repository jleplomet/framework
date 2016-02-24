
import React from 'react';
import ReactDOM from 'react-dom';
import * as defaultReducers from './reducers';
import {notificationsAdd, settingsUpdate} from './actions';
import {configureStore, updateStoreReducers, getHistory} from './utils/configureStore';
import loadLanguageFile from './utils/loadLanguageFile';
import loadAssets from './utils/loadAssets';
import RootComponent from './containers/RootComponent';
import CoreComponent from './containers/CoreComponent';

const NAMESPACE = '[lib/core]';

let store = false;
let coreBootMethods = [];
let reducersAdded = false;

export const MEMORY_HISTORY  = 'MEMORY_HISTORY';
export const HASH_HISTORY    = 'HASH_HISTORY';
export const BROWSER_HISTORY = 'BROWSER_HISTORY';

export function initCore(historyType = MEMORY_HISTORY) {
  console.log(NAMESPACE, 'initCore', historyType);

  store = configureStore(defaultReducers, historyType);
}

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
      languageCode,
      languageFile
    } = settings.toJS();

    if (languageFile) {
      coreBootMethods.push(
        loadLanguageFile.bind(null, languageCode, store.dispatch)
      );
    }

    coreBootMethods.push(loadAssets.bind(null, assets));

    coreBootMethods.reduce((sequence, bootMethod) => {
      return sequence.then(() => bootMethod());
    }, Promise.resolve())
      .then(() => resolve(store))
      .catch(error => {throw error});
  });
}

export function renderDom() {
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
      resolve
    );
  });
}

export function addNotifications(constants) {
  console.log(NAMESPACE, 'addNotifications');

  store.dispatch(notificationsAdd(constants));
}

export function updateSettings(settings) {
  console.log(NAMESPACE, 'updateSettings');

  store.dispatch(settingsUpdate(settings));
}

export function addReducer(key, reducer) {
  Object.assign(defaultReducers, {[key]: reducer});

  reducersAdded = true;
}
