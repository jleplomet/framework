
import initialState from '../state/settings';
import createReducer from './createReducer';

import {
  SETTINGS_UPDATE
} from '../actions/settingsActions';

const handlers = {
  [SETTINGS_UPDATE](state, action) {
    return state.merge(action.data);
  }
};

export default createReducer(initialState, handlers);
