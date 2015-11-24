
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { devTools } from 'redux-devtools';
import {createHashHistory, createHistory} from 'history';

function setFinalReducers(reducers) {
  return combineReducers({
    ...reducers,
    router: routerStateReducer
  })
}

export default function configureStore(reducers, historyType, initialState = {}) {
  const finalReducers = setFinalReducers(reducers);
  const createHistoryType = historyType === 'HASH_HISTORY' ?
    createHashHistory : createHistory;

  const store = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware({level: 'info', collapsed: true})
    ),
    reduxReactRouter({createHistory: createHistoryType}),
    // devTools()
  )(createStore)(finalReducers, initialState);

  return store;
}

export function updateStoreReducers(store, reducers) {
  const finalReducers = setFinalReducers(reducers);

  store.replaceReducer(finalReducers);
}
