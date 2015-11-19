
import constants from '../state/constants';
import initialState from '../state/settings';
import createReducer from '../utils/createReducer';

const {
  SETTINGS_UPDATE
} = constants.toJS();

const handlers = {
  [SETTINGS_UPDATE](state, action) {
    return state.merge(action.data);
  }
};

export default createReducer(initialState, handlers);
