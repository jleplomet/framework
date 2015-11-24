
import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';
import {createHashHistory} from 'history';

export default class RootComponent extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired
  }

  createElement(Component, props) {
    // this is super hacky and maybe will break later on.
    // if routing stops working, look here.
    if (Component.displayName === 'Connect(CoreComponent)') {
      return <Component {...props} />;
    }

    // I dont want all components to hold all router props
    // I'll have CoreComponent handle what gets what.
    return <Component />;
  }

  render() {
    const {
      store,
      routes
    } = this.props;

    return (
      <Provider store={store}>
        <ReduxRouter
          routes={routes}
          createElement={this.createElement.bind(this)} />
      </Provider>
    );
  }
}
