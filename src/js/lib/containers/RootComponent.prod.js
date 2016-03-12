
import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';

export default class RootComponent extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired
  };

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
