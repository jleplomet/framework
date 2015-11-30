
import styles from 'scss/components/core';

import React, {Component, PropTypes, cloneElement, createElement} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import TransitionGroup from 'react-addons-css-transition-group';
import {cleanPathName, getLanguageForId} from './utils';

let previousPath = '';

function mapStateToProps(state) {
  const {notifications, settings, router} = state;

  return {
    settings: settings.toJS()
  }
}

@connect(state => mapStateToProps(state))
export default class CoreComponent extends Component {
  static propTypes = {
    children: PropTypes.node
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
        pathname: cleanPathName(location.pathname),
        params: location.query
      },
      language: getLanguageForId(componentId, settings.language),
      navigate(path) {
        return dispatch(updatePath(path));
      }
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
      language: getLanguageForId(id, settings.language),
      navigate(path) {
        return dispatch(updatePath(path));
      }
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
      staticComponents
    } = settings;

    return (
      <div className={styles.contentWrapper}>
        <TransitionGroup
          component='div'
          className={styles.contentContainer}
          transitionName="swap"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {cloneElement(children || <div />, this.getRouteComponentProps())}
        </TransitionGroup>
        {staticComponents.map(component =>
          this.renderStaticComponent(component))}
      </div>
    );
  }
}
