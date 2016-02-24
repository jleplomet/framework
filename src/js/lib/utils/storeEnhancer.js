
import {compose, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import {getHistory} from './configureStore';
import DevTools from '../containers/DevTools';

if (process.env.NODE_ENV === 'production') {
  module.exports = () => applyMiddleware(
    routerMiddleware(getHistory()),
    thunkMiddleware
  );
} else {
  module.exports = () => compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(getHistory()),
      require('redux-logger')({level: 'info'})
    ),
    DevTools.instrument()
  );
}
