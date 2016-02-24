
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {browserHistory, hashHistory, createMemoryHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware, routerReducer} from 'react-router-redux';
import storeEnhancer from './storeEnhancer';

let _historyType = false;
let _store = false;

function setFinalReducers(reducers) {
  return combineReducers({
    ...reducers,
    routing: routerReducer
  });
}

export function configureStore(reducers, historyType, initialState = {}) {
  const finalReducers = setFinalReducers(reducers);

  _historyType = createMemoryHistory();

  if (historyType === 'HASH_HISTORY') {
    _historyType = hashHistory;
  } else if (historyType === 'BROWSER_HISTORY') {
    _historyType = browserHistory;
  }

  _store = createStore(
    finalReducers,
    initialState,
    storeEnhancer()
  );

  _historyType = syncHistoryWithStore(_historyType, _store);

  return _store;
}

export function getHistory() {
  console.log(_historyType);

  return _historyType;
}

export function updateStoreReducers(store, reducers) {
  const finalReducers = setFinalReducers(reducers);

  store.replaceReducer(finalReducers);
}
