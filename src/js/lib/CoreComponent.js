
import styles from 'scss/components/core';

import React, {Component, PropTypes, cloneElement, createElement} from 'react';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import TransitionGroup from 'react-addons-css-transition-group';
import {cleanPathName, getLanguageForId} from './utils';

let previousPath = '';

function mapStateToProps(state) {
  const {constants, settings, router} = state;

  return {
    constants: constants.toJS(),
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
    previousPath = cleanPathName(this.props.location.pathname);
  }

  getRouteComponentProps() {
    const {
      location,
      constants,
      settings,
      dispatch
    } = this.props;

    const componentId = cleanPathName(location.pathname);

    return {
      key: componentId,
      id: componentId,
      language: getLanguageForId(componentId, settings.language),
      navigate(path) {
        return dispatch(pushState(null, path));
      }
    }
  }

  renderStaticComponent(component) {
    const {
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
