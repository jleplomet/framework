
import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';

class RootComponent extends Component {

  render() {
    const {
      store,
      routes,
      history
    } = this.props;

    return (
      <Provider store={store}>
        <Router
          history={history}
          routes={routes} />
      </Provider>
    );
  }
}

RootComponent.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
};

export default RootComponent;
