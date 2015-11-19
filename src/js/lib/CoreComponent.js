
import React, {Component, PropTypes, cloneElement} from 'react';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import {cleanPathName, getLanguageForId} from './utils';

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

  getRouteComponentProps() {
    const {
      location,
      constants,
      settings
    } = this.props;

    const componentId = cleanPathName(location.pathname);

    return {
      key: componentId,
      id: componentId,
      language: getLanguageForId(componentId, settings.language)
    }
  }

  render() {
    const {
      children,
      location
    } = this.props;

    return (
      <div>
        {cloneElement(children || <div />, this.getRouteComponentProps())}
      </div>
    );
  }
}
