
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {syncReduxAndRouter, routeReducer} from 'redux-simple-router';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {createMemoryHistory, createHashHistory, createHistory} from 'history';

let _createHistoryType = false;

function setFinalReducers(reducers) {
  return combineReducers({
    ...reducers,
    routing: routeReducer
  })
}

export default function configureStore(reducers, historyType, initialState = {}) {
  const finalReducers = setFinalReducers(reducers);

  _createHistoryType = createMemoryHistory;

  if (historyType === 'HASH_HISTORY') {
    _createHistoryType = createHashHistory;
  } else if (historyType === 'BROWSER_HISTORY') {
    _createHistoryType = createHistory;
  }

  _createHistoryType = _createHistoryType();

  const store = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware({level: 'info', collapsed: true})
    )
  )(createStore)(finalReducers, initialState);

  syncReduxAndRouter(_createHistoryType, store);

  return store;
}


export function getHistory() {
  return _createHistoryType;
}

export function updateStoreReducers(store, reducers) {
  const finalReducers = setFinalReducers(reducers);

  store.replaceReducer(finalReducers);
}
