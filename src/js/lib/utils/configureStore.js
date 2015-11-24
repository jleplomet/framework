
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { devTools } from 'redux-devtools';
import {createHashHistory} from 'history';

function setFinalReducers(reducers) {
  return combineReducers({
    ...reducers,
    router: routerStateReducer
  })
}

export default function configureStore(reducers, initialState = {}) {
  const finalReducers = setFinalReducers(reducers);

  const store = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware({level: 'info', collapsed: true})
    ),
    reduxReactRouter({createHistory: createHashHistory}),
    // devTools()
  )(createStore)(finalReducers, initialState);

  return store;
}

export function updateStoreReducers(store, reducers) {
  const finalReducers = setFinalReducers(reducers);

  store.replaceReducer(finalReducers);
}
