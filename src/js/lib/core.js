
import React from 'react';
import ReactDOM from 'react-dom';
import * as defaultReducers from './reducers';
import {constantsAdd, settingsUpdate} from './actions';
import configureStore from './utils/configureStore';
import loadLanguageFile from './utils/loadLanguageFile';
import RootComponent from './RootComponent';
import CoreComponent from './CoreComponent';

const NAMESPACE = '[lib/core]';

let store = configureStore(defaultReducers);
let coreBootMethods = [];

export function bootCore() {
  console.log(NAMESPACE, 'bootCore');

  return new Promise(resolve => {
    const {settings} = store.getState();
    const {
      cdnurl,
      languageCode,
      languageFile
    } = settings.toJS();

    // TODO: UPDATE STORE WITH CUSTOM REDUCERS

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
      document.querySelector(mountSelector)
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
