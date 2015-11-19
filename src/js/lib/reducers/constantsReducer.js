
import initialState from '../state/constants';
import createReducer from '../utils/createReducer';

const {
  CONSTANTS_ADD
} = initialState.toJS();

const handlers = {
  [CONSTANTS_ADD](state, action) {
    return state.merge(action.data);
  }
};

export default createReducer(initialState, handlers);
