
import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import DevTools from './DevTools';

class RootComponent extends Component {

  render() {
    const {
      store,
      routes,
      history
    } = this.props;

    console.log(routes);

    return (
      <Provider store={store}>
        <span>
          <Router
            history={history}
            routes={routes} />
          <DevTools />
        </span>
      </Provider>
    );
  }
}

RootComponent.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
};

export default RootComponent;
