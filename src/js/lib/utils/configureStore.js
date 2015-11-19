
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { devTools } from 'redux-devtools';
import { createHistory } from 'history';

export default function configureStore(reducers, initialState = {}) {
  const finalReducers = combineReducers({
    ...reducers,
    router: routerStateReducer
  });

  const store = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware({level: 'info', collapsed: true})
    ),
    reduxReactRouter({createHistory}),
    devTools()
  )(createStore)(finalReducers, initialState);

  return store;
}
