
import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';

export default class RootComponent extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired
  };

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
      routes,
      history
    } = this.props;

    return (
      <Provider store={store}>
        <Router
          history={history}
          routes={routes}
          createElement={this.createElement.bind(this)} />
      </Provider>
    );
  }
}
