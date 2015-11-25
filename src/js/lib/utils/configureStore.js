
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {createMemoryHistory, createHashHistory, createHistory} from 'history';

function setFinalReducers(reducers) {
  return combineReducers({
    ...reducers,
    router: routerStateReducer
  })
}

export default function configureStore(reducers, historyType, initialState = {}) {
  const finalReducers = setFinalReducers(reducers);

  let createHistoryType = createMemoryHistory;

  if (historyType === 'HASH_HISTORY') {
    createHistoryType = createHashHistory;
  } else if (historyType === 'BROWSER_HISTORY') {
    createHistoryType = createHistory;
  }

  const store = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware({level: 'info', collapsed: true})
    ),
    reduxReactRouter({createHistory: createHistoryType})
  )(createStore)(finalReducers, initialState);

  return store;
}

export function updateStoreReducers(store, reducers) {
  const finalReducers = setFinalReducers(reducers);

  store.replaceReducer(finalReducers);
}
