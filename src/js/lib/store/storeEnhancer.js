
import {compose, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import {getHistory} from './configureStore';

let storeEnhancer;

if (process.env.NODE_ENV === 'production') {
  storeEnhancer = () => compose(
    applyMiddleware(
      routerMiddleware(getHistory()),
      thunkMiddleware
    )
  )
} else {
  storeEnhancer = () => compose(
    applyMiddleware(
      routerMiddleware(getHistory()),
      thunkMiddleware,
      require('redux-logger')({level: 'info', collapsed: true})
    )
  )
}

export default storeEnhancer;
