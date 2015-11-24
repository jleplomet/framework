
import React from 'react';
import ReactDOM from 'react-dom';
import * as defaultReducers from './reducers';
import {constantsAdd, settingsUpdate} from './actions';
import configureStore, {updateStoreReducers} from './utils/configureStore';
import loadLanguageFile from './utils/loadLanguageFile';
import RootComponent from './RootComponent';
import CoreComponent from './CoreComponent';

const NAMESPACE = '[lib/core]';

let store = configureStore(defaultReducers);
let coreBootMethods = [];
let reducersAdded = false;

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
      languageCode,
      languageFile
    } = settings.toJS();

    if (languageFile) {
      coreBootMethods.push(
        loadLanguageFile.bind(null, cdnurl, languageCode, store.dispatch)
      );
    }

    // TODO: LOAD STUFF

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
      <RootComponent store={store} routes={routes} />,
      document.querySelector(mountSelector),
      resolve
    );
  });
}

export function addConstants(constants) {
  console.log(NAMESPACE, 'addConstants');

  store.dispatch(constantsAdd(constants));
}

export function updateSettings(settings) {
  console.log(NAMESPACE, 'updateSettings');

  store.dispatch(settingsUpdate(settings));
}

export function addReducer(key, reducer) {
  Object.assign(defaultReducers, {[key]: reducer});

  reducersAdded = true;
}
