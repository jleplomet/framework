
import styles from 'scss/components/core';

import React, {Component, PropTypes, cloneElement, createElement} from 'react';
import {connect} from 'react-redux';
import {push, goBack, goForward} from 'react-router-redux';
import TransitionGroup from 'react-addons-css-transition-group';
import {getLanguageForId} from '../utils/language';

let previousPath = '';

class CoreComponent extends Component {
  static displayName = 'CoreComponent';

  static propTypes = {
    children: PropTypes.node
  };

  static childContextTypes = {
    dispatch: PropTypes.func
  };

  // In order to limit the amount of props to pass down
  // we will define the most commonly passed/used props as childContextTypes
  // so any child that needs it, can get it on its own. this limits boilerplate
  // to handle these props
  getChildContext() {
    const {dispatch} = this.props;

    return {
      dispatch
    };
  }

  componentWillUpdate(nextProps) {
    // save reference of previous location.pathname
    const nextPathname = cleanPathName(nextProps.location.pathname);
    const currentPathname = cleanPathName(this.props.location.pathname);

    if (nextPathname !== currentPathname) {
      previousPath = currentPathname;
    }
  }

  getRouteComponentProps() {
    const {
      location,
      settings,
      dispatch
    } = this.props;

    const componentId = cleanPathName(location.pathname);

    return {
      key: componentId,
      id: componentId,
      location: {
        pathname: componentId,
        params: location.query
      },
      language: getLanguageForId(componentId, settings.language)
    }
  }

  renderStaticComponent(component) {
    const {
      dispatch,
      settings,
      location
    } = this.props;

    const {id, Component} = component;
    const defaultProps = {
      id,
      previousPath,
      currentPath: cleanPathName(location.pathname),
      language: getLanguageForId(id, settings.language)
    };

    return createElement(Component, {key: id, ...defaultProps});
  }

  render() {
    const {
      children,
      location,
      settings
    } = this.props;

    const {
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      staticComponents
    } = settings;

    return (
      <div className={styles.contentWrapper}>
        <TransitionGroup
          component='div'
          className={styles.contentContainer}
          transitionName={transitionName}
          transitionEnterTimeout={transitionEnterTimeout}
          transitionLeaveTimeout={transitionLeaveTimeout}>
          {cloneElement(children || <div />, this.getRouteComponentProps())}
        </TransitionGroup>
        {staticComponents.map(component =>
          this.renderStaticComponent(component))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(CoreComponent);

function mapStateToProps(state) {
  const {notifications, settings, router} = state;

  return {
    settings: settings.toJS()
  }
}

function cleanPathName(pathname, defaultPathName = 'index') {
  const cleaned = pathname.split('/')[1];

  if (cleaned === undefined || cleaned === false) {
    // we dont have a "/", just return the pathname
    return pathname;
  }

  return cleaned || defaultPathName;
}
